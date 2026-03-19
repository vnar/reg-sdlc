export type Category = 'Regulation' | 'Standard' | 'Guidance' | 'Certification' | 'License'
export type LaneId = 'A' | 'B' | 'C' | 'D'
export type SoftwareImpact = 'High' | 'Moderate' | 'Foundational'

export interface Regulation {
  id: string
  title: string
  category: Category
  governingBody: string
  jurisdiction: string
  overview: string
  scope: string
  keyRequirements: string[]
  softwareRelevance: string
  softwareImpact: SoftwareImpact
  triggerScenarios: string[]
  linkedLanes: LaneId[]
  linkedPhases: string[]
  linkedArtifacts: string[]
  softwareTypes: string[]
}

export interface Standard {
  id: string
  title: string
  category: 'Standard'
  governingBody: string
  jurisdiction: string
  overview: string
  scope: string
  keyRequirements: string[]
  softwareRelevance: string
  softwareImpact: SoftwareImpact
  triggerScenarios: string[]
  linkedLanes: LaneId[]
  linkedPhases: string[]
  linkedArtifacts: string[]
  softwareTypes: string[]
}

export interface Guidance {
  id: string
  title: string
  category: 'Guidance'
  governingBody: string
  jurisdiction: string
  overview: string
  scope: string
  keyRequirements: string[]
  softwareRelevance: string
  softwareImpact: SoftwareImpact
  triggerScenarios: string[]
  linkedLanes: LaneId[]
  linkedPhases: string[]
  linkedArtifacts: string[]
  softwareTypes: string[]
}

export interface Certification {
  id: string
  title: string
  category: 'Certification'
  governingBody: string
  jurisdiction: string
  overview: string
  scope: string
  keyRequirements: string[]
  softwareRelevance: string
  softwareImpact: SoftwareImpact
  triggerScenarios: string[]
  linkedLanes: LaneId[]
  linkedPhases: string[]
  linkedArtifacts: string[]
  softwareTypes: string[]
}

export interface License {
  id: string
  title: string
  category: 'License'
  governingBody: string
  jurisdiction: string
  overview: string
  scope: string
  keyRequirements: string[]
  softwareRelevance: string
  softwareImpact: SoftwareImpact
  triggerScenarios: string[]
  linkedLanes: LaneId[]
  linkedPhases: string[]
  linkedArtifacts: string[]
  softwareTypes: string[]
}

export interface ClassificationDimension {
  id: string
  name: string
  description: string
  decisionPrompt: string
}

export interface Lane {
  id: LaneId
  name: string
  subtitle: string
  softwareType: string
  examples: string[]
  triggers: string[]
  controlsRequired: string[]
  lifecycleRigor: string
  evidenceDepth: string
  approvalIntensity: string
  ownersApprovers: string[]
}

export interface LifecyclePhase {
  id: number
  name: string
  purpose: string
  activities: string[]
  outputs: string[]
  approvers: string[]
  exitCriteria: string[]
}

export interface Binder {
  id: number
  name: string
  purpose: string
  contents: string[]
  associatedLanes: LaneId[]
  lifecyclePhases: string[]
  auditValue: string
}

export interface Artifact {
  id: string
  name: string
  binder: string
  phase: string
  laneApplicability: LaneId[]
  author: string
  reviewers: string[]
  approvers: string[]
}

export interface GovernanceLayer {
  id: string
  name: string
  members: string[]
  purpose: string
  decisionRights: string[]
  approves: string[]
  escalationTo: string
}

export interface FunctionalRole {
  id: string
  role: string
  owns: string[]
}

export interface ApprovalStage {
  stage: string
  artifactPackage: string
  author: string
  reviewers: string[]
  approvers: string[]
}

export interface RiskTier {
  id: string
  name: string
  description: string
  requiredApprovers: string[]
  governancePath: string
}

export interface Requirement {
  id: string
  name: string
  lane: LaneId
}

export interface Risk {
  id: string
  name: string
  severity: 'Low' | 'Moderate' | 'High'
}

export interface Test {
  id: string
  name: string
  type: string
}

export interface TraceLink {
  id: string
  regulation: string
  standard: string
  lane: LaneId
  phase: string
  requirement: string
  risk: string
  design: string
  test: string
  approval: string
  artifact: string
}

export interface ComplianceHotspot {
  rank: number
  title: string
  failureMode: string
  whyItMatters: string
  consequence: string
  impactedFunctions: string[]
}

export interface ExecutiveProblem {
  id: number
  title: string
  description: string
  result: string
}

export interface BusinessImpact {
  title: string
  points: string[]
}

export interface GuardrailPattern {
  id: string
  domain: 'Compliance Engineering' | 'Security by Design' | 'AI Guardrails'
  title: string
  controlType: 'Preventive' | 'Detective' | 'Corrective' | 'Automated' | 'Human Approval'
  lifecyclePhases: string[]
  implementation: string
}
