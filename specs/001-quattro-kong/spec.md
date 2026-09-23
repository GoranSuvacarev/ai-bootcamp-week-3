# Feature Specification: Quattro Kong

**Feature Branch**: `001-quattro-kong`

**Created**: 2026-09-22

**Status**: Draft for driver and observer review

**Input**: Session 003 Retro AI Engineering Challenge

> **Originality note:** The project title and mechanics are user-selected as
> retro-inspired. The project must not copy original game assets, music, logos,
> characters, or complete visual identity. The title remains a known assignment
> compliance risk and requires instructor acceptance before submission.

## User Scenarios & Testing

### User Story 1 - Reach the rooftop goal (Priority: P1)

As a player, I want to move through one compact vertical level and reach the goal
at the top so that I can complete the game through a clear, short arcade challenge.

**Why this priority**: Reaching the goal is the primary game value and defines the
minimum playable slice.

**Independent Test**: Start a new game, use movement and climbing controls to
navigate the level, and verify that reaching the top goal produces a win state.

**Acceptance Scenarios**:

1. **Given** a valid new game, **When** the player moves and jumps through the
   level, **Then** the player remains within the playable area and can land on
   supported platforms.
2. **Given** the player is at a ladder entrance, **When** the player uses the
   climb control, **Then** the player moves between the connected platform levels.
3. **Given** the player reaches the top goal, **When** the player overlaps the goal
   area, **Then** the game enters a visible win state and stops normal movement.

### User Story 2 - Survive hazards and the enemy (Priority: P2)

As a player, I want hazards and one simple enemy type to create danger so that the
level requires timing rather than only walking upward.

**Why this priority**: Hazards provide the challenge while remaining bounded enough
for deterministic tests and a short demonstration.

**Independent Test**: Start a game, collide with a hazard or enemy, and verify that
the player loses a life or enters the defined lose state without corrupting score or
position data.

**Acceptance Scenarios**:

1. **Given** the player has at least one life, **When** a rolling or bouncing hazard
   hits the player, **Then** the player loses exactly one life and the game applies
   the defined respawn or restart behavior.
2. **Given** the player collides with the simple enemy, **When** the collision is
   detected, **Then** the same controlled damage behavior occurs.
3. **Given** the player has no remaining lives, **When** the player is hit again,
   **Then** the game enters a visible lose state and normal movement stops.

### User Story 3 - Collect score items (Priority: P3)

As a player, I want to collect visible items while climbing so that the level has a
secondary score objective.

**Why this priority**: Collectibles add replay value without being required to
complete the primary climb-and-survive loop.

**Independent Test**: Start a game, overlap a collectible, and verify that the score
increases once and the item is no longer collectible.

**Acceptance Scenarios**:

1. **Given** an uncollected score item, **When** the player overlaps it, **Then** the
   score increases by the defined amount and the item becomes collected.
2. **Given** an already collected item, **When** the player overlaps its former
   location again, **Then** the score does not increase a second time.

## Edge Cases

- The player must not move outside the horizontal or vertical level boundaries.
- The player must not pass through a solid platform except through a defined ladder
  or traversal connection.
- A hazard must not apply damage more than once during one collision event.
- A collectible must not increase the score more than once.
- A collision on the same update as a win must follow one documented precedence
  rule; the initial rule is that a losing collision is resolved before the win state.
- A game must not start with negative lives, negative score, invalid dimensions, or
  non-finite movement values.
- Invalid game configuration must be rejected or replaced with a documented safe
  fallback without an uncaught runtime error.
- The primary Core traversal mechanism is ladders. Elevators are optional/stretch
  and must not be required to complete the Core level.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST start one compact vertical level from a valid initial
  game configuration.
- **FR-002**: The player MUST be able to move left and right, jump, and climb using
  clearly documented controls.
- **FR-003**: The level MUST contain horizontal platforms and connected ladders that
  allow the player to progress upward.
- **FR-004**: The level MUST contain rolling or bouncing hazards that can damage the
  player.
- **FR-005**: The Core version MUST contain one simple enemy type with deterministic
  movement or behavior. A second enemy type is outside Core unless explicitly
  approved as stretch.
- **FR-006**: The player MUST be able to collect visible score items, and each item
  MUST count at most once.
- **FR-007**: The level MUST contain a visible goal at the top that produces a win
  state when reached.
- **FR-008**: The game MUST implement a defined life-loss and game-over behavior.
- **FR-009**: The game MUST expose at least one structured configuration or state
  contract with documented fields, valid and invalid examples, runtime validation,
  and safe invalid-input behavior.
- **FR-010**: The system MUST prevent the player from leaving the playable level
  boundaries.
- **FR-011**: The system MUST provide a visible minimum presentation: player,
  platforms, traversal connections, hazards, enemy, collectibles, goal, score, and
  lives.
- **FR-012**: The Session 003 implementation MUST remain local and deterministic;
  it MUST NOT add AI Hint, tool calling, a live provider, backend services,
  multiplayer, accounts, online leaderboards, custom audio, or autonomous loops.
- **FR-013**: The project MUST preserve a baseline, define at least four eval cases,
  identify one real baseline problem, make one controlled change, and repeat the
  same eval cases before and after the change.

### Key Entities

- **GameConfig**: Validated configuration controlling the level dimensions,
  movement parameters, lives, score rules, and difficulty values.
- **GameState**: Current phase, player state, score, remaining lives, hazards,
  enemy, collectibles, traversal connections, and goal state.
- **Player**: Position, movement state, vertical state, lives, and collision status.
- **Level**: Platforms, ladders, optional elevators, hazards, enemy, collectibles,
  boundaries, and the top goal.
- **EvaluationCase**: A repeatable scenario with input, expected behavior, baseline
  result, post-change result, and status.

## Success Criteria

### Measurable Outcomes

- **SC-001**: A new player can start the game and understand the four controls and
  objective from the visible UI without reading source code.
- **SC-002**: The Core level can be completed from a valid new game in a short local
  play session, with no required network connection.
- **SC-003**: Automated checks cover valid configuration, invalid configuration,
  boundary behavior, collision/life behavior, collectible scoring, and win/lose
  transitions.
- **SC-004**: At least four identical eval cases are recorded before and after one
  controlled change, including one real baseline failure or limitation.
- **SC-005**: Invalid structured input is rejected or safely replaced without an
  uncaught runtime exception.
- **SC-006**: The observer can reproduce the documented commands, inspect the diff,
  and verify the recorded results without relying on undocumented conversation
  context.
- **SC-007**: The final Session 003 project contains no Session 004 AI tool flow and
  no secrets or unnecessary private data.

## Assumptions

- The project is a local TypeScript browser application using Canvas/HTML/CSS.
- The Core level uses ladders as the upward traversal mechanism; elevators are
  optional/stretch and are not required for completion.
- The Core version uses one simple enemy type; a second type requires explicit
  approval after the Core is green.
- The game uses original code and original visual assets created for this project.
- The game is single-player and uses one compact level.
- The title `Quattro Kong` is retained at the user's direction despite the
  originality requirement risk noted above.
- Tests and evals use deterministic local fixtures before any later AI/provider
  work.
