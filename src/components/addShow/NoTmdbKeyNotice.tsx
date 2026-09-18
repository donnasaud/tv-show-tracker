export function NoTmdbKeyNotice() {
  return (
    <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
      <p className="font-medium">TMDb search isn't set up yet</p>
      <p className="mt-1">
        Get a free API read-access token at{' '}
        <a
          href="https://www.themoviedb.org/settings/api"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          themoviedb.org
        </a>
        , then add it as <code className="rounded bg-black/10 px-1 py-0.5 dark:bg-white/10">VITE_TMDB_API_KEY</code> in
        a <code className="rounded bg-black/10 px-1 py-0.5 dark:bg-white/10">.env</code> file at the project root and
        restart the dev server. You can still add shows manually below in the meantime.
      </p>
    </div>
  )
}
