export default function ProblemSolutionOutcomesBlueprint() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Left panel */}
      <section className="rounded-[14px] border border-[#1e2d45] bg-[#131929] p-6">
        <p className="text-[10px] uppercase tracking-[0.12em] text-rose-300">Executive Problem Statement</p>
        <h3 className="mt-2 text-xl font-semibold leading-tight text-slate-100">
          Fragmented, burdensome, and high-risk without a unified operating model.
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ['⚖️', 'LEGALLY COMPLEX REGULATIONS', 'Multiple overlapping standards with conflicting scope interpretations per product type.'],
            ['🔀', 'INCONSISTENT PROCESS & EVIDENCE', 'Every team reinvents the process. Evidence is assembled late, retrospectively, and inconsistently.'],
            ['❓', 'AMBIGUOUS APPROVALS & OWNERSHIP', 'No clarity on who must sign what. Approvals are informal, late, or bypassed under pressure.'],
            ['🔗', 'INCOMPLETE TRACEABILITY', "Regulations don't connect to design. Tests don't connect to risks. Auditors find the gaps first."],
          ].map(([emoji, title, text]) => (
            <div
              key={title}
              className="rounded-[10px] border p-[14px]"
              style={{ backgroundColor: 'rgba(244,63,94,0.06)', borderColor: 'rgba(244,63,94,0.15)' }}
            >
              <p className="text-[20px] leading-none">{emoji}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-100">{title}</p>
              <p className="mt-1 text-[11px] leading-4 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Middle panel */}
      <section className="rounded-[14px] border border-[#1e2d45] bg-[#131929] p-6">
        <p className="text-[10px] uppercase tracking-[0.12em] text-teal-300">Unified Solution Framework</p>

        <div className="mt-4 space-y-2">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.1em] text-slate-500">Input</p>
              <div className="mt-1 rounded-lg border border-[#1e2d45] bg-[#0b0f1a]/50 p-3">
                <p className="text-[12px] font-semibold text-slate-100">Regulatory Obligations</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.1em] text-slate-500">Processing</p>
              <div className="mt-1 rounded-lg border border-indigo-400/30 bg-indigo-500/10 p-3">
                <p className="text-[12px] font-semibold text-indigo-200">Translation &amp; Automation Controls</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.1em] text-slate-500">Output</p>
              <div className="mt-1 rounded-lg border border-teal-400/30 bg-teal-500/10 p-3">
                <p className="text-[12px] font-semibold text-teal-200">Delivery Controls</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <span>→</span>
            <span>→</span>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-[10px] uppercase tracking-[0.1em] text-slate-500">What it produces</p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              ['🗺️', 'Conceptual Blueprint'],
              ['📊', 'Automated Studio'],
              ['✅', 'Signed Audit Evidence'],
            ].map(([emoji, label]) => (
              <div key={label} className="rounded-lg border border-[#1e2d45] bg-[#0b0f1a]/45 p-2.5 text-center">
                <p className="text-sm">{emoji}</p>
                <p className="mt-1 text-[11px] font-medium text-slate-200">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Right panel */}
      <section className="rounded-[14px] border border-[#1e2d45] bg-[#131929] p-6">
        <p className="text-[10px] uppercase tracking-[0.12em] text-emerald-300">Outcomes After Adoption</p>
        <div className="mt-4 space-y-3">
          {[
            {
              icon: '🚨',
              tone: 'rose',
              title: 'Reduced Late Stage Surprises',
              text: 'Compliance issues become visible early in the phase gate process, not during audits.',
              badge: '↓ Risk',
              iconBg: 'bg-rose-500/15 border-rose-400/30 text-rose-200',
              badgeCls: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
            },
            {
              icon: '⚡',
              tone: 'amber',
              title: 'Accelerated Delivery',
              text: 'Right lane + right evidence depth. No over-engineering for Lane A, no shortcuts on Lane D.',
              badge: '↑ Velocity',
              iconBg: 'bg-amber-500/15 border-amber-400/30 text-amber-100',
              badgeCls: 'border-amber-400/30 bg-amber-500/10 text-amber-100',
            },
            {
              icon: '🛡️',
              tone: 'indigo',
              title: 'Improved Audit Confidence',
              text: 'Submission-grade traceability built in. Evidence binder assembled during delivery, not before inspection.',
              badge: '✓ Audit-ready',
              iconBg: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-200',
              badgeCls: 'border-indigo-400/30 bg-indigo-500/10 text-indigo-200',
            },
            {
              icon: '🔒',
              tone: 'teal',
              title: 'Controlled Post-Market Operations',
              text: 'Continuous evidence discipline after go-live. Change control, CAPA, and surveillance structured from day one.',
              badge: '↑ Control',
              iconBg: 'bg-teal-500/15 border-teal-400/30 text-teal-200',
              badgeCls: 'border-teal-400/30 bg-teal-500/10 text-teal-200',
            },
          ].map((o) => (
            <div key={o.title} className="rounded-xl border border-[#1e2d45] bg-[#0b0f1a]/45 p-3">
              <div className="flex items-start gap-3">
                <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm ${o.iconBg}`}>{o.icon}</div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-slate-100">{o.title}</p>
                  <p className="mt-1 text-[11px] leading-4 text-slate-400">{o.text}</p>
                  <span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${o.badgeCls}`}>{o.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

