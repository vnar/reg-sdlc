# Branching and Release SOP

This document defines the standard branch strategy and release workflow for `reg-sdlc` hosted on AWS Amplify.

## 1) Branch model

- `main`: production branch
- `staging`: pre-production validation branch
- `feature/*`: short-lived implementation branches

### Rules

- No direct pushes to `main`
- All `main` changes go through PR review
- Prefer promoting tested `staging` commits into `main`

## 2) GitHub protections (recommended)

Apply these to `main` (and optionally `staging`):

- Require pull request before merge
- Require status checks to pass:
  - `npm run lint`
  - `npm run build`
- Require up-to-date branch before merge
- Restrict who can push directly

## 3) Amplify branch configuration

Configure one Amplify app with multiple connected branches:

- `main`
  - Stage: Production
  - Auto-build: ON
  - Auto-deploy: ON
- `staging`
  - Stage: Beta/Staging
  - Auto-build: ON
  - Auto-deploy: ON
- PR previews (if enabled by plan)
  - Auto-create preview environments for pull requests
  - Auto-delete preview after PR close/merge

Amplify build is configured by `amplify.yml` in repo root.

## 4) Required SPA rewrite

This app uses React Router (client-side routes), so add this Amplify rewrite:

- Source: `/<*>`
- Target: `/index.html`
- Type: `200 (Rewrite)`

Without this rule, deep links can 404 on refresh/direct navigation.

## 5) Environment variable strategy

Use Amplify branch-specific environment variables:

- `staging`:
  - `VITE_ENV_NAME=staging`
  - `VITE_API_BASE_URL=<staging-url>` (if API exists)
- `main`:
  - `VITE_ENV_NAME=production`
  - `VITE_API_BASE_URL=<prod-url>` (if API exists)

Note: only variables prefixed with `VITE_` are exposed to client code.

## 6) Domain mapping

Suggested DNS mapping:

- `portal.yourdomain.com` -> `main`
- `staging-portal.yourdomain.com` -> `staging`

Amplify provisions and manages SSL certificates automatically after validation.

## 7) Promotion flow

1. Open feature PR -> merge into `staging`
2. Amplify deploys `staging` automatically
3. Run staging validation:
   - All pages render
   - Deep links work (`/classification-model`, `/sdlc-lanes`, etc.)
   - Visual QA complete
4. Merge `staging` -> `main`
5. Amplify deploys production automatically
6. Run production smoke test

## 8) Release checklist

Before merge to `main`:

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Staging functional QA complete
- [ ] Staging visual QA complete
- [ ] Rewrite rule verified
- [ ] Rollback target identified

After production deploy:

- [ ] Home page loads
- [ ] Deep links load directly
- [ ] Navigation works across all chapters
- [ ] Custom domain + SSL healthy

## 9) Rollback procedure

If production issue is detected:

1. Amplify -> Deployments -> select last known good deployment -> **Redeploy**
2. Create follow-up fix PR to `staging`
3. Re-promote after validation

Alternative rollback path:
- Revert problematic Git commit(s) on `main` and let Amplify redeploy.

## 10) Ownership

- Engineering owner: release execution and rollback
- Product/Business owner: go-live approval
- Quality/Compliance owner: final compliance messaging/traceability review

