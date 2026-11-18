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
  Sparkles,
  Users
} from 'lucide-react'

interface Publication {
  id: string
  title: string
  authors: string
  publisher: string
  year: string
  version: string
  license: string
  doi: string
  doiUrl: string
  type: string
  description: string
  highlights: { label: string; value: string; detail: string }[]
  tags: string[]
}

const PUBLICATIONS: Publication[] = [
  {
    id: 'bdryfish-sciencedb-2026',
    title: 'BDryFish: An Image Dataset for Dried Fish Classification in Bangladesh',
    authors: 'Tanvir Anjum Apurbo, Kh Faysal Ahammed, Hafizur Rahman, Md. Abdullah',
    publisher: 'Science Data Bank (ScienceDB)',
    year: '2026',
    version: 'V5',
    license: 'CC BY 4.0',
    doi: '10.57760/sciencedb.25907',
    doiUrl: 'https://doi.org/10.57760/sciencedb.25907',
    type: 'Open Access Dataset',
    description:
      'BDryFish is an image dataset of dried fish (shutki) as it is sold in Bangladesh. It contains 5,778 smartphone photographs of 22 market trade categories, taken on two field days, 14 and 21 May 2025, at two wholesale markets in Dhaka, Bangladesh, namely Karwan Bazar (23.7517 N, 90.3943 E) and Rayerbazar Shutki Arot in Mohammadpur (23.7456 N, 90.3587 E). Each category was photographed in two presentations: Single images (2,981) show isolated specimens laid on a plain sheet, and Bulk images (2,797) show the dense heaps in which the product is displayed for sale. Each category has between 210 and 345 images.\n\nThe photographs were taken by hand, about 30 to 50 cm from the product under natural light, with an Apple iPhone 15 (4,533 images), an Apple iPhone 12 (241 images), and a Samsung Galaxy F22 (1,003 images), each used with its main and ultra-wide cameras; the flash fired on 700 images. Of about 7,000 photographs, 5,875 were kept after eye screening, and SHA-256 deduplication removed 96 byte-identical copies and 1 empty file, leaving 5,778 curated images.\n\nThe record includes BDryFish-v4-raw.zip (17.51 GB, 1.1 to 89.9 MP), BDryFish-v4-resized640.zip (874.95 MB, 640 px long side with Lanczos resampling, no padding), and BDryFish-v5-metadata.zip (1.14 MB) containing 28-column metadata/images.csv, classes.csv, SHA-256 manifests, session-aware train/val/test splits across 4 time thresholds (2s, 5s, 10s, 30s), and bdryfish_tools.py.',
    highlights: [
      {
        label: 'Total Images',
        value: '5,778',
        detail: 'iPhone 15, iPhone 12 & Galaxy F22'
      },
      {
        label: 'Trade Classes',
        value: '22',
        detail: '210–345 images per Bangla category'
      },
      {
        label: 'Single / Bulk',
        value: '2,981 / 2,797',
        detail: 'Isolated specimens & market heaps'
      },
      {
        label: 'Dataset Size',
        value: '18.38 GB',
        detail: 'Raw (17.51 GB) + 640px + Metadata V5'
      }
    ],
    tags: [
      'Computer Vision',
      'Image Classification',
      'Shutki / Dried Fish',
      'Session-Aware Split',
      'SHA-256 Verified',
      'CC BY 4.0'
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
          Open-access academic datasets and computer vision research curated for real-world machine learning benchmarks.
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
                      {pub.publisher}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 dark:border-purple-400/30 text-purple-700 dark:text-purple-300 text-xs font-mono">
                      {pub.type} • {pub.year} ({pub.version})
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 dark:border-emerald-400/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono">
                      {pub.license}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] px-2.5 py-1 rounded-lg">
                    DOI: {pub.doi}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                  <a
                    href={pub.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline decoration-cyan-500/50 underline-offset-4"
                  >
                    {pub.title}
                  </a>
                </h3>

                {/* Authors */}
                <div className="flex items-start sm:items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5">
                  <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5 sm:mt-0" />
                  <span>
                    <span className="font-mono text-slate-500 dark:text-slate-400 mr-1.5">Authors:</span>
                    Tanvir Anjum Apurbo, Kh Faysal Ahammed, Hafizur Rahman,{' '}
                    <strong className="text-slate-900 dark:text-white font-semibold underline decoration-cyan-500/40 underline-offset-2">
                      Md. Abdullah
                    </strong>
                    <span className="text-slate-500 dark:text-slate-400 ml-1.5">(Southeast University)</span>
                  </span>
                </div>

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

                {/* Description / Abstract Box */}
                <div className="rounded-2xl bg-slate-50/80 dark:bg-black/25 border border-slate-200/80 dark:border-white/[0.06] p-4 sm:p-5 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300">
                      Dataset Description
                    </span>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                      className="inline-flex items-center gap-1 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Show Less' : 'Read Full Description'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p
                    className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line ${
                      isExpanded ? '' : 'line-clamp-4'
                    }`}
                  >
                    {pub.description}
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
                      <span>View Dataset</span>
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
