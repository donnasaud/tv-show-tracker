import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useShows } from '../hooks/useShows'
import { SHOW_STATUSES, STATUS_LABELS, type Show, type ShowStatus, type SortOption } from '../types/show'
import { StatusFilterTabs } from '../components/dashboard/StatusFilterTabs'
import { ShowList } from '../components/dashboard/ShowList'
import { EmptyState } from '../components/common/EmptyState'

function sortShows(shows: Show[], sort: SortOption): Show[] {
  const copy = [...shows]
  switch (sort) {
    case 'title':
      return copy.sort((a, b) => a.title.localeCompare(b.title))
    case 'rating':
      return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    case 'lastUpdated':
      return copy.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
  }
}

export function DashboardPage() {
  const shows = useShows()
  const [filter, setFilter] = useState<ShowStatus | 'all'>('all')
  const [sort, setSort] = useState<SortOption>('lastUpdated')

  const counts = useMemo(() => {
    const base: Record<ShowStatus | 'all', number> = {
      all: 0,
      watching: 0,
      plan_to_watch: 0,
      completed: 0,
      on_hold: 0,
      dropped: 0,
    }
    for (const show of shows ?? []) {
      base.all += 1
      base[show.status] += 1
    }
    return base
  }, [shows])

  const visibleShows = useMemo(() => {
    const all = shows ?? []
    const filtered = filter === 'all' ? all : all.filter((s) => s.status === filter)
    return sortShows(filtered, sort)
  }, [shows, filter, sort])

  if (shows === undefined) {
    return <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-400">Loading…</div>
  }

  if (shows.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6">
        <EmptyState
          title="No shows yet"
          description="Add your first show to start tracking your watch progress."
          action={
            <Link
              to="/add"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Add a show
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <StatusFilterTabs active={filter} onChange={setFilter} counts={counts} />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
        >
          <option value="lastUpdated">Sort: Last updated</option>
          <option value="title">Sort: Title (A–Z)</option>
          <option value="rating">Sort: Rating</option>
        </select>
      </div>

      {filter === 'all' ? (
        <div className="space-y-6">
          {SHOW_STATUSES.filter((status) => counts[status] > 0).map((status) => (
            <section key={status}>
              <h2 className="mb-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {STATUS_LABELS[status]}
              </h2>
              <ShowList shows={sortShows(visibleShows.filter((s) => s.status === status), sort)} />
            </section>
          ))}
        </div>
      ) : (
        <ShowList shows={visibleShows} />
      )}
    </div>
  )
}
