# Regulated Software Compliance Reference Framework

A premium, client-facing digital framework for regulated software in healthcare.  
The experience is chapter-based and storytelling-first: regulatory universe -> classification -> SDLC lane rigor -> lifecycle -> evidence -> governance -> approvals -> traceability -> risk hotspots.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Lucide icons

## Information Architecture

- Framework Overview
- Regulatory Universe
- Classification Model
- SDLC Lanes
- Lifecycle Architecture
- Evidence Architecture
- Governance Model
- Approval Matrix
- Traceability Studio
- Compliance Risk Hotspots

## Seeded Domain Data

Mock data is centralized in `src/data/frameworkData.ts` and includes:

- 19 regulations
- 8 standards
- 3 guidance documents
- 3 certifications
- 7 licenses
- 4 SDLC lanes, 7 lifecycle phases, 5 evidence binders
- 4 governance layers, approval matrix stages, and risk tiers
- trace links for regulation -> standard -> lane -> phase -> requirement -> risk -> test -> approval

## Project Structure

`src/types/framework.ts`  
Typed framework model (`Regulation`, `Standard`, `Guidance`, `Certification`, `License`, `ClassificationDimension`, `Lane`, `LifecyclePhase`, `Binder`, `Artifact`, `GovernanceLayer`, `FunctionalRole`, `ApprovalStage`, `RiskTier`, `Requirement`, `Risk`, `Test`, `TraceLink`).

`src/data/frameworkData.ts`  
Seeded content universe and framework relationships.

`src/components/layout/AppShell.tsx`  
Premium dark chapter navigation shell.

`src/components/ui.tsx`  
Reusable cards, badges, and section components.

`src/pages/FrameworkPages.tsx`  
All major framework chapters.

## Run Locally

```bash
npm install
npm run dev
```

Default dev port: `http://localhost:5180`  
Preview port: `http://localhost:4180`

Build and preview:

```bash
npm run build
npm run preview
```
