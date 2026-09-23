# Context Manifest

## Included context

| Source | Included because | Priority | Risk |
| --- | --- | --- | --- |
| `specs/001-quattro-kong/spec.md` | Defines user value, requirements, acceptance scenarios, and scope. | Highest | Draft status requires human review. |
| `specs/001-quattro-kong/plan.md` | Defines architecture, technical choices, and verification strategy. | High | Must remain consistent with the spec. |
| `specs/001-quattro-kong/data-model.md` | Defines configuration, state, entity, and input contracts. | High | Implementation contract changes require an intentional task. |
| `specs/001-quattro-kong/tasks.md` | Defines the approved implementation sequence and completion evidence. | High | Checkbox status is evidence only when supported by results. |
| `specs/001-quattro-kong/checklists/*.md` | Records reviewer decisions about requirements quality. | High | Checklist approval does not replace implementation tests. |
| `specs/001-quattro-kong/quickstart.md` | Defines reproducible local commands and smoke expectations. | Medium | Commands use the local Windows environment. |
| `.specify/memory/constitution.md` | Governs scope, evidence, review, and security. | Highest | Constitution rules are non-negotiable. |
| `src/`, `tests/`, and smoke screenshots | Provide current implementation and observed behavior. | High | Screenshots are evidence, not the source of truth for rules. |

## Excluded context and features

- Session 004 work.
- AI Hint, tool calling, live providers, backend services, multiplayer, accounts,
  online leaderboards, and autonomous loops.
- Copied game assets, copyrighted music, logos, or external visual identity.
- Undocumented conversation history or private chain-of-thought.

## Evidence boundary

All evaluation results use local deterministic fixtures or the documented local
browser smoke test. No network service is required for gameplay or validation.

When sources disagree, the constitution governs process and scope, the approved
specification governs behavior, the plan governs technical decisions, tasks govern
execution order, and current tests/evidence demonstrate actual results. Informal
conversation context is not an authoritative source.
