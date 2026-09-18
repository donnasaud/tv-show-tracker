import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addManualShow } from '../../db/showsRepo'

export function ManualAddForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [posterUrl, setPosterUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)
    try {
      const show = await addManualShow(title.trim(), posterUrl.trim() || null)
      navigate(`/shows/${show.id}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Show title"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Poster URL (optional)</label>
        <input
          value={posterUrl}
          onChange={(e) => setPosterUrl(e.target.value)}
          placeholder="https://…"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
      <button
        type="submit"
        disabled={submitting || !title.trim()}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {submitting ? 'Adding…' : 'Add show manually'}
      </button>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        You can add seasons and episodes from the show's page afterward.
      </p>
    </form>
  )
}
