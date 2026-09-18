import type { Episode } from '../../types/show'
import { toggleEpisodeWatched } from '../../db/showsRepo'
import { formatDate } from '../../utils/format'
import { MarkUpToHereButton } from './MarkUpToHereButton'

export function EpisodeRow({
  showId,
  seasonNumber,
  episode,
}: {
  showId: string
  seasonNumber: number
  episode: Episode
}) {
  return (
    <div className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800/60">
      <input
        type="checkbox"
        checked={episode.watched}
        onChange={() => toggleEpisodeWatched(showId, seasonNumber, episode.episodeNumber)}
        className="h-4 w-4 shrink-0 accent-indigo-600"
      />
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm ${episode.watched ? 'text-slate-400 line-through' : ''}`}>
          <span className="text-slate-400">E{episode.episodeNumber}</span> {episode.title}
        </p>
      </div>
      {episode.airDate && (
        <span className="shrink-0 text-xs text-slate-400">{formatDate(episode.airDate)}</span>
      )}
      {!episode.watched && (
        <MarkUpToHereButton
          showId={showId}
          seasonNumber={seasonNumber}
          episodeNumber={episode.episodeNumber}
        />
      )}
    </div>
  )
}
