import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Route, Layers, Network, Binary } from 'lucide-react'
import ProblemSolutionOutcomesBlueprint from './ProblemSolutionOutcomesBlueprint'

function Collapse({ open, children }: { open: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-200 ease-out ${open ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}
    >
      {children}
    </div>
  )
}

const TOKENS = {
  navy: '#0c1525',
  surface: '#111e35',
  card: '#162040',
  border: '#1f3060',
  teal: '#0b9ec4',
  gold: '#f59e0b',
  white: '#f0f6ff',
  muted: '#7090b0',
  accentRose: '#fb7185',
} as const

type PillarKey = 'classification' | 'sdlc' | 'governance' | 'traceability'

type Pillar = {
  key: PillarKey
  title: string
  tagline: string
  tone: 'teal' | 'gold' | 'violet' | 'rose'
  icon: React.ReactNode
  oneLiner: string
  what: string
  why: string
  how: string
  expandChips: string[]
}

const PILLARS: Pillar[] = [
  {
    key: 'classification',
    title: 'Classification',
    tagline: 'Intended use → lane rigor',
    tone: 'teal',
    icon: <Binary className="h-6 w-6 text-[#0b9ec4]" strokeWidth={2.25} />,
    oneLiner: 'One decision that routes the entire rigor of delivery.',
    what: 'What it is: map intended use and impact into regulated applicability context.',
    why: 'Why it matters: wrong classification leads to evidence gaps or over-building.',
    how: 'How it works: prompts guide a defensible decision tied to downstream lifecycle gates.',
    expandChips: ['Applies', 'Routes rigor', 'Defines evidence depth', 'Lane-ready rationale'],
  },
  {
    key: 'sdlc',
    title: 'SDLC Lanes',
    tagline: 'Risk-calibrated rigor',
    tone: 'gold',
    icon: <Route className="h-6 w-6 text-[#f59e0b]" strokeWidth={2.25} />,
    oneLiner: 'Risk level determines the process intensity and evidence depth.',
    what: 'What it is: four lanes from internal tools to high-risk SaMD.',
    why: 'Why it matters: it prevents under-validated delivery for high impact.',
    how: 'How it works: each lane expands traceable controls across phases 0–6.',
    expandChips: ['Regulatory burden', 'Evidence depth', 'Governance weight', 'Phase outputs'],
  },
  {
    key: 'governance',
    title: 'Governance',
    tagline: 'Layered accountability',
    tone: 'violet',
    icon: <Layers className="h-6 w-6 text-[#a855f7]" strokeWidth={2.25} />,
    oneLiner: 'Decision rights are explicit, so approvals become predictable.',
    what: 'What it is: a 4-layer decision structure for governed release routing.',
    why: 'Why it matters: “who approved what?” cannot be ambiguous during audits.',
    how: 'How it works: governance gates translate obligation to controlled action.',
    expandChips: ['Steering decisions', 'Exception authority', 'Release gates', 'Evidence sufficiency'],
  },
  {
    key: 'traceability',
    title: 'Traceability',
    tagline: 'Proof from regulation to release',
    tone: 'rose',
    icon: <Network className="h-6 w-6 text-[#fb7185]" strokeWidth={2.25} />,
    oneLiner: 'Every risk connects to requirements, design, tests, and release proof.',
    what: 'What it is: trace links that connect obligations to verified delivery.',
    why: 'Why it matters: auditors validate the chain—your evidence must hold.',
    how: 'How it works: traceability proof chains close at each lifecycle gate.',
    expandChips: ['Requirements → risk', 'Design intent', 'Verification closure', 'Audit-ready evidence'],
  },
]

function toneClass(tone: Pillar['tone']) {
  if (tone === 'teal') return 'border-[#0b9ec4]/35 bg-[#0b9ec4]/5'
  if (tone === 'gold') return 'border-[#f59e0b]/35 bg-[#f59e0b]/5'
  if (tone === 'violet') return 'border-[#a855f7]/35 bg-[#a855f7]/5'
  return 'border-[#fb7185]/35 bg-[#fb7185]/5'
}

function iconWrapClass(tone: Pillar['tone']) {
  if (tone === 'teal') return 'border-[#0b9ec4]/30 bg-[#0b9ec4]/10'
  if (tone === 'gold') return 'border-[#f59e0b]/30 bg-[#f59e0b]/10'
  if (tone === 'violet') return 'border-[#a855f7]/30 bg-[#a855f7]/10'
  return 'border-[#fb7185]/30 bg-[#fb7185]/10'
}

function MiniDiagram({ pillar }: { pillar: PillarKey }) {
  // Lightweight signature visuals (SVG) so the overview stays “premium”, not text-heavy.
  if (pillar === 'classification') {
    return (
      <svg viewBox="0 0 180 60" className="h-[60px] w-full">
        <polygon points="10,15 80,5 80,55 10,45" fill="rgba(11,158,196,0.08)" stroke="#0db3dc" strokeWidth="1.5" />
        <line x1="80" y1="10" x2="150" y2="30" stroke="#0db3dc" strokeWidth="2" />
        <circle cx="150" cy="30" r="10" fill="rgba(11,158,196,0.2)" stroke="#0db3dc" strokeWidth="1.5" />
        <text x="25" y="26" fontSize="7" fill="#7090b0" textAnchor="start">
          Use case
        </text>
        <text x="20" y="38" fontSize="7" fill="#7090b0" textAnchor="start">
          Risk tier
        </text>
        <text x="132" y="34" fontSize="7" fill="#0db3dc" textAnchor="start">
          Lane
        </text>
      </svg>
    )
  }
  if (pillar === 'sdlc') {
    return (
      <svg viewBox="0 0 180 60" className="h-[60px] w-full">
        <rect x="10" y="8" width="160" height="10" rx="4" fill="rgba(11,158,196,0.15)" stroke="#0db3dc" strokeWidth="1" />
        <rect x="10" y="23" width="120" height="10" rx="4" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="1" />
        <rect x="10" y="38" width="80" height="10" rx="4" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="1" />
        <rect x="10" y="53" width="40" height="10" rx="4" fill="rgba(251,113,133,0.15)" stroke="#fb7185" strokeWidth="1" />
        <text x="15" y="16" fontSize="6.5" fill="#0db3dc">
          A
        </text>
        <text x="15" y="31" fontSize="6.5" fill="#f59e0b">
          B
        </text>
        <text x="15" y="46" fontSize="6.5" fill="#a855f7">
          C
        </text>
        <text x="15" y="61" fontSize="6.5" fill="#fb7185">
          D
        </text>
      </svg>
    )
  }
  if (pillar === 'governance') {
    return (
      <svg viewBox="0 0 180 60" className="h-[60px] w-full">
        <polygon points="90,5 130,20 50,20" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="1" />
        <rect x="40" y="22" width="100" height="11" rx="2" fill="rgba(168,85,247,0.15)" stroke="#a855f7" strokeWidth="1" />
        <rect x="25" y="35" width="130" height="11" rx="2" fill="rgba(11,158,196,0.1)" stroke="#0db3dc" strokeWidth="1" />
        <rect x="10" y="48" width="160" height="11" rx="2" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1" />
        <text x="90" y="16" fontSize="6" fill="#f59e0b" textAnchor="middle">
          Exec
        </text>
        <text x="90" y="30" fontSize="6" fill="#a855f7" textAnchor="middle">
          Council
        </text>
        <text x="90" y="43" fontSize="6" fill="#0db3dc" textAnchor="middle">
          Boards
        </text>
        <text x="90" y="56" fontSize="6" fill="#10b981" textAnchor="middle">
          Teams
        </text>
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 180 60" className="h-[60px] w-full">
      <circle cx="20" cy="30" r="8" fill="rgba(11,158,196,0.2)" stroke="#0db3dc" strokeWidth="1.5" />
      <line x1="28" y1="30" x2="52" y2="30" stroke="#1f3060" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="60" cy="30" r="8" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="1.5" />
      <line x1="68" y1="30" x2="92" y2="30" stroke="#1f3060" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="100" cy="30" r="8" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="1.5" />
      <line x1="108" y1="30" x2="132" y2="30" stroke="#1f3060" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="140" cy="30" r="8" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
      <line x1="148" y1="30" x2="163" y2="30" stroke="#10b981" strokeWidth="1.5" strokeDasharray="0" />
      <text x="20" y="47" fontSize="6" fill="#7090b0" textAnchor="middle">
        Reqs
      </text>
      <text x="60" y="47" fontSize="6" fill="#7090b0" textAnchor="middle">
        Risk
      </text>
      <text x="100" y="47" fontSize="6" fill="#7090b0" textAnchor="middle">
        Design
      </text>
      <text x="140" y="47" fontSize="6" fill="#7090b0" textAnchor="middle">
        Test
      </text>
      <text x="168" y="47" fontSize="6" fill="#10b981" textAnchor="middle">
        ✓
      </text>
    </svg>
  )
}

export function FrameworkOverviewLanding() {
  const [openPillar, setOpenPillar] = useState<PillarKey | null>(null)

  const curriculum = useMemo(
    () => [
      {
        id: 'track-understand',
        label: 'Understand',
        badgeTone: 'understand',
        description: "What you're operating in",
        chapters: [
          { num: '01', title: 'Regulatory Universe', for: ['RA'], to: '/regulatory-universe' },
          { num: '02', title: 'Classification Model', for: ['Engineering', 'Regulatory'], to: '/classification-model' },
          { num: '03', title: 'SDLC Lanes', for: ['Engineering'], to: '/sdlc-lanes' },
        ],
      },
      {
        id: 'track-execute',
        label: 'Execute',
        badgeTone: 'execute',
        description: 'How you build and govern',
        chapters: [
          { num: '04', title: 'Lifecycle Architecture', for: ['Engineering'], to: '/lifecycle-architecture' },
          { num: '05', title: 'Evidence Architecture', for: ['Engineering', 'Regulatory'], to: '/evidence-architecture' },
          { num: '06', title: 'Governance Model', for: ['Regulatory'], to: '/governance-model' },
          { num: '07', title: 'Approval Matrix', for: ['Engineering'], to: '/approval-matrix' },
          { num: '08', title: 'Guardrails & Paved Roads', for: ['Engineering'], to: '/guardrails-paved-roads' },
        ],
      },
      {
        id: 'track-prove',
        label: 'Prove',
        badgeTone: 'prove',
        description: 'How you demonstrate compliance',
        chapters: [
          { num: '09', title: 'Traceability Studio', for: ['Engineering', 'Regulatory'], to: '/traceability-studio' },
          { num: '10', title: 'Compliance Risk Hotspots', for: ['Regulatory'], to: '/compliance-risk-hotspots' },
        ],
      },
    ],
    [],
  )

  const roleItems = [
    { color: TOKENS.teal, label: 'Engineering', verb: 'builds' },
    { color: TOKENS.gold, label: 'Quality', verb: 'governs' },
    { color: '#8b5cf6', label: 'Regulatory Affairs', verb: 'interprets' },
    { color: '#fb7185', label: 'Security', verb: 'protects' },
    { color: '#10b981', label: 'Business', verb: 'owns intended use' },
    { color: '#60a5fa', label: 'System Owner', verb: 'authorizes production' },
  ]

  return (
    <div className="space-y-5">
      {/* ROLES STRIP (top, compressed) */}
      <div className="rounded-2xl border border-[#1f3060] bg-[#060c18] p-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {roleItems.map((r) => (
            <div key={r.label} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
              <p className="text-[12px] leading-5 text-[#4a6070]">
                <span className="font-semibold" style={{ color: TOKENS.muted }}>
                  {r.label}
                </span>{' '}
                {r.verb}.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section
        className="relative overflow-hidden rounded-2xl border border-[#1f3060]"
        style={{
          background: 'linear-gradient(135deg, #0a1830 0%, #0c1d3a 50%, #081525 100%)',
          minHeight: 350,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[350px]">
          <div className="px-8 py-10 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#4a6fa0]">REGULATED SOFTWARE COMPLIANCE PORTAL · FRAMEWORK ATLAS</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-[#f0f6ff] lg:text-5xl">
              Regulated Software
              <br />
              <span style={{ color: TOKENS.teal }}>Compliance</span>
              <br />
              Reference Framework
            </h1>
            <p className="mt-4 text-[14px] text-[#6080a0] leading-7 max-w-[520px]">
              The foundation for building, validating, and operating software in a regulated healthcare environment. A consulting-grade reference architecture linking obligations, lifecycle rigor, governance, and traceable evidence.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Accountable', 'Executable', 'Traceable by design'].map((t) => (
                <span key={t} className="rounded-full border border-[#1f3060] bg-[#111e35]/40 px-4 py-1 text-[11px] font-medium text-[#7090b0]">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#0b9ec4]/20 bg-[#0b9ec4]/5 px-4 py-4 max-w-[520px]">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#0db3dc]">Core principle</p>
              <p className="mt-2 text-[14px] leading-6 text-[#c8dcf0]">
                Regulations define obligations. Standards define the lifecycle. Governance makes it work in the real world.
              </p>
            </div>
          </div>

          <div className="px-6 py-8 lg:px-10 lg:py-0 flex items-center justify-center">
            <div className="w-full max-w-[560px] rounded-2xl border border-[#1f3060] bg-[#0a1428]/70 p-5 backdrop-blur">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#3a5070]">Operating model blueprint</p>
                <span className="text-[11px] text-[#0db3dc] flex items-center gap-2 rounded-md border border-[#0b9ec4]/25 bg-[#0b9ec4]/10 px-3 py-1.5">
                  <ShieldCheck size={14} />
                  Trace-ready
                </span>
              </div>

              <svg viewBox="0 0 480 190" className="w-full h-[180px]">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <ellipse cx="240" cy="95" rx="180" ry="70" fill="rgba(11,158,196,0.04)" />
                <line x1="80" y1="95" x2="160" y2="70" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="80" y1="95" x2="160" y2="130" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="175" y1="70" x2="255" y2="50" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="175" y1="70" x2="255" y2="95" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="175" y1="130" x2="255" y2="95" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="175" y1="130" x2="255" y2="145" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="270" y1="50" x2="355" y2="70" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="270" y1="95" x2="355" y2="70" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="270" y1="95" x2="355" y2="120" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="270" y1="145" x2="355" y2="120" stroke="#1f3060" strokeWidth="1.5" />
                <line x1="370" y1="70" x2="430" y2="85" stroke="#0db3dc" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="370" y1="120" x2="430" y2="105" stroke="#0db3dc" strokeWidth="1.5" strokeDasharray="3 3" />

                {[
                  { cx: 80, cy: 95, rx: 52, ry: 22, fill: '#0d1e3a', stroke: '#1f3060', text: 'Regulatory Universe' },
                  { cx: 167, cy: 70, rx: 38, ry: 18, fill: '#0d1e3a', stroke: '#8b5cf6', text: 'Classification' },
                  { cx: 262, cy: 50, rx: 36, ry: 18, fill: '#0b1e36', stroke: '#0db3dc', text: 'SDLC Lane' },
                  { cx: 262, cy: 95, rx: 36, ry: 18, fill: '#0d1e3a', stroke: '#0db3dc', text: 'Lifecycle' },
                  { cx: 167, cy: 130, rx: 38, ry: 18, fill: '#0d1e3a', stroke: '#1f3060', text: 'Traceability' },
                  { cx: 262, cy: 145, rx: 36, ry: 18, fill: '#0d1e3a', stroke: '#10b981', text: 'Evidence' },
                  { cx: 362, cy: 70, rx: 34, ry: 17, fill: '#0d1e3a', stroke: '#f59e0b', text: 'Approvals' },
                  { cx: 362, cy: 120, rx: 36, ry: 17, fill: '#0d1e3a', stroke: '#f59e0b', text: 'Governance' },
                ].map((n) => (
                  <g key={n.text}>
                    <ellipse cx={n.cx} cy={n.cy} rx={n.rx} ry={n.ry} fill={n.fill} stroke={n.stroke} strokeWidth="1.5" />
                    <text
                      x={n.cx}
                      y={n.cy + 4}
                      textAnchor="middle"
                      fontSize="10"
                      fill="rgba(200,220,240,0.98)"
                      fontFamily="Inter,-apple-system,sans-serif"
                    >
                      {n.text}
                    </text>
                  </g>
                ))}

                <rect x="408" y="76" width="62" height="18" rx="4" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1" filter="url(#glow)" />
                <text x="439" y="89" textAnchor="middle" fontSize="9" fill="#10b981" fontFamily="Inter,-apple-system,sans-serif">
                  Submission-ready
                </text>

                <rect x="408" y="98" width="62" height="18" rx="4" fill="rgba(11,158,196,0.08)" stroke="#0db3dc" strokeWidth="1" />
                <text x="439" y="111" textAnchor="middle" fontSize="9" fill="#0db3dc" fontFamily="Inter,-apple-system,sans-serif">
                  Auditable proof
                </text>
              </svg>

              <div className="mt-3 flex flex-wrap gap-2">
                {['Regulatory Universe', 'Classification', 'SDLC Lane', 'Lifecycle', 'Evidence', 'Governance', 'Approvals', 'Traceability'].map((x) => (
                  <span key={x} className="rounded-lg border border-[#1f3060] bg-[#111e35]/40 px-4 py-1.5 text-[11px] leading-[14px] text-[#7090b0]">
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution / Outcomes blueprint */}
      <ProblemSolutionOutcomesBlueprint />

      {/* PILLARS */}
      <section className="rounded-2xl border border-[#1f3060] bg-[#080f1e] p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#3a5070] mb-3">From obligation to proof, without losing the chain</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PILLARS.map((p) => {
            const open = openPillar === p.key
            return (
              <div key={p.key} className={`group rounded-2xl border p-4 ${toneClass(p.tone)} border-opacity-100`} style={{ borderColor: TOKENS.border }}>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => setOpenPillar((cur) => (cur === p.key ? null : p.key))}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-xl border p-2 ${iconWrapClass(p.tone)}`}>
                        {p.icon}
                      </div>
                      <div>
                        <p className="text-[16px] font-semibold text-[#f0f6ff]">{p.title}</p>
                        <p className="mt-1 text-[13px] text-[#7090b0]">{p.tagline}</p>
                      </div>
                    </div>
                    <span className="mt-1 inline-flex items-center rounded-full border border-[#1f3060] bg-[#111e35]/40 px-3 py-1 text-[10px] text-[#0db3dc]">
                      View detail →
                    </span>
                  </div>

                  <div className="mt-3">{<MiniDiagram pillar={p.key} />}</div>
                  <p className="mt-2 text-[14px] leading-5 text-[#f0f6ff]">{p.oneLiner}</p>
                </button>

                <Collapse open={open}>
                  <div className="mt-3 space-y-2">
                    <div className="rounded-xl border border-[#1f3060] bg-[#111e35]/40 p-3">
                      <p className="text-[13px] font-semibold text-[#f0f6ff]">What</p>
                      <p className="mt-1 text-[14px] leading-6 text-[#7090b0]">{p.what}</p>
                    </div>
                    <div className="rounded-xl border border-[#1f3060] bg-[#111e35]/40 p-3">
                      <p className="text-[13px] font-semibold text-[#f0f6ff]">Why</p>
                      <p className="mt-1 text-[14px] leading-6 text-[#7090b0]">{p.why}</p>
                    </div>
                    <div className="rounded-xl border border-[#1f3060] bg-[#111e35]/40 p-3">
                      <p className="text-[13px] font-semibold text-[#f0f6ff]">How</p>
                      <p className="mt-1 text-[14px] leading-6 text-[#7090b0]">{p.how}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.expandChips.map((x) => (
                        <span key={x} className="rounded-full border border-[#1f3060] bg-[#111e35]/40 px-3 py-1 text-[11px] text-[#7090b0]">
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                </Collapse>
              </div>
            )
          })}
        </div>
      </section>

      {/* FLOW STRIP */}
      <div className="rounded-2xl border border-[#1f3060] bg-[#080f1e] p-4">
        <div className="flex items-center gap-3 flex-wrap">
          {[
            { label: 'Regulatory Universe', active: true },
            { label: 'Classification' },
            { label: 'SDLC Lane' },
            { label: 'Lifecycle' },
            { label: 'Evidence' },
            { label: 'Governance' },
            { label: 'Approvals' },
            { label: 'Traceability' },
          ].map((n, idx, arr) => (
            <div key={n.label} className="flex items-center gap-2">
              <span
                className={`whitespace-nowrap rounded-lg border px-3 py-2 text-[11px] font-semibold ${
                  n.active
                    ? 'border-[#0db3dc]/40 bg-[#0b9ec4]/10 text-[#0db3dc]'
                    : 'border-[#1f3060] bg-[#111e35]/20 text-[#7090b0]'
                }`}
              >
                {n.label}
              </span>
              {idx < arr.length - 1 ? <span className="text-[#2a3850] text-[16px]">→</span> : null}
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2 border-t border-[#162040] pt-3">
          {['Blueprint', 'Executable model', 'Submission-ready proof'].map((pill) => (
            <span
              key={pill}
              className={`rounded-full border px-4 py-1 text-[10px] ${
                pill === 'Submission-ready proof'
                  ? 'border-[#10b981]/40 bg-[#10b981]/10 text-[#10b981] font-semibold'
                  : 'border-[#1f3060] bg-[#111e35]/40 text-[#4a6580]'
              }`}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Outcomes + roles moved above into the 3-column executive narrative */}

      {/* CURRICULUM */}
      <section className="rounded-2xl border border-[#1f3060] bg-[#060c18] p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#3a5070]">The client-grade reading order</p>
            <h2 className="mt-2 text-[18px] font-semibold text-[#c0d8f0]">Follow the story your auditors expect.</h2>
            <p className="mt-2 text-[13px] text-[#3a5070]">obligations → decisions → controlled execution → evidence proof</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {curriculum.map((t) => (
            <div key={t.id}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`rounded-md border px-3 py-1 text-[9px] tracking-[0.12em] uppercase font-semibold ${
                    t.badgeTone === 'understand'
                      ? 'border-[#0b9ec4]/30 bg-[#0b9ec4]/10 text-[#0db3dc]'
                      : t.badgeTone === 'execute'
                        ? 'border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]'
                        : 'border-[#a855f7]/30 bg-[#a855f7]/10 text-[#a855f7]'
                  }`}
                >
                  {t.label}
                </span>
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#3a5070]">{t.description}</p>
              </div>

              <div className="grid gap-3">
                {t.chapters.map((c) => (
                  <Link key={c.num} to={c.to} className="w-full rounded-2xl border border-[#162040] bg-[#0c1828] p-4 hover:border-[#2a4070] transition">
                    <p className={`text-[11px] font-semibold ${c.num === '04' || c.num === '05' || c.num === '06' || c.num === '07' || c.num === '08' ? 'text-[#f59e0b]' : c.num === '09' || c.num === '10' ? 'text-[#a855f7]' : 'text-[#0db3dc]'}`}>
                      {c.num}
                    </p>
                    <p className="mt-2 text-[13px] font-semibold text-[#c0d8f0]">{c.title}</p>
                    <p className="mt-2 text-[11px] text-[#3a5070] leading-4">
                      {c.title === 'Regulatory Universe'
                        ? 'Map every obligation that can touch your products.'
                        : c.title === 'Classification Model'
                          ? 'Intended use + patient risk routes downstream rigor.'
                          : c.title === 'SDLC Lanes'
                            ? 'Four lanes from internal tools to high-risk SaMD.'
                            : c.title === 'Lifecycle Architecture'
                              ? 'Phase-by-phase gates, artifacts, and responsibilities.'
                              : c.title === 'Evidence Architecture'
                                ? 'Evidence binders organized by phase and gate.'
                                : c.title === 'Governance Model'
                                  ? 'Four layers of decisions that make approvals accountable.'
                                  : c.title === 'Approval Matrix'
                                    ? 'RACI for release gates, exceptions, and risk acceptance.'
                                    : c.title === 'Guardrails & Paved Roads'
                                      ? 'Pre-approved patterns that make compliance the fastest path.'
                                      : c.title === 'Traceability Studio'
                                        ? 'Connect risk → requirements → design → tests → release proof.'
                                        : 'Pre-mapped failure modes and mitigation patterns.'}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.for.map((f) => (
                        <span
                          key={`${c.num}-${f}`}
                          className={`inline-flex h-6 w-10 items-center justify-center rounded-md border bg-[#111e35]/40 ${
                            f === 'Engineering' ? 'border-[#f59e0b]/35' : 'border-[#0b9ec4]/35'
                          }`}
                          title={f}
                        >
                          {f === 'Engineering' ? (
                            <Route className="h-[18px] w-[18px] text-[#f59e0b]" strokeWidth={2.8} />
                          ) : (
                            <ShieldCheck className="h-[18px] w-[18px] text-[#0b9ec4]" strokeWidth={2.8} />
                          )}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

