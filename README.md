# Retrace

Retrace is a personal N-back training web app.
Current implementation includes a playable **position-based 2-back** session with local persistence and history view.

## Implemented scope

- Position N-back (fixed `N=2`)
- `25` trials per session
- Trial timing:
  - `stimulusDurationMs = 700`
  - `interStimulusIntervalMs = 1800`
- Input:
  - Desktop: `Space`
  - Mobile: on-screen `Match` button
- Scoring:
  - hit / miss / false alarm / correct rejection
  - accuracy
  - average reaction time (pressed trials only)
- Persistence:
  - localStorage key: `nback_session_results`
- Screens:
  - Home
  - Session
  - Result (with previous-session comparison)
  - History

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

## Quality checks

```bash
npm run build
npm run lint
npm run test
```

## Vercel deployment

This repository is prepared for Vercel deployment.

### Option A: Import project from Git

1. Push this repository to GitHub.
2. In Vercel dashboard, click **Add New Project**.
3. Import the repository.
4. Framework preset should be detected as **Vite**.
5. Deploy.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

## Architecture overview

- `src/features/nback/generator.ts`: trial generation
- `src/features/nback/scoring.ts`: outcome and scoring
- `src/features/nback/useNBackSession.ts`: session flow/timing/input window
- `src/features/nback/storage.ts`: localStorage persistence
- `src/components/*`: reusable UI components
- `src/pages/*`: route-level screens

## Known limitations

- No pause/resume control yet.
- No adaptive difficulty.
- No cloud sync or account system.
- Session engine currently runs continuously once started.

## Future extension ideas

- Add pause/resume and quit with partial-session handling.
- Add deterministic seed mode for debugging and reproducible tests.
- Add richer charts in history.
- Add optional audio or dual N-back in a later release.
