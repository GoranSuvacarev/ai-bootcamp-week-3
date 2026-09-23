# Quattro Kong Game Spec

## Core objective

Quattro Kong is a local, single-player Canvas game with one compact vertical
level. The player moves left and right, jumps, climbs four ladders, avoids one
rolling hazard and one patrol enemy, collects three score items, and reaches the
top goal.

## Controls and presentation

- Move: ArrowLeft/ArrowRight or A/D.
- Jump: Space.
- Climb: ArrowUp/ArrowDown or W/S while aligned with a ladder.
- The UI displays the controls, score, remaining lives, and game phase.
- All visuals are original geometric Canvas/CSS shapes.

## Core route layout

The level contains five full-width horizontal platforms and four ladder
transitions. The ladder route alternates between the right and left edges from
bottom to top: right, left, right, left. After leaving a ladder, the player
crosses the current platform to reach the next ladder.

## Deterministic rules

- The game starts in `ready` and enters `playing` on its first update.
- Movement uses fixed time-step inputs and validated configuration values.
- Platforms support landing; ladders connect adjacent platform levels.
- A hazard or enemy collision consumes one life, respawns the player, and grants
  one second of invulnerability. Zero lives enters `lost`.
- Collectibles add their point value once.
- Damage resolves before collection or winning in the same update.
- Goal overlap enters `won`; terminal states ignore normal movement.

## Configuration contract

`GameConfig` contains level dimensions, lives, player speed, jump velocity,
gravity, and difficulty. Runtime validation rejects missing, non-finite, invalid,
or unsupported values and returns the safe default. `GameState` stores the
validated configuration used by deterministic updates.

## Out of scope

- Session 004 AI features, AI Hint, tool calling, and live providers;
- backend services, accounts, multiplayer, online leaderboards, or deployment;
- copied game assets, music, logos, or another game's complete visual identity;
- custom audio, autonomous loops, procedural generation, or persistence;
- elevators, a second enemy type, and other stretch mechanics.

## Definition of Done

The Core scope is complete when the local browser game runs, the required
entities and HUD are visible, automated validation covers configuration and game
rules, the four evidence cases are recorded before and after one controlled
change, and the final review finds no out-of-scope Session 004 behavior. Final
submission also requires instructor approval of the documented title/originality
risk.
