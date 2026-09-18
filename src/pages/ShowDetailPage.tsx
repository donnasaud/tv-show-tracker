import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useShow } from '../hooks/useShow'
import { computeNextEpisode, computeWatchedCount } from '../utils/progress'
import { ProgressBar } from '../components/dashboard/ProgressBar'
import { StatusSelector } from '../components/showDetail/StatusSelector'
import { RatingInput } from '../components/showDetail/RatingInput'
import { NotesField } from '../components/showDetail/NotesField'
import { DeleteShowButton } from '../components/showDetail/DeleteShowButton'
import { SeasonAccordion } from '../components/showDetail/SeasonAccordion'
import { addSeason } from '../db/showsRepo'
import { EmptyState } from '../components/common/EmptyState'

export function ShowDetailPage() {
  const { id } = useParams<{ id: string }>()
  const show = useShow(id)
  const [addingSeason, setAddingSeason] = useState(false)

  if (!show) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <EmptyState
          title="Show not found"
          description="It may have been deleted, or is still loading."
          action={
            <Link to="/" className="text-sm font-medium text-indigo-600 hover:underline">
              Back to dashboard
            </Link>
          }
        />
      </div>
    )
  }

  const { watched, total } = computeWatchedCount(show)
  const next = computeNextEpisode(show)
  const sortedSeasons = [...show.seasons].sort((a, b) => a.seasonNumber - b.seasonNumber)
  const nextSeasonNumber = (sortedSeasons.at(-1)?.seasonNumber ?? 0) + 1

  async function handleAddSeason() {
    if (!id) return
    await addSeason(id, nextSeasonNumber, `Season ${nextSeasonNumber}`)
    setAddingSeason(false)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
      <Link to="/" className="text-sm text-indigo-600 hover:underline dark:text-indigo-400">
        ← Dashboard
      </Link>

      <div className="flex gap-4">
        {show.posterUrl ? (
          <img src={show.posterUrl} alt={show.title} className="h-40 w-28 shrink-0 rounded-lg object-cover" />
        ) : (
          <div className="flex h-40 w-28 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-3xl dark:bg-slate-800">
            📺
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h1 className="text-2xl font-semibold">{show.title}</h1>
          {show.overview && (
            <p className="line-clamp-3 text-sm text-slate-500 dark:text-slate-400">{show.overview}</p>
          )}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <StatusSelector showId={show.id} status={show.status} />
            <RatingInput showId={show.id} rating={show.rating} />
          </div>
          <ProgressBar watched={watched} total={total} />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {next
              ? `Next up: S${next.seasonNumber}E${next.episode.episodeNumber} — ${next.episode.title}`
              : total > 0
                ? 'All caught up 🎉'
                : 'No episodes yet — add a season below to get started.'}
          </p>
        </div>
      </div>

      <NotesField showId={show.id} notes={show.notes} />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Seasons</h2>
          {addingSeason ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Season {nextSeasonNumber}</span>
              <button
                onClick={handleAddSeason}
                className="rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-indigo-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setAddingSeason(false)}
                className="rounded-md px-2 py-1 text-xs text-slate-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddingSeason(true)}
              className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              + Add season
            </button>
          )}
        </div>

        <div className="space-y-2">
          {sortedSeasons.map((season) => (
            <SeasonAccordion
              key={season.seasonNumber}
              showId={show.id}
              season={season}
              defaultOpen={next ? season.seasonNumber === next.seasonNumber : season === sortedSeasons.at(-1)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
        <DeleteShowButton showId={show.id} title={show.title} />
      </div>
    </div>
  )
}
