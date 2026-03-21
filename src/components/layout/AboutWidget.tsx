import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { RELEASE_META } from '../../data/releaseMeta'

export default function AboutWidget({ inline = false }: { inline?: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    document.body.classList.toggle('about-open', open)
    return () => document.body.classList.remove('about-open')
  }, [open])

  return (
    <>
      <button
        className={`about-bubble${inline ? ' about-bubble-inline' : ''}`}
        id="aboutBubble"
        onClick={() => setOpen(true)}
        aria-label="About Codex"
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="8" />
          <line x1="12" y1="12" x2="12" y2="16" />
        </svg>
      </button>

      {typeof document !== 'undefined'
        ? createPortal(
            <div className={`about-overlay ${open ? 'active' : ''}`} id="aboutOverlay" onClick={() => setOpen(false)}>
              <div className="about-card" id="aboutCard" onClick={(e) => e.stopPropagation()}>
                <button className="about-close" onClick={() => setOpen(false)} aria-label="Close" type="button">
                  &times;
                </button>

                <div className="about-header">
                  <span className="about-wordmark">Codex</span>
                  <span className="about-tagline">Regulated Software Compliance Framework</span>
                </div>

                <div className="about-body">
                  <ul className="about-list">
                    <li>
                      <strong>A free reference portal for teams building regulated software</strong>
                      <ul>
                        <li>Covers SaMD, GxP, laboratory systems, AI/ML, and enterprise healthcare</li>
                        <li>Built for engineers, QA leads, regulatory affairs, and product owners</li>
                        <li>
                          Not an eQMS - a decision-support framework you use <em>before</em> you pick a tool
                        </li>
                      </ul>
                    </li>

              <li>
                <strong>Four SDLC Lanes - classification determines everything</strong>
                <ul>
                  <li>
                    <span className="ab-lane ab-lane-a">Non-Regulated</span> - standard engineering, no compliance obligations
                  </li>
                  <li>
                    <span className="ab-lane ab-lane-b">GxP</span> - pharma/biotech validation under GAMP 5 and 21 CFR Part 11
                  </li>
                  <li>
                    <span className="ab-lane ab-lane-c">Lab Workflow</span> - ELN/LIMS under GLP, 21 CFR Part 11, EU Annex 11
                  </li>
                  <li>
                    <span className="ab-lane ab-lane-d">SaMD</span> - IEC 62304, ISO 14971, EU MDR, FDA premarket pathway
                  </li>
                </ul>
              </li>

              <li>
                <strong>Eight-dimension Classification Model (CD-1 -&gt; CD-8)</strong>
                <ul>
                  <li>Determines which lane a product belongs in before development starts</li>
                  <li>Drives documentation depth, testing rigor, and approval overhead</li>
                </ul>
              </li>

              <li>
                <strong>Artifact Library - 27 compliance document templates</strong>
                <ul>
                  <li>Grouped across 7 lifecycle stages: Intake, Risk, Design, V&amp;V, Evidence, Governance, Release</li>
                  <li>Pre-populated PathAI Reporter examples show how templates apply in practice</li>
                </ul>
              </li>

              <li>
                <strong>AI Enablement - 10 regulated product use cases</strong>
                <ul>
                  <li>Covers FDA AI/ML SaMD action plan, NIST AI RMF, and EU AI Act obligations</li>
                  <li>From AI-assisted diagnostics to post-market surveillance automation</li>
                </ul>
              </li>

              <li>
                <strong>Regulatory frameworks considered</strong>
                <ul>
                  <li>IEC 62304 - ISO 14971 - ISO 13485 - IEC 62366</li>
                  <li>21 CFR Part 11 - 21 CFR Part 820 - EU MDR 2017/745 - EU AI Act</li>
                  <li>GAMP 5 - FDA AI/ML SaMD Guidance - NIST AI RMF</li>
                </ul>
              </li>

              <li>
                <strong>Five guiding principles</strong>
                <ul>
                  <li>Obligation-first - start from what the regulation requires</li>
                  <li>Classification determines everything - lane drives all downstream decisions</li>
                  <li>Evidence is designed, not gathered - build traceability in from day one</li>
                  <li>Governance is accountability, not bureaucracy</li>
                  <li>AI accelerates but does not replace judgment</li>
                </ul>
              </li>
                  </ul>
                </div>

                <div className="about-footer">
                  Built by <strong>viharnar</strong> &nbsp;·&nbsp; <span id="ab-version">{RELEASE_META.version}</span> &nbsp;·&nbsp; health-codex.com
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
