import { useState } from 'react'
import {
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  Database,
  Camera,
  MapPin,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react'

interface Publication {
  id: string
  title: string
  journal: string
  year: string
  doi: string
  doiUrl: string
  type: string
  abstract: string
  highlights: { label: string; value: string; detail: string }[]
  tags: string[]
}

const PUBLICATIONS: Publication[] = [
  {
    id: 'bdryfish-2026',
    title:
      'BDryFish: A smartphone image dataset of dried fish (Shutki) trade categories from Bangladeshi markets',
    journal: 'Data in Brief • Elsevier',
    year: '2026',
    doi: '10.1016/j.dib.2026.113359',
    doiUrl: 'https://doi.org/10.1016/j.dib.2026.113359',
    type: 'Dataset Article',
    abstract:
      'Dried fish, known in Bangladesh as shutki, is traded under local names that do not correspond neatly to biological species. BDryFish contains 5778 photographs of 22 dried fish trade categories, taken with three smartphones, with and without flash, on 14 and 21 May 2025 at two wholesale markets in Dhaka, Karwan Bazar and Rayerbazar Shutki Arot. Every category is shown as isolated specimens (Single, 2981 images) and as market heaps (Bulk, 2797 images). The labels are the Bangla trade names given by sellers, so the label space combines species with processing state and cut. English and scientific names were matched from online sources and are not independent taxonomic identifications. Two pairs of classes share a species (whole and sliced hilsa, sun dried and fermented swamp barb), two hairtail classes are size grades, Chouka has no established scientific identity, and one class is a crustacean. Images are released at full resolution and at 640 pixels on the long side, without padding. A metadata table records capture time, device, lens, market, flash state and capture session identifiers at four time thresholds. Because frames were taken in bursts, a random split would put near identical frames in training and test sets, so the recommended split keeps whole capture sessions together. The dataset supports image classification benchmarks under market conditions, transfer between isolated and heaped presentations, shifts across devices and capture days, and recognition of processing states for food authentication. It is an image classification resource; object detection would require additional annotation.',
    highlights: [
      {
        label: 'Total Images',
        value: '5,778',
        detail: '3 smartphones, flash & no-flash'
      },
      {
        label: 'Trade Classes',
        value: '22',
        detail: 'Bangla trade names & processing states'
      },
      {
        label: 'Single / Bulk',
        value: '2,981 / 2,797',
        detail: 'Isolated specimens & market heaps'
      },
      {
        label: 'Markets',
        value: '2 Dhaka Hubs',
        detail: 'Karwan Bazar & Rayerbazar Shutki Arot'
      }
    ],
    tags: [
      'Computer Vision',
      'Image Classification',
      'Food Authentication',
      'Domain Shift',
      'Session-Aware Split',
      '640px & Full-Res'
    ]
  }
]

export function Publications() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyDoi = async (pub: Publication) => {
    try {
      await navigator.clipboard.writeText(pub.doiUrl)
      setCopiedId(pub.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Fallback ignored if clipboard permission is unavailable
    }
  }

  return (
    <section
      id="publications"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 dark:border-purple-500/30 text-purple-700 dark:text-purple-400 text-xs font-mono tracking-wider uppercase mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Research &amp; Publications</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
          Published{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
            Datasets &amp; Papers
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mt-3 text-sm sm:text-base">
          Peer-reviewed academic contributions in computer vision, dataset curation, and real-world machine learning benchmarks.
        </p>
      </div>

      {/* Publications List */}
      <div className="space-y-8 max-w-5xl mx-auto">
        {PUBLICATIONS.map((pub) => {
          const isExpanded = expandedId === pub.id
          const isCopied = copiedId === pub.id

          return (
            <article
              key={pub.id}
              className="group relative rounded-3xl bg-white/85 dark:bg-[#0d111a]/85 border border-slate-200/90 dark:border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 shadow-sm dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,240,255,0.12)] overflow-hidden"
            >
              {/* Subtle accent gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-60 pointer-events-none" />

              <div className="relative z-10">
                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 dark:border-cyan-400/30 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold">
                      <Sparkles className="w-3 h-3" />
                      {pub.journal}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 dark:border-purple-400/30 text-purple-700 dark:text-purple-300 text-xs font-mono">
                      {pub.type} • {pub.year}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] px-2.5 py-1 rounded-lg">
                    DOI: {pub.doi}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug mb-5 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                  <a
                    href={pub.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline decoration-cyan-500/50 underline-offset-4"
                  >
                    {pub.title}
                  </a>
                </h3>

                {/* Dataset Key Highlights Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  {pub.highlights.map((item, idx) => {
                    const icons = [Camera, Layers, Database, MapPin]
                    const Icon = icons[idx % icons.length]
                    return (
                      <div
                        key={item.label}
                        className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06]"
                      >
                        <div className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 text-[11px] font-mono uppercase tracking-wider mb-1">
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {item.value}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                          {item.detail}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Abstract Box */}
                <div className="rounded-2xl bg-slate-50/80 dark:bg-black/25 border border-slate-200/80 dark:border-white/[0.06] p-4 sm:p-5 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300">
                      Abstract
                    </span>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Show Less' : 'Read Full Abstract'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p
                    className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${
                      isExpanded ? '' : 'line-clamp-4'
                    }`}
                  >
                    {pub.abstract}
                  </p>
                </div>

                {/* Tags & Action Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200/80 dark:border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {pub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] text-[11px] font-mono text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyDoi(pub)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.1] transition-all cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">DOI Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                          <span>Copy DOI Link</span>
                        </>
                      )}
                    </button>

                    <a
                      href={pub.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-[0_0_18px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.45)]"
                    >
                      <span>View Publication</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
