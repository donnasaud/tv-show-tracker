import { getSeasonDetails, getShowDetails } from './tmdb'
import { posterUrl } from './config'
import type { Season, Show } from '../types/show'

export async function buildShowFromTmdb(
  tvId: number,
): Promise<Omit<Show, 'id' | 'dateAdded' | 'lastUpdated'>> {
  const details = await getShowDetails(tvId)

  const realSeasons = details.seasons.filter((s) => s.season_number > 0 && s.episode_count > 0)
  const seasonDetails = await Promise.all(
    realSeasons.map((s) => getSeasonDetails(tvId, s.season_number)),
  )

  const seasons: Season[] = seasonDetails.map((sd) => ({
    seasonNumber: sd.season_number,
    name: sd.name,
    episodes: sd.episodes.map((ep) => ({
      episodeNumber: ep.episode_number,
      title: ep.name,
      airDate: ep.air_date,
      watched: false,
      watchedDate: null,
    })),
  }))

  return {
    tmdbId: details.id,
    title: details.name,
    posterUrl: posterUrl(details.poster_path),
    overview: details.overview,
    status: 'plan_to_watch',
    rating: null,
    notes: '',
    seasons,
  }
}
