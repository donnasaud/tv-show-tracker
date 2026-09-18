import { useState } from 'react'
import type { Season } from '../../types/show'
import { addEpisode } from '../../db/showsRepo'
import { EpisodeRow } from './EpisodeRow'

export function SeasonAccordion({
  showId,
  season,
  defaultOpen,
}: {
  showId: string
  season: Season
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [addingEpisode, setAddingEpisode] = useState(false)
  const [episodeTitle, setEpisodeTitle] = useState('')

  const sortedEpisodes = [...season.episodes].sort((a, b) => a.episodeNumber - b.episodeNumber)
  const watchedCount = sortedEpisodes.filter((e) => e.watched).length

  async function handleAddEpisode(e: React.FormEvent) {
    e.preventDefault()
    if (!episodeTitle.trim()) return
    const nextNumber = (sortedEpisodes.at(-1)?.episodeNumber ?? 0) + 1
    await addEpisode(showId, season.seasonNumber, {
      episodeNumber: nextNumber,
      title: episodeTitle.trim(),
      airDate: null,
    })
    setEpisodeTitle('')
    setAddingEpisode(false)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between bg-slate-50 px-3 py-2 text-left text-sm font-medium dark:bg-slate-900"
      >
        <span>
          Season {season.seasonNumber}
          {season.name && season.name !== `Season ${season.seasonNumber}` ? ` — ${season.name}` : ''}
        </span>
        <span className="flex items-center gap-2 text-xs font-normal text-slate-500 dark:text-slate-400">
          {watchedCount}/{sortedEpisodes.length}
          <span className="text-slate-400">{open ? '▲' : '▼'}</span>
        </span>
      </button>
      {open && (
        <div className="divide-y divide-slate-100 px-1 py-1 dark:divide-slate-800">
          {sortedEpisodes.map((episode) => (
            <EpisodeRow
              key={episode.episodeNumber}
              showId={showId}
              seasonNumber={season.seasonNumber}
              episode={episode}
            />
          ))}
          {sortedEpisodes.length === 0 && (
            <p className="px-2 py-2 text-sm text-slate-400">No episodes yet.</p>
          )}
          <div className="px-2 py-2">
            {addingEpisode ? (
              <form onSubmit={handleAddEpisode} className="flex gap-2">
                <input
                  autoFocus
                  value={episodeTitle}
                  onChange={(e) => setEpisodeTitle(e.target.value)}
                  placeholder="Episode title"
                  className="flex-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                />
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setAddingEpisode(false)}
                  className="rounded-md px-2 py-1 text-xs text-slate-500"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setAddingEpisode(true)}
                className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                + Add episode
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
