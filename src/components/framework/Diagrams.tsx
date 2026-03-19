import type {
  Binder,
  GovernanceLayer,
  LifecyclePhase,
  Lane,
  ComplianceHotspot,
  Regulation,
  TraceLink,
  GuardrailPattern,
  RiskTier,
  ClassificationDimension,
} from '../../types/framework'
import { clsx } from 'clsx'
import { ArrowRight, ShieldCheck, Scale, TriangleAlert } from 'lucide-react'

function Chip({ text, tone }: { text: string; tone: 'slate' | 'blue' | 'emerald' | 'violet' | 'rose' }) {
  const cls =
    tone === 'slate'
      ? 'border-slate-400/30 bg-slate-400/10 text-slate-200'
      : tone === 'blue'
        ? 'border-blue-400/30 bg-blue-400/10 text-blue-100'
        : tone === 'emerald'
          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
          : tone === 'rose'
            ? 'border-rose-400/30 bg-rose-400/10 text-rose-100'
            : 'border-violet-400/30 bg-violet-400/10 text-violet-100'
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${cls}`}>{text}</span>
}

export function BlueprintFlowMap() {
  const steps = [
    'Regulatory Universe',
    'Classification',
    'SDLC Lane',
    'Lifecycle',
    'Evidence',
    'Governance',
    'Approvals',
    'Traceability',
  ]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute right-10 top-0 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
      </div>

      <div className="relative flex flex-wrap items-center gap-x-4 gap-y-3">
        {steps.map((s, idx) => (
          <div key={s} className="flex items-center gap-3">
            <div className="flex h-10 items-center rounded-xl border border-white/10 bg-slate-900/60 px-3 text-sm font-semibold text-slate-100">
              {s}
            </div>
            {idx < steps.length - 1 && <ArrowRight className="text-slate-500" size={18} />}
          </div>
        ))}
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <Chip text="Blueprint" tone="violet" />
        <Chip text="Executable model" tone="blue" />
        <Chip text="Submission-ready proof" tone="emerald" />
      </div>
    </div>
  )
}

export function RegulatoryOrbitMap({ items, compact }: { items: Regulation[]; compact?: boolean }) {
  // Group by category so this remains stable as items increase.
  const cats = ['Regulation', 'Standard', 'Guidance', 'Certification', 'License'] as const
  const grouped = cats.map((c) => ({
    category: c,
    count: items.filter((x) => x.category === c).length,
  }))

  const centerLabel = 'Regulated software obligations'

  return (
    <div className={clsx('relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40', compact ? 'p-4' : 'p-6')}>
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className={clsx('relative flex flex-col gap-5', compact ? 'lg:flex-col' : 'lg:flex-row lg:items-center lg:justify-between')}>
        {!compact && (
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Regulatory Universe</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-100">An ecosystem of obligations</h3>
            <p className="mt-2 text-sm text-slate-300">
              Regulations, standards, guidance, certifications, and licenses create the control space. Software impact determines the lane rigor.
            </p>
          </div>
        )}

        <div className={clsx('relative w-full', compact ? 'h-44' : 'h-64 lg:h-72 lg:w-[520px]')}>
          <svg viewBox="0 0 520 280" className="h-full w-full">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgba(99,102,241,0.35)" />
                <stop offset="1" stopColor="rgba(34,211,238,0.25)" />
              </linearGradient>
            </defs>

            <circle cx="260" cy="140" r="62" fill="url(#g1)" opacity="0.55" />
            <text x="260" y="142" textAnchor="middle" fill="rgba(226,232,240,0.92)" fontSize="12" fontWeight="600">
              {centerLabel}
            </text>

            {grouped.map((g, idx) => {
              const t = idx / grouped.length
              const angle = -Math.PI / 2 + t * (Math.PI * 2)
              const radius = 105
              const x = 260 + Math.cos(angle) * radius
              const y = 140 + Math.sin(angle) * (radius * 0.72)
              const tone =
                g.category === 'Regulation'
                  ? 'rgba(239,68,68,0.9)'
                  : g.category === 'Standard'
                    ? 'rgba(59,130,246,0.9)'
                    : g.category === 'Guidance'
                      ? 'rgba(34,197,94,0.85)'
                      : g.category === 'Certification'
                        ? 'rgba(168,85,247,0.88)'
                        : 'rgba(45,212,191,0.9)'
              return (
                <g key={g.category}>
                  <line x1="260" y1="140" x2={x} y2={y} stroke="rgba(148,163,184,0.25)" strokeDasharray="4 4" />
                  <circle cx={x} cy={y} r={20} fill={tone} opacity="0.22" />
                  <circle cx={x} cy={y} r={9} fill={tone} />
                  <text x={x} y={y + 33} textAnchor="middle" fill="rgba(226,232,240,0.9)" fontSize="11">
                    {g.category}
                  </text>
                  <text x={x} y={y + 47} textAnchor="middle" fill="rgba(148,163,184,0.95)" fontSize="10">
                    {g.count} items
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}

export function SDLCStaircase({ lanes }: { lanes: Lane[] }) {
  // A signature rigor staircase: each lane is a step with an icon + evidence/approval signals.
  const toneForLane = (id: Lane['id']) => (id === 'A' ? 'slate' : id === 'B' ? 'blue' : id === 'C' ? 'emerald' : 'violet')

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-10 top-5 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative grid gap-4 lg:grid-cols-4 lg:items-end">
        {lanes.map((lane, idx) => {
          const tone = toneForLane(lane.id)
          const stepY = idx * 6
          return (
            <div key={lane.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Lane {lane.id}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-100">{lane.subtitle}</p>
                </div>
                <div className="flex flex-col items-end">
                  <Chip text={lane.lifecycleRigor} tone={tone} />
                  <span className="mt-2 inline-flex items-center rounded-md border border-white/10 bg-slate-950/30 px-2.5 py-1 text-xs text-slate-300">
                    Evidence: {lane.evidenceDepth}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/30 p-3">
                <p className="text-xs uppercase tracking-wider text-slate-500">Controls required</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {lane.controlsRequired.slice(0, 3).map((c) => (
                    <span key={c} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">
                      {c}
                    </span>
                  ))}
                  {lane.controlsRequired.length > 3 && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">+{lane.controlsRequired.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-400" style={{ transform: `translateY(${stepY}px)` }}>
                {lane.examples[0]}
              </div>

              <div className="mt-3">
                <div className="h-2 w-full rounded-full bg-white/5">
                  <div
                    className={`h-2 rounded-full ${tone === 'slate' ? 'bg-slate-400/70' : tone === 'blue' ? 'bg-blue-400/70' : tone === 'emerald' ? 'bg-emerald-400/70' : 'bg-violet-400/70'}`}
                    style={{ width: `${lane.id === 'A' ? 25 : lane.id === 'B' ? 45 : lane.id === 'C' ? 70 : 100}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-400">Approval intensity</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
        <Chip text="Rigor progression" tone="violet" />
        <Chip text="Evidence depth signals" tone="blue" />
        <Chip text="Approval intensity" tone="emerald" />
      </div>
    </div>
  )
}

export function LifecycleSwimlane({ phases }: { phases: LifecyclePhase[] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-10 top-0 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-10 top-20 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Lifecycle Architecture</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-100">Phase gates, outputs, and accountable sign-off</h3>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">0 → Intake</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">4 → Validation</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">5 → Release</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">6 → Post-market</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex flex-wrap items-start gap-3 lg:flex-nowrap lg:overflow-x-auto">
            {phases.map((p, idx) => (
              <div key={p.id} className="min-w-[280px] rounded-2xl border border-white/10 bg-slate-900/50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Phase {p.id}</p>
                  <Chip
                    text={idx === 4 ? 'Validation' : idx === 5 ? 'Release' : idx === 6 ? 'Operations' : 'Execution'}
                    tone={idx >= 5 ? 'violet' : idx >= 3 ? 'emerald' : 'blue'}
                  />
                </div>
                <h4 className="mt-2 text-lg font-semibold text-slate-100">{p.name.split(':')[1]?.trim() ?? p.name}</h4>
                <p className="mt-2 text-sm text-slate-300">{p.purpose}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">Major outputs</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.outputs.slice(0, 2).map((o) => (
                    <span key={o} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                      {o}
                    </span>
                  ))}
                  {p.outputs.length > 2 && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">+{p.outputs.length - 2}</span>
                  )}
                </div>
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">Exit criteria</p>
                  <p className="mt-2 text-sm text-slate-200">{p.exitCriteria[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EvidenceVault({ binders }: { binders: Binder[] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Evidence Architecture</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-100">Five binders. Submission-grade proof.</h3>
          <p className="mt-2 text-sm text-slate-300">
            Each binder is a dossier cabinet with purpose-built content and lane-driven evidence depth.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {binders.map((b) => (
            <div key={b.id} className="min-w-[220px] rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">{b.name}</p>
              <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/30 p-3">
                <p className="text-sm font-semibold text-slate-100">{b.purpose}</p>
                <div className="mt-3 space-y-2">
                  {b.contents.slice(0, 4).map((c) => (
                    <div key={c} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="h-2 w-2 rounded-full bg-emerald-400/60" />
                      {c}
                    </div>
                  ))}
                  {b.contents.length > 4 && <p className="text-xs text-slate-400">+{b.contents.length - 4} more items</p>}
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Connected phases: {b.lifecyclePhases.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function GovernanceDecisionArchitecture({ layers }: { layers: GovernanceLayer[] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Governance Model</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-100">Decision architecture across four layers</h3>
        <p className="mt-2 text-sm text-slate-300">
          Each governance layer defines members, decision rights, approvals, and escalation paths. Together they make compliance operational.
        </p>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {layers.map((l) => (
            <div key={l.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-lg font-semibold text-slate-100">{l.name}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Scale size={14} /> Decision rights
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-300">{l.purpose}</p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">Members</p>
                  <p className="mt-2 text-sm text-slate-200">{l.members.slice(0, 3).join(', ')}{l.members.length>3?'…':''}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">Approves</p>
                  <p className="mt-2 text-sm text-slate-200">{l.approves.slice(0, 2).join(', ')}{l.approves.length>2?'…':''}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Escalates to: {l.escalationTo}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {l.decisionRights.slice(0, 3).map((d) => (
                  <span key={d} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 text-violet-300" size={18} />
            <div>
              <p className="font-semibold text-slate-100">Signature idea</p>
              <p className="mt-1 text-sm text-slate-300">
                Governance isn’t paperwork. It’s accountable decision routing that converts policy into controlled delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ApprovalFlow({ tiers }: { tiers: RiskTier[] }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-5 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Approval Model</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-100">Risk-tiered change approvals</h3>
        <p className="mt-2 text-sm text-slate-300">
          Approval rigor increases with risk. This creates a predictable governance path from minor updates to major claims-affecting changes.
        </p>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.id} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">Risk tier</p>
                  <p className="mt-1 text-lg font-semibold text-slate-100">{t.name}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  Required approvers: {t.requiredApprovers.length}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{t.description}</p>
              <p className="mt-3 text-xs uppercase tracking-wider text-slate-500">Governance path</p>
              <p className="mt-2 text-sm text-slate-200">{t.governancePath}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function TraceabilityProofGraph({ links, selectedId, onSelect }: { links: TraceLink[]; selectedId: string | null; onSelect: (id: string) => void }) {
  // A simple relationship map laid out horizontally: Regulation -> Requirement -> Risk -> Design -> Test -> Approval -> Artifact
  const x = [60, 170, 260, 360, 440, 520, 620]
  const y = 150

  const selected = links.find((l) => l.id === selectedId) ?? null

  const nodeTone = (idx: number) => (idx <= 2 ? 'rgba(59,130,246,0.55)' : idx <= 4 ? 'rgba(34,197,94,0.45)' : 'rgba(168,85,247,0.45)')

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Traceability Studio</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-100">The proof engine</h3>
          <p className="mt-2 text-sm text-slate-300">
            Regulation obligations connect to requirements, risks, design, tests, approvals, and release evidence.
          </p>

          <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/40 p-2">
            <svg viewBox="0 0 720 300" className="min-w-[720px]">
              <defs>
                <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="rgba(99,102,241,0.6)" />
                  <stop offset="1" stopColor="rgba(45,212,191,0.55)" />
                </linearGradient>
              </defs>

              <line x1="20" y1="150" x2="700" y2="150" stroke="rgba(148,163,184,0.25)" strokeDasharray="5 5" />

              {x.map((xx, idx) => (
                <g key={xx}>
                  <circle cx={xx} cy={y} r={22} fill={nodeTone(idx)} />
                  <circle cx={xx} cy={y} r={10} fill="rgba(226,232,240,0.25)" />
                </g>
              ))}

              {['Regulation', 'Requirement', 'Risk', 'Design', 'Test', 'Approval', 'Artifact'].map((t, idx) => (
                <text key={t} x={x[idx]} y={y + 42} textAnchor="middle" fill="rgba(226,232,240,0.85)" fontSize="11">
                  {t}
                </text>
              ))}

              {links.map((l, idx) => {
                const yy = 70 + idx * 70
                const active = l.id === selectedId
                return (
                  <g key={l.id} opacity={active ? 1 : 0.95}>
                    <path
                      d={`M${x[0]} ${yy} C${x[1] - 20} ${yy} ${x[2] + 20} ${y} ${x[2]} ${y}`}
                      stroke={active ? 'rgba(99,102,241,0.95)' : 'rgba(148,163,184,0.35)'}
                      strokeWidth={active ? 3 : 2}
                      fill="none"
                    />
                    <path
                      d={`M${x[2]} ${y} C${x[3] - 10} ${y} ${x[4] + 10} ${yy} ${x[4]} ${yy}`}
                      stroke={active ? 'rgba(45,212,191,0.95)' : 'rgba(148,163,184,0.28)'}
                      strokeWidth={active ? 3 : 2}
                      fill="none"
                    />

                    <rect
                      x={x[0] - 40}
                      y={yy - 18}
                      width={120}
                      height={32}
                      rx={10}
                      fill={active ? 'rgba(99,102,241,0.18)' : 'rgba(148,163,184,0.08)'}
                      stroke={active ? 'rgba(99,102,241,0.55)' : 'rgba(148,163,184,0.22)'}
                      onClick={() => onSelect(l.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <text x={x[0] + 20} y={yy + 4} textAnchor="middle" fill={active ? 'rgba(226,232,240,0.95)' : 'rgba(226,232,240,0.75)'} fontSize="10">
                      Link {idx + 1}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">Selected trace</p>
              <h4 className="mt-2 text-lg font-semibold text-slate-100">{selected ? selected.regulation : 'Select a relationship link'}</h4>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {selected ? `Lane ${selected.lane}` : '—'}
            </span>
          </div>

          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-500">Obligation chain</p>
              <p className="mt-2">
                {selected ? `${selected.regulation} → ${selected.requirement}` : '—'}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-500">Control proof</p>
              <p className="mt-2">
                {selected ? `${selected.design} → ${selected.test}` : '—'}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-500">Governance and evidence</p>
              <p className="mt-2">
                {selected ? `${selected.approval} → ${selected.artifact}` : '—'}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs uppercase tracking-wider text-slate-500">Links</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => onSelect(l.id)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${l.id === selectedId ? 'border-violet-400/50 bg-violet-500/15 text-violet-100' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'}`}
                >
                  {l.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RiskHeatBoard({ hotspots }: { hotspots: ComplianceHotspot[] }) {
  // A ranked warning board; uses hotspot.rank for ordering.
  const ordered = [...hotspots].sort((a, b) => a.rank - b.rank)
  const severityTone = (rank: number) => (rank <= 3 ? 'rose' : rank <= 7 ? 'amber' : 'slate')

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Compliance Risk Hotspots</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-100">A ranked warning board for leadership</h3>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {ordered.map((r) => {
            const tone = severityTone(r.rank)
            const bg =
              tone === 'rose'
                ? 'border-rose-400/30 bg-rose-500/10'
                : tone === 'amber'
                  ? 'border-amber-400/30 bg-amber-500/10'
                  : 'border-slate-400/25 bg-slate-400/10'
            return (
              <div key={r.rank} className={`rounded-2xl border ${bg} p-4`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">Rank {r.rank}</p>
                    <h4 className="mt-1 text-lg font-semibold text-slate-100">{r.title}</h4>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                    <div className="flex items-center gap-2">
                      <TriangleAlert size={14} />
                      Failure mode
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-200">{r.failureMode}</p>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="text-slate-400">Why it matters:</span> {r.whyItMatters}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="text-slate-400">Consequence:</span> {r.consequence}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.impactedFunctions.slice(0, 4).map((f) => (
                    <span key={f} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function GuardrailsTracks({ patterns }: { patterns: GuardrailPattern[] }) {
  const domains: GuardrailPattern['domain'][] = ['Compliance Engineering', 'Security by Design', 'AI Guardrails']
  const orderedPhases = ['Phase 0', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5', 'Phase 6']

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <p className="relative text-xs uppercase tracking-[0.2em] text-slate-400">Guardrails & Paved Roads</p>
      <h3 className="relative mt-2 text-2xl font-semibold text-slate-100">Reusable controls injected into delivery</h3>
      <p className="relative mt-2 text-sm text-slate-300">
        Three execution tracks. Each track adds repeatable, evidence-aware controls aligned to lifecycle phases.
      </p>

      <div className="relative mt-6 grid gap-4 lg:grid-cols-3">
        {domains.map((d) => {
          const items = patterns.filter((p) => p.domain === d)
          const tone = d === 'Compliance Engineering' ? 'emerald' : d === 'Security by Design' ? 'blue' : 'violet'
          return (
            <div key={d} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-slate-100">{d}</h4>
                <Chip text={`${items.length} patterns`} tone={tone} />
              </div>
              <div className="mt-4 space-y-3">
                {orderedPhases.map((ph) => {
                  const matches = items.filter((p) => p.lifecyclePhases.includes(ph))
                  const label = ph.replace('Phase ', 'P')
                  return (
                    <div key={ph} className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs uppercase tracking-wider text-slate-500">{label}</span>
                        {matches.length > 0 ? (
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">{matches.length} control{matches.length === 1 ? '' : 's'}</span>
                        ) : (
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400">—</span>
                        )}
                      </div>
                      {matches.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {matches.slice(0, 2).map((m) => (
                            <div key={m.id} className="text-sm text-slate-200">
                              <span className="text-xs uppercase tracking-wider text-slate-500">{m.controlType}</span>
                              <div className="mt-1">{m.title}</div>
                            </div>
                          ))}
                          {matches.length > 2 && <p className="text-xs text-slate-400">+{matches.length - 2} more</p>}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ClassificationDecisionMap({ dimensions }: { dimensions: ClassificationDimension[] }) {
  const center = 'Software Applicability & Classification Assessment'
  const radius = 135
  const cx = 260
  const cy = 165

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Classification Model</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-100">Turn intended use into lane-routed lifecycle rigor</h3>
        <p className="mt-2 text-sm text-slate-300">
          Eight assessment dimensions determine regulatory applicability, evidence expectations, approval intensity, and the SDLC lane.
        </p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/40 p-2">
          <svg viewBox="0 0 520 330" className="min-w-[520px]">
            <circle cx={cx} cy={cy} r={110} fill="rgba(99,102,241,0.06)" stroke="rgba(148,163,184,0.18)" />
            <circle cx={cx} cy={cy} r={150} fill="none" stroke="rgba(148,163,184,0.10)" strokeDasharray="4 6" />

            <rect x={cx - 120} y={cy - 44} width={240} height={88} rx={16} fill="rgba(17,24,39,0.65)" stroke="rgba(255,255,255,0.10)" />
            <text x={cx} y={cy - 6} textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="12" fontWeight="700">
              Required anchor
            </text>
            <text x={cx} y={cy + 20} textAnchor="middle" fill="rgba(226,232,240,0.92)" fontSize="12" fontWeight="600">
              {center}
            </text>

            {dimensions.map((d, idx) => {
              const angle = (-Math.PI / 2) + (idx / dimensions.length) * (Math.PI * 2)
              const x = cx + Math.cos(angle) * radius
              const y = cy + Math.sin(angle) * radius * 0.66
              const activeBg = 'rgba(168,85,247,0.18)'
              return (
                <g key={d.id}>
                  <line x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(148,163,184,0.25)" strokeDasharray="4 4" />
                  <circle cx={x} cy={y} r={18} fill={activeBg} />
                  <text x={x} y={y + 4} textAnchor="middle" fill="rgba(226,232,240,0.9)" fontSize="10" fontWeight="700">
                    {d.name}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}

export function FrameworkHeroPoster() {
  const steps = [
    'Regulatory Universe',
    'Classification',
    'SDLC Lane',
    'Lifecycle',
    'Evidence',
    'Governance',
    'Approvals',
    'Traceability',
  ]

  const nodes = [
    { label: 'Regulatory Universe', x: 90, y: 170, w: 190, h: 44, tone: 'blue' as const },
    { label: 'Classification', x: 160, y: 120, w: 150, h: 44, tone: 'violet' as const },
    { label: 'SDLC Lane', x: 260, y: 90, w: 160, h: 44, tone: 'emerald' as const },
    { label: 'Lifecycle', x: 340, y: 140, w: 150, h: 44, tone: 'blue' as const },
    { label: 'Evidence', x: 440, y: 200, w: 140, h: 44, tone: 'emerald' as const },
    { label: 'Governance', x: 390, y: 250, w: 170, h: 44, tone: 'violet' as const },
    { label: 'Approvals', x: 290, y: 250, w: 160, h: 44, tone: 'rose' as const },
    { label: 'Traceability', x: 160, y: 220, w: 190, h: 44, tone: 'slate' as const },
  ]

  const toneFill = (t: (typeof nodes)[number]['tone']) => {
    if (t === 'blue') return 'rgba(59,130,246,0.22)'
    if (t === 'violet') return 'rgba(168,85,247,0.22)'
    if (t === 'emerald') return 'rgba(16,185,129,0.20)'
    if (t === 'rose') return 'rgba(244,63,94,0.18)'
    return 'rgba(148,163,184,0.18)'
  }

  const toneStroke = (t: (typeof nodes)[number]['tone']) => {
    if (t === 'blue') return 'rgba(59,130,246,0.55)'
    if (t === 'violet') return 'rgba(168,85,247,0.55)'
    if (t === 'emerald') return 'rgba(16,185,129,0.50)'
    if (t === 'rose') return 'rgba(244,63,94,0.48)'
    return 'rgba(148,163,184,0.45)'
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
      <div className="absolute inset-0 opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.35),transparent_35%),radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.30),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(34,211,238,0.18),transparent_40%)]" />
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.0),rgba(2,6,23,0.65))]" />
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-300">REGULATED SOFTWARE COMPLIANCE PORTAL</p>
            <p className="mt-2 text-xs uppercase tracking-[0.32em] text-slate-300">FRAMEWORK ATLAS</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-50 md:text-5xl">
              Regulated Software Compliance
              <br />
              Reference Framework
            </h1>
            <p className="mt-4 text-base text-slate-300">
              The foundation for building, validating, and operating software in a regulated healthcare environment. A consulting-grade reference architecture linking obligations, lifecycle rigor, governance, and traceable evidence.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Accountable', 'Executable', 'Traceable by design'].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">Core principle</p>
              <p className="mt-1 text-sm font-medium text-slate-100">
                Regulations define obligations. Standards define the lifecycle. Governance makes it work in the real world.
              </p>
            </div>
          </div>

          <div className="hidden w-[560px] shrink-0 xl:block">
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Operating model blueprint</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Scale size={14} />
                  Trace-ready
                </div>
              </div>

              <div className="mt-4">
                <svg viewBox="0 0 720 320" className="h-auto w-full">
                  <defs>
                    <linearGradient id="bgLine" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="rgba(99,102,241,0.35)" />
                      <stop offset="1" stopColor="rgba(34,211,238,0.25)" />
                    </linearGradient>
                    <linearGradient id="boxLine" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
                      <stop offset="1" stopColor="rgba(255,255,255,0.06)" />
                    </linearGradient>
                  </defs>

                  <line x1="40" y1="160" x2="680" y2="160" stroke="url(#bgLine)" strokeDasharray="6 6" opacity="0.35" />

                  {nodes.map((n) => (
                    <g key={n.label}>
                      <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={14} fill={toneFill(n.tone)} stroke={toneStroke(n.tone)} strokeWidth="1" />
                      <text x={n.x + n.w / 2} y={n.y + 26} textAnchor="middle" fill="rgba(226,232,240,0.95)" fontSize="12" fontWeight="650">
                        {n.label}
                      </text>
                    </g>
                  ))}

                  <g opacity="0.9">
                    {[
                      ['Regulatory Universe', 'Classification'],
                      ['Classification', 'SDLC Lane'],
                      ['SDLC Lane', 'Lifecycle'],
                      ['Lifecycle', 'Evidence'],
                      ['Evidence', 'Governance'],
                      ['Governance', 'Approvals'],
                      ['Approvals', 'Traceability'],
                    ].map(([a, b], idx) => {
                      const na = nodes.find((x) => x.label === a)!
                      const nb = nodes.find((x) => x.label === b)!
                      const ax = na.x + na.w
                      const ay = na.y + na.h / 2
                      const bx = nb.x
                      const by = nb.y + nb.h / 2
                      const mx = (ax + bx) / 2
                      const my = 140 + idx * 6
                      return (
                        <path
                          key={`${a}-${b}`}
                          d={`M${ax} ${ay} Q${mx} ${my} ${bx} ${by}`}
                          fill="none"
                          stroke="rgba(148,163,184,0.38)"
                          strokeWidth="2"
                          strokeDasharray={idx % 2 === 0 ? '0' : '6 6'}
                        />
                      )
                    })}
                  </g>
                </svg>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {steps.map((s) => (
                  <span key={s} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-rose-400/30 bg-rose-500/10 p-2">
                <TriangleAlert size={18} className="text-rose-200" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">Executive Problem Statement</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-50">Fragmented, burdensome, and high-risk without a unified operating model.</h3>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {[
                'Regulations remain in legal language while engineering executes without a structured translation layer.',
                'Process and evidence are inconsistent—compliance becomes a release/audit scramble.',
                'Ownership and approvals are ambiguous—governance arrives late and decisions are hard to justify.',
                'Traceability is incomplete—requirements do not reliably connect to risks, design, tests, and release proof.',
              ].map((x) => (
                <div key={x} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-400/60" />
                  <p>{x}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-2">
                <ShieldCheck size={18} className="text-emerald-200" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">Unified Solution Framework</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-50">A single operating model that turns obligations into delivery controls.</h3>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400/70" />
                <span>Translates regulations into classification and lane-routed execution rigor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400/70" />
                <span>Embed quality gates by design.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400/70" />
                <span>Track evidence from architecture to operations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400/70" />
                <span>Govern decisions with accountable approvals and traceability proof.</span>
              </li>
            </ul>

            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/30 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">Our Unified Framework</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Blueprint', 'Execution Studio', 'Submission-Ready Proof'].map((b) => (
                  <button
                    key={b}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                    type="button"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400">From fragmented, burdensome, and high-risk to controlled and defensible delivery</p>
          <div className="mt-3 grid gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
              <p className="text-sm font-semibold text-slate-100">Classification</p>
              <p className="mt-1 text-xs text-slate-300">Intended use → lane rigor</p>
              <div className="mt-3">
                <svg viewBox="0 0 180 80" className="h-[80px] w-full">
                  <path d="M30 15 L90 15 L150 40 L90 65 L30 65 Z" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.55)" strokeWidth="1.5" />
                  <path d="M90 15 L90 65" stroke="rgba(226,232,240,0.25)" strokeDasharray="4 4" />
                  <circle cx="90" cy="25" r="7" fill="rgba(168,85,247,0.25)" />
                  <circle cx="90" cy="42" r="7" fill="rgba(16,185,129,0.22)" />
                  <circle cx="90" cy="59" r="7" fill="rgba(244,63,94,0.18)" />
                  <text x="90" y="72" textAnchor="middle" fill="rgba(226,232,240,0.75)" fontSize="10">Lane route</text>
                </svg>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
              <p className="text-sm font-semibold text-slate-100">SDLC Lanes</p>
              <p className="mt-1 text-xs text-slate-300">Risk calibrated rigor</p>
              <div className="mt-3">
                <svg viewBox="0 0 180 80" className="h-[80px] w-full">
                  <rect x="30" y="55" width="30" height="12" rx="6" fill="rgba(148,163,184,0.20)" stroke="rgba(148,163,184,0.45)" />
                  <rect x="56" y="40" width="30" height="12" rx="6" fill="rgba(59,130,246,0.20)" stroke="rgba(59,130,246,0.45)" />
                  <rect x="82" y="27" width="30" height="12" rx="6" fill="rgba(16,185,129,0.18)" stroke="rgba(16,185,129,0.45)" />
                  <rect x="108" y="15" width="30" height="12" rx="6" fill="rgba(168,85,247,0.18)" stroke="rgba(168,85,247,0.45)" />
                  <path d="M45 55 L71 40 L97 27 L123 15" stroke="rgba(226,232,240,0.18)" strokeWidth="2" fill="none" />
                  <text x="90" y="74" textAnchor="middle" fill="rgba(226,232,240,0.75)" fontSize="10">Rigor staircase</text>
                </svg>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
              <p className="text-sm font-semibold text-slate-100">Governance</p>
              <p className="mt-1 text-xs text-slate-300">Layered accountability</p>
              <div className="mt-3">
                <svg viewBox="0 0 180 80" className="h-[80px] w-full">
                  {[
                    { y: 16, c: 'rgba(59,130,246,0.18)', s: 'rgba(59,130,246,0.5)' },
                    { y: 27, c: 'rgba(168,85,247,0.16)', s: 'rgba(168,85,247,0.5)' },
                    { y: 38, c: 'rgba(16,185,129,0.15)', s: 'rgba(16,185,129,0.45)' },
                    { y: 49, c: 'rgba(244,63,94,0.12)', s: 'rgba(244,63,94,0.45)' },
                  ].map((r, idx) => (
                    <rect key={idx} x="34" y={r.y} width="112" height="10" rx="5" fill={r.c} stroke={r.s} />
                  ))}
                  <path d="M90 58 C90 50 90 45 90 22" stroke="rgba(226,232,240,0.18)" strokeDasharray="4 4" strokeWidth="2" fill="none" />
                  <text x="90" y="74" textAnchor="middle" fill="rgba(226,232,240,0.75)" fontSize="10">4-layer decision path</text>
                </svg>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
              <p className="text-sm font-semibold text-slate-100">Traceability</p>
              <p className="mt-1 text-xs text-slate-300">Proof from regulation to release</p>
              <div className="mt-3">
                <svg viewBox="0 0 180 80" className="h-[80px] w-full">
                  {[18, 40, 62, 84, 106].map((_, idx) => (
                    <circle key={idx} cx={35 + idx * 30} cy="34" r="8" fill="rgba(59,130,246,0.18)" stroke="rgba(59,130,246,0.55)" strokeWidth="1.2" />
                  ))}
                  <path d="M43 34 H137" stroke="rgba(226,232,240,0.18)" strokeDasharray="4 4" strokeWidth="2" />
                  {[0, 1, 2, 3].map((idx) => (
                    <path key={idx} d={`M${55 + idx * 24} 34 l6 -4 l0 8 z`} fill="rgba(226,232,240,0.25)" />
                  ))}
                  <text x="90" y="74" textAnchor="middle" fill="rgba(226,232,240,0.75)" fontSize="10">Proof chain</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/25 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-400">Outcomes that become true after adoption</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {[
              ['Reduced Late Stage Surprises', 'Compliance issues become visible early, not at release/submission time.'],
              ['Accelerated Delivery', 'Each product follows the right lane and evidence depth for its risk.'],
              ['Improved Audit Confidence', 'Submission-grade traceability and governable artifacts are built in.'],
              ['Controlled Post-Market Operations', 'Changes are assessed and governed after go-live with continuous evidence discipline.'],
            ].map(([t, s]) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-slate-100">{t}</p>
                <p className="mt-1 text-sm text-slate-300">{s}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-medium text-slate-200">
            Engineering builds. Quality governs. Regulatory Affairs interprets. Security protects. Business owns intended use. System Owner authorizes production accountability.
          </p>
        </div>
      </div>
    </div>
  )
}

