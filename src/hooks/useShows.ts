import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import type { Show } from '../types/show'

export function useShows(): Show[] | undefined {
  return useLiveQuery(() => db.shows.toArray(), [])
}
