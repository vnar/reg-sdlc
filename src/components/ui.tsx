import { clsx } from 'clsx'
import type { ReactNode } from 'react'

type Status = 'Draft' | 'In Review' | 'Approved' | 'Missing' | 'At Risk' | 'Complete'

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20', className)}>{children}</div>
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-100">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
    </div>
  )
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={clsx('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', className)}>{children}</span>
}

export function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Draft: 'border-slate-500/60 bg-slate-500/20 text-slate-300',
    'In Review': 'border-blue-500/60 bg-blue-500/20 text-blue-200',
    Approved: 'border-emerald-500/60 bg-emerald-500/20 text-emerald-200',
    Missing: 'border-rose-500/60 bg-rose-500/20 text-rose-200',
    'At Risk': 'border-amber-500/60 bg-amber-500/20 text-amber-100',
    Complete: 'border-teal-500/60 bg-teal-500/20 text-teal-200',
  }

  return <Badge className={styles[status]}>{status}</Badge>
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 rounded-full bg-slate-800">
      <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-teal-500 to-violet-500" style={{ width: `${value}%` }} />
    </div>
  )
}

export function Tooltip({ content, children }: { content: ReactNode; children: ReactNode }) {
  return (
    <span className="group relative inline-flex">
      <span
        tabIndex={0}
        className="inline-flex items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        {children}
      </span>
      <span
        className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 w-max max-w-[360px] -translate-x-1/2 rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-[11px] leading-snug text-slate-100 shadow-lg opacity-0 shadow-black/40 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 normal-case tracking-normal break-words"
        role="tooltip"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-l border-t border-white/10 bg-slate-950" />
        {content}
      </span>
    </span>
  )
}
