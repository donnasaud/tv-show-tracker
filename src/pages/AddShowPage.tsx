import { useState } from 'react'
import { hasTmdbKey } from '../api/config'
import { useTmdbSearch } from '../hooks/useTmdbSearch'
import { TmdbSearchForm } from '../components/addShow/TmdbSearchForm'
import { TmdbResultsList } from '../components/addShow/TmdbResultsList'
import { NoTmdbKeyNotice } from '../components/addShow/NoTmdbKeyNotice'
import { ManualAddForm } from '../components/addShow/ManualAddForm'

export function AddShowPage() {
  const [query, setQuery] = useState('')
  const { results, loading, error } = useTmdbSearch(query)

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-6">
      <h1 className="text-xl font-semibold">Add a show</h1>

      {hasTmdbKey ? (
        <div className="space-y-3">
          <TmdbSearchForm query={query} onChange={setQuery} />
          <TmdbResultsList results={results} loading={loading} error={error} />
        </div>
      ) : (
        <NoTmdbKeyNotice />
      )}

      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          Or add manually
        </h2>
        <ManualAddForm />
      </div>
    </div>
  )
}
