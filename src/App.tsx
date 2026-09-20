import { useEffect, useState } from 'react'
import { Scene3D } from './components/Scene3D'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ChatWidget } from './components/ChatWidget'

export function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#07090e] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Interactive 3D WebGL Three.js Scene */}
      <Scene3D />

      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 240, 255, 0.04), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* Cyber Grid Pattern Background Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25 cyber-grid"
        aria-hidden="true"
      />

      {/* Foreground Content Stitched Together */}
      <div className="relative z-20 flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Hero />
          
          {/* Subtle separator glow line */}
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </div>

          <About />

          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          </div>

          <Skills />

          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </div>

          <Projects />

          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          </div>

          <Contact />
        </main>

        <Footer />
      </div>

      {/* Floating Gemini AI Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App
