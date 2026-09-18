import type { Show } from '../../types/show'
import { ShowCard } from './ShowCard'

export function ShowList({ shows }: { shows: Show[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  )
}
