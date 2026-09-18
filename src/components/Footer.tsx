import { Terminal, ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#07090e] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Brand / Signature */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-sm font-bold text-white tracking-tight flex items-center">
              <span className="text-cyan-400">&lt;</span>
              Md.Abdullah
              <span className="text-cyan-400">/&gt;</span>
            </span>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Full-Stack Software Engineer • Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Center: Tech note */}
        <div className="text-xs text-slate-400 font-mono text-center sm:text-left">
          Built with <span className="text-cyan-400">React</span>,{' '}
          <span className="text-cyan-400">Tailwind CSS</span> &{' '}
          <span className="text-purple-400">Three.js</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-cyan-400 transition-all group"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  )
}
