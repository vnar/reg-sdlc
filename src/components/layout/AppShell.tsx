import {
  Compass,
  Shield,
  Binary,
  Route,
  GitBranch,
  FolderKanban,
  Landmark,
  CheckSquare,
  Network,
  Siren,
  Milestone,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Archive,
  Bot,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useState, type ReactNode } from 'react'
import { clsx } from 'clsx'
import ChangelogDock from './ChangelogDock'
import { RELEASE_META } from '../../data/releaseMeta'

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

const additionalNavItems = [
  { to: '/artifact-library', label: 'Artifact Library', icon: Archive },
  { to: '/ai-use-cases', label: 'AI Enablement', icon: Bot },
]

const allNavItems = [...frameworkNavItems, ...chapterNavItems, ...operatingModelNavItems, ...additionalNavItems]

function NavSection({
  title,
  items,
  collapsed,
  onNavigate,
}: {
  title: string
  items: typeof frameworkNavItems
  collapsed: boolean
  onNavigate: () => void
}) {
  return (
    <div>
      {!collapsed ? <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">{title}</p> : null}
      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              clsx(
                'group flex items-center rounded-xl border text-sm transition duration-200',
                collapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2',
                isActive
                  ? 'border-violet-500/50 bg-violet-500/10 text-violet-100'
                  : 'border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5'
              )
            }
          >
            <item.icon size={16} className="shrink-0 transition group-hover:scale-105" />
            {!collapsed ? <span className="truncate">{item.label}</span> : null}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const current = allNavItems.find((item) => item.to === location.pathname)?.label ?? 'Workspace'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 portal-bg">
      {mobileNavOpen ? (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden print:hidden"
        />
      ) : null}

      <div className="mx-auto flex min-h-screen max-w-[1800px]">
        <aside
          className={clsx(
            'app-sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-slate-950/90 p-3 backdrop-blur-xl transition-all duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0',
            'w-[300px]',
            sidebarCollapsed ? 'lg:w-20' : 'lg:w-[300px]',
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className={clsx('mb-5 rounded-2xl border border-white/10 bg-slate-900/85', sidebarCollapsed ? 'p-2' : 'p-4')}>
            <div className={clsx('flex', sidebarCollapsed ? 'justify-center' : 'items-start justify-between gap-2')}>
              {!sidebarCollapsed ? (
                <div>
                  <p className="text-lg font-bold tracking-tight text-indigo-300">CODEX</p>
                  <p className="mt-0.5 text-[10px] font-normal tracking-[0.04em] text-slate-400">Regulated Software Compliance Framework</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.08em] text-slate-500">Last published · {RELEASE_META.lastPublished}</p>
                </div>
              ) : (
                <Shield size={18} className="text-violet-200" />
              )}
              <button
                className="hidden rounded-lg border border-white/10 p-1.5 text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-slate-100 lg:inline-flex"
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={() => setSidebarCollapsed((value) => !value)}
              >
                {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
              </button>
            </div>
          </div>

          <div className={clsx('space-y-5 pr-1', sidebarCollapsed ? 'h-[calc(100vh-112px)] overflow-y-hidden' : 'flex-1 overflow-y-auto')}>
            <NavSection
              title="Framework"
              items={frameworkNavItems}
              collapsed={sidebarCollapsed}
              onNavigate={() => setMobileNavOpen(false)}
            />
            <NavSection
              title="Chapters"
              items={chapterNavItems}
              collapsed={sidebarCollapsed}
              onNavigate={() => setMobileNavOpen(false)}
            />
            <NavSection
              title="Operating Model"
              items={operatingModelNavItems}
              collapsed={sidebarCollapsed}
              onNavigate={() => setMobileNavOpen(false)}
            />
            <NavSection
              title="Compliance Enablement"
              items={additionalNavItems}
              collapsed={sidebarCollapsed}
              onNavigate={() => setMobileNavOpen(false)}
            />
          </div>
          {!sidebarCollapsed ? (
            <div className="mt-3 shrink-0">
              <ChangelogDock />
            </div>
          ) : null}
        </aside>

        <main className="app-main-area min-w-0 flex-1 p-4 md:p-6">
          <div className="app-main-chrome mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 backdrop-blur print:hidden">
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border border-white/10 p-1.5 text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-slate-100 lg:hidden"
                aria-label="Open navigation"
                onClick={() => setMobileNavOpen(true)}
              >
                <Menu size={16} />
              </button>
              <button
                className="hidden rounded-lg border border-white/10 p-1.5 text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-slate-100 lg:inline-flex"
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={() => setSidebarCollapsed((value) => !value)}
              >
                {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
              </button>
              <div>
                <p className="text-base font-bold tracking-tight text-indigo-300">Codex</p>
                <p className="text-[10px] font-normal tracking-[0.04em] text-slate-400">Regulated Software Compliance Framework</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {mobileNavOpen ? (
                <button
                  className="rounded-lg border border-white/10 p-1.5 text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-slate-100 lg:hidden"
                  aria-label="Close navigation"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <X size={16} />
                </button>
              ) : null}
              <p className="text-sm font-medium text-slate-200">{current}</p>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}
