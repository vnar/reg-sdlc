import { FileText, ShieldCheck, Settings, Zap } from 'lucide-react'

export default function ComplianceSolutionCard({
  chrome = true,
  className = '',
}: {
  chrome?: boolean
  className?: string
}) {
  return (
    <div
      className={
        chrome
          ? `bg-[#0b1120] p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-4xl mx-auto font-sans text-slate-200 ${className}`
          : `bg-transparent p-0 rounded-none border-0 shadow-none max-w-none mx-0 font-sans text-slate-200 ${className}`
      }
    >
      <div className="mb-8">
        <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Unified Solution Framework</span>
        <h2 className="text-3xl font-semibold mt-2 text-white">Turn obligations into delivery controls.</h2>
      </div>

      {/* The Central "Engine" Diagram */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/50 px-6 py-8 md:px-10 md:py-10 rounded-xl border border-slate-800 mb-10 relative overflow-hidden">
        {/* Input: Obligations */}
        <div className="flex flex-col items-center z-10">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-lg mb-3">
            <FileText className="text-slate-400" size={32} />
          </div>
          <span className="text-sm font-medium">Legal Obligations</span>
        </div>

        {/* The Connector/Engine */}
        <div className="flex-1 flex items-center justify-center relative px-4">
          <div className="h-[2px] w-full bg-gradient-to-r from-slate-700 via-emerald-500 to-slate-700 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500/10 p-3 rounded-full border border-emerald-500/50">
              <Settings className="text-emerald-400" size={24} />
            </div>
          </div>
        </div>

        {/* Output: Controls */}
        <div className="flex flex-col items-center z-10">
          <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-3">
            <ShieldCheck className="text-emerald-400" size={32} />
          </div>
          <span className="text-sm font-medium text-emerald-400">Delivery Controls</span>
        </div>
      </div>

      {/* Interactive Sub-Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Blueprint', desc: 'Conceptual Schematic', icon: <Zap size={18} /> },
          { title: 'Execution Studio', desc: 'Automated Dashboard', icon: <Settings size={18} /> },
          { title: 'Audit Evidence', desc: 'Stamped & Signed', icon: <FileText size={18} /> },
        ].map((item) => (
          <div
            key={item.title}
            className="group cursor-default bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h4 className="font-bold text-white mb-1">{item.title}</h4>
            <p className="text-xs text-slate-500 uppercase tracking-tighter">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

