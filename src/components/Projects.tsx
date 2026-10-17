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
  const [activeTab, setActiveTab] = useState<string>('All')

  const filterTabs = [
    { label: 'All', value: 'All' },
    { label: 'AI & Enterprise', value: 'AI & Enterprise' },
    { label: 'Full-Stack', value: 'Full-Stack' },
    { label: 'Computer Vision', value: 'Computer Vision' },
    { label: 'Extensions', value: 'Extensions' }
  ]

  const projects: (Project & { filterGroup: string })[] = [
    {
      id: 'pulsehr-ai',
      title: 'PulseHR-AI',
      tagline: 'Enterprise AI-Driven Office & Workforce Intelligence System',
      category: 'Enterprise & AI Systems',
      filterGroup: 'AI & Enterprise',
      color: 'from-blue-600/20 via-cyan-500/10 to-transparent',
      techStack: ['FastAPI (Python)', 'Angular 17', 'Tailwind CSS', 'MongoDB', 'SQLAlchemy', 'Google Gemini AI', 'Signals'],
      description:
        'An enterprise-grade, asynchronous workforce management and ERP ecosystem. Built with an admin-less, designation-driven governance architecture where permissions and access levels are dynamically calculated. Integrated with Google Gemini AI for proactive employee burnout detection, predictive operational telemetry, dynamic hierarchical approvals, automated attendance tracking with overtime calculation, and smart leave management.',
      metrics: [
        'Admin-less dynamic RBAC with 25+ functional panels across 10 business domains',
        'Real-time burnout detection & executive summary generation via Gemini AI',
        'Sub-second asynchronous request processing with FastAPI & Angular Signals'
      ],
      features: [
        'Designation-Driven Governance: Hierarchical approval escalation chains with auto-timeout safeguards',
        'Smart Attendance Engine: Automated clock-in/out, live overtime calculation, and late penalty integration',
        'Leave & Payroll Portals: Visual balance tracking, multi-tier approvals, and dynamic pay-slip generation',
        'Interactive Frontend: Glassmorphism UI, visual organogram, attendance calendar, and AI Assistant Drawer'
      ],
      architecture:
        'FastAPI asynchronous REST microservice layer backed by SQLAlchemy and MongoDB for multi-branch data isolation, connected to Google Gemini AI API for executive predictive analysis, and presented via a reactive Angular 17 SPA with Signals.',
      githubUrl: 'https://github.com/abdullahab98/PulseHR-AI',
      liveDemoUrl: 'https://github.com/abdullahab98/PulseHR-AI-Frontend'
    },
    {
      id: 'medicalx',
      title: 'Medicalx',
      tagline: 'AI-Driven Medical Appointment & Triage Ecosystem',
      category: 'Healthcare & AI Systems',
      filterGroup: 'AI & Enterprise',
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
      githubUrl: 'https://github.com/abdullahab98',
      liveDemoUrl: '#'
    },
    {
      id: 'smart-parking',
      title: 'Smart Parking Management System',
      tagline: 'Real-Time Slot Booking & Cloud Vehicle Management Platform',
      category: 'Full-Stack & Cloud Architecture',
      filterGroup: 'Full-Stack',
      color: 'from-purple-500/20 via-indigo-500/10 to-transparent',
      techStack: ['Node.js', 'Express.js', 'MongoDB Atlas', 'JavaScript', 'JWT Auth', 'SSLCommerz', 'Mongoose'],
      description:
        'A full-stack, cloud-hosted smart parking reservation platform for booking secure parking spaces by hour or day. Offers live slot availability tracking, vehicle type classification (cars, motorcycles, SUVs), automated duration tariffs, mock payment flow (SSLCommerz-ready), and JWT-based role authentication for Customers, Managers, and Admins.',
      metrics: [
        'Real-time slot availability tracking with zero double-booking',
        'Sub-second transactional booking resolution in MongoDB',
        'Multi-tiered role authorization with JWT security'
      ],
      features: [
        'Real-time interactive parking bay map displaying vacant vs occupied slots',
        'Hourly and daily automated tariff computation engine',
        'SSLCommerz-ready payment checkout integration with mock testing mode',
        'Customer booking portal and administrative facility management dashboard'
      ],
      architecture:
        'Node.js & Express RESTful API server connected to MongoDB Atlas, featuring transactional slot reserving, secure JWT authentication, and structured schema validations.',
      githubUrl: 'https://github.com/abdullahab98/smart-parking-management-system',
      liveDemoUrl: '#'
    },
    {
      id: 'parking-system',
      title: 'Automated ANPR Parking System',
      tagline: 'Computer Vision ANPR & Automated Slot Allocation',
      category: 'Computer Vision & IoT',
      filterGroup: 'Computer Vision',
      color: 'from-amber-500/20 via-orange-500/10 to-transparent',
      techStack: ['JavaFX', 'MySQL', 'OpenCV', 'Image Processing', 'Computer Vision', 'JNI'],
      description:
        'An intelligent, hardware-accelerated automated parking facility system powered by OpenCV computer vision. Performs Automatic Number Plate Recognition (ANPR) at entry and exit gates to dynamically log vehicles, assign vacant parking slots, and calculate parking fees with zero human intervention.',
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
      githubUrl: 'https://github.com/abdullahab98',
      liveDemoUrl: '#'
    },
    {
      id: 'bd-railway-ticket',
      title: 'BD Railway Ticket Quick Booker',
      tagline: 'Instant Station Autocomplete & Automated Route Preset Extension',
      category: 'Browser Extensions & Automation',
      filterGroup: 'Extensions',
      color: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      techStack: ['Chrome Extension API (MV3)', 'JavaScript', 'DOM Automation', 'Regex', 'CSS3'],
      description:
        'A productivity-focused Chrome Extension designed for seamless ticket booking on the official Bangladesh Railway portal (eticket.railway.gov.bd). Features full autocomplete across all 263 official stations, quick-swap routes, dynamic travel date calculation (+1 to +10 advance days), and 1-click query generation to bypass high-traffic booking friction.',
      metrics: [
        'Covers all 263 official Bangladesh Railway stations with instant search',
        'Saves up to 80% time during morning high-traffic ticket release windows',
        'Zero external dependencies with lightweight background MV3 footprint'
      ],
      features: [
        'Full 263-station autocomplete dropdown with highlighted Top Cities',
        '1-Click quick travel date buttons (Today, +1, +2, +3, +7, and +10 days advance)',
        'Full 10 official seat class selectors (AC Berth, Snigdha, Shovon, etc.)',
        'Instant route swap (⇅) and 1-click deep link dispatch to search results'
      ],
      architecture:
        'Manifest V3 Chrome Extension utilizing isolated content scripts, chrome.storage API for caching user preferences, and real-time DOM injection to automate railway query parameters.',
      githubUrl: 'https://github.com/abdullahab98/bd-railway-ticket-chrome-extension',
      liveDemoUrl: '#'
    }
  ]

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter((p) => p.filterGroup === activeTab)

  return (
    <section id="projects" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-xs mb-3 font-semibold dark:font-normal">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>// 03. FEATURED WORK</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors">
          Production Systems & Engineered Solutions
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl transition-colors">
          Highlighting real-world applications spanning enterprise microservices, computer vision, AI triage, and developer automation.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-8 p-1.5 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] backdrop-blur-md">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Projects 3D Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group relative rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-[#0b0f19]/90 border border-slate-200/90 dark:border-white/[0.08] hover:border-cyan-500/60 dark:hover:border-cyan-400/60 p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl shadow-xs hover:shadow-xl dark:hover:shadow-[0_15px_40px_-10px_rgba(0,240,255,0.3)] hover:-translate-y-2 overflow-hidden"
          >
            {/* Ambient Gradient Glow */}
            <div
              className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${project.color} opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none`}
            />

            <div className="relative z-10">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[11px] font-mono font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">0{idx + 1}</span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400/90 mt-1 font-medium">
                {project.tagline}
              </p>

              {/* Short Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mt-6">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] px-2.5 py-1 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProject(project)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group/btn cursor-pointer"
              >
                <span>View Architecture</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-all shadow-xs"
                  title="Source Code"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all cursor-pointer shadow-xs"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0b0f19] border border-slate-200 dark:border-cyan-500/40 p-5 sm:p-8 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[88vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-10 sm:pr-12">
              <span className="text-[11px] sm:text-xs font-mono text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30 inline-block mb-2 font-medium">
                {selectedProject.category}
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {selectedProject.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 mt-1">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                System Overview
              </h4>
              <p className="text-xs sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Architecture Details */}
            <div className="mt-5 sm:mt-6 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-2">
                <Cpu className="w-4 h-4" />
                <h4 className="text-xs font-mono uppercase tracking-wider font-semibold">
                  Technical Architecture & Dataflow
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                {selectedProject.architecture}
              </p>
            </div>

            {/* Key Features */}
            <div className="mt-5 sm:mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-semibold">
                Core Capabilities
              </h4>
              <div className="space-y-2">
                {selectedProject.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Metrics */}
            <div className="mt-5 sm:mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-semibold">
                Impact & Performance Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {selectedProject.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-500/[0.04] border border-cyan-200 dark:border-cyan-500/20 text-xs text-cyan-800 dark:text-cyan-200 font-mono"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap gap-1.5 sm:gap-2">
              {selectedProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] sm:text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1] px-2.5 sm:px-3 py-1 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] transition-all cursor-pointer text-center"
              >
                Close View
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] text-center cursor-pointer"
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
