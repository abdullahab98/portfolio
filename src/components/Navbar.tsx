import { useState, useEffect } from 'react'
import { Terminal, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact']
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      // Find the entry that has the highest intersection ratio or is currently intersecting
      const visibleEntries = entries.filter((entry) => entry.isIntersecting)
      if (visibleEntries.length > 0) {
        // Pick the top visible section
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        setActiveSection(visibleEntries[0].target.id)
      }
    }

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '-20% 0px -50% 0px',
      threshold: [0.1, 0.3, 0.6]
    })

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-[#07090e]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group text-decoration-none"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 dark:from-cyan-500/20 dark:to-purple-500/20 border border-cyan-500/30 dark:border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-500 dark:group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all shrink-0">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600 dark:text-cyan-400 group-hover:rotate-6 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center">
                <span className="text-cyan-500 dark:text-cyan-400 mr-0.5">&lt;</span>
                Md.Abdullah
                <span className="text-cyan-500 dark:text-cyan-400 ml-0.5">/&gt;</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-wider uppercase">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Glassmorphism Active Capsule */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.08] rounded-full p-1.5 backdrop-blur-xl shadow-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-white/95 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 dark:border-cyan-400/50 shadow-[0_2px_15px_rgba(0,240,255,0.25)] dark:shadow-[0_0_20px_rgba(0,240,255,0.35)] backdrop-blur-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/[0.06] border border-transparent'
                  }`}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 mr-1.5 animate-pulse" />
                  )}
                  <span>{link.name}</span>
                </a>
              )
            })}
          </div>

          {/* Right Action & Theme Toggle & Status Pill */}
          <div className="hidden md:flex items-center gap-3">
            {/* Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping relative">
                <span className="absolute inset-0 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
              </span>
              <span>Available for Hire</span>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs"
              aria-label="Quick contact"
            >
              <Sparkles className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0a0d16]/95 border-b border-slate-200/80 dark:border-white/[0.08] backdrop-blur-2xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
              <span>Available for Hire (Dhaka, BD)</span>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex flex-col space-y-1.5 pt-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-base font-medium py-2.5 px-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
                  )}
                </a>
              )
            })}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
