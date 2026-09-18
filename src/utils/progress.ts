import type { Episode, Show } from '../types/show'

export function computeWatchedCount(show: Show): { watched: number; total: number } {
  let watched = 0
  let total = 0
  for (const season of show.seasons) {
    for (const episode of season.episodes) {
      total += 1
      if (episode.watched) watched += 1
    }
  }
  return { watched, total }
}

export interface NextEpisode {
  seasonNumber: number
  episode: Episode
}

export function computeNextEpisode(show: Show): NextEpisode | null {
  const sortedSeasons = [...show.seasons].sort((a, b) => a.seasonNumber - b.seasonNumber)
  for (const season of sortedSeasons) {
    const sortedEpisodes = [...season.episodes].sort((a, b) => a.episodeNumber - b.episodeNumber)
    for (const episode of sortedEpisodes) {
      if (!episode.watched) {
        return { seasonNumber: season.seasonNumber, episode }
      }
    }
  }
  return null
}
