# Evaluation Cases

Date: 2026-09-22

The four cases below were defined before the baseline comparison and executed
as the repeatable offline fixture in `tests/evals.test.ts`.

## Defined cases and expectations

| Case | Input and method | Expected result |
| --- | --- | --- |
| E1 normal start | Create a valid default state and apply one fixed update. | Initial phase is `ready`, lives are `3`, score is `0`, and the first update enters `playing`. |
| E2 boundary | Place the player one unit from each horizontal edge and hold the corresponding direction for one second. | The player remains at `x = 0` or `levelWidth - player.width`. |
| E3 invalid configuration | Validate the default configuration with `gravity: NaN`. | Validation returns `valid: false`, the safe default configuration, and no uncaught exception. |
| E4 baseline defect | Create a valid configuration with `playerSpeed: 60`, `jumpVelocity: 300`, and `gravity: 500`; move right for `0.5` seconds. | The state uses the supplied configuration, velocity is `60`, and the player moves from `x = 64` to `x = 94`. |

## Baseline execution

Command: `npm.cmd test -- tests/evals.test.ts`

- E1: passed.
- E2: passed.
- E3: passed.
- E4: failed as expected for the baseline defect: received velocity `180`
  instead of `60`.

The baseline had one failure in four tests. The failure was deterministic and
reproduced the configuration propagation limitation recorded in
`docs/EVIDENCE_003.md`.

## Post-change execution

The exact same command and fixture were rerun after the controlled change:

```powershell
npm.cmd test -- tests/evals.test.ts
```

- E1: passed.
- E2: passed.
- E3: passed.
- E4: passed.

The complete post-change suite passed with 42 tests. Browser smoke observations
for the three user stories remain recorded below.

## Post-handoff Core correction

The follow-up review reproduced a ladder-selection defect at a shared platform
boundary: the lower ladder was selected again, so an upward climb could not
continue. The corrected rules select ladder entries by climb direction, while
continuing to use the current ladder during traversal.

The level now uses five full-width platforms with alternating edge ladders:
right, left, right, left. The browser route crosses each platform to reach the
next ladder.

- Focused ladder/layout tests: 19 passed.
- Full suite after correction: 46 passed.
- Browser smoke: new layout and first right-ladder climb observed; one expected
  hazard life loss occurred; no console errors were observed.
- Corrected layout screenshot: `evidence/screenshots/current/overview.png`.
- First-ladder screenshot: `evidence/screenshots/current/first-ladder.png`.
- Corrected route screenshot: `evidence/screenshots/current/route.png`.

## User Story 1 smoke test

- Local server: `npm.cmd run dev -- --host 127.0.0.1`
- URL: `http://127.0.0.1:5173/`
- Result: Canvas showed the five platforms, four ladders, player, goal, score,
  lives, controls, and `PHASE: PLAYING`.
- Keyboard: `ArrowRight` was accepted.
- Console: no errors.
- Screenshot: `evidence/screenshots/baseline/smoke-us1.png`

## User Story 2 smoke test

- Result: the rolling hazard and patrol enemy were visible.
- Collision route: the player reached the hazard path through the first ladder.
- Result: lives changed from `03` to `02`, phase remained `playing`, and no
  console errors were observed.
- Screenshots: `evidence/screenshots/baseline/smoke-us2.png`,
  `evidence/screenshots/baseline/smoke-us2-collision.png`

## User Story 3 smoke test

- Result: three visible collectibles were present.
- Collection route: the player reached the first collectible through the
  ladder route.
- Result: score changed from `0000` to `0100` and the item disappeared.
- Screenshots: `evidence/screenshots/baseline/smoke-us3.png`,
  `evidence/screenshots/baseline/smoke-us3-collected.png`
