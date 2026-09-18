export const TMDB_API_BASE = 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w342'

export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY ?? ''
export const hasTmdbKey = TMDB_API_KEY.length > 0

export function posterUrl(posterPath: string | null): string | null {
  return posterPath ? `${TMDB_IMAGE_BASE}${posterPath}` : null
}
