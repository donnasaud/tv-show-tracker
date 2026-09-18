import { useEffect, useRef, useState } from 'react'
import { setNotes } from '../../db/showsRepo'

export function NotesField({ showId, notes }: { showId: string; notes: string }) {
  const [value, setValue] = useState(notes)
  const [saved, setSaved] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setValue(notes)
  }, [notes])

  function handleChange(next: string) {
    setValue(next)
    setSaved(false)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      await setNotes(showId, next)
      setSaved(true)
    }, 600)
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-sm font-medium">Notes</label>
        <span className="text-xs text-slate-400">{saved ? 'Saved' : 'Saving…'}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        rows={3}
        placeholder="Your thoughts on this show…"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
      />
    </div>
  )
}
