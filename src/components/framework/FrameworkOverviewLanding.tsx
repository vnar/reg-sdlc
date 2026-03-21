import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Route, Layers, Network, Binary, ChevronDown } from 'lucide-react'
import ProblemSolutionOutcomesBlueprint from './ProblemSolutionOutcomesBlueprint'
import { RELEASE_COMMITS, RELEASE_META } from '../../data/releaseMeta'

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

type ChangelogTab = 'changelog' | 'philosophy' | 'regulations'

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

const CHANGELOG_ENTRIES = RELEASE_COMMITS.map((entry, idx) => ({
  version: idx === 0 ? RELEASE_META.version : 'Commit',
  date: entry.date,
  commit: entry.commit,
  current: entry.current,
  items: [{ type: 'COMMIT', text: entry.message }],
}))

const REGULATION_ROWS = [
  ['IEC 62304:2015+AMD1', 'Core', 'Global', 'Defines SDLC process requirements for medical device software — primary structural basis for Lane C/D lifecycle phases and evidence requirements'],
  ['ISO 14971:2019', 'Safety', 'Global', 'Risk management throughout the lifecycle — basis for FMEA structure, risk acceptance criteria, and post-market risk monitoring requirements'],
  ['EU MDR 2017/745', 'Core', 'EU', 'Device classification, GSPR obligations, Technical File structure, post-market surveillance (Article 83) and PSUR (Article 86) requirements'],
  ['FDA 21 CFR Part 820', 'Core', 'US', 'Design control requirements — basis for Design History File structure and phase gate approval requirements in Lane D'],
  ['21 CFR Part 11', 'Quality', 'US', 'Electronic records and signatures — drives ART-020 assessment requirements and audit trail verification obligations across Lanes B–D'],
  ['GAMP 5 (2nd Ed.)', 'Quality', 'Global', 'Computer system validation approach — basis for Lane B IQ/OQ/PQ structure, GAMP category classification, and supplier qualification requirements'],
  ['FDA AI/ML SaMD Action Plan', 'AI', 'US', 'Predetermined change control plan concept — drives AI/ML model assessment requirements and change significance classifier design in UC-01'],
  ['NIST AI RMF', 'AI', 'US', 'AI risk management framework — maps to AI Guardrails track in Guardrails & Paved Roads; basis for AI/ML Model Assessment (ART-009)'],
  ['EU AI Act (2024)', 'AI', 'EU', 'High-risk AI system requirements — incorporated into UC-04 dual-compliance model and Classification Model CD-1/CD-2 scoring for AI-enabled products'],
  ['FDA Cybersecurity Guidance 2023', 'Safety', 'US', 'SBOM requirements and cybersecurity lifecycle obligations — basis for ART-007 Cybersecurity Risk Assessment and UC-07 automation model'],
  ['GDPR / 45 CFR Part 164', 'Privacy', 'EU / US', 'Privacy by design obligations — drives ART-013 DPIA requirements and data handling controls in Lane B–D evidence requirements'],
  ['ISO 13485:2016', 'Quality', 'Global', 'QMS requirements for medical device organizations — informs governance model role definitions and approval authority structure'],
] as const

export function FrameworkOverviewLanding() {
  const [openPillars, setOpenPillars] = useState<Record<string, boolean>>({})
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({})
  const [openPersonas, setOpenPersonas] = useState<Record<string, boolean>>({})
  const [changelogOpen, setChangelogOpen] = useState(false)
  const [activeChangelogTab, setActiveChangelogTab] = useState<ChangelogTab>('changelog')

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

  const openChangelogModal = () => setChangelogOpen(true)
  const closeChangelogModal = () => setChangelogOpen(false)
  const switchChangelogTab = (name: ChangelogTab) => setActiveChangelogTab(name)

  useEffect(() => {
    if (!changelogOpen) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChangelogModal()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [changelogOpen])

  const changeTagClass = (type: string) => {
    if (type === 'NEW') return 'chmodal-tag chmodal-tag-new'
    if (type === 'UPDATE') return 'chmodal-tag chmodal-tag-update'
    if (type === 'FIX') return 'chmodal-tag chmodal-tag-fix'
    return 'chmodal-tag chmodal-tag-content'
  }

  const categoryClass = (category: string) => {
    if (category === 'Core') return 'chmodal-cat chmodal-cat-core'
    if (category === 'Safety') return 'chmodal-cat chmodal-cat-safety'
    if (category === 'Quality') return 'chmodal-cat chmodal-cat-quality'
    if (category === 'AI') return 'chmodal-cat chmodal-cat-ai'
    return 'chmodal-cat chmodal-cat-privacy'
  }

  return (
    <div className="space-y-5 pb-4">
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
          minHeight: 330,
        }}
      >
        <div className="px-6 pt-6 lg:px-8">
          <p className="text-[10px] uppercase tracking-[0.32em] text-[#4a6fa0]">CODEX · FRAMEWORK ATLAS</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-[#f0f6ff] lg:text-[48px]">
            Regulated Software <span style={{ color: TOKENS.teal }}>Compliance</span> Framework
          </h1>
        </div>

        <div className="grid min-h-[250px] grid-cols-1 items-start gap-6 px-6 pb-8 pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-8 lg:pb-8">
          <div>
            <p className="max-w-[640px] text-[14px] leading-7 text-[#6080a0]">
              The foundation for building, validating, and operating software in a regulated healthcare environment. A consulting-grade reference architecture linking obligations, lifecycle rigor, governance, and traceable evidence.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {['Accountable', 'Executable', 'Traceable by design'].map((t) => (
                <span key={t} className="rounded-full border border-[#1f3060] bg-[#111e35]/40 px-4 py-1 text-[11px] font-medium text-[#7090b0]">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 max-w-[640px] rounded-xl border border-[#0b9ec4]/20 bg-[#0b9ec4]/5 px-4 py-4">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#0db3dc]">Core principle</p>
              <p className="mt-2 text-[14px] leading-6 text-[#c8dcf0]">
                Regulations define obligations. Standards define the lifecycle. Governance makes it work in the real world.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="framework-hero-blueprint-card w-full max-w-[540px] rounded-2xl border border-[#1f3060] bg-[#0a1428]/70 p-5 backdrop-blur">
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
                <line x1="370" y1="70" x2="408" y2="76" stroke="#0db3dc" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="370" y1="120" x2="408" y2="112" stroke="#0db3dc" strokeWidth="1.5" strokeDasharray="3 3" />

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

                <rect x="406" y="62" width="74" height="30" rx="7" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1.2" filter="url(#glow)" />
                <text x="443" y="79" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6ee7b7" fontFamily="Inter,-apple-system,sans-serif">
                  Submission-
                </text>
                <text x="443" y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6ee7b7" fontFamily="Inter,-apple-system,sans-serif">
                  Ready
                </text>

                <rect x="406" y="98" width="74" height="30" rx="7" fill="rgba(11,158,196,0.12)" stroke="#0db3dc" strokeWidth="1.2" />
                <text x="443" y="114" textAnchor="middle" fontSize="11" fontWeight="700" fill="#67e8f9" fontFamily="Inter,-apple-system,sans-serif">
                  Auditable
                </text>
                <text x="443" y="125" textAnchor="middle" fontSize="11" fontWeight="700" fill="#67e8f9" fontFamily="Inter,-apple-system,sans-serif">
                  Proof
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
            <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9db6d2]">WHO THIS SERVES</p>
            <div className="h-px w-full bg-[#1e2d45]" />
          </div>
          <p className="shrink-0 text-[12px] text-[#7f97b2]">Click any role to expand</p>
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
                        <p className="text-[16px] font-semibold text-white">{persona.role}</p>
                        <p className="mt-1 text-[13px] text-[#a8bdd3]">{persona.tagline}</p>
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
                      <p className="mt-1 text-[13px] leading-6 text-[#d6e2ef]">{persona.pain}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-[10px] uppercase tracking-[0.1em] text-[#64748b]">What they get</p>
                      <ul className="mt-2 space-y-1.5 text-[13px] text-[#d6e2ef]">
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
      <section className="rounded-2xl border border-[#1f3060] bg-gradient-to-b from-[#091325] to-[#080f1e] p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8fb4de]">From obligation to proof, without losing the chain</p>
          <p className="text-[11px] text-[#6f87a7]">Click any pillar to expand</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => {
            const open = !!openPillars[p.key]
            return (
              <div
                key={p.key}
                className="group rounded-2xl border p-4 transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  borderColor: open ? '#6366f1' : '#1e2d45',
                  backgroundColor: open ? 'rgba(31,41,70,0.95)' : '#131929',
                  boxShadow: open ? '0 0 0 1px rgba(99,102,241,0.28), 0 10px 28px rgba(59,130,246,0.12)' : 'none',
                }}
              >
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => toggleCard('pillar', p.key)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border p-2"
                        style={{
                          borderColor: open ? 'rgba(99,102,241,0.45)' : '#1e2d45',
                          backgroundColor: open ? 'rgba(99,102,241,0.12)' : 'rgba(11,15,26,0.4)',
                        }}
                      >
                        {p.icon}
                      </div>
                      <div>
                        <p className="text-[16px] font-semibold text-[#f0f6ff]">{p.title}</p>
                        <p className="mt-1 text-[13px] text-[#89a5c6]">{p.subtitle}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className="mt-1 h-4 w-4 transition-transform duration-200 ease-out"
                      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: open ? '#6366f1' : '#64748b' }}
                    />
                  </div>
                </button>

                <Collapse open={open}>
                  <div className="mt-3 rounded-xl border border-[#25365a] p-3" style={{ backgroundColor: 'rgba(9,13,24,0.55)' }}>
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

      {/* CURRICULUM */}
      <section className="rounded-2xl border border-[#1f3060] bg-[#060c18] p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#3a5070]">The client-grade reading order</p>
            <h2 className="mt-2 text-[18px] font-semibold text-[#c0d8f0]">Follow the story your auditors expect.</h2>
            <p className="mt-2 text-[13px] font-medium text-[#7da2c6]">obligations → decisions → controlled execution → evidence proof</p>
          </div>
          <p className="text-[11px] text-[#4a6070]">Click any chapter to expand</p>
        </div>

        <div className="mb-6 rounded-2xl border border-[#1f3060] bg-[#080f1e] p-4">
            <div className="framework-reading-order-flow flex items-center gap-3 flex-wrap">
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
                  className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-2 text-[11px] font-semibold ${
                    n.active
                      ? 'border-[#0db3dc]/40 bg-[#0b9ec4]/10 text-[#0db3dc]'
                      : 'border-[#1f3060] bg-[#111e35]/20 text-[#7090b0]'
                  }`}
                >
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-md border px-1 text-[9px] font-bold tracking-wide ${
                      n.active ? 'border-[#0db3dc]/50 bg-[#0b9ec4]/20 text-[#67e8f9]' : 'border-[#2b3d5f] bg-[#0f1b30] text-[#8fa7c0]'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {n.label}
                </span>
                {idx < arr.length - 1 ? <span className="text-[#35507a] text-[16px]">→</span> : null}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5 border-t border-[#1b2a46] pt-3">
            {[
              { label: 'Blueprint', tone: 'base' as const },
              { label: 'Executable model', tone: 'base' as const },
              { label: 'Auditable proof', tone: 'accent' as const },
              { label: 'Submission-ready proof', tone: 'accent' as const },
            ].map((pill) => (
              <span
                key={pill.label}
                className={`inline-flex min-h-7 items-center rounded-full border px-3 py-1 text-[10px] leading-none ${
                  pill.tone === 'accent'
                    ? 'border-[#10b981]/50 bg-[#10b981]/16 text-[#6ee7b7] font-semibold'
                    : 'border-[#2a3f64] bg-[#111e35]/50 text-[#88a1bc] font-medium'
                }`}
              >
                {pill.label}
              </span>
            ))}
          </div>
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

      <div
        className="cl-footer-bar"
        role="button"
        tabIndex={0}
        onClick={openChangelogModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openChangelogModal()
        }}
      >
        <div className="cl-row cl-row-top">
          <span className="cl-pulse-dot" />
          <span className="cl-version-badge">{RELEASE_META.version}</span>
          <span className="cl-sep" />
          <span className="cl-commit-badge">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 6a3 3 0 1 0 0 6h3.5a3.5 3.5 0 0 1 7 0h1.5v-2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 0 0 0 6h3v-2H7a1 1 0 1 1 0-2h3.5a3.5 3.5 0 0 1 7 0H19v2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 1 0 0 6h3v-2H7a1 1 0 1 1 0-2h3.5a3.5 3.5 0 0 1 7 0H19v-2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 1 0 0 6h3v-2H7a1 1 0 1 1 0-2h3.5a3.5 3.5 0 0 1 7 0H19v-2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 1 0 0 6h3v-2H7a1 1 0 1 1 0-2h3.5a3.5 3.5 0 0 1 7 0H19v-2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 1 0 0 6h3" />
            </svg>
            {RELEASE_META.latestCommit}
          </span>
        </div>
        <div className="cl-row cl-row-bottom">
          <a
            className="cl-repo"
            href={RELEASE_META.repoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17 9V7a5 5 0 0 0-10 0v2H5v11h14V9h-2zm-8 0V7a3 3 0 0 1 6 0v2H9z" />
            </svg>
            {RELEASE_META.repoLabel}
            <span className="cl-private-pill">private</span>
          </a>
          <span className="cl-sep" />
          <a
            className="cl-author-link"
            href={RELEASE_META.authorUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {RELEASE_META.authorName}
          </a>
          <span className="cl-sep" />
          <span className="cl-hint cl-hint-inline">
            View changelog &amp; principles
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 4l4 4H4l4-4z" />
            </svg>
          </span>
        </div>
      </div>

      <div id="changelogModal" className={`chmodal-overlay ${changelogOpen ? 'open' : ''}`} onClick={(e) => (e.target === e.currentTarget ? closeChangelogModal() : null)}>
        <div className="chmodal-panel">
          <header className="chmodal-header">
            <div className="chmodal-header-left">
              <h2>Codex — Framework Changelog &amp; Principles</h2>
              <p>Version history, regulatory basis, and design philosophy for the Codex framework</p>
              <div className="chmodal-meta">
                <span className="cl-version-badge">{RELEASE_META.version}</span>
                <span className="cl-commit-badge">{RELEASE_META.latestCommit}</span>
                <span className="chmodal-current-pill">● Current</span>
              </div>
            </div>
            <button type="button" className="chmodal-close-btn" onClick={closeChangelogModal} aria-label="Close changelog modal">
              ×
            </button>
          </header>

          <div className="chmodal-tabs">
            <button type="button" className={`chmodal-tab ${activeChangelogTab === 'changelog' ? 'active' : ''}`} onClick={() => switchChangelogTab('changelog')}>
              Changelog
            </button>
            <button type="button" className={`chmodal-tab ${activeChangelogTab === 'philosophy' ? 'active' : ''}`} onClick={() => switchChangelogTab('philosophy')}>
              Philosophy &amp; Principles
            </button>
            <button type="button" className={`chmodal-tab ${activeChangelogTab === 'regulations' ? 'active' : ''}`} onClick={() => switchChangelogTab('regulations')}>
              Regulations Considered
            </button>
          </div>

          <div className="chmodal-body">
            <section id="chtab-changelog" className={`chmodal-tab-panel ${activeChangelogTab === 'changelog' ? 'active' : ''}`}>
              <div className="chmodal-timeline">
                {CHANGELOG_ENTRIES.map((entry, idx) => (
                  <div key={entry.commit} className="chmodal-tl-entry">
                    <div className="chmodal-tl-left">
                      <span className={`chmodal-tl-dot ${entry.current ? 'current' : ''}`} />
                      {idx < CHANGELOG_ENTRIES.length - 1 ? <span className="chmodal-tl-line" /> : null}
                    </div>
                    <div className="chmodal-tl-content">
                      <div className="chmodal-entry-head">
                        <h3>{entry.version}</h3>
                        <span>{entry.date}</span>
                        <span className="cl-commit-badge">{entry.commit}</span>
                        {entry.current ? <span className="chmodal-current-pill">Current</span> : null}
                      </div>
                      <ul className="chmodal-entry-list">
                        {entry.items.map((item) => (
                          <li key={item.text}>
                            <span className={changeTagClass(item.type)}>{item.type}</span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="chtab-philosophy" className={`chmodal-tab-panel ${activeChangelogTab === 'philosophy' ? 'active' : ''}`}>
              <div className="chmodal-section-head">
                <span>Why this framework exists</span>
                <div />
              </div>
              <p className="chmodal-copy">
                Regulated software teams consistently fail not because they lack smart people or good intentions — they fail because they lack a coherent operating model. Regulatory obligations are
                scattered across standards that don't talk to each other. SDLC practices from engineering don't map to evidence expectations from QA. Governance decisions are made informally and
                undocumented. Evidence is assembled retroactively. This framework exists to close that gap — to give teams one place where obligation, lifecycle, governance, and evidence connect
                into a single, navigable system.
              </p>

              <div className="chmodal-section-head">
                <span>Core design principles</span>
                <div />
              </div>
              <div className="chmodal-principles">
                {[
                  ['01', 'Obligation-first, not standard-first', 'Most frameworks start with a standard (IEC 62304) and work forward. This one starts with the obligation — what does the regulator actually need to see — and works backward to which standard creates that obligation and which artifact satisfies it. That shift changes everything about how teams prioritize effort.'],
                  ['02', 'Classification determines everything else', 'Lane assignment is not a compliance checkbox. It is the single decision that dictates every process requirement, evidence expectation, and approval authority for a product. Getting classification right at the start eliminates the most common and most expensive compliance failure: discovering at validation that the product required more than was built for.'],
                  ['03', 'Evidence is designed, not gathered', 'Teams that treat evidence as something to collect before an audit consistently fail audits. Evidence must be designed into the development process — artifact triggers defined, traceability built in from day one, approval authorities established before work begins. This framework makes evidence production a natural output of doing the work, not a parallel effort.'],
                  ['04', 'Governance is accountability, not bureaucracy', 'Governance layers L1–L4 are not designed to slow teams down. They are designed to make clear, at every level, who is accountable for what. When accountability is ambiguous, decisions get deferred, documents get orphaned, and audit findings get made. The L1–L4 model makes accountability explicit without adding process overhead.'],
                  ['05', 'AI accelerates compliance — it does not replace judgment', 'Every AI capability in this framework is positioned as an accelerant for surveillance, linking, drafting, and detection — the high-volume, rule-based work. Approvals, risk acceptance decisions, and regulatory submissions require human accountability. The framework draws that line clearly and will not move it.'],
                ].map(([num, title, body]) => (
                  <article key={num} className="chmodal-principle-card">
                    <span className="chmodal-principle-num">{num}</span>
                    <div>
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="chtab-regulations" className={`chmodal-tab-panel ${activeChangelogTab === 'regulations' ? 'active' : ''}`}>
              <p className="chmodal-copy-sm">
                The following regulations, standards, and guidance documents were reviewed and considered in the design of this framework. Inclusion indicates that the framework's structure, lane
                definitions, evidence requirements, and governance model are designed to satisfy the obligations these documents create.
              </p>
              <div className="chmodal-table-wrap">
                <table className="chmodal-table">
                  <thead>
                    <tr>
                      <th>Standard / Regulation</th>
                      <th>Category</th>
                      <th>Jurisdiction</th>
                      <th>How it shaped the framework</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REGULATION_ROWS.map(([standard, category, jurisdiction, impact]) => (
                      <tr key={standard}>
                        <td className="chmodal-standard-name">{standard}</td>
                        <td>
                          <span className={categoryClass(category)}>{category}</span>
                        </td>
                        <td>{jurisdiction}</td>
                        <td>{impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

