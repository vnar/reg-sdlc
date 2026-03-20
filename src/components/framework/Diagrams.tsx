import type {
  Binder,
  FunctionalRole,
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
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { ArrowRight, Briefcase, CheckSquare, Cog, FlaskConical, Landmark, Lock, Monitor, Rocket, Scale, ShieldCheck, TriangleAlert } from 'lucide-react'

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
  const laneColor = (id: Lane['id']) => {
    if (id === 'A') return '#64748b'
    if (id === 'B') return '#3b82f6'
    if (id === 'C') return '#14b8a6'
    return '#8b5cf6'
  }

  const laneDesc = (lane: Lane) => {
    if (lane.id === 'A') return 'No clinical intent, no device nexus, no regulated output.'
    if (lane.id === 'B') return 'Regulated process impact with bounded risk and no device nexus.'
    if (lane.id === 'C') return 'Device-adjacent, clinical workflow, or lab-impacting software requiring comprehensive evidence.'
    return 'Direct clinical decision support, SaMD, or device software requiring submission-grade proof.'
  }

  const intensityLevel = (id: Lane['id']) => (id === 'A' ? 1 : id === 'B' ? 2 : id === 'C' ? 3 : 4)

  const intensityByLane: Record<
    Lane['id'],
    {
      approval: { dots: number; value: string }
      evidence: { dots: number; value: string }
      rigor: { dots: number; value: string }
    }
  > = {
    A: {
      approval: { dots: 1, value: 'Engineering only' },
      evidence: { dots: 1, value: 'Lightweight' },
      rigor: { dots: 1, value: 'Foundational' },
    },
    B: {
      approval: { dots: 2, value: 'Eng + QA + RA' },
      evidence: { dots: 2, value: 'Moderate' },
      rigor: { dots: 2, value: 'Controlled' },
    },
    C: {
      approval: { dots: 3, value: 'Cross-functional' },
      evidence: { dots: 4, value: 'Comprehensive' },
      rigor: { dots: 3, value: 'High' },
    },
    D: {
      approval: { dots: 4, value: 'Formal governance' },
      evidence: { dots: 4, value: 'Submission-grade' },
      rigor: { dots: 4, value: 'Maximum' },
    },
  }

  const dotBar = (filled: number, color: string) => (
    <div className="flex items-center gap-[3px]">
      {[1, 2, 3, 4].map((n) => (
        <span
          key={n}
          className="inline-flex h-[7px] w-[7px] rounded-full"
          style={{ backgroundColor: n <= filled ? color : `${color}2e` }}
        />
      ))}
    </div>
  )

  const laneById = (id: Lane['id']) => lanes.find((l) => l.id === id)!
  const [activeLaneId, setActiveLaneId] = useState<Lane['id']>(lanes[0]?.id ?? 'A')
  const laneCardRefs = useRef<Record<Lane['id'], HTMLDivElement | null>>({
    A: null,
    B: null,
    C: null,
    D: null,
  })

  useEffect(() => {
    const visibility = new Map<Lane['id'], number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const laneId = (entry.target as HTMLElement).dataset.laneId as Lane['id']
          visibility.set(laneId, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best: Lane['id'] | null = null
        let bestRatio = -1
        for (const lane of lanes) {
          const ratio = visibility.get(lane.id) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            best = lane.id
          }
        }
        if (best) setActiveLaneId(best)
      },
      { threshold: [0.2, 0.4, 0.6, 0.8] }
    )

    for (const lane of lanes) {
      const node = laneCardRefs.current[lane.id]
      if (node) observer.observe(node)
    }

    return () => observer.disconnect()
  }, [lanes])

  const matrixRows = [
    {
      group: 'Identity',
      rows: [
        { label: 'Rigor level', value: (l: Lane) => l.lifecycleRigor },
        { label: 'Evidence depth', value: (l: Lane) => l.evidenceDepth },
        { label: 'Approval intensity', value: (l: Lane) => `${intensityLevel(l.id)} / 4` },
        { label: 'IEC 62304 class', value: (l: Lane) => (l.id === 'A' ? '—' : l.id === 'B' ? 'Class A' : l.id === 'C' ? 'Class B' : 'Class C') },
      ],
    },
    {
      group: 'Evidence requirements',
      rows: [
        { label: 'Validation protocol (IQ/OQ/PQ)', has: (id: Lane['id']) => id !== 'A' },
        { label: 'Formal traceability matrix', has: (id: Lane['id']) => id === 'C' || id === 'D' },
        { label: 'Risk management file (ISO 14971)', has: (id: Lane['id']) => id === 'C' || id === 'D' },
        { label: 'Validation Summary Report', has: (id: Lane['id']) => id === 'C' || id === 'D' },
        { label: 'Regulatory submission package', has: (id: Lane['id']) => id === 'D' },
      ],
    },
    {
      group: 'Governance controls',
      rows: [
        { label: 'Change control procedure', has: (id: Lane['id']) => id !== 'A' },
        { label: 'CCB approval required', has: (id: Lane['id']) => id === 'C' || id === 'D' },
        { label: 'Post-market surveillance', has: (id: Lane['id']) => id === 'D' },
        { label: 'SOUP management', has: (id: Lane['id']) => id === 'C' || id === 'D' },
        { label: '21 CFR Part 11 audit trail', has: (id: Lane['id']) => id !== 'A' },
      ],
    },
  ] as const

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-10 top-5 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">SDLC Lanes</p>
        <h3 className="mt-2 text-3xl font-semibold text-slate-100">Four lanes. One right answer per project.</h3>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl">
          Classification output determines lane. Lane determines evidence depth, controls required, approval intensity, and governance overhead.
        </p>

        {/* SECTION 1 — Escalation spine */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/30 p-4">
          <div className="flex items-start">
            <div
              className="mt-[18px] h-[2px] flex-1 rounded-full"
              style={{ background: `linear-gradient(90deg, rgba(100,116,139,0.1) 0%, ${laneColor('A')} 100%)` }}
            />
            {lanes.map((lane, idx) => {
              const isActive = lane.id === activeLaneId
              const isLeftFilled = idx <= lanes.findIndex((l) => l.id === activeLaneId)
              return (
              <div key={lane.id} className="flex items-start flex-1 min-w-0">
                <div className="w-full min-w-[92px] text-center">
                  <div
                    className="mx-auto flex h-9 w-9 items-center justify-center rounded-md border font-semibold"
                    style={{
                      borderColor: `${laneColor(lane.id)}99`,
                      backgroundColor: isActive ? laneColor(lane.id) : `${laneColor(lane.id)}14`,
                      color: isActive ? '#f8fafc' : laneColor(lane.id),
                    }}
                  >
                    {lane.id}
                  </div>
                  <p className="mt-2 text-[11px] font-semibold text-slate-100">{lane.name}</p>
                  <p className="text-[11px] text-slate-500">{lane.lifecycleRigor}</p>
                </div>
                {idx < lanes.length - 1 && (
                  <div
                    className="mx-2 mt-[18px] h-[2px] flex-1 rounded-full"
                    style={{
                      background: isLeftFilled
                        ? `linear-gradient(90deg, ${laneColor(activeLaneId)} 0%, ${laneColor(activeLaneId)} 100%)`
                        : 'linear-gradient(90deg, rgba(148,163,184,0.2) 0%, rgba(148,163,184,0.2) 100%)',
                    }}
                  />
                )}
              </div>
            )})}
            <div
              className="mt-[18px] h-[2px] flex-1 rounded-full"
              style={{ background: `linear-gradient(90deg, ${laneColor('D')} 0%, rgba(139,92,246,0.1) 100%)` }}
            />
          </div>
        </div>

        {/* SECTION 2 — Four lane cards */}
        <div className="mt-5 grid gap-3 lg:grid-cols-4 lg:items-stretch">
          {lanes.map((lane) => {
            const c = laneColor(lane.id)
            const triggerTags = lane.triggers

            return (
              <div
                key={lane.id}
                data-lane-id={lane.id}
                ref={(el) => {
                  laneCardRefs.current[lane.id] = el
                }}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/45 p-4"
                style={{ borderTopColor: c, borderTopWidth: 3, borderTopStyle: 'solid' }}
              >
                {/* 1. Header */}
                <div className="flex min-h-[66px] items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Lane {lane.id}</p>
                    <p className="mt-1 text-[16px] font-extrabold tracking-[-0.01em] text-slate-100">{lane.subtitle}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-[4px] border px-2 py-[2px] text-[10px] font-semibold"
                    style={{ borderColor: `${c}66`, color: c, backgroundColor: `${c}1A` }}
                  >
                    {lane.lifecycleRigor}
                  </span>
                </div>
                <p className="mt-2 min-h-[56px] text-[11px] leading-[1.5] text-slate-400">{laneDesc(lane)}</p>

                {/* 2. Intensity meter */}
                <div className="mt-3 min-h-[116px] rounded-[8px] border border-white/10 bg-[rgba(11,15,26,0.5)] px-3 py-2.5">
                  {[
                    ['APPROVAL', intensityByLane[lane.id].approval.dots, intensityByLane[lane.id].approval.value],
                    ['EVIDENCE', intensityByLane[lane.id].evidence.dots, intensityByLane[lane.id].evidence.value],
                    ['RIGOR', intensityByLane[lane.id].rigor.dots, intensityByLane[lane.id].rigor.value],
                  ].map(([label, dots, value]) => (
                    <div key={String(label)} className="grid grid-cols-[52px_auto_1fr] items-center gap-x-2 py-[3px]">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.06em] text-slate-500">{label}</span>
                      {dotBar(Number(dots), c)}
                      <span className="truncate text-right text-[10px] font-semibold text-slate-300">{String(value)}</span>
                    </div>
                  ))}
                </div>

                {/* 3. Controls Required */}
                <div className="mt-3 min-h-[132px]">
                  <p className="mb-[7px] text-[9px] uppercase tracking-[0.1em] text-slate-500">Controls required</p>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {lane.controlsRequired.map((control) => (
                      <li key={control} className="flex items-start gap-2">
                        <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: `${c}80` }} />
                        <span>{control}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Example Software */}
                <div className="mt-3 min-h-[66px]">
                  <p className="mb-[7px] text-[9px] uppercase tracking-[0.1em] text-slate-500">Example software</p>
                  <span
                    className="inline-flex rounded-full border px-2.5 py-1 text-[10px] italic"
                    style={{ borderColor: `${c}55`, color: c, backgroundColor: `${c}14` }}
                  >
                    {lane.examples[0]}
                  </span>
                </div>

                {/* 5. Classification Triggers */}
                <div className="mt-3 mt-auto min-h-[88px]">
                  <p className="mb-[7px] text-[9px] uppercase tracking-[0.1em] text-slate-500">Classification triggers</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {triggerTags.map((t) => (
                      <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* SECTION 3 — Comparison matrix */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/20 p-4">
          <h4 className="text-2xl font-semibold text-slate-100">Lane comparison matrix</h4>
          <p className="mt-1 text-sm text-slate-400">Every attribute across all four lanes at a glance.</p>

          <div className="mt-4 overflow-auto rounded-xl border border-white/10 bg-slate-950/25">
            <table className="w-full min-w-[980px] text-left">
              <thead className="text-xs uppercase tracking-wider text-slate-400 bg-white/[0.02]">
                <tr>
                  <th className="px-3 py-2">Attribute</th>
                  {(['A', 'B', 'C', 'D'] as const).map((id) => (
                    <th key={id} className="px-3 py-2" style={{ color: laneColor(id) }}>
                      Lane {id}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((section) => (
                  <Fragment key={section.group}>
                    <tr key={section.group}>
                      <td colSpan={5} className="px-3 py-2 text-[11px] uppercase tracking-wider text-slate-500 bg-white/[0.01]">
                        {section.group}
                      </td>
                    </tr>
                    {section.rows.map((row) => (
                      <tr key={`${section.group}-${row.label}`} className="border-t border-white/10 hover:bg-white/[0.03]">
                        <td className="px-3 py-2 text-sm text-slate-300">{row.label}</td>
                        {(['A', 'B', 'C', 'D'] as const).map((id) => {
                          const lane = laneById(id)
                          const display = 'value' in row ? row.value(lane) : row.has(id) ? '✓' : '—'
                          const isCheck = display === '✓'
                          return (
                            <td key={`${row.label}-${id}`} className="px-3 py-2 text-sm">
                              {isCheck ? (
                                <span style={{ color: laneColor(id) }}>✓</span>
                              ) : display === '—' ? (
                                <span className="text-slate-500">—</span>
                              ) : (
                                <span className={clsx(id === 'A' ? 'text-slate-300' : id === 'B' ? 'text-blue-300' : id === 'C' ? 'text-teal-300' : 'text-violet-300')}>
                                  {display}
                                </span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LifecycleSwimlane({ phases }: { phases: LifecyclePhase[] }) {
  type PhaseType = 'execution' | 'validation' | 'release' | 'operations'

  const phaseTypeByIndex = (idx: number): PhaseType => {
    if (idx <= 3) return 'execution'
    if (idx === 4) return 'validation'
    if (idx === 5) return 'release'
    return 'operations'
  }

  const phaseUi = (type: PhaseType) => {
    switch (type) {
      case 'validation':
        return {
          label: 'Validation',
          badge: 'border-violet-400/35 bg-violet-400/10 text-violet-100',
          nodeBorderBg: 'border-violet-400/60 bg-violet-400/10 text-violet-100',
          nodeText: 'text-violet-100',
          line: 'bg-violet-400/40',
          gateIcon: 'text-violet-300',
        }
      case 'release':
        return {
          label: 'Release',
          badge: 'border-emerald-400/35 bg-emerald-400/10 text-emerald-100',
          nodeBorderBg: 'border-emerald-400/60 bg-emerald-400/10 text-emerald-100',
          nodeText: 'text-emerald-100',
          line: 'bg-emerald-400/40',
          gateIcon: 'text-emerald-200',
        }
      case 'operations':
        return {
          label: 'Operations',
          badge: 'border-amber-400/35 bg-amber-400/10 text-amber-100',
          nodeBorderBg: 'border-amber-400/60 bg-amber-400/10 text-amber-100',
          nodeText: 'text-amber-100',
          line: 'bg-amber-400/40',
          gateIcon: 'text-amber-200',
        }
      case 'execution':
      default:
        return {
          label: 'Execution',
          badge: 'border-indigo-400/35 bg-indigo-400/10 text-indigo-100',
          nodeBorderBg: 'border-indigo-400/60 bg-indigo-400/10 text-indigo-100',
          nodeText: 'text-indigo-100',
          line: 'bg-indigo-400/40',
          gateIcon: 'text-indigo-300',
        }
    }
  }

  const phaseTitle = (p: LifecyclePhase) => p.name.split(':')[1]?.trim() ?? p.name

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
          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">Execution →</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">Validation →</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">Release →</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">Operations</span>
          </div>
        </div>

        {/* Pipeline strip: connected numbered nodes */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/30 p-4">
          <div className="flex items-center flex-nowrap">
            {phases.map((p, idx) => {
              const t = phaseTypeByIndex(idx)
              const ui = phaseUi(t)

              const title = phaseTitle(p)
              const parts = title.includes(' & ')
                ? title.split(' & ').map((s) => s.trim())
                : [title]

              return (
                <div key={p.id} className="flex items-center flex-1 min-w-0">
                  <div className="flex min-w-0 w-full flex-col items-center">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${ui.nodeBorderBg}`}>
                      <span className="text-sm font-semibold">{p.id}</span>
                    </div>
                    <div className="mt-2 text-center text-[9px] leading-3 text-slate-300">
                      {parts.length > 1 ? (
                        <>
                          <div className="font-semibold text-[9px] text-slate-100">{parts[0]}</div>
                          <div className="font-semibold text-[9px] text-slate-100">& {parts[1]}</div>
                        </>
                      ) : (
                        <div className="font-semibold text-[9px] text-slate-100">{parts[0]}</div>
                      )}
                      <div className={`mt-0.5 text-[8px] uppercase tracking-wider ${ui.nodeText}`}>{ui.label}</div>
                    </div>
                  </div>

                  {idx < phases.length - 1 && <div className={`h-px w-3 flex-none ${ui.line}`} />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Phase cards in a single horizontal row */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/20 p-4">
          <div className="flex flex-nowrap items-stretch gap-3">
            {phases.map((p, idx) => {
              const t = phaseTypeByIndex(idx)
              const ui = phaseUi(t)

              return (
                <div
                  key={p.id}
                  className="flex-1 min-w-0 rounded-2xl border border-white/10 bg-slate-950/30 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-wider text-slate-400">Phase {p.id}</p>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${ui.badge}`}>{ui.label}</span>
                  </div>

                  <h4 className="mt-2 text-[13px] font-semibold text-slate-100 leading-5">{phaseTitle(p)}</h4>
                  <p className="mt-2 text-[12px] leading-4 text-slate-300">{p.purpose}</p>

                  <p className="mt-3 text-[11px] uppercase tracking-wider text-slate-500">Outputs</p>
                  <ul className="mt-2 list-disc pl-5 space-y-0.5 text-[12px] text-slate-300">
                    {p.outputs.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>

                  {/* Gate row */}
                  <div className="mt-4 border-t border-white/10 pt-3 flex flex-wrap gap-3">
                    {p.exitCriteria.map((c) => (
                      <div key={c} className="flex items-center gap-2 text-[13px] text-slate-200">
                        <ShieldCheck size={16} className={ui.gateIcon} />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function EvidenceVault({ binders }: { binders: Binder[] }) {
  const totalDocuments = binders.reduce((sum, b) => sum + b.contents.length, 0)
  const totalBinders = binders.length
  const phasesCovered = Array.from(new Set(binders.flatMap((b) => b.lifecyclePhases))).length

  const phaseNumber = (s: string) => {
    const m = s.match(/\d+/)
    return m ? m[0] : s
  }

  const binderTopBorderColor = (b: Binder) => {
    // Match the requested binder-type color mapping.
    if (b.id === 1) return '#818CF8' // indigo
    if (b.id === 2) return '#A78BFA' // purple
    if (b.id === 3) return '#22D3EE' // cyan
    if (b.id === 4) return '#34D399' // green
    return '#FBBF24' // amber (Binder 5)
  }

  const binderDocTag = (b: Binder): 'Core' | 'Lane' | 'Regulated' => {
    // Derived from lane coverage for the binder (no data changes; only presentation tags).
    // Core = required all lanes.
    if (b.associatedLanes.length === 4) return 'Core'
    // Regulated = required in regulated lanes only (no A/B lanes).
    if (!b.associatedLanes.includes('A') && !b.associatedLanes.includes('B') && b.associatedLanes.includes('D')) return 'Regulated'
    // Lane = required by lane assignment.
    return 'Lane'
  }

  const docTagClasses = (tag: 'Core' | 'Lane' | 'Regulated') => {
    if (tag === 'Core') return 'bg-slate-800/50 border border-white/10 text-slate-200'
    if (tag === 'Lane') return 'bg-indigo-500/10 border border-indigo-400/30 text-indigo-200'
    return 'bg-rose-500/10 border border-rose-400/30 text-rose-200'
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Evidence Architecture</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-100">Five binders. Submission-grade proof.</h3>
          <p className="mt-2 text-sm text-slate-300">
            Each binder is a dossier cabinet with purpose-built content and lane-driven evidence depth.
          </p>
        </div>

        <div className="mt-4 flex flex-nowrap items-center gap-3 overflow-x-auto pb-1">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 whitespace-nowrap">
            <span className="font-semibold text-slate-100">{totalDocuments}</span> total documents
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 whitespace-nowrap">
            <span className="font-semibold text-slate-100">{totalBinders}</span> binders
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 whitespace-nowrap">
            <span className="font-semibold text-slate-100">{phasesCovered}</span> phases covered
          </div>
        </div>

        <div className="w-full">
          {(() => {
            const binderTop = binders.filter((b) => b.id >= 1 && b.id <= 4)
            const binder5 = binders.find((b) => b.id === 5) ?? null

            const renderBinderCard = (b: Binder) => {
              const tag = binderDocTag(b)
              const isBinder5 = b.id === 5
              const topColor = binderTopBorderColor(b)
              const phases = b.lifecyclePhases.map(phaseNumber)

              const binderHeader = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-wider text-slate-300">{b.name}</p>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                      {b.contents.length} docs
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-100">{b.purpose}</p>
                </>
              )

              const phasesPills = (
                <div className="mt-3 flex flex-wrap gap-2">
                  {phases.map((p) => (
                    <span key={p} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                      {p}
                    </span>
                  ))}
                </div>
              )

              const docRows = (
                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">Documents</p>
                  <div className="mt-2 space-y-1">
                    {b.contents.map((c) => (
                      <div key={c} className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-300">{c}</span>
                        <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${docTagClasses(tag)}`}>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )

              return (
                <div
                  className={[
                    'rounded-2xl border border-white/10 bg-slate-900/50 p-4 overflow-hidden',
                    isBinder5 ? 'col-span-3' : '',
                  ].join(' ')}
                  style={{ borderTopColor: topColor, borderTopWidth: 3, borderTopStyle: 'solid' }}
                >
                  {isBinder5 ? (
                    <div className="grid grid-cols-[260px_1fr] gap-4 items-start">
                      <div>
                        {binderHeader}
                        {phasesPills}
                      </div>
                      <div>
                        <div className="mt-1">
                          <p className="text-xs uppercase tracking-wider text-slate-500">Documents</p>
                          <div className="mt-2 grid grid-cols-3 gap-x-4 gap-y-2">
                            {b.contents.map((c) => (
                              <div key={c} className="flex items-center justify-between gap-3">
                                <span className="text-[11px] text-slate-300 leading-4">{c}</span>
                                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${docTagClasses(tag)}`}>{tag}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {binderHeader}
                      {docRows}
                      {phasesPills}
                    </>
                  )}
                </div>
              )
            }

            return (
              <>
                <div className="grid grid-cols-4 gap-4 items-start">
                  {binderTop.map((b) => (
                    <div key={b.id}>{renderBinderCard(b)}</div>
                  ))}
                </div>

                {binder5 && <div className="mt-4">{renderBinderCard(binder5)}</div>}
              </>
            )
          })()}

          {/* Legend */}
          <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/20 p-4">
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-slate-800/50 border border-white/10" />
                Core
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-indigo-500/10 border border-indigo-400/30" />
                Lane
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded bg-rose-500/10 border border-rose-400/30" />
                Regulated
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              Core = required all lanes. Lane = required by lane assignment. Regulated = required in regulated lanes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GovernanceDecisionArchitecture({ layers, roles }: { layers: GovernanceLayer[]; roles: FunctionalRole[] }) {
  const layerColor = (idx: number) => {
    if (idx === 0) return '#3b82f6'
    if (idx === 1) return '#6366f1'
    if (idx === 2) return '#f59e0b'
    return '#fb7185'
  }

  const layerSubLabel = (idx: number) => {
    if (idx === 0) return 'Execution'
    if (idx === 1) return 'Control'
    if (idx === 2) return 'Authorization'
    return 'Surveillance'
  }

  const layerCode = (idx: number) => `L${idx + 1}`

  const membersForLayer = (l: GovernanceLayer, idx: number) => {
    if ((idx === 1 || idx === 2) && !l.members.includes('Engineering Lead')) return [...l.members, 'Engineering Lead']
    return l.members
  }

  const approvesWithSlots = (l: GovernanceLayer) => {
    const a = l.approves.slice(0, 3)
    while (a.length < 3) a.push('—')
    return a
  }

  const roleIcon = (role: string) => {
    if (role === 'Product / Business') return <Briefcase size={14} />
    if (role === 'Engineering') return <Cog size={14} />
    if (role === 'Quality / Compliance') return <CheckSquare size={14} />
    if (role === 'Regulatory Affairs') return <Landmark size={14} />
    if (role === 'Security / Privacy') return <Lock size={14} />
    if (role === 'System Owner') return <Monitor size={14} />
    if (role === 'Operations / DevOps') return <Rocket size={14} />
    return <FlaskConical size={14} />
  }

  const participationMap: Record<string, boolean[]> = {
    'Product / Business': [true, false, false, false],
    Engineering: [true, true, true, false],
    'Quality / Compliance': [false, true, true, true],
    'Regulatory Affairs': [false, true, true, true],
    'Security / Privacy': [false, true, false, false],
    'System Owner': [true, false, true, true],
    'Operations / DevOps': [false, false, true, true],
    'Clinical / Lab SMEs': [false, false, false, true],
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-10 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Governance Model</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-100">Decision architecture across four layers</h3>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Each layer defines members, decision rights, approvals, and escalation paths. Together they convert policy into controlled delivery.
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-400/20 bg-slate-900/45 p-4 pl-0">
            <div className="flex gap-3">
              <div className="w-1 shrink-0 rounded-full bg-indigo-400/90" />
              <div>
                <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-indigo-200">
                  <ShieldCheck size={12} />
                  Signature idea
                </p>
                <p className="mt-1 text-sm italic text-slate-300">
                  Governance isn't paperwork. It's accountable decision routing that converts policy into controlled delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/30 p-4">
          <div className="flex items-start">
            <div className="mt-[18px] h-[2px] flex-1 rounded-full" style={{ background: `linear-gradient(90deg, rgba(59,130,246,0.1) 0%, ${layerColor(0)} 100%)` }} />
            {layers.map((l, idx) => (
              <div key={l.id} className="flex items-start flex-1 min-w-0">
                <div className="w-full min-w-[92px] text-center">
                  <div
                    className="mx-auto flex h-9 w-9 items-center justify-center rounded-md border text-xs font-semibold"
                    style={{ borderColor: `${layerColor(idx)}99`, backgroundColor: `${layerColor(idx)}20`, color: layerColor(idx) }}
                  >
                    {layerCode(idx)}
                  </div>
                  <p className="mt-2 text-[11px] font-semibold text-slate-100">{l.name}</p>
                  <p className="text-[11px] text-slate-500">{layerSubLabel(idx)}</p>
                </div>
                {idx < layers.length - 1 && (
                  <div
                    className="mx-2 mt-[18px] h-[2px] flex-1 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${layerColor(idx)} 0%, ${layerColor(idx + 1)} 100%)` }}
                  />
                )}
              </div>
            ))}
            <div className="mt-[18px] h-[2px] flex-1 rounded-full" style={{ background: `linear-gradient(90deg, ${layerColor(3)} 0%, rgba(251,113,133,0.1) 100%)` }} />
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          {layers.map((l, idx) => {
            const color = layerColor(idx)
            const nextColor = layerColor(Math.min(idx + 1, 3))
            const members = membersForLayer(l, idx)
            const approves = approvesWithSlots(l)

            return (
              <div
                key={l.id}
                className="rounded-2xl border border-white/10 bg-slate-900/45 p-4"
                style={{ borderTopColor: color, borderTopWidth: 3, borderTopStyle: 'solid' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">Layer {idx + 1}</p>
                    <p className="mt-1 text-xl font-semibold leading-tight text-slate-100">{l.name}</p>
                  </div>
                  <span className="rounded-full border px-2 py-1 text-[10px] uppercase tracking-wider" style={{ borderColor: `${color}66`, color, backgroundColor: `${color}1A` }}>
                    Decision rights
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{l.purpose}</p>

                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">Members</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {members.map((m) => (
                      <span key={`${l.id}-${m}`} className="rounded-md border px-2 py-0.5 text-[11px]" style={{ borderColor: `${color}55`, color, backgroundColor: `${color}14` }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">Approves</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                    {approves.map((a, aIdx) => (
                      <li key={`${l.id}-approves-${aIdx}`}>{a}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">Decision rights</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {l.decisionRights.map((d) => (
                      <span key={`${l.id}-${d}`} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-400">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500">Escalates to</p>
                  <p className="mt-1 text-sm font-medium">
                    <span className="text-slate-400">→ </span>
                    <span style={{ color: nextColor }}>{l.escalationTo}</span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6">
          <h4 className="text-2xl font-semibold text-slate-100">Functional ownership</h4>
          <p className="mt-1 text-sm text-slate-400">Who owns what across the operating model — and which governance layers they participate in.</p>
          <div className="mt-3 grid gap-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/25 lg:grid-cols-4">
            {roles.map((role) => {
              const pattern = participationMap[role.role] ?? [false, false, false, false]
              return (
                <div key={role.id} className="border-b border-r border-white/10 p-4 lg:[&:nth-child(4n)]:border-r-0 [&:nth-last-child(-n+4)]:border-b-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-base font-semibold text-slate-100">{role.role}</p>
                    <span className="text-slate-300">{roleIcon(role.role)}</span>
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                    {role.owns.map((item) => (
                      <li key={`${role.id}-${item}`}>{item}</li>
                    ))}
                  </ul>
                  <div className="mt-3">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Layer participation</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      {[0, 1, 2, 3].map((layerIdx) => (
                        <span
                          key={`${role.id}-dot-${layerIdx}`}
                          className="inline-flex h-2.5 w-2.5 rounded-full border"
                          style={{
                            borderColor: `${layerColor(layerIdx)}66`,
                            backgroundColor: pattern[layerIdx] ? layerColor(layerIdx) : 'rgba(148,163,184,0.12)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ApprovalFlow({ tiers }: { tiers: RiskTier[] }) {
  const tierUi = (idx: number) => {
    if (idx === 0) {
      return {
        borderTop: '#34D399',
        label: 'text-emerald-300',
        bubble: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200',
        step: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100',
      }
    }
    if (idx === 1) {
      return {
        borderTop: '#F59E0B',
        label: 'text-amber-300',
        bubble: 'bg-amber-500/15 border-amber-400/40 text-amber-100',
        step: 'border-amber-400/30 bg-amber-500/10 text-amber-100',
      }
    }
    return {
      borderTop: '#FB7185',
      label: 'text-rose-300',
      bubble: 'bg-rose-500/15 border-rose-400/40 text-rose-100',
      step: 'border-rose-400/30 bg-rose-500/10 text-rose-100',
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-5 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_40%)]" />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Approval Model</p>
        <h3 className="mt-1.5 text-xl font-semibold text-slate-100">Risk-tiered change approvals</h3>
        <p className="mt-1 text-sm text-slate-300">
          Approval rigor increases with risk. This creates a predictable governance path from minor updates to major claims-affecting changes.
        </p>

        <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/30 px-3 py-2">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-500">
            <span>Low risk</span>
            <span>High risk</span>
          </div>
          <div className="mt-2 h-[3px] rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400" />
        </div>

        <div className="mt-4 grid gap-2.5 lg:grid-cols-3">
          {tiers.map((t, idx) => {
            const ui = tierUi(idx)
            const steps = t.governancePath.split(/\s*->\s*/g).filter(Boolean)

            return (
            <div
              key={t.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/55 p-3.5 transition-all duration-200 hover:border-white/20 hover:bg-slate-900/70 hover:-translate-y-0.5"
              style={{ borderTopColor: ui.borderTop, borderTopWidth: 3, borderTopStyle: 'solid' }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: idx === 0 ? 'rgba(52,211,153,0.08)' : idx === 1 ? 'rgba(245,158,11,0.08)' : 'rgba(251,113,133,0.08)' }}
              />
              <div className="flex items-start justify-between gap-2.5">
                <div className="min-w-0">
                  <p className={`text-[10px] uppercase tracking-wider ${ui.label}`}>Risk tier {idx + 1}</p>
                  <p className="mt-1 text-base font-semibold leading-tight text-slate-100 sm:text-lg">{t.name}</p>
                </div>
                <div className={`flex h-11 w-11 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg border sm:h-12 sm:w-12 ${ui.bubble}`}>
                  <span className="text-lg font-semibold leading-none sm:text-xl">{t.requiredApprovers.length}</span>
                  <span className="mt-0.5 max-w-full px-0.5 text-center text-[7px] font-medium leading-none sm:text-[8px]">Approvers</span>
                </div>
              </div>
              <p className="mt-2 text-sm leading-5 text-slate-300">{t.description}</p>
              <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-500">Governance path</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                {steps.map((step, sIdx) => (
                  <div key={`${t.id}-${step}-${sIdx}`} className="flex items-center gap-1.5">
                    <span className={`rounded-md border px-2 py-1 text-[11px] font-medium ${ui.step}`}>{step}</span>
                    {sIdx < steps.length - 1 && <span className="text-xs text-slate-500">→</span>}
                  </div>
                ))}
              </div>
            </div>
          )})}
        </div>
      </div>
    </div>
  )
}

export function TraceabilityProofGraph({ links, selectedId, onSelect }: { links: TraceLink[]; selectedId: string | null; onSelect: (id: string) => void }) {
  type TraceStatus = 'verified' | 'partial' | 'gap'
  type StageTone = 'indigo' | 'purple' | 'red' | 'cyan' | 'green' | 'amber' | 'violet'

  const [filter, setFilter] = useState('')
  const selected = links.find((l) => l.id === selectedId) ?? links[0] ?? null

  const expectedLinksByRegulation: Record<string, number> = useMemo(
    () => ({
      '21 CFR Part 11': 3,
      '21 CFR Part 820': 4,
      '21 CFR Part 803': 4,
      'IEC 62304 Class C': 7,
      'IEC 62304 Class B': 7,
      'ISO 14971': 5,
      'EU MDR 2017/745': 6,
      'EU IVDR 2017/746': 4,
    }),
    []
  )

  const completionForLink = useCallback(
    (l: TraceLink) => {
      const present = [l.regulation, l.requirement, l.risk, l.design, l.test, l.approval, l.artifact].filter((x) => Boolean(String(x).trim())).length
      const expected = expectedLinksByRegulation[l.regulation] ?? 7
      return { present, expected }
    },
    [expectedLinksByRegulation]
  )

  const statusForLink = useCallback(
    (l: TraceLink): TraceStatus => {
      const { present, expected } = completionForLink(l)
      if (present >= expected) return 'verified'
      if (present <= 1) return 'gap'
      return 'partial'
    },
    [completionForLink]
  )

  const statusChip = (s: TraceStatus) =>
    s === 'verified'
      ? 'border-emerald-400/30 bg-emerald-500/12 text-emerald-200'
      : s === 'partial'
        ? 'border-amber-400/30 bg-amber-500/12 text-amber-100'
        : 'border-rose-400/30 bg-rose-500/12 text-rose-200'

  const coverageStats = useMemo(() => {
    const statuses = links.map(statusForLink)
    const fully = statuses.filter((s) => s === 'verified').length
    const partial = statuses.filter((s) => s === 'partial').length
    const gaps = statuses.filter((s) => s === 'gap').length
    const total = links.length
    // Weighted coverage: fully traced + partial progress contribution.
    const coverage = total === 0 ? 0 : Math.round(((fully + (partial * 0.65)) / total) * 100)
    return { total, fully, partial, gaps, coverage }
  }, [links, statusForLink])

  const regulations = useMemo(() => {
    const map = new Map<string, { name: string; sub: string; count: number; status: TraceStatus; firstId: string; present: number; expected: number }>()
    for (const l of links) {
      const k = l.regulation
      const cur = map.get(k)
      if (cur) {
        cur.count += 1
        continue
      }
      const c = completionForLink(l)
      map.set(k, {
        name: l.regulation,
        sub: `${l.standard} · Lane ${l.regulation === 'ISO 14971' ? 'C/D' : l.lane}`,
        count: 1,
        status: statusForLink(l),
        firstId: l.id,
        present: c.present,
        expected: c.expected,
      })
    }
    return Array.from(map.values())
  }, [links, statusForLink, completionForLink])

  const grouped = useMemo(() => {
    const classify = (name: string) => {
      const t = name.toLowerCase()
      if (t.includes('eu') || t.includes('mdr') || t.includes('ivdr')) return 'EU / MDR'
      if (t.includes('iso') || t.includes('iec')) return 'ISO / IEC'
      return 'FDA / US'
    }
    const match = (r: { name: string; sub: string }) =>
      `${r.name} ${r.sub}`.toLowerCase().includes(filter.toLowerCase())

    const buckets: Record<'FDA / US' | 'ISO / IEC' | 'EU / MDR', typeof regulations> = {
      'FDA / US': [],
      'ISO / IEC': [],
      'EU / MDR': [],
    }
    for (const r of regulations) {
      if (!match(r)) continue
      buckets[classify(r.name) as 'FDA / US' | 'ISO / IEC' | 'EU / MDR'].push(r)
    }
    return buckets
  }, [regulations, filter])

  const stageSpec: Array<{ key: keyof TraceLink; label: string; tone: StageTone }> = [
    { key: 'regulation', label: 'Regulation', tone: 'indigo' },
    { key: 'requirement', label: 'Requirement', tone: 'purple' },
    { key: 'risk', label: 'Risk', tone: 'red' },
    { key: 'design', label: 'Design', tone: 'cyan' },
    { key: 'test', label: 'Test', tone: 'green' },
    { key: 'approval', label: 'Approval', tone: 'amber' },
    { key: 'artifact', label: 'Artifact', tone: 'violet' },
  ]

  const toneClass = (tone: StageTone) => {
    if (tone === 'indigo') return 'border-indigo-400/30 bg-indigo-500/12 text-indigo-200'
    if (tone === 'purple') return 'border-purple-400/30 bg-purple-500/12 text-purple-200'
    if (tone === 'red') return 'border-rose-400/30 bg-rose-500/12 text-rose-200'
    if (tone === 'cyan') return 'border-cyan-400/30 bg-cyan-500/12 text-cyan-200'
    if (tone === 'green') return 'border-emerald-400/30 bg-emerald-500/12 text-emerald-200'
    if (tone === 'amber') return 'border-amber-400/30 bg-amber-500/12 text-amber-100'
    return 'border-violet-400/30 bg-violet-500/12 text-violet-200'
  }

  const lineColor = selected ? statusForLink(selected) : 'partial'
  const lineClass =
    lineColor === 'verified' ? 'bg-emerald-400/50' : lineColor === 'partial' ? 'bg-amber-400/50' : 'bg-rose-400/50'

  const stageCount = (key: keyof TraceLink) => new Set(links.map((l) => String(l[key]))).size

  const selectedStatus = selected ? statusForLink(selected) : 'partial'
  const selectedStatusLabel = selectedStatus === 'verified' ? 'Fully Traced' : selectedStatus === 'partial' ? 'Partial' : 'Gap Detected'

  const refId = (stageLabel: string, value: string, idx: number) => {
    if (/^[A-Z]{1,4}-\d+(?:-\d+)?/i.test(value)) return value
    const prefix =
      stageLabel === 'Regulation'
        ? 'REG'
        : stageLabel === 'Requirement'
          ? 'REQ'
          : stageLabel === 'Risk'
            ? 'RSK'
            : stageLabel === 'Design'
              ? 'DES'
              : stageLabel === 'Test'
                ? 'TST'
                : stageLabel === 'Approval'
                  ? 'APR'
                  : 'ART'
    return `${prefix}-${idx + 1}`
  }

  const sidebarRow = (r: { name: string; sub: string; count: number; status: TraceStatus; firstId: string; present: number; expected: number }) => {
    const active = selected?.regulation === r.name
    const dotClass = r.status === 'verified' ? 'bg-emerald-400' : r.status === 'partial' ? 'bg-amber-400' : 'bg-rose-400'
    return (
      <button
        key={r.name}
        onClick={() => onSelect(r.firstId)}
        className={clsx(
          'w-full rounded-lg border border-white/5 bg-slate-900/20 p-2 text-left transition',
          active ? 'border-l-2 border-l-violet-400 bg-slate-900/40' : 'hover:bg-white/[0.03]'
        )}
      >
        <div className="flex items-start gap-2">
          <span className={clsx('mt-1 h-2 w-2 rounded-full', dotClass)} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-100">{r.name}</p>
            <p className="truncate text-xs text-slate-500">{r.sub}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              {r.status === 'verified' ? `${r.present} chain links` : `${r.present} of ${r.expected} links complete`}
              {r.status === 'gap' && ' · Action required'}
            </p>
          </div>
          <span className={`rounded-full border px-2 py-0.5 text-[10px] ${statusChip(r.status)}`}>
            {r.status === 'verified' ? 'Fully Traced' : r.status === 'partial' ? 'Partial' : 'Gap Detected'}
          </span>
        </div>
      </button>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 p-5">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative space-y-4">
        {/* TOP: Coverage dashboard bar */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/35">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_0.8fr_1fr] items-stretch">
            <div className="px-4 py-3 border-b border-white/10 sm:border-r sm:border-b-white/10 xl:border-b-0">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Traceability Studio</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-100">The proof engine</h3>
              <p className="mt-1 text-sm text-slate-400">Every regulation maps to a full chain of evidence.</p>
            </div>
            <div className="px-4 py-3 border-b border-white/10 sm:border-r xl:border-b-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Total regulations</p>
              <p className="mt-1 text-3xl font-semibold text-slate-100">{coverageStats.total}</p>
            </div>
            <div className="px-4 py-3 border-b border-white/10 sm:border-b-0 xl:border-r">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Fully traced</p>
              <p className="mt-1 text-3xl font-semibold text-emerald-300">{coverageStats.fully}</p>
            </div>
            <div className="px-4 py-3 border-b border-white/10 sm:border-r xl:border-b-0">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Partial</p>
              <p className="mt-1 text-3xl font-semibold text-amber-300">{coverageStats.partial}</p>
            </div>
            <div className="px-4 py-3 border-b border-white/10 sm:border-b-0 xl:border-r">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Gaps</p>
              <p className="mt-1 text-3xl font-semibold text-rose-300">{coverageStats.gaps}</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">Coverage</p>
              <p className="mt-1 text-3xl font-semibold text-slate-100">{coverageStats.coverage}%</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10">
                <div className="h-1.5 rounded-full bg-violet-400/80" style={{ width: `${coverageStats.coverage}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-[280px_1fr]">
          {/* LEFT SIDEBAR */}
          <aside className="rounded-2xl border border-white/10 bg-slate-900/35 p-3">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter regulations..."
              className="w-full rounded-lg border border-white/10 bg-slate-950/35 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500"
            />

            <div className="mt-3 space-y-4">
              {(['FDA / US', 'ISO / IEC', 'EU / MDR'] as const).map((group) => (
                <div key={group}>
                  <p className="mb-2 text-[11px] uppercase tracking-wider text-slate-500">{group}</p>
                  <div className="space-y-1.5">
                    {grouped[group].length > 0 ? grouped[group].map(sidebarRow) : <p className="px-1 text-xs text-slate-600">No regulations</p>}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* MAIN PANEL */}
          <div className="space-y-3">
            {/* CHAIN HEADER */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/35 p-4">
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
                <div>
                  <h4 className="text-xl font-semibold text-slate-100">{selected?.regulation ?? 'Select a regulation'}</h4>
              <p className="mt-1 text-sm text-slate-400">
                    {selected ? `${selected.standard} context with linked requirement, risk controls, and evidence chain.` : 'Select a relationship link to inspect the chain.'}
                  </p>
              {selected && (
                <p className="mt-1 text-[11px] text-slate-500">
                  {completionForLink(selected).present} of {completionForLink(selected).expected} links complete
                  {selectedStatus === 'gap' && ' · Action required'}
                </p>
              )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-indigo-400/25 bg-indigo-500/12 px-3 py-1 text-xs text-indigo-200">
                  {selected ? `Lane ${selected.regulation === 'ISO 14971' ? 'C/D' : selected.lane}` : 'Lane —'}
                  </span>
                  <span className={`rounded-full border px-3 py-1 text-xs ${statusChip(selectedStatus)}`}>{selectedStatusLabel}</span>
                </div>
              </div>
            </div>

            {/* PIPELINE STRIP */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/30 p-3">
              <div className="flex min-w-[640px] items-center">
                {stageSpec.map((s, idx) => (
                  <div key={s.key} className="flex items-center flex-1 min-w-0">
                    <div className="w-full text-center">
                      <span className={`inline-flex rounded-md border px-2 py-1 text-[11px] ${toneClass(s.tone)}`}>{s.label}</span>
                      <p className="mt-1 text-[11px] text-slate-400">{stageCount(s.key)} items</p>
                    </div>
                    {idx < stageSpec.length - 1 && <div className={clsx('mx-1 h-px flex-1', lineClass)} />}
                  </div>
                ))}
              </div>
            </div>

            {/* CHAIN CARDS */}
            <div className="relative space-y-3 pl-6 sm:pl-6">
              <div className="absolute left-2.5 top-1 bottom-1 w-px bg-white/10" />
              {selected &&
                stageSpec.map((s, idx) => {
                  const value = String(selected[s.key] ?? '')
                  const hasValue = Boolean(value.trim())
                  const ref = refId(s.label, value, idx)
                  return (
                    <div key={s.key} className="relative rounded-2xl border border-white/10 bg-slate-900/35 p-4">
                      <span className={clsx('absolute -left-6 top-6 h-3 w-3 rounded-full border', toneClass(s.tone))} />
                      <div className="flex items-start justify-between gap-3">
                        <span className={clsx('rounded-md border px-2 py-1 text-[11px] uppercase tracking-wider', toneClass(s.tone))}>{s.label}</span>
                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-300">{hasValue ? ref : '—'}</span>
                      </div>
                      <h5 className="mt-2 text-lg font-semibold text-slate-100">{hasValue ? value : 'Not linked yet'}</h5>
                      <p className="mt-1 text-sm text-slate-400">
                        {s.label === 'Regulation'
                          ? 'Primary obligation anchor for this trace chain.'
                          : s.label === 'Requirement'
                            ? 'Controlled requirement linked to regulation intent.'
                            : s.label === 'Risk'
                              ? 'Risk control evidence associated to this chain.'
                              : s.label === 'Design'
                                ? 'Design control mapping for implementation trace.'
                                : s.label === 'Test'
                                  ? 'Verification evidence proving control effectiveness.'
                                  : s.label === 'Approval'
                                    ? 'Governance sign-off for controlled release.'
                                    : 'Final evidence artifact in the trace chain.'}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">Lane {selected.lane}</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{selected.phase}</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{selected.standard}</span>
                      </div>
                      <div className="mt-3">
                        <span className={`rounded-full border px-2.5 py-1 text-xs ${statusChip(selectedStatus)}`}>{selectedStatusLabel}</span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function RiskHeatBoard({ hotspots }: { hotspots: ComplianceHotspot[] }) {
  const [modeFilter, setModeFilter] = useState<'All' | 'Process' | 'Governance' | 'Technical' | 'Operations'>('All')

  const scoreByRank: Record<number, number> = {
    1: 95,
    2: 88,
    3: 84,
    4: 78,
    5: 74,
    6: 68,
    7: 62,
    8: 54,
    9: 46,
    10: 38,
  }

  const modeByRank: Record<number, 'Process' | 'Governance' | 'Technical' | 'Operations'> = {
    1: 'Process',
    2: 'Process',
    3: 'Governance',
    4: 'Governance',
    5: 'Technical',
    6: 'Technical',
    7: 'Process',
    8: 'Governance',
    9: 'Operations',
    10: 'Process',
  }

  const ordered = [...hotspots].sort((a, b) => a.rank - b.rank)
  const enriched = ordered.map((h) => ({
    ...h,
    score: scoreByRank[h.rank] ?? 0,
    mode: modeByRank[h.rank] ?? 'Process',
  }))
  const visible = modeFilter === 'All' ? enriched : enriched.filter((e) => e.mode === modeFilter)

  const severityClass = (rank: number) => {
    if (rank <= 3) return 'border-rose-400/35 bg-rose-500/12 text-rose-200'
    if (rank <= 7) return 'border-amber-400/35 bg-amber-500/12 text-amber-100'
    if (rank <= 9) return 'border-indigo-400/35 bg-indigo-500/12 text-indigo-200'
    return 'border-slate-400/35 bg-slate-500/12 text-slate-300'
  }

  const scoreBarClass = (rank: number) => {
    if (rank <= 3) return 'bg-rose-400'
    if (rank <= 7) return 'bg-amber-400'
    if (rank <= 9) return 'bg-indigo-400'
    return 'bg-slate-400'
  }

  const modePillClass = (mode: 'Process' | 'Governance' | 'Technical' | 'Operations') => {
    if (mode === 'Process') return 'border-indigo-400/30 bg-indigo-500/12 text-indigo-200'
    if (mode === 'Governance') return 'border-amber-400/30 bg-amber-500/12 text-amber-100'
    if (mode === 'Technical') return 'border-cyan-400/30 bg-cyan-500/12 text-cyan-200'
    return 'border-violet-400/30 bg-violet-500/12 text-violet-200'
  }

  const ownerClass = (owner: string) => {
    if (owner === 'Engineering') return 'border-cyan-400/30 bg-cyan-500/12 text-cyan-200'
    if (owner === 'Quality') return 'border-emerald-400/30 bg-emerald-500/12 text-emerald-200'
    if (owner === 'RA' || owner === 'Regulatory Affairs') return 'border-indigo-400/30 bg-indigo-500/12 text-indigo-200'
    if (owner === 'Business') return 'border-amber-400/30 bg-amber-500/12 text-amber-100'
    if (owner === 'Security') return 'border-rose-400/30 bg-rose-500/12 text-rose-200'
    if (owner === 'Ops' || owner === 'Operations') return 'border-violet-400/30 bg-violet-500/12 text-violet-200'
    return 'border-white/10 bg-white/5 text-slate-300'
  }

  const criticalCount = enriched.filter((e) => e.rank <= 3).length
  const highCount = enriched.filter((e) => e.rank >= 4 && e.rank <= 7).length
  const mediumCount = enriched.filter((e) => e.rank >= 8 && e.rank <= 9).length
  const processCount = enriched.filter((e) => e.mode === 'Process').length
  const governanceCount = enriched.filter((e) => e.mode === 'Governance').length
  const technicalCount = enriched.filter((e) => e.mode === 'Technical').length

  const avgScore = (list: typeof enriched) => {
    if (list.length === 0) return 0
    return Math.round(list.reduce((sum, x) => sum + x.score, 0) / list.length)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 p-5">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Compliance Risk Hotspots</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-100">A ranked warning board for leadership</h3>
            <p className="mt-2 text-sm text-slate-300">
              Ten failure modes, scored by impact and audit exposure. Each row is a gap with an owner, a consequence, and a mode.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-500">Filter by mode</span>
            {(['All', 'Process', 'Governance', 'Technical', 'Operations'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModeFilter(m)}
                className={clsx(
                  'rounded-md border px-2.5 py-1 text-xs transition',
                  modeFilter === m ? 'border-white/20 bg-white/10 text-slate-100' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Summary strip */}
        <div className="mt-5 grid grid-cols-6 rounded-2xl border border-white/10 bg-slate-900/30 overflow-hidden">
          <div className="border-r border-white/10 px-4 py-3">
            <p className="text-2xl font-semibold text-rose-300">{criticalCount}</p>
            <p className="text-xs text-slate-400">Critical (score 80+)</p>
          </div>
          <div className="border-r border-white/10 px-4 py-3">
            <p className="text-2xl font-semibold text-amber-300">{highCount}</p>
            <p className="text-xs text-slate-400">High (score 60-79)</p>
          </div>
          <div className="border-r border-white/10 px-4 py-3">
            <p className="text-2xl font-semibold text-indigo-300">{mediumCount}</p>
            <p className="text-xs text-slate-400">Medium (score 40-59)</p>
          </div>
          <div className="border-r border-white/10 px-4 py-3">
            <p className="text-2xl font-semibold text-indigo-300">{processCount}</p>
            <p className="text-xs text-slate-400">Process gaps</p>
          </div>
          <div className="border-r border-white/10 px-4 py-3">
            <p className="text-2xl font-semibold text-amber-300">{governanceCount}</p>
            <p className="text-xs text-slate-400">Governance gaps</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-2xl font-semibold text-cyan-300">{technicalCount}</p>
            <p className="text-xs text-slate-400">Technical gaps</p>
          </div>
        </div>

        {/* Ranked table */}
        <div className="mt-4 overflow-auto rounded-2xl border border-white/10 bg-slate-900/20">
          <table className="w-full min-w-[1280px] text-left">
            <thead className="bg-white/[0.02] text-[11px] uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Score</th>
                <th className="px-3 py-2">Hotspot</th>
                <th className="px-3 py-2">Mode</th>
                <th className="px-3 py-2">Failure & Why It Matters</th>
                <th className="px-3 py-2">Consequence</th>
                <th className="px-3 py-2">Owners</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.rank} className="border-t border-white/10 transition-colors hover:bg-white/[0.03]">
                  <td className="px-3 py-2 align-top">
                    <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-medium ${severityClass(r.rank)}`}>{r.rank}</span>
                  </td>
                  <td className="px-3 py-2 align-top">
                    <div className="w-[72px]">
                      <div className="text-xl font-semibold text-slate-100">{r.score}</div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                        <div className={clsx('h-1.5 rounded-full', scoreBarClass(r.rank))} style={{ width: `${r.score}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 align-top">
                    <p className="text-sm font-semibold text-slate-100">{r.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{r.failureMode}</p>
                  </td>
                  <td className="px-3 py-2 align-top">
                    <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs ${modePillClass(r.mode)}`}>{r.mode}</span>
                  </td>
                  <td className="px-3 py-2 align-top">
                    <p className="text-sm text-slate-200">{r.failureMode}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      <span className="text-slate-400">Why it matters:</span> {r.whyItMatters}
                    </p>
                  </td>
                  <td className="px-3 py-2 align-top text-sm text-slate-200">{r.consequence}</td>
                  <td className="px-3 py-2 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {r.impactedFunctions.map((owner) => (
                        <span key={`${r.rank}-${owner}`} className={`rounded-md border px-2 py-0.5 text-xs ${ownerClass(owner)}`}>
                          {owner}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Showing {visible.length} of {enriched.length} hotspots · Avg score {avgScore(visible)}
        </p>
      </div>
    </div>
  )
}

export function GuardrailsTracks({ patterns }: { patterns: GuardrailPattern[] }) {
  const trackMeta = [
    {
      key: 'Compliance Engineering',
      color: '#6366f1',
      subtitle: 'Obligations -> reusable workflows',
      description:
        'Turns regulatory obligations (IEC 62304, ISO 14971, 21 CFR Part 11) into reusable engineering patterns. Maps to classification.',
      chips: ['Starter Kits', 'Obligation Mapping', 'Traceability Automation'],
    },
    {
      key: 'Security by Design',
      color: '#14b8a6',
      subtitle: 'Threat controls injected early',
      description:
        'Embeds threat modelling, SBOM, secrets scanning, and security verification into CI/CD pipeline stages.',
      chips: ['Threat Modelling', 'SBOM Generation', 'CI Security Scanning'],
    },
    {
      key: 'AI Guardrails',
      color: '#a855f7',
      subtitle: 'AI controls validated & governed',
      description:
        'Governs AI-assisted development to ensure outputs are reviewed, validated, and compliant. AI-generated code and outputs treated as human output requiring sign-off.',
      chips: ['PHI Controls', 'Output Review Gates', 'Audit Logging'],
    },
  ] as const

  const controlTypeMeta = {
    PREVENTIVE: '#ef4444',
    AUTOMATED: '#3b82f6',
    'HUMAN APPROVAL': '#f59e0b',
    DETECTIVE: '#8b5cf6',
    CORRECTIVE: '#f43f5e',
  } as const

  const phaseRows = [
    {
      id: 'P0',
      name: 'Intake & Classification',
      tracks: {
        'Compliance Engineering': [{ type: 'PREVENTIVE', text: 'Mandatory classification gate before build kickoff' }],
        'Security by Design': [],
        'AI Guardrails': [{ type: 'PREVENTIVE', text: 'No PHI in non-approved external AI tools' }],
      },
    },
    {
      id: 'P1',
      name: 'Planning & Requirements',
      tracks: {
        'Compliance Engineering': [{ type: 'AUTOMATED', text: 'Traceability starter kit provisioned at requirements baseline' }],
        'Security by Design': [],
        'AI Guardrails': [
          { type: 'PREVENTIVE', text: 'No PHI in non-approved external AI tools' },
          { type: 'HUMAN APPROVAL', text: 'AI-assisted output requires accountable review before approval' },
        ],
      },
    },
    {
      id: 'P2',
      name: 'Architecture & Design',
      tracks: {
        'Compliance Engineering': [{ type: 'AUTOMATED', text: 'Traceability starter kit — design linkage pre-wired' }],
        'Security by Design': [{ type: 'PREVENTIVE', text: 'Threat model required for Lane C/D before design sign-off' }],
        'AI Guardrails': [{ type: 'HUMAN APPROVAL', text: 'AI-assisted output requires accountable review' }],
      },
    },
    {
      id: 'P3',
      name: 'Build & Unit Verification',
      tracks: {
        'Compliance Engineering': [{ type: 'AUTOMATED', text: 'Traceability sign-off — IaC linkage auto-generated' }],
        'Security by Design': [{ type: 'AUTOMATED', text: 'SBOM + dependency + secrets scanning in CI pipeline' }],
        'AI Guardrails': [{ type: 'HUMAN APPROVAL', text: 'AI-assisted output requires accountable review' }],
      },
    },
    {
      id: 'P4',
      name: 'Integration & Validation',
      tracks: {
        'Compliance Engineering': [{ type: 'AUTOMATED', text: 'Traceability sign-off — test linkage auto-generated' }],
        'Security by Design': [{ type: 'DETECTIVE', text: 'Security verification evidence bundle assembled for design' }],
        'AI Guardrails': [{ type: 'HUMAN APPROVAL', text: 'AI-assisted output requires accountable review' }],
      },
    },
    {
      id: 'P5',
      name: 'Release & Deployment',
      tracks: {
        'Compliance Engineering': [{ type: 'HUMAN APPROVAL', text: 'Release conditions audit — pre-approval compliance check' }],
        'Security by Design': [{ type: 'HUMAN APPROVAL', text: 'Final security sign-off required before Lane C/D go-live' }],
        'AI Guardrails': [{ type: 'DETECTIVE', text: 'AI model decision context logged' }],
      },
    },
    {
      id: 'P6',
      name: 'Post-Market & Operations',
      tracks: {
        'Compliance Engineering': [{ type: 'DETECTIVE', text: 'Automated compliance monitoring — drift alerts' }],
        'Security by Design': [],
        'AI Guardrails': [{ type: 'CORRECTIVE', text: 'AI model decision control context + human override controls' }],
      },
    },
  ] as const

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 p-5 shadow-[0_18px_60px_rgba(8,12,24,0.45)]" style={{ backgroundColor: '#0b0f1a' }}>
      <div className="pointer-events-none absolute inset-0 opacity-75">
        <div className="absolute -left-10 top-8 h-64 w-64 rounded-full blur-3xl" style={{ background: 'rgba(99,102,241,0.12)' }} />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full blur-3xl" style={{ background: 'rgba(168,85,247,0.1)' }} />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Guardrails & Paved Roads</p>

        {/* 1. Hero section */}
        <div className="mt-3 grid gap-4 lg:grid-cols-[1.15fr_0.95fr_0.95fr] lg:items-stretch">
          <div>
            <h3 className="text-3xl font-semibold leading-tight tracking-tight text-white lg:text-[34px]">Compliance built into delivery — not bolted on</h3>
            <p className="mt-2 text-[13px] leading-6 text-slate-300">
              Three execution tracks inject reusable, evidence-aware controls across every lifecycle phase.
              These controls prevent avoidable violations, speed delivery, and produce audit-ready proof as delivery work happens.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-indigo-400/30 bg-indigo-500/12 px-3 py-1 text-xs text-indigo-200">
                3 execution tracks
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                7 lifecycle phases
              </span>
              <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                {patterns.length} control patterns
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 p-4 shadow-[0_6px_22px_rgba(0,0,0,0.22)]" style={{ backgroundColor: '#131929' }}>
            <p className="text-xs uppercase tracking-wider text-slate-400">Why this matters</p>
            <div className="mt-3 space-y-2.5 text-[13px] leading-5 text-slate-300">
              <div className="flex items-start gap-2">
                <Rocket size={15} className="mt-0.5 text-indigo-300" />
                <p><span className="font-medium text-slate-100">Paved Roads -&gt; Velocity:</span> Pre-approved templates, starter kits, and workflows eliminate rework.</p>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck size={15} className="mt-0.5 text-teal-300" />
                <p><span className="font-medium text-slate-100">Guardrails -&gt; Risk Reduction:</span> Preventive and automated controls stop violations before release. Detective controls surface issues early.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckSquare size={15} className="mt-0.5 text-violet-300" />
                <p><span className="font-medium text-slate-100">Evidence by Default:</span> Controls generate audit-ready evidence as a byproduct of delivery.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-400/25 p-4 shadow-[0_6px_22px_rgba(0,0,0,0.22)]" style={{ backgroundColor: '#131929' }}>
            <p className="text-xs uppercase tracking-wider text-indigo-200">Operating principle</p>
            <div className="mt-3 space-y-2.5 text-[13px] leading-5 text-slate-300">
              <p>
                <span className="font-medium text-slate-100">Controls are infrastructure:</span> Each track is a set of engineering patterns. They plug into the SDLC automatically or with defined human checkpoints.
              </p>
              <p>
                <span className="font-medium text-slate-100">Reusable across all lanes:</span> Lane A uses a subset. Lane D uses all. Same pattern library scales.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Legend strip */}
        <div className="mt-4 rounded-2xl border border-white/10 p-4 shadow-[0_8px_28px_rgba(0,0,0,0.24)]" style={{ backgroundColor: '#131929' }}>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Execution tracks</p>
              <div className="mt-2 rounded-2xl border border-white/10 bg-[#0c1220] p-2">
                <div className="flex flex-wrap gap-2">
                  {trackMeta.map((t) => (
                    <span key={t.key} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs" style={{ borderColor: `${t.color}66`, color: t.color, backgroundColor: `${t.color}12` }}>
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} />
                      {t.key}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Control types</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                {(Object.keys(controlTypeMeta) as Array<keyof typeof controlTypeMeta>).map((k) => (
                  <span key={k} className="inline-flex items-center gap-2 text-xs text-slate-300">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: controlTypeMeta[k] }} />
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Phase x Track matrix */}
        <div className="mt-4 overflow-auto rounded-2xl border border-white/10 shadow-[0_8px_28px_rgba(0,0,0,0.24)]" style={{ backgroundColor: '#131929' }}>
          <table className="w-full min-w-[1120px] text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-4 py-3 text-xs uppercase tracking-wider text-slate-400">Phase</th>
                {trackMeta.map((t) => (
                  <th key={t.key} className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                      <p className="text-sm font-semibold text-slate-100">{t.key}</p>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{t.subtitle}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {phaseRows.map((row, idx) => (
                <tr key={row.id} className="align-top border-b border-white/10 last:border-b-0" style={{ backgroundColor: idx % 2 === 0 ? '#131929' : '#111a2b' }}>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-md border border-indigo-400/30 bg-indigo-500/12 px-2 py-0.5 font-mono text-xs text-indigo-200">{row.id}</span>
                    <p className="mt-1 text-sm font-medium text-slate-100">{row.name}</p>
                  </td>
                  {trackMeta.map((t) => {
                    const controls = row.tracks[t.key]
                    return (
                      <td key={`${row.id}-${t.key}`} className="px-4 py-3">
                        {controls.length === 0 ? (
                          <span className="text-sm text-slate-500">—</span>
                        ) : (
                          <div className="space-y-2">
                            {controls.map((c, i) => (
                              <div
                                key={`${row.id}-${t.key}-${i}`}
                                className="rounded-lg border border-white/10 p-2.5 transition-all duration-150 hover:border-white/20 hover:shadow-[0_6px_18px_rgba(0,0,0,0.28)]"
                                style={{ backgroundColor: '#0c1220' }}
                              >
                                <span
                                  className="inline-flex rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                  style={{
                                    borderColor: `${controlTypeMeta[c.type as keyof typeof controlTypeMeta]}66`,
                                    color: controlTypeMeta[c.type as keyof typeof controlTypeMeta],
                                    backgroundColor: `${controlTypeMeta[c.type as keyof typeof controlTypeMeta]}14`,
                                  }}
                                >
                                  {c.type}
                                </span>
                                <p className="mt-1.5 text-[13px] leading-5 text-slate-200">{c.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Classification Model</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-100">Turn intended use into lane-routed lifecycle rigor</h3>
        <p className="mt-1 text-[12px] text-slate-300">
          Eight assessment dimensions determine regulatory applicability, evidence expectations, approval intensity, and the SDLC lane.
        </p>

        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-2">
          <svg viewBox="0 0 520 330" className="h-[160px] w-full" preserveAspectRatio="xMidYMid meet">
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
            <p className="text-xs uppercase tracking-[0.32em] text-slate-300">CODEX</p>
            <p className="mt-2 text-xs uppercase tracking-[0.32em] text-slate-300">REGULATED SOFTWARE COMPLIANCE FRAMEWORK</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-50 md:text-5xl">
              Regulated Software Compliance
              <br />
              Framework
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

