import { useMemo, useState } from 'react'
import {
  Filter,
  Search,
  X,
} from 'lucide-react'
import { Badge, Card, SectionTitle, Tooltip } from '../components/ui'
import {
  ApprovalFlow,
  BlueprintFlowMap,
  ClassificationDecisionMap,
  EvidenceVault,
  GovernanceDecisionArchitecture,
  GuardrailsTracks,
  FrameworkHeroPoster,
  LifecycleSwimlane,
  RegulatoryOrbitMap,
  RiskHeatBoard,
  SDLCStaircase,
  TraceabilityProofGraph,
} from '../components/framework/Diagrams'
import {
  allUniverseItems,
  approvalStages,
  binders,
  classificationDimensions,
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
import { Link } from 'react-router-dom'

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
  const chapters = [
    { to: '/regulatory-universe', label: 'Regulatory Universe' },
    { to: '/classification-model', label: 'Classification Model' },
    { to: '/sdlc-lanes', label: 'SDLC Lanes' },
    { to: '/lifecycle-architecture', label: 'Lifecycle Architecture' },
    { to: '/evidence-architecture', label: 'Evidence Architecture' },
    { to: '/governance-model', label: 'Governance Model' },
    { to: '/approval-matrix', label: 'Approval Matrix' },
    { to: '/guardrails-paved-roads', label: 'Guardrails & Paved Roads' },
    { to: '/traceability-studio', label: 'Traceability Studio' },
    { to: '/compliance-risk-hotspots', label: 'Compliance Risk Hotspots' },
  ]

  return (
    <div className="space-y-6">
      <FrameworkHeroPoster />

      <div className="grid gap-4 lg:grid-cols-2">
        <RegulatoryOrbitMap items={allUniverseItems} compact />
        <BlueprintFlowMap />
      </div>

      <Card className="bg-gradient-to-br from-violet-500/10 to-slate-950/40">
        <SectionTitle
          title="The client-grade reading order"
          subtitle="Follow the story your auditors expect: obligations → decisions → controlled execution → evidence proof."
        />

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {chapters.map((c, idx) => (
            <Link
              key={c.to}
              to={c.to}
              className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/40 p-4 transition hover:border-white/20 hover:bg-white/5"
            >
              <span className="mt-0.5 inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-slate-200">
                {idx + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100">{c.label}</p>
                <p className="mt-1 text-xs text-slate-400 transition group-hover:text-slate-300">Open chapter</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      <Card className="rounded-2xl border-white/10 bg-slate-900/40 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Outcomes that become true</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-50">A defensible compliance story you can show.</h2>
            <p className="mt-3 text-sm text-slate-300">
              This framework is designed to convert obligations into repeatable delivery controls, then prove those controls through traceable evidence.
            </p>
          </div>

          <div className="w-full lg:max-w-[420px]">
            <div className="space-y-3">
              {[
                'Classification decisions with auditable rationale',
                'Lane-routed execution rigor (design → test → release)',
                'Evidence binders organized for inspection and review',
                'Traceability links that connect risk, requirements, and proof',
              ].map((x) => (
                <div key={x} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400/70" />
                  <p className="text-sm text-slate-300">{x}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export function GuardrailsPavedRoadsPage() {
  return (
    <div className="space-y-4">
      <GuardrailsTracks patterns={guardrailPatterns} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-slate-950/40">
          <SectionTitle title="Compliance Engineering" subtitle="Turning obligations into reusable workflows, tooling, and automation." />
          <div className="space-y-2 text-sm text-slate-300">
            <p>Reusable artifact templates</p>
            <p>Traceability starter kits</p>
            <p>Evidence capture patterns</p>
            <p>Release readiness workflows</p>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-slate-950/40">
          <SectionTitle title="Security by Design + AI Guardrails" subtitle="Security and AI controls injected early, validated, and governed." />
          <div className="space-y-2 text-sm text-slate-300">
            <p>Threat modeling and verification evidence</p>
            <p>SBOM + dependency + secrets scanning</p>
            <p>Accountable review for AI-assisted outputs</p>
            <p>Revalidation decision controls for model/product changes</p>
          </div>
        </Card>
      </div>
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
      <ClassificationDecisionMap dimensions={classificationDimensions} />

      <Card className="bg-white/5">
        <SectionTitle title="Eight assessment dimensions" subtitle="Use the prompts to reach a defensible classification decision" />
        <div className="grid gap-3 lg:grid-cols-2">
          {classificationDimensions.map((d) => (
            <details key={d.id} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <summary className="cursor-pointer list-none">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">{d.id}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-100">{d.name}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Decision prompt</span>
                </div>
              </summary>
              <div className="mt-3 text-sm text-slate-300">
                <p className="text-slate-300">{d.description}</p>
                <p className="mt-2 text-slate-200"><span className="text-slate-400">Prompt:</span> {d.decisionPrompt}</p>
              </div>
            </details>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function SDLCLanesPage() {
  return (
    <div className="space-y-4">
      <SDLCStaircase lanes={lanes} />

      <Card className="bg-white/5">
        <SectionTitle title="Lane escalation logic" subtitle="Classification determines rigor, evidence depth, and governance intensity" />
        <div className="grid gap-3 lg:grid-cols-2">
          {lanes.map((lane) => (
            <details key={lane.id} className="group rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">Lane {lane.id}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-100">{lane.subtitle}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {lane.evidenceDepth}
                  </span>
                </div>
              </summary>
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                <p><span className="text-slate-400">Software type:</span> {lane.softwareType}</p>
                <p><span className="text-slate-400">Examples:</span> {lane.examples.join(', ')}</p>
                <p><span className="text-slate-400">Triggered by:</span> {lane.triggers.join(', ')}</p>
                <p><span className="text-slate-400">Controls required:</span> {lane.controlsRequired.join(', ')}</p>
              </div>
            </details>
          ))}
        </div>
      </Card>
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
      <GovernanceDecisionArchitecture layers={governanceLayers} />

      <Card className="bg-white/5">
        <SectionTitle title="Functional ownership" subtitle="Who owns what across the operating model" />
        <div className="grid gap-3 lg:grid-cols-2">
          {functionalRoles.map((role) => (
            <div key={role.id} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <p className="text-sm font-semibold text-slate-100">{role.role}</p>
              <p className="mt-2 text-sm text-slate-300">{role.owns.join(', ')}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export function ApprovalMatrixPage() {
  return (
    <div className="space-y-4">
      <ApprovalFlow tiers={riskTiers} />

      <Card className="bg-white/5">
        <SectionTitle title="Stage accountability matrix" subtitle="Who authors, reviews, and approves each governance package" />
        <div className="overflow-auto rounded-2xl border border-white/10 bg-slate-950/30">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-3 py-2">Stage / Artifact</th>
                <th className="px-3 py-2">Author</th>
                <th className="px-3 py-2">Reviewer(s)</th>
                <th className="px-3 py-2">Approver(s)</th>
              </tr>
            </thead>
            <tbody>
              {approvalStages.map((a) => (
                <tr key={a.artifactPackage} className="border-t border-white/10">
                  <td className="px-3 py-2 text-slate-100">{a.stage} - {a.artifactPackage}</td>
                  <td className="px-3 py-2">{a.author}</td>
                  <td className="px-3 py-2">{a.reviewers.join(', ')}</td>
                  <td className="px-3 py-2">{a.approvers.join(', ')}</td>
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
