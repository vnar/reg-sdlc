import { expect, test } from '@playwright/test'

test.describe('P1 UI regressions', () => {
  test('loads with Codex browser title and top branding', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle('Codex — Regulated Software Compliance Framework')
    await expect(page.getByText('Codex', { exact: true }).first()).toBeVisible()
    await expect(page.getByText('Regulated Software Compliance Framework').first()).toBeVisible()
  })

  test('main navigation routes are reachable', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: 'Framework Overview' }).click()
    await expect(page).toHaveURL(/\/$/)

    await page.getByRole('link', { name: 'Classification Model' }).click()
    await expect(page).toHaveURL(/\/classification-model$/)

    await page.getByRole('link', { name: 'Guardrails & Paved Roads' }).click()
    await expect(page).toHaveURL(/\/guardrails-paved-roads$/)

    await page.getByRole('link', { name: 'Artifact Library' }).click()
    await expect(page).toHaveURL(/\/artifact-library$/)

    await page.getByRole('link', { name: 'AI Enablement' }).click()
    await expect(page).toHaveURL(/\/ai-use-cases$/)
  })

  test('landing hero keeps Codex rebrand labels', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: /Regulated Software Compliance Framework/i }).first()).toBeVisible()
    await page.getByRole('button', { name: 'About Codex' }).click()
    await expect(page.getByText('CODEX · FRAMEWORK ATLAS')).toBeVisible()
  })

  test('changelog modal opens with codex copy and tabs', async ({ page }) => {
    await page.goto('/')

    await page.locator('.cl-sidebar-dock').click()

    const openOverlay = page.locator('.chmodal-overlay.open').first()
    await expect(openOverlay).toBeVisible()
    const modal = openOverlay.locator('.chmodal-panel').first()
    await expect(modal.getByRole('heading', { name: 'Codex — Framework Changelog & Principles' })).toBeVisible()
    await expect(modal.getByText('Version history, regulatory basis, and design philosophy for the Codex framework')).toBeVisible()
    await expect(modal.getByRole('button', { name: 'Philosophy & Principles', exact: true })).toBeVisible()
    await expect(modal.getByRole('button', { name: 'Regulations Considered', exact: true })).toBeVisible()
    await expect(modal.getByRole('button', { name: 'Changelog', exact: true })).toBeVisible()
  })

  test('changelog modal closes via Escape', async ({ page }) => {
    await page.goto('/')
    await page.locator('.cl-sidebar-dock').click()

    const heading = page.locator('.chmodal-overlay.open .chmodal-panel').first().getByRole('heading', { name: 'Codex — Framework Changelog & Principles' })
    await expect(heading).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(heading).toBeHidden()
  })
})
