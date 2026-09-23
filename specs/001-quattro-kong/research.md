# Research: Quattro Kong

## Decision: Vite + TypeScript + Vitest

**Rationale:** The course recommends a TypeScript/JavaScript browser application.
Vite supplies a small local browser loop and production build, while Vitest gives
fast deterministic tests for the game core. Neither requires a backend or game
engine.

**Alternatives considered:** A hand-written script without a bundler would reduce
dependencies but provide weaker TypeScript/build ergonomics. A full game engine or
physics library would increase scope and reduce the value of testing the small game
rules directly.

## Decision: Canvas rendering with a pure rules layer

**Rationale:** Canvas is sufficient for one compact arcade level. Keeping browser
rendering and keyboard input outside `updateGame` makes collision and state tests
repeatable without a browser.

**Alternatives considered:** DOM elements would be possible but would add layout and
collision complexity. A game engine would be unnecessary for the required Core.

## Decision: Fixed level data, not procedural generation

**Rationale:** Fixed platforms, ladders, hazards, enemy placement, collectibles, and
goal coordinates make the baseline and eval cases reproducible.

**Alternatives considered:** Procedural generation is explicitly outside the Core
scope and would make evidence harder to compare before and after a change.

## Decision: Rolling hazard and one patrol enemy in Core

**Rationale:** One deterministic rolling hazard and one predictable patrol enemy
provide meaningful danger without introducing multiple physics systems. Bouncing
hazards and a second enemy type remain optional stretch work.

**Alternatives considered:** Supporting rolling and bouncing hazards together in Core
would increase collision and tuning surface without improving the required evidence.

## Decision: No external runtime validation library

**Rationale:** The contract is small enough for a local validator with explicit
checks. This makes the runtime behavior easy to inspect and test.

**Alternatives considered:** A schema library could be added later if the contract
grows, but it is unnecessary for Session 003.
