# Session 003 Evidence

Date: 2026-09-22

## Baseline preserved before the controlled change

The first playable baseline was the local Canvas game after User Story 3. The
baseline screenshots are preserved under
`evidence/screenshots/baseline/`: `smoke-us1.png`, `smoke-us2.png`,
`smoke-us2-collision.png`, `smoke-us3.png`, and `smoke-us3-collected.png`.
The collected-item screenshot,
`evidence/screenshots/baseline/smoke-us3-collected.png`, is the baseline
playable-state reference for this evidence record.

Baseline commands:

```powershell
npm.cmd test -- tests/evals.test.ts
npm.cmd run typecheck
npm.cmd run build
```

The baseline evaluation command produced three passing cases and one expected
failure. E4 received the default velocity `180` when the fixture requested
`60`, so the baseline exposed a real configuration propagation defect. The
baseline typecheck and build were otherwise successful.

Known baseline limitation: `createInitialGameState` validated a supplied
`GameConfig`, but `updateGame` read movement values and boundaries from the
default constants. A valid custom configuration could therefore appear valid
while being ignored during play.

## Controlled change

Hypothesis: if each `GameState` carries its validated configuration and the
update rule reads movement, jump, gravity, and boundary values from that state,
then a valid non-default configuration will affect deterministic play without
changing the Core level entities or collision order.

Signal: E4 must change from the baseline failure to a pass while E1, E2, and E3
retain their passing results.

Smallest change: add `config: GameConfig` to `GameState`, store the validated
configuration during state creation, and use it in `updateGame` for player
speed, jump velocity, gravity, and level boundaries. Add the focused E4
regression fixture in `tests/evals.test.ts`.

Verification: rerun the identical `npm.cmd test -- tests/evals.test.ts`
command, then run the complete test, typecheck, build, and browser smoke
checks.

Limitation: the Core platform, ladder, hazard, enemy, collectible, and goal
geometry remains the fixed compact level. The change makes the existing
configuration values effective; it does not create a level editor or generate
new level geometry.

## Post-change results

The identical four evaluation cases passed after the controlled change:

- E1 valid start: passed.
- E2 boundary protection: passed.
- E3 invalid configuration fallback: passed.
- E4 non-default movement configuration: passed.

Post-change commands:

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
```

Results: 4 test files and 42 tests passed; TypeScript completed without errors;
Vite produced the production bundle successfully.

## Manual reproduction

The documented local Vite server was used at `http://127.0.0.1:5173/`.
The browser displayed the player, five platforms, four ladders, rolling hazard,
patrol enemy, three collectibles, top goal, score, lives, controls, and playing
phase. Keyboard movement, hazard damage, and collectible scoring were observed
without console errors. Existing screenshots preserve the User Story 1, 2, and
3 observations;
`evidence/screenshots/baseline/smoke-final.png` preserves the earlier final
browser reproduction.

## Scope and pair contributions

The Driver implemented the deterministic Canvas game, the configuration fix,
focused evaluation fixture, evidence, and validation records. The Observer
reviewed the requirements checklist and bounded Core scope; all 20 checklist
items remain checked. The implementation contains no Session 004 AI behavior,
providers, tool calling, backend, multiplayer, or stretch mechanics.

## Post-handoff Core correction

The review found that ladder lookup could select the lower ladder again at a
shared platform boundary, preventing the next upward climb. The correction made
ladder entry direction-aware and changed the fixed level to five full-width
platforms with alternating edge ladders: right, left, right, left.

The original Session 003 screenshots remain preserved as the pre-correction
reference. The corrected browser evidence is stored under
`evidence/screenshots/current/`: `overview.png`, `first-ladder.png`, and
`route.png`.
The corrected route requires crossing each platform to the next edge ladder.

Focused regression result: 19 ladder/layout tests passed. The full 46-test suite,
typecheck, and build passed after the correction. Browser smoke confirmed the
new edge layout, first-ladder movement/climbing, HUD behavior, and clean console;
the existing hazard also produced one expected life loss during the route. The
complete right-left-right-left traversal is covered by the deterministic route
test.

## Handoff decision

Technical Session 003 acceptance criteria are satisfied. The title/originality
risk remains pending instructor approval, as required by the specification and
requirements checklist. No submission approval is claimed until that decision is
recorded by the instructor. The review sequence and current evidence index are
in [`SESSION_003_HANDOFF.md`](SESSION_003_HANDOFF.md).
