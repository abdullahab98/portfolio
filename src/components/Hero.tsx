import { ArrowDown, Code2, Sparkles, FolderGit2, Mail, Terminal, ShieldCheck, Cpu } from 'lucide-react'

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Radial Glow in background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.04] border border-cyan-500/40 dark:border-cyan-500/30 backdrop-blur-md mb-8 hover:border-cyan-500 dark:hover:border-cyan-400/60 transition-all shadow-xs dark:shadow-[0_0_20px_rgba(0,240,255,0.15)] group max-w-full">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 dark:text-cyan-400 shrink-0 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-mono text-cyan-700 dark:text-cyan-300 tracking-wide uppercase text-center truncate sm:whitespace-normal font-semibold dark:font-normal">
            Full-Stack Software Engineer • UMS Developer
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] sm:leading-[1.1] mb-6 transition-colors">
          Hello, I'm <br className="sm:hidden" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 dark:from-cyan-400 dark:via-teal-300 dark:to-indigo-400 drop-shadow-xs dark:drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]">
            Md. Abdullah
          </span>
        </h1>

        {/* Professional Subheadline */}
        <p className="text-base sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl font-light leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0 transition-colors">
          Computer Science student specializing in{' '}
          <span className="text-slate-950 dark:text-white font-medium underline decoration-cyan-500/60 dark:decoration-cyan-400/50 underline-offset-4">
            scalable web/mobile apps
          </span>
          ,{' '}
          <span className="text-slate-950 dark:text-white font-medium underline decoration-purple-500/60 dark:decoration-purple-400/50 underline-offset-4">
            AI integration
          </span>
          , and{' '}
          <span className="text-slate-950 dark:text-white font-medium underline decoration-indigo-500/60 dark:decoration-indigo-400/50 underline-offset-4">
            microservices architecture
          </span>
          .
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none">
          {/* Primary CTA */}
          <a
            href="#projects"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_40px_rgba(0,240,255,0.55)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <FolderGit2 className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform" />
            <span>View My Work</span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#contact"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.09] border border-slate-300/80 dark:border-white/[0.12] hover:border-cyan-500 dark:hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:text-slate-950 dark:hover:text-white hover:-translate-y-0.5 shadow-xs cursor-pointer"
          >
            <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Live Engineering Status Cards / HUD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl text-left">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/[0.06] backdrop-blur-md hover:border-cyan-500/40 hover:bg-white dark:hover:bg-white/[0.04] transition-all group shadow-xs">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Education
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Southeast University</div>
            <div className="text-xs text-cyan-600 dark:text-cyan-300 font-mono mt-0.5 font-medium">CGPA: 3.58</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/[0.06] backdrop-blur-md hover:border-cyan-500/40 hover:bg-white dark:hover:bg-white/[0.04] transition-all group shadow-xs">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Terminal className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Role
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Programming Assistant</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">SEU IT Department</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/[0.06] backdrop-blur-md hover:border-cyan-500/40 hover:bg-white dark:hover:bg-white/[0.04] transition-all group shadow-xs">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Core Focus
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">UMS Modules & AI</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">Spring Boot • Python • React</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-slate-200/90 dark:border-white/[0.06] backdrop-blur-md hover:border-cyan-500/40 hover:bg-white dark:hover:bg-white/[0.04] transition-all group shadow-xs">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
              <Code2 className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Base
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Dhaka, Bangladesh</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">Open for Global Roles</div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="mt-16 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Scroll to explore
          </span>
          <ArrowDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
