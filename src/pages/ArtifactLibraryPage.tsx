import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Card } from '../components/ui'
import type { CSSProperties, ReactNode } from 'react'

type ArtifactGroupId = 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7'

type PathAIExample = {
  [fieldLabel: string]: string | string[]
}

type ArtifactTemplate = {
  id: string
  name: string
  groupId: ArtifactGroupId
  purpose: string
  trigger: string
  owner: string
  requiredInputs: string[]
  coreSections: string[]
  reviewFrequency: string
  traceabilityLinks: string[]
  aiAssistOpportunity: string
  pathAIExample?: PathAIExample
}

type ArtifactGroup = {
  id: ArtifactGroupId
  label: string
  accent: string
  artifacts: ArtifactTemplate[]
}

const laneBadge = (toneHex: string) =>
  ({
    borderColor: `${toneHex}66`,
    backgroundColor: `${toneHex}14`,
    color: toneHex,
  }) as CSSProperties

function FieldTableRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <tr className="border-t border-white/10">
      <td className="py-2 pr-3 align-top text-[11px] uppercase tracking-[0.12em] text-slate-500">{label}</td>
      <td className="py-2 align-top text-[12px] text-slate-200">{value}</td>
    </tr>
  )
}

function listValue(items: string[]) {
  return (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((s) => (
        <li key={s} className="leading-5">
          {s}
        </li>
      ))}
    </ul>
  )
}

function firstOwnerRole(owner: string) {
  const first = owner.split('·')[0] ?? owner
  return first.split('(')[0]?.trim() || first.trim()
}

function inferPhaseLabel(trigger: string) {
  const m = trigger.match(/\bP(\d)\b/i)
  const p = m?.[1]
  if (!p) return 'P—'
  const phase = `P${p}`
  if (phase === 'P0') return 'P0 Concept'
  if (phase === 'P1') return 'P1 Feasibility'
  if (phase === 'P2') return 'P2 Design'
  if (phase === 'P3') return 'P3 Build'
  if (phase === 'P4') return 'P4 Verification'
  if (phase === 'P5') return 'P5 Validate'
  if (phase === 'P6') return 'P6 Release'
  return `${phase}`
}

const ARTIFACT_GROUPS: ArtifactGroup[] = [
  {
    id: 'g1',
    label: 'INTAKE & CLASSIFICATION',
    accent: '#3B4BC8',
    artifacts: [
      {
        id: 'ART-001',
        name: 'Intended Use Assessment',
        groupId: 'g1',
        purpose:
          'Formally documents the intended medical purpose, target population, operating environment, and intended users of a software product. Establishes the basis for all subsequent classification and regulatory applicability decisions.',
        trigger: 'Initiated at product concept stage (P0), before any development begins.',
        owner: 'Product Owner (Responsible) · Regulatory Lead (Accountable)',
        requiredInputs: ['Product concept brief', 'Preliminary clinical or operational requirements', 'Market / geography scope'],
        coreSections: [
          'Medical purpose statement',
          'Target patient population',
          'Intended users and use environment',
          'Indications for use',
          'Contraindications',
          'Relationship to other devices/systems',
          'Predecessor product reference',
        ],
        reviewFrequency: 'At every significant change to product scope or intended use; at each regulatory submission',
        traceabilityLinks: ['→ ART-002 (Classification)', '→ ART-003 (Regulatory Applicability)', '→ ART-005 (Risk Management Plan)'],
        aiAssistOpportunity:
          'AI can draft the intended use statement from a product brief · Flag ambiguous clinical claims · Cross-reference against FDA cleared predicate intended use language',
        pathAIExample: {
          'Medical Purpose':
            'AI-assisted analysis of digitized pathology images to detect and characterize tissue abnormalities, providing pre-report content to licensed pathologists for clinical decision support in anatomic pathology diagnosis.',
          'Target Population':
            'Adult and pediatric patients undergoing clinical anatomic pathology diagnosis across oncology, hematology, and general surgical pathology indications.',
          'Intended Users':
            'Licensed pathologists and anatomic pathology residents in accredited CAP/CLIA clinical laboratory settings.',
          'Environment':
            'LIS-integrated, web-based pathologist workstation with DICOM viewer. WSI scanners: Leica, Hamamatsu, Aperio. Cloud-hosted AI inference (GCP).',
          'Contraindications':
            'Not for cytology specimens. Not validated for intraoperative frozen section. Not a standalone diagnostic — all outputs require pathologist review and sign-out.',
        },
      },
      {
        id: 'ART-002',
        name: 'Software Classification Assessment',
        groupId: 'g1',
        purpose:
          'Applies the 8-dimension Classification Model (CD-1 through CD-8) to determine SDLC lane assignment, IEC 62304 safety class, EU MDR risk class, and FDA device class. The single authoritative classification record for the product.',
        trigger: 'Immediately after ART-001 is approved; updated at every significant change to intended use.',
        owner: 'Regulatory Lead (Responsible/Accountable) · QA Lead (Accountable) · Product Owner (Informed)',
        requiredInputs: ['ART-001 Intended Use Assessment', 'Applicable regulation list', 'Predicate device analysis (if applicable)'],
        coreSections: [
          'CD-1 through CD-8 scoring table',
          'Lane determination with rationale',
          'IEC 62304 safety class determination',
          'EU MDR risk class',
          'FDA device class',
          'Required evidence summary',
        ],
        reviewFrequency: 'At every phase gate; when significant change proposed; when entering new markets',
        traceabilityLinks: ['→ ART-004 (SDLC Lane)', '→ ART-014 (V&V Strategy)', '→ ART-019 (Evidence Matrix)'],
        aiAssistOpportunity:
          'AI can pre-populate CD scoring from product description · Flag classification edge cases · Compare to historical classifications for similar products',
        pathAIExample: {
          'CD-1 Regulatory Intent': 'Direct — software directly supports clinical diagnostic decision → scores toward Lane D',
          'CD-2 Patient Safety Impact': 'Serious — incorrect AI output could affect cancer diagnosis → IEC 62304 Class C',
          'CD-5 Submission Exposure': 'Primary submission artifact — will appear in 510(k) technical documentation',
          'Lane Determination': 'Lane D — SaMD / Medical Device',
          'IEC 62304 Class': 'C (patient harm possible if software fails to perform as intended)',
          'EU MDR Class': 'IIb (AI clinical decision support, serious consequences if incorrect)',
          'FDA Class': 'II — 510(k) candidate',
        },
      },
      {
        id: 'ART-003',
        name: 'Regulatory Applicability Assessment',
        groupId: 'g1',
        purpose:
          'Identifies all applicable regulations, standards, and guidance documents for the product. Maps each to specific obligations and creates the regulatory obligation register that drives evidence requirements.',
        trigger: 'Following ART-002 completion; updated when entering new markets or when applicable regulations change.',
        owner: 'Regulatory Lead (Responsible/Accountable) · Legal (Informed)',
        requiredInputs: ['ART-002 Classification Assessment', 'Target markets/geographies', 'Product development timeline'],
        coreSections: [
          'Applicable standards table (standard, jurisdiction, applicability rationale, obligation summary)',
          'Non-applicable standards with exclusion rationale',
          'Obligation register',
          'Regulatory submission pathway determination',
          'Key regulatory milestones',
        ],
        reviewFrequency: 'Annually; upon entering new markets; upon major regulatory framework changes',
        traceabilityLinks: ['→ ART-005 (Risk Plan)', '→ ART-019 (Evidence Matrix)', '→ ART-020 (21 CFR Part 11 Assessment)'],
        aiAssistOpportunity:
          'AI can monitor regulatory updates and flag changes to applicable standards · Auto-update obligation register when standards are revised · Draft exclusion rationale for non-applicable standards',
        pathAIExample: {
          Applicable: [
            'IEC 62304:2015 (Class C SDLC requirements)',
            'ISO 14971:2019 (full risk management file)',
            'EU MDR 2017/745 (CE marking, Technical File)',
            'FDA SaMD Guidance 2019 (510(k) pathway)',
            'FDA AI/ML SaMD Action Plan 2021',
            'IEC 62366-1 (usability engineering)',
            'NIST AI RMF (AI governance)',
            'HIPAA Security Rule (patient data)',
            '21 CFR Part 11 (audit trails)',
          ].join('\n'),
        },
      },
      {
        id: 'ART-004',
        name: 'SDLC Lane Determination Record',
        groupId: 'g1',
        purpose:
          'Documents the formal lane assignment (A/B/C/D) with supporting rationale. Specifies which lifecycle processes are required and defines the evidence requirements for the product lifecycle.',
        trigger: 'Output of ART-002; reviewed and reconfirmed at every phase gate.',
        owner: 'Regulatory Lead (Responsible) · QA Lead (Accountable) · Software Dev Lead (Informed)',
        requiredInputs: ['ART-002 Classification Assessment', 'ART-003 Regulatory Applicability'],
        coreSections: [
          'Lane assignment with rationale',
          'Phase-by-phase process requirements',
          'Evidence checklist per phase',
          'Intensity level per activity',
          'Review and approval record',
        ],
        reviewFrequency: 'Every phase gate; upon significant change',
        traceabilityLinks: ['→ ART-014 (V&V Strategy)', '→ ART-019 (Evidence Matrix)', '→ ART-021 (Phase Gate Reviews)'],
        aiAssistOpportunity: 'Auto-generate phase-by-phase evidence checklist from lane assignment · Flag missing process elements',
        pathAIExample: {
          'Lane': 'D — SaMD / Medical Device',
          'Required Processes':
            'Full IEC 62304 software lifecycle · ISO 14971 risk management throughout · IEC 62366 usability engineering · Design History File (FDA) / Technical File (EU MDR) · 510(k) / CE marking preparation',
        },
      },
    ],
  },
  {
    id: 'g2',
    label: 'RISK & IMPACT',
    accent: '#E11D48',
    artifacts: [
      {
        id: 'ART-005',
        name: 'Risk Management Plan',
        groupId: 'g2',
        purpose: 'Defines the risk management process for the product per ISO 14971. Specifies risk acceptance criteria, risk management activities, responsibilities, and review schedule for the full product lifecycle.',
        trigger: 'Initiated at P1 Feasibility gate; maintained throughout product lifecycle and post-market.',
        owner: 'Risk Manager (Responsible) · QA Lead (Accountable) · Regulatory Lead (Accountable)',
        requiredInputs: ['ART-001 Intended Use', 'ART-003 Regulatory Applicability', 'Organizational risk acceptance policy'],
        coreSections: [
          'Risk management scope',
          'Risk acceptance criteria (quantitative and qualitative)',
          'Risk management activities by lifecycle phase',
          'Roles and responsibilities',
          'Risk management file index',
          'Review schedule',
          'Risk management report trigger criteria',
        ],
        reviewFrequency: 'At each phase gate; when risk acceptance criteria challenged; annually post-market',
        traceabilityLinks: ['→ ART-006 (FMEA)', '→ ART-007 (Cybersecurity Risk)', '→ ART-009 (AI/ML Assessment)'],
        aiAssistOpportunity:
          'Draft risk acceptance criteria from product classification · Pre-populate activity schedule from lane assignment · Flag when actual risk levels approach acceptance criteria thresholds',
        pathAIExample: {
          'Risk Acceptance Criteria':
            'Residual risk acceptable when probability of harm × severity ≤ 4 on 5×5 matrix, or when clinical benefit demonstrably outweighs residual risk per ISO 14971 §9',
          'Key Activities': 'Initial FMEA at P2 · Risk controls verification at P4 · Residual risk evaluation at P5 · Post-market risk updates triggered by signal detection',
        },
      },
      {
        id: 'ART-006',
        name: 'FMEA / Software Risk Analysis',
        groupId: 'g2',
        purpose:
          'Systematic identification of potential failure modes, their causes, effects, and risk controls. Primary risk analysis tool linking hazards to software design decisions and verification activities per ISO 14971.',
        trigger: 'Required at P2 Design gate for Lane C/D; updated at every significant change; reviewed at each phase gate.',
        owner: 'Risk Manager (Responsible) · Software Dev Lead (Contributing) · QA Lead (Accountable)',
        requiredInputs: ['ART-005 Risk Management Plan', 'ART-010 Software Requirements Spec', 'Hazard identification inputs'],
        coreSections: [
          'Hazard identification',
          'Failure mode description',
          'Cause analysis',
          'Severity rating (1–5)',
          'Probability rating (1–5)',
          'Initial risk level',
          'Risk control description',
          'Residual risk level',
          'Verification method',
          'Risk control implementation status',
        ],
        reviewFrequency: 'At P2, P3, P4, P5 gates; when new failure modes identified; when SOUP updated',
        traceabilityLinks: ['→ ART-014 (V&V Strategy)', '→ ART-018 (Traceability Matrix)', '→ ART-026 (PMS Plan)'],
        aiAssistOpportunity:
          'Draft initial failure mode list from software architecture and intended use · Map risk controls to existing test cases · Flag residual risks above acceptance criteria · Monitor post-market data for emerging failure modes',
        pathAIExample: {
          '5 key risks': [
            'RM-001: False negative AI detection (missed malignancy) | Effect: Missed cancer diagnosis, delayed treatment | Severity 5 / Probability 3 | Control: Mandatory pathologist review; sensitivity threshold optimization; PMS monitoring',
            'RM-002: False positive AI detection (overdiagnosis) | Effect: Unnecessary treatment, psychological harm | Severity 4 / Probability 3 | Control: Specificity validation in clinical study; pathologist override required; confidence score displayed',
            'RM-003: Wrong patient image linked to AI output | Effect: Diagnostic report for wrong patient | Severity 5 / Probability 2 | Control: Mandatory specimen ID verification at API; audit trail captures specimen barcode and patient ID',
            'RM-004: AI model performance degradation (drift) | Effect: Systematic false negatives before detection | Severity 5 / Probability 2 | Control: Automated PMS performance monitoring; alert threshold for sensitivity drop >5% vs validated baseline',
            'RM-005: Cybersecurity breach — model inversion attack | Effect: Patient data exfiltration | Severity 4 / Probability 2 | Control: API rate limiting; differential privacy; SOC 2 Type II; IEC 81001-5-1 controls',
          ].join('\n'),
        },
      },
      // NOTE: ART-007..ART-009 are defined in the full spec and will be added in follow-up to keep the patch size manageable.
    ],
  },
  // NOTE: Remaining groups and artifacts (ART-007..ART-027) will be added in follow-up patches if needed.
  {
    id: 'g3',
    label: 'DESIGN & ARCHITECTURE',
    accent: '#0D9488',
    artifacts: [],
  },
  {
    id: 'g4',
    label: 'VERIFICATION & VALIDATION',
    accent: '#D97706',
    artifacts: [],
  },
  {
    id: 'g5',
    label: 'EVIDENCE & TRACEABILITY',
    accent: '#6D28D9',
    artifacts: [],
  },
  {
    id: 'g6',
    label: 'GOVERNANCE & APPROVAL',
    accent: '#0F1F3D',
    artifacts: [],
  },
  {
    id: 'g7',
    label: 'RELEASE & POST-MARKET',
    accent: '#0D9488',
    artifacts: [],
  },
]

function ArtifactTemplateCard({
  artifact,
  accent,
  expanded,
  onToggle,
  pathAIExampleMode,
}: {
  artifact: ArtifactTemplate
  accent: string
  expanded: boolean
  onToggle: () => void
  pathAIExampleMode: boolean
}) {
  const phaseLabel = inferPhaseLabel(artifact.trigger)
  const ownerRole = firstOwnerRole(artifact.owner)

  return (
    <div className="al-artifact-card">
      <div
        className="rounded-2xl border border-white/10 bg-slate-900/40 p-4"
        style={{
          borderLeftWidth: 3,
          borderLeftColor: accent,
        }}
      >
        <button
          type="button"
          onClick={onToggle}
          className="w-full text-left"
          aria-expanded={expanded}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                  style={laneBadge(accent)}
                >
                  {artifact.id}
                </span>
                <span
                  className="inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-semibold"
                  style={{ borderColor: `${accent}66`, color: '#dbeafe', backgroundColor: `${accent}14` }}
                >
                  {phaseLabel}
                </span>
              </div>
              <h3 className="mt-2 text-[16px] font-extrabold tracking-[-0.01em] text-slate-100">
                {artifact.name}
              </h3>
              <p className="mt-1 text-[11px] text-slate-400 leading-5">
                {artifact.purpose}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                  style={{
                    borderColor: `${accent}66`,
                    color: '#e2e8f0',
                    backgroundColor: `${accent}14`,
                  }}
                >
                  Owner: {ownerRole}
                </span>
              </div>
            </div>

            <span className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[12px] font-semibold text-slate-200">
              {expanded ? (
                <>
                  Hide Template <ChevronDown size={14} />
                </>
              ) : (
                <>
                  View Template <ChevronRight size={14} />
                </>
              )}
            </span>
          </div>
        </button>

        {expanded && (
          <div className="mt-4 al-template-detail">
            <table className="w-full border-collapse text-left">
              <tbody>
                <FieldTableRow label="Artifact ID" value={<span className="font-mono text-slate-100">{artifact.id}</span>} />
                <FieldTableRow label="Purpose" value={<span className="text-slate-200">{artifact.purpose}</span>} />
                <FieldTableRow label="Trigger" value={<span className="text-slate-200">{artifact.trigger}</span>} />
                <FieldTableRow label="Owner / Contributors / Approvers" value={<span className="text-slate-200">{artifact.owner}</span>} />
                <FieldTableRow label="Required Inputs" value={listValue(artifact.requiredInputs)} />
                <FieldTableRow label="Core Sections" value={listValue(artifact.coreSections)} />
                <FieldTableRow label="Review Frequency" value={<span className="text-slate-200">{artifact.reviewFrequency}</span>} />
                <FieldTableRow
                  label="Traceability Links"
                  value={
                    <ul className="space-y-1">
                      {artifact.traceabilityLinks.map((l) => (
                        <li key={l} className="leading-5">
                          <span className="text-slate-200">{l}</span>
                        </li>
                      ))}
                    </ul>
                  }
                />
                <FieldTableRow label="AI Assist Opportunity" value={<span className="text-slate-200">{artifact.aiAssistOpportunity}</span>} />
              </tbody>
            </table>

            {pathAIExampleMode && artifact.pathAIExample && (
              <div className="al-pathai-example mt-4 rounded-xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-400 font-semibold">PathAI Reporter Example</p>
                <div className="mt-3">
                  {Object.entries(artifact.pathAIExample).map(([k, v]) => (
                    <div key={k} className="mt-3">
                      <p className="text-[12px] font-semibold text-slate-100">{k}</p>
                      {Array.isArray(v) ? (
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {v.map((s) => (
                            <li key={s} className="leading-5 text-slate-200">
                              {s}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-1 text-[12px] leading-6 text-slate-200 whitespace-pre-line">{v}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ArtifactLibraryPage() {
  const [pathAIExampleMode, setPathAIExampleMode] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<ArtifactGroupId, boolean>>({
    g1: true,
    g2: false,
    g3: false,
    g4: false,
    g5: false,
    g6: false,
    g7: false,
  })
  const [selectedArtifactId, setSelectedArtifactId] = useState<string | null>(null)

  const groupById = useMemo(() => {
    return Object.fromEntries(ARTIFACT_GROUPS.map((g) => [g.id, g])) as Record<ArtifactGroupId, ArtifactGroup>
  }, [])

  const artifactById = useMemo(() => {
    const map: Record<string, ArtifactTemplate> = {}
    for (const g of ARTIFACT_GROUPS) {
      for (const a of g.artifacts) map[a.id] = a
    }
    return map
  }, [])

  const selectedArtifact = selectedArtifactId ? artifactById[selectedArtifactId] : null
  const selectedGroup = selectedArtifact ? groupById[selectedArtifact.groupId] : null

  return (
    <div className="space-y-4">
      <section id="artifact-library" data-example-mode={pathAIExampleMode ? 'true' : 'false'}>
        <Card className="bg-white/5 p-5">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Artifact Library</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-100">Artifact Library</h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-300">
                27 reusable, pre-structured document templates covering every evidence requirement from product intake to post-market surveillance.
              </p>
            </div>
          </div>

          <div
            className="al-pathai-banner mt-5 rounded-xl border p-4 flex flex-wrap items-center justify-between gap-3"
            style={
              pathAIExampleMode
                ? { backgroundColor: 'rgba(59,75,200,0.08)', borderColor: 'rgba(59,75,200,0.25)' }
                : undefined
            }
          >
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-sm text-slate-200">
                {pathAIExampleMode ? 'Showing PathAI Reporter pre-populated examples — ' : 'Viewing blank templates — '}
              </p>
              {pathAIExampleMode ? (
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-100">
                  AI CLINICAL REPORTING · LANE D · IEC 62304 CLASS C
                </span>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setPathAIExampleMode((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              {pathAIExampleMode ? 'Switch to blank templates →' : 'Switch to PathAI Reporter Example →'}
            </button>
          </div>
        </Card>

        <div className="mt-4 grid gap-4 lg:grid-cols-[340px_1fr]">
          <aside className="rounded-2xl border border-white/10 bg-slate-900/30 p-4">
            <p className="text-[11px] uppercase tracking-wider text-slate-400">Artifact Groups</p>
            <div className="mt-3 space-y-2">
              {ARTIFACT_GROUPS.map((g) => {
                const isExpanded = Boolean(expandedGroups[g.id])
                const hasArtifacts = g.artifacts.length > 0
                const selectedInGroup = selectedArtifact && selectedArtifact.groupId === g.id
                return (
                  <div key={g.id}>
                    <button
                      type="button"
                      onClick={() => setExpandedGroups((cur) => ({ ...cur, [g.id]: !cur[g.id] }))}
                      className={[
                        'w-full rounded-xl border px-3 py-2 text-left transition',
                        selectedInGroup ? 'border-white/20 bg-white/5' : 'border-white/10 bg-transparent hover:bg-white/5',
                      ].join(' ')}
                      style={{
                        borderLeftWidth: 3,
                        borderLeftColor: g.accent,
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-slate-200">{g.label}</span>
                            <span className="text-[10px] font-semibold text-slate-500">({g.artifacts.length})</span>
                          </div>
                        </div>
                        <span className="shrink-0 text-slate-400">
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </span>
                      </div>
                    </button>

                    {isExpanded && hasArtifacts ? (
                      <div className="mt-2 space-y-1 pl-2">
                        {g.artifacts.map((a) => {
                          const isSelected = selectedArtifactId === a.id
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => setSelectedArtifactId((cur) => (cur === a.id ? null : a.id))}
                              className={[
                                'w-full rounded-lg border px-3 py-2 text-left transition',
                                isSelected ? 'border-white/20 bg-white/5' : 'border-white/10 bg-transparent hover:bg-white/5',
                              ].join(' ')}
                              style={{
                                borderLeftWidth: 3,
                                borderLeftColor: g.accent,
                              }}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="text-[11px] font-semibold text-slate-200">{a.name}</p>
                                  <p className="mt-1 text-[10px] text-slate-500">{inferPhaseLabel(a.trigger)}</p>
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </aside>

          <main>
            {selectedArtifact ? (
              <ArtifactTemplateCard
                artifact={selectedArtifact}
                accent={selectedGroup?.accent ?? '#64748b'}
                expanded={true}
                pathAIExampleMode={pathAIExampleMode}
                onToggle={() => setSelectedArtifactId(null)}
              />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-6">
                <p className="text-xs uppercase tracking-wider text-slate-400">Template Overview</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-100">Select an artifact template</h2>
                <p className="mt-2 text-sm text-slate-300 leading-6">
                  Artifact templates are organized by group and are accessible through the tree explorer.
                  Each template includes: Purpose, Trigger, Owner / RACI, Required Inputs, Core Sections, Review Frequency, Traceability Links, and AI Assist Opportunity.
                  Toggle PathAI Reporter Example to preview pre-populated content.
                </p>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  )
}

