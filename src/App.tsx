import { lazy, Suspense, useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { initAnalytics, trackPageView } from './utils/analytics'

const FrameworkOverviewPage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.FrameworkOverviewPage })))
const RegulatoryUniversePage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.RegulatoryUniversePage })))
const ClassificationModelPage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.ClassificationModelPage })))
const SDLCLanesPage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.SDLCLanesPage })))
const LifecycleArchitecturePage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.LifecycleArchitecturePage })))
const EvidenceArchitecturePage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.EvidenceArchitecturePage })))
const GovernanceModelPage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.GovernanceModelPage })))
const ApprovalMatrixPage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.ApprovalMatrixPage })))
const GuardrailsPavedRoadsPage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.GuardrailsPavedRoadsPage })))
const TraceabilityStudioPage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.TraceabilityStudioPage })))
const ComplianceRiskHotspotsPage = lazy(() => import('./pages/FrameworkPages').then((m) => ({ default: m.ComplianceRiskHotspotsPage })))
const ArtifactLibraryPage = lazy(() => import('./pages/ArtifactLibraryPage'))
const AIUseCasesPage = lazy(() => import('./pages/AIUseCasesPage'))

function RouteAnalytics() {
  const location = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    // Initial page view is tracked by GA script config in index.html.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    trackPageView(location.pathname)
  }, [location.pathname])

  return null
}

function App() {
  return (
    <AppShell>
      <RouteAnalytics />
      <Suspense fallback={<div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-sm text-slate-300">Loading workspace...</div>}>
        <Routes>
          <Route path="/" element={<FrameworkOverviewPage />} />
          <Route path="/regulatory-universe" element={<RegulatoryUniversePage />} />
          <Route path="/classification-model" element={<ClassificationModelPage />} />
          <Route path="/sdlc-lanes" element={<SDLCLanesPage />} />
          <Route path="/lifecycle-architecture" element={<LifecycleArchitecturePage />} />
          <Route path="/evidence-architecture" element={<EvidenceArchitecturePage />} />
          <Route path="/governance-model" element={<GovernanceModelPage />} />
          <Route path="/approval-matrix" element={<ApprovalMatrixPage />} />
          <Route path="/guardrails-paved-roads" element={<GuardrailsPavedRoadsPage />} />
          <Route path="/traceability-studio" element={<TraceabilityStudioPage />} />
          <Route path="/compliance-risk-hotspots" element={<ComplianceRiskHotspotsPage />} />
          <Route path="/artifact-library" element={<ArtifactLibraryPage />} />
          <Route path="/ai-use-cases" element={<AIUseCasesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  )
}

export default App
