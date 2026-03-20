import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type ChangelogTab = 'changelog' | 'philosophy' | 'regulations'

const CHANGELOG_META = {
  version: 'v1.0.0',
  latestCommit: '1962022',
  lastPublished: '20 Mar 2026',
  repoLabel: 'vnar / reg-sdlc',
  repoUrl: 'https://github.com/vnar/reg-sdlc',
  authorName: 'Vihar Nar',
  authorUrl: 'https://www.linkedin.com/in/viharnar/',
} as const

const CHANGELOG_ENTRIES = [
  { commit: '1962022', date: '20 Mar 2026', message: 'Add Artifact Library navigation and tree template explorer', current: true },
  { commit: 'd99f9db', date: '19 Mar 2026', message: 'Polish framework presentation and export behavior for production demos.', current: false },
  { commit: '56ef861', date: '19 Mar 2026', message: 'AppShell: restore left sidebar with collapsible rail and mobile drawer', current: false },
  { commit: '6e05223', date: '19 Mar 2026', message: 'Refine framework pages with interactive detail states and realistic traceability data.', current: false },
  { commit: 'a46462e', date: '19 Mar 2026', message: '2nd change', current: false },
  { commit: '7c3d935', date: '19 Mar 2026', message: 'promote to AWS', current: false },
  { commit: 'ab69482', date: '19 Mar 2026', message: 'Initialize regulated software compliance reference framework baseline', current: false },
]

const REGULATION_ROWS = [
  ['IEC 62304:2015+AMD1', 'Core', 'Global', 'Defines SDLC process requirements for medical device software — primary structural basis for Lane C/D lifecycle phases and evidence requirements'],
  ['ISO 14971:2019', 'Safety', 'Global', 'Risk management throughout the lifecycle — basis for FMEA structure, risk acceptance criteria, and post-market risk monitoring requirements'],
  ['EU MDR 2017/745', 'Core', 'EU', 'Device classification, GSPR obligations, Technical File structure, post-market surveillance and PSUR requirements'],
  ['FDA 21 CFR Part 820', 'Core', 'US', 'Design control requirements — basis for Design History File structure and phase gate approval requirements in Lane D'],
  ['21 CFR Part 11', 'Quality', 'US', 'Electronic records and signatures — drives ART-020 assessment requirements and audit trail verification obligations across Lanes B–D'],
  ['GAMP 5 (2nd Ed.)', 'Quality', 'Global', 'Computer system validation approach — basis for Lane B IQ/OQ/PQ structure and supplier qualification requirements'],
  ['FDA AI/ML SaMD Action Plan', 'AI', 'US', 'Predetermined change control plan concept — drives AI/ML model assessment requirements and change significance classifier design in UC-01'],
  ['NIST AI RMF', 'AI', 'US', 'AI risk management framework — maps to AI Guardrails track in Guardrails & Paved Roads; basis for AI/ML Model Assessment (ART-009)'],
  ['EU AI Act (2024)', 'AI', 'EU', 'High-risk AI system requirements — incorporated into UC-04 dual-compliance model and Classification Model scoring'],
  ['FDA Cybersecurity Guidance 2023', 'Safety', 'US', 'SBOM requirements and cybersecurity lifecycle obligations — basis for ART-007 Cybersecurity Risk Assessment and UC-07 automation model'],
  ['GDPR / 45 CFR Part 164', 'Privacy', 'EU / US', 'Privacy by design obligations — drives ART-013 DPIA requirements and data handling controls in Lane B–D evidence requirements'],
  ['ISO 13485:2016', 'Quality', 'Global', 'QMS requirements for medical device organizations — informs governance model role definitions and approval authority structure'],
] as const

export default function ChangelogDock() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<ChangelogTab>('philosophy')

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  const catClass = (category: string) =>
    category === 'Core'
      ? 'chmodal-cat chmodal-cat-core'
      : category === 'Safety'
        ? 'chmodal-cat chmodal-cat-safety'
        : category === 'Quality'
          ? 'chmodal-cat chmodal-cat-quality'
          : category === 'AI'
            ? 'chmodal-cat chmodal-cat-ai'
            : 'chmodal-cat chmodal-cat-privacy'

  return (
    <>
      <div className="cl-sidebar-dock" role="button" tabIndex={0} onClick={() => setOpen(true)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? setOpen(true) : null)}>
        <div className="cl-row cl-row-top">
          <span className="cl-pulse-dot" />
          <span className="cl-version-badge">{CHANGELOG_META.version}</span>
          <span className="cl-sep" />
          <span className="cl-commit-badge">{CHANGELOG_META.latestCommit}</span>
        </div>
        <div className="cl-row cl-row-bottom">
          <span className="cl-row-dot" />
          <a className="cl-repo" href={CHANGELOG_META.repoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            {CHANGELOG_META.repoLabel}
            <span className="cl-private-pill">private</span>
          </a>
        </div>
        <div className="cl-row cl-row-bottom">
          <span className="cl-row-dot" />
          <a className="cl-author-link" href={CHANGELOG_META.authorUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            {CHANGELOG_META.authorName}
          </a>
        </div>
        <div className="cl-row">
          <span className="cl-hint">View changelog &amp; principles</span>
        </div>
      </div>

      {createPortal(
        <div className={`chmodal-overlay ${open ? 'open' : ''}`} onClick={(e) => (e.target === e.currentTarget ? setOpen(false) : null)}>
          <div className="chmodal-panel">
          <header className="chmodal-header">
            <div className="chmodal-header-left">
              <h2>Framework Changelog &amp; Principles</h2>
              <p>Version history, regulatory basis, and design philosophy</p>
              <div className="chmodal-meta">
                <span className="cl-version-badge">{CHANGELOG_META.version}</span>
                <span className="cl-commit-badge">{CHANGELOG_META.latestCommit}</span>
                <span className="chmodal-current-pill">● Current</span>
              </div>
            </div>
            <button type="button" className="chmodal-close-btn" onClick={() => setOpen(false)} aria-label="Close changelog modal">
              ×
            </button>
          </header>
          <div className="chmodal-tabs">
            <button type="button" className={`chmodal-tab ${tab === 'philosophy' ? 'active' : ''}`} onClick={() => setTab('philosophy')}>Philosophy &amp; Principles</button>
            <button type="button" className={`chmodal-tab ${tab === 'regulations' ? 'active' : ''}`} onClick={() => setTab('regulations')}>Regulations Considered</button>
            <button type="button" className={`chmodal-tab ${tab === 'changelog' ? 'active' : ''}`} onClick={() => setTab('changelog')}>Changelog</button>
          </div>
          <div className="chmodal-body">
            <section className={`chmodal-tab-panel ${tab === 'philosophy' ? 'active' : ''}`}>
              <div className="chmodal-section-head"><span>Why this framework exists</span><div /></div>
              <p className="chmodal-copy">Regulated software teams consistently fail not because they lack smart people or good intentions — they fail because they lack a coherent operating model. Regulatory obligations are scattered across standards that don't talk to each other. SDLC practices from engineering don't map to evidence expectations from QA. Governance decisions are made informally and undocumented. Evidence is assembled retroactively. This framework exists to close that gap — to give teams one place where obligation, lifecycle, governance, and evidence connect into a single, navigable system.</p>
              <div className="chmodal-section-head"><span>Core design principles</span><div /></div>
              <div className="chmodal-principles">
                {[
                  ['01', 'Obligation-first, not standard-first', 'Most frameworks start with a standard and work forward. This one starts with the obligation — what the regulator needs to see — then maps standards and artifacts backward from that obligation.'],
                  ['02', 'Classification determines everything else', 'Lane assignment dictates process rigor, evidence depth, and approval authority. Getting this right early prevents expensive late-stage compliance rework.'],
                  ['03', 'Evidence is designed, not gathered', 'Evidence should be an output of delivery, not a separate retrospective effort. Artifact triggers, traceability, and approvals are built in from day one.'],
                  ['04', 'Governance is accountability, not bureaucracy', 'L1–L4 governance clarifies who decides what and when. That clarity reduces delays, orphaned decisions, and audit findings.'],
                  ['05', 'AI accelerates compliance — it does not replace judgment', 'AI is used for detection, linking, and drafting. Human owners remain accountable for risk acceptance and regulatory decisions.'],
                ].map(([num, title, body]) => (
                  <article key={num} className="chmodal-principle-card">
                    <span className="chmodal-principle-num">{num}</span>
                    <div>
                      <h4>{title}</h4>
                      <p>{body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={`chmodal-tab-panel ${tab === 'regulations' ? 'active' : ''}`}>
              <p className="chmodal-copy-sm">The following regulations, standards, and guidance documents were reviewed and considered in the design of this framework.</p>
              <div className="chmodal-table-wrap">
                <table className="chmodal-table">
                  <thead>
                    <tr><th>Standard / Regulation</th><th>Category</th><th>Jurisdiction</th><th>How it shaped the framework</th></tr>
                  </thead>
                  <tbody>
                    {REGULATION_ROWS.map(([standard, category, jurisdiction, impact]) => (
                      <tr key={standard}>
                        <td className="chmodal-standard-name">{standard}</td>
                        <td><span className={catClass(category)}>{category}</span></td>
                        <td>{jurisdiction}</td>
                        <td>{impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className={`chmodal-tab-panel ${tab === 'changelog' ? 'active' : ''}`}>
              <p className="chmodal-copy-sm">Real commit history from the repository:</p>
              <div className="chmodal-timeline">
                {CHANGELOG_ENTRIES.map((entry, idx) => (
                  <div key={entry.commit} className="chmodal-tl-entry">
                    <div className="chmodal-tl-left">
                      <span className={`chmodal-tl-dot ${entry.current ? 'current' : ''}`} />
                      {idx < CHANGELOG_ENTRIES.length - 1 ? <span className="chmodal-tl-line" /> : null}
                    </div>
                    <div className="chmodal-tl-content">
                      <div className="chmodal-entry-head">
                        <h3>{entry.current ? 'Current' : 'Commit'}</h3>
                        <span>{entry.date}</span>
                        <span className="cl-commit-badge">{entry.commit}</span>
                      </div>
                      <ul className="chmodal-entry-list">
                        <li>
                          <span className="chmodal-tag chmodal-tag-content">COMMIT</span>
                          <span>{entry.message}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

