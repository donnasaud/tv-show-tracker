import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../db/db'
import type { Show } from '../types/show'

export function useShow(id: string | undefined): Show | undefined {
  return useLiveQuery(() => (id ? db.shows.get(id) : undefined), [id])
}
