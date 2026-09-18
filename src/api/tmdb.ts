import { TMDB_API_BASE, TMDB_API_KEY } from './config'
import type {
  TmdbSearchResponse,
  TmdbSeasonDetails,
  TmdbShowDetails,
} from './tmdbTypes'

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${TMDB_API_BASE}${path}`)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
      accept: 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error(`TMDb request failed (${res.status}): ${path}`)
  }
  return res.json() as Promise<T>
}

export async function searchShows(query: string): Promise<TmdbSearchResponse> {
  return tmdbFetch<TmdbSearchResponse>('/search/tv', { query })
}

export async function getShowDetails(tvId: number): Promise<TmdbShowDetails> {
  return tmdbFetch<TmdbShowDetails>(`/tv/${tvId}`)
}

export async function getSeasonDetails(
  tvId: number,
  seasonNumber: number,
): Promise<TmdbSeasonDetails> {
  return tmdbFetch<TmdbSeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`)
}
