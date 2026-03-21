import { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'

const FEEDBACK_ENDPOINT =
  import.meta.env.VITE_FEEDBACK_ENDPOINT?.trim() || 'https://formspree.io/f/mwplkgod'

export default function FeedbackWidget({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // Fire-and-forget submit; keep UX silent and close immediately.
    fetch(FEEDBACK_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
      keepalive: true,
    }).catch(() => {})
    e.currentTarget.reset()
    handleClose()
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-slate-900/85 px-4 py-2 text-sm font-semibold text-indigo-200 shadow-lg shadow-black/30 backdrop-blur transition hover:bg-slate-900"
      >
        <MessageSquare size={15} />
        Feedback
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/75 p-3 sm:items-center" onClick={handleClose}>
          <div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-100">Share feedback</h3>
                <p className="mt-1 text-xs text-slate-400">Sends directly to your configured feedback inbox.</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-white/10 p-1.5 text-slate-300 transition hover:bg-white/5"
                aria-label="Close feedback form"
              >
                <X size={14} />
              </button>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input type="hidden" name="page" value={currentPath} />
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              />
              <textarea
                name="message"
                placeholder="What can we improve?"
                required
                rows={4}
                maxLength={200}
                className="w-full resize-y rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="inline-flex min-h-[40px] items-center rounded-lg border border-indigo-400/35 bg-indigo-500/15 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/25"
              >
                Send feedback
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}
