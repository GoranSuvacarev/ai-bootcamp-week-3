# Session 003 Handoff

## Review status

Session 003 implementation and evidence are complete. A post-handoff Core
correction fixed ladder re-entry and clarified the route layout. The project is
now frozen again for review. Technical acceptance checks pass; instructor approval of the
`Quattro Kong` title/originality risk is still pending.

## Suggested review order

1. Start the local game with `npm.cmd run dev -- --host 127.0.0.1` and show the
   player, platforms, ladders, hazard, enemy, collectibles, goal, HUD, and
   keyboard controls.
2. Review [`GAME_SPEC.md`](GAME_SPEC.md), including Core behavior, explicit
   out-of-scope items, and the Definition of Done.
3. Review [`BUILD_PROMPT_V1.md`](BUILD_PROMPT_V1.md) and
   [`CONTEXT_MANIFEST.md`](CONTEXT_MANIFEST.md) to show the agent boundaries and
   selected context.
4. Review [`EVALS.md`](EVALS.md) and [`EVIDENCE_003.md`](EVIDENCE_003.md):
   baseline, four cases, E4 baseline defect, controlled change, and post-change
   results.
5. Reproduce the checks with:

   ```powershell
   npm.cmd test
   npm.cmd run typecheck
   npm.cmd run build
   ```

6. Confirm the title/originality decision with the instructor and record the
   decision in the handoff evidence.

## Current evidence

- 5 Vitest files and 46 tests pass.
- TypeScript typecheck passes.
- Vite production build passes.
- Browser smoke testing passes with no console errors beyond Vite debug
  connection messages.
- Requirements quality checklist: 20/20 checked.
- Specification checklist: 15/15 checked.
- Baseline screenshots:
  `evidence/screenshots/baseline/smoke-final.png`,
  `evidence/screenshots/baseline/smoke-us1.png`,
  `evidence/screenshots/baseline/smoke-us2.png`,
  `evidence/screenshots/baseline/smoke-us2-collision.png`,
  `evidence/screenshots/baseline/smoke-us3.png`, and
  `evidence/screenshots/baseline/smoke-us3-collected.png`.
- Current screenshots:
  `evidence/screenshots/current/overview.png`,
  `evidence/screenshots/current/first-ladder.png`, and
  `evidence/screenshots/current/route.png`.

## Scope decision

The current project contains no AI Hint, tool calling, provider, backend,
multiplayer, or other Session 004 feature. Week 4 work starts only after this
handoff is accepted and the tutor-provided read-only tool contract and mock
fixture are available.

## Git and approval status

No commit, branch, reset, or automatic Git action has been performed. The title
approval is not assumed and must be supplied by the instructor before submission.
