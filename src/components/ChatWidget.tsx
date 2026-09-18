import { useState, useRef, useEffect, type FormEvent } from 'react'
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  ChevronDown
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'model'
  text: string
  timestamp: string
}

const SYSTEM_INSTRUCTION = `You are the personal AI Assistant for Md. Abdullah's developer portfolio website.
Your mission is to represent Md. Abdullah professionally, accurately, and enthusiastically to visitors, recruiters, and clients.

About Md. Abdullah:
- Role: Full-Stack Software Engineer.
- Location: Dhaka, Bangladesh (GMT+6).
- Education: Studying Computer Science & Engineering at Southeast University (Current CGPA: 3.57).
- Professional Experience: Working as a Programming Assistant at the Southeast University IT Department, developing production modules for the University Management System (UMS) used by thousands of students and faculty.
- Core Skills:
  * Backend & Architecture: Python, FastAPI, Java (Spring Boot), Node.js, Microservices, RESTful APIs, JWT Security.
  * Frontend: React, Next.js, Angular, React Native (Mobile), Tailwind CSS.
  * Data & AI: MongoDB, Groq API (LLM Integration), OpenCV (Computer Vision).
  * DevOps & Tools: Git, Linux, Postman, Vercel, Render.
- Featured Projects:
  1. Medicalx: AI-driven medical appointment and triage system (Spring Boot, MongoDB, Groq LLM API, React).
  2. Parking Management System: Computer vision automated slot booking with JavaFX, MySQL, and OpenCV for vehicle license plate detection (ANPR).
  3. Systems Automation & Tools: Browser API Tracker, Live-state Reloader extension, and Node.js HTML-to-PDF batch converter.
- Contact Details:
  * Email: mdabdullah.ab898@gmail.com
  * Phone/WhatsApp: +8801780879898
  * Socials: GitHub, GitLab, LinkedIn.

Instructions:
- Keep answers concise, clear, polite, and technically accurate.
- If asked in Bengali or Banglish, reply in helpful Bengali/Banglish naturally. If asked in English, reply in English.
- Always encourage visitors to reach out to Abdullah for job opportunities, internships, or freelance collaboration.`

const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY

// Models supporting free tier with high uptime and low latency
const GEMINI_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-3-flash-preview'
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! 👋 I'm Md. Abdullah's AI Assistant, powered by Google Gemini. Ask me anything about Abdullah's projects, skills, university experience, or how to get in touch!",
      timestamp: 'Just now'
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [isOpen, messages])

  const quickPrompts = [
    'Tell me about Abdullah',
    "What's his core tech stack?",
    'Experience at SEU IT Dept',
    'How can I contact him?'
  ]

  const handleSendMessage = async (userText: string) => {
    const textToSend = userText.trim()
    if (!textToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      // Build conversation history for Gemini
      const conversationHistory = updatedMessages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))

      let response: Response | null = null

      // Try free models in priority order until one succeeds
      for (const model of GEMINI_MODELS) {
        try {
          const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: SYSTEM_INSTRUCTION }]
                },
                contents: conversationHistory,
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 600
                }
              })
            }
          )

          if (res.ok) {
            response = res
            break
          } else {
            console.warn(`Model ${model} returned status ${res.status}`)
          }
        } catch (callErr) {
          console.warn(`Error trying model ${model}:`, callErr)
        }
      }

      if (!response || !response.ok) {
        throw new Error('All Gemini model candidates failed or timed out.')
      }

      const data = await response.json()
      const parts = data.candidates?.[0]?.content?.parts || []
      const textParts = parts
        .filter((p: { text?: string; thought?: boolean }) => p.text && !p.thought)
        .map((p: { text: string }) => p.text)
        .join('')

      const aiReply =
        textParts ||
        parts[0]?.text ||
        "I'm sorry, I couldn't generate a response. Please try reaching out directly via email at mdabdullah.ab898@gmail.com!"

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } catch (err) {
      console.error('Gemini chat error:', err)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: '⚠️ Network connection or API limit issue. You can reach Abdullah directly at mdabdullah.ab898@gmail.com or +8801780879898!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: "Chat cleared. What else would you like to know about Md. Abdullah's engineering work?",
        timestamp: 'Just now'
      }
    ])
  }

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0b0f19]/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chat with Abdullah's AI</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Assistant Chat"
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:shadow-[0_0_40px_rgba(0,240,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
          ) : (
            <>
              <Bot className="w-7 h-7" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#07090e] animate-ping" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#07090e]" />
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] max-h-[82vh] rounded-3xl bg-[#090d16]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-cyan-950/40 via-purple-950/20 to-transparent border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090d16]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    Abdullah AI
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.2 rounded border border-cyan-500/20">
                    Gemini 3.6
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Online • Always ready to assist
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Clear conversation"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                {msg.role === 'model' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl leading-relaxed text-xs sm:text-sm ${msg.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-medium rounded-tr-none shadow-[0_2px_15px_rgba(0,240,255,0.25)]'
                    : 'bg-white/[0.04] border border-white/[0.08] text-slate-200 rounded-tl-none'
                    }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span
                    className={`block text-[9px] font-mono mt-1 ${msg.role === 'user' ? 'text-slate-800' : 'text-slate-500'
                      }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-teal-400/20 border border-teal-400/30 flex items-center justify-center shrink-0 text-teal-300 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-mono p-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 animate-pulse">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-1 bg-white/[0.03] px-3 py-2 rounded-xl border border-white/[0.06]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Thinking with Gemini...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Prompts (shown if only welcome message) */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-cyan-500/10 border border-white/[0.08] hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={onSubmit}
            className="p-3 bg-[#07090e]/90 border-t border-white/[0.08] flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask anything about Abdullah..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 font-semibold hover:from-cyan-300 hover:to-teal-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
