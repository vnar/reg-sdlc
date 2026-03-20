import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, Sparkles, X } from 'lucide-react'
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
  phaseTag?: string
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

function buildFallbackExample(artifact: ArtifactTemplate): PathAIExample {
  const owner = firstOwnerRole(artifact.owner)
  return {
    'Draft context':
      `${artifact.id} (${artifact.name}) pre-populated draft generated from the template baseline for rapid authoring review.`,
    'Suggested pre-filled inputs': [
      `Primary owner: ${owner}`,
      `Phase context: ${artifact.phaseTag ?? inferPhaseLabel(artifact.trigger)}`,
      `Trigger snapshot: ${artifact.trigger}`,
    ],
    'Suggested starter content': [
      `Purpose narrative draft aligned to lane and regulatory context: ${artifact.purpose}`,
      `Required inputs checklist initialized with ${artifact.requiredInputs.length} entries`,
      `Core sections scaffolded with ${artifact.coreSections.length} section headers`,
    ],
    'Review guidance':
      'Review the generated draft for clinical/regulatory intent accuracy, then refine language and add project-specific evidence references before approval.',
  }
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
        phaseTag: 'P0 Concept',
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
        phaseTag: 'P0 Classification',
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
        phaseTag: 'P0 Regulatory Scope',
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
        phaseTag: 'P0 Lane Assignment',
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
        phaseTag: 'P1 Feasibility',
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
        phaseTag: 'P2 Design',
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
          ],
        },
      },
      {
        id: 'ART-007',
        name: 'Cybersecurity Risk Assessment',
        groupId: 'g2',
        phaseTag: 'P2 Design',
        purpose:
          'Documents the cybersecurity threat model, identified vulnerabilities, exploitability assessment, clinical impact evaluation, and cybersecurity controls per FDA 2023 Cybersecurity Guidance and IEC 81001-5-1.',
        trigger: 'Required at P2 for any system with network connectivity, patient data, or SaMD classification; updated at patch events, SBOM updates, and annually.',
        owner: 'CISO / Security Lead (Responsible) · Risk Manager (Accountable)',
        requiredInputs: ['Software architecture', 'SOUP register', 'ART-005 Risk Plan', 'Network/integration diagrams'],
        coreSections: [
          'Threat model (attack surface, threat actors, attack scenarios)',
          'SBOM and vulnerability register',
          'Exploitability assessment per vulnerability',
          'Clinical safety impact per vulnerability',
          'Cybersecurity controls mapped to threats',
          'Residual cybersecurity risk',
          'Patch and update plan',
          'Coordinated vulnerability disclosure process',
        ],
        reviewFrequency: 'Annually; upon new CVEs in SBOM; upon significant architecture change',
        traceabilityLinks: ['→ ART-006 (FMEA)', '→ ART-012 (SOUP Register)', '→ ART-018 (Traceability Matrix)'],
        aiAssistOpportunity:
          'Automated SBOM monitoring against NVD/CVE databases · AI-drafted exploitability and clinical impact assessments for new CVEs · Patch impact analysis to determine regulated change control pathway',
      },
      {
        id: 'ART-008',
        name: 'Change Impact Assessment',
        groupId: 'g2',
        phaseTag: 'P3 Build',
        purpose:
          'Assesses the regulatory, safety, and validation impact of a proposed change before implementation begins. Determines whether the change requires full re-validation, partial re-testing, or documentation update only.',
        trigger: 'Triggered by every formal change request before implementation begins.',
        owner: 'Software Dev Lead (Responsible) · Risk Manager (Contributing) · Regulatory Lead (Accountable)',
        requiredInputs: ['Change request description', 'ART-002 Classification', 'ART-006 FMEA', 'Current validation evidence'],
        coreSections: [
          'Change description and rationale',
          'Affected software items (per IEC 62304 §8.2)',
          'Regulatory impact assessment (significant vs non-significant change)',
          'Safety impact assessment',
          'Validation impact (full / partial / documentation only)',
          'Required activities before re-release',
          'Approval record',
        ],
        reviewFrequency: 'Per change event',
        traceabilityLinks: ['→ ART-002 (Classification)', '→ ART-006 (FMEA)', '→ ART-014 (V&V Strategy)', '→ ART-021 (Phase Gate)'],
        aiAssistOpportunity:
          'Automated change significance classifier for SaMD AI/ML changes (predetermined change control plan) · Identify affected test cases based on changed components · Draft impact assessment from diff analysis',
      },
      {
        id: 'ART-009',
        name: 'AI/ML Model Assessment',
        groupId: 'g2',
        phaseTag: 'P2 Design',
        purpose:
          'Documents model architecture, training data, performance evaluation, bias assessment, intended clinical use, limitations, and post-market monitoring plan per FDA AI/ML SaMD guidance and NIST AI RMF.',
        trigger: 'Required for any product containing machine learning, AI decision support, or adaptive algorithms.',
        owner: 'Data Science Lead (Responsible) · QA Lead (Contributing) · Regulatory Lead (Accountable)',
        requiredInputs: ['Model training documentation', 'Clinical validation study data', 'Intended use from ART-001', 'ART-005 Risk Plan'],
        coreSections: [
          'Model architecture overview',
          'Training data characteristics (size, source, demographics, labeling)',
          'Performance metrics (sensitivity, specificity, AUC per subgroup)',
          'Bias and fairness evaluation',
          'Intended clinical use and limitations',
          'Known failure modes',
          'Post-market monitoring metrics and thresholds',
          'Predetermined change control plan (if applicable)',
        ],
        reviewFrequency: 'At each model version release; at significant performance change; annually post-market',
        traceabilityLinks: ['→ ART-006 (FMEA)', '→ ART-017 (Validation Report)', '→ ART-026 (PMS Plan)'],
        aiAssistOpportunity:
          'Auto-generate model card from training logs and evaluation metrics · Bias analysis across demographic subgroups · Flag performance gaps against labeled subpopulations',
        pathAIExample: {
          Architecture: 'Convolutional neural network ensemble (ResNet-50 + EfficientNet-B4) trained on 2.3M whole slide image patches',
          'Training Data': [
            '847 patients, 12 institutions, 6 tissue types, 2019–2023',
            'Demographics: 54% female, 46% male; age range 18–89; 4 racial/ethnic groups represented',
          ],
          Performance: [
            'Overall: Sensitivity 94.2%, Specificity 91.8%, AUC 0.973 on held-out test set',
            'Performance by subgroup: Sensitivity range 91.1%–96.8% across demographic subgroups — no statistically significant disparity',
          ],
          'Monitoring threshold': 'Alert if sensitivity drops below 89% on rolling 90-day clinical cohort',
        },
      },
    ],
  },
  {
    id: 'g3',
    label: 'DESIGN & ARCHITECTURE',
    accent: '#0D9488',
    artifacts: [
      {
        id: 'ART-010',
        name: 'Software Requirements Specification (SRS)',
        groupId: 'g3',
        phaseTag: 'P2 Design',
        purpose:
          'Documents all functional, non-functional, interface, and regulatory-driven software requirements. Foundation for design, testing, and traceability. Maintained under formal change control throughout the product lifecycle.',
        trigger: 'Required at P2 Design gate for Lane B/C/D; reviewed at P3 Build gate and each subsequent gate.',
        owner: 'Product Owner (Responsible) · Software Dev Lead (Contributing) · QA Lead (Accountable)',
        requiredInputs: ['ART-001 Intended Use', 'ART-003 Regulatory Applicability', 'User research / clinical input'],
        coreSections: [
          'Functional requirements (numbered, testable)',
          'Non-functional requirements (performance, security, reliability, usability)',
          'Interface requirements (hardware, software, communication)',
          'Regulatory-driven requirements (traceability to obligation)',
          'Requirements marked as safety-related (per IEC 62304 §5.2.2)',
          'Acceptance criteria per requirement',
        ],
        reviewFrequency: 'At P2, P3, P4 gates; upon approved change requests',
        traceabilityLinks: ['→ ART-011 (Architecture)', '→ ART-015 (Validation Protocol)', '→ ART-018 (Traceability Matrix)'],
        aiAssistOpportunity:
          'Generate structured requirements from user stories · Flag requirements that are not testable · Auto-link requirements to applicable regulatory obligations · Identify missing requirements from risk controls',
      },
      {
        id: 'ART-011',
        name: 'Software Architecture Review Record',
        groupId: 'g3',
        phaseTag: 'P2 Design',
        purpose:
          'Documents architectural decisions, component decomposition, interface definitions, SOUP integration approach, and architectural risk mitigations. Reviewed and approved before build begins.',
        trigger: 'Required at P2 Design gate for Lane C/D; updated for significant architectural changes.',
        owner: 'Software Dev Lead (Responsible/Accountable) · QA Lead (Contributing) · Security Lead (Contributing)',
        requiredInputs: ['ART-010 SRS', 'ART-005 Risk Plan', 'Technology stack decisions'],
        coreSections: [
          'Architectural overview and rationale',
          'Component decomposition',
          'Interface control definitions',
          'SOUP integration approach',
          'Security architecture',
          'Failure mode mitigations in architecture',
          'Architectural change history',
        ],
        reviewFrequency: 'At P2 gate; upon significant architectural change',
        traceabilityLinks: ['→ ART-010 (SRS)', '→ ART-012 (SOUP Register)', '→ ART-007 (Cybersecurity Risk)'],
        aiAssistOpportunity:
          'Automated architecture review against IEC 62304 requirements · Flag SOUP components requiring risk assessment · Identify security architecture gaps',
      },
      {
        id: 'ART-012',
        name: 'SOUP / Third-Party Component Register',
        groupId: 'g3',
        phaseTag: 'P2 Design',
        purpose:
          'Complete inventory of all software of unknown provenance (SOUP) and third-party libraries per IEC 62304 §8.1.2. Includes version, published anomaly list review, and risk assessment for each component.',
        trigger:
          'Maintained throughout development; updated when new dependencies added or existing ones updated; reviewed at each phase gate.',
        owner: 'Software Dev Lead (Responsible) · Risk Manager (Contributing) · QA Lead (Accountable)',
        requiredInputs: ['Dependency manifests', 'Published anomaly lists', 'CVE/NVD database'],
        coreSections: [
          'SOUP inventory table (name, version, vendor, function, safety class contribution)',
          'Published anomaly list review per component',
          'Risk assessment per SOUP item',
          'Acceptable anomalies with rationale',
          'Update/patch management plan',
        ],
        reviewFrequency: 'When dependencies updated; when new CVEs published; at each phase gate',
        traceabilityLinks: ['→ ART-007 (Cybersecurity Risk)', '→ ART-006 (FMEA)', '→ ART-008 (Change Impact)'],
        aiAssistOpportunity:
          'Automated SOUP inventory generation from dependency files · Continuous CVE monitoring and risk assessment · Anomaly list scraping from vendor security advisories',
      },
      {
        id: 'ART-013',
        name: 'Data Privacy Impact Assessment (DPIA)',
        groupId: 'g3',
        phaseTag: 'P2 Design',
        purpose:
          'Assesses privacy risks associated with the processing of personal health data. Documents data flows, lawful basis, privacy controls, and residual risks. Required under GDPR Article 35 for high-risk processing.',
        trigger:
          'Required when system processes personal data; mandatory for EU market entry where high-risk processing is involved.',
        owner: 'Privacy Officer (Responsible) · Security Lead (Contributing) · Legal (Accountable)',
        requiredInputs: ['Data flow diagrams', 'ART-001 Intended Use', 'Third-party data processor list'],
        coreSections: [
          'Data processing activities (what, why, how)',
          'Lawful basis for processing',
          'Data flows and transfers',
          'Privacy risks assessment',
          'Privacy controls implemented',
          'Residual risk and acceptance',
          'Data subject rights handling',
          'Retention and deletion schedule',
        ],
        reviewFrequency: 'When data flows change; when entering EU market; annually for active products',
        traceabilityLinks: ['→ ART-007 (Cybersecurity Risk)', '→ ART-003 (Regulatory Applicability)'],
        aiAssistOpportunity:
          'Auto-generate data flow inventory from system architecture diagrams · Map processing activities to GDPR lawful bases · Flag high-risk processing activities requiring DPIA',
      },
    ],
  },
  {
    id: 'g4',
    label: 'VERIFICATION & VALIDATION',
    accent: '#D97706',
    artifacts: [
      {
        id: 'ART-014',
        name: 'Validation & Verification Strategy',
        groupId: 'g4',
        phaseTag: 'P2 Design',
        purpose:
          'Defines the overall V&V approach, including which standards apply, testing levels, responsibilities, tools, and acceptance criteria strategy. Must be approved before any test execution begins.',
        trigger: 'Required at P2 Design gate; defines approach before any test execution.',
        owner: 'QA Lead (Responsible/Accountable) · Software Dev Lead (Contributing) · Regulatory Lead (Contributing)',
        requiredInputs: ['ART-004 Lane Determination', 'ART-010 SRS', 'ART-003 Regulatory Applicability'],
        coreSections: [
          'V&V scope and approach',
          'Testing levels (unit, integration, system, UAT, clinical)',
          'IQ/OQ/PQ structure (for GAMP 5 applicable systems)',
          'Tools and environments',
          'Traceability approach',
          'Defect management approach',
          'Acceptance criteria strategy',
          'Roles and responsibilities',
        ],
        reviewFrequency: 'At P2 gate; upon significant scope or requirement change',
        traceabilityLinks: ['→ ART-015 (Protocols)', '→ ART-016 (Test Evidence)', '→ ART-017 (Validation Report)'],
        aiAssistOpportunity: 'Auto-generate testing scope from lane assignment and SRS · Identify gaps in test coverage against regulatory requirements',
      },
      {
        id: 'ART-015',
        name: 'Validation Protocol (IQ/OQ/PQ)',
        groupId: 'g4',
        phaseTag: 'P2 Design',
        purpose:
          'IQ, OQ, and PQ protocols define test steps, expected results, and acceptance criteria. Must be approved before execution — no retrospective protocols allowed under FDA and EU GMP expectations.',
        trigger: 'Required before validation execution; approved before testing begins.',
        owner: 'QA Lead (Responsible/Accountable) · Software Dev Lead (Contributing) · Regulatory Lead (Contributing)',
        requiredInputs: ['ART-014 V&V Strategy', 'ART-010 SRS', 'Test environment specifications'],
        coreSections: [
          'Protocol scope and objective',
          'Prerequisites and preconditions',
          'Installation Qualification (IQ) test cases',
          'Operational Qualification (OQ) test cases',
          'Performance Qualification (PQ) test cases',
          'Acceptance criteria per test case',
          'Deviation handling procedure',
          'Approval signature block',
        ],
        reviewFrequency: 'Per release; updated when requirements change',
        traceabilityLinks: ['→ ART-016 (Test Evidence)', '→ ART-017 (Validation Report)', '→ ART-018 (Traceability Matrix)'],
        aiAssistOpportunity:
          'Generate test case scripts from requirements · Map test cases to risk controls · Flag test cases that do not cover all requirements',
      },
      {
        id: 'ART-016',
        name: 'Test Evidence Summary',
        groupId: 'g4',
        phaseTag: 'P4 Verification',
        purpose:
          'Structured summary of test execution results including pass/fail status, anomalies identified, defect resolution status, and overall phase conclusion. Input to Validation Report.',
        trigger: 'Generated after each test execution phase.',
        owner: 'QA Lead (Responsible) · Tester (Contributing) · Software Dev Lead (Informed)',
        requiredInputs: ['Approved ART-015 Protocol', 'Test execution records'],
        coreSections: [
          'Execution summary (dates, environment, tester)',
          'Test case results table (ID, description, result, pass/fail)',
          'Anomaly log (deviations from expected results)',
          'Defect report references',
          'Phase conclusion statement',
        ],
        reviewFrequency: 'After each test phase execution',
        traceabilityLinks: ['→ ART-017 (Validation Report)', '→ ART-021 (Phase Gate Review)'],
        aiAssistOpportunity: 'Auto-populate results table from test management system data · Flag anomalies requiring formal deviation records',
      },
      {
        id: 'ART-017',
        name: 'Validation Report',
        groupId: 'g4',
        phaseTag: 'P5 Validate',
        purpose:
          'Comprehensive summary of all validation activities, results, deviations, residual risks, and overall validation conclusion. Must be signed before release. Primary evidence document for regulatory submissions and inspections.',
        trigger: 'Required at P5 Validate gate.',
        owner: 'QA Lead (Responsible) · Regulatory Lead (Accountable) · Product Owner (Informed)',
        requiredInputs: ['ART-015 Protocols', 'ART-016 Test Evidence', 'ART-023 Deviation Records (if any)'],
        coreSections: [
          'Executive summary',
          'Scope of validation',
          'Summary of all protocols executed',
          'Summary of results and anomalies',
          'Deviation and impact assessment',
          'Residual risks statement',
          'Regulatory submission readiness conclusion',
          'Signature block',
        ],
        reviewFrequency: 'Per release',
        traceabilityLinks: ['→ ART-025 (Release Readiness)', '→ ART-027 (PSUR for post-market updates)'],
        aiAssistOpportunity:
          'Auto-draft executive summary from test evidence data · Compile anomaly summary from linked deviation records · Generate residual risk statement from risk file data',
      },
    ],
  },
  {
    id: 'g5',
    label: 'EVIDENCE & TRACEABILITY',
    accent: '#6D28D9',
    artifacts: [
      {
        id: 'ART-018',
        name: 'Traceability Matrix',
        groupId: 'g5',
        phaseTag: 'P2 Design',
        purpose:
          'Bidirectional traceability from regulatory obligations through user requirements, system requirements, risk controls, design elements, and test cases to validation evidence. Demonstrates completeness of coverage for regulatory submissions and inspections.',
        trigger:
          'Maintained from P2 through P6 and post-market; updated with every requirement or test case change.',
        owner: 'QA Lead (Responsible) · Software Dev Lead (Contributing) · Regulatory Lead (Informed)',
        requiredInputs: ['ART-003 Regulatory Applicability', 'ART-010 SRS', 'ART-006 FMEA', 'ART-015 Protocols'],
        coreSections: [
          'Traceability table (regulation → user req → system req → risk control → test case → evidence → status)',
          'Coverage metrics',
          'Gap analysis',
          'Orphaned requirements report',
          'Untested risk controls list',
        ],
        reviewFrequency: 'Continuously updated; formally reviewed at each phase gate',
        traceabilityLinks: ['→ ART-019 (Evidence Matrix)', '→ ART-025 (Release Readiness)'],
        aiAssistOpportunity:
          'Automated gap detection — flag requirements without test cases, risk controls without verification · Auto-link new requirements to applicable regulatory obligations · Coverage scoring dashboard',
        pathAIExample: {
          'PathAI Example (6 rows)': [
            'IEC 62304 §5.2 → UR-001 (AI output reviewed by pathologist before sign-out) → SRS-010 (mandatory pathologist approval workflow) → RC-001 → TC-010, TC-011 → TRACED — PASS',
            'ISO 14971 §8 → UR-007 (false negative rate below threshold) → SRS-044 (performance validation requirement) → RC-002 → TC-088, TC-089, TC-090 → TRACED — PASS',
            'FDA AI/ML §4.4 → UR-012 (algorithm change management process defined) → SRS-112 (predetermined change control plan) → RC-015 → TC-201 → TRACED — PASS',
            'EU MDR Annex I §17 → UR-018 (patient data protected per GDPR) → SRS-088 (data encryption at rest and in transit) → RC-020 → TC-150, TC-151 → TRACED — PASS',
            'IEC 62304 §9 → UR-023 (SOUP components inventoried and risk assessed) → SRS-201 (SOUP register maintained) → — → TC-310 → TRACED — PASS',
            '21 CFR 11.10(e) → UR-031 (audit trail captures all user actions on AI outputs) → SRS-244 (immutable audit log for pathologist interactions) → RC-031 → TC-401, TC-402 → GAP — IN PROGRESS',
          ],
        },
      },
      {
        id: 'ART-019',
        name: 'Evidence Requirement Matrix',
        groupId: 'g5',
        phaseTag: 'P2 Design',
        purpose:
          'Master list of all required artifacts and evidence items for the product\'s lane assignment. Tracks creation status, approval status, and completeness for each required item.',
        trigger: 'Generated from ART-004 Lane Determination; reviewed at each phase gate.',
        owner: 'Regulatory Lead (Responsible) · QA Lead (Accountable)',
        requiredInputs: ['ART-004 Lane Determination', 'ART-003 Regulatory Applicability'],
        coreSections: [
          'Complete artifact list per lane',
          'Required vs optional designation',
          'Current status (not started / in progress / approved)',
          'Owner per artifact',
          'Target completion date',
          'Notes',
        ],
        reviewFrequency: 'At each phase gate; weekly during active development',
        traceabilityLinks: ['→ ART-018 (Traceability Matrix)', '→ ART-025 (Release Readiness)'],
        aiAssistOpportunity: 'Auto-generate evidence checklist from lane assignment · Real-time completeness scoring · Flag items approaching gate deadlines',
      },
      {
        id: 'ART-020',
        name: '21 CFR Part 11 / EU Annex 11 Assessment',
        groupId: 'g5',
        phaseTag: 'P2 Design',
        purpose:
          'Documents applicability determination, system-specific compliance assessment, controls implemented, and gaps identified for electronic records and signature requirements under FDA 21 CFR Part 11 and EU GMP Annex 11.',
        trigger: 'Required for any system containing electronic records or signatures subject to FDA or EU oversight.',
        owner: 'Regulatory Lead (Responsible) · QA Lead (Contributing) · IT / System Admin (Informed)',
        requiredInputs: ['System functional description', 'ART-001 Intended Use', 'IT architecture diagrams'],
        coreSections: [
          'Applicability determination (Part 11 / Annex 11 / both / neither) with rationale',
          'System-by-system compliance assessment',
          'Technical controls (audit trail, access controls, system validation, e-signature configuration)',
          'Procedural controls (SOPs, training, incident response)',
          'Gap register',
          'Remediation plan',
        ],
        reviewFrequency: 'At initial system deployment; when system significantly changes; upon regulatory framework updates',
        traceabilityLinks: ['→ ART-003 (Regulatory Applicability)', '→ ART-015 (Validation Protocol for system)'],
        aiAssistOpportunity:
          'Automated 21 CFR Part 11 applicability screening · Audit trail completeness testing · Access control review against approved matrix',
      },
    ],
  },
  {
    id: 'g6',
    label: 'GOVERNANCE & APPROVAL',
    accent: '#0F1F3D',
    artifacts: [
      {
        id: 'ART-021',
        name: 'Phase Gate Review Record',
        groupId: 'g6',
        phaseTag: 'P0–P6 Gate',
        purpose:
          'Formal record of phase gate review outcome. Documents evidence package reviewed, open items, conditions for approval, and go/no-go decision with signature authority.',
        trigger: 'Required at each phase gate (P0–P6) before proceeding to next phase.',
        owner: 'Phase Gate Chair (Responsible/Accountable) · All Functional Leads (Contributing/Informed)',
        requiredInputs: ['All required artifacts for the gate', 'Open items list from previous gate', 'Risk file current status'],
        coreSections: [
          'Gate identification (phase, product, date)',
          'Evidence package reviewed (artifact list with status)',
          'Key discussion points and decisions',
          'Open items (with owner and target date)',
          'Conditions for approval (if conditional go)',
          'Go / No-Go decision',
          'Signature block',
        ],
        reviewFrequency: 'Per phase gate event',
        traceabilityLinks: ['→ ART-022 (Decision Log)', '→ ART-025 (Release Readiness for P6)'],
        aiAssistOpportunity:
          'Automated evidence completeness check before gate · Draft gate summary from artifact status data · Flag open items that block gate approval',
      },
      {
        id: 'ART-022',
        name: 'Decision Log',
        groupId: 'g6',
        phaseTag: 'P0–P6',
        purpose:
          'Captures key decisions, options considered, rationale for the decision taken, decision maker, and date. Provides defensible audit trail for regulatory strategy and design choices throughout the product lifecycle.',
        trigger: 'Maintained throughout the product lifecycle; entries added for any significant regulatory or design decision.',
        owner: 'Product Owner (Responsible) · Regulatory Lead (Contributing)',
        requiredInputs: ['Meeting notes', 'Change requests', 'Regulatory correspondence'],
        coreSections: [
          'Decision ID',
          'Date',
          'Decision statement',
          'Options considered',
          'Rationale for selected option',
          'Decision maker',
          'Related artifacts',
          'Impact summary',
        ],
        reviewFrequency: 'Maintained continuously; reviewed during inspections',
        traceabilityLinks: ['→ ART-021 (Phase Gate Review)', '→ ART-023 (Deviation Records)'],
        aiAssistOpportunity: 'Auto-capture decisions from meeting transcripts · Flag decisions that should be linked to open risk items',
      },
      {
        id: 'ART-023',
        name: 'Deviation / Exception Record',
        groupId: 'g6',
        phaseTag: 'P0–P6',
        purpose:
          'Documents the nature of a deviation from a process requirement, protocol requirement, or standard; root cause; impact assessment; compensating controls; and disposition decision. Linked to CAPA if a systemic issue is identified.',
        trigger: 'Raised when a process requirement, protocol requirement, or standard cannot be met as defined.',
        owner: 'QA Lead (Responsible/Accountable) · Regulatory Lead (Contributing)',
        requiredInputs: ['Description of deviation', 'Applicable requirement being deviated from', 'Impact assessment'],
        coreSections: [
          'Deviation description',
          'Root cause analysis',
          'Regulatory and safety impact assessment',
          'Compensating controls',
          'Risk assessment of deviation',
          'Disposition (accept / remediate / escalate)',
          'CAPA linkage (if applicable)',
          'Approval',
        ],
        reviewFrequency: 'Per deviation event; trend review quarterly',
        traceabilityLinks: ['→ ART-021 (Phase Gate Review)', '→ ART-025 (Release Readiness)'],
        aiAssistOpportunity:
          'Draft root cause analysis narrative from deviation description · Flag deviations requiring CAPA based on severity · Trend analysis for recurring deviation categories',
      },
      {
        id: 'ART-024',
        name: 'RACI Matrix',
        groupId: 'g6',
        phaseTag: 'P0',
        purpose:
          'Defines Responsible, Accountable, Consulted, and Informed parties for all key activities, decisions, and artifacts in the regulated software lifecycle. Ensures clear accountability at every step.',
        trigger: 'Defined at project initiation; reviewed at organizational changes and product phase transitions.',
        owner: 'Project / Program Manager (Responsible) · All Functional Leads (Accountable)',
        requiredInputs: ['Organizational chart', 'Role definitions', 'Regulatory obligation owners'],
        coreSections: [
          'Activity/artifact list',
          'Role list',
          'RACI assignments table',
          'Approval authority matrix',
          'Escalation paths',
        ],
        reviewFrequency: 'At project initiation; upon organizational change; at phase transitions',
        traceabilityLinks: ['→ ART-021 (Phase Gate Review)', '→ ART-019 (Evidence Matrix)'],
        aiAssistOpportunity: 'Generate RACI from organizational structure and regulatory obligation register · Flag gaps in accountability',
      },
    ],
  },
  {
    id: 'g7',
    label: 'RELEASE & POST-MARKET',
    accent: '#0D9488',
    artifacts: [
      {
        id: 'ART-025',
        name: 'Release Readiness Review',
        groupId: 'g7',
        phaseTag: 'P6 Release',
        purpose:
          'Final review confirming all required evidence is complete, open defects are resolved or risk-accepted, all approvals obtained, and release authorization can be granted.',
        trigger: 'Required at P6 Release gate before any deployment to production or customer environment.',
        owner: 'QA Lead (Responsible) · Regulatory Lead (Accountable) · Exec Sponsor (Accountable)',
        requiredInputs: ['ART-017 Validation Report', 'ART-018 Traceability Matrix', 'ART-019 Evidence Matrix', 'All phase gate records'],
        coreSections: [
          'Evidence completeness confirmation',
          'Open defect status and disposition',
          'Regulatory submission status (if applicable)',
          'Post-market readiness confirmation',
          'Release authorization record',
          'Distribution/deployment authorization',
        ],
        reviewFrequency: 'Per release',
        traceabilityLinks: ['→ ART-026 (PMS Plan)', 'All upstream artifacts'],
        aiAssistOpportunity: 'Automated evidence completeness scoring · Open defect risk acceptance advisor · Release checklist auto-population',
      },
      {
        id: 'ART-026',
        name: 'Post-Market Monitoring Plan',
        groupId: 'g7',
        phaseTag: 'P5 Validate',
        purpose:
          'Defines the systematic process for collecting and analyzing post-market data per ISO 14971 §10, EU MDR Article 83, and FDA post-market requirements.',
        trigger: 'Required at P5 for Lane C/D; defines surveillance activities before product launch.',
        owner: 'Regulatory Lead (Responsible) · Risk Manager (Contributing) · QA Lead (Accountable)',
        requiredInputs: ['ART-006 FMEA', 'ART-009 AI/ML Assessment (if applicable)', 'ART-025 Release Readiness'],
        coreSections: [
          'Surveillance objectives',
          'Data sources (complaints, literature, registries, real-world performance)',
          'Monitoring frequency and methods',
          'Signal detection thresholds',
          'Reportability criteria (FDA MDR, EU Vigilance)',
          'Review and reporting schedule',
          'Risk file update triggers',
        ],
        reviewFrequency: 'Annually; when significant signals detected; when regulatory requirements change',
        traceabilityLinks: ['→ ART-006 (FMEA)', '→ ART-027 (PSUR)'],
        aiAssistOpportunity:
          'Automated complaint signal detection using NLP · Literature surveillance with relevance scoring · Incident reportability classification · PSUR data aggregation',
        pathAIExample: {
          'PathAI Example':
            [
              'Complaint monitoring: CRM tickets classified by AI severity classifier; weekly review of high-severity items',
              'Performance monitoring: Rolling 90-day sensitivity/specificity on clinical outcomes vs validated baseline; alert at >5% sensitivity drop',
              'Literature surveillance: Automated PubMed monitoring for "AI pathology," "digital pathology accuracy," "WSI deep learning" — weekly summary to regulatory affairs',
              'Reportability review: Monthly MDR/vigilance review of all adverse events',
            ],
        },
      },
      {
        id: 'ART-027',
        name: 'Periodic Safety Update Report (PSUR)',
        groupId: 'g7',
        phaseTag: 'P6 Release',
        purpose:
          'Annual summary of post-market surveillance data, safety signals, benefit-risk conclusions, and any changes to risk management or clinical evaluation resulting from post-market data. Required for EU MDR Class IIa and above.',
        trigger: 'Annual requirement for EU MDR Class IIa+ SaMD; triggered by significant safety signals for any lane D product.',
        owner: 'Regulatory Lead (Responsible/Accountable) · Risk Manager (Contributing)',
        requiredInputs: ['ART-026 PMS Plan', '12 months of complaint and surveillance data', 'Updated literature review', 'Clinical evaluation update'],
        coreSections: [
          'Product and regulatory status summary',
          'Post-market surveillance data summary (complaints, literature, real-world performance)',
          'Safety signal analysis',
          'Benefit-risk conclusion update',
          'Changes implemented in response to post-market data',
          'Conclusion on continued regulatory conformity',
          'Regulatory submission record',
        ],
        reviewFrequency: 'Annual; upon significant safety signal',
        traceabilityLinks: ['→ ART-026 (PMS Plan)', '→ ART-006 (FMEA for risk file updates)'],
        aiAssistOpportunity:
          'Auto-draft PSUR structure from aggregated PMS data · Generate benefit-risk narrative from clinical evidence base · Flag risk file items requiring update based on surveillance findings',
      },
    ],
  },
]

function ArtifactTemplateCard({
  artifact,
  accent,
  expanded,
  onToggle,
}: {
  artifact: ArtifactTemplate
  accent: string
  expanded: boolean
  onToggle: () => void
}) {
  const phaseLabel = artifact.phaseTag ?? inferPhaseLabel(artifact.trigger)
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

          </div>
        )}
      </div>
    </div>
  )
}

export default function ArtifactLibraryPage() {
  const [pathAIExampleMode, setPathAIExampleMode] = useState(false)
  const firstArtifactId = ARTIFACT_GROUPS[0]?.artifacts[0]?.id ?? ''
  const initialExpandedGroups: Record<ArtifactGroupId, boolean> = {
    g1: true,
    g2: false,
    g3: false,
    g4: false,
    g5: false,
    g6: false,
    g7: false,
  }

  const [expandedGroups, setExpandedGroups] = useState<Record<ArtifactGroupId, boolean>>(initialExpandedGroups)
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>(firstArtifactId)
  const [examplePanelOpen, setExamplePanelOpen] = useState(true)

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

  const selectedArtifact = artifactById[selectedArtifactId] ?? null
  const selectedGroup = selectedArtifact ? groupById[selectedArtifact.groupId] : null
  const selectedPhaseLabel = selectedArtifact ? selectedArtifact.phaseTag ?? inferPhaseLabel(selectedArtifact.trigger) : null
  const selectedExampleData = selectedArtifact ? selectedArtifact.pathAIExample ?? buildFallbackExample(selectedArtifact) : null
  const selectedHasNativeExample = Boolean(selectedArtifact?.pathAIExample)

  useEffect(() => {
    if (!selectedArtifactId) return
    setExamplePanelOpen(true)
  }, [selectedArtifactId])

  useEffect(() => {
    if (!selectedArtifact) {
      setExpandedGroups(initialExpandedGroups)
      return
    }

    // Keep the tree focused on the selected artifact's group.
    setExpandedGroups({
      g1: selectedArtifact.groupId === 'g1',
      g2: selectedArtifact.groupId === 'g2',
      g3: selectedArtifact.groupId === 'g3',
      g4: selectedArtifact.groupId === 'g4',
      g5: selectedArtifact.groupId === 'g5',
      g6: selectedArtifact.groupId === 'g6',
      g7: selectedArtifact.groupId === 'g7',
    })

    // Scroll the selected node into view (within the left tree panel).
    const timer = window.setTimeout(() => {
      const el = document.querySelector(`[data-al-artifact-id="${selectedArtifact.id}"]`) as HTMLElement | null
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }, 50)

    return () => window.clearTimeout(timer)
  }, [selectedArtifactId, selectedArtifact])

  return (
    <div className="space-y-4">
      <section id="artifact-library" data-example-mode={pathAIExampleMode ? 'true' : 'false'}>
        <Card className="bg-white/5 p-4">
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Artifact Library</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-100">Artifact Library</h1>
              <p className="mt-1 max-w-3xl text-xs text-slate-300">
                27 reusable, pre-structured document templates covering every evidence requirement from product intake to post-market surveillance.
              </p>
            </div>
          </div>

          <div
            className="al-pathai-banner mt-3 rounded-xl border p-3"
            style={
              pathAIExampleMode
                ? { backgroundColor: 'rgba(59,75,200,0.08)', borderColor: 'rgba(59,75,200,0.25)' }
                : undefined
            }
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-200">
                {pathAIExampleMode ? 'Showing PathAI Reporter pre-populated examples — ' : 'Viewing blank templates — '}
                <span className="font-semibold">{pathAIExampleMode ? 'PathAI mode ON' : 'PathAI mode OFF'}</span>
              </p>

              <button
                type="button"
                onClick={() => setPathAIExampleMode((v) => !v)}
                role="switch"
                aria-checked={pathAIExampleMode}
                aria-label="Toggle PathAI example mode"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/50 px-2 py-1 transition hover:bg-slate-900/70"
              >
                <span className={`text-[10px] font-semibold ${pathAIExampleMode ? 'text-emerald-300' : 'text-slate-300'}`}>{pathAIExampleMode ? 'ON' : 'OFF'}</span>
                <span
                  className={[
                    'relative inline-flex h-5 w-10 items-center rounded-full border transition',
                    pathAIExampleMode ? 'border-emerald-400/50 bg-emerald-500/30' : 'border-white/25 bg-white/10',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition',
                      pathAIExampleMode ? 'translate-x-5' : 'translate-x-0.5',
                    ].join(' ')}
                  />
                </span>
                <span className="text-[10px] font-semibold text-slate-200">PathAI</span>
              </button>
            </div>
            {pathAIExampleMode ? (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-100">
                  AI CLINICAL REPORTING · LANE D · IEC 62304 CLASS C
                </span>
              </div>
            ) : null}
          </div>
        </Card>

        <div className="mt-4 grid gap-4 lg:grid-cols-[340px_1fr]">
          <aside className="rounded-2xl border border-white/10 bg-slate-900/30 p-4 max-h-[calc(100vh-240px)] overflow-y-auto">
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
                              onClick={() => setSelectedArtifactId(a.id)}
                              data-al-artifact-id={a.id}
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
                                  <p className="mt-1 text-[10px] text-slate-500">{a.phaseTag ?? inferPhaseLabel(a.trigger)}</p>
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
              <div className="space-y-3">
                <div className="rounded-xl border border-white/10 bg-slate-900/35 px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                      style={laneBadge(selectedGroup?.accent ?? '#64748b')}
                    >
                      {selectedArtifact.id}
                    </span>
                    {selectedPhaseLabel ? (
                      <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold text-slate-300">
                        {selectedPhaseLabel}
                      </span>
                    ) : null}
                    {pathAIExampleMode && selectedExampleData ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-[10px] font-semibold text-indigo-200">
                        <Sparkles size={12} />
                        {selectedHasNativeExample ? 'PathAI example mode active for this template' : 'PathAI draft example generated for this template'}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div
                  className={[
                    'grid gap-3',
                    pathAIExampleMode && selectedExampleData && examplePanelOpen
                      ? 'xl:grid-cols-[minmax(0,1fr)_360px]'
                      : 'grid-cols-1',
                  ].join(' ')}
                >
                  <ArtifactTemplateCard
                    artifact={selectedArtifact}
                    accent={selectedGroup?.accent ?? '#64748b'}
                    expanded={true}
                    onToggle={() => setSelectedArtifactId(selectedArtifact.id)}
                  />

                  {pathAIExampleMode && selectedExampleData && examplePanelOpen ? (
                    <aside className="al-example-side rounded-2xl border border-emerald-400/30 bg-[rgba(16,185,129,0.08)] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-200 font-semibold">
                            {selectedHasNativeExample ? 'PathAI Reporter Example' : 'PathAI Reporter Draft Example'}
                          </p>
                          <p className="mt-1 text-[12px] text-emerald-100">
                            Pre-populated content for <span className="font-semibold">{selectedArtifact.id}</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setExamplePanelOpen(false)}
                          className="rounded-md border border-emerald-300/30 bg-emerald-500/10 p-1 text-emerald-100 hover:bg-emerald-500/20 transition"
                          aria-label="Close example panel"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <div className="mt-3 space-y-3">
                        {Object.entries(selectedExampleData).map(([k, v]) => (
                          <div key={k} className="rounded-lg border border-emerald-300/20 bg-slate-950/30 p-3">
                            <p className="text-[11px] font-semibold text-emerald-100">{k}</p>
                            {Array.isArray(v) ? (
                              <div className="mt-2 space-y-2">
                                <ul className="list-disc pl-5 space-y-3">
                                  {v.map((s) => {
                                    const text = String(s)
                                    const parts = text.split('|').map((p) => p.trim()).filter(Boolean)
                                    const looksLikeRiskBlock = parts.length >= 3 && parts[0].startsWith('RM-')

                                    if (!looksLikeRiskBlock) {
                                      return (
                                        <li key={text} className="break-words">
                                          <p className="text-[12px] leading-6 text-slate-200">{text}</p>
                                        </li>
                                      )
                                    }

                                    const title = parts[0]
                                    const effect = parts.find((p) => p.toLowerCase().startsWith('effect:'))
                                    const severityProb = parts.find((p) => /severity/i.test(p) || /probability/i.test(p))
                                    const control = parts.find((p) => p.toLowerCase().startsWith('control:'))

                                    return (
                                      <li key={text} className="break-words">
                                        <div className="text-[12px] font-semibold text-slate-100">{title}</div>
                                        <ul className="mt-1 list-disc pl-5 space-y-1">
                                          {effect ? (
                                            <li className="text-[12px] leading-6 text-slate-200">
                                              <span className="font-semibold text-emerald-200">Effect:</span>{' '}
                                              {effect.replace(/^effect:\s*/i, '')}
                                            </li>
                                          ) : null}
                                          {severityProb ? (
                                            <li className="text-[12px] leading-6 text-slate-200">
                                              <span className="font-semibold text-emerald-200">Severity / Probability:</span>{' '}
                                              {severityProb
                                                .replace(/^severity\s*\/\s*probability:\s*/i, '')
                                                .replace(/^severity:\s*/i, '')
                                                .replace(/^probability:\s*/i, '')
                                                .trim()}
                                            </li>
                                          ) : null}
                                          {control ? (
                                            <li className="text-[12px] leading-6 text-slate-200">
                                              <span className="font-semibold text-emerald-200">Control:</span>{' '}
                                              {control.replace(/^control:\s*/i, '')}
                                            </li>
                                          ) : null}
                                        </ul>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </div>
                            ) : (
                              <p className="mt-1 text-[12px] leading-6 text-slate-100 whitespace-pre-line">{String(v)}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </aside>
                  ) : null}
                </div>

                {pathAIExampleMode && selectedExampleData && !examplePanelOpen ? (
                  <button
                    type="button"
                    onClick={() => setExamplePanelOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-3 py-2 text-sm font-semibold text-indigo-200 hover:bg-indigo-500/20 transition"
                  >
                    <Sparkles size={14} />
                    Open PathAI example panel
                  </button>
                ) : null}
              </div>
            ) : null}
          </main>
        </div>
      </section>
    </div>
  )
}

