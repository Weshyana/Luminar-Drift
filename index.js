const { createCanvas } = require('canvas');
const Shard = require('./shard.js');

class LuminarDrift {
  constructor() {
    this.canvas = createCanvas(440, 680);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 40;
    this.cols = 11;
    this.rows = 17;
    this.shards = [];
    this.score = 0;
    this.phase = 1;
    this.maxShards = 5;
    this.spawnShard();
  }

  spawnShard() {
    if (this.shards.length >= this.maxShards) return;
    const col = Math.floor(Math.random() * this.cols);
    const row = Math.floor(Math.random() * (this.rows - 2)) + 2; // Avoid top rows for UI
    const alignment = Math.floor(Math.random() * 3); // 0: alpha, 1: beta, 2: gamma
    this.shards.push(new Shard(col * this.gridSize, row * this.gridSize, alignment));
  }

  drawGrid() {
    this.ctx.strokeStyle = '#4a4a4a';
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  update() {
    this.ctx.fillStyle = '#1a1a2a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    for (let i = this.shards.length - 1; i >= 0; i--) {
      this.shards[i].draw(this.ctx);
      if (this.shards[i].update()) {
        this.shards.splice(i, 1);
        this.spawnShard();
      }
    }

    this.checkCurrents();
    this.drawUI();
  }

  checkCurrents() {
    const toRemove = [];
    for (let i = 0; i < this.shards.length; i++) {
      for (let j = i + 1; j < this.shards.length; j++) {
        const s1 = this.shards[i];
        const s2 = this.shards[j];
        if (
          s1.alignment === s2.alignment &&
          (
            (Math.abs(s1.x - s2.x) <= this.gridSize && s1.y === s2.y) || // Horizontal
            (Math.abs(s1.y - s2.y) <= this.gridSize && s1.x === s2.x)    // Vertical
          )
        ) {
          this.ctx.strokeStyle = s1.alignment === 0 ? '#ff4d4d' : s1.alignment === 1 ? '#4d79ff' : '#4dffb3';
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(s1.x + this.gridSize / 2, s1.y + this.gridSize / 2);
          this.ctx.lineTo(s2.x + this.gridSize / 2, s2.y + this.gridSize / 2);
          this.ctx.stroke();
          toRemove.push(i, j);
          this.score += 45 * this.phase;
        }
      }
    }

    toRemove.sort((a, b) => b - a);
    toRemove.forEach(i => this.shards.splice(i, 1));
    if (toRemove.length > 0) {
      this.spawnShard();
      if (this.score >= this.phase * 450) this.advancePhase();
    }
  }

  advancePhase() {
    this.phase++;
    this.maxShards = Math.min(this.maxShards + 1, 11);
    this.shards.forEach(s => (s.energy = Math.min(s.energy + 12, 100)));
    this.spawnShard();
  }

  drawUI() {
    this.ctx.fillStyle = '#00ffcc';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`Phase: ${this.phase}`, 10, 45);
  }

  handleClick(x, y) {
    for (const shard of this.shards) {
      const d = Math.sqrt(
        Math.pow(x - (shard.x + this.gridSize / 2), 2) +
        Math.pow(y - (shard.y + this.gridSize / 2), 2)
      );
      if (d < this.gridSize / 2) {
        shard.alignment = (shard.alignment + 1) % 3;
        break;
      }
    }
  }

  reset() {
    this.shards = [];
    this.score = 0;
    this.phase = 1;
    this.maxShards = 5;
    this.spawnShard();
  }
}

// Example usage (for testing in Node.js)
const game = new LuminarDrift();
game.update();
console.log('Luminar Drift game initialized. Use a UI framework or save canvas to render.');
const fs = require('fs');
const out = fs.createWriteStream('output.png');
const stream = game.canvas.createPNGStream();
stream.pipe(out);
