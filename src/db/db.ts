import Dexie, { type EntityTable } from 'dexie'
import type { Show } from '../types/show'

export class TvTrackerDB extends Dexie {
  shows!: EntityTable<Show, 'id'>

  constructor() {
    super('tv-tracker')
    this.version(1).stores({
      shows: 'id, status, title, tmdbId',
    })
  }
}

export const db = new TvTrackerDB()
