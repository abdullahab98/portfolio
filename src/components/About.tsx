import { useState } from 'react'
import {
  GraduationCap,
  Briefcase,
  Terminal,
  Copy,
  Check,
  Code2,
  Sparkles,
  Layers
} from 'lucide-react'

export function About() {
  const [copied, setCopied] = useState(false)

  const copyBashCommand = () => {
    navigator.clipboard.writeText('curl -s https://mdabdullah.dev/about.json | jq')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>// 01. ABOUT ME</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Architecting Resilient Systems & Practical Code
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl">
          A look into my academic journey, real-world development at Southeast University, and core engineering principles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Cyber Terminal Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0b0f19]/90 border border-white/[0.08] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl w-full">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-white/[0.03] border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-[11px] sm:text-xs font-mono text-slate-400 truncate max-w-[170px] sm:max-w-none">abdullah@system-arch:~</span>
            <button
              onClick={copyBashCommand}
              title="Copy curl command"
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer p-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-3.5 sm:p-5 font-mono text-xs text-slate-300 space-y-3 leading-relaxed">
            <div className="text-cyan-400 break-all text-[11px] sm:text-xs">
              <span className="text-emerald-400">abdullah@seuit</span>:<span className="text-purple-400">~</span>$ cat engineer_profile.json
            </div>

            <div className="bg-black/40 p-3 sm:p-4 rounded-xl border border-white/[0.04] text-[10px] sm:text-xs text-slate-300 space-y-1 overflow-x-auto">
              <div><span className="text-purple-400">"name"</span>: <span className="text-cyan-300">"Md. Abdullah"</span>,</div>
              <div><span className="text-purple-400">"title"</span>: <span className="text-cyan-300">"Full-Stack Software Engineer"</span>,</div>
              <div><span className="text-purple-400">"location"</span>: <span className="text-cyan-300">"Dhaka, Bangladesh"</span>,</div>
              <div><span className="text-purple-400">"university"</span>: <span className="text-cyan-300">"Southeast University"</span>,</div>
              <div><span className="text-purple-400">"cgpa"</span>: <span className="text-emerald-400">3.57</span>,</div>
              <div><span className="text-purple-400">"current_role"</span>: <span className="text-cyan-300">"Programming Assistant @ SEU IT Dept"</span>,</div>
              <div><span className="text-purple-400">"active_project"</span>: <span className="text-cyan-300">"University Management System (UMS)"</span>,</div>
              <div>
                <span className="text-purple-400">"primary_stack"</span>: [
                <div className="pl-4 text-slate-400">
                  <span className="text-emerald-300">"Java (Spring Boot)"</span>,
                  <span className="text-emerald-300">"Python (FastAPI)"</span>,
                  <span className="text-emerald-300">"React / Next.js"</span>,
                  <span className="text-emerald-300">"Microservices"</span>,
                  <span className="text-emerald-300">"Groq AI / LLM"</span>,
                  <span className="text-emerald-300">"OpenCV"</span>
                </div>
                ],
              </div>
              <div><span className="text-purple-400">"status"</span>: <span className="text-emerald-400">"Available for Engineering Roles"</span></div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-slate-400">
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse"></span>
              <span className="text-[10px] sm:text-[11px] truncate">System integrity optimal • Latency: 12ms</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative & Experience Highlights (7 cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Experience Highlight: Southeast University IT Department */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-cyan-500/20 backdrop-blur-xl relative group hover:border-cyan-400/50 transition-all">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Programming Assistant – Southeast University IT Department
                  </h3>
                  <span className="text-[11px] sm:text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20 w-fit">
                    Production Role
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                  Dhaka, Bangladesh • University Management System (UMS) Team
                </p>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Directly involved in engineering and maintaining high-throughput modules for the university's core{' '}
                  <strong className="text-white">University Management System (UMS)</strong>. Collaborating with senior IT staff to design secure database schemas, automate academic workflows, optimize REST API response times, and build resilient services that serve thousands of active campus users.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Excellence: Southeast University */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-purple-500/20 backdrop-blur-xl relative group hover:border-purple-400/50 transition-all">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    B.Sc. in Computer Science & Engineering
                  </h3>
                  <span className="text-[11px] sm:text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 w-fit">
                    CGPA: 3.57
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
                  Southeast University • Dhaka, Bangladesh
                </p>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Rigorous computer science curriculum emphasizing Data Structures & Algorithms, Object-Oriented Architecture, Operating Systems, Database Management Systems, and Software Engineering methodologies.
                </p>
              </div>
            </div>
          </div>

          {/* Key Principles & Focus Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  Microservices
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Architecting modular, decoupled backends with clear service boundaries and resilient failovers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  AI Integration
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Leveraging high-speed LLM APIs (Groq) and OpenCV computer vision into production-ready software.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Code2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  Open-Source
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Crafting developer tools, browser extensions, and utilities that automate repetitive workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
