'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/portfolio/hero'
import About from '@/components/portfolio/about'
import Stats from '@/components/portfolio/stats'
import Projects from '@/components/portfolio/projects'
import Skills from '@/components/portfolio/skills'
import Experience from '@/components/portfolio/experience'
import OpenSource from '@/components/portfolio/open-source'
import Contact from '@/components/portfolio/contact'
import BackgroundAmbience from '@/components/portfolio/background-ambience'
import Navigation from '@/components/portfolio/navigation'
import ProgressBar from '@/components/portfolio/progress-bar'
import CustomCursor from '@/components/portfolio/custom-cursor'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative text-foreground selection:bg-accent-cyan/30">
      <BackgroundAmbience />
      <CustomCursor />
      <Navigation />
      <ProgressBar progress={scrollProgress} />

      <main>
        <Hero />
        <About />
        <Stats />
        <Projects />
        <Skills />
        <Experience />
        <OpenSource />
        <Contact />
      </main>

      <footer className="bg-card border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-foreground font-semibold">Javiya Raj</p>
            <p className="text-muted text-sm">Building with Digital Excellence 💙</p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-2 rounded-lg bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-cyan transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </div>
  )
}
