import { useMemo, useState } from 'react'
import {
  Filter,
  Search,
  X,
} from 'lucide-react'
import { Badge, Card, SectionTitle, Tooltip } from '../components/ui'
import {
  ApprovalFlow,
  EvidenceVault,
  GovernanceDecisionArchitecture,
  GuardrailsTracks,
  LifecycleSwimlane,
  RiskHeatBoard,
  SDLCStaircase,
  TraceabilityProofGraph,
} from '../components/framework/Diagrams'
import {
  allUniverseItems,
  approvalStages,
  binders,
  complianceHotspots,
  functionalRoles,
  guardrailPatterns,
  governanceLayers,
  lanes,
  lifecyclePhases,
  riskTiers,
  traceLinks,
} from '../data/frameworkData'
import type { Category, Regulation, SoftwareImpact } from '../types/framework'
import { FrameworkOverviewLanding } from '../components/framework/FrameworkOverviewLanding'
import ClassificationAssessment from '../components/framework/ClassificationAssessment'

function softwareImpactAreasFor(item: Regulation): string[] {
  const exactImpacts: Record<string, string[]> = {
    'FD&C Act 201(g)': [
      'Defines when software constitutes a drug or drug component',
      'Triggers 510(k) or PMA pathway for software-driven drug delivery',
      'Sets intended use boundary for combination products',
    ],
    'FD&C Act 201(h)': [
      'Defines the legal boundary of "medical device" — critical for SaMD classification',
      'Determines whether software requires premarket notification or approval',
      'Underpins all IEC 62304 and FDA SaMD guidance applicability',
    ],
    '21 CFR Part 807': [
      'Requires substantial equivalence demonstration before commercial distribution',
      'Drives design history file and predicate device documentation',
      'Sets performance testing and labelling obligations',
    ],
    '21 CFR Part 807 Subpart E': [
      'Specifies exact content of a 510(k) submission package',
      'Requires software documentation per FDA Software Guidance (IEC 62304 aligned)',
      'Triggers cybersecurity documentation requirements for networked devices',
    ],
    '21 CFR Part 814': [
      'Applies to Class III devices where 510(k) is insufficient',
      'Requires clinical evidence, manufacturing controls, and post-approval studies',
      'Demands full software lifecycle documentation to IEC 62304 Class C standard',
    ],
    '21 CFR Part 812': [
      'Governs software used in clinical investigations before market approval',
      'Requires IDE application, IRB approval, and informed consent processes',
      'Traceability requirements apply to investigational software versions',
    ],
    '21 CFR Part 820': [
      'Mandates a Design Control process for Class II and III device software',
      'Requires Design History File (DHF), Device Master Record, and Device History Record',
      'Drives formal design review, verification & validation, and change control',
    ],
    '21 CFR Part 801': [
      'Controls all labelling including software UI text, instructions for use, and indications',
      'Requires intended use, contraindications, and warnings to be explicitly stated',
      'Influences how software version changes trigger labelling review',
    ],
    '21 CFR Part 803': [
      'Mandates reporting of device malfunctions that could cause serious injury or death',
      'Software bugs that cause adverse events require MDR submissions within 30 days',
      'Drives post-market surveillance tooling and incident management processes',
    ],
    '21 CFR Part 11': [
      'Requires audit trails for all regulated records created, modified, or deleted',
      'Mandates access controls, user authentication, and system validation',
      'Drives electronic signature requirements for approvals in GxP environments',
    ],
    'IEC 62304': [
      'Defines three safety classes (A, B, C) based on hazard to patients',
      'Mandates software development planning, architecture, unit/integration testing, and maintenance',
      'Primary standard driving SDLC Lane B, C, D process obligations',
    ],
    'ISO 14971': [
      'Requires systematic identification, estimation, evaluation, and control of risks',
      'Risk Management File must be maintained throughout the product lifecycle',
      'Drives traceability from hazard to risk control to verification evidence',
    ],
    'EU MDR 2017/745': [
      'Defines device classification rules (Class I, IIa, IIb, III) for EU market',
      'Requires Technical Documentation, Clinical Evaluation, and Post-Market Surveillance plan',
      'Drives CE marking and Notified Body involvement for Class IIa and above',
    ],
    'EU IVDR 2017/746': [
      'Replaces IVDD for lab and diagnostic software placed in EU market',
      'Stricter classification for companion diagnostics and high-risk IVD software',
      'Requires performance evaluation, clinical evidence, and EUDAMED registration',
    ],
  }

  if (exactImpacts[item.title]) return exactImpacts[item.title]

  const t = `${item.title} ${item.governingBody} ${item.jurisdiction} ${item.softwareRelevance}`.toLowerCase()
  const areas: string[] = []
  const push = (s: string) => {
    if (!areas.includes(s)) areas.push(s)
  }

  // Regulation-aware fallback: specific by subject matter, not a generic repeated template.
  if (t.includes('gdpr')) {
    push('Defines lawful basis, data subject rights, and cross-border controls for personal-data software workflows')
    push('Requires privacy-by-design controls in software features, retention, and deletion behavior')
    push('Drives breach-response and processing-record evidence expectations for regulated operations')
  }
  if (t.includes('hipaa')) {
    push('Defines PHI handling controls for confidentiality, integrity, and availability in healthcare software')
    push('Requires role-based access, audit logging, and safeguards for covered entities and business associates')
    push('Drives incident response and workforce-policy enforcement for systems touching PHI')
  }
  if (t.includes('iso 13485')) {
    push('Establishes QMS controls for software design, change management, and document governance')
    push('Requires design-transfer and verification records aligned to quality procedures')
    push('Drives supplier and CAPA controls for software components in regulated devices')
  }
  if (t.includes('gamp')) {
    push('Applies risk-based validation strategy for computerized systems in GxP use cases')
    push('Defines scalable evidence depth based on software category and business criticality')
    push('Drives lifecycle deliverables from URS through validation summary and periodic review')
  }
  if (t.includes('81001-5-1') || t.includes('cybersecurity')) {
    push('Requires secure development lifecycle controls for health software and connected ecosystems')
    push('Drives threat modelling, security verification, and vulnerability handling evidence')
    push('Links cybersecurity risk controls to release and post-market monitoring obligations')
  }
  if (t.includes('62366') || t.includes('usability')) {
    push('Requires usability engineering focused on use-related risk reduction')
    push('Drives formative/summative evidence for user interface safety and effectiveness')
    push('Links user error scenarios to risk controls and verification activities')
  }
  if (t.includes('42 cfr part 493') || t.includes('clia') || t.includes('cap')) {
    push('Defines laboratory quality controls for software supporting test workflow and reporting')
    push('Requires traceable records for specimen handling, result generation, and quality events')
    push('Drives operational evidence readiness for inspections and accreditation audits')
  }
  if (t.includes('pmda') || t.includes('japan')) {
    push('Defines Japan-specific SaMD obligations for intended use, safety, and effectiveness')
    push('Requires market-entry evidence aligned to PMD Act expectations and local review pathways')
    push('Drives post-market monitoring and change-control discipline for deployed software')
  }
  if (t.includes('annex 11')) {
    push('Defines computerized-system validation expectations in EU GMP environments')
    push('Requires audit trails, role-based access, and data integrity controls for regulated records')
    push('Drives periodic review and operational monitoring for validated system state')
  }
  if (t.includes('multiple function device')) {
    push('Defines regulated vs non-regulated function boundaries in multifunction software products')
    push('Requires evidence that non-device functions do not compromise device safety/effectiveness')
    push('Drives architecture partitioning and verification strategy for mixed-function systems')
  }
  if (t.includes('design control guidance')) {
    push('Translates design control requirements into practical software lifecycle implementation steps')
    push('Clarifies expectations for requirements, design review, verification, and validation outputs')
    push('Supports defensible DHF structure and change-control evidence for inspections')
  }
  if (t.includes('section 520(o)')) {
    push('Defines software functions excluded from device definition under FD&C Act')
    push('Requires clear intended-use framing to separate wellness/support from regulated device behavior')
    push('Drives boundary documentation to justify non-device classification decisions')
  }
  if (t.includes('section 524b')) {
    push('Requires cybersecurity plans, vulnerability processes, and coordinated disclosure posture')
    push('Drives SBOM and patchability evidence for cyber devices before and after release')
    push('Links post-market security monitoring to regulatory maintenance obligations')
  }
  if (t.includes('fda regulation (general)')) {
    push('Applies FDA risk-based controls to software by intended use and patient impact')
    push('Determines whether 510(k), De Novo, or PMA route is required for commercialization')
    push('Drives lifecycle evidence expectations from premarket through post-market obligations')
  }

  // Last-resort fallback: still specific to the item metadata and title.
  if (areas.length < 3) {
    push(`${item.title} defines software-team obligations across intended use, evidence, and release governance`)
    push(`Imposes documentation and control expectations aligned to ${item.jurisdiction} oversight requirements`)
    push(`Drives traceable lifecycle evidence from requirements through validation and operational change management`)
  }

  return areas.slice(0, 3)
}

export function FrameworkOverviewPage() {
  return <FrameworkOverviewLanding />
}

export function GuardrailsPavedRoadsPage() {
  return (
    <div className="space-y-4">
      <GuardrailsTracks patterns={guardrailPatterns} />
    </div>
  )
}

export function RegulatoryUniversePage() {
  const [category, setCategory] = useState<'All' | Category>('All')
  const [jurisdiction, setJurisdiction] = useState('All')
  const [softwareType, setSoftwareType] = useState('All')
  const [softwareImpact, setSoftwareImpact] = useState<'All' | SoftwareImpact>('All')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Regulation | null>(null)

  const jurisdictions = Array.from(new Set(allUniverseItems.map((item) => item.jurisdiction)))
  const filtered = useMemo(
    () =>
      allUniverseItems.filter((item) => {
        const categoryMatch = category === 'All' || item.category === category
        const jurisdictionMatch = jurisdiction === 'All' || item.jurisdiction === jurisdiction
        const softwareTypeMatch = softwareType === 'All' || item.softwareTypes.includes(softwareType)
        const impactMatch = softwareImpact === 'All' || item.softwareImpact === softwareImpact
        const queryMatch = item.title.toLowerCase().includes(query.toLowerCase()) || item.softwareRelevance.toLowerCase().includes(query.toLowerCase())
        return categoryMatch && jurisdictionMatch && softwareTypeMatch && impactMatch && queryMatch
      }),
    [category, jurisdiction, softwareType, softwareImpact, query]
  )

  return (
    <div className="space-y-4">
      <p className="mt-1 text-xs uppercase tracking-wider text-emerald-200">
        Regulatory Universe: a mapped ecosystem of obligations that defines what your software must do and prove.
      </p>

      <Card className="sticky top-3 z-10">
        <div className="grid gap-2 lg:grid-cols-6">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3 top-2.5 text-slate-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="w-full rounded-lg border border-white/10 bg-slate-900 py-2 pl-9 pr-3 text-sm" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value as 'All' | Category)} className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm">
            <option>All</option><option>Regulation</option><option>Standard</option><option>Guidance</option><option>Certification</option><option>License</option>
          </select>
          <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm">
            <option>All</option>{jurisdictions.map((j) => <option key={j}>{j}</option>)}
          </select>
          <select value={softwareType} onChange={(e) => setSoftwareType(e.target.value)} className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm">
            <option>All</option><option>Enterprise</option><option>Lab</option><option>Device</option>
          </select>
          <select value={softwareImpact} onChange={(e) => setSoftwareImpact(e.target.value as 'All' | SoftwareImpact)} className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm">
            <option>All</option><option>High</option><option>Moderate</option><option>Foundational</option>
          </select>
          <div className="flex items-center justify-end gap-2 text-xs text-slate-400"><Filter size={14} /> {filtered.length} matched items</div>
        </div>
      </Card>

      {selected && (
        <Card className="overflow-x-auto">
          <div className="relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-md border border-white/10 bg-white/5 p-1"
            >
              <X size={14} />
            </button>

            <div className="p-4">
              <div className="flex items-center justify-between gap-3 pb-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Selected regulation</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-100">{selected.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                    {selected.category} | {selected.governingBody} | {selected.jurisdiction}
                  </p>
                </div>
                <Badge
                  className={
                    selected.softwareImpact === 'High'
                      ? 'border-rose-400/40 bg-rose-500/15 text-rose-200'
                      : selected.softwareImpact === 'Moderate'
                        ? 'border-amber-400/40 bg-amber-500/15 text-amber-200'
                        : 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200'
                  }
                >
                  Software Impact: {selected.softwareImpact}
                </Badge>
              </div>

              <div className="overflow-auto rounded-2xl border border-white/10 bg-slate-950/30">
                <table className="w-full min-w-[1180px] text-left text-xs">
                  <thead className="text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-2 py-2">
                        <Tooltip content="Official name of this obligation as it appears in the framework.">Title</Tooltip>
                      </th>
                      <th className="px-2 py-2">
                        <Tooltip content="Regulation: legally binding requirements. Standard: technical/consensus specification. Guidance: non-binding recommendations/interpretation. Certification: attestation that criteria are met. License: authorization to operate/market.">Category</Tooltip>
                      </th>
                      <th className="px-2 py-2">
                        <Tooltip content="Primary governing body and jurisdictional region tied to the obligation.">Jurisdiction</Tooltip>
                      </th>
                      <th className="px-2 py-2">
                        <Tooltip content="Enterprise = internal systems that support regulated operations; Lab = affects laboratory workflow/reportability; Device = medical device software/SaMD or software that is a device function/clinical claim.">Software Type</Tooltip>
                      </th>
                      <th className="px-2 py-2">
                        <Tooltip content="Risk-calibrated impact on delivery rigor and evidence expectations.">Software Impact</Tooltip>
                      </th>
                      <th className="px-2 py-2 text-emerald-200">
                        <Tooltip content="What the obligation requires you to do and prove (translated into software meaning).">What it means</Tooltip>
                      </th>
                      <th className="px-2 py-2">
                        <Tooltip content="Explicit software behaviors and evidence touchpoints this item typically triggers.">Impact Areas</Tooltip>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-white/10">
                      <td className="px-2 py-2 font-medium text-slate-100">{selected.title}</td>
                      <td className="px-2 py-2">{selected.category}</td>
                      <td className="px-2 py-2">{selected.jurisdiction}</td>
                      <td className="px-2 py-2">{selected.softwareTypes.join(', ')}</td>
                      <td className="px-2 py-2">
                        <Badge
                          className={
                            selected.softwareImpact === 'High'
                              ? 'border-rose-400/40 bg-rose-500/15 text-rose-200'
                              : selected.softwareImpact === 'Moderate'
                                ? 'border-amber-400/40 bg-amber-500/15 text-amber-200'
                                : 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200'
                          }
                        >
                          {selected.softwareImpact}
                        </Badge>
                      </td>
                      <td className="px-2 py-2 text-emerald-100">{selected.softwareRelevance}</td>
                      <td className="px-2 py-2">
                        <div className="flex flex-wrap gap-2">
                          {softwareImpactAreasFor(selected).map((area) => (
                            <span
                              key={area}
                              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] leading-none font-medium text-slate-100"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card className="overflow-x-auto">
        <div className="max-h-[58vh] overflow-auto">
          <table className="w-full min-w-[1180px] text-left text-xs">
            <thead className="sticky top-0 bg-slate-900 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-2 py-2">
                  <Tooltip content="Official name of this obligation as it appears in the framework.">Title</Tooltip>
                </th>
                <th className="px-2 py-2">
                  <Tooltip content="Regulation: legally binding requirements. Standard: technical/consensus specification. Guidance: non-binding recommendations/interpretation. Certification: attestation that criteria are met. License: authorization to operate/market.">Category</Tooltip>
                </th>
                <th className="px-2 py-2">
                  <Tooltip content="Primary governing body and jurisdictional region tied to the obligation.">Jurisdiction</Tooltip>
                </th>
                <th className="px-2 py-2">
                  <Tooltip content="Enterprise = internal systems that support regulated operations; Lab = affects laboratory workflow/reportability; Device = medical device software/SaMD or software that is a device function/clinical claim.">Software Type</Tooltip>
                </th>
                <th className="px-2 py-2">
                  <Tooltip content="Risk-calibrated impact on delivery rigor and evidence expectations.">Software Impact</Tooltip>
                </th>
                <th className="px-2 py-2 text-emerald-200">
                  <Tooltip content="Compact software touchpoints this obligation typically triggers (device meaning first, software implications second).">Software Impact Areas</Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`cursor-pointer border-t border-white/10 hover:bg-white/5 ${
                    selected?.id === item.id ? 'bg-white/8' : ''
                  }`}
                >
                  <td className="px-2 py-2 font-medium text-slate-100">{item.title}</td>
                  <td className="px-2 py-2">{item.category}</td>
                  <td className="px-2 py-2">{item.jurisdiction}</td>
                  <td className="px-2 py-2">{item.softwareTypes.join(', ')}</td>
                  <td className="px-2 py-2">
                    <Badge
                      className={
                        item.softwareImpact === 'High'
                          ? 'border-rose-400/40 bg-rose-500/15 text-rose-200'
                          : item.softwareImpact === 'Moderate'
                            ? 'border-amber-400/40 bg-amber-500/15 text-amber-200'
                            : 'border-emerald-400/40 bg-emerald-500/15 text-emerald-200'
                      }
                    >
                      {item.softwareImpact}
                    </Badge>
                  </td>
                  <td className="px-2 py-2">
                    <ul className="max-w-[360px] list-disc pl-4 text-[11px] leading-tight text-slate-300">
                      {softwareImpactAreasFor(item).slice(0, 3).map((area) => (
                        <li key={area}>{area}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export function ClassificationModelPage() {
  return (
    <div className="space-y-4">
      
      <ClassificationAssessment />
    </div>
  )
}

export function SDLCLanesPage() {
  return (
    <div className="space-y-4">
      <SDLCStaircase lanes={lanes} />
    </div>
  )
}

export function LifecycleArchitecturePage() {
  return (
    <div className="space-y-4">
      <LifecycleSwimlane phases={lifecyclePhases} />
    </div>
  )
}

export function EvidenceArchitecturePage() {
  return (
    <div className="space-y-4">
      <EvidenceVault binders={binders} />
    </div>
  )
}

export function GovernanceModelPage() {
  return (
    <div className="space-y-4">
      <GovernanceDecisionArchitecture layers={governanceLayers} roles={functionalRoles} />
    </div>
  )
}

export function ApprovalMatrixPage() {
  const phaseBadgeClasses = (stage: string) => {
    if (stage === 'Phase 4' || stage === 'Phase 1-4') return 'border-violet-400/35 bg-violet-500/12 text-violet-200'
    if (stage === 'Phase 5') return 'border-emerald-400/35 bg-emerald-500/12 text-emerald-200'
    if (stage === 'Post-Release') return 'border-rose-400/35 bg-rose-500/12 text-rose-200'
    return 'border-indigo-400/35 bg-indigo-500/12 text-indigo-200'
  }

  const phaseSubLabel = (stage: string) => {
    if (stage === 'Phase 0') return 'Phase 0 — Intake & Classification'
    if (stage === 'Phase 1') return 'Phase 1 — Planning & Requirements'
    if (stage === 'Phase 2') return 'Phase 2 — Architecture & Design'
    if (stage === 'Phase 4') return 'Phase 4 — Verification & Validation'
    if (stage === 'Phase 5') return 'Phase 5 — Release & Deployment'
    if (stage === 'Phase 1-4') return 'Phase 1-4 — Continuous Risk Management'
    return 'Post-Release — Change Control'
  }

  const splitRoleTokens = (s: string) => s.split(/\s*\+\s*/g).filter(Boolean)

  return (
    <div className="space-y-3">
      <ApprovalFlow tiers={riskTiers} />

      <Card className="bg-white/5 p-4">
        <SectionTitle title="Stage accountability matrix" subtitle="Who authors, reviews, and approves each governance package" />
        <div className="overflow-auto rounded-2xl border border-white/10 bg-slate-950/35 shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
          <table className="w-full min-w-[980px] text-left text-[13px]">
            <thead className="text-xs uppercase tracking-wider text-slate-400 bg-white/[0.02]">
              <tr>
                <th className="px-3 py-2.5">Stage / Artifact</th>
                <th className="px-3 py-2.5 text-blue-300">Author</th>
                <th className="px-3 py-2.5 text-violet-300">Reviewer(s)</th>
                <th className="px-3 py-2.5 text-emerald-300">Approver(s)</th>
              </tr>
            </thead>
            <tbody>
              {approvalStages.map((a) => (
                <tr key={a.artifactPackage} className="border-t border-white/10 transition-colors duration-150 hover:bg-white/[0.04]">
                  <td className="px-3 py-2.5 text-slate-100">
                    <div className="flex items-start gap-2">
                      <span className={`mt-0.5 inline-flex rounded-md border px-2 py-0.5 text-[11px] font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.03)] ${phaseBadgeClasses(a.stage)}`}>
                        {a.stage.replace('Phase ', '')}
                      </span>
                      <div>
                        <div className="text-slate-100 font-medium leading-5">{a.artifactPackage}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-4">{phaseSubLabel(a.stage)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {splitRoleTokens(a.author).map((role) => (
                        <span key={`${a.artifactPackage}-author-${role}`} className="rounded-md border border-blue-400/25 bg-blue-500/12 px-2 py-0.5 text-[11px] font-medium text-blue-200">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {a.reviewers.map((role) => (
                        <span key={`${a.artifactPackage}-reviewer-${role}`} className="rounded-md border border-violet-400/25 bg-violet-500/12 px-2 py-0.5 text-[11px] font-medium text-violet-200">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {a.approvers.map((role) => (
                        <span key={`${a.artifactPackage}-approver-${role}`} className="rounded-md border border-emerald-400/25 bg-emerald-500/12 px-2 py-0.5 text-[11px] font-medium text-emerald-200">
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export function TraceabilityStudioPage() {
  const [selectedId, setSelectedId] = useState<string | null>(traceLinks[0]?.id ?? null)

  return (
    <div className="space-y-4">
      <TraceabilityProofGraph links={traceLinks} selectedId={selectedId} onSelect={setSelectedId} />
    </div>
  )
}

export function ComplianceRiskHotspotsPage() {
  return (
    <div className="space-y-4">
      <RiskHeatBoard hotspots={complianceHotspots} />
    </div>
  )
}
