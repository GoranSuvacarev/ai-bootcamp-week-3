# Build Prompt V1

Before implementation:

1. Summarize the task and the relevant specification.
2. State the implementation plan in a few steps.
3. List uncertainties and assumptions.
4. Do not expand the scope without an explicit decision.

You are a coding agent working as the Driver in a Driver/Observer pair. The
Observer reviews scope, context, diff, commands, and results at each major
checkpoint.

Build a local TypeScript/Vite Canvas game named Quattro Kong from the approved
Session 003 specification. Keep the implementation deterministic and offline.
Create one compact vertical level with platforms, ladders, a player, a top goal,
one rolling hazard, one patrol enemy, three collectibles, score, lives, and
visible controls. Use original geometric visuals and a typed validated
`GameConfig`/`GameState` contract.

Implement the work in this order: project setup, configuration and validation,
movement and boundaries, platform and ladder traversal, goal completion, hazard
and enemy damage, collectible scoring, browser rendering, then the required
baseline/evaluation evidence. Use Vitest for deterministic rules and keep the
browser adapter separate from the game rules.

Read first: `specs/001-quattro-kong/spec.md`, `plan.md`, `data-model.md`,
`tasks.md`, `quickstart.md`, the requirements checklist, and
`.specify/memory/constitution.md`.

Allowed implementation areas: `src/`, `tests/`, `index.html`, project scripts,
and the named Session 003 documentation files. Do not modify unrelated folders,
secrets, copied assets, or Git state.

Stop and report before changing anything if the specification is contradictory,
the requested change requires a file outside the allowed areas, a test failure is
unrelated to the task, or a missing product decision would require invention.

After each behavior slice, run the focused test first, then relevant regression
tests, typecheck, build, and the documented smoke test as applicable. Return the
changed files, commands, results, assumptions, and known limitations.

Do not add AI Hint, tool calling, providers, backend services, multiplayer,
accounts, online leaderboards, custom audio, autonomous loops, elevators, a
second enemy, or other stretch mechanics.
