# Luminar Drift

Luminar Drift is a unique JavaScript-based strategy puzzle game where players align luminous shards to channel energy currents. Match shard alignments (alpha, beta, gamma) in adjacent grid cells to form currents, earning points and advancing through drift phases. Built with Node.js and the `canvas` library, this game is designed for developers seeking a modular, extensible project.

## Features
- **Energy Channeling Gameplay**: Align shards with matching alignments (alpha, beta, gamma) horizontally or vertically to form energy currents.
- **Drift Phases**: Progress through phases as you score, increasing shard counts and energy levels.
- **Modular JavaScript**: Clean, object-oriented code for seamless integration and extension.
- **Canvas Rendering**: Server-side rendering with the `canvas` library, suitable for desktop or web applications.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/luminar-drift.git
   ```
2. Navigate to the project directory:
   ```bash
   cd luminar-drift
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the game:
   ```bash
   npm start
   ```

## How to Play
- **Objective**: Align adjacent shards with the same alignment (alpha: red, beta: blue, gamma: teal) horizontally or vertically by cycling their alignments.
- **Scoring**: Each energy current earns 45 points multiplied by the current phase.
- **Phase Progression**: Reach 450 points per phase to advance, increasing shard count and energy levels.
- **Interaction**: Use `game.handleClick(x, y)` to cycle shard alignments (requires UI integration).
- **Reset**: Call `game.reset()` to restart the game.

## Development
- **Tech Stack**: Node.js, JavaScript, `canvas`
- **Dependencies**: `canvas` for rendering
- **Code Structure**:
  - `index.js`: Main game logic and canvas rendering.
  - `shard.js`: Shard class for luminous entities.
  - `package.json`: Project metadata and dependencies.
- **Extending**: Integrate with a UI framework (e.g., Electron for desktop or a web server) to handle input and display the canvas.

## Notes
- The current implementation outputs a PNG snapshot (`output.png`) for testing. For interactive play, integrate with a UI framework to handle mouse clicks and real-time rendering.
- Example integration: Use Electron for a desktop app or a WebSocket server for web-based play.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, open an issue first to discuss your ideas.

## Support
If you enjoy Luminar Drift and want to support its development, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/Weshyana). Your support helps keep this project alive and growing!

## License
MIT License. See [LICENSE](LICENSE) for details.
