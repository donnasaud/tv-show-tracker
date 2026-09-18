import { useEffect, useState } from 'react'
import { searchShows } from '../api/tmdb'
import { hasTmdbKey } from '../api/config'
import type { TmdbSearchResult } from '../api/tmdbTypes'

export function useTmdbSearch(query: string) {
  const [results, setResults] = useState<TmdbSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!hasTmdbKey || query.trim().length === 0) {
      setResults([])
      setError(null)
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    const timer = setTimeout(async () => {
      try {
        const res = await searchShows(query)
        if (!cancelled) setResults(res.results)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Search failed')
          setResults([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 350)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query])

  return { results, loading, error }
}
