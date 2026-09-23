# Tasks: Quattro Kong

**Input**: Design documents from `specs/001-quattro-kong/`

**Prerequisites**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, and `quickstart.md`

**Tests**: Included because the specification and constitution explicitly require
deterministic validation and test evidence.

## Phase 1: Setup

**Purpose**: Create the minimal browser project and test infrastructure.

- [X] T001 Create the Vite/TypeScript project files in `package.json`, `tsconfig.json`, `vite.config.ts`, and `index.html` with scripts for `dev`, `build`, `typecheck`, and `test`.
- [X] T002 [P] Create the source and test directory structure from `specs/001-quattro-kong/plan.md`.
- [X] T003 [P] [FR-011, SC-001] Create the minimal Canvas mount and original visual shell in `index.html` and `src/main.ts`.
- [X] T004 [P] Create the assignment documentation placeholders in `docs/GAME_SPEC.md`, `docs/BUILD_PROMPT_V1.md`, `docs/CONTEXT_MANIFEST.md`, `docs/EVALS.md`, `docs/EVIDENCE_003.md`, and `docs/AI_USAGE_LOG.md`.
- [X] T005 Run `npm install`, `npm run typecheck`, `npm test`, and `npm run build`; record the initial setup output in `docs/AI_USAGE_LOG.md` without committing.

## Phase 2: Foundational Contract and Rules

**Purpose**: Establish deterministic types, validation, level data, and test seams before user-story implementation.

- [X] T006 Define the shared types from `data-model.md` in `src/game/types.ts`.
- [X] T007 [P] Write failing runtime-validation tests for valid, invalid, non-finite, negative, and unsupported `GameConfig` values in `tests/validation.test.ts`.
- [X] T008 [FR-009, SC-005] Implement `GameConfig`, default values, and typed validation results in `src/game/config.ts` and `src/game/validation.ts` until T007 passes.
- [X] T009 [P] Write failing deterministic movement and boundary tests for `updateGame` in `tests/rules.test.ts`.
- [X] T010 [FR-001, FR-002, FR-010] Implement the initial game state, fixed time-step update boundary, player movement, gravity, and level-boundary rules in `src/game/rules.ts`.
- [X] T011 [P] Define one fixed compact level with platforms and ladders in `src/game/level.ts`.
- [X] T012 Run the focused validation and rules tests in `tests/validation.test.ts` and `tests/rules.test.ts`, plus typecheck/build from `package.json`; stop if the foundation is not green.

## Phase 3: User Story 1 - Reach the Rooftop Goal (P1) MVP

**Goal**: A player can start, move, jump, climb ladders, and reach the top goal.

**Independent Test**: Start a valid state, apply deterministic movement/climb input,
and verify supported landing, ladder traversal, boundary protection, and transition
to `won` at the goal.

### Tests for User Story 1

- [X] T013 [P] [US1] Add failing platform-landing and unsupported-fall tests in `tests/rules.test.ts`.
- [X] T014 [P] [US1] Add failing ladder-entry, ladder-traversal, and ladder-exit tests in `tests/rules.test.ts`.
- [X] T015 [P] [US1] Add failing top-goal and terminal-state tests in `tests/game-flow.test.ts`.

### Implementation for User Story 1

- [X] T016 [US1] [FR-001, FR-002, FR-003, FR-010] Implement platform collision and grounded/jump transitions in `src/game/rules.ts` until T013 passes.
- [X] T017 [US1] [FR-002, FR-003] Implement ladder eligibility and climb movement using `climbUp` and `climbDown` in `src/game/rules.ts` until T014 passes.
- [X] T018 [US1] [FR-007] Implement goal overlap and `playing` to `won` transition in `src/game/rules.ts` until T015 passes.
- [X] T019 [P] [US1] [FR-002] Map ArrowLeft/ArrowRight, A/D, Space, ArrowUp/ArrowDown, and W/S to `GameInput` in `src/input/controls.ts`.
- [X] T020 [P] [US1] [FR-011] Render player, platforms, ladders, goal, score, lives, and phase in `src/rendering/renderGame.ts`.
- [X] T021 [US1] Connect the browser loop, controls, deterministic state update, and renderer in `src/main.ts`.
- [X] T022 [US1] [SC-001, SC-002] Run the independent User Story 1 test set and manual browser smoke test; record the result in `docs/EVALS.md`.

## Phase 4: User Story 2 - Survive Hazards and Enemy (P2)

**Goal**: A player can encounter one rolling hazard and one patrol enemy with controlled life loss.

**Independent Test**: Apply deterministic collision fixtures and verify one damage
event, respawn/invulnerability behavior, and the terminal `lost` state.

### Tests for User Story 2

- [X] T023 [P] [US2] [FR-004, FR-008] Add failing rolling-hazard collision, one-hit-per-contact, and respawn tests in `tests/game-flow.test.ts`.
- [X] T024 [P] [US2] [FR-005, FR-008] Add failing patrol-enemy collision and zero-lives game-over tests in `tests/game-flow.test.ts`.

### Implementation for User Story 2

- [X] T025 [US2] Add fixed rolling-hazard and patrol-enemy definitions to `src/game/level.ts`.
- [X] T026 [US2] Implement deterministic hazard movement and patrol movement in `src/game/rules.ts`.
- [X] T027 [US2] [FR-004, FR-005, FR-008] Implement collision precedence, one damage event per contact, invulnerability, respawn, life decrement, and `lost` transition in `src/game/rules.ts` until T023 and T024 pass.
- [X] T028 [P] [US2] [FR-011] Render the rolling hazard and patrol enemy with original geometric visuals in `src/rendering/renderGame.ts`.
- [X] T029 [US2] Run the independent User Story 2 test set and manual collision smoke test; record the result in `docs/EVALS.md`.

## Phase 5: User Story 3 - Collect Score Items (P3)

**Goal**: A player can collect visible score items exactly once.

**Independent Test**: Apply deterministic overlap input and verify score increase and
one-time collection behavior.

### Tests for User Story 3

- [X] T030 [P] [US3] [FR-006] Add failing collectible scoring and duplicate-collection tests in `tests/game-flow.test.ts`.

### Implementation for User Story 3

- [X] T031 [US3] Add fixed collectible definitions to `src/game/level.ts`.
- [X] T032 [US3] [FR-006] Implement one-time collectible state transition and score update in `src/game/rules.ts` until T030 passes.
- [X] T033 [P] [US3] [FR-006, FR-011] Render uncollected score items and update the score HUD in `src/rendering/renderGame.ts`.
- [X] T034 [US3] Run the independent User Story 3 test set and manual collection smoke test; record the result in `docs/EVALS.md`.

## Phase 6: Baseline, Controlled Change, and Evidence

**Purpose**: Satisfy the Session 003 evidence requirements without changing multiple variables at once.

- [X] T035 [P] [FR-013, SC-004] Record the first playable baseline, command output, screenshot, and known limitation in `docs/EVIDENCE_003.md` and preserve the baseline result separately from the final result.
- [X] T036 [P] [FR-013, SC-004] Define four eval cases with expectations before execution in `docs/EVALS.md`: normal start, boundary, invalid configuration, and one observed baseline defect.
- [X] T037 [US1] [FR-013, SC-004] Run the same four eval cases against the baseline and record actual results in `docs/EVALS.md`.
- [X] T038 [US1] [FR-013, SC-004] Write the controlled-change hypothesis, signal, smallest change, verification, and limitation in `docs/EVIDENCE_003.md`.
- [X] T039 [US1] [FR-013, SC-004] Implement only the approved controlled change and update its focused regression test in the relevant `src/` and `tests/` files.
- [X] T040 [US1] [FR-013, SC-004] Rerun the identical four eval cases after the controlled change and record before/after results in `docs/EVALS.md` and `docs/EVIDENCE_003.md`.
- [X] T041 [P] Complete `docs/GAME_SPEC.md`, `docs/BUILD_PROMPT_V1.md`, `docs/CONTEXT_MANIFEST.md`, and `docs/AI_USAGE_LOG.md` with real commands, context, outputs, and pair contributions.

## Phase 7: Polish and Final Validation

- [X] T042 [SC-003, SC-006] Run `npm run typecheck`, `npm test`, `npm run build`, and the documented manual smoke test; record actual output in `docs/EVIDENCE_003.md`.
- [X] T043 [P] [FR-012, SC-007] Verify no secrets, copied assets, Session 004 code, or unrelated files are present in the repository diff using `.gitignore`, `git status`, and `git diff`.
- [X] T044 [P] [SC-006] Have the observer reproduce `specs/001-quattro-kong/quickstart.md` and review `docs/EVALS.md`, `docs/EVIDENCE_003.md`, and the repository diff.
- [X] T045 Run `$speckit-converge` and resolve any remaining spec/plan/task/implementation mismatch before submission.

## Dependencies and Execution Order

- Phase 1 precedes all other phases.
- Phase 2 is blocking and must be green before User Story 1 begins.
- User Story 1 is the MVP and precedes User Stories 2 and 3 in the recommended path.
- User Story 2 depends on the update loop and level entities from User Story 1.
- User Story 3 depends on the update loop and renderer from User Story 1.
- Phase 6 begins only after the Core gameplay is playable and tests are green.
- Phase 7 depends on all required Core evidence being recorded.

## Parallel Opportunities

- T002, T003, and T004 can be prepared independently after project setup.
- T007, T009, and T011 can be prepared in parallel because they target separate files.
- T013, T014, and T015 can be written in parallel before their implementations.
- T023 and T024 can be written in parallel.
- T030 can be written independently after the shared update loop exists.
- T043 and T044 can be performed independently during final review.

## Implementation Strategy

1. Complete setup and foundational validation.
2. Implement and demonstrate User Story 1 as the MVP.
3. Add User Story 2 and verify damage/life behavior.
4. Add User Story 3 and verify score behavior.
5. Capture baseline and run the controlled-change experiment.
6. Complete evidence and final convergence.

Do not add elevators, a second enemy, bouncing hazards, or Session 004 AI behavior
until the Core evidence is complete and explicitly approved as stretch work.

## Phase 8: Post-handoff Core Correction

**Purpose**: Correct ladder re-entry selection and make the Core traversal route
alternate clearly between the left and right edges without expanding scope.

- [X] T046 [P] [US1] Add regression tests for direction-aware ladder selection and the alternating edge layout in `tests/game-flow.test.ts` and `tests/level.test.ts`.
- [X] T047 [US1] [FR-003] Update the five Core platforms to full-width geometry and place the four ladders at alternating right/left edges in `src/game/level.ts`.
- [X] T048 [US1] [FR-003] Update ladder entry selection in `src/game/rules.ts` so upward and downward requests choose the correct platform boundary while preserving current-ladder traversal.
- [X] T049 [SC-003, SC-006] Run the focused and full test suites, typecheck, build, and browser route smoke test; preserve the corrected layout screenshot.
- [X] T050 [FR-003, SC-004] Update the game spec, evaluation record, evidence, handoff, and AI usage log with the post-handoff correction and known route behavior.
