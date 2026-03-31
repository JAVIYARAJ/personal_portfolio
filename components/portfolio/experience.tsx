'use client'

import { useEffect, useRef, useState } from 'react'
import { Briefcase, Calendar, CheckCircle2, Cpu, Globe, Rocket, Zap } from 'lucide-react'

const experiences = [
  {
    company: 'TechStartup Inc',
    role: 'Senior Flutter Developer',
    duration: '2022 - Present',
    logo: '🚀',
    tech: ['Riverpod', 'CI/CD', 'Web3'],
    bullets: [
      'Led development of flagship mobile app serving 500K+ daily users',
      'Mentored junior developers and established coding standards',
      'Reduced app load time by 40% through optimization',
    ],
  },
  {
    company: 'Digital Solutions Ltd',
    role: 'Flutter Developer',
    duration: '2020 - 2022',
    logo: '🌐',
    tech: ['Firebase', 'GraphQL', 'Swift'],
    bullets: [
      'Developed and shipped 15+ production apps across iOS and Android',
      'Implemented real-time features using Firebase and WebSockets',
      'Collaborated with designers to ensure pixel-perfect UI implementation',
    ],
  },
  {
    company: 'Mobile Ventures',
    role: 'Junior Developer',
    duration: '2019 - 2020',
    logo: '💻',
    tech: ['REST', 'UX', 'Native'],
    bullets: [
      'Built responsive mobile applications using Flutter framework',
      'Integrated third-party APIs and payment gateways',
      'Participated in code reviews and continuous improvement',
    ],
  },
]

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
      
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-32 space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
            <Zap size={14} className="animate-pulse" />
            Engineering Lifecycle
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            Professional <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Path.</span>
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Main Vertical Trunk */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-white/5 pointer-events-none rounded-full overflow-hidden">
             <div 
               className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-purple transition-all duration-500 rounded-full"
               style={{ height: `${scrollProgress * 100}%` }}
             />
          </div>

          <div className="space-y-48">
            {experiences.map((exp, index) => {
              const isActive = scrollProgress > (index / experiences.length)
              return (
                <div
                  key={exp.company}
                  className={`relative flex flex-col md:flex-row items-center justify-between gap-12 group`}
                  data-timeline-item
                >
                  {/* CENTRAL POWER HUB */}
                  <div className="absolute left-6 md:left-1/2 w-16 h-16 -translate-x-1/2 bg-[#0B0B13] border-2 border-white/10 rounded-[24px] flex items-center justify-center z-30 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:scale-110 group-hover:border-accent-cyan/50 group-hover:rotate-[15deg]">
                      <div className={`w-4 h-4 rounded-full transition-all duration-700 ${
                          isActive 
                          ? 'bg-accent-cyan shadow-[0_0_20px_rgba(68,217,232,1)] scale-110 animate-pulse' 
                          : 'bg-white/10'
                      }`} />
                      
                      {/* Peripheral Hardware Detail */}
                      <div className="absolute inset-2 border border-white/5 rounded-xl pointer-events-none" />
                      <div className="absolute -inset-1 border border-accent-cyan/10 rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* LEFT WING: Info & Brand */}
                  <div className={`w-full md:w-[42%] flex flex-col gap-8 transition-all duration-700 ${
                     index % 2 === 0 
                     ? 'md:items-end md:text-right order-2 md:order-1' 
                     : 'md:items-start md:text-left order-2 md:order-3'
                  }`}>
                      <div className="space-y-6">
                        <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-20 h-20 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-2xl group-hover:bg-accent-blue/20 transition-all duration-500 group-hover:shadow-accent-blue/20">
                               {exp.logo}
                            </div>
                            <div className="space-y-1">
                               <h3 className="text-4xl font-black text-white group-hover:text-accent-cyan transition-colors duration-500">{exp.company}</h3>
                               <p className="text-accent-blue font-bold tracking-[0.3em] text-[11px] uppercase opacity-70">{exp.duration}</p>
                            </div>
                        </div>

                        <div className={`flex flex-wrap gap-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                            {exp.tech.map((t) => (
                               <div key={t} className="px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black text-white/50 uppercase tracking-widest group-hover:border-accent-cyan/30 group-hover:text-accent-cyan transition-all duration-500 backdrop-blur-md">
                                  {t}
                               </div>
                            ))}
                        </div>
                      </div>

                      {/* LATERAL CONNECTOR (Wings) */}
                      <div className={`hidden md:block absolute top-1/2 h-[2px] pointer-events-none transition-all duration-700 ${
                         isActive ? 'bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent' : 'bg-transparent'
                      } ${
                         index % 2 === 0 ? 'right-[50%] mr-8 w-48' : 'left-[50%] ml-8 w-48'
                      }`}>
                         {/* Traveling Pulse Node */}
                         <div className={`absolute top-[-2px] w-1.5 h-1.5 bg-accent-cyan rounded-full shadow-[0_0_10px_rgba(68,217,232,1)] ${
                             index % 2 === 0 ? 'animate-pulseLeft' : 'animate-pulseRight'
                         }`} />
                      </div>
                  </div>

                  {/* RIGHT WING: The Core Card */}
                  <div className={`w-full md:w-[42%] flex transition-all duration-700 ${
                      index % 2 === 0 ? 'order-3 md:order-3' : 'order-3 md:order-1'
                  }`}>
                    <div className="p-12 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-2xl relative overflow-hidden group/card hover:bg-white/[0.08] transition-all duration-500 hover:translate-y-[-10px] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                       <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover/card:opacity-[0.08] transition-opacity translate-x-1/4 -translate-y-1/4">
                          <Cpu size={240} className="text-accent-cyan" />
                       </div>
                       
                       <div className="relative z-10 space-y-8">
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <Briefcase size={18} className="text-accent-blue" />
                                <h4 className="text-3xl font-black text-white leading-tight">{exp.role}</h4>
                             </div>
                             <div className="h-1.5 w-16 bg-gradient-to-r from-accent-blue to-accent-cyan rounded-full group-hover/card:w-32 transition-all duration-500" />
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
                </div>
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
