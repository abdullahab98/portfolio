import { useState } from 'react'
import {
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  X,
  Cpu,
  ChevronRight
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'

interface Project {
  id: string
  title: string
  tagline: string
  category: string
  techStack: string[]
  description: string
  metrics: string[]
  features: string[]
  architecture: string
  githubUrl: string
  liveDemoUrl?: string
  color: string
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 'medicalx',
      title: 'Medicalx',
      tagline: 'AI-Driven Medical Appointment & Triage Ecosystem',
      category: 'Healthcare & AI Systems',
      color: 'from-cyan-500/20 via-blue-500/10 to-transparent',
      techStack: ['Java (Spring Boot)', 'MongoDB', 'Groq API (LLM)', 'React', 'JWT Auth', 'Tailwind CSS'],
      description:
        'A full-stack, enterprise-grade healthcare management and appointment scheduling platform. Features dual role-based portals for physicians and patients, real-time consultation booking, and preliminary AI-powered symptom analysis to triage patient urgency prior to doctor visits.',
      metrics: [
        'Sub-second AI triage diagnosis response via Groq API',
        'Multi-tenant physician scheduling with conflict prevention',
        'Stateless JWT session security with RBAC access levels'
      ],
      features: [
        'Interactive Doctor & Patient dashboards with appointment status tracking',
        'Conversational AI health guidance powered by LLM API for symptom pre-screening',
        'Real-time prescription and digital medical record storage in MongoDB',
        'Automated slot calendar booking with notifications and rescheduling safeguards'
      ],
      architecture:
        'Spring Boot RESTful microservice layer interfacing with MongoDB for fast document retrieval, connected to Groq LPU inference for high-speed clinical prompt evaluation, and rendered via a reactive React interface.',
      githubUrl: 'https://github.com',
      liveDemoUrl: '#'
    },
    {
      id: 'parking-system',
      title: 'Automated Parking Management System',
      tagline: 'Computer Vision ANPR & Automated Slot Allocation',
      category: 'Computer Vision & IoT',
      color: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      techStack: ['JavaFX', 'MySQL', 'OpenCV', 'Image Processing', 'Computer Vision'],
      description:
        'An intelligent, automated parking facility management system powered by OpenCV computer vision. Performs Automatic Number Plate Recognition (ANPR) at entry and exit gates to dynamically log vehicles, assign vacant parking slots, and calculate parking fees with zero human intervention.',
      metrics: [
        '96%+ plate character recognition accuracy under varied lighting conditions',
        'Automated gate barrier trigger in under 400ms',
        'Optimized MySQL relational schema with indexing for fast vehicle search'
      ],
      features: [
        'Real-time video feed capture and license plate localization using OpenCV filters',
        'Optical character recognition (OCR) and plate string extraction',
        'Dynamic visual parking lot map with real-time occupied vs vacant slot state',
        'Automated billing engine computing tariff based on exact duration stamps'
      ],
      architecture:
        'JavaFX desktop application integrating native OpenCV C++ bindings through JNI for hardware-accelerated image pipeline, backed by a relational MySQL store with transaction rollback protection.',
      githubUrl: 'https://github.com',
      liveDemoUrl: '#'
    },
    {
      id: 'systems-automation',
      title: 'Systems Automation & Developer Tools',
      tagline: 'High-Throughput Utilities Suite for Modern Engineering',
      category: 'Developer Tooling & Infrastructure',
      color: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      techStack: ['Node.js', 'Chrome Extension API', 'Puppeteer', 'TypeScript', 'CLI'],
      description:
        'A comprehensive developer productivity suite built to streamline everyday development hurdles. Combines a browser-based HTTP API Tracker, a live-state Reloader extension that preserves form states across code edits, and a high-performance headless batch HTML-to-PDF engine.',
      metrics: [
        'Zero lost form state during hot module reloads',
        '50+ concurrent document batch rendering without memory leaks',
        'Lightweight background footprint (<15MB RAM usage)'
      ],
      features: [
        'Browser-based API Tracker: Intercepts, decodes, and benchmarks active network payloads in real-time',
        'Live-State Reloader: Chrome extension that persists form inputs, local tokens, and DOM positions during HMR',
        'Batch HTML-to-PDF Engine: Node.js worker pool converting dynamic HTML templates to print-ready PDF invoices'
      ],
      architecture:
        'Distributed Node.js micro-utilities utilizing async worker threads, Chrome Extension Manifest V3 background service workers, and streaming I/O pipelines.',
      githubUrl: 'https://github.com',
      liveDemoUrl: '#'
    }
  ]

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>// 03. FEATURED WORK</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Production Systems & Engineered Solutions
        </h2>
        <p className="mt-3 text-slate-400 text-base sm:text-lg max-w-2xl">
          Highlighting real-world applications spanning enterprise microservices, computer vision, AI triage, and developer automation.
        </p>
      </div>

      {/* Projects 3D Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="group relative rounded-3xl bg-[#0b0f19]/90 border border-white/[0.08] hover:border-cyan-400/60 p-7 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl hover:shadow-[0_15px_40px_-10px_rgba(0,240,255,0.3)] hover:-translate-y-2 overflow-hidden"
          >
            {/* Ambient Gradient Glow */}
            <div
              className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${project.color} opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`}
            />

            <div className="relative z-10">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-500">0{idx + 1}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-cyan-400/90 mt-1 font-medium">
                {project.tagline}
              </p>

              {/* Short Description */}
              <p className="text-sm text-slate-300 mt-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-slate-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProject(project)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn cursor-pointer"
              >
                <span>View Architecture</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-slate-300 hover:text-white transition-all"
                  title="Source Code"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
                  title="Explore Details"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Project Architecture Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0b0f19] border border-cyan-500/40 p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-12">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 inline-block mb-2">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-mono text-slate-400 mt-1">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                System Overview
              </h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Architecture Details */}
            <div className="mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Cpu className="w-4 h-4" />
                <h4 className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Technical Architecture & Dataflow
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                {selectedProject.architecture}
              </p>
            </div>

            {/* Key Features */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Core Capabilities
              </h4>
              <div className="space-y-2">
                {selectedProject.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Metrics */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Impact & Performance Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedProject.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-cyan-500/[0.04] border border-cyan-500/20 text-xs text-cyan-200 font-mono"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-wrap gap-2">
              {selectedProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-slate-300 bg-white/[0.05] border border-white/[0.1] px-3 py-1 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-all cursor-pointer"
              >
                Close View
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                Discuss This Project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
