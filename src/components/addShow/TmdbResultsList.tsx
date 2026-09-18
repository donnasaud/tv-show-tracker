import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TmdbSearchResult } from '../../api/tmdbTypes'
import { posterUrl } from '../../api/config'
import { buildShowFromTmdb } from '../../api/mapTmdbToShow'
import { addShow } from '../../db/showsRepo'

export function TmdbResultsList({
  results,
  loading,
  error,
}: {
  results: TmdbSearchResult[]
  loading: boolean
  error: string | null
}) {
  const navigate = useNavigate()
  const [addingId, setAddingId] = useState<number | null>(null)
  const [addError, setAddError] = useState<string | null>(null)

  async function handleAdd(result: TmdbSearchResult) {
    setAddingId(result.id)
    setAddError(null)
    try {
      const showInput = await buildShowFromTmdb(result.id)
      const show = await addShow(showInput)
      navigate(`/shows/${show.id}`)
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'Failed to add show')
    } finally {
      setAddingId(null)
    }
  }

  if (error) {
    return (
      <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
        Search failed: {error}
      </p>
    )
  }

  if (loading) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">Searching…</p>
  }

  if (results.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      {addError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {addError}
        </p>
      )}
      {results.map((result) => {
        const year = result.first_air_date ? result.first_air_date.slice(0, 4) : null
        const img = posterUrl(result.poster_path)
        return (
          <div
            key={result.id}
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900"
          >
            {img ? (
              <img src={img} alt={result.name} className="h-16 w-11 rounded object-cover" />
            ) : (
              <div className="flex h-16 w-11 items-center justify-center rounded bg-slate-100 text-lg dark:bg-slate-800">
                📺
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {result.name} {year && <span className="text-slate-400">({year})</span>}
              </p>
              {result.overview && (
                <p className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                  {result.overview}
                </p>
              )}
            </div>
            <button
              onClick={() => handleAdd(result)}
              disabled={addingId === result.id}
              className="shrink-0 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {addingId === result.id ? 'Adding…' : 'Add'}
            </button>
          </div>
        )
      })}
    </div>
  )
}
