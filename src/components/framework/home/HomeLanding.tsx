import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { RELEASE_META } from '../../../data/releaseMeta'
import { LINKEDIN_WEB_URL } from '../../../config/social'
import {
  AI_ITEMS,
  CHAIN_NODES,
  CHAPTER_LINKS,
  CHAPTER_LANE_DEFS,
  CLASSIFICATION_INPUTS,
  LANES_DETAIL,
  LANE_OUTPUTS,
  MARQUEE_ITEMS,
  PRINCIPLES,
  ROLE_CARDS,
  ROLE_ROTATE,
  STATS_EDITORIAL,
  STAKES_CARDS,
} from './landingData'

function ChainArrow() {
  return (
    <svg width="26" height="2" viewBox="0 0 26 2" aria-hidden className="cl-cn-arr">
      <line x1="0" y1="1" x2="26" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  )
}

export function HomeLanding() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [roleIdx, setRoleIdx] = useState(0)
  const [stripOpaque, setStripOpaque] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  /** At most one chapter open — calmer scan, clearer focus. */
  const [openChapterId, setOpenChapterId] = useState<string | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (reduceMotion) {
        setRoleIdx((i) => (i + 1) % ROLE_ROTATE.length)
        return
      }
      setStripOpaque(false)
      window.setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLE_ROTATE.length)
        setStripOpaque(true)
      }, 350)
    }, 3000)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = root.querySelectorAll<HTMLElement>('.cl-r')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('cl-v')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.07, rootMargin: '0px 0px -36px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const loopMarquee = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  const cur = ROLE_ROTATE[roleIdx]

  const toggleChapter = (path: string) => {
    setOpenChapterId((cur) => (cur === path ? null : path))
  }

  const chapterPanelId = (path: string) =>
    `ch-panel-${path.replace(/^\//, '').replace(/\//g, '-')}`

  const chapterBtnId = (path: string) => `ch-btn-${path.replace(/^\//, '').replace(/\//g, '-')}`

  return (
    <div
      ref={rootRef}
      className="codex-landing-root -mx-4 overflow-x-hidden rounded-2xl border border-white/10 bg-slate-950/35 shadow-[0_0_0_1px_rgba(0,0,0,0.4)] backdrop-blur-xl md:-mx-6"
    >
      <div
        className="cl-marquee cl-marquee--lead"
        role="region"
        aria-label="Regulatory standards and frameworks referenced in Codex"
        tabIndex={0}
      >
        <div className="cl-m-track">
          {loopMarquee.map((item, i) => (
            <span key={`${item.label}-${i}`} className="cl-m-item">
              <span className="cl-d" style={{ background: item.dot }} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <section className="cl-hero" data-testid="home-hero">
        <div className="cl-hero-grid" aria-hidden />
        <div className="cl-orb cl-orb1" aria-hidden />
        <div className="cl-orb cl-orb2" aria-hidden />
        <div className="cl-orb cl-orb3" aria-hidden />

        <div className="cl-cred-badge">
          <div className="cl-avatar">V</div>
          <span>
            Built by <strong>Vihar Nar</strong> · Deep-domain expertise in regulated software · Freely shared
          </span>
        </div>

        <h1 className="cl-hero-h1">Good healthcare software</h1>
        <h1 className="cl-hero-h2">
          <span className="cl-gt">dies at the regulatory wall.</span>
        </h1>

        <h2 className="cl-framework-subtitle">Regulated Software Compliance Framework</h2>

        <div
          className="cl-role-strip"
          style={{ opacity: stripOpaque ? 1 : 0, transform: stripOpaque ? 'translateY(0)' : 'translateY(8px)' }}
        >
          <span className="cl-rs-verb">{cur.verb}</span>
          <span className="cl-rs-sep">·</span>
          <span className="cl-rs-role">{cur.role}</span>
        </div>

        <p className="cl-hero-sub">
          Not because the teams aren&apos;t brilliant. Because <em>nobody gave them a clear map.</em>
          <br />
          Codex is that map — years of regulated software experience, codified and given freely, so every team can build software that actually reaches the patients who need it.
        </p>

        <div className="cl-hero-btns">
          <Link to="/" className="cl-btn-p">
            Open the Framework
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/classification-model" className="cl-btn-s">
            Classify your product first
          </Link>
        </div>

        <div className="cl-scroll-hint">
          <span>scroll to explore</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      <div className="cl-origin cl-r">
        <div>
          <div className="cl-eyebrow">Why Codex Exists</div>
          <div className="cl-origin-quote">
            &quot;Regulated teams don&apos;t fail for lack of intelligence.
            <br />
            They fail because <span>no one codified the map.</span>&quot;
          </div>
          <p className="cl-origin-body">
            I&apos;ve watched brilliant engineers build genuinely valuable healthcare software — products that could improve clinical decisions, accelerate diagnoses, reduce medication errors — and hit
            the regulatory wall at month 14. Not because the software was bad. Because the classification was wrong. The evidence was assembled retroactively. The approvals were informal. The
            traceability was an afterthought.
          </p>
          <p className="cl-origin-body" style={{ marginTop: 16 }}>
            The knowledge to prevent those failures exists. It lives inside the heads of experienced regulatory affairs professionals, quality leads, and compliance consultants — people whose time is
            expensive, and whose knowledge walks out the door when the engagement ends.
          </p>
          <p className="cl-origin-body" style={{ marginTop: 16 }}>
            Codex is that knowledge, codified. Free. Open. Structured for the engineering team doing the actual work — not written for auditors, not locked behind a paywall, not buried in 80 pages of
            cross-referenced standards.
          </p>
          <div className="cl-origin-sig">
            <div className="cl-origin-avatar">V</div>
            <div>
              <div className="cl-origin-name">Vihar Nar</div>
              <div className="cl-origin-role">
                Builder of Codex ·{' '}
                <a href={LINKEDIN_WEB_URL} target="_blank" rel="noreferrer">
                  linkedin.com/in/viharnar
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="cl-origin-right cl-r cl-r1">
          <div className="cl-cost-card cl-cc-red">
            <div className="cl-cc-label">⛔ The expensive way</div>
            <div className="cl-cc-text">
              A regulatory consultant explains the framework once. <strong>It&apos;s expensive — and ephemeral.</strong> Knowledge walks out the door. The next project starts from scratch. The same
              mistakes happen again.
            </div>
          </div>
          <div className="cl-cost-card cl-cc-blue">
            <div className="cl-cc-label">📋 The slow way</div>
            <div className="cl-cc-text">
              Read IEC 62304, ISO 14971, EU MDR, GAMP 5, FDA 820, and the EU AI Act yourself. <strong>Thousands of pages written for auditors,</strong> not for sprint teams. Most teams give up, or guess
              wrong.
            </div>
          </div>
          <div className="cl-cost-card cl-cc-violet">
            <div className="cl-cc-label">✓ The Codex way</div>
            <div className="cl-cc-text">
              One framework. 24 regulations mapped. 8-dimension classification. 4 SDLC lanes. 43 evidence artifacts. <strong>Free. Open. No login. No consultant required.</strong> Built from real
              experience and given back to the industry.
            </div>
          </div>
        </div>
      </div>

      <div className="cl-stakes">
        <div className="cl-stakes-inner">
          <div className="cl-r">
            <div className="cl-eyebrow">What&apos;s Actually at Stake</div>
            <h2 className="cl-hdg">
              Compliance failure isn&apos;t just an audit finding.
              <br />
              It&apos;s a patient who waited longer than they had to.
            </h2>
            <p className="cl-sub-p">
              Every delayed SaMD submission. Every product recall. Every startup that ran out of runway fighting the regulatory wall. Behind each one is a clinical use case that never reached the people
              it was designed to help.
            </p>
          </div>
          <div className="cl-stakes-grid cl-r cl-r1">
            {STAKES_CARDS.map((s) => (
              <div key={s.title} className="cl-stake">
                <div className="cl-stake-icon">{s.icon}</div>
                <div className="cl-stake-title">{s.title}</div>
                <div className="cl-stake-desc">{s.desc}</div>
                <div className="cl-stake-consequence">
                  <span className="cl-sc-dot" style={{ background: s.dot }} />
                  <span style={{ color: s.dot, fontSize: 11 }}>{s.consequence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cl-section cl-r">
        <div className="cl-eyebrow">The Framework in Numbers</div>
        <h2 className="cl-hdg">
          This isn&apos;t surface-level.
          <br />
          It&apos;s deep-domain expertise, systematized.
        </h2>
        <p className="cl-sub-p">Every number represents a decision boundary that used to require a consultant to navigate.</p>
        <div className="cl-stats-editorial">
          {STATS_EDITORIAL.map((s, i) => (
            <div key={`${s.n}-${s.label}-${i}`} className={`cl-se cl-r cl-r${(i % 3) + 1}`}>
              <div className="cl-se-n">{s.n}</div>
              <div className="cl-se-label">
                <strong>{s.label}</strong>
                {s.sub}
              </div>
              <div className="cl-se-bar" />
            </div>
          ))}
        </div>
      </div>

      <div className="cl-chain-wrap">
        <div className="cl-chain-inner">
          <div className="cl-r">
            <div className="cl-eyebrow">The Traceability Chain</div>
            <h2 className="cl-hdg">
              From obligation to proof.
              <br />
              Without losing the chain.
            </h2>
            <p className="cl-sub-p">
              This is the chain your auditors will follow. Codex means it&apos;s built before they ask for it — as a natural output of how you deliver, not a retroactive scramble before the inspection.
            </p>
          </div>
          <div className="cl-chain-nodes cl-r cl-r1">
            {CHAIN_NODES.map((n, idx) => (
              <div key={n.l} style={{ display: 'contents' }}>
                <div className="cl-cn">
                  <div className={`cl-cn-ico ${n.cls}`}>{n.ico}</div>
                  <div className="cl-cn-l">{n.l}</div>
                  <div className="cl-cn-s">{n.s}</div>
                </div>
                {idx < CHAIN_NODES.length - 1 ? <ChainArrow /> : null}
              </div>
            ))}
          </div>
          <div className="cl-chain-foot cl-r cl-r2">24 regulations tracked · 43 artifacts · 0 orphaned items · coverage % always visible</div>
        </div>
      </div>

      <div className="cl-section cl-r">
        <div className="cl-eyebrow">Classification Model</div>
        <h2 className="cl-hdg">
          The one decision that routes
          <br />
          everything else downstream.
        </h2>
        <p className="cl-sub-p">
          Most teams skip this or do it wrong. Codex makes it an 8-dimension structured assessment that produces a signed record — before a single requirement is written.
        </p>
        <div className="cl-engine cl-r cl-r1">
          <div className="cl-eng-col">
            <div className="cl-eng-col-label">Classification Dimensions</div>
            {CLASSIFICATION_INPUTS.map((row) => (
              <div key={row.num} className="cl-eng-in">
                <div className="cl-ein-text">{row.text}</div>
                <div className="cl-ein-num">{row.num}</div>
              </div>
            ))}
          </div>
          <div className="cl-eng-core">
            <div className="cl-ec-title">
              Classification
              <br />
              Engine
            </div>
            <div className="cl-ec-num">→</div>
            <div className="cl-ec-sub">
              8 inputs
              <br />1 signed record
              <br />1 lane assignment
            </div>
          </div>
          <div className="cl-eng-col">
            <div className="cl-eng-col-label">Lane Assignment Output</div>
            {LANE_OUTPUTS.map((o) => (
              <div key={o.lane} className={`cl-eng-out ${o.cls}`}>
                <span className="cl-eout-dot" />
                <div>
                  <div className="cl-eout-lane">{o.lane}</div>
                  <div className="cl-eout-name">{o.name}</div>
                  <div className="cl-eout-std">{o.std}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cl-hdiv" />
      <div className="cl-section cl-r">
        <div className="cl-eyebrow">SDLC Lanes</div>
        <h2 className="cl-hdg">
          Proportionate rigor.
          <br />
          No over-engineering. No shortcuts.
        </h2>
        <p className="cl-sub-p">
          Four lanes calibrated to four risk tiers. Every team gets exactly the controls they need — not the controls a consultant would apply to everything just to be safe.
        </p>
        <div className="cl-complexity-row cl-r cl-r1">
          <span>Minimal controls</span>
          <div className="cl-cbar" />
          <span>Submission-grade rigor</span>
        </div>
        <div className="cl-lanes cl-r cl-r1">
          {LANES_DETAIL.map((lane) => (
            <div key={lane.badge} className={`cl-lane ${lane.laneClass}`}>
              <div className="cl-l-badge">
                <span>{lane.badge}</span>
              </div>
              <div className="cl-l-name">{lane.name}</div>
              <div className="cl-l-desc">{lane.desc}</div>
              <div className="cl-l-stds">
                {lane.stds.map((s) => (
                  <span key={s} className="cl-l-std">
                    {s}
                  </span>
                ))}
              </div>
              <div className="cl-l-rigor">
                <span>Rigor</span>
                <div className="cl-rdots">
                  {lane.rigor.map((on, i) => (
                    <div key={i} className={`cl-rd ${on ? 'cl-on' : 'cl-off'}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cl-ai-section">
        <div className="cl-ai-inner">
          <div className="cl-r">
            <div className="cl-eyebrow">AI-Enabled · Codified · Modern</div>
            <h2 className="cl-hdg">
              The expert knowledge exists.
              <br />
              AI makes it scale.
            </h2>
            <p className="cl-sub-p">
              Codex isn&apos;t a static document. It uses AI to accelerate the grind — traceability linking, gap detection, artifact drafting — while keeping human judgment accountable for the decisions
              that matter.
            </p>
          </div>
          <div className="cl-ai-grid cl-r cl-r1">
            <div className="cl-ai-visual">
              <div className="cl-ai-terminal-bar">
                <div className="cl-ai-dot" style={{ background: '#f43f5e' }} />
                <div className="cl-ai-dot" style={{ background: '#f59e0b' }} />
                <div className="cl-ai-dot" style={{ background: '#22c55e' }} />
                <div className="cl-ai-title">codex / traceability-studio</div>
              </div>
              <div className="cl-mono" style={{ color: 'var(--cl-sub2)' }}>
                <div style={{ padding: '4px 0' }}>// Traceability coverage analysis</div>
                <div style={{ padding: '4px 0' }}>&nbsp;</div>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ color: 'var(--cl-b)' }}>regulation</span>
                  <span style={{ color: 'var(--cl-sub)' }}>: </span>
                  <span style={{ color: 'var(--cl-amber)' }}>&quot;IEC 62304&quot;</span>
                </div>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ color: 'var(--cl-b)' }}>obligations_mapped</span>
                  <span style={{ color: 'var(--cl-sub)' }}>: </span>
                  <span style={{ color: 'var(--cl-c)' }}>24</span>
                </div>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ color: 'var(--cl-b)' }}>requirements_linked</span>
                  <span style={{ color: 'var(--cl-sub)' }}>: </span>
                  <span style={{ color: 'var(--cl-c)' }}>24</span>
                </div>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ color: 'var(--cl-b)' }}>risk_items_traced</span>
                  <span style={{ color: 'var(--cl-sub)' }}>: </span>
                  <span style={{ color: 'var(--cl-c)' }}>24</span>
                </div>
                <div style={{ padding: '4px 0' }}>
                  <span style={{ color: 'var(--cl-b)' }}>test_cases_linked</span>
                  <span style={{ color: 'var(--cl-sub)' }}>: </span>
                  <span style={{ color: 'var(--cl-c)' }}>24</span>
                </div>
                <div style={{ padding: '4px 0', color: 'var(--cl-d)' }}>
                  coverage_pct<span style={{ color: 'var(--cl-sub)' }}>: </span>
                  <span style={{ color: 'var(--cl-green)' }}>100%</span>
                </div>
                <div style={{ padding: '4px 0', color: 'var(--cl-d)' }}>
                  orphaned_items<span style={{ color: 'var(--cl-sub)' }}>: </span>
                  <span style={{ color: 'var(--cl-green)' }}>0</span>
                </div>
                <div style={{ padding: '4px 0', color: 'var(--cl-d)' }}>
                  missing_links<span style={{ color: 'var(--cl-sub)' }}>: </span>
                  <span style={{ color: 'var(--cl-green)' }}>0</span>
                </div>
                <div style={{ padding: '4px 0' }}>&nbsp;</div>
                <div style={{ padding: '4px 0', color: 'var(--cl-sub2)' }}>// ✓ Audit-ready. Chain intact.</div>
              </div>
            </div>
            <div className="cl-ai-items">
              {AI_ITEMS.map((a) => (
                <div key={a.title} className="cl-ai-item">
                  <div className="cl-ai-ico" style={{ background: a.bg }}>
                    {a.ico}
                  </div>
                  <div>
                    <div className="cl-ai-item-title">{a.title}</div>
                    <div className="cl-ai-item-desc">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="cl-section cl-r">
        <div className="cl-eyebrow">Who This Serves</div>
        <h2 className="cl-hdg">
          Every role. Every stakeholder.
          <br />
          One shared framework.
        </h2>
        <p className="cl-sub-p">
          No more re-explaining the same obligations to 12 different teams. No more informal approvals. No more evidence assembled the week before inspection.
        </p>
        <div className="cl-roles-row">
          {ROLE_CARDS.map((r) => (
            <div key={r.title} className="cl-role-card2">
              <div className="cl-rc2-em">{r.em}</div>
              <div className="cl-rc2-title">{r.title}</div>
              <div className="cl-rc2-value">{r.value}</div>
              <div className="cl-rc2-pain">{r.pain}</div>
              <div className="cl-rc2-links">
                {r.links.map((l) => (
                  <Link key={l.to} className="cl-rc2-link" to={l.to}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cl-hdiv" />
      <div className="cl-section cl-r">
        <div className="cl-eyebrow">Design Principles</div>
        <h2 className="cl-hdg">
          Five ideas that make this
          <br />
          framework fundamentally different.
        </h2>
        <div style={{ marginTop: 40 }}>
          {PRINCIPLES.map((p, idx) => (
            <div key={p.num} className={`cl-prin-row cl-r cl-r${(idx % 3) + 1}`}>
              <div className="cl-pr-n">{p.num}</div>
              <div className="cl-pr-b">
                <div className="cl-pr-t">{p.title}</div>
                <div className="cl-pr-p">{p.body}</div>
              </div>
              <div className="cl-pr-ac" />
            </div>
          ))}
        </div>
      </div>

      <div className="cl-hdiv" />
      <div className="cl-section cl-r" id="framework-chapters">
        <div className="cl-eyebrow">Framework Chapters</div>
        <h2 className="cl-hdg">
          The reading order your auditors
          <br />
          already expect.
        </h2>
        <p className="cl-sub-p" style={{ fontStyle: 'italic', color: 'var(--cl-sub2)' }}>
          obligations → decisions → controlled execution → evidence proof
        </p>
        <div className="cl-chapter-lanes cl-r cl-r1">
          {CHAPTER_LANE_DEFS.map((lane) => {
            const items = CHAPTER_LINKS.filter((c) => c.track === lane.track)
            return (
              <div key={lane.track} className={`cl-chapter-lane cl-chapter-lane--${lane.track}`}>
                <div className="cl-chapter-lane-head">
                  <div className="cl-chapter-lane-badge">{lane.label}</div>
                  <p className="cl-chapter-lane-sub">{lane.sub}</p>
                </div>
                <div className="cl-chapter-lane-cards">
                  {items.map((ch) => {
                    const open = openChapterId === ch.to
                    const pid = chapterPanelId(ch.to)
                    return (
                      <div key={ch.to} className={`cl-chapter-card${open ? ' is-open' : ''}`}>
                        <button
                          type="button"
                          className="cl-chapter-card-toggle"
                          aria-expanded={open}
                          aria-controls={pid}
                          id={chapterBtnId(ch.to)}
                          onClick={() => toggleChapter(ch.to)}
                        >
                          <span>{ch.title}</span>
                          <span className="cl-chapter-card-icon" aria-hidden>
                            {open ? <Minus size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={2.5} />}
                          </span>
                        </button>
                        <div className="cl-chapter-card-body" id={pid} role="region" aria-labelledby={chapterBtnId(ch.to)}>
                          <div className="cl-chapter-card-inner" aria-hidden={!open}>
                            <p className="cl-chapter-card-desc">{ch.desc}</p>
                            <p className="cl-chapter-card-stat">{ch.stat}</p>
                            <Link className="cl-chapter-card-link" to={ch.to}>
                              Open chapter →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="cl-finale">
        <div className="cl-finale-eyebrow">
          <span className="cl-finale-dot" />
          Free · Open · No Login Required
        </div>
        <h2 className="cl-finale-h">
          Better healthcare software
          <br />
          <span className="cl-gt">reaches more patients</span>
          <br />
          when the path is clear.
        </h2>
        <p className="cl-finale-sub">
          Codex is a free reference framework for every team building regulated software in healthcare. No eQMS required. No consultant required. Just the clarity the industry has needed — codified,
          open, and built from real experience.
        </p>
        <div className="cl-hero-btns" style={{ justifyContent: 'center' }}>
          <Link to="/" className="cl-btn-p">
            Open Codex Framework
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a href={LINKEDIN_WEB_URL} className="cl-btn-s" target="_blank" rel="noreferrer">
            Connect with Vihar
          </a>
        </div>
        <div className="cl-finale-meta">
          <div className="cl-fm">
            <span className="cl-fmd" />
            Free reference portal
          </div>
          <div className="cl-fm">
            <span className="cl-fmd" />
            No login required
          </div>
          <div className="cl-fm">
            <span className="cl-fmd" />
            Built by {RELEASE_META.authorName}
          </div>
          <div className="cl-fm">
            <span className="cl-fmd" />
            24 regulations · 43 artifacts
          </div>
          <div className="cl-fm">
            <span className="cl-fmd" />
            {RELEASE_META.version} · {RELEASE_META.lastPublished}
          </div>
        </div>
      </div>

      <footer className="cl-landing-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="cl-avatar" style={{ width: 26, height: 26, fontSize: 12 }}>
            C
          </div>
          <span style={{ fontSize: 14, fontWeight: 800 }}>Codex</span>
          <span className="cl-mono" style={{ fontSize: 10, fontWeight: 600, color: 'var(--cl-sub)', background: 'var(--cl-surface)', border: '1px solid var(--cl-border)', padding: '2px 8px', borderRadius: 4 }}>
            {RELEASE_META.version}
          </span>
        </div>
        <span className="cl-ftag">Regulated Software Compliance Framework</span>
        <div className="cl-flinks">
          <a href={LINKEDIN_WEB_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <Link to="/artifact-library">Artifact Library</Link>
          <Link to="/ai-use-cases">AI Enablement</Link>
          <Link to="/traceability-studio">Traceability Studio</Link>
        </div>
      </footer>
    </div>
  )
}
