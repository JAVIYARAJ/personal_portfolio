'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Smartphone, Zap, Heart, Rocket, Star, BarChart3, Activity, ShieldCheck } from 'lucide-react'

const stats = [
  { target: 15, suffix: '+', label: 'DEPLOYED APPS', sub: 'Production Grade', icon: <Smartphone />, color: '#027DFD' },
  { target: 40, suffix: '%', label: 'DEV VELOCITY', sub: 'Efficiency Lift', icon: <Zap />, color: '#44D9E8' },
  { target: 99, suffix: '.9%', label: 'CRASH-FREE', sub: 'Stability Index', icon: <ShieldCheck />, color: '#F87171' },
  { target: 3, suffix: '+', label: 'YEARS EXP', sub: 'Industrial Tenure', icon: <Rocket />, color: '#10B981' },
]

function AnimatedCounter({ target, suffix = '', isActive }: { target: number, suffix?: string, isActive: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)

    const handle = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(handle)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(handle)
  }, [target, isActive])

  return (
    <div className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
      {count}
      <span className="text-2xl md:text-3xl text-white/20 ml-1 font-light">{suffix}</span>
    </div>
  )
}

function StatCard({ stat, index }: { stat: typeof stats[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' },
        visible: { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          filter: 'blur(0px)',
          transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } 
        }
      }}
      onViewportEnter={() => setIsActive(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-6 sm:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden group hover:bg-white/[0.08] transition-all duration-700 h-full"

    >
      {/* HUD Scanner FX */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ top: '-100%' }}
            animate={{ top: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan to-transparent z-20 opacity-50"
          />
        )}
      </AnimatePresence>

      {/* Dynamic Glow Environment */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 z-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}15 0%, transparent 70%)` }}
      />

      <div className="relative z-10 space-y-8">
        <div className="flex justify-between items-center">
          <div
            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110"
            style={{ color: stat.color }}
          >
            {stat.icon}
          </div>
          <Activity className="text-white/5 group-hover:text-white/20 transition-colors" size={40} />
        </div>

        <div className="space-y-1">
          <AnimatedCounter target={stat.target} suffix={stat.suffix} isActive={isActive} />
          <div className="space-y-0.5">
            <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px] group-hover:text-white transition-colors">
              {stat.label}
            </p>
            <p className="text-[10px] font-light text-white/20 italic">{stat.sub}</p>
          </div>
        </div>

        {/* Technical Progress Rail */}
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={isActive ? { width: '100%' } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-full bg-white/20"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={isActive ? { width: '40%' } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-0 left-0 h-full"
            style={{ backgroundColor: stat.color }}
          />
        </div>
      </div>
    </motion.div>
  )
}

import FadeIn from './fade-in'
import TextReveal from './text-reveal'
import Magnetic from './magnetic'


export default function Stats() {
  return (
    <section id="stats" className="py-40 px-6 bg-[#0B0B13] relative overflow-hidden">
      {/* Energy Background Particle System */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(68,217,232,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn className="text-center lg:text-left mb-32 space-y-8 flex flex-col items-center lg:items-start" direction="none" blur scale={0.98}>



          <Magnetic>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md"
            >
              <ShieldCheck size={14} className="animate-pulse" />
              Verified Metrics
            </div>
          </Magnetic>

          <TextReveal
            text="Impact by Numbers."
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter"
          />



          <p className="text-white/40 text-base sm:text-xl max-w-2xl font-light leading-relaxed">

            Tangible results from architecting high-scale cross-platform systems and modular engineering environments.
          </p>
        </FadeIn>

        <FadeIn staggerChildren={0.1} direction="up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </FadeIn>

        {/* Cinematic Achievement Rail */}
        <FadeIn className="mt-20" delay={0.4} direction="up" blur scale={0.98}>
          <div className="p-6 sm:p-10 rounded-[2.5rem] md:rounded-[4rem] bg-[#0A0A0F] border border-white/10 backdrop-blur-3xl relative overflow-hidden group hover:bg-white/[0.03] transition-all duration-700 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-purple group-hover:w-3 transition-all" />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
              <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10 text-center sm:text-left group/tier">
                <div className="w-20 h-20 rounded-[1.5rem] bg-accent-cyan/5 border border-accent-cyan/10 flex items-center justify-center text-accent-cyan relative flex-shrink-0 group-hover/tier:scale-110 transition-all duration-700">
                  <Zap size={36} strokeWidth={1.5} className="relative z-10 transition-all duration-500 drop-shadow-[0_0_15px_rgba(68,217,232,0.5)]" />
                  {/* Concentric Modern Orbits */}
                  <div className="absolute inset-[-12px] border border-accent-cyan/10 rounded-full animate-orbitSlow pointer-events-none" />
                  <div className="absolute inset-[-4px] border border-accent-blue/10 rounded-full animate-orbitMedium pointer-events-none opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/20 to-transparent opacity-0 group-hover/tier:opacity-100 transition-opacity blur-2xl" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">Engineering <span className="text-accent-cyan italic">Velocity Tier.</span></h4>
                  <p className="text-white/30 text-xs sm:text-sm font-light max-w-sm border-l border-white/10 pl-4">Classified within the top 5% of production-grade architecture systems.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 lg:border-l border-white/10 lg:pl-12 w-full lg:w-auto">
                {[
                  { label: 'RETENTION', val: '99%', color: '#10B981' },
                  { label: 'SATISFACTION', val: '4.9/5', color: '#44D9E8' },
                  { label: 'UPTIME', val: 'INFINITY', color: '#027DFD' }
                ].map(item => (
                  <div key={item.label} className="text-center group/item cursor-default border-b border-white/5 pb-4 sm:border-0 sm:pb-0 last:border-0">
                    <p className="text-xl sm:text-2xl font-black text-white group-hover/item:scale-110 transition-transform">{item.val}</p>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1" style={{ color: `${item.color}40` }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

