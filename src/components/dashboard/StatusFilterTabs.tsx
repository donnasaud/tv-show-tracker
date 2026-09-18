import { SHOW_STATUSES, STATUS_LABELS, type ShowStatus } from '../../types/show'

export function StatusFilterTabs({
  active,
  onChange,
  counts,
}: {
  active: ShowStatus | 'all'
  onChange: (status: ShowStatus | 'all') => void
  counts: Record<ShowStatus | 'all', number>
}) {
  const options: (ShowStatus | 'all')[] = ['all', ...SHOW_STATUSES]
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const label = option === 'all' ? 'All' : STATUS_LABELS[option]
        const isActive = active === option
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {label} <span className="opacity-70">{counts[option] ?? 0}</span>
          </button>
        )
      })}
    </div>
  )
}
