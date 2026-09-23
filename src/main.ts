import { createInitialGameState, updateGame } from "./game/rules";
import { createKeyboardControls } from "./input/controls";
import { renderGame } from "./rendering/renderGame";

const canvas = document.querySelector<HTMLCanvasElement>("#game-canvas");

if (!canvas) {
  throw new Error("The game canvas mount is missing.");
}

const context = canvas.getContext("2d");

if (!context) {
  throw new Error("The browser does not provide a 2D canvas context.");
}

const controls = createKeyboardControls();
let state = createInitialGameState();
let previousTime: number | undefined;

const scoreElement = document.querySelector<HTMLElement>("#score-value");
const livesElement = document.querySelector<HTMLElement>("#lives-value");
const phaseElement = document.querySelector<HTMLElement>("#phase-label");

const updateHud = () => {
  if (scoreElement) {
    scoreElement.textContent = String(state.score).padStart(4, "0");
  }
  if (livesElement) {
    livesElement.textContent = String(state.lives).padStart(2, "0");
  }
  if (phaseElement) {
    phaseElement.textContent = `Phase: ${state.phase}`;
  }
};

const frame = (timestamp: number) => {
  const elapsed = previousTime === undefined ? 0 : (timestamp - previousTime) / 1000;
  previousTime = timestamp;
  state = updateGame(state, controls.getInput(), Math.min(elapsed, 0.05));
  renderGame(context, state);
  updateHud();
  requestAnimationFrame(frame);
};

renderGame(context, state);
updateHud();
requestAnimationFrame(frame);
