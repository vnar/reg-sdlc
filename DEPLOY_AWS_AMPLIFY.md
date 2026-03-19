# Deploy to AWS Amplify (reg-sdlc)

This project is a Vite + React SPA (React Router), so Amplify needs:
- build output from `dist`
- SPA rewrite rule to `index.html`

## 1) One-time setup in Amplify

1. Open AWS Console -> Amplify -> **Host web app**.
2. Connect Git provider and select this repo + target branch (usually `main`).
3. Confirm Amplify picks up `amplify.yml` from repo root.
4. Click **Save and deploy**.

## 2) Build settings used

Amplify uses `amplify.yml` in this repo:
- Install: `npm ci`
- Build: `npm run build`
- Output: `dist`

## 3) Required SPA rewrite rule

Because this app uses client-side routes (for example `/sdlc-lanes`, `/governance-model`, `/traceability-studio`), add this in Amplify:

- Amplify app -> **Hosting** -> **Rewrites and redirects** -> **Add rule**
- Source address: `/<*>`
- Target address: `/index.html`
- Type: `200 (Rewrite)`

This prevents 404s when loading deep links directly.

## 4) Environment variables (if/when used)

If you add runtime config, use Amplify app settings -> **Environment variables**.
For Vite, only vars prefixed with `VITE_` are exposed to client code.

Examples:
- `VITE_API_BASE_URL`
- `VITE_ENV_NAME`

After changes, trigger redeploy.

## 5) Promote flow (recommended)

- `staging` branch -> staging Amplify branch
- validate UI/routes/content
- merge into `main` -> production Amplify branch auto-deploy

## 6) Custom domain

Amplify -> **Domain management**:
- connect domain/subdomain
- map branch (for example `main` -> `portal.yourdomain.com`)
- SSL certificate is managed by AWS

## 7) Go-live checklist

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] App loads from `/`
- [ ] Deep links load directly (for example `/classification-model`, `/guardrails-paved-roads`)
- [ ] Navigation works across all chapters
- [ ] Custom domain + SSL active
- [ ] Rollback plan: previous successful Amplify deployment identified

