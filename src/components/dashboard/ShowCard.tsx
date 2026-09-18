import { Link } from 'react-router-dom'
import type { Show } from '../../types/show'
import { STATUS_LABELS } from '../../types/show'
import { computeNextEpisode, computeWatchedCount } from '../../utils/progress'
import { markNextEpisodeWatched } from '../../db/showsRepo'
import { ProgressBar } from './ProgressBar'

const STATUS_BADGE_CLASS: Record<Show['status'], string> = {
  watching: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  plan_to_watch: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  completed: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  on_hold: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  dropped: 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
}

export function ShowCard({ show }: { show: Show }) {
  const { watched, total } = computeWatchedCount(show)
  const next = computeNextEpisode(show)

  return (
    <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <Link to={`/shows/${show.id}`} className="shrink-0">
        {show.posterUrl ? (
          <img
            src={show.posterUrl}
            alt={show.title}
            className="h-24 w-16 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-24 w-16 items-center justify-center rounded-md bg-slate-100 text-2xl dark:bg-slate-800">
            📺
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link to={`/shows/${show.id}`} className="truncate font-medium hover:underline">
              {show.title}
            </Link>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE_CLASS[show.status]}`}
            >
              {STATUS_LABELS[show.status]}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
            {next
              ? `Next: S${next.seasonNumber}E${next.episode.episodeNumber} — ${next.episode.title}`
              : total > 0
                ? 'All caught up'
                : 'No episodes yet'}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1">
            <ProgressBar watched={watched} total={total} />
          </div>
          {next && (
            <button
              onClick={() => markNextEpisodeWatched(show.id)}
              className="shrink-0 rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-indigo-700"
              title="Mark next episode watched"
            >
              ✓ Watched
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
