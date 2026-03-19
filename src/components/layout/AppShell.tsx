import { Compass, Shield, Binary, Route, GitBranch, FolderKanban, Landmark, CheckSquare, Network, Siren, Milestone } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'

const frameworkNavItems = [{ to: '/', label: 'Framework Overview', icon: Compass }]

const chapterNavItems = [
  { to: '/regulatory-universe', label: 'Regulatory Universe', icon: Shield },
  { to: '/classification-model', label: 'Classification Model', icon: Binary },
  { to: '/lifecycle-architecture', label: 'Lifecycle Architecture', icon: GitBranch },
  { to: '/evidence-architecture', label: 'Evidence Architecture', icon: FolderKanban },
  { to: '/approval-matrix', label: 'Approval Matrix', icon: CheckSquare },
  { to: '/traceability-studio', label: 'Traceability Studio', icon: Network },
  { to: '/compliance-risk-hotspots', label: 'Compliance Risk Hotspots', icon: Siren },
]

// Guardrails & Paved Roads is treated as an operating model type.
const operatingModelNavItems = [
  { to: '/sdlc-lanes', label: 'SDLC Lanes', icon: Route },
  { to: '/governance-model', label: 'Governance Model', icon: Landmark },
  { to: '/guardrails-paved-roads', label: 'Guardrails & Paved Roads', icon: Milestone },
]

const allNavItems = [...frameworkNavItems, ...chapterNavItems, ...operatingModelNavItems]

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const current = allNavItems.find((item) => item.to === location.pathname)?.label ?? 'Workspace'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 portal-bg">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 lg:grid-cols-[300px_1fr]">
        <aside className="border-r border-white/10 bg-slate-950/85 p-4 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Regulated Governance</p>
            <h1 className="mt-2 text-lg font-semibold leading-tight text-slate-100">Software Compliance Portal</h1>
          </div>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Framework</p>
              <nav className="space-y-1">
                {frameworkNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        'group flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition duration-200',
                        isActive
                          ? 'border-violet-500/50 bg-violet-500/10 text-violet-100'
                          : 'border-transparent text-slate-300 hover:translate-x-0.5 hover:border-white/10 hover:bg-white/5'
                      )
                    }
                  >
                    <item.icon size={16} className="transition group-hover:scale-105" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Chapters</p>
              <nav className="space-y-1">
                {chapterNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        'group flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition duration-200',
                        isActive
                          ? 'border-violet-500/50 bg-violet-500/10 text-violet-100'
                          : 'border-transparent text-slate-300 hover:translate-x-0.5 hover:border-white/10 hover:bg-white/5'
                      )
                    }
                  >
                    <item.icon size={16} className="transition group-hover:scale-105" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Operating Model</p>
              <nav className="space-y-1">
                {operatingModelNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      clsx(
                        'group flex items-center gap-3 rounded-xl border px-3 py-2 text-sm transition duration-200',
                        isActive
                          ? 'border-violet-500/50 bg-violet-500/10 text-violet-100'
                          : 'border-transparent text-slate-300 hover:translate-x-0.5 hover:border-white/10 hover:bg-white/5'
                      )
                    }
                  >
                    <item.icon size={16} className="transition group-hover:scale-105" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </aside>
        <main className="p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Regulated Software Compliance Portal</p>
            <p className="text-sm font-medium text-slate-200">{current}</p>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
