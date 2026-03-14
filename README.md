# Retrace

**Retrace — N-Back Trainer** is a personal web app for position-based N-back practice.
The current implementation focuses on a reliable **2-back MVP** before expanding into richer features.

## Minimum brand set

- App name: `Retrace`
- Subtitle: `N-Back Trainer`
- Browser title: `Retrace — N-Back Trainer`
- Repository name (recommended): `retrace`
- localStorage key: `retrace_session_results` (with legacy read support for `nback_session_results`)

## Implemented scope (MVP)

- Position N-back (fixed `N=2`)
- `25` trials per session with auto progression
- Input support:
  - Desktop: `Space`
  - Mobile: on-screen `Match` button (keyboard hint hidden on small screens)
- Scoring:
  - hit / miss / false alarm / correct rejection
  - accuracy
  - average reaction time (pressed trials only)
- Persistence:
  - Local history saved to localStorage
- Screens:
  - Home
  - Session
  - Result (with previous-session comparison)
  - History

## Acceptance checklist (review baseline)

### Functional correctness

- [ ] 2-back session can be completed end-to-end
- [ ] 25 trials run automatically
- [ ] target / non-target judgments are correct
- [ ] Space input works in session
- [ ] Mobile Match button input works in session
- [ ] Result screen is shown after session
- [ ] Session history is saved and visible

### Quality

- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] Task logic is separated from UI (`generator` / `engine` / `scoring` / `storage`)
- [ ] At least minimal unit tests exist for stimulus generation, scoring, and storage migration
- [ ] README and HANDOFF are up to date

## Review order for Codex deliverables

1. README + HANDOFF consistency
2. End-to-end app behavior
3. N-back logic separation and correctness
4. Tests
5. UI polish

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Vitest

## Local development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run build
npm run lint
npm run test
```


## UX notes (current)

- Mobile header is intentionally simplified to reduce crowding; during active session it only shows a lightweight Exit action.
- Session HUD is compact (`2-back`, `Trial x / 25`, progress bar) so the grid remains the primary focal area.
- Home presents first-run quick facts: position-based 2-back, 25 trials, ~1 minute, and a concise match instruction.
- Result and history emphasize scan-friendly metrics to support repeated daily sessions.

## Architecture overview

- `src/features/nback/generator.ts`: trial generation (supports injectable RNG for deterministic testing)
- `src/features/nback/scoring.ts`: outcome and session metrics
- `src/features/nback/useNBackSession.ts`: session flow/timing/input window
- `src/features/nback/storage.ts`: localStorage persistence and legacy key migration
- `src/features/nback/storage.test.ts`: persistence/migration regression tests
- `src/components/*`: reusable UI components
- `src/pages/*`: route-level screens

## Non-goals for this phase

- Adaptive difficulty
- Dual N-back
- Audio stimuli
- Cloud sync / account system

## Suggested next steps

- Add 1-back / 3-back selector and session settings
- Improve history readability and trend comparison
- Add deterministic seed mode for reproducible QA
- Consider IndexedDB when trial-level data grows
