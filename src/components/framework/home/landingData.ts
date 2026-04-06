/** Marketing copy and structure for the Codex static HTML template (React port). */

export const MARQUEE_ITEMS: { label: string; dot: string }[] = [
  { label: 'IEC 62304:2015+AMD1', dot: '#f43f5e' },
  { label: 'ISO 14971:2019', dot: '#f59e0b' },
  { label: 'EU MDR 2017/745', dot: '#3b82f6' },
  { label: 'FDA 21 CFR Part 820', dot: '#8b5cf6' },
  { label: '21 CFR Part 11', dot: '#14b8a6' },
  { label: 'GAMP 5 2nd Ed.', dot: '#22c55e' },
  { label: 'EU AI Act 2024', dot: '#f43f5e' },
  { label: 'NIST AI RMF', dot: '#3b82f6' },
  { label: 'ISO 13485:2016', dot: '#8b5cf6' },
  { label: 'FDA AI/ML SaMD Guidance', dot: '#f59e0b' },
  { label: 'FDA Cybersecurity 2023', dot: '#14b8a6' },
  { label: 'GDPR / 45 CFR Part 164', dot: '#22c55e' },
]

export const ROLE_ROTATE: { verb: string; role: string }[] = [
  { verb: 'builds.', role: 'Engineering knows what to build.' },
  { verb: 'governs.', role: 'Quality leads stop chasing evidence.' },
  { verb: 'interprets.', role: 'RA explains the standard once — for everyone.' },
  { verb: 'protects.', role: 'Security controls land in the right phase.' },
  { verb: 'classifies.', role: 'Product owns intended use without ambiguity.' },
  { verb: 'authorizes.', role: 'System Owner signs with full visibility.' },
]

export const STATS_EDITORIAL: { n: string; label: string; sub: string }[] = [
  { n: '4', label: 'SDLC Lanes', sub: 'Risk-calibrated rigor from Non-Regulated to full SaMD' },
  { n: '8', label: 'Classification Dimensions', sub: 'CD-1–CD-8 produce a signed, auditable lane assignment' },
  { n: '43', label: 'Evidence Documents', sub: '5 binders, tagged to phase, gate, lane, and obligation' },
  { n: '7', label: 'Lifecycle Phases', sub: 'P0 Intake through P6 Post-Market. Entry criteria defined.' },
  { n: '24', label: 'Regulations Tracked', sub: 'Coverage %, orphan detection, gap reporting built in' },
  { n: '4', label: 'Governance Layers', sub: 'L1 sprint gate through L4 post-market quality review' },
]

export const CHAIN_NODES: { ico: string; cls: string; l: string; s: string }[] = [
  { ico: '⚖️', cls: 'cl-i1', l: 'Regulation', s: 'IEC 62304 · MDR' },
  { ico: '📋', cls: 'cl-i2', l: 'Obligation', s: 'Mapped · registered' },
  { ico: '⚠️', cls: 'cl-i3', l: 'Risk Item', s: 'ISO 14971 FMEA' },
  { ico: '🏗️', cls: 'cl-i4', l: 'Design Decision', s: 'Architecture record' },
  { ico: '🧪', cls: 'cl-i5', l: 'Test Case', s: 'V&V protocol' },
  { ico: '✅', cls: 'cl-i6', l: 'Approval', s: 'Signed · role-based' },
  { ico: '📁', cls: 'cl-i7', l: 'Evidence Artifact', s: 'Audit-ready binder' },
]

export const CLASSIFICATION_INPUTS: { text: string; num: string }[] = [
  { text: 'Deployment Context', num: 'CD-1' },
  { text: 'Clinical Criticality', num: 'CD-2' },
  { text: 'Intended Use', num: 'CD-3' },
  { text: 'Risk Class', num: 'CD-4' },
  { text: 'GxP Applicability', num: 'CD-5' },
  { text: 'Data Sensitivity', num: 'CD-6' },
  { text: 'AI/ML Component', num: 'CD-7' },
  { text: 'Market & Jurisdiction', num: 'CD-8' },
]

export const LANE_OUTPUTS: { lane: string; name: string; std: string; cls: string }[] = [
  { lane: 'Lane A', name: 'Non-Regulated', std: 'Standard engineering', cls: 'cl-eout-a' },
  { lane: 'Lane B', name: 'GxP / Validated', std: 'GAMP 5 · 21 CFR Part 11', cls: 'cl-eout-b' },
  { lane: 'Lane C', name: 'Lab Workflow / LIMS', std: 'GLP · EU Annex 11', cls: 'cl-eout-c' },
  { lane: 'Lane D', name: 'SaMD / Medical Device', std: 'IEC 62304 · ISO 14971 · EU MDR · FDA', cls: 'cl-eout-d' },
]

export const LANES_DETAIL: {
  laneClass: string
  badge: string
  name: string
  desc: string
  stds: string[]
  rigor: [boolean, boolean, boolean, boolean]
}[] = [
  {
    laneClass: 'cl-la',
    badge: 'Lane A',
    name: 'Non-Regulated',
    desc: 'Standard engineering. No compliance obligations. Fast delivery, lightweight documentation, no IQ/OQ/PQ.',
    stds: ['Internal tooling', 'No PHI/PII'],
    rigor: [true, false, false, false],
  },
  {
    laneClass: 'cl-lb',
    badge: 'Lane B',
    name: 'GxP / Validated',
    desc: 'Pharma and biotech validation. GAMP category approach. IQ/OQ/PQ with electronic records compliance.',
    stds: ['GAMP 5', '21 CFR Part 11', 'EU Annex 11'],
    rigor: [true, true, false, false],
  },
  {
    laneClass: 'cl-lc',
    badge: 'Lane C',
    name: 'Lab Workflow / LIMS',
    desc: 'ELN and LIMS under GLP. Lab-specific data integrity. Audit trail and 21 CFR Part 11 verification.',
    stds: ['GLP', '21 CFR Part 11', 'ISO 17025'],
    rigor: [true, true, true, false],
  },
  {
    laneClass: 'cl-ld',
    badge: 'Lane D',
    name: 'SaMD / Medical Device',
    desc: 'Full IEC 62304 Class C rigor. EU MDR Technical File. FDA premarket pathway. Submission-grade evidence binder.',
    stds: ['IEC 62304', 'ISO 14971', 'EU MDR', 'FDA 820', 'EU AI Act'],
    rigor: [true, true, true, true],
  },
]

export const AI_ITEMS: { ico: string; bg: string; title: string; desc: string }[] = [
  {
    ico: '🔗',
    bg: 'rgba(139,92,246,.12)',
    title: 'AI-assisted traceability linking',
    desc: 'Automatically surfaces orphaned requirements, missing risk-to-test links, and regulation coverage gaps. What used to take a compliance engineer days is visible in real-time.',
  },
  {
    ico: '📝',
    bg: 'rgba(59,130,246,.1)',
    title: 'Artifact drafting acceleration',
    desc: '43 evidence document templates pre-structured for their phase, lane, and obligation. AI fills the grind. Experts review the substance. Teams stop starting from blank pages.',
  },
  {
    ico: '🛡️',
    bg: 'rgba(20,184,166,.1)',
    title: 'AI judgment boundaries are explicit',
    desc: 'Every AI capability in Codex has a defined boundary. AI accelerates surveillance, linking, and drafting. Humans remain accountable for risk acceptance, classification, and sign-off. Always.',
  },
  {
    ico: '⚡',
    bg: 'rgba(245,158,11,.1)',
    title: 'CI/CD-embedded compliance guardrails',
    desc: 'Automated gates in your delivery pipeline that block violations before release — not after. Compliance checks shift left into sprint, not right into audit preparation.',
  },
]

export const ROLE_CARDS: {
  em: string
  title: string
  value: string
  pain: string
  links: { label: string; to: string }[]
}[] = [
  {
    em: '⚙️',
    title: 'Engineering',
    value: 'builds compliant software faster',
    pain: 'Gets exact controls per phase, automated traceability starter kits, and CI/CD-embedded guardrails. Stops receiving a compliance checklist at release.',
    links: [
      { label: 'Guardrails', to: '/guardrails-paved-roads' },
      { label: 'SDLC Lanes', to: '/sdlc-lanes' },
    ],
  },
  {
    em: '🛡️',
    title: 'Quality',
    value: 'governs without being the bottleneck',
    pain: 'Gets structured phase-gate outputs to review — not raw artifacts to assemble. Evidence binder pre-organized in audit-ready format. Stops being the person who slows delivery down.',
    links: [
      { label: 'Governance', to: '/governance-model' },
      { label: 'Approvals', to: '/approval-matrix' },
    ],
  },
  {
    em: '📋',
    title: 'Regulatory Affairs',
    value: 'interprets standards into policy once',
    pain: 'One authoritative standard → framework mapping, agreed once. Stops re-explaining the same obligations on every project. Traceability chain ready to show inspectors.',
    links: [
      { label: 'Reg Universe', to: '/regulatory-universe' },
      { label: 'Traceability', to: '/traceability-studio' },
    ],
  },
  {
    em: '📦',
    title: 'Product & Business',
    value: 'owns intended use without ambiguity',
    pain: 'Gets a definitive risk tier from product intent — no ambiguity. Release readiness visible through phase gate status, not stakeholder opinion. Compliance hotspots surfaced early.',
    links: [
      { label: 'Classification', to: '/classification-model' },
      { label: 'Hotspots', to: '/compliance-risk-hotspots' },
    ],
  },
  {
    em: '🔍',
    title: 'Auditors & Inspectors',
    value: 'follow a coherent story, end to end',
    pain: 'Finds obligations → decisions → controlled execution → evidence already assembled. Traceability chain pre-built, regulation-to-artifact. No reassembly required before the inspection visit.',
    links: [
      { label: 'Evidence', to: '/evidence-architecture' },
      { label: 'Traceability', to: '/traceability-studio' },
    ],
  },
  {
    em: '🚀',
    title: 'MedTech Startups',
    value: 'avoid the regulatory wall at month 12',
    pain: 'Classify at P0. Route the entire build correctly from day one. Submission-ready evidence built as a byproduct of delivery. Stops discovering the wrong controls were applied 18 months in.',
    links: [
      { label: 'Classify first', to: '/classification-model' },
      { label: 'Pick your lane', to: '/sdlc-lanes' },
    ],
  },
]

export const PRINCIPLES: { num: string; title: string; body: string }[] = [
  {
    num: '01',
    title: 'Obligation-first, not standard-first',
    body: 'Most frameworks start with a standard (IEC 62304) and work forward. Codex starts with the obligation — what the regulation actually requires you to do — and traces forward to controls, artifacts, and evidence. The difference matters most when regulations overlap or conflict.',
  },
  {
    num: '02',
    title: 'Classification determines everything else',
    body: "Lane assignment is not a compliance checkbox. It's the single decision that dictates every process requirement, evidence expectation, and approval authority for a product. Getting it right at P0 eliminates the most common and most expensive compliance failure: discovering at validation that the product required more than was built for.",
  },
  {
    num: '03',
    title: 'Evidence is designed, not gathered',
    body: 'Teams that treat evidence as something to collect before an audit consistently fail audits. Evidence is an output of delivery — artifact triggers, traceability hooks, and binder structure are part of the build from sprint one. Not a separate retrospective effort three weeks before inspection.',
  },
  {
    num: '04',
    title: 'Governance is accountability, not bureaucracy',
    body: 'L1–L4 governance layers clarify who owns a decision and what it takes to move forward at every point in delivery. That clarity reduces delays. Ambiguity causes them. Governance done right is invisible to teams that are doing the right things.',
  },
  {
    num: '05',
    title: 'AI accelerates compliance — it does not replace judgment',
    body: 'Every AI capability in Codex is an accelerant for the grind: traceability linking, gap detection, artifact drafting, surveillance. Human owners remain accountable for risk acceptance, classification decisions, and sign-offs. AI removes the drudgery. Humans keep the responsibility.',
  },
]

export const CHAPTER_LINKS: {
  track: 'u' | 'e' | 'p'
  ph: string
  title: string
  desc: string
  stat: string
  to: string
}[] = [
  {
    track: 'u',
    ph: "Understand · What you're operating in",
    title: 'Regulatory Universe',
    desc: 'Obligation register by standard. Applicability matrix per product. Standard ↔ framework element mapping.',
    stat: '12 standards mapped · Global + EU + US',
    to: '/regulatory-universe',
  },
  {
    track: 'u',
    ph: "Understand · What you're operating in",
    title: 'Classification Model',
    desc: '8-dimension assessment producing a signed classification record, IEC 62304 safety class, and SDLC lane assignment.',
    stat: 'CD-1 → CD-8 · Signed output · Lane assigned',
    to: '/classification-model',
  },
  {
    track: 'u',
    ph: "Understand · What you're operating in",
    title: 'SDLC Lanes A–D',
    desc: 'Four lanes defining control intensity, required phase gates, evidence binder depth, and approval overhead.',
    stat: '4 lanes · Phase gates · Evidence binders',
    to: '/sdlc-lanes',
  },
  {
    track: 'e',
    ph: 'Execute · How you build and govern',
    title: 'Lifecycle Architecture',
    desc: 'P0–P6 phases. Entry criteria, required controls, gate checklist, artifact list, and RACI by phase and lane.',
    stat: '7 phases · Gate checklists · RACI per lane',
    to: '/lifecycle-architecture',
  },
  {
    track: 'e',
    ph: 'Execute · How you build and govern',
    title: 'Evidence Architecture',
    desc: '43 documents across 5 binders. Tagged to phase, gate, lane applicability, and regulatory obligation.',
    stat: '43 documents · 5 binders · Core/Lane/Regulated',
    to: '/evidence-architecture',
  },
  {
    track: 'e',
    ph: 'Execute · How you build and govern',
    title: 'Governance Model',
    desc: 'L1–L4: sprint-level delivery gates through post-market quality review. Triggers, quorum, escalation paths.',
    stat: 'L1–L4 · Quorum defined · Escalation rules',
    to: '/governance-model',
  },
  {
    track: 'e',
    ph: 'Execute · How you build and govern',
    title: 'Approval Matrix',
    desc: 'Role-based approval requirements by artifact type, lane, and governance layer. Green→amber→red escalation.',
    stat: 'Role-based · Lane-conditional · Escalation',
    to: '/approval-matrix',
  },
  {
    track: 'p',
    ph: 'Prove · How you demonstrate compliance',
    title: 'Traceability Studio',
    desc: 'Live regulation-to-artifact coverage map. 24 regulations tracked. Orphan detection. Gap reporting. Coverage %.',
    stat: '24 regulations · Coverage % · Gap detection',
    to: '/traceability-studio',
  },
  {
    track: 'p',
    ph: 'Prove · How you demonstrate compliance',
    title: 'Compliance Risk Hotspots',
    desc: 'Ranked register of known failure modes across Process, Governance, Technical, and Operations. Risk-scored with mitigation.',
    stat: 'Ranked · Heat-scored · Owner-assigned',
    to: '/compliance-risk-hotspots',
  },
]

/** Vertical lane headers for the Framework Chapters section (Understand / Execute / Prove). */
export const CHAPTER_LANE_DEFS: { track: 'u' | 'e' | 'p'; label: string; sub: string }[] = [
  { track: 'u', label: 'Understand', sub: "What you're operating in" },
  { track: 'e', label: 'Execute', sub: 'How you build and govern' },
  { track: 'p', label: 'Prove', sub: 'How you demonstrate compliance' },
]

export const STAKES_CARDS: { icon: string; title: string; desc: string; dot: string; consequence: string }[] = [
  {
    icon: '🏥',
    title: 'Misclassified software ships with wrong controls',
    desc: 'A product classified as Lane A but functioning as Lane D has no risk management, no FMEA, no traced design decisions. When it fails in a clinical setting, nobody has the evidence chain to understand why — or to fix it safely.',
    dot: 'var(--cl-red)',
    consequence: 'Patient risk if it fails in clinical use',
  },
  {
    icon: '⏳',
    title: 'Good products die waiting for clearance',
    desc: 'A MedTech startup spends 18 months building. Pre-submission review finds 7 traceability gaps, 3 unlinked risk items, and a missing signed classification record. Six months of rework. Some never recover. The patients who needed it wait — or don\'t get it at all.',
    dot: 'var(--cl-amber)',
    consequence: 'Delayed access to potentially life-improving technology',
  },
  {
    icon: '🔁',
    title: 'Industry reinvents the wheel, project after project',
    desc: "Every regulated software team that doesn't have a codified framework builds one from scratch — or doesn't build one and hopes for the best. The collective waste is enormous. The same failures repeat across teams, companies, and years.",
    dot: 'var(--cl-b)',
    consequence: 'Industry-wide drag on healthcare innovation velocity',
  },
]
