import { Terminal, ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-slate-200/90 dark:border-white/[0.08] bg-slate-100/90 dark:bg-[#07090e] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-center sm:text-left">
        {/* Left: Brand / Signature */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white tracking-tight flex items-center justify-center sm:justify-start">
              <span className="text-cyan-600 dark:text-cyan-400">&lt;</span>
              Md.Abdullah
              <span className="text-cyan-600 dark:text-cyan-400">/&gt;</span>
            </span>
            <p className="text-[11px] sm:text-xs text-slate-500 font-mono mt-0.5">
              Full-Stack Software Engineer • Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Center: Tech note */}
        <div className="text-xs text-slate-600 dark:text-slate-400 font-mono text-center sm:text-left">
          Built with <span className="text-cyan-600 dark:text-cyan-400 font-medium">React</span>,{' '}
          <span className="text-cyan-600 dark:text-cyan-400 font-medium">Tailwind CSS</span> &{' '}
          <span className="text-purple-600 dark:text-purple-400 font-medium">Three.js</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/[0.03] hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border border-slate-300/80 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all group shadow-xs cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  )
}
