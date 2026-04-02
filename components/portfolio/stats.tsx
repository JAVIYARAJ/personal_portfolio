'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Smartphone, Zap, Heart, Rocket, Star, BarChart3, Activity, ShieldCheck } from 'lucide-react'

const stats = [
  { target: 15, suffix: '+', label: 'DEPLOYED APPS', sub: 'Production Grade', icon: <Smartphone />, color: '#027DFD' },
  { target: 40, suffix: '%', label: 'DEV VELOCITY', sub: 'Efficiency Lift', icon: <Zap />, color: '#44D9E8' },
  { target: 95, suffix: '%', label: 'USER RETENTION', sub: 'Engagement Rate', icon: <Heart />, color: '#F87171' },
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden group hover:bg-white/[0.08] transition-all duration-700"
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
           <AnimatedCounter target={stat.target} suffix={stat.suffix} isActive={isInView} />
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
             animate={isInView ? { width: '100%' } : {}}
             transition={{ duration: 1.5, delay: 0.5 + (index * 0.1) }}
             className="h-full bg-white/20"
           />
           <motion.div
             initial={{ width: 0 }}
             animate={isInView ? { width: '40%' } : {}}
             transition={{ duration: 1, delay: 1 + (index * 0.1) }}
             className="absolute top-0 left-0 h-full"
             style={{ backgroundColor: stat.color }}
           />
        </div>
      </div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="py-40 px-6 bg-[#0B0B13] relative overflow-hidden">
      {/* Energy Background Particle System */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(68,217,232,0.05),transparent)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md"
          >
            <ShieldCheck size={14} className="animate-pulse" />
            Verified Metrics
          </motion.div>
          
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
            Impact by <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Numbers.</span>
          </h2>
          
          <p className="text-white/40 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Tangible results from architecting high-scale cross-platform systems and modular engineering environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Cinematic Achievement Rail */}
        <div className="mt-20 p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl relative overflow-hidden group hover:bg-white/[0.08] transition-all duration-700">
           <div className="absolute inset-y-0 left-0 w-2 bg-accent-cyan/40 group-hover:bg-accent-cyan transition-all" />
           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex items-center gap-8">
                 <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-cyan shadow-[0_0_30px_rgba(2,125,253,0.2)]">
                    <Star size={32} fill="currentColor" />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-2xl font-black text-white">Engineering Velocity Tier</h4>
                    <p className="text-white/30 text-sm font-light">Classified within the top 5% of production output quality</p>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-12 border-l border-white/10 pl-12">
                 {[
                    { label: 'RETENTION', val: '99%', color: '#10B981' },
                    { label: 'SATISFACTION', val: '4.9/5', color: '#44D9E8' },
                    { label: 'UPTIME', val: 'INFINITY', color: '#027DFD' }
                 ].map(item => (
                    <div key={item.label} className="text-center group/item cursor-default">
                       <p className="text-xl font-black text-white group-hover/item:scale-110 transition-transform">{item.val}</p>
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1" style={{ color: `${item.color}40` }}>{item.label}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  )
}
