# TV Show Tracker

A personal app for tracking TV show viewing progress — which shows you're watching, where you left off (season/episode), and what you've finished, want to watch, or dropped.

**Why this exists:** [TV Time](https://tvtime.com/) shut down, and I needed something to replace it. This is my own lightweight version, built for myself — no accounts, no social features, just a fast personal watch tracker. I'm also using this project to experiment with building an app end-to-end with [Claude](https://claude.com/claude-code) (Anthropic's AI coding assistant) — from a PRD through implementation and deployment.

**Live demo:** [tv-show-tracker-donna.netlify.app](https://tv-show-tracker-donna.netlify.app)

## Features

- Add a show by searching [TMDb](https://www.themoviedb.org/) (The Movie Database), or add one manually
- Full season/episode list per show, pulled from TMDb where available
- Mark individual episodes watched/unwatched, or bulk-mark "watched up to here"
- Organize shows by status: Watching, Plan to Watch, Completed, On Hold, Dropped
- Dashboard showing every show's progress and next unwatched episode, with a one-tap "mark next episode watched" action
- Ratings and personal notes per show
- Sort/filter by status, rating, title, or last updated
- All data stored locally in your browser (IndexedDB) — no account, no server, no sync

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for navigation
- [Dexie.js](https://dexie.org/) (IndexedDB wrapper) with `dexie-react-hooks` for reactive local persistence
- [TMDb API](https://developer.themoviedb.org/docs) for show search and metadata

Data lives entirely in your browser's IndexedDB — there's no backend, no database to host, and no login system. That also means your library is tied to one browser/device; clearing site data or switching browsers starts you fresh.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. Manually adding shows works immediately with no setup.

### TMDb API key (optional, enables search)

To search for shows instead of adding them manually, you'll need a free TMDb API key:

1. Create an account at [themoviedb.org](https://www.themoviedb.org/) and go to **Settings → API**
2. Copy your **API Read Access Token** (the v4 auth token, not the older v3 API key)
3. Copy `.env.example` to `.env` and paste it in:

```bash
cp .env.example .env
```

```
VITE_TMDB_API_KEY=your_read_access_token_here
```

4. Restart the dev server

Without a key, search is disabled but manual add-a-show still works fully.

## Building & deployment

```bash
npm run build
```

This produces a static `dist/` folder — no server required. The live demo is deployed on [Netlify](https://www.netlify.com/) (see `netlify.toml`); the `VITE_TMDB_API_KEY` env var is set in the Netlify site settings since Vite bakes env vars in at build time.

## Project structure

```
src/
  db/            Dexie schema and typed CRUD operations
  api/           TMDb client and response mapping
  types/         Shared TypeScript types
  pages/         Dashboard, Add Show, Show Detail
  components/    UI components, grouped by page
  hooks/         Reactive data hooks (useLiveQuery-based)
  utils/         Progress/next-episode calculations, formatting
```

## Status

MVP complete: adding shows, episode-level tracking, status categories, ratings/notes, and a dashboard are all working. Not yet built: stats dashboard, notifications, and import/export — see `tv_show_tracker_prd.md` for the original product spec.
