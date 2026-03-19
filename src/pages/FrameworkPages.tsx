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
  const t = `${item.title} ${item.governingBody} ${item.jurisdiction}`.toLowerCase()
  const areas = new Set<string>()
  const add = (s: string) => areas.add(s)

  // Always-relevant, meaning-first framing translated into implementation touchpoints.
  add('Intended-use & claim boundaries → device software behavior')
  add('Evidence expectations across lifecycle gates')
  add('Governance & release authorization packages')

  // Drug / device definition anchors.
  if (t.includes('201(g)')) add('Drug-definition mapping for intended-use boundaries')
  if (t.includes('201(h)')) add('Device-definition mapping for intended-use boundaries')

  // Registration / listing / premarket governance.
  if (t.includes('807 subpart e')) add('510(k) premarket evidence packaging for software changes')
  else if (t.includes('21 cfr part 807')) add('Establishment registration & device listing evidence')
  if (t.includes('21 cfr part 814')) add('PMA evidence and safety/effectiveness rationale')
  if (t.includes('21 cfr part 812')) add('IDE clinical study controls for investigational device software')

  // Design controls / QMS.
  if (t.includes('21 cfr part 820') || t.includes('quality system')) add('Design controls and CGMP governance for device software')
  if (t.includes('iso 13485')) add('QMS design-control discipline for software lifecycle')

  // Labeling, reporting, and classification.
  if (t.includes('21 cfr part 801')) add('Labeling & claims control for intended use')
  if (t.includes('21 cfr part 803')) add('MDR adverse-event & malfunction reporting workflow')
  if (t.includes('21 cfr part 860')) add('Device classification controls setting regulatory depth')

  // Software boundary and cybersecurity anchors.
  if (t.includes('520(o)')) add('Software-function boundary mapping for device applicability')
  if (t.includes('524b')) add('Cybersecurity plan, SBOM, and postmarket vulnerability monitoring')

  // Electronic records / signatures / auditability.
  if (t.includes('21 cfr part 11') || t.includes('part 11') || t.includes('annex 11') || t.includes('audit trail')) {
    add('Electronic records & signatures (auditability & retention)')
    add('Role-based authorization and controlled access for regulated actions')
  }

  // Privacy and PHI handling.
  if (t.includes('gdpr')) {
    add('Privacy governance for personal data (lawful basis & rights)')
    add('Security safeguards aligned to data protection expectations')
  }
  if (t.includes('hipaa')) {
    add('PHI safeguards (access, auditability, safeguards)')
    add('Role-based authorization for regulated access to health information')
  }

  // Lab / diagnostic workflow impact.
  if (t.includes('42 cfr part 493') || t.includes('clia') || t.includes('cap')) {
    add('Lab workflow and result traceability requirements')
    add('Controlled retention for test outcomes and decision history')
  }
  if (t.includes('ivdr') || t.includes('in vitro') || t.includes('2017/746')) add('Diagnostic decision impact and evidence-backed result handling')

  // Safety / risk management standards.
  if (t.includes('iec 62304') || t.includes('62304')) add('Safety-class lifecycle rigor (development, verification, V&V)')
  if (t.includes('iso 14971') || t.includes('14971')) add('Risk management lifecycle evidence (hazards → controls → residual risk)')
  if (t.includes('gamp 5') || t.includes('gamp')) add('Risk-based validation planning for computerized systems')
  if (t.includes('iec 81001-5-1') || t.includes('81001-5-1') || t.includes('cybersecurity')) add('Cybersecurity lifecycle evidence (threat model, SBOM, security testing)')
  if (t.includes('iec 62366') || t.includes('62366')) add('Usability engineering and user-error controls')

  // Jurisdiction anchors.
  if (t.includes('pmda')) add('PMDA SaMD evidence and postmarket obligations')

  // Keep it crisp for a client-quality side panel.
  return Array.from(areas).slice(0, 8)
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
