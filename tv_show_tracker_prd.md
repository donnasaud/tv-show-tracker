# Product Requirements Document: TV Show Tracker

## 1. Overview

**Product name:** TV Show Tracker (working title)

**Summary:** A personal app for tracking TV show viewing progress — which shows you're watching, where you left off (season/episode), and shows you've finished, want to watch, or dropped.

**Problem statement:** People who watch many shows across multiple streaming platforms lose track of where they stopped in each one. This causes frustration ("did I watch this episode already?"), decision fatigue about what to watch next, and lost momentum on shows they intended to finish.

**Goal:** Give the user a single, fast, reliable place to see and update their progress across all shows they watch.

---

## 2. Target User

- Primary: the app's creator/owner — a person who watches multiple TV shows simultaneously across different platforms.
- Secondary (if expanded later): friends/family who want the same simple tracking tool.

---

## 3. Goals and Success Metrics

| Goal | Metric |
|---|---|
| Never lose track of watch progress | User can find "where I stopped" for any show in under 10 seconds |
| Reduce friction in logging | Marking an episode watched takes 1–2 taps |
| Encourage finishing shows | % of "in progress" shows that reach "completed" over time |
| Reliable single source of truth | Zero data loss / sync issues across sessions |

---

## 4. User Stories

1. As a user, I want to add a show to my list so I can start tracking it.
2. As a user, I want to mark episodes as watched so my progress is saved.
3. As a user, I want to see, at a glance, the last episode I watched for each show.
4. As a user, I want to categorize shows (Watching, Plan to Watch, Completed, On Hold, Dropped) so I can organize my list.
5. As a user, I want to search for a show and see its full season/episode list so I can log progress even if I've fallen behind.
6. As a user, I want to rate or leave short notes on shows so I can remember my opinion later.
7. As a user, I want to see stats (e.g., shows completed this year, total episodes watched) so I can reflect on my viewing habits.
8. As a user, I want my data to persist across sessions/devices so I don't lose my tracking history.

---

## 5. Features

### 5.1 Must-Have (MVP)
- **Add a show** — search by title via the **TMDb API**, or add manually.
- **Show detail view** — season/episode list with watched/unwatched state.
- **Progress tracking** — mark individual episodes, or "mark all up to here," as watched.
- **Status categories** — Watching, Plan to Watch, Completed, On Hold, Dropped.
- **Home/dashboard view** — list of shows grouped or filterable by status, showing next unwatched episode.
- **Persistence** — data saved reliably between sessions.

### 5.2 Nice-to-Have (Post-MVP)
- Ratings (e.g., 1–5 stars) and personal notes per show or episode.
- Basic stats/dashboard (episodes watched, hours watched, shows completed per year).
- Reminders/notifications for new episodes of shows marked "Watching."
- Poster art and show metadata (synopsis, network, air dates) pulled from an API.
- Sorting/filtering (by status, rating, last updated, alphabetical).
- Import/export of watch data (CSV or JSON).

### 5.3 Out of Scope (for now)
- Social features (following friends, sharing lists publicly).
- Streaming platform integration (auto-detecting what you watched).
- Recommendations engine.
- Multi-user accounts / login system (unless the app is meant to be shared).

---

## 6. Functional Requirements

| ID | Requirement |
|---|---|
| FR1 | User can search for and add a show via the TMDb API, or add one manually. |
| FR2 | Each show stores: title, poster/image, list of seasons and episodes, current status, last-watched episode — populated from TMDb where available. |
| FR3 | User can toggle individual episodes as watched/unwatched. |
| FR4 | User can bulk-mark episodes as watched up to a chosen point. |
| FR5 | User can change a show's status at any time. |
| FR6 | Dashboard displays all shows with their status and next episode to watch. |
| FR7 | Data persists locally and/or in a backend so it survives app restarts. |
| FR8 | User can delete a show from their list. |

---

## 7. Non-Functional Requirements

- **Performance:** Show list and detail views load in under 1 second for a typical library (~100 shows).
- **Reliability:** No data loss on crash or offline use; changes sync/save automatically.
- **Usability:** Core action (marking an episode watched) reachable in 1–2 taps from the dashboard.
- **Platform:** To be decided — web app, mobile app, or both (see Open Questions).
- **Offline support:** Nice-to-have — ability to log progress without an internet connection, syncing later.

---

## 8. Data Model (draft)

**Show**
- id, title, poster_url, external_id (from metadata API), status, rating (optional), notes (optional), date_added

**Season**
- id, show_id, season_number, episode_count

**Episode**
- id, season_id, episode_number, title, watched (boolean), watched_date

---

## 9. UX Considerations

- Dashboard should immediately answer "what do I watch next?" for each in-progress show.
- Minimize taps for the most common action: marking the next episode watched.
- Visual progress indicators (e.g., progress bar per show: "12/24 episodes watched").
- Clear separation between statuses so the list doesn't feel cluttered.

---

## 10. Open Questions

1. **Platform:** Should this be a mobile app, web app, or both? (Affects tech stack choice.)
2. ~~Metadata source~~ — **Decided: TMDb (The Movie Database) API.** IMDb was considered but ruled out — it has no free official API; third-party "IMDb API" services are unofficial scrapers with limited free tiers and legal ambiguity around commercial use. TMDb offers a free, well-documented API with strong TV/season/episode-level data, which covers FR1 and FR2 directly.
3. **Single-user vs. multi-user:** Just for you, or should it support accounts for others too?
4. **Storage:** Local-only storage (simplest, no backend needed) vs. cloud sync (needed if you want multi-device access)?
5. **Notifications:** Is alerting about new episodes a priority, or purely passive tracking?

---

## 11. Milestones (suggested)

1. **MVP:** Add shows manually, track episode-level progress, basic dashboard, local storage.
2. **V1:** Metadata API integration for search/auto-populate, status filtering, progress bars.
3. **V2:** Ratings/notes, stats dashboard, notifications, import/export.
