import { useEffect, useState, type MouseEvent } from 'react'
import { RELEASE_COMMITS, RELEASE_META } from '../../data/releaseMeta'
import { LINKEDIN_WEB_URL } from '../../config/social'
import { openLinkedInProfile } from '../../utils/linkedin'
import { HomeLanding } from './home/HomeLanding'

type ChangelogTab = 'changelog' | 'philosophy' | 'regulations'

const CHANGELOG_ENTRIES = RELEASE_COMMITS.map((entry, idx) => ({
  version: idx === 0 ? RELEASE_META.version : 'Commit',
  date: entry.date,
  commit: entry.commit,
  current: entry.current,
  items: [{ type: 'COMMIT', text: entry.message }],
}))

const REGULATION_ROWS = [
  ['IEC 62304:2015+AMD1', 'Core', 'Global', 'Defines SDLC process requirements for medical device software — primary structural basis for Lane C/D lifecycle phases and evidence requirements'],
  ['ISO 14971:2019', 'Safety', 'Global', 'Risk management throughout the lifecycle — basis for FMEA structure, risk acceptance criteria, and post-market risk monitoring requirements'],
  ['EU MDR 2017/745', 'Core', 'EU', 'Device classification, GSPR obligations, Technical File structure, post-market surveillance (Article 83) and PSUR (Article 86) requirements'],
  ['FDA 21 CFR Part 820', 'Core', 'US', 'Design control requirements — basis for Design History File structure and phase gate approval requirements in Lane D'],
  ['21 CFR Part 11', 'Quality', 'US', 'Electronic records and signatures — drives ART-020 assessment requirements and audit trail verification obligations across Lanes B–D'],
  ['GAMP 5 (2nd Ed.)', 'Quality', 'Global', 'Computer system validation approach — basis for Lane B IQ/OQ/PQ structure, GAMP category classification, and supplier qualification requirements'],
  ['FDA AI/ML SaMD Action Plan', 'AI', 'US', 'Predetermined change control plan concept — drives AI/ML model assessment requirements and change significance classifier design in UC-01'],
  ['NIST AI RMF', 'AI', 'US', 'AI risk management framework — maps to AI Guardrails track in Guardrails & Paved Roads; basis for AI/ML Model Assessment (ART-009)'],
  ['EU AI Act (2024)', 'AI', 'EU', 'High-risk AI system requirements — incorporated into UC-04 dual-compliance model and Classification Model CD-1/CD-2 scoring for AI-enabled products'],
  ['FDA Cybersecurity Guidance 2023', 'Safety', 'US', 'SBOM requirements and cybersecurity lifecycle obligations — basis for ART-007 Cybersecurity Risk Assessment and UC-07 automation model'],
  ['GDPR / 45 CFR Part 164', 'Privacy', 'EU / US', 'Privacy by design obligations — drives ART-013 DPIA requirements and data handling controls in Lane B–D evidence requirements'],
  ['ISO 13485:2016', 'Quality', 'Global', 'QMS requirements for medical device organizations — informs governance model role definitions and approval authority structure'],
] as const

export function FrameworkOverviewLanding() {
  const [changelogOpen, setChangelogOpen] = useState(false)
  const [activeChangelogTab, setActiveChangelogTab] = useState<ChangelogTab>('changelog')

  const openChangelogModal = () => setChangelogOpen(true)
  const closeChangelogModal = () => setChangelogOpen(false)
  const switchChangelogTab = (name: ChangelogTab) => setActiveChangelogTab(name)
  const handleLinkedInClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    e.stopPropagation()
    openLinkedInProfile()
  }

  useEffect(() => {
    if (!changelogOpen) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChangelogModal()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [changelogOpen])

  const changeTagClass = (type: string) => {
    if (type === 'NEW') return 'chmodal-tag chmodal-tag-new'
    if (type === 'UPDATE') return 'chmodal-tag chmodal-tag-update'
    if (type === 'FIX') return 'chmodal-tag chmodal-tag-fix'
    return 'chmodal-tag chmodal-tag-content'
  }

  const categoryClass = (category: string) => {
    if (category === 'Core') return 'chmodal-cat chmodal-cat-core'
    if (category === 'Safety') return 'chmodal-cat chmodal-cat-safety'
    if (category === 'Quality') return 'chmodal-cat chmodal-cat-quality'
    if (category === 'AI') return 'chmodal-cat chmodal-cat-ai'
    return 'chmodal-cat chmodal-cat-privacy'
  }

  return (
    <div className="space-y-5 pb-4">
      <HomeLanding />

      <div
        className="cl-footer-bar"
        role="button"
        tabIndex={0}
        onClick={openChangelogModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') openChangelogModal()
        }}
      >
        <div className="cl-row cl-row-top">
          <span className="cl-pulse-dot" />
          <span className="cl-version-badge">{RELEASE_META.version}</span>
          <span className="cl-sep" />
          <span className="cl-commit-badge">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 6a3 3 0 1 0 0 6h3.5a3.5 3.5 0 0 1 7 0h1.5v-2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 0 0 0 6h3v-2H7a1 1 0 1 1 0-2h3.5a3.5 3.5 0 0 1 7 0H19v2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 1 0 0 6h3v-2H7a1 1 0 1 1 0-2h3.5a3.5 3.5 0 0 1 7 0H19v-2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 1 0 0 6h3v-2H7a1 1 0 1 1 0-2h3.5a3.5 3.5 0 0 1 7 0H19v-2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 1 0 0 6h3v-2H7a1 1 0 1 1 0-2h3.5a3.5 3.5 0 0 1 7 0H19v-2h-1.5a3.5 3.5 0 0 1-7 0H7a3 3 0 1 0 0 6h3" />
            </svg>
            {RELEASE_META.latestCommit}
          </span>
        </div>
        <div className="cl-row cl-row-bottom">
          <a className="cl-repo" href={RELEASE_META.repoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17 9V7a5 5 0 0 0-10 0v2H5v11h14V9h-2zm-8 0V7a3 3 0 0 1 6 0v2H9z" />
            </svg>
            {RELEASE_META.repoLabel}
            <span className="cl-private-pill">private</span>
          </a>
          <span className="cl-sep" />
          <a className="cl-author-link" href={LINKEDIN_WEB_URL} target="_blank" rel="noreferrer" onClick={handleLinkedInClick}>
            {RELEASE_META.authorName}
          </a>
          <span className="cl-sep" />
          <span className="cl-hint cl-hint-inline">
            View changelog &amp; principles
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 4l4 4H4l4-4z" />
            </svg>
          </span>
        </div>
      </div>

      <div id="changelogModal" className={`chmodal-overlay ${changelogOpen ? 'open' : ''}`} onClick={(e) => (e.target === e.currentTarget ? closeChangelogModal() : null)}>
        <div className="chmodal-panel">
          <header className="chmodal-header">
            <div className="chmodal-header-left">
              <h2>Codex — Framework Changelog &amp; Principles</h2>
              <p>Version history, regulatory basis, and design philosophy for the Codex framework</p>
              <div className="chmodal-meta">
                <span className="cl-version-badge">{RELEASE_META.version}</span>
                <span className="cl-commit-badge">{RELEASE_META.latestCommit}</span>
                <span className="chmodal-current-pill">● Current</span>
              </div>
            </div>
            <button type="button" className="chmodal-close-btn" onClick={closeChangelogModal} aria-label="Close changelog modal">
              ×
            </button>
          </header>

          <div className="chmodal-tabs">
            <button type="button" className={`chmodal-tab ${activeChangelogTab === 'changelog' ? 'active' : ''}`} onClick={() => switchChangelogTab('changelog')}>
              Changelog
            </button>
            <button type="button" className={`chmodal-tab ${activeChangelogTab === 'philosophy' ? 'active' : ''}`} onClick={() => switchChangelogTab('philosophy')}>
              Philosophy &amp; Principles
            </button>
            <button type="button" className={`chmodal-tab ${activeChangelogTab === 'regulations' ? 'active' : ''}`} onClick={() => switchChangelogTab('regulations')}>
              Regulations Considered
            </button>
          </div>

          <div className="chmodal-body">
            <section id="chtab-changelog" className={`chmodal-tab-panel ${activeChangelogTab === 'changelog' ? 'active' : ''}`}>
              <div className="chmodal-timeline">
                {CHANGELOG_ENTRIES.map((entry, idx) => (
                  <div key={entry.commit} className="chmodal-tl-entry">
                    <div className="chmodal-tl-left">
                      <span className={`chmodal-tl-dot ${entry.current ? 'current' : ''}`} />
                      {idx < CHANGELOG_ENTRIES.length - 1 ? <span className="chmodal-tl-line" /> : null}
                    </div>
                    <div className="chmodal-tl-content">
                      <div className="chmodal-entry-head">
                        <h3>{entry.version}</h3>
                        <span>{entry.date}</span>
                        <span className="cl-commit-badge">{entry.commit}</span>
                        {entry.current ? <span className="chmodal-current-pill">Current</span> : null}
                      </div>
                      <ul className="chmodal-entry-list">
                        {entry.items.map((item) => (
                          <li key={item.text}>
                            <span className={changeTagClass(item.type)}>{item.type}</span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="chtab-philosophy" className={`chmodal-tab-panel ${activeChangelogTab === 'philosophy' ? 'active' : ''}`}>
              <div className="chmodal-section-head">
                <span>Why this framework exists</span>
                <div />
              </div>
              <p className="chmodal-copy">
                Regulated software teams consistently fail not because they lack smart people or good intentions — they fail because they lack a coherent operating model. Regulatory obligations are
                scattered across standards that don&apos;t talk to each other. SDLC practices from engineering don&apos;t map to evidence expectations from QA. Governance decisions are made informally and
                undocumented. Evidence is assembled retroactively. This framework exists to close that gap — to give teams one place where obligation, lifecycle, governance, and evidence connect into a
                single, navigable system.
              </p>

              <div className="chmodal-section-head">
                <span>Core design principles</span>
                <div />
              </div>
              <div className="chmodal-principles">
                {[
                  ['01', 'Obligation-first, not standard-first', 'Most frameworks start with a standard (IEC 62304) and work forward. This one starts with the obligation — what does the regulator actually need to see — and works backward to which standard creates that obligation and which artifact satisfies it. That shift changes everything about how teams prioritize effort.'],
                  ['02', 'Classification determines everything else', 'Lane assignment is not a compliance checkbox. It is the single decision that dictates every process requirement, evidence expectation, and approval authority for a product. Getting classification right at the start eliminates the most common and most expensive compliance failure: discovering at validation that the product required more than was built for.'],
                  ['03', 'Evidence is designed, not gathered', 'Teams that treat evidence as something to collect before an audit consistently fail audits. Evidence must be designed into the development process — artifact triggers defined, traceability built in from day one, approval authorities established before work begins. This framework makes evidence production a natural output of doing the work, not a parallel effort.'],
                  ['04', 'Governance is accountability, not bureaucracy', 'Governance layers L1–L4 are not designed to slow teams down. They are designed to make clear, at every level, who is accountable for what. When accountability is ambiguous, decisions get deferred, documents get orphaned, and audit findings get made. The L1–L4 model makes accountability explicit without adding process overhead.'],
                  ['05', 'AI accelerates compliance — it does not replace judgment', 'Every AI capability in this framework is positioned as an accelerant for surveillance, linking, drafting, and detection — the high-volume, rule-based work. Approvals, risk acceptance decisions, and regulatory submissions require human accountability. The framework draws that line clearly and will not move it.'],
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

            <section id="chtab-regulations" className={`chmodal-tab-panel ${activeChangelogTab === 'regulations' ? 'active' : ''}`}>
              <p className="chmodal-copy-sm">
                The following regulations, standards, and guidance documents were reviewed and considered in the design of this framework. Inclusion indicates that the framework&apos;s structure, lane
                definitions, evidence requirements, and governance model are designed to satisfy the obligations these documents create.
              </p>
              <div className="chmodal-table-wrap">
                <table className="chmodal-table">
                  <thead>
                    <tr>
                      <th>Standard / Regulation</th>
                      <th>Category</th>
                      <th>Jurisdiction</th>
                      <th>How it shaped the framework</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REGULATION_ROWS.map(([standard, category, jurisdiction, impact]) => (
                      <tr key={standard}>
                        <td className="chmodal-standard-name">{standard}</td>
                        <td>
                          <span className={categoryClass(category)}>{category}</span>
                        </td>
                        <td>{jurisdiction}</td>
                        <td>{impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
