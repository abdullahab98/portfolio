import { useState } from 'react'
import { BrainCircuit } from 'lucide-react'
import {
  PythonLogo,
  FastApiLogo,
  ReactLogo,
  NextJsLogo,
  AngularLogo,
  TailwindLogo,
  SpringBootLogo,
  NodeJsLogo,
  MongoDbLogo,
  OpenCvLogo,
  GitLogo,
  LinuxLogo,
  PostmanLogo,
  VercelLogo,
  GroqLogo,
  JwtLogo,
  MicroservicesLogo,
  RestApiLogo,
  ReactNativeLogo
} from './TechLogos'

interface SkillItem {
  name: string
  category: 'Frontend' | 'Backend & Architecture' | 'Data & AI' | 'Tools & DevOps'
  icon: any
  proficiency: number // Percentage 0-100
  level: string
  description: string
  highlight?: string
}

export function Skills() {
  const [activeTab, setActiveTab] = useState<string>('All')

  const skills: SkillItem[] = [
    // Frontend
    {
      name: 'React',
      category: 'Frontend',
      icon: ReactLogo,
      proficiency: 95,
      level: 'Advanced',
      description: 'Component architecture, Hooks, Context, State management, dynamic rendering, and SPA performance.',
      highlight: 'Core Daily Driver',
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      icon: NextJsLogo,
      proficiency: 90,
      level: 'Advanced',
      description: 'Server Components, SSR/SSG, Route Handlers, SEO optimization, and Edge rendering.',
      highlight: 'Fullstack Web',
    },
    {
      name: 'Angular',
      category: 'Frontend',
      icon: AngularLogo,
      proficiency: 85,
      level: 'Proficient',
      description: 'Enterprise modular structure, TypeScript, RxJS Observables, Dependency Injection, and Two-way binding.',
      highlight: 'Enterprise Grade',
    },
    {
      name: 'React Native',
      category: 'Frontend',
      icon: ReactNativeLogo,
      proficiency: 88,
      level: 'Proficient',
      description: 'Cross-platform mobile apps for iOS & Android, native bridging, and responsive mobile interfaces.',
      highlight: 'Mobile Architecture',
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      icon: TailwindLogo,
      proficiency: 95,
      level: 'Advanced',
      description: 'Custom design systems, responsive layouts, glassmorphism, dynamic dark mode, and micro-animations.',
      highlight: 'Design System',
    },

    // Backend & Architecture
    {
      name: 'Python',
      category: 'Backend & Architecture',
      icon: PythonLogo,
      proficiency: 92,
      level: 'Advanced',
      description: 'Async programming, automation scripts, backend services, data pipelines, and AI/ML model integration.',
      highlight: 'Core Language',
    },
    {
      name: 'FastAPI',
      category: 'Backend & Architecture',
      icon: FastApiLogo,
      proficiency: 90,
      level: 'Advanced',
      description: 'High-performance asynchronous REST APIs, Pydantic data schemas, automatic Swagger docs, and ASGI concurrency.',
      highlight: 'High-Speed APIs',
    },
    {
      name: 'Java (Spring Boot)',
      category: 'Backend & Architecture',
      icon: SpringBootLogo,
      proficiency: 92,
      level: 'Advanced',
      description: 'Enterprise REST APIs, Spring Data JPA, Spring Security, Dependency Injection, and production microservices.',
      highlight: 'Enterprise Backend',
    },
    {
      name: 'Node.js',
      category: 'Backend & Architecture',
      icon: NodeJsLogo,
      proficiency: 90,
      level: 'Advanced',
      description: 'Non-blocking I/O event loop, Express, fast microservices, CLI tools, and automation workers.',
      highlight: 'High-Throughput Services',
    },
    {
      name: 'Microservices',
      category: 'Backend & Architecture',
      icon: MicroservicesLogo,
      proficiency: 88,
      level: 'Proficient',
      description: 'Decoupled service boundaries, API Gateway routing, event-driven patterns, and resilient fault isolation.',
      highlight: 'System Design',
    },
    {
      name: 'RESTful APIs',
      category: 'Backend & Architecture',
      icon: RestApiLogo,
      proficiency: 95,
      level: 'Advanced',
      description: 'Contract-first API design, idempotent endpoints, semantic status codes, rate-limiting, and Swagger docs.',
      highlight: 'API Contracts',
    },
    {
      name: 'JWT Security',
      category: 'Backend & Architecture',
      icon: JwtLogo,
      proficiency: 90,
      level: 'Advanced',
      description: 'Stateless authentication, access/refresh token rotation, role-based access control (RBAC), and payload signing.',
      highlight: 'Auth & Encryption',
    },

    // Data & AI
    {
      name: 'MongoDB',
      category: 'Data & AI',
      icon: MongoDbLogo,
      proficiency: 90,
      level: 'Advanced',
      description: 'NoSQL document modeling, indexing strategies, Aggregation Framework, and high-volume data storage.',
      highlight: 'Document Database',
    },
    {
      name: 'Groq API (LLM Integration)',
      category: 'Data & AI',
      icon: GroqLogo,
      proficiency: 92,
      level: 'Advanced',
      description: 'Ultra-fast LPU inference, prompt engineering, agentic triage workflows, structured JSON extraction.',
      highlight: 'Modern AI Systems',
    },
    {
      name: 'OpenCV',
      category: 'Data & AI',
      icon: OpenCvLogo,
      proficiency: 85,
      level: 'Proficient',
      description: 'Computer vision, real-time vehicle license plate recognition (ANPR), image filtering, edge detection.',
      highlight: 'Vision & Automation',
    },

    // Tools & DevOps
    {
      name: 'Git & Version Control',
      category: 'Tools & DevOps',
      icon: GitLogo,
      proficiency: 95,
      level: 'Advanced',
      description: 'Branching strategies (Gitflow), pull request reviews, rebasing, submodules, and automated CI triggers.',
      highlight: 'Collaboration',
    },
    {
      name: 'Linux',
      category: 'Tools & DevOps',
      icon: LinuxLogo,
      proficiency: 90,
      level: 'Advanced',
      description: 'Bash automation scripting, process monitoring (systemd), SSH hardening, cron jobs, and server administration.',
      highlight: 'Server Ops',
    },
    {
      name: 'Postman',
      category: 'Tools & DevOps',
      icon: PostmanLogo,
      proficiency: 92,
      level: 'Advanced',
      description: 'Automated test suites, environment variables, mock servers, and automated integration collection runs.',
      highlight: 'API Testing',
    },
    {
      name: 'Vercel & Render',
      category: 'Tools & DevOps',
      icon: VercelLogo,
      proficiency: 90,
      level: 'Advanced',
      description: 'Zero-config cloud deployment, serverless edge functions, preview environments, and cloud database linking.',
      highlight: 'Continuous Deployment',
    },
  ]

  const categories = ['All', 'Frontend', 'Backend & Architecture', 'Data & AI', 'Tools & DevOps']

  const filteredSkills =
    activeTab === 'All'
      ? skills
      : skills.filter((skill) => skill.category === activeTab)

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs mb-3">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>// 02. TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Engineering Expertise & Tooling
        </h2>
        <p className="mt-3 text-slate-400 text-base sm:text-lg max-w-2xl">
          An interactive matrix of languages, frameworks, AI capabilities, and architectures with authentic brand tooling.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 p-1.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-white shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Interactive Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredSkills.map((skill) => {
          const Icon = skill.icon
          return (
            <div
              key={skill.name}
              className="group relative rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] p-6 hover:border-cyan-400/60 hover:shadow-[0_10px_30px_-5px_rgba(0,240,255,0.25)] transition-all duration-300 backdrop-blur-xl flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Subtle card glow overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/[0.05] to-purple-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                {/* Header: Real Brand Logo + Category Tag */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center p-2.5 group-hover:scale-110 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all duration-300">
                    <Icon className="w-full h-full object-contain" />
                  </div>
                  {skill.highlight && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                      {skill.highlight}
                    </span>
                  )}
                </div>

                {/* Skill Name & Category */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>
                <span className="text-xs font-mono text-slate-400 block mt-0.5">
                  {skill.category}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Proficiency Gauge */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">{skill.level}</span>
                  <span className="text-cyan-400 font-semibold">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-cyan-300 group-hover:to-purple-400 transition-all duration-700"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
