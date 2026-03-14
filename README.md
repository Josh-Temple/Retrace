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

- The app now uses a mobile-first, immersive dark layout inspired by the provided references.
- Background surfaces are tuned to deep slate/indigo dark-theme tones (not pure black) to keep contrast crisp without harsh clipping.
- Home emphasizes a large hero message, compact quick-fact chips, prominent primary/secondary actions, and a “Recent Activity” section.
- Session header keeps focus with a minimal `Exit` action, enlarged `2-back` HUD text, and a subtle monochrome progress indicator.
- The 3×3 grid and active cell styling now prioritize high contrast (light active tile with soft glow) against a quiet navy background.
- Mobile includes a fixed bottom navigation bar (Home / History / Result) outside active session mode.

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
