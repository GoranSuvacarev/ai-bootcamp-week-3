import { describe, expect, it } from "vitest";
import { DEFAULT_GAME_CONFIG } from "../src/game/config";
import { createInitialGameState, updateGame } from "../src/game/rules";
import type { GameInput } from "../src/game/types";

const noInput: GameInput = {
  left: false,
  right: false,
  jump: false,
  climbUp: false,
  climbDown: false,
};

describe("ladder traversal", () => {
  it("selects the next aligned ladder when climbing up from a shared boundary", () => {
    let state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.phase = "playing";
    state.ladders = [
      { ...state.ladders[1], x: 300, y: 520 },
      { ...state.ladders[2], x: 300, y: 360 },
    ];
    state.player.x = 300;
    state.player.y = 480;
    state.player.onGround = true;

    const next = updateGame(state, { ...noInput, climbUp: true }, 0);

    expect(next.player.onLadder).toBe(true);
    expect(next.player.y).toBe(480);
  });

  it("enters a ladder only from grounded overlap at a platform", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.player.x = 544;
    state.player.y = 800;

    const next = updateGame(state, { ...noInput, climbUp: true }, 0);

    expect(next.player.onLadder).toBe(true);
    expect(next.player.y).toBe(800);
  });

  it("climbs to the upper platform and exits automatically", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.player.x = 544;
    state.player.y = 800;

    const next = updateGame(state, { ...noInput, climbUp: true }, 1);

    expect(next.player.y).toBe(640);
    expect(next.player.onLadder).toBe(false);
    expect(next.player.onGround).toBe(true);
  });

  it("climbs down to the lower platform and exits automatically", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.player.x = 544;
    state.player.y = 640;
    state.player.onGround = true;

    const next = updateGame(state, { ...noInput, climbDown: true }, 1);

    expect(next.player.y).toBe(800);
    expect(next.player.onLadder).toBe(false);
    expect(next.player.onGround).toBe(true);
  });

  it("keeps horizontal position fixed while climbing", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.player.x = 544;
    state.player.y = 800;

    const next = updateGame(
      state,
      { ...noInput, right: true, climbUp: true },
      0.5,
    );

    expect(next.player.x).toBe(544);
    expect(next.player.y).toBe(720);
    expect(next.player.onLadder).toBe(true);
  });

  it("supports the alternating edge route to the top", () => {
    let state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.phase = "playing";
    const route = [
      { x: 544, y: 800, exitY: 640 },
      { x: 64, y: 640, exitY: 480 },
      { x: 544, y: 480, exitY: 320 },
      { x: 64, y: 320, exitY: 160 },
    ];

    for (const step of route) {
      state.player.x = step.x;
      state.player.y = step.y;
      state.player.onGround = true;
      state = updateGame(state, { ...noInput, climbUp: true }, 1);

      expect(state.player.x).toBe(step.x);
      expect(state.player.y).toBe(step.exitY);
      expect(state.player.onGround).toBe(true);
      expect(state.player.onLadder).toBe(false);
    }
  });
});

describe("goal and terminal states", () => {
  it("enters won when the player overlaps the goal", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.phase = "playing";
    state.player.x = state.goal.x;
    state.player.y = state.goal.y;

    const next = updateGame(state, noInput, 0);

    expect(next.phase).toBe("won");
  });

  it.each(["won", "lost"] as const)("does not move in the %s terminal state", (phase) => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.phase = phase;
    const next = updateGame(state, { ...noInput, right: true, jump: true }, 1);

    expect(next).toBe(state);
  });
});

describe("hazard and enemy collisions", () => {
  it("loses one life, respawns, and blocks repeat damage during invulnerability", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.phase = "playing";
    state.hazards[0].x = state.player.x;
    state.hazards[0].y = state.player.y;
    state.hazards[0].velocityX = 0;

    const damaged = updateGame(state, noInput, 0);
    const repeated = updateGame(damaged, noInput, 0);

    expect(damaged.lives).toBe(2);
    expect(damaged.player.x).toBe(64);
    expect(damaged.player.y).toBe(800);
    expect(damaged.player.velocityX).toBe(0);
    expect(damaged.player.velocityY).toBe(0);
    expect(damaged.player.onLadder).toBe(false);
    expect(damaged.player.invulnerableUntil).toBe(1);
    expect(repeated.lives).toBe(2);
  });

  it("takes damage from the patrol enemy", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.phase = "playing";
    state.enemy.x = state.player.x;
    state.enemy.y = state.player.y;
    state.enemy.velocityX = 0;

    const next = updateGame(state, noInput, 0);

    expect(next.lives).toBe(2);
    expect(next.phase).toBe("playing");
  });

  it("enters lost when the last life is removed", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.phase = "playing";
    state.lives = 1;
    state.hazards[0].x = state.player.x;
    state.hazards[0].y = state.player.y;
    state.hazards[0].velocityX = 0;

    const next = updateGame(state, noInput, 0);

    expect(next.lives).toBe(0);
    expect(next.phase).toBe("lost");
  });

  it("moves the hazard and patrol enemy deterministically within their bounds", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.hazards[0].x = 32;
    state.hazards[0].velocityX = -100;
    state.enemy.x = state.enemy.patrolMaxX;
    state.enemy.velocityX = 80;

    const next = updateGame(state, noInput, 1);

    expect(next.hazards[0].x).toBe(32);
    expect(next.hazards[0].velocityX).toBe(100);
    expect(next.enemy.x).toBe(state.enemy.patrolMaxX);
    expect(next.enemy.velocityX).toBe(-80);
  });
});

describe("collectibles and score", () => {
  it("adds the collectible value and marks the item collected once", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    const collectible = state.collectibles[0];
    state.phase = "playing";
    state.player.x = collectible.x;
    state.player.y = collectible.y;

    const next = updateGame(state, noInput, 0);

    expect(next.score).toBe(100);
    expect(next.collectibles[0].collected).toBe(true);
  });

  it("does not award points again for a collected item", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    const collectible = state.collectibles[0];
    state.phase = "playing";
    state.player.x = collectible.x;
    state.player.y = collectible.y;

    const collected = updateGame(state, noInput, 0);
    const repeated = updateGame(collected, noInput, 0);

    expect(collected.score).toBe(100);
    expect(repeated.score).toBe(100);
    expect(repeated.collectibles[0].collected).toBe(true);
  });

  it("collects multiple items independently", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    state.phase = "playing";
    state.player.x = state.collectibles[0].x;
    state.player.y = state.collectibles[0].y;

    const first = updateGame(state, noInput, 0);
    first.player.x = first.collectibles[1].x;
    first.player.y = first.collectibles[1].y;
    const second = updateGame(first, noInput, 0);

    expect(second.score).toBe(200);
    expect(second.collectibles[0].collected).toBe(true);
    expect(second.collectibles[1].collected).toBe(true);
  });

  it("resolves damage before collection in the same update", () => {
    const state = createInitialGameState(DEFAULT_GAME_CONFIG);
    const collectible = state.collectibles[0];
    state.phase = "playing";
    state.player.x = collectible.x;
    state.player.y = collectible.y;
    state.hazards[0].x = collectible.x;
    state.hazards[0].y = collectible.y;
    state.hazards[0].velocityX = 0;

    const next = updateGame(state, noInput, 0);

    expect(next.score).toBe(0);
    expect(next.collectibles[0].collected).toBe(false);
    expect(next.lives).toBe(2);
  });
});
