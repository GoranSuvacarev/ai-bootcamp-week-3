# Requirements Quality Checklist: Quattro Kong

**Purpose**: Reviewer-owned checklist for requirements quality, not implementation testing.

**Feature**: [spec.md](../spec.md)

**Owner**: Driver and observer together

## Requirement Completeness

- [x] CHK001 Are the player goal, level boundary, and completion condition specified clearly? [Spec §US1, FR-001, FR-007]
- [x] CHK002 Are all required Core entities named and their responsibilities distinguishable? [Spec §Key Entities]
- [x] CHK003 Are the four player actions and their intended gameplay effects documented? [Spec §FR-002]
- [x] CHK004 Are baseline, four eval cases, and one controlled change explicitly required? [Spec §FR-013, SC-004]

## Requirement Clarity

- [x] CHK005 Is “compact vertical level” defined enough for the plan to produce one bounded layout? [Ambiguity, Spec §FR-001]
- [x] CHK006 Is the ladder-entry and ladder-exit behavior unambiguous? [Clarity, Spec §US1]
- [x] CHK007 Is the one Core enemy's movement behavior specific enough to test deterministically? [Clarity, Spec §FR-005]
- [x] CHK008 Is the life-loss, respawn, invulnerability, and game-over behavior clear enough to implement consistently? [Clarity, Spec §US2, FR-008]
- [x] CHK009 Is collision precedence between damage and winning the level explicitly defined? [Clarity, Spec §Edge Cases]

## Requirement Consistency

- [x] CHK010 Are ladders consistently treated as Core and elevators consistently treated as stretch? [Consistency, Spec §Edge Cases, FR-003]
- [x] CHK011 Is the “one enemy in Core” boundary consistent across user stories, requirements, assumptions, and plan? [Consistency, Spec §FR-005]
- [x] CHK012 Are the title/originality risk and the no-copied-assets rule represented consistently? [Consistency, Spec §Originality note, SC-007]

## Scenario and Edge-Case Coverage

- [x] CHK013 Are primary, alternate, exception, and recovery scenarios represented for movement, damage, collection, and win/lose transitions? [Coverage, Spec §User Stories, Edge Cases]
- [x] CHK014 Are invalid configuration inputs specified with both rejection/fallback behavior and the no-uncaught-error requirement? [Coverage, Spec §Edge Cases, FR-009, SC-005]
- [x] CHK015 Are repeated collision and repeated collectible interactions explicitly bounded? [Coverage, Spec §Edge Cases]
- [x] CHK016 Are terminal `won` and `lost` states protected from normal movement? [Coverage, Spec §US1, US2]

## Non-Functional and Evidence Requirements

- [x] CHK017 Is local deterministic execution defined clearly enough to exclude network-dependent behavior? [Clarity, Spec §FR-012, SC-002]
- [x] CHK018 Are the observer's reproduction responsibilities and required evidence outputs explicit? [Completeness, Spec §SC-006]
- [x] CHK019 Is the title risk explicitly assigned an instructor-approval decision before submission? [Gap, Spec §Originality note]
- [x] CHK020 Are Core and stretch boundaries clear enough to prevent scope expansion during implementation? [Measurability, Spec §Assumptions]

## Notes

- `[x]` means the reviewer believes the requirement quality is acceptable.
- This checklist does not prove that the game implementation works.
- `$speckit-implement` must not modify these reviewer-owned checkbox states.
