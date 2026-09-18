import { setRating } from '../../db/showsRepo'

export function RatingInput({ showId, rating }: { showId: string; rating: number | null }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(showId, rating === star ? null : star)}
          className="text-lg leading-none"
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <span className={rating != null && star <= rating ? 'text-amber-400' : 'text-slate-300 dark:text-slate-700'}>
            ★
          </span>
        </button>
      ))}
    </div>
  )
}
