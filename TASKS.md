# TASKS

## Prioritized backlog

## A. Core reliability (current highest priority)

- [ ] Validate 2-back correctness against acceptance checklist
- [ ] Confirm one-input-per-trial behavior is stable
- [ ] Confirm result/history values match scoring outcomes
- [ ] Ensure build/lint/test pass cleanly in CI
- [ ] Add integration tests for useNBackSession (timing and one-input-per-trial)

## B. Product usability

- [ ] Add session settings (1-back / 2-back / 3-back)
- [ ] Improve Result page readability and metric descriptions
- [ ] Improve History formatting (empty state, grouping, readability)
- [ ] Add simple trend indicator versus previous sessions

## C. Data and persistence evolution

- [ ] Introduce optional trial log persistence strategy
- [ ] Consider IndexedDB migration path for larger datasets
- [ ] Add export/import capability for local backup

## D. Later extensions (not immediate)

- [ ] Adaptive difficulty
- [ ] Audio stimuli
- [ ] Dual N-back mode

---

## Reusable Codex instruction template (targeted improvements)

```text
Please review the current Retrace implementation and make targeted improvements.

Priority order:
1. correctness of N-back generation and scoring
2. session flow reliability
3. local persistence and history clarity
4. mobile usability
5. visual polish

Please do not redesign the entire app.
Preserve the current architecture unless necessary.

Tasks:
- verify target generation constraints
- verify trial timing and one-input-per-trial behavior
- improve result screen readability
- improve history list formatting
- add or refine tests for generator and scoring logic
- update README and HANDOFF.md

Deliver:
- summary of fixes
- changed files
- any known limitations
- suggested next steps
```
