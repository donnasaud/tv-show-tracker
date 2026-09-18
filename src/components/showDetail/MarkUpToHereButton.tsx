import { markWatchedUpTo } from '../../db/showsRepo'

export function MarkUpToHereButton({
  showId,
  seasonNumber,
  episodeNumber,
}: {
  showId: string
  seasonNumber: number
  episodeNumber: number
}) {
  return (
    <button
      onClick={() => markWatchedUpTo(showId, seasonNumber, episodeNumber)}
      className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
      title="Mark all episodes up to and including this one as watched"
    >
      Mark up to here
    </button>
  )
}
