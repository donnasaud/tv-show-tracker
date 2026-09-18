export interface TmdbSearchResult {
  id: number
  name: string
  poster_path: string | null
  first_air_date: string | null
  overview: string | null
}

export interface TmdbSearchResponse {
  results: TmdbSearchResult[]
}

export interface TmdbSeasonSummary {
  season_number: number
  episode_count: number
  name: string
}

export interface TmdbShowDetails {
  id: number
  name: string
  poster_path: string | null
  overview: string | null
  seasons: TmdbSeasonSummary[]
}

export interface TmdbEpisode {
  episode_number: number
  name: string
  air_date: string | null
}

export interface TmdbSeasonDetails {
  season_number: number
  name: string
  episodes: TmdbEpisode[]
}
