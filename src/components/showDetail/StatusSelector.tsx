import { SHOW_STATUSES, STATUS_LABELS, type ShowStatus } from '../../types/show'
import { setStatus } from '../../db/showsRepo'

export function StatusSelector({ showId, status }: { showId: string; status: ShowStatus }) {
  return (
    <select
      value={status}
      onChange={(e) => setStatus(showId, e.target.value as ShowStatus)}
      className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
    >
      {SHOW_STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  )
}
