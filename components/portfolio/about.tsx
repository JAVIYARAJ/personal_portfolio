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
    title: '5M+ Active Users',
    description: 'Developed applications currently serving millions of daily active users.',
    icon: <Target className="text-accent-cyan" />,
  },
  {
    title: 'Top 10 App Store',
    description: 'Shipped 3 apps that reached the top 10 in the Finance & Tech categories.',
    icon: <Trophy className="text-accent-blue" />,
  },
  {
    title: 'Clean Code Lead',
    description: 'Authored architectural guidelines used by teams of 50+ engineers.',
    icon: <Code className="text-accent-purple" />,
  },
  {
    title: '40% Perf Boost',
    description: 'Optimized legacy systems to achieve significant performance gains.',
    icon: <Zap className="text-accent-cyan" />,
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
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-white/5 border border-white/10 text-accent-cyan text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                <Sparkles size={16} className="animate-pulse" />
                Architectural Vision
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight animate-fadeInUp">
                Impact <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Engineering.</span>
              </h2>
            </div>
            
            <p className="text-2xl text-white/50 font-light leading-relaxed max-w-2xl">
              Specializing in building robust, high-performance systems that empower millions of users worldwide. 
              I design for the future, ensuring every line of code adds tangible value and long-term scalability.
            </p>

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

        {/* SECTION: Tech Ecosystem */}
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-12 border-t border-white/5">
             <div className="space-y-4">
                <h3 className="text-5xl font-black text-white tracking-tighter">Tech Ecosystem</h3>
                <p className="text-white/40 font-light max-w-xl">A curated stack built for speed, performance, and cross-platform synergy.</p>
             </div>
             <div className="p-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-8 px-8">
                <div className="text-center">
                   <div className="text-3xl font-black text-accent-cyan">15+</div>
                   <div className="text-[10px] text-white/30 uppercase font-black tracking-widest">Languages</div>
                </div>
                <div className="w-[1px] h-10 bg-white/10" />
                <div className="text-center">
                   <div className="text-3xl font-black text-accent-blue">24/7</div>
                   <div className="text-[10px] text-white/30 uppercase font-black tracking-widest">Scale Ops</div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {techStack.map((tech, idx) => (
              <div 
                key={tech.name}
                className="group relative flex flex-col items-center justify-center p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-accent-cyan/50 hover:bg-white/10 transition-all duration-500"
                style={{
                  animation: animateHeader ? `fadeInUp 0.5s ease-out ${idx * 0.05}s forwards` : 'none',
                  opacity: 0
                }}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500 transform-gpu rotate-0 group-hover:rotate-[15deg]">
                   {tech.icon}
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                   {tech.name}
                </span>
                
                {/* Technical Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 p-4 rounded-2xl bg-accent-blue border border-white/20 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-y-[-12px] transition-all duration-300 z-30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                   <p className="text-[11px] font-black text-white uppercase tracking-widest">{tech.desc}</p>
                   <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-accent-blue" />
                </div>
              </div>
            ))}
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
