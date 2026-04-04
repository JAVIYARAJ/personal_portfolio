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
import Footer from '@/components/portfolio/footer'
import BackgroundAmbience from '@/components/portfolio/background-ambience'
import Navigation from '@/components/portfolio/navigation'
import ProgressBar from '@/components/portfolio/progress-bar'
import CustomCursor from '@/components/portfolio/custom-cursor'
import SmoothScroll from '@/components/portfolio/smooth-scroll'

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
    <SmoothScroll>
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

        <Footer />
      </div>
    </SmoothScroll>
  )
}
