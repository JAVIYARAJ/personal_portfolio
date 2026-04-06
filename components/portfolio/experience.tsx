'use client'

import { useEffect, useRef, useState } from 'react'
import { Briefcase, Calendar, CheckCircle2, Cpu, Globe, Rocket, Zap } from 'lucide-react'

const experiences = [
  {
    company: 'Esparkbiz',
    role: 'Flutter Developer',
    duration: 'Sep 2023 - Present',
    logo: '🚀',
    tech: ['Dart', 'Flutter', 'Clean Architecture'],
    bullets: [
      'Leading scalable cross-platform architecture for 15+ production applications with a focus on long-term maintainability',
      'Optimized feature delivery pipelines contributing to a 95% on-time release rate across multiple enterprise projects',
      'Implemented refined modular design patterns reducing development time for new features by 20%',
    ],
  },
  {
    company: 'Esparkbiz',
    role: 'Software Developer Intern',
    duration: 'Jan 2023 - Sep 2023',
    logo: '🌐',
    tech: ['Agile', 'Git', 'UI Optimization'],
    bullets: [
      'Contributed to core feature refactoring that improved codebase maintainability by 30% during high-growth phase',
      'Followed strict Agile methodologies and Git-based workflows, participating in 20+ successful sprint releases',
      'Boosted user engagement by 25% through performance profiling and UI-pixel-perfect optimizations',
    ],
  },
  {
    company: 'Native Systems',
    role: 'Independent Developer',
    duration: 'Jun 2021 - Dec 2022',
    logo: '🤖',
    tech: ['Kotlin', 'Java', 'Jetpack Compose'],
    bullets: [
      'Developed native Android modules and components using Kotlin/Java, establishing a strong platform-level foundation',
      'Built multi-platform MVP modules for freelance clients, mastering the bridge between Flutter and Native environments',
      'Researched and implemented modern UI patterns in Jetpack Compose to streamline cross-platform design consistency',
    ],
  },
]

import FadeIn from './fade-in'
import TextReveal from './text-reveal'
import Magnetic from './magnetic'


export default function Experience() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      const start = windowHeight * 0.8
      const end = windowHeight * 0.2
      const progress = Math.min(Math.max((start - rect.top) / (start - end + rect.height), 0), 1)
      
      setScrollProgress(progress)
    }

    const updateLine = () => {
       const container = containerRef.current
       if (container) {
         const items = container.querySelectorAll('[data-timeline-item]')
         if (items.length > 0) {
           const lastItem = items[items.length - 1] as HTMLElement
           setLineHeight(lastItem.offsetTop + lastItem.offsetHeight / 2)
         }
       }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', updateLine)
    updateLine()
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateLine)
    }
  }, [])

  return (
    <section id="experience" className="pt-32 pb-64 px-6 bg-[#0B0B13] relative overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#44D9E8 1px, transparent 1px), linear-gradient(90deg, #44D9E8 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
      }} />
      
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn className="mb-32 flex flex-col items-center text-center lg:items-start lg:text-left space-y-8" direction="none" blur scale={0.98}>

          <Magnetic>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
              <Zap size={14} className="animate-pulse" />
              Engineering Lifecycle
            </div>
          </Magnetic>
          <TextReveal
            text="Professional Path."
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter"
          />

        </FadeIn>



        <div ref={containerRef} className="relative">
          {/* Main Vertical Trunk */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-white/5 pointer-events-none rounded-full overflow-hidden">
             <div 
               className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-purple transition-all duration-500 rounded-full"
               style={{ height: `${scrollProgress * 100}%` }}
             />
          </div>

          <div className="space-y-24 md:space-y-48">
            {experiences.map((exp, index) => {
              const isActive = scrollProgress > (index / experiences.length)
              return (
                <FadeIn
                  key={`${exp.company}-${index}`}
                  direction={index % 2 === 0 ? 'right' : 'left'}
                  delay={index * 0.1}
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 group`}
                  // @ts-ignore
                  data-timeline-item
                >
                  {/* CENTRAL POWER HUB */}
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 md:w-16 md:h-16 -translate-x-1/2 bg-[#0B0B13] border-2 border-white/10 rounded-[18px] md:rounded-[24px] flex items-center justify-center z-30 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-110 group-hover:border-accent-cyan/50 group-hover:rotate-[15deg]">
                      <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-700 ${
                          isActive 
                          ? 'bg-accent-cyan shadow-[0_0_20px_rgba(68,217,232,1)] scale-110 animate-pulse' 
                          : 'bg-white/10'
                      }`} />
                  </div>

                  {/* LEFT WING: Info & Brand */}
                  <div className={`w-full md:w-[42%] flex flex-col gap-6 md:gap-8 transition-all duration-700 pl-16 md:pl-0 ${
                     index % 2 === 0 
                     ? 'md:items-end md:text-right order-2 md:order-1' 
                     : 'md:items-start md:text-left order-2 md:order-3'
                  }`}>
                      <div className="space-y-4 md:space-y-6">
                        <div className={`flex items-center gap-4 md:gap-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-2xl md:text-4xl shadow-2xl group-hover:bg-accent-blue/20 transition-all duration-500 group-hover:shadow-accent-blue/20 flex-shrink-0">
                               {exp.logo}
                            </div>
                            <div className="space-y-1">
                               <h3 className="text-2xl md:text-4xl font-black text-white group-hover:text-accent-cyan transition-colors duration-500">{exp.company}</h3>
                               <p className="text-accent-blue font-bold tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[11px] uppercase opacity-70">{exp.duration}</p>
                            </div>
                        </div>

                        <div className={`flex flex-wrap gap-2 md:gap-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                            {exp.tech.map((t) => (
                               <div key={t} className="px-3 py-1.5 md:px-5 md:py-2 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-widest group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-all duration-500 backdrop-blur-md">
                                  {t}
                               </div>
                            ))}
                        </div>
                      </div>
                  </div>

                  {/* RIGHT WING: The Core Card */}
                  <div className={`w-full md:w-[42%] flex transition-all duration-700 pl-16 md:pl-0 ${
                      index % 2 === 0 ? 'order-3 md:order-3' : 'order-3 md:order-1'
                  }`}>
                    <div className="p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-2xl relative overflow-hidden group/card hover:bg-white/[0.08] transition-all duration-500 hover:translate-y-[-10px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                       <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover/card:opacity-[0.08] transition-opacity translate-x-1/4 -translate-y-1/4">
                          <Cpu size={240} className="text-accent-cyan" />
                       </div>
                       
                       <div className="relative z-10 space-y-6 md:space-y-8">
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <Briefcase size={16} className="text-accent-blue" />
                                <h4 className="text-xl md:text-3xl font-black text-white leading-tight">{exp.role}</h4>
                             </div>
                             <div className="h-1.5 w-12 md:w-16 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full group-hover/card:w-24 md:group-hover/card:w-32 transition-all duration-500" />
                          </div>

                          <ul className="space-y-6">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex gap-5 text-[15px] leading-relaxed text-white/60 hover:text-white transition-colors group/item">
                                <div className="p-1 rounded-full bg-accent-cyan/10 mt-1 flex-shrink-0 group-hover/item:bg-accent-cyan/30 transition-all">
                                   <CheckCircle2 size={14} className="text-accent-cyan opacity-50 group-hover/item:opacity-100" />
                                </div>
                                <span className="font-light">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                       </div>

                       {/* CARD LATERAL CONNECTOR (Wing) */}
                       <div className={`hidden md:block absolute top-[50%] h-[2px] pointer-events-none transition-all duration-700 ${
                          isActive ? 'bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent' : 'bg-transparent'
                       } ${
                          index % 2 === 1 ? 'right-[50%] mr-8 w-48' : 'left-[50%] ml-8 w-48'
                       }`}>
                          <div className={`absolute top-[-2px] w-1.5 h-1.5 bg-accent-cyan rounded-full shadow-[0_0_10px_rgba(68,217,232,1)] ${
                              index % 2 === 1 ? 'animate-pulseLeft' : 'animate-pulseRight'
                          }`} />
                       </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseLeft {
          0% { right: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { right: 100%; opacity: 0; }
        }
        @keyframes pulseRight {
          0% { left: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-pulseLeft {
          animation: pulseLeft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulseRight {
          animation: pulseRight 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  )
}
