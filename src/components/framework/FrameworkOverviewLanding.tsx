import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Route, Layers, Network, Binary, ChevronDown } from 'lucide-react'
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
  subtitle: string
  icon: React.ReactNode
  linkTo: string
  linkLabel: string
}

const PILLARS: Pillar[] = [
  { key: 'classification', title: 'Classification', subtitle: 'Intended use -> lane rigor', icon: <Binary className="h-5 w-5 text-[#14b8a6]" strokeWidth={2.25} />, linkTo: '/classification-model', linkLabel: 'View Classification Model ->' },
  { key: 'sdlc', title: 'SDLC Lanes', subtitle: 'Risk-calibrated rigor', icon: <Route className="h-5 w-5 text-[#3b82f6]" strokeWidth={2.25} />, linkTo: '/sdlc-lanes', linkLabel: 'View SDLC Lanes ->' },
  { key: 'governance', title: 'Governance', subtitle: 'Layered accountability', icon: <Layers className="h-5 w-5 text-[#a855f7]" strokeWidth={2.25} />, linkTo: '/governance-model', linkLabel: 'View Governance Model ->' },
  { key: 'traceability', title: 'Traceability', subtitle: 'Proof from regulation to release', icon: <Network className="h-5 w-5 text-[#fb7185]" strokeWidth={2.25} />, linkTo: '/traceability-studio', linkLabel: 'View Traceability Studio ->' },
]

type Chapter = {
  num: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  outputs: string[]
  to: string
}

type Persona = {
  key: string
  role: string
  tagline: string
  color: string
  pain: string
  gets: string[]
  chips: string[]
}

const CHAPTERS_BY_TRACK: Array<{
  id: string
  label: string
  badgeTone: 'understand' | 'execute' | 'prove'
  description: string
  chapters: Chapter[]
}> = [
  {
    id: 'track-understand',
    label: 'Understand',
    badgeTone: 'understand',
    description: "What you're operating in",
    chapters: [
      {
        num: '01',
        title: 'Regulatory Universe',
        subtitle: 'Map obligations by jurisdiction and context',
        description:
          'A structured inventory of every regulatory obligation that can apply to your software — by jurisdiction, product type, and context.',
        tags: ['IEC 62304', 'ISO 14971', '21 CFR Part 11', 'EU MDR', 'GAMP 5'],
        outputs: ['Obligation register by standard', 'Applicability matrix per product', 'Standard ↔ framework element mapping'],
        to: '/regulatory-universe',
      },
      {
        num: '02',
        title: 'Classification Model',
        subtitle: '8-dimension decision that routes everything downstream',
        description:
          "An 8-dimension assessment that determines the software's regulatory classification, IEC 62304 safety class, and SDLC lane. Everything downstream is conditional on this outcome.",
        tags: ['CD-1 to CD-8', 'Safety Class A/B/C', 'Lane Assignment'],
        outputs: ['Classification record (signed)', 'SDLC lane assignment', 'Evidence depth requirement'],
        to: '/classification-model',
      },
      {
        num: '03',
        title: 'SDLC Lanes',
        subtitle: 'Four lanes define control intensity and evidence depth',
        description:
          'Four lanes (A through D) defining process intensity, required controls, and evidence depth for each class of software.',
        tags: ['Lane A through D'],
        outputs: ['Lane-specific phase gates', 'Required controls per phase', 'Evidence binder requirements'],
        to: '/sdlc-lanes',
      },
    ],
  },
  {
    id: 'track-execute',
    label: 'Execute',
    badgeTone: 'execute',
    description: 'How you build and govern',
    chapters: [
      {
        num: '04',
        title: 'Lifecycle Architecture',
        subtitle: 'Phase gates and accountable progression model',
        description:
          'Seven phases P0–P6 from intake through post-market. Each phase has defined entry criteria, required activities, artifacts, and a signed gate before progression.',
        tags: ['P0–P6'],
        outputs: ['Gate checklist per phase', 'Artifact list per phase', 'RACI by phase + lane'],
        to: '/lifecycle-architecture',
      },
      {
        num: '05',
        title: 'Evidence Architecture',
        subtitle: '43 documents organized into 5 evidence binders',
        description:
          '43 evidence documents organized into 5 binders. Each tagged to a phase, gate, lane applicability, and standard requirement.',
        tags: ['43 Documents', '5 Binders', 'Core/Lane/Regulated tags'],
        outputs: ['Binder 1 Planning & Classification', 'Binder 2 Design & Architecture', 'Binder 3–5 Testing, Ops, Post-Market'],
        to: '/evidence-architecture',
      },
      {
        num: '06',
        title: 'Governance Model',
        subtitle: 'Decision layers, triggers, quorum, and escalation',
        description:
          'Four governance layers from sprint-level delivery controls to post-market quality review. Each layer has defined triggers, quorum, decision rights, and escalation paths.',
        tags: ['L1–L4'],
        outputs: ['Layer-specific triggers', 'Quorum and decision rights', 'Escalation path by layer'],
        to: '/governance-model',
      },
      {
        num: '07',
        title: 'Approval Matrix',
        subtitle: 'Role-based approvals by artifact, lane, and layer',
        description:
          'A structured matrix of approval requirements by artifact type, lane, and governance layer.',
        tags: ['Role-based approvals', 'Escalation rules', 'Lane-conditional'],
        outputs: ['Approval matrix by artifact', 'Escalation path green→amber→red', 'Role ↔ governance layer mapping'],
        to: '/approval-matrix',
      },
      {
        num: '08',
        title: 'Guardrails & Paved Roads',
        subtitle: 'Reusable controls inherited across delivery tracks',
        description:
          "Three execution tracks inject reusable controls across all seven phases. Teams inherit compliance — they don't reinvent it per project.",
        tags: ['Compliance Engineering', 'Security by Design', 'AI Guardrails'],
        outputs: ['Phase × track control matrix', 'Preventive/automated/human/detective', 'Starter kits per track'],
        to: '/guardrails-paved-roads',
      },
    ],
  },
  {
    id: 'track-prove',
    label: 'Prove',
    badgeTone: 'prove',
    description: 'How you demonstrate compliance',
    chapters: [
      {
        num: '09',
        title: 'Traceability Studio',
        subtitle: 'Live regulation-to-artifact coverage map',
        description:
          'A live traceability matrix showing regulation-to-artifact coverage. Surfaces orphaned items, missing links, and coverage gaps before auditors do.',
        tags: ['24 Regulations tracked', 'Coverage %', 'Gap detection'],
        outputs: ['Traceability chain per regulation', 'Coverage dashboard', 'Orphan and gap report'],
        to: '/traceability-studio',
      },
      {
        num: '10',
        title: 'Compliance Risk Hotspots',
        subtitle: 'Ranked failure modes across four domains',
        description:
          'A ranked register of known compliance failure modes across Process, Governance, Technical, and Operations domains.',
        tags: ['Process risks', 'Governance gaps', 'Technical debt', 'Ops failures'],
        outputs: ['Ranked hotspot table', 'Risk score + heat bar', 'Owner assignment + mitigation'],
        to: '/compliance-risk-hotspots',
      },
    ],
  },
]

const PERSONAS: Persona[] = [
  {
    key: 'engineering',
    role: 'Engineering',
    tagline: 'builds compliant software faster',
    color: '#3b82f6',
    pain: 'Handed a checklist at release and told to document everything retroactively. No clarity on what compliance requires during build.',
    gets: [
      'Exact controls and artifacts required per phase — no guessing',
      'Automated traceability starter kits so evidence generates as they build',
      'CI/CD-embedded guardrails that block violations before release',
    ],
    chips: ['Guardrails & Paved Roads', 'Lifecycle Architecture', 'SDLC Lanes'],
  },
  {
    key: 'quality',
    role: 'Quality',
    tagline: 'governs without being the bottleneck',
    color: '#f59e0b',
    pain: 'Manually chasing evidence, enforcing process through heroics, always the person who slows delivery down.',
    gets: [
      'Structured phase-gate outputs to review — not raw artifacts to assemble',
      'Clear governance layer (L1–L4) defining exactly when their sign-off is required',
      'Evidence binder already organized in audit-ready format',
    ],
    chips: ['Governance Model', 'Evidence Architecture', 'Approval Matrix'],
  },
  {
    key: 'ra',
    role: 'Regulatory Affairs',
    tagline: 'interprets standards into executable policy',
    color: '#8b5cf6',
    pain: 'Standards are interpreted inconsistently across teams. RA has to re-explain obligations on every project.',
    gets: [
      'A single authoritative mapping of standard → framework element, agreed once',
      'Traceability chain from regulation to artifact — ready to show inspectors',
      'Classification model that converts obligations into lane decisions consistently',
    ],
    chips: ['Regulatory Universe', 'Traceability Studio', 'Classification Model'],
  },
  {
    key: 'business',
    role: 'Business & Product',
    tagline: 'owns intended use without needing to be a standards expert',
    color: '#f43f5e',
    pain: 'No clear answer to "are we compliant?" or "what would it take to release this?" without consulting multiple specialists.',
    gets: [
      'Classification gives a definitive risk tier from product intent — no ambiguity',
      'Release readiness visible through phase gate status, not stakeholder opinion',
      'Compliance hotspots surfaced early — no late-stage surprises',
    ],
    chips: ['Classification Model', 'Compliance Risk Hotspots', 'Approval Matrix'],
  },
  {
    key: 'auditors',
    role: 'Auditors & Inspectors',
    tagline: 'follow a coherent story from obligation to proof',
    color: '#14b8a6',
    pain: 'Evidence is scattered, unlabelled, and assembled reactively. Hard to verify traceability or confirm standard mapping.',
    gets: [
      'Obligations → decisions → controlled execution → evidence — in one coherent arc',
      'Traceability chain already assembled, regulation-to-artifact',
      'Evidence binder organized exactly as expected — no reassembly required',
    ],
    chips: ['Evidence Architecture', 'Traceability Studio', 'Governance Model'],
  },
  {
    key: 'startups',
    role: 'MedTech & Digital Health Startups',
    tagline: 'avoid the regulatory wall 12 months in',
    color: '#22c55e',
    pain: 'Built something valuable, then hit a regulatory wall because nobody classified it at the start. Rework is expensive and morale-destroying.',
    gets: [
      'Classification at P0 routes the entire build correctly from day one',
      'Lane assignment sets proportionate controls — not over-engineered for Lane A, not under-prepared for Lane D',
      'Submission-ready evidence binder built as a byproduct of delivery',
    ],
    chips: ['Classification Model', 'SDLC Lanes', 'Evidence Architecture'],
  },
]

export function FrameworkOverviewLanding() {
  const [openPillars, setOpenPillars] = useState<Record<string, boolean>>({})
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({})
  const [openPersonas, setOpenPersonas] = useState<Record<string, boolean>>({})

  const toggleCard = (kind: 'pillar' | 'chapter' | 'persona', key: string) => {
    if (kind === 'pillar') {
      setOpenPillars((cur) => ({ ...cur, [key]: !cur[key] }))
      return
    }
    if (kind === 'persona') {
      setOpenPersonas((cur) => ({ ...cur, [key]: !cur[key] }))
      return
    }
    setOpenChapters((cur) => ({ ...cur, [key]: !cur[key] }))
  }

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

      {/* WHO THIS SERVES */}
      <section className="rounded-2xl border border-[#1f3060] bg-[#080f1e] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <p className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-[#64748b]">WHO THIS SERVES</p>
            <div className="h-px w-full bg-[#1e2d45]" />
          </div>
          <p className="shrink-0 text-[11px] text-[#4a6070]">Click any role to expand</p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {PERSONAS.map((persona) => {
            const open = !!openPersonas[persona.key]
            return (
              <div
                key={persona.key}
                className="w-full rounded-xl border bg-[#131929] p-4 transition-colors duration-200"
                style={{ borderColor: open ? '#6366f1' : '#1e2d45' }}
              >
                <button type="button" className="w-full text-left" onClick={() => toggleCard('persona', persona.key)}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: persona.color }} />
                      <div>
                        <p className="text-[15px] font-semibold text-white">{persona.role}</p>
                        <p className="mt-1 text-[12px] text-[#94a3b8]">{persona.tagline}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-200 ease-out"
                      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: open ? '#6366f1' : '#64748b' }}
                    />
                  </div>
                </button>

                <Collapse open={open}>
                  <div className="mt-3 rounded-xl border border-[#1e2d45] p-3" style={{ backgroundColor: 'rgba(11,15,26,0.4)' }}>
                    <div className="rounded-md border border-[#1e2d45] bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-[0.1em] text-[#f43f5e]">Current pain</p>
                      <p className="mt-1 text-[12px] leading-5 text-[#cbd5e1]">{persona.pain}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">What they get</p>
                      <ul className="mt-2 space-y-1.5 text-[12px] text-[#cbd5e1]">
                        {persona.gets.map((item) => (
                          <li key={`${persona.key}-${item}`} className="flex items-start gap-2">
                            <span className="mt-[7px] h-[5px] w-[5px] rounded-full" style={{ backgroundColor: persona.color }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {persona.chips.map((chip) => (
                        <span key={`${persona.key}-chip-${chip}`} className="rounded-full border border-[#1e2d45] bg-[#0b0f1a]/40 px-2.5 py-1 text-[10px] text-[#94a3b8]">
                          {chip}
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

      {/* PILLARS */}
      <section className="rounded-2xl border border-[#1f3060] bg-[#080f1e] p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#3a5070]">From obligation to proof, without losing the chain</p>
          <p className="text-[11px] text-[#4a6070]">Click any pillar to expand</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PILLARS.map((p) => {
            const open = !!openPillars[p.key]
            return (
              <div
                key={p.key}
                className="group rounded-2xl border p-4 transition-colors duration-200"
                style={{ borderColor: open ? '#6366f1' : '#1e2d45', backgroundColor: '#131929' }}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => toggleCard('pillar', p.key)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#1e2d45] bg-[#0b0f1a]/40 p-2">
                        {p.icon}
                      </div>
                      <div>
                        <p className="text-[16px] font-semibold text-[#f0f6ff]">{p.title}</p>
                        <p className="mt-1 text-[13px] text-[#7090b0]">{p.subtitle}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className="mt-1 h-4 w-4 transition-transform duration-200 ease-out"
                      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: open ? '#6366f1' : '#64748b' }}
                    />
                  </div>
                </button>

                <Collapse open={open}>
                  <div className="mt-3 rounded-xl border border-[#1e2d45] p-3" style={{ backgroundColor: 'rgba(11,15,26,0.4)' }}>
                    {p.key === 'classification' && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">8 Classification Dimensions</p>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] text-[#cbd5e1]">
                            <li>CD-1 Deployment Context</li>
                            <li>CD-2 Clinical Criticality</li>
                            <li>CD-3 Intended Use</li>
                            <li>CD-4–CD-8 Risk/GxP/data sensitivity/AI/market</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">Outputs</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {['SDLC Lane A/B/C/D', 'IEC 62304 Safety Class', 'Evidence depth'].map((chip) => (
                              <span key={chip} className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] text-indigo-200">{chip}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {p.key === 'sdlc' && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">4 Lanes</p>
                          <ul className="mt-2 space-y-1.5 text-[13px] text-[#cbd5e1]">
                            {[
                              ['#64748b', 'Lane A (slate) Non-Regulated'],
                              ['#3b82f6', 'Lane B (blue) GxP/GAMP 5/21 CFR Part 11'],
                              ['#14b8a6', 'Lane C (teal) Lab workflow/LIMS'],
                              ['#8b5cf6', 'Lane D (violet) SaMD/IEC 62304 Class C/MDR/FDA'],
                            ].map(([c, text]) => (
                              <li key={text} className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c }} />
                                {text}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">Each lane defines</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {['Phase gates required', 'Evidence binders', 'Approval depth', 'Governance layer'].map((chip) => (
                              <span key={chip} className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] text-indigo-200">{chip}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {p.key === 'governance' && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">4 Governance Layers</p>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] text-[#cbd5e1]">
                            <li>L1 Delivery Governance (sprint-level automated gates)</li>
                            <li>L2 Compliance &amp; Design Review (milestone sign-offs)</li>
                            <li>L3 Change Control Board (regulated changes, major releases)</li>
                            <li>L4 Post-Market Quality Review (surveillance, CAPA, FSN)</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">Owned by</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {['Engineering', 'Quality', 'Regulatory Affairs', 'System Owner'].map((chip) => (
                              <span key={chip} className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] text-indigo-200">{chip}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {p.key === 'traceability' && (
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">Chain links</p>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] text-[#cbd5e1]">
                            <li>Regulation → Requirement → Risk Item</li>
                            <li>Risk Item → Design Decision → Test Case</li>
                            <li>Test Case → Approval → Artifact</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">Coverage metrics</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {['Regulation coverage %', 'Orphaned items', 'Missing links', 'Audit readiness'].map((chip) => (
                              <span key={chip} className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2.5 py-1 text-[11px] text-indigo-200">{chip}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-3">
                      <Link to={p.linkTo} className="inline-flex rounded-full border border-indigo-400/35 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-200">
                        {p.linkLabel}
                      </Link>
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
          <p className="text-[11px] text-[#4a6070]">Click any chapter to expand</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {CHAPTERS_BY_TRACK.map((t) => (
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
                  <div
                    key={c.num}
                    className="w-full rounded-2xl border bg-[#131929] p-4 transition-colors duration-200"
                    style={{ borderColor: openChapters[c.num] ? '#6366f1' : '#1e2d45' }}
                  >
                    <button type="button" className="w-full text-left" onClick={() => toggleCard('chapter', c.num)}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span
                            className={`inline-flex h-7 min-w-7 items-center justify-center rounded-md border px-2 font-mono text-[11px] font-semibold ${
                              t.badgeTone === 'understand'
                                ? 'border-[#3b82f6]/35 bg-[#3b82f6]/10 text-[#60a5fa]'
                                : t.badgeTone === 'execute'
                                  ? 'border-[#f59e0b]/35 bg-[#f59e0b]/10 text-[#f59e0b]'
                                  : 'border-[#a855f7]/35 bg-[#a855f7]/10 text-[#a855f7]'
                            }`}
                          >
                            {c.num}
                          </span>
                          <div>
                            <p className="text-[13px] font-semibold text-[#c0d8f0]">{c.title}</p>
                            <p className="mt-1 text-[11px] text-[#64748b]">{c.subtitle}</p>
                          </div>
                        </div>
                        <ChevronDown
                          className="h-4 w-4 transition-transform duration-200 ease-out"
                          style={{ transform: openChapters[c.num] ? 'rotate(180deg)' : 'rotate(0deg)', color: openChapters[c.num] ? '#6366f1' : '#64748b' }}
                        />
                      </div>
                    </button>

                    <Collapse open={!!openChapters[c.num]}>
                      <div className="mt-3 rounded-xl border border-[#1e2d45] p-3" style={{ backgroundColor: 'rgba(11,15,26,0.4)' }}>
                        <p className="text-[12px] leading-5 text-[#94a3b8]">{c.description}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {c.tags.map((tag) => (
                            <span key={`${c.num}-${tag}`} className="rounded-full border border-[#1e2d45] bg-[#0b0f1a]/40 px-2.5 py-1 text-[10px] text-[#94a3b8]">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3">
                          <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">Key outputs</p>
                          <ul className="mt-2 space-y-1.5 text-[12px] text-[#cbd5e1]">
                            {c.outputs.map((output) => (
                              <li key={`${c.num}-out-${output}`} className="flex items-center gap-2">
                                <span className="h-[5px] w-[5px] rounded-full bg-[#10b981]" />
                                {output}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-3">
                          <Link to={c.to} className="inline-flex rounded-full border border-indigo-400/35 bg-indigo-500/10 px-3 py-1 text-[11px] font-medium text-indigo-200">
                            Open chapter →
                          </Link>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

