import { useMemo, useEffect, useState } from 'react'
import { Card, SectionTitle } from '../ui'

type Risk = 'na' | 'low' | 'medium' | 'high'

type AssessmentOption = {
  label: string
  sub: string
  risk: Risk
}

type AssessmentDimension = {
  id: string
  /** Full title in the assessment list */
  title: string
  /** Single short line for the radar chart only (avoids overlap / center bleed) */
  radarLabel: string
  question: string
  collapsedDescription: string
  determines: string
  options: AssessmentOption[]
}

const DIMENSIONS: AssessmentDimension[] = [
  {
    id: 'CD-1',
    title: 'Intended Use',
    radarLabel: 'Intended use',
    question: 'Is this software intended to diagnose, treat, cure, mitigate, or prevent a disease or condition?',
    collapsedDescription: 'Is this software intended to diagnose, treat, monitor, or support clinical decision-making for patients?',
    determines: 'SaMD classification and FDA/MDR applicability',
    options: [
      { label: 'Clinical decision support', sub: 'Directly informs clinical decisions', risk: 'high' },
      { label: 'Administrative / operational', sub: 'Scheduling, billing, workflow', risk: 'low' },
      { label: 'Developer / engineering tool', sub: 'Code, infrastructure, internal tooling', risk: 'na' },
      { label: 'Research only', sub: 'Not used in production care', risk: 'low' },
    ],
  },
  {
    id: 'CD-2',
    title: 'Regulated Output Impact',
    radarLabel: 'Reg. output impact',
    question: 'Does the software output directly drive or influence a regulated decision?',
    collapsedDescription: 'Does the software output directly drive or influence a clinical action, lab result, or device behavior?',
    determines: 'IEC 62304 safety class (A, B, or C)',
    options: [
      { label: 'Drives clinical action', sub: 'Output triggers treatment or diagnosis', risk: 'high' },
      { label: 'Informs clinician', sub: 'Clinician makes the final call', risk: 'medium' },
      { label: 'No clinical output', sub: 'Operational or administrative only', risk: 'low' },
      { label: 'Code / data only', sub: 'Output is non-clinical', risk: 'na' },
    ],
  },
  {
    id: 'CD-3',
    title: 'Device / Lab / Non-device determination',
    radarLabel: 'Device / lab role',
    question: 'Is this software embedded in, controlling, or part of a physical device or lab instrument?',
    collapsedDescription: 'Is the software embedded in a device, standalone SaMD, a lab system, or purely enterprise-facing?',
    determines: 'Lane C vs Lane D assignment',
    options: [
      { label: 'Embedded in device', sub: 'Controls or runs on medical hardware', risk: 'high' },
      { label: 'Standalone, connected to device', sub: "Interfaces with but doesn't control", risk: 'medium' },
      { label: 'Standalone non-device', sub: 'No hardware dependency', risk: 'low' },
      { label: 'Not applicable', sub: 'Lab informatics / non-clinical', risk: 'na' },
    ],
  },
  {
    id: 'CD-4',
    title: 'Data and Privacy classification',
    radarLabel: 'Data & privacy',
    question: 'What category of data does this software process or store?',
    collapsedDescription: 'Does the software process, store, or transmit PHI, PII, or regulated health data?',
    determines: '21 CFR Part 11 applicability and audit trail requirements',
    options: [
      { label: 'PHI / PII', sub: 'Protected health or personal identity data', risk: 'high' },
      { label: 'De-identified health data', sub: 'No direct patient identifiers', risk: 'medium' },
      { label: 'Code / IP only', sub: 'No personal or health data', risk: 'low' },
      { label: 'No sensitive data', sub: 'Fully anonymised or synthetic', risk: 'na' },
    ],
  },
  {
    id: 'CD-5',
    title: 'Cybersecurity Relevance',
    radarLabel: 'Cybersecurity',
    question: 'Does the software have network connectivity, external APIs, or access to sensitive systems?',
    collapsedDescription: 'Does the software have network connectivity, external interfaces, or access to clinical infrastructure?',
    determines: 'Security controls tier and threat modelling requirement',
    options: [
      { label: 'Internet-connected + sensitive data', sub: 'External exposure with PII/PHI', risk: 'high' },
      { label: 'Internal network only', sub: 'Behind firewall, no external APIs', risk: 'medium' },
      { label: 'Air-gapped', sub: 'Fully isolated from networks', risk: 'low' },
      { label: 'No connectivity', sub: 'Offline, standalone', risk: 'na' },
    ],
  },
  {
    id: 'CD-6',
    title: 'Electronic Records / Signatures',
    radarLabel: 'E-records / e-sign',
    question: 'Does this software create or manage records subject to 21 CFR Part 11 or equivalent?',
    collapsedDescription: 'Are electronic records or signatures used in regulated workflows such as approvals, batch records, or audit trails?',
    determines: '21 CFR Part 11 compliance obligations',
    options: [
      { label: 'Full Part 11 scope', sub: 'Electronic records + signatures required', risk: 'high' },
      { label: 'Partial (audit trails only)', sub: 'Logging required, no e-sig', risk: 'medium' },
      { label: 'Not applicable', sub: 'No regulated record obligations', risk: 'na' },
      { label: 'Under review', sub: 'Applicability not yet determined', risk: 'medium' },
    ],
  },
  {
    id: 'CD-7',
    title: 'Market / Geography',
    radarLabel: 'Market / region',
    question: 'In which markets will this software be distributed or used?',
    collapsedDescription: 'What markets will this software be placed in — US (FDA), EU (MDR/IVDR), or both?',
    determines: 'Regulatory submission pathway and applicable standards set',
    options: [
      { label: 'US + EU (global)', sub: 'FDA + MDR/IVDR + other bodies', risk: 'high' },
      { label: 'US only', sub: 'FDA applicability', risk: 'medium' },
      { label: 'EU only', sub: 'MDR / IVDR applicability', risk: 'medium' },
      { label: 'Internal / no distribution', sub: 'No market submission required', risk: 'na' },
    ],
  },
  {
    id: 'CD-8',
    title: 'Software Safety Class',
    radarLabel: 'Safety class',
    question: 'What is the consequence of a software failure on patient or user safety?',
    collapsedDescription: 'Based on the above, what is the consequence of a software failure to the patient or user?',
    determines: 'Final IEC 62304 class assignment (A = no injury, B = non-serious, C = serious/death)',
    options: [
      { label: 'Class C — Serious injury or death', sub: 'IEC 62304 highest rigor', risk: 'high' },
      { label: 'Class B — Non-serious injury', sub: 'Moderate lifecycle requirements', risk: 'medium' },
      { label: 'Class A — No injury possible', sub: 'Minimal lifecycle requirements', risk: 'low' },
      { label: 'Non-medical software', sub: 'IEC 62304 not applicable', risk: 'na' },
    ],
  },
]

/** Slash-separated titles → lines for hover / print only (not used on radar SVG). */
function slashTitleParts(title: string): string[] {
  const normalized = title.replace(/[／∕]/g, '/')
  const parts = normalized.split(/\s*\/\s*/g).filter(Boolean)
  return parts.length ? parts : [title]
}

const RISK_SCORE: Record<Risk, number> = { na: 0, low: 1, medium: 2, high: 3 }

const RISK_LABEL: Record<Risk, string> = { na: 'N/A', low: 'Low', medium: 'Medium', high: 'High' }

function riskPillClass(risk: Risk) {
  switch (risk) {
    case 'high':
      return 'bg-rose-500/10 text-rose-200'
    case 'medium':
      return 'bg-amber-500/10 text-amber-100'
    case 'low':
      return 'bg-emerald-500/10 text-emerald-200'
    case 'na':
    default:
      return 'bg-blue-500/10 text-blue-200'
  }
}

function riskLeftBorderClass(risk: Risk) {
  switch (risk) {
    case 'high':
      return 'border-rose-400/35'
    case 'medium':
      return 'border-amber-400/35'
    case 'low':
      return 'border-emerald-400/35'
    case 'na':
    default:
      return 'border-blue-400/30'
  }
}

function lanePillClass(tone: 'rose' | 'amber' | 'emerald' | 'blue') {
  switch (tone) {
    case 'rose':
      return 'bg-rose-500/10 text-rose-200'
    case 'amber':
      return 'bg-amber-500/10 text-amber-100'
    case 'emerald':
      return 'bg-emerald-500/10 text-emerald-200'
    case 'blue':
    default:
      return 'bg-blue-500/10 text-blue-200'
  }
}

function riskColor(risk: Risk) {
  if (risk === 'high') return { stroke: '#ef4444', fill: 'rgba(239,68,68,0.22)' }
  if (risk === 'medium') return { stroke: '#f59e0b', fill: 'rgba(245,158,11,0.24)' }
  if (risk === 'low') return { stroke: '#22c55e', fill: 'rgba(34,197,94,0.18)' }
  // Neutral/N/A: keep it bright and clinical (yellow) instead of blue.
  return { stroke: '#f59e0b', fill: 'rgba(245,158,11,0.14)' }
}

function computeLane(maxScore: number, avgScore: number) {
  // Simple mapping into your framework's 4 lanes.
  if (maxScore === 3 || avgScore > 2) return { id: 'D', label: 'Regulated', subtitle: 'Lane D', tone: 'rose' as const }
  if (maxScore === 2 || avgScore > 1) return { id: 'C', label: 'Enhanced', subtitle: 'Lane C', tone: 'amber' as const }
  if (maxScore === 1 || avgScore > 0.5) return { id: 'B', label: 'Standard+', subtitle: 'Lane B', tone: 'emerald' as const }
  return { id: 'A', label: 'Standard', subtitle: 'Lane A', tone: 'blue' as const }
}

type Answer = { risk: Risk; label: string; sub: string }

function Radar({
  values,
  variant = 'interactive',
}: {
  values: number[]
  variant?: 'interactive' | 'print'
}) {
  const isPrint = variant === 'print'
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null)

  const W = isPrint ? 200 : 480
  const H = isPrint ? 158 : 480
  const cx = W / 2
  const cy = H / 2 + (isPrint ? 1 : 0)
  const r = isPrint ? 54 : 132
  /** Gap from outer octagon vertex to label — tight so labels read as axis captions */
  const labelGap = isPrint ? 10 : 14
  const labelR = r + labelGap
  const n = values.length

  const gridStroke = isPrint ? '#cbd5e1' : 'rgba(148, 163, 184, 0.42)'
  const axisStroke = isPrint ? '#cbd5e1' : 'rgba(148, 163, 184, 0.5)'
  const labelFill = isPrint ? '#334155' : '#e8ecf4'
  const labelFontSize = isPrint ? 5.5 : 11.25
  const pad = isPrint ? 10 : 26
  const edgeThreshold = isPrint ? 12 : 28

  const maxValue = 3
  const points = values.map((v, i) => {
    const vv = Math.max(0, Math.min(maxValue, v))
    const angle = (-Math.PI / 2) + (i / n) * (Math.PI * 2)
    const x = cx + Math.cos(angle) * (r * (vv / maxValue))
    const y = cy + Math.sin(angle) * (r * (vv / maxValue))
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })

  const maxAxis = Math.max(...values)
  const profileRisk: Risk = maxAxis === 3 ? 'high' : maxAxis === 2 ? 'medium' : maxAxis === 1 ? 'low' : 'na'
  const c = riskColor(profileRisk)

  const pointRadius = isPrint ? 2.8 : 5.5
  const strokeWidth = isPrint ? 1.75 : 2.75
  const gridLineWidth = isPrint ? 1 : 1.15
  const axisLineWidth = isPrint ? 1 : 1.2

  return (
    <div
      className={
        isPrint
          ? 'classification-print-radar rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm'
          : 'classification-radar-showcase min-w-0 max-w-full rounded-2xl border border-violet-500/25 bg-gradient-to-b from-slate-900/85 via-slate-950/95 to-slate-950 p-3 shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_20px_50px_rgba(0,0,0,0.45)] sm:p-4'
      }
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={
          isPrint
            ? 'mx-auto block w-full'
            : 'mx-auto block aspect-square w-full max-w-full text-slate-100 [shape-rendering:geometricPrecision]'
        }
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Eight-dimension classification radar: scores by axis from center outward"
      >
        {[0.25, 0.5, 0.75, 1].map((f, idx) => (
          <polygon
            key={idx}
            points={values
              .map((_, i) => {
                const angle = (-Math.PI / 2) + (i / n) * (Math.PI * 2)
                const x = cx + Math.cos(angle) * (r * f)
                const y = cy + Math.sin(angle) * (r * f)
                return `${x.toFixed(2)},${y.toFixed(2)}`
              })
              .join(' ')}
            fill="none"
            stroke={gridStroke}
            strokeWidth={gridLineWidth}
          />
        ))}

        {values.map((_, i) => {
          const angle = (-Math.PI / 2) + (i / n) * (Math.PI * 2)
          const x = cx + Math.cos(angle) * r
          const y = cy + Math.sin(angle) * r
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={axisStroke} strokeWidth={axisLineWidth} />
        })}

        <polygon points={points.join(' ')} fill={c.fill} stroke={c.stroke} strokeWidth={strokeWidth} />

        {values.map((v, i) => {
          const angle = (-Math.PI / 2) + (i / n) * (Math.PI * 2)
          const x = cx + Math.cos(angle) * (r * (v / maxValue))
          const y = cy + Math.sin(angle) * (r * (v / maxValue))
          return <circle key={i} cx={x} cy={y} r={pointRadius} fill={c.stroke} />
        })}

        {/* axis labels */}
        {DIMENSIONS.map((d, i) => {
          const angle = (-Math.PI / 2) + (i / n) * (Math.PI * 2)
          const cosA = Math.cos(angle)
          const sinA = Math.sin(angle)
          const rawX = cx + cosA * labelR
          const rawY = cy + sinA * labelR

          const x = Math.max(pad, Math.min(W - pad, rawX))
          const y = Math.max(pad, Math.min(H - pad, rawY))

          let anchor: 'start' | 'middle' | 'end'
          if (isPrint) {
            anchor =
              x <= edgeThreshold ? 'start' : x >= W - edgeThreshold ? 'end' : Math.abs(cosA) < 0.2 ? 'middle' : cosA > 0 ? 'start' : 'end'
          } else if (Math.abs(sinA) > Math.abs(cosA) * 1.2) {
            anchor = 'middle'
          } else if (cosA > 0.12) {
            anchor = 'end'
          } else if (cosA < -0.12) {
            anchor = 'start'
          } else {
            anchor = 'middle'
          }

          return (
            <text
              key={d.id}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="central"
              fontSize={labelFontSize}
              fontWeight={isPrint ? 500 : 600}
              letterSpacing={isPrint ? undefined : '0.01em'}
              fill={labelFill}
              style={isPrint ? undefined : { cursor: 'help' }}
              onMouseEnter={isPrint ? undefined : () => setHoveredAxis(i)}
              onMouseLeave={isPrint ? undefined : () => setHoveredAxis(null)}
            >
              {d.radarLabel}
            </text>
          )
        })}
      </svg>

      {!isPrint && hoveredAxis != null && (
        <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/50 p-3 print:hidden">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {slashTitleParts(DIMENSIONS[hoveredAxis].title).map((line, idx) => (
              <span key={`${hoveredAxis}-t-${idx}`}>
                {idx > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          <p className="mt-1.5 text-[13px] leading-snug text-slate-200">{DIMENSIONS[hoveredAxis].question}</p>
        </div>
      )}
    </div>
  )
}

export default function ClassificationAssessment() {
  const total = DIMENSIONS.length
  const [started, setStarted] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})

  const done = Object.keys(answers).length
  const pct = (done / total) * 100

  const scoreValues = useMemo(() => {
    return DIMENSIONS.map((_, i) => (answers[i] ? RISK_SCORE[answers[i].risk] : 0))
  }, [answers])

  const maxScore = Math.max(...scoreValues)
  const avgScore = scoreValues.reduce((a, b) => a + b, 0) / total
  const lane = computeLane(maxScore, avgScore)

  useEffect(() => {
    if (!started) return
    if (activeIndex == null) return
    const el = document.getElementById(`classification-step-${activeIndex}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [activeIndex, started])

  useEffect(() => {
    const endPrint = () => {
      document.documentElement.classList.remove('print-classification-report')
    }
    window.addEventListener('afterprint', endPrint)
    return () => window.removeEventListener('afterprint', endPrint)
  }, [])

  const evidence = useMemo(() => {
    if (maxScore === 3) {
      return [
        'Risk Management File (ISO 14971)',
        'Software Development Plan',
        'Validation & Verification Protocol',
        'Cybersecurity Risk Assessment',
        'Regulatory Submission Package',
        'Traceability Matrix',
        'Post-Market Surveillance Plan',
      ]
    }
    if (maxScore === 2) {
      return [
        'Software Development Plan',
        'Validation Protocol',
        'Audit Trail Configuration',
        'Privacy Impact Assessment',
        'Change Control Process',
      ]
    }
    return ['Basic Software Documentation', 'Internal Testing Record', 'Version Control Log']
  }, [maxScore])

  const start = () => {
    setStarted(true)
    setActiveIndex(0)
  }

  const selectOption = (dimIndex: number, opt: AssessmentOption) => {
    setAnswers((cur) => ({ ...cur, [dimIndex]: { risk: opt.risk, label: opt.label, sub: opt.sub } }))

    // auto-advance to the next unanswered dimension
    const next = (() => {
      const isAnswered = (i: number) => (i === dimIndex ? true : Boolean(answers[i]))
      for (let i = dimIndex + 1; i < total; i++) {
        if (!isAnswered(i)) return i
      }
      for (let i = 0; i < dimIndex; i++) {
        if (!isAnswered(i)) return i
      }
      return null
    })()

    if (next !== null) {
      window.setTimeout(() => setActiveIndex(next), 250)
    }
  }

  const exportPDF = () => {
    document.documentElement.classList.add('print-classification-report')
    window.setTimeout(() => {
      window.print()
    }, 120)
  }

  const scoreSummary = useMemo(() => {
    const vals = scoreValues
    const peak = Math.max(...vals)
    const avg = vals.reduce((a, b) => a + b, 0) / total
    const peakLabel = peak === 3 ? 'High' : peak === 2 ? 'Medium' : peak === 1 ? 'Low' : 'N/A'
    return { peak, peakLabel, avg: avg.toFixed(1) }
  }, [scoreValues, total])

  const generatedAt = useMemo(() => new Date().toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' }), [])

  return (
    <div className="classification-print-root space-y-4 print:space-y-0 print:text-slate-900">
      <div className="print:hidden">
        <SectionTitle title="Software Classification Assessment" subtitle="Eight assessment dimensions determine regulatory applicability, evidence depth, and SDLC rigor." />
      </div>

      {!started && (
        <Card className="bg-gradient-to-br from-violet-500/10 to-slate-950/40">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-violet-300">Client-grade assessment flow</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-100">Start with one defensible decision.</h3>
              <p className="mt-2 text-sm text-slate-400">Your radar profile updates live as each dimension is answered.</p>
            </div>
            <button
              type="button"
              onClick={start}
              className="rounded-xl border border-violet-500/40 bg-violet-500/10 px-5 py-3 text-sm font-semibold text-violet-100 hover:border-violet-300/60 transition"
            >
              Start Assessment
            </button>
          </div>
        </Card>
      )}

      {started && done === total && (
        <div className="classification-print-exec hidden print:block print:text-[10px] print:leading-snug">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b border-slate-300 pb-2">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">Codex · Executive summary</p>
              <h1 className="mt-0.5 text-base font-bold tracking-tight text-slate-900">Classification assessment</h1>
            </div>
            <p className="text-[9px] text-slate-500">{generatedAt}</p>
          </div>

          <div className="mt-2 grid gap-2 print:grid-cols-3 print:items-start">
            <div className="min-w-0">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Outcome</p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-900">
                {lane.subtitle} — {lane.label} profile
              </p>
              <p className="mt-0.5 text-[10px] text-slate-700 leading-snug">
                Peak dimension risk: <span className="font-medium">{scoreSummary.peakLabel}</span> · Mean score:{' '}
                <span className="font-medium">{scoreSummary.avg}</span> / 3 · All eight dimensions completed in-session.
              </p>
            </div>
            <div className="flex min-w-0 flex-col items-center justify-self-center print:max-w-[178px]">
              <p className="w-full text-center text-[8px] font-semibold uppercase tracking-wider text-slate-500">Risk profile</p>
              <p className="mt-0.5 w-full text-center text-[7px] leading-tight text-slate-500">Axes: eight dimensions · Scale N/A=0 → High=3 (color reflects peak exposure)</p>
              <div className="mt-1 w-full">
                <Radar variant="print" values={scoreValues} />
              </div>
            </div>
            <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Next focus</p>
              <p className="mt-0.5 text-[10px] leading-snug text-slate-800">
                Prioritize the evidence pack aligned to {lane.subtitle}; extend detail in controlled design records as needed.
              </p>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Dimension decisions</p>
            <table className="mt-0.5 w-full border-collapse text-left text-[8px] text-slate-900">
              <thead>
                <tr className="border-b border-slate-400 text-[8px] uppercase tracking-wide text-slate-600">
                  <th className="py-1 pr-2 font-semibold">ID</th>
                  <th className="py-1 pr-2 font-semibold">Dimension</th>
                  <th className="py-1 pr-2 font-semibold">Decision</th>
                  <th className="py-1 font-semibold">Risk</th>
                </tr>
              </thead>
              <tbody>
                {DIMENSIONS.map((d, i) => {
                  const a = answers[i]
                  return (
                    <tr key={d.id} className="border-b border-slate-200">
                      <td className="py-0.5 pr-2 align-top font-mono text-slate-700">{d.id}</td>
                      <td className="py-0.5 pr-2 align-top text-slate-800">{d.title}</td>
                      <td className="py-0.5 pr-2 align-top">{a.label}</td>
                      <td className="py-0.5 align-top font-medium">{RISK_LABEL[a.risk]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-2">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">Recommended evidence (indicative)</p>
            <ul className="mt-0.5 columns-2 gap-4 text-[8px] text-slate-800 [column-fill:_balance]">
              {evidence.map((e) => (
                <li key={e} className="mb-0.5 break-inside-avoid pl-0 leading-tight">
                  <span className="text-emerald-700">✓ </span>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-2 border-t border-slate-200 pt-1.5 text-[7px] leading-normal text-slate-500">
            Indicative only — not legal or regulatory advice. Confirm classification, labeling, and submissions with qualified regulatory and legal reviewers;
            retain with design history / risk file cross-references. Confidential — client advisory use.
          </p>
        </div>
      )}

      {started && (
        <div className="grid items-start gap-3 lg:grid-cols-[60%_40%] print:hidden">
          <div className="space-y-4">
            <Card className="bg-white/5 backdrop-blur">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="min-w-[180px]">
                  <p className="text-[13px] text-slate-300">{done} of {total}</p>
                </div>

                <div className="flex-1 min-w-[220px]">
                  <div className="h-2 rounded-full bg-white/5">
                    <div className="h-full rounded-full bg-violet-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="shrink-0">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${lanePillClass(lane.tone)}`}>
                    {lane.subtitle}
                  </span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              {DIMENSIONS.map((d, idx) => {
                const a = answers[idx]
                const isActive = activeIndex === idx
                const isDone = Boolean(a)

                const statusPillClass = isDone ? 'bg-emerald-500/10 text-emerald-200' : 'bg-white/5 text-slate-300'
                const leftBorderClass = isActive
                  ? 'border-violet-400/90'
                  : isDone
                    ? riskLeftBorderClass(a!.risk)
                    : 'border-transparent'

                return (
                  <div
                    key={d.id}
                    id={`classification-step-${idx}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveIndex(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setActiveIndex(idx)
                    }}
                    className={[
                      'cursor-pointer rounded-2xl border border-white/10 bg-slate-900/25 p-4',
                      'border-l-2',
                      leftBorderClass,
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/50',
                    ].join(' ')}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-slate-500">{d.id}</p>
                        <p className="mt-1 text-[13px] font-semibold text-slate-100">{d.title}</p>
                        {!isActive && (
                          <>
                            <p className="mt-1 text-[13px] text-[#94a3b8] leading-5">{d.collapsedDescription}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="text-[10px] uppercase tracking-wider text-slate-500">Determines:</span>
                              <span className="rounded-full border border-white/10 bg-slate-950/35 px-2.5 py-1 text-[11px] text-indigo-200">
                                {d.determines}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${statusPillClass}`}>
                        {isDone ? 'Complete' : 'Tap to assess'}
                      </span>
                    </div>

                    <div
                      className="overflow-hidden transition-[max-height] duration-200 ease-out"
                      style={{ maxHeight: isActive ? 2000 : 0 }}
                      aria-hidden={!isActive}
                    >
                      <div className="pt-4">
                        <p className="text-[13px] text-slate-300 leading-5">{d.question}</p>
                        <div className="mt-2">
                          <span className="text-[10px] uppercase tracking-wider text-slate-500">Determines:</span>{' '}
                          <span className="text-[12px] text-slate-400">{d.determines}</span>
                        </div>
                        <div className="mt-4 space-y-2">
                          {d.options.map((opt, j) => {
                            const selected = answers[idx]?.risk === opt.risk
                            return (
                              <button
                                key={j}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  selectOption(idx, opt)
                                }}
                                className={[
                                  'w-full rounded-xl border px-3 py-3 text-left flex items-start gap-3',
                                  'border-white/10 bg-slate-950/20 hover:border-white/20',
                                  selected ? 'border-violet-400/40 bg-violet-500/10' : '',
                                ].join(' ')}
                              >
                                <span
                                  className={[
                                    'mt-1 h-4 w-4 rounded-full border-2',
                                    selected ? 'border-violet-300/90 bg-violet-300/20' : 'border-white/20 bg-transparent',
                                  ].join(' ')}
                                />

                                <span className="flex-1 min-w-0">
                                  <span className="block text-[13px] font-semibold text-slate-100">{opt.label}</span>
                                  <span className="mt-1 block text-[11px] text-slate-400 leading-4">{opt.sub}</span>
                                </span>

                                {selected && (
                                  <span className={`ml-auto inline-flex items-center rounded-full px-2 py-1 text-[10px] font-medium ${riskPillClass(opt.risk)}`}>
                                    {RISK_LABEL[opt.risk]}
                                  </span>
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="sticky top-0 min-w-0 space-y-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Lane assignment</p>
              <h3 className="mt-1 text-base font-semibold tracking-tight text-slate-50">{lane.subtitle}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
                Live profile by dimension — hover an axis for the full question. Completing all eight locks the lane.
              </p>
            </div>

            <div className="classification-interactive-radar min-w-0 max-w-full">
              <Radar values={scoreValues.map((v) => v)} />
            </div>

            {done === total && (
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400">Assessment summary</p>
                  <div className="mt-2 overflow-x-auto">
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead className="text-slate-500">
                        <tr>
                          <th className="py-2 pr-2">Dimension</th>
                          <th className="py-2 pr-2">Decision</th>
                          <th className="py-2">Risk</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-200">
                        {DIMENSIONS.map((d, i) => {
                          const a = answers[i]
                          return (
                            <tr key={d.id} className="border-t border-white/10">
                              <td className="py-2 pr-2 text-slate-300">{d.id}</td>
                              <td className="py-2 pr-2 text-slate-100" title={a.sub}>
                                {a.label}
                              </td>
                              <td className="py-2 text-slate-200">{RISK_LABEL[a.risk]}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-slate-400">Required evidence</p>
                  <ul className="mt-2 space-y-1 text-[13px] text-slate-300">
                    {evidence.map((e) => (
                      <li key={e} className="flex items-start gap-2">
                        <span className="mt-[2px] text-emerald-300/90">✓</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={exportPDF}
              disabled={done !== total}
              className={[
                'w-full rounded-xl border px-4 py-3 text-[13px] font-semibold transition',
                done === total
                  ? 'border-violet-500/40 bg-violet-500 text-white hover:bg-violet-400'
                  : 'border-white/10 bg-transparent text-slate-300 opacity-60 cursor-not-allowed hover:bg-white/5',
              ].join(' ')}
            >
              Export 1-page executive summary (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

