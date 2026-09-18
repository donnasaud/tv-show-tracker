export type ShowStatus =
  | 'watching'
  | 'plan_to_watch'
  | 'completed'
  | 'on_hold'
  | 'dropped'

export const SHOW_STATUSES: ShowStatus[] = [
  'watching',
  'plan_to_watch',
  'completed',
  'on_hold',
  'dropped',
]

export const STATUS_LABELS: Record<ShowStatus, string> = {
  watching: 'Watching',
  plan_to_watch: 'Plan to Watch',
  completed: 'Completed',
  on_hold: 'On Hold',
  dropped: 'Dropped',
}

export interface Episode {
  episodeNumber: number
  title: string
  airDate: string | null
  watched: boolean
  watchedDate: string | null
}

export interface Season {
  seasonNumber: number
  name: string
  episodes: Episode[]
}

export interface Show {
  id: string
  tmdbId: number | null
  title: string
  posterUrl: string | null
  overview: string | null
  status: ShowStatus
  rating: number | null
  notes: string
  dateAdded: string
  lastUpdated: string
  seasons: Season[]
}

export type SortOption = 'title' | 'rating' | 'lastUpdated'
