'use client'

import { useEffect, useRef, useState } from 'react'
import { Briefcase, Globe, Heart, Rocket, Smartphone, Star, Users, Zap } from 'lucide-react'

const stats = [
  { target: 50, suffix: '+', description: 'Apps Delivered', icon: <Smartphone size={32} className="text-accent-blue" /> },
  { target: 3, suffix: 'M+', description: 'Global Reach', icon: <Users size={32} className="text-accent-cyan" /> },
  { target: 99, suffix: '%', description: 'Customer Success', icon: <Heart size={32} className="text-accent-purple" /> },
  { target: 5, suffix: '+', description: 'Years Experience', icon: <Rocket size={32} className="text-accent-cyan" /> },
]

interface AnimatedCounterProps {
  target: number
  suffix?: string
  isActive: boolean
}

function AnimatedCounter({ target, suffix = '', isActive }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0

    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [target, isActive])

  return (
    <div className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums">
      {count}
      <span className="text-3xl md:text-4xl text-accent-cyan ml-1">{suffix}</span>
    </div>
  )
}

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsActive(true)
            observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden group transition-all duration-500 hover:translate-y-[-10px] hover:bg-white/[0.08]"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`,
        opacity: 0,
      }}
    >
      {/* Interactive Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(68, 217, 232, 0.15) 0%, transparent 50%)`
        }}
      />

      <div className="relative z-10 space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent-cyan/10 transition-all duration-500">
           {stat.icon}
        </div>
        
        <div className="space-y-1">
           <AnimatedCounter target={stat.target} suffix={stat.suffix} isActive={isActive} />
           <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px] group-hover:text-accent-cyan transition-colors">
              {stat.description}
           </p>
        </div>

        {/* Technical Detail */}
        <div className="flex gap-1">
           <div className="h-1 w-8 bg-accent-cyan/20 rounded-full overflow-hidden">
              <div className="h-full w-full bg-accent-cyan animate-shimmer" style={{ animationDelay: `${index * 0.2}s` }} />
           </div>
           <div className="h-1 w-2 bg-white/10 rounded-full" />
        </div>
      </div>

      {/* Decorative Hardware Icon */}
      <div className="absolute top-[-20px] right-[-20px] opacity-[0.02] group-hover:opacity-[0.08] transition-opacity rotate-[-15deg] pointer-events-none">
         {stat.icon}
      </div>
    </div>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 px-6 bg-[#0A0A0F] relative overflow-hidden">
      {/* Ambient BG */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-accent-blue/5 rounded-full blur-[180px] animate-smoothWave" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-[10px] font-black uppercase tracking-widest">
            Key Performance Indicators
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Impact by <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Numbers.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Proven metrics derived from 5+ years of delivering high-stakes mobile and web architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Global Insight Bar */}
        <div className="mt-20 p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:bg-white/[0.08] transition-all duration-500">
           <div className="absolute inset-y-0 left-0 w-2 bg-accent-cyan group-hover:w-4 transition-all" />
           <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                 <div className="p-4 rounded-2xl bg-accent-blue/20 text-accent-cyan">
                    <Star size={32} fill="currentColor" />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-2xl font-black text-white">Top Developer Velocity</h4>
                    <p className="text-white/40 text-sm">Recognized for world-class architectural standards</p>
                 </div>
              </div>
              <div className="flex items-center gap-12 font-black uppercase text-[10px] tracking-widest text-accent-cyan">
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-xl text-white">10+</span>
                    <span>Featured Apps</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-xl text-white">4.9/5</span>
                    <span>Avg. Rating</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <span className="text-xl text-white">99%</span>
                    <span>Retention</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes smoothWave {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </section>
  )
}
