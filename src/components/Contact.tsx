import { useState, type FormEvent } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  MessageSquare
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { GithubIcon, GitlabIcon, LinkedinIcon } from './BrandIcons'

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.error || 'Failed to dispatch message. Please try again.')
      }

      setIsSubmitting(false)
      setSubmitted(true)

      // Fire celebratory cyber confetti!
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#00f0ff', '#8a2be2', '#10b981', '#38bdf8']
      })
    } catch (err: any) {
      console.error('Submission error:', err)
      setErrorMessage(err.message || 'Something went wrong. Please try again or email directly.')
      setIsSubmitting(false)
    }
  }

  const handleResetForm = () => {
    setSubmitted(false)
    setErrorMessage(null)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient light */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-start mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>// 04. GET IN TOUCH</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something Exceptional
        </h2>
        <p className="mt-3 text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl">
          Whether you're looking for a full-stack engineer, discussing a scalable architecture project, or exploring collaboration, my inbox is always open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Direct Contact Hub & Socials (5 cols) */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          {/* Email Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#0b0f19]/90 border border-white/[0.08] hover:border-cyan-400/40 backdrop-blur-xl transition-all group">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Direct Email
                  </span>
                  <a
                    href="mailto:mdabdullah.ab898@gmail.com"
                    className="text-xs sm:text-sm md:text-base font-semibold text-white hover:text-cyan-300 transition-colors block truncate"
                    title="mdabdullah.ab898@gmail.com"
                  >
                    mdabdullah.ab898@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy('mdabdullah.ab898@gmail.com', 'email')}
                className="p-2 sm:p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer shrink-0"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copiedEmail && (
              <span className="text-[11px] font-mono text-emerald-400 mt-2 block animate-in fade-in">
                ✓ Copied to clipboard
              </span>
            )}
          </div>

          {/* Phone Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#0b0f19]/90 border border-white/[0.08] hover:border-purple-400/40 backdrop-blur-xl transition-all group">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Phone & WhatsApp
                  </span>
                  <a
                    href="tel:+8801780879898"
                    className="text-xs sm:text-sm md:text-base font-semibold text-white hover:text-purple-300 transition-colors font-mono block truncate"
                  >
                    +880 1780 879898
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy('+8801780879898', 'phone')}
                className="p-2 sm:p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-purple-400 transition-colors cursor-pointer shrink-0"
                title="Copy Phone Number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copiedPhone && (
              <span className="text-[11px] font-mono text-emerald-400 mt-2 block animate-in fade-in">
                ✓ Copied to clipboard
              </span>
            )}
          </div>

          {/* Location & Timezone Card */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#0b0f19]/90 border border-white/[0.08] backdrop-blur-xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Location & Timezone
                </span>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white">
                  Dhaka, Bangladesh (GMT+6)
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#0b0f19]/90 border border-white/[0.08] backdrop-blur-xl">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-4">
              Developer Profiles & Socials
            </span>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <a
                href="https://github.com/abdullahab98"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all text-slate-300 hover:text-white group"
              >
                <GithubIcon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] sm:text-xs font-medium">GitHub</span>
              </a>

              <a
                href="https://gitlab.com/mdabdullah98"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-400/50 hover:bg-orange-500/10 transition-all text-slate-300 hover:text-white group"
              >
                <GitlabIcon className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] sm:text-xs font-medium">GitLab</span>
              </a>

              <a
                href="https://www.linkedin.com/in/md-abdullah-537b1538a/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center gap-2 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-400/50 hover:bg-blue-500/10 transition-all text-slate-300 hover:text-white group"
              >
                <LinkedinIcon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] sm:text-xs font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Stitched Contact Form (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl bg-[#0b0f19]/95 border border-white/[0.08] p-5 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Send an Engineering Inquiry
          </h3>
          <p className="text-sm text-slate-400 mb-8">
            Fill in the details below and I'll respond within 24 hours.
          </p>

          {submitted ? (
            <div className="py-12 px-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in zoom-in-95 duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">
                Message Dispatched Successfully!
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-2">
                Thank you for reaching out! Your message has been recorded, and a confirmation thank-you email has been dispatched to your email address.
              </p>
              <p className="text-xs font-mono text-cyan-400 mb-6">
                I review messages regularly and will follow up with you within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleResetForm}
                className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono animate-in fade-in flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{errorMessage}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Project Subject / Discussion Topic
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder="e.g. Full-Stack / Spring Boot Microservices Project"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Message Details
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Describe your requirements, project scope, or role details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
