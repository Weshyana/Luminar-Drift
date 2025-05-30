class Shard {
  constructor(x, y, alignment) {
    this.x = x;
    this.y = y;
    this.alignment = alignment; // 0: alpha, 1: beta, 2: gamma
    this.energy = Math.random() * 50 + 50;
  }

  draw(ctx) {
    ctx.fillStyle = this.alignment === 0 ? '#ff4d4d' : this.alignment === 1 ? '#4d79ff' : '#4dffb3';
    ctx.beginPath();
    ctx.arc(this.x + 20, this.y + 20, this.energy / 5, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.energy -= 0.4;
    return this.energy <= 0;
  }
}

module.exports = Shard;
