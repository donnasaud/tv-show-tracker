export function TmdbSearchForm({
  query,
  onChange,
}: {
  query: string
  onChange: (query: string) => void
}) {
  return (
    <input
      type="search"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search TMDb for a show…"
      autoFocus
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
    />
  )
}
