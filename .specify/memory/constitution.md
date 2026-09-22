# Retro AI Engineering Challenge Constitution

## Core Principles

### I. Small, Explicit Scope

The project MUST implement one small retro-inspired browser game for Session 003.
Multiplayer, accounts, backend services, deployment, online leaderboards, custom
audio, procedural generation, AI-controlled gameplay, and Session 004 tool calling
are out of scope unless explicitly approved later.

### II. Specification Before Implementation

The team MUST define the game goal, controls, loop, win/lose rules, visual minimum,
out-of-scope items, and Definition of Done before the first major coding-agent
implementation. The specification, plan, tasks, and implementation MUST remain
consistent.

### III. Testable Structured Contracts

At least one important game configuration or state shape MUST have a documented
TypeScript type, valid and invalid examples, runtime validation, and defined safe
behavior for invalid input. TypeScript compile-time types alone are not runtime
validation.

### IV. Evidence-Driven Changes

The team MUST preserve a baseline, run at least four predefined eval cases, identify
one real baseline problem, state a hypothesis, make one controlled change, and run
the same eval cases before and after the change. Generated output MUST NOT be
manually altered to make results appear better.

### V. Human Review and Bounded AI Assistance

The driver may write prompts and change code. The observer MUST review scope,
context, plans, diffs, commands, and results at each major checkpoint. AI usage MUST
be recorded without storing private chain-of-thought, credentials, or unnecessary
private data. Unclear requirements MUST stop implementation rather than be silently
invented.

## Technical and Security Constraints

- Use a minimal TypeScript browser application with Canvas/HTML/CSS unless the team
  explicitly approves another approach.
- Do not add secrets, API keys, credentials, environment dumps, private URLs, or
  unnecessary user data to prompts, source, screenshots, or evidence.
- Do not add a live AI provider or tool-calling flow during Session 003.
- Prefer local deterministic tests and fixtures over network-dependent checks.
- Keep changes limited to the project and named task scope; avoid unrelated refactors.

## Development Workflow

The project follows this Spec Kit sequence:

```text
constitution -> specify -> clarify -> plan -> checklist -> tasks
-> analyze -> implement -> converge
```

Implementation tasks SHOULD follow a red-green-refactor rhythm where practical:
write a meaningful failing check, make the smallest coherent change, then run the
focused check and relevant regression checks. The observer reviews before a major
scope transition and before evidence is accepted.

## Governance

This constitution is the project-level authority for scope, evidence, review, and
security. Amendments require a recorded reason, an updated version and date, and a
review by both pair members. A major version removes or reverses a principle, a
minor version adds or materially expands a principle, and a patch version clarifies
wording without changing project behavior. Any conflict with the course challenge
brief MUST be surfaced for human resolution rather than silently overridden.

**Version**: 1.0.0 | **Ratified**: 2026-09-22 | **Last Amended**: 2026-09-22
