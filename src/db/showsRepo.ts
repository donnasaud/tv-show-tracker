import { db } from './db'
import type { Episode, Show, ShowStatus } from '../types/show'

function nowIso(): string {
  return new Date().toISOString()
}

function newId(): string {
  return crypto.randomUUID()
}

export async function getAllShows(): Promise<Show[]> {
  return db.shows.toArray()
}

export async function getShow(id: string): Promise<Show | undefined> {
  return db.shows.get(id)
}

export async function addShow(
  input: Omit<Show, 'id' | 'dateAdded' | 'lastUpdated'>,
): Promise<Show> {
  const show: Show = {
    ...input,
    id: newId(),
    dateAdded: nowIso(),
    lastUpdated: nowIso(),
  }
  await db.shows.add(show)
  return show
}

export async function addManualShow(title: string, posterUrl: string | null): Promise<Show> {
  return addShow({
    tmdbId: null,
    title,
    posterUrl,
    overview: null,
    status: 'plan_to_watch',
    rating: null,
    notes: '',
    seasons: [],
  })
}

export async function deleteShow(id: string): Promise<void> {
  await db.shows.delete(id)
}

async function updateShow(id: string, mutate: (show: Show) => Show): Promise<void> {
  await db.transaction('rw', db.shows, async () => {
    const show = await db.shows.get(id)
    if (!show) return
    const updated = mutate(show)
    updated.lastUpdated = nowIso()
    await db.shows.put(updated)
  })
}

export async function setStatus(id: string, status: ShowStatus): Promise<void> {
  await updateShow(id, (show) => ({ ...show, status }))
}

export async function setRating(id: string, rating: number | null): Promise<void> {
  await updateShow(id, (show) => ({ ...show, rating }))
}

export async function setNotes(id: string, notes: string): Promise<void> {
  await updateShow(id, (show) => ({ ...show, notes }))
}

export async function toggleEpisodeWatched(
  id: string,
  seasonNumber: number,
  episodeNumber: number,
): Promise<void> {
  await updateShow(id, (show) => ({
    ...show,
    seasons: show.seasons.map((season) => {
      if (season.seasonNumber !== seasonNumber) return season
      return {
        ...season,
        episodes: season.episodes.map((ep) => {
          if (ep.episodeNumber !== episodeNumber) return ep
          const watched = !ep.watched
          return { ...ep, watched, watchedDate: watched ? nowIso() : null }
        }),
      }
    }),
  }))
}

export async function markNextEpisodeWatched(id: string): Promise<void> {
  await updateShow(id, (show) => {
    const sortedSeasons = [...show.seasons].sort((a, b) => a.seasonNumber - b.seasonNumber)
    for (const season of sortedSeasons) {
      const sortedEpisodes = [...season.episodes].sort((a, b) => a.episodeNumber - b.episodeNumber)
      const next = sortedEpisodes.find((ep) => !ep.watched)
      if (next) {
        return {
          ...show,
          seasons: show.seasons.map((s) =>
            s.seasonNumber !== season.seasonNumber
              ? s
              : {
                  ...s,
                  episodes: s.episodes.map((ep) =>
                    ep.episodeNumber !== next.episodeNumber
                      ? ep
                      : { ...ep, watched: true, watchedDate: nowIso() },
                  ),
                },
          ),
        }
      }
    }
    return show
  })
}

function episodeSortKey(seasonNumber: number, episodeNumber: number): number {
  return seasonNumber * 100000 + episodeNumber
}

export async function markWatchedUpTo(
  id: string,
  seasonNumber: number,
  episodeNumber: number,
): Promise<void> {
  const cutoff = episodeSortKey(seasonNumber, episodeNumber)
  await updateShow(id, (show) => ({
    ...show,
    seasons: show.seasons.map((season) => ({
      ...season,
      episodes: season.episodes.map((ep) => {
        if (episodeSortKey(season.seasonNumber, ep.episodeNumber) > cutoff) return ep
        if (ep.watched) return ep
        return { ...ep, watched: true, watchedDate: nowIso() }
      }),
    })),
  }))
}

export async function addSeason(id: string, seasonNumber: number, name: string): Promise<void> {
  await updateShow(id, (show) => ({
    ...show,
    seasons: [...show.seasons, { seasonNumber, name, episodes: [] }],
  }))
}

export async function addEpisode(
  id: string,
  seasonNumber: number,
  episode: Omit<Episode, 'watched' | 'watchedDate'>,
): Promise<void> {
  await updateShow(id, (show) => ({
    ...show,
    seasons: show.seasons.map((season) =>
      season.seasonNumber !== seasonNumber
        ? season
        : { ...season, episodes: [...season.episodes, { ...episode, watched: false, watchedDate: null }] },
    ),
  }))
}
