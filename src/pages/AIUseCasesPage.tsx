import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react'
import { Card } from '../components/ui'
import type { ReactNode } from 'react'

type UseCaseGroupId = 'g1' | 'g2' | 'g3' | 'g4'

type UseCase = {
  id: string
  title: string
  groupId: UseCaseGroupId
  lane: string
  standards: string[]
  problemStatement: string
  currentState: string[]
  aiEnablement: string[]
  futureState: string
  businessValue: string[]
  recommendedVisual: string
}

type UseCaseGroup = {
  id: UseCaseGroupId
  label: string
  accent: string
}

const USE_CASE_GROUPS: UseCaseGroup[] = [
  { id: 'g1', label: 'AI CLINICAL & LDT', accent: '#4F46E5' },
  { id: 'g2', label: 'QUALITY & LAB SYSTEMS', accent: '#0F766E' },
  { id: 'g3', label: 'ENTERPRISE & SECURITY', accent: '#C2410C' },
  { id: 'g4', label: 'MARKET & POST-MARKET', accent: '#BE123C' },
]

const USE_CASES: UseCase[] = [
  {
    id: 'UC-01',
    title: 'AI-Assisted Clinical Decision Support (SaMD)',
    groupId: 'g1',
    lane: 'D',
    standards: ['IEC 62304 Class C', 'ISO 14971', 'EU MDR', 'FDA SaMD Guidance', 'NIST AI RMF'],
    problemStatement:
      'Clinical AI models evolve continuously while regulated change control remains deterministic, creating ambiguity on revalidation, risk updates, and re-submission requirements for each model update.',
    currentState: [
      'Model versioning tracked informally in MLflow or notebooks and not linked to regulatory records',
      "No defined threshold for 'significant change' versus minor drift",
      'Risk Management File drafted at launch and not updated with retraining',
      'Clinical validation evidence fragmented across notebooks, reports, and email threads',
      'QA learns of model updates after deployment',
      'FDA SaMD submission trigger decisions debated case-by-case',
      'Post-market monitoring limited to basic dashboard alerts',
    ],
    aiEnablement: [
      'Automated change significance classifier for model delta, drift, and intended use impact',
      'AI-drafted clinical evaluation narrative from PMCF/PMSF and model card inputs',
      'Real-time traceability gap detector linking model version to evidence and controls',
      'Post-market drift monitor with threshold-triggered review workflow',
      'Regulation watcher for FDA/EMA AI guidance updates',
    ],
    futureState:
      'Every model update is assessed in under 24 hours with logic-driven pathway decisions and automatically assembled evidence packages.',
    businessValue: [
      'Reduce time-to-regulatory-decision for AI updates from weeks to hours',
      'Eliminate retrospective validation through automated gate enforcement',
      'Reduce outside counsel spend on pathway decisions by 60-80%',
      'Demonstrate predetermined change control readiness for FDA AI/ML SaMD guidance',
      'Scale to larger model portfolios without proportional headcount growth',
    ],
    recommendedVisual:
      'Horizontal flow: Model Retrain Event -> Change Delta Analysis -> Significance Gate -> Pathway Selection -> Evidence Assembly -> Approval -> Post-Market Monitor, with AI nodes highlighted.',
  },
  {
    id: 'UC-02',
    title: 'Molecular Diagnostics / LDT Software Platform (Lab Software)',
    groupId: 'g1',
    lane: 'C-D',
    standards: ['IEC 62304', 'CLIA', 'CAP', '21 CFR Part 493', 'FDA LDT Guidance', 'ISO 15189'],
    problemStatement:
      'LDT software sits in a classification gray zone, and many labs lack formal SDLC rigor as FDA LDT enforcement expectations increase.',
    currentState: [
      "Classification not formally assessed and treated as 'just a lab tool'",
      'No SOUP inventory for open-source bioinformatics dependencies',
      'Validation focused on analytical performance with limited software verification',
      'Weak traceability between clinical requirements and software decisions',
      'Release approval informal and person-dependent',
      'No inspection-ready lifecycle evidence when enforcement pressure rises',
    ],
    aiEnablement: [
      'SOUP dependency scanner with regulatory risk register generation',
      'Questionnaire-based LDT classification assistant with rationale output',
      'Algorithm change impact assessor for re-validation determination',
      'Evidence completeness monitor mapped to ISO 15189 and CLIA expectations',
    ],
    futureState:
      'Lab software is formally classified and validated to the appropriate IEC 62304 safety class, with automated SOUP inventory and controlled change assessment.',
    businessValue: [
      'Avoid FDA 483 observations and warning letters for unregistered software devices',
      'Maintain CAP accreditation through documented software validation',
      'Reduce algorithm change deployment friction without reducing compliance',
      'Create a repeatable compliance model across multiple LDT platforms',
    ],
    recommendedVisual:
      'Split-lane lifecycle view with CLIA/CAP validation layer above IEC 62304 SDLC, including AI overlays for SOUP scanning, change assessment, and evidence completeness.',
  },
  {
    id: 'UC-03',
    title: 'Enterprise Healthcare Workflow Platform (Non-Device Software)',
    groupId: 'g3',
    lane: 'B',
    standards: ['GAMP 5', '21 CFR Part 11', 'HIPAA Security Rule', 'ISO 27001', 'SOC 2 Type II'],
    problemStatement:
      'Enterprise healthcare workflow systems often bypass formal validation despite electronic records, privacy, and audit obligations.',
    currentState: [
      'Agile deployments proceed with little formal validation evidence',
      'Part 11 applicability and e-signature/audit-trail controls under-assessed',
      'HIPAA safeguard evidence scattered and inconsistent',
      'SOC 2 scope gaps due to missing system evidence',
      'Supplier qualification and change impact controls inconsistently applied',
    ],
    aiEnablement: [
      'Part 11 applicability scanner against system functions',
      'Supplier qualification assistant using SOC 2 and ISO evidence inputs',
      'HIPAA safeguard gap analyzer with prioritized actions',
      'Change impact assessor for PR/release notes against compliance functions',
    ],
    futureState:
      'Each enterprise healthcare system has a formal compliance classification, right-sized validation package, and automated compliance impact checks for all changes.',
    businessValue: [
      'Accelerate client security reviews by about 50% using pre-packaged evidence',
      'Reduce surprise audit findings through proactive gap detection',
      'Improve M&A diligence outcomes through documented compliance posture',
      'Lower remediation cost during CMS and external audits',
    ],
    recommendedVisual:
      'GAMP 5 category pyramid with mapped systems, compliance workflow overlay, and AI-driven gap heat map.',
  },
  {
    id: 'UC-04',
    title: 'AI/ML Predictive Analytics Platform (Adaptive Algorithm Software)',
    groupId: 'g1',
    lane: 'B-D',
    standards: ['FDA AI/ML SaMD Guidance', 'NIST AI RMF', 'EU AI Act', 'ISO 14971', 'IEC 62304'],
    problemStatement:
      'Predictive AI platforms face dual compliance pressure (SaMD and EU AI Act), but most organizations have policy documents rather than executable governance systems.',
    currentState: [
      'AI governance exists as policy without operational controls',
      'Model lifecycle run by data science with limited QA integration',
      'No formal fairness testing against protected populations',
      'EU AI Act requirements not mapped to delivery process',
      'Post-market monitoring not linked to compliance triggers',
    ],
    aiEnablement: [
      'Automated model card generation from training and performance metadata',
      'EU AI Act conformity assistant mapping Annex III and Article 9 obligations',
      'Bias evaluation workflow with subgroup testing and structured reports',
      'Post-market performance monitor tied to regulatory review thresholds',
    ],
    futureState:
      'Every model release ships with complete, version-controlled compliance artifacts for FDA and EU obligations through one operating framework.',
    businessValue: [
      'Reach EU AI Act readiness before enforcement deadlines',
      'Reduce FDA AI/ML submission preparation time by around 60%',
      'Strengthen enterprise trust with defensible ethical AI evidence',
      'Lower institutional liability through documented bias assessment',
    ],
    recommendedVisual:
      'Dual-compliance matrix with FDA AI/ML pathway axis and EU AI Act axis, showing shared controls and lifecycle checkpoints.',
  },
  {
    id: 'UC-05',
    title: 'GxP Quality Management System (QMS Workflow Tooling)',
    groupId: 'g2',
    lane: 'B',
    standards: ['GAMP 5 Cat 4', '21 CFR Part 11', 'FDA 21 CFR Part 820', 'ISO 13485', 'EU GMP Annex 11'],
    problemStatement:
      'QMS tools are often deployed without formal CSV, putting evidentiary records at risk because the platform itself is not validated.',
    currentState: [
      'Vendor documentation used without site-specific IQ/OQ/PQ',
      'Part 11 assessment and e-signature configuration documentation incomplete',
      'Upgrade cadence not linked to re-qualification requirements',
      'Configuration baseline and change control inconsistently enforced',
      'Audit trail behavior assumed rather than tested',
    ],
    aiEnablement: [
      'Configuration baseline monitor for unauthorized changes',
      'Automated IQ/OQ/PQ script generator from system context',
      'Vendor update impact assessor for re-test scoping',
      'Audit trail integrity checker with periodic sampling',
    ],
    futureState:
      'QMS platform remains continuously validated with documented baseline, controlled upgrades, and formalized Part 11 evidence.',
    businessValue: [
      'Eliminate common FDA 483 findings linked to unvalidated computer systems',
      'Protect evidentiary value of CAPA, deviation, complaint, and training records',
      'Reduce future validation effort with reusable protocol assets',
      'Strengthen EU Annex 11 posture for European operations',
    ],
    recommendedVisual:
      'GAMP 5 V-model with traceability matrix (requirements to IQ/OQ/PQ) and configuration baseline monitoring panel.',
  },
  {
    id: 'UC-06',
    title: 'Electronic Lab Notebook (ELN) / LIMS Validation',
    groupId: 'g2',
    lane: 'B-C',
    standards: ['21 CFR Part 11', 'FDA 21 CFR Part 58 (GLP)', 'ICH E6', 'ALCOA+', 'GAMP 5'],
    problemStatement:
      'When ELN/LIMS validation is weak, raw data integrity and the defensibility of submission-supporting datasets are put at risk.',
    currentState: [
      'ELN rollout completed with limited vendor qualification rigor',
      'ALCOA+ principles not formally tested in system operation',
      'Legacy record migration executed without robust migration validation',
      'Access control and e-signature setup under-documented',
      'Instrument integrations lack formal data transfer validation',
      'Backup and recovery controls not regularly tested',
    ],
    aiEnablement: [
      'ALCOA+ data integrity analyzer for anomalies and backdating patterns',
      'Instrument integration validator for source-to-target transfer checks',
      'Access control auditor against approved permission matrix',
      'Migration completeness checker for legacy record integrity',
    ],
    futureState:
      'ELN/LIMS platforms are validated to appropriate GAMP standards with continuously monitored data integrity and verified integration controls.',
    businessValue: [
      'Protect R&D investment with defensible IND/NDA-supporting datasets',
      'Reduce GLP inspection findings that impact non-clinical programs',
      'Improve readiness for electronic submission evidence formats',
      'Compress audit preparation from weeks to days',
    ],
    recommendedVisual:
      'ALCOA+ function heat map, integration validation matrix, and anomaly-monitoring dashboard.',
  },
  {
    id: 'UC-07',
    title: 'Cybersecurity-Driven Software Change Management (SaMD Security Update)',
    groupId: 'g3',
    lane: 'C-D',
    standards: ['FDA Cybersecurity Guidance 2023', 'NIST SP 800-53', 'IEC 62304 §8', 'IEC 81001-5-1', 'MDCG 2019-16'],
    problemStatement:
      'Security vulnerability handling and regulated change control are often disconnected, delaying remediation and increasing risk.',
    currentState: [
      'CVE/NVD monitoring performed without SDLC change-control integration',
      'SBOM absent or weakly governed',
      'Security patches bypass regulated IEC 62304 change workflows',
      'Cybersecurity risk not integrated into ISO 14971 risk records',
      'FDA cyber guidance expectations only partially operationalized',
      'Post-market vulnerability management is reactive rather than continuous',
    ],
    aiEnablement: [
      'Automated SBOM generation and CVE monitoring with alerting',
      'Cyber risk integrator mapping vulnerabilities into risk file context',
      'Patch impact analyzer for significant-vs-minor change routing',
      'FDA cybersecurity submission assistant for documentation packaging',
    ],
    futureState:
      'Every new vulnerability flows through one integrated security-to-compliance pipeline with documented risk linkage, controlled patching, and post-market traceability.',
    businessValue: [
      'Meet FDA 2023 cybersecurity expectations including SBOM and patch governance',
      'Reduce critical vulnerability remediation timeline from months to weeks',
      'Lower enforcement and market trust risk tied to cybersecurity gaps',
      'Strengthen procurement posture with demonstrable cyber resilience',
    ],
    recommendedVisual:
      'CVE intake -> SBOM match -> clinical impact assessment -> change control routing -> patch deployment -> monitoring loop with ISO 14971 risk overlay.',
  },
  {
    id: 'UC-08',
    title: 'Electronic Records & Signatures Implementation (21 CFR Part 11 / EU Annex 11)',
    groupId: 'g3',
    lane: 'B-D',
    standards: ['21 CFR Part 11', 'EU GMP Annex 11', 'ICH Q10', 'ISO/IEC 27001', 'NIST SP 800-63'],
    problemStatement:
      'Part 11 gaps are typically validation and procedural gaps, not technology gaps, and evidence quality remains the primary failure point.',
    currentState: [
      'Part 11 applicability not consistently completed by system',
      'Attribution controls weakened by shared admin practices',
      'Audit trails enabled but not tested for completeness and immutability',
      'Training authorization records not tightly linked to e-signature use',
      'Periodic security/access reviews are inconsistent',
      'FDA and EU assessments run separately with duplicated effort',
    ],
    aiEnablement: [
      'Part 11 applicability matrix generator across systems',
      'Audit trail completeness analyzer with sampling logic',
      'Hybrid record inventory with remediation suggestions',
      'Unified Part 11 and Annex 11 gap assessment mapping',
    ],
    futureState:
      'Electronic record systems are formally assessed, validated, and continuously monitored through a unified FDA/EU framework and single evidence package.',
    businessValue: [
      'Reduce frequent FDA data integrity deficiency categories',
      'Support Annex 11 readiness for EU operations',
      'Accelerate audit trail evidence response from days to hours',
      'Enable retirement of parallel paper record pathways',
    ],
    recommendedVisual:
      'Part 11 control checklist with status indicators, audit trail test matrix, and hybrid-record heat map.',
  },
  {
    id: 'UC-09',
    title: 'Multi-Market Regulatory Submission Software (EU MDR + FDA Dual Compliance)',
    groupId: 'g4',
    lane: 'D',
    standards: ['EU MDR 2017/745', 'FDA 21 CFR Part 820', 'IEC 62304', 'ISO 14971', 'IMDRF SaMD Framework'],
    problemStatement:
      'Dual-market SaMD submissions duplicate effort and create quality drift when evidence architecture is not harmonized across frameworks.',
    currentState: [
      'Separate EU Technical File and FDA DHF with major duplication and version mismatch risk',
      'Risk and clinical narratives rewritten in different structures for each market',
      'No single source of truth for software lifecycle evidence',
      'Post-market obligations tracked in separate systems and workflows',
      'Conflicting guidance from authorities lacks structured reconciliation',
    ],
    aiEnablement: [
      'Dual-classification assistant for EU and FDA mapping in one workflow',
      'Evidence harmonizer for shared versus market-specific obligations',
      'GSPR to design control mapper for unified traceability',
      'Post-market data consolidator for parallel reporting structures',
    ],
    futureState:
      'One unified evidence architecture serves both markets with market-specific formatting generated at export time.',
    businessValue: [
      'Reduce dual-market documentation cost by 40-50%',
      'Lower inconsistency risk between market-specific packages',
      'Improve review-cycle quality and speed across authorities',
      'Scale to additional jurisdictions without rebuilding the core framework',
    ],
    recommendedVisual:
      'Side-by-side EU Technical File and FDA DHF structure with shared evidence blocks and output formatting layer.',
  },
  {
    id: 'UC-10',
    title: 'Post-Market Surveillance & Vigilance Automation (Continuous Compliance)',
    groupId: 'g4',
    lane: 'C-D',
    standards: ['EU MDR Article 83-87', 'FDA 21 CFR Part 803', 'ISO 14971 §10', 'IMDRF PMS Framework', 'IEC 62304 §9'],
    problemStatement:
      'Post-market surveillance for regulated software remains fragmented and reactive, with manual reporting and delayed signal handling creating regulatory liability.',
    currentState: [
      'Complaint systems not linked to risk file or reportability thresholds',
      'Literature surveillance performed manually with weak traceability',
      'Serious incident determination lacks consistent criteria and rationale capture',
      'PSUR and PMCF outputs assembled reactively',
      'Model performance signals not linked to regulatory process',
      'Trend analysis for non-serious complaint signals is limited',
    ],
    aiEnablement: [
      'Signal detection engine using NLP across complaints and support data',
      'Serious incident classifier against MDR/FDA reportability criteria',
      'Literature monitor with relevance and clinical impact scoring',
      'PSUR and PMCF auto-drafter from aggregated post-market evidence',
      'Risk file updater trigger based on signal trend movement',
    ],
    futureState:
      'Continuous post-market intelligence links incoming signals, reportability logic, and risk file updates with automated evidence assembly for periodic reporting.',
    businessValue: [
      'Meet EU MDR PSUR obligations with lower manual workload',
      'Reduce late reporting risk with near-real-time incident classification',
      'Improve product quality through earlier trend detection',
      'Build stronger evidence for lifecycle extension and label expansion decisions',
    ],
    recommendedVisual:
      'Post-market intelligence funnel: Raw Signals -> Signal Detection -> Impact Assessment -> Regulatory Reporting Gate -> Risk File Update with continuous monitoring loop.',
  },
]

function FieldTableRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <tr className="border-t border-white/10">
      <td className="py-2 pr-3 align-top text-[11px] uppercase tracking-[0.12em] text-slate-500">{label}</td>
      <td className="py-2 align-top text-[12px] text-slate-200 break-words">{value}</td>
    </tr>
  )
}

/** Matches Artifact Library list body: Inter / system sans, 12px, slate-200 */
function listValue(items: string[]) {
  return (
    <ul className="list-disc space-y-1 pl-5 font-sans text-[12px] leading-6 text-slate-200">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function AIFlowStrip({ narrative }: { narrative: string }) {
  const steps = useMemo(() => narrative.split('->').map((part) => part.trim()).filter(Boolean), [narrative])
  return (
    <div className="uc-flow-strip max-w-full rounded-lg border border-indigo-400/30 bg-indigo-500/10 p-2">
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((step, index) => (
          <div key={`${step}-${index}`} className="flex max-w-full items-center gap-2">
            <span className="max-w-full break-words whitespace-normal rounded-md border border-indigo-300/60 bg-indigo-400/15 px-2.5 py-1 text-[11px] font-medium text-indigo-100">{step}</span>
            {index < steps.length - 1 ? <ChevronRight size={13} className="text-indigo-300" /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function NarrativeSection({
  label,
  color,
  children,
  tinted = false,
}: {
  label: string
  color: string
  children: ReactNode
  tinted?: boolean
}) {
  return (
    <section
      className="h-full rounded-xl border border-white/10 p-3 font-sans text-[12px] leading-6 text-slate-200"
      style={{
        backgroundColor: tinted ? 'rgba(109,40,217,0.06)' : 'transparent',
        borderLeft: `2px solid ${color}`,
      }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-5 w-1 shrink-0 rounded-full" style={{ backgroundColor: color }} />
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color }}>
          {label}
        </p>
      </div>
      {children}
    </section>
  )
}

function UseCaseTemplateCard({
  useCase,
  accent,
  expanded,
  onToggle,
}: {
  useCase: UseCase
  accent: string
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="uc-usecase-card font-sans">
      <div
        className="rounded-2xl border border-white/10 bg-slate-900/40 p-4"
        style={{
          borderLeftWidth: 3,
          borderLeftColor: accent,
        }}
      >
        <button type="button" onClick={onToggle} className="w-full text-left" aria-expanded={expanded}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center rounded-full border border-indigo-300/50 bg-indigo-500/20 px-2.5 py-1 text-[11px] font-semibold text-indigo-100">
                  {useCase.id}
                </span>
                <span className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-2 py-1 text-[10px] font-semibold text-slate-200">Lane {useCase.lane}</span>
              </div>
              <h3 className="mt-2 text-[16px] font-extrabold tracking-[-0.01em] text-slate-100">{useCase.title}</h3>
              <p className="mt-1 text-[11px] leading-5 text-slate-400">{useCase.problemStatement}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[12px] font-semibold text-slate-200">
              {expanded ? (
                <>
                  Hide Details <ChevronDown size={14} />
                </>
              ) : (
                <>
                  View Details <ChevronRight size={14} />
                </>
              )}
            </span>
          </div>
        </button>

        {expanded ? (
          <div className="mt-4 space-y-1">
            <table className="w-full border-collapse text-left font-sans text-[12px] text-slate-200">
              <tbody>
                <FieldTableRow label="Use Case ID" value={<span className="font-mono text-slate-100">{useCase.id}</span>} />
                <FieldTableRow label="Title" value={<span className="text-slate-200">{useCase.title}</span>} />
                <FieldTableRow label="Lane" value={<span className="text-slate-200">{useCase.lane}</span>} />
                <FieldTableRow label="Applicable Standards" value={listValue(useCase.standards)} />
              </tbody>
            </table>

            <div className="mt-6 space-y-4">
              <div className="grid gap-3 xl:grid-cols-4">
                <NarrativeSection label="Problem Statement" color="#e11d48">
                  <p className="font-sans text-[12px] leading-6 text-slate-200">{useCase.problemStatement}</p>
                </NarrativeSection>

                <NarrativeSection label="Current State" color="#d97706">
                  {listValue(useCase.currentState)}
                </NarrativeSection>

                <NarrativeSection label="AI Enablement" color="#6d28d9" tinted>
                  {listValue(useCase.aiEnablement)}
                </NarrativeSection>

                <NarrativeSection label="Future State" color="#0d9488">
                  <p className="font-sans text-[12px] leading-6 text-slate-200">{useCase.futureState}</p>
                </NarrativeSection>
              </div>

              <NarrativeSection label="Business Value" color="#3b4bc8">
                <div className="flex flex-wrap gap-2">
                  {useCase.businessValue.map((metric) => (
                    <span key={metric} className="max-w-full break-words whitespace-normal rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                      {metric}
                    </span>
                  ))}
                </div>
              </NarrativeSection>

              <section className="font-sans text-[12px] leading-6 text-slate-200">
                <AIFlowStrip narrative={useCase.recommendedVisual} />
              </section>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default function AIUseCasesPage() {
  const [expandedGroups, setExpandedGroups] = useState<Record<UseCaseGroupId, boolean>>({ g1: true, g2: false, g3: false, g4: false })
  const [selectedUseCaseId, setSelectedUseCaseId] = useState<string>(USE_CASES[0]?.id ?? 'UC-01')
  const [detailExpanded, setDetailExpanded] = useState(true)

  const groupedUseCases = useMemo(
    () =>
      USE_CASE_GROUPS.map((group) => ({
        ...group,
        useCases: USE_CASES.filter((item) => item.groupId === group.id),
      })),
    []
  )

  const selectedUseCase = useMemo(
    () => USE_CASES.find((item) => item.id === selectedUseCaseId) ?? USE_CASES[0] ?? null,
    [selectedUseCaseId]
  )

  useEffect(() => {
    if (!selectedUseCase) return
    setExpandedGroups({
      g1: selectedUseCase.groupId === 'g1',
      g2: selectedUseCase.groupId === 'g2',
      g3: selectedUseCase.groupId === 'g3',
      g4: selectedUseCase.groupId === 'g4',
    })
    const node = document.querySelector(`[data-usecase-node="${selectedUseCase.id}"]`)
    if (node instanceof HTMLElement) {
      setTimeout(() => node.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80)
    }
  }, [selectedUseCase])

  return (
    <section className="uc-page space-y-4">
      <header className="rounded-xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium text-indigo-200">
          <Sparkles size={16} />
          AI Enablement
        </div>
        <p className="mt-1 text-sm text-slate-200">
          Transformation narratives showing how regulated software teams replace fragmented, reactive compliance with structured, AI-enabled operating models — across SaMD, Lab, GxP, AI/ML, and enterprise healthcare.
        </p>
      </header>

      <div className="grid items-start gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-white/10 bg-slate-900/30 p-4">
          <div className="max-h-[calc(100vh-260px)] space-y-2 overflow-y-auto">
            {groupedUseCases.map((group) => {
              const isExpanded = expandedGroups[group.id]
              return (
                <div key={group.id} className="rounded-xl border border-white/10 bg-transparent p-2">
                  <button
                    type="button"
                    onClick={() => setExpandedGroups((prev) => ({ ...prev, [group.id]: !prev[group.id] }))}
                    className="flex w-full items-center justify-between rounded-md px-1 py-1 text-left"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: group.accent }} />
                      <span className="truncate text-[11px] font-semibold tracking-[0.04em] text-slate-200">{group.label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-slate-200">{group.useCases.length}</span>
                      {isExpanded ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                    </div>
                  </button>

                  {isExpanded ? (
                    <div className="mt-2 space-y-1">
                      {group.useCases.map((useCase) => {
                        const selected = selectedUseCaseId === useCase.id
                        return (
                          <button
                            key={useCase.id}
                            data-usecase-node={useCase.id}
                            type="button"
                            onClick={() => {
                              setSelectedUseCaseId(useCase.id)
                              setDetailExpanded(true)
                            }}
                            className={`w-full rounded-md border px-2 py-1.5 text-left transition ${
                              selected ? 'border-indigo-300/80 bg-indigo-500/20' : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                          >
                            <p className="text-[10px] font-semibold text-slate-400">{useCase.id}</p>
                            <p className="mt-0.5 text-xs font-medium text-slate-100">{useCase.title}</p>
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
          {selectedUseCase ? (
            <UseCaseTemplateCard
              useCase={selectedUseCase}
              accent={USE_CASE_GROUPS.find((group) => group.id === selectedUseCase.groupId)?.accent ?? '#4F46E5'}
              expanded={detailExpanded}
              onToggle={() => setDetailExpanded((prev) => !prev)}
            />
          ) : (
            <Card className="rounded-2xl border border-white/10 bg-slate-900/30 p-8 text-center">
              <p className="text-sm font-semibold text-slate-100">Use Case Overview</p>
              <p className="mt-1 text-sm text-slate-300">Select a use case from the explorer to view the full transformation narrative.</p>
            </Card>
          )}
        </main>
      </div>
    </section>
  )
}
