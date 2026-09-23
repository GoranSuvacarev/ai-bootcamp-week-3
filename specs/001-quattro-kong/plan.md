# Implementation Plan: Quattro Kong

**Branch**: `001-quattro-kong` | **Date**: 2026-09-22 | **Spec**: `spec.md`

**Input**: Approved feature specification from `specs/001-quattro-kong/spec.md`

## Summary

Build one deterministic, single-screen vertical platform game in TypeScript. The
game core will be separated from Canvas rendering and browser input so movement,
collisions, life transitions, score collection, win/lose behavior, and runtime
configuration validation can be tested without a browser or network connection.

Core includes one level, ladders, rolling hazards, one patrol enemy, collectibles,
and a top goal. Elevators and a second enemy type remain stretch work and must not
be added before the Core evidence is green.

## Technical Context

**Language/Version**: TypeScript 5.x on the repository's available Node.js runtime

**Primary Dependencies**: Vite for the browser development/build loop and Vitest for
deterministic unit/integration tests. No game engine or physics library.

**Storage**: N/A. Game state exists in memory only.

**Testing**: Vitest for pure game-rule and validation tests; Vite build and a manual
browser smoke test for the playable slice.

**Target Platform**: Modern desktop browser; keyboard input; local offline run after
dependencies are installed.

**Project Type**: Single browser application with a deterministic game core.

**Performance Goals**: Smooth local browser play at approximately 60 frames per
second for one level; no network or persistence requirement.

**Constraints**: One compact level, no backend, no live AI, no tool calling, no
multiplayer, no copied original assets, and no uncontrolled scope expansion.

**Scale/Scope**: One player, one level, one patrol enemy, a small fixed collection of
platforms/ladders/hazards/items, and one top goal.

## Constitution Check

### Pre-Phase 0 Gate

- **Small, explicit scope**: PASS. Core is one local level and one player.
- **Specification before implementation**: PASS. `spec.md` exists and is reviewed.
- **Testable structured contract**: PASS. `GameConfig` will have runtime validation.
- **Evidence-driven changes**: PASS. Baseline, four evals, and one controlled change
  are planned before implementation.
- **Human review and bounded AI assistance**: PASS. Driver/observer checkpoints are
  part of the workflow.
- **Known exception**: The title `Quattro Kong` may conflict with the assignment's
  originality requirement. This is recorded in the specification and must be
  confirmed with the instructor before submission. No copied assets or identity are
  permitted.

## Architecture and Data Flow

```text
keyboard input
  -> input mapping
  -> deterministic game update(state, input, dt)
  -> validated next GameState
  -> Canvas renderer + HUD
```

The rules layer is authoritative for game state. Rendering and input adapters must
not directly mutate score, lives, phase, or entity collections.

The browser animation loop supplies elapsed time to the pure update function. Tests
pass explicit input and fixed time steps so results are reproducible.

## Project Structure

```text
index.html
package.json
tsconfig.json
vite.config.ts
src/
├── main.ts
├── input/
│   └── controls.ts
├── game/
│   ├── types.ts
│   ├── config.ts
│   ├── validation.ts
│   ├── level.ts
│   └── rules.ts
└── rendering/
    └── renderGame.ts
tests/
├── validation.test.ts
├── rules.test.ts
└── game-flow.test.ts
docs/
├── GAME_SPEC.md
├── BUILD_PROMPT_V1.md
├── CONTEXT_MANIFEST.md
├── EVALS.md
├── EVIDENCE_003.md
└── AI_USAGE_LOG.md
```

## Implementation Phases

### Phase 1: Project setup

- Add the minimal Vite/TypeScript/Vitest configuration.
- Add scripts for `dev`, `build`, `typecheck`, and `test`.
- Add the HTML shell and empty Canvas mount point.
- Verify the empty application builds before adding game behavior.

### Phase 2: Structured contract and validation

- Add `GameConfig` and the runtime validator.
- Define valid defaults and a safe invalid-input result.
- Write validation tests before implementation.
- Keep validation free of browser and rendering dependencies.

### Phase 3: Deterministic game core

- Add level definitions for platforms, ladders, rolling hazards, one patrol enemy,
  collectibles, boundaries, and the goal.
- Implement player movement, jump, gravity, platform landing, and boundary limits.
- Implement ladder movement using the climb input only when the player overlaps a
  ladder connection.
- Implement hazard/enemy collision, one damage event per contact, respawn, lives,
  and game-over behavior.
- Implement collectible removal and one-time score increase.
- Implement win-state and lose-state transitions.

### Phase 4: Browser input and rendering

- Map left/right to ArrowLeft/ArrowRight and A/D.
- Map jump to Space.
- Map climb to ArrowUp/ArrowDown and W/S while on a ladder.
- Render original simple geometric visuals for all required entities.
- Render controls, score, lives, and current phase.
- Keep visual styling clearly original and minimal.

### Phase 5: Baseline and controlled change

- Run the first playable version without changing the baseline after recording it.
- Execute the four eval cases.
- Select one actual baseline defect.
- Make one smallest controlled change addressing that defect.
- Repeat exactly the same eval cases and record the comparison.

## Verification Strategy

- Unit tests validate configuration, movement, boundaries, collisions, ladders,
  collectibles, and state transitions.
- Integration-style game-flow tests call the deterministic update function through
  start, damage, collection, win, and lose scenarios.
- `npm run typecheck` verifies static types.
- `npm test` verifies deterministic behavior.
- `npm run build` verifies the browser bundle.
- Manual smoke testing verifies that the rendered game is understandable and
  playable with keyboard controls.

## Evidence Outputs

The implementation must also produce assignment-facing documentation:

- `docs/GAME_SPEC.md`: concise scope and Definition of Done;
- `docs/BUILD_PROMPT_V1.md`: first implementation prompt;
- `docs/CONTEXT_MANIFEST.md`: included/excluded context and priority;
- `docs/EVALS.md`: expected and actual baseline/post-change results;
- `docs/EVIDENCE_003.md`: hypothesis, diff, commands, results, limitation, and pair
  contributions;
- `docs/AI_USAGE_LOG.md`: important AI calls without private chain-of-thought.

## Complexity Tracking

No constitution violations are required for the Core implementation. The title
choice is a documented assignment risk, not a technical complexity justification.
