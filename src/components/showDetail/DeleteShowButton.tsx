import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteShow } from '../../db/showsRepo'
import { ConfirmDialog } from '../common/ConfirmDialog'

export function DeleteShowButton({ showId, title }: { showId: string; title: string }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  async function handleConfirm() {
    await deleteShow(showId)
    navigate('/')
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
      >
        Delete show
      </button>
      <ConfirmDialog
        open={open}
        title="Delete this show?"
        description={`"${title}" and all its watch progress will be permanently removed.`}
        confirmLabel="Delete"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  )
}
