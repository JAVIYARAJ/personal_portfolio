'use client'

import { useEffect, useRef, useState } from 'react'
import { Trophy, Code, Target, Zap, Cpu, Sparkles } from 'lucide-react'

const techStack = [
  { name: 'Flutter', icon: '🦋', desc: 'Framework Expert' },
  { name: 'Dart', icon: '🎯', desc: 'Core Language' },
  { name: 'Riverpod', icon: '💧', desc: 'State Management' },
  { name: 'BLoC', icon: '🧱', desc: 'Business Logic' },
  { name: 'Firebase', icon: '🔥', desc: 'Realtime Services' },
  { name: 'Supabase', icon: '⚡', desc: 'Modern Backend' },
  { name: 'Codemagic', icon: '🪄', desc: 'CI/CD Automation' },
  { name: 'Sentry', icon: '👁️', desc: 'Error Monitoring' },
]

const achievements = [
  {
    title: '20% Dev Speed',
    description: 'Reduced development time through modular architecture and automation.',
    icon: <Zap className="text-accent-cyan" />,
  },
  {
    title: '15% User Satisfaction.',
    description: 'Improved application performance and UI features contributing to higher satisfaction.',
    icon: <Trophy className="text-accent-blue" />,
  },
  {
    title: 'Clean Architecture',
    description: 'Maintain code quality and maintainability using standard clean architecture rules.',
    icon: <Code className="text-accent-purple" />,
  },
  {
    title: '30% Stability',
    description: 'Enhanced codebase maintainability and application stability during large-scale refactors.',
    icon: <Target className="text-accent-cyan" />,
  },
]

export default function About() {
  const [animateHeader, setAnimateHeader] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateHeader(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-40 px-6 relative overflow-hidden bg-[#0A0A0F]" ref={sectionRef}>
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-[1000px] -z-10 bg-gradient-to-b from-accent-blue/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-accent-purple/5 rounded-full blur-[180px]" />

      <div className="max-w-7xl mx-auto space-y-40">
        {/* REFINED HEADER & IMPACT SECTION */}
        <div className="grid lg:grid-cols-12 gap-24 items-start">
          <div className="lg:col-span-12 xl:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                Professional Vision
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] pb-2">
                Engineering <br/>
                <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic inline-block py-2">Scalable Solutions.</span>
              </h2>
              <p className="text-xl text-white/50 leading-relaxed font-light max-w-2xl">
                I transform complex visions into reliable, maintainable applications. 
                With <span className="text-white font-bold">3+ years</span> of expertise in the Flutter ecosystem, 
                I bridge the gap between high-scale architecture and user-centric digital interfaces.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
               <div className="px-8 py-3.5 rounded-3xl bg-white/5 border border-white/10 text-xs font-black text-accent-cyan uppercase tracking-widest hover:bg-white/10 transition-colors">
                  Quality Driven
               </div>
               <div className="px-8 py-3.5 rounded-3xl bg-white/5 border border-white/10 text-xs font-black text-accent-blue uppercase tracking-widest hover:bg-white/10 transition-colors">
                  System Architecture
               </div>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((item, idx) => (
                <div 
                  key={item.title}
                  className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-accent-cyan/30 transition-all duration-500 group relative overflow-hidden h-full flex flex-col justify-between"
                  style={{
                    animation: animateHeader ? `fadeInUp 0.6s ease-out ${idx * 0.1}s forwards` : 'none',
                    opacity: 0
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-accent-cyan/10 transition-all duration-500">
                      {item.icon}
                    </div>
                    <h4 className="text-3xl font-black text-white mb-4 leading-tight">{item.title}</h4>
                    <p className="text-[14px] text-white/40 leading-relaxed font-light">{item.description}</p>
                  </div>
                  
                  {/* Subtle technical detail */}
                  <div className="mt-8 h-1 w-12 bg-white/10 rounded-full group-hover:w-24 group-hover:bg-accent-cyan transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
