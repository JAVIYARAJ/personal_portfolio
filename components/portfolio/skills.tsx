'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Code2, Cpu, Database, Layout, Smartphone, Terminal, Zap, CheckCircle2, Binary, CircuitBoard } from 'lucide-react'

const skillGroups = [
  {
    title: 'Framework Core',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14.31 2.35L2.31 14.34L7.44 19.48L21.39 5.54L14.31 2.35Z" fill="#44D9E8"/>
        <path d="M14.19 12.32L7.03 19.48L12.15 24L21.39 14.85L14.19 12.32Z" fill="#027DFD"/>
      </svg>
    ),
    color: '#44D9E8',
    skills: ['Flutter SDK', 'Dart (v3.x)', 'Modular Design', 'Clean Architecture'],
    detail: 'v3.x Ecosystem'
  },
  {
    title: 'Logic Engine',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 0L1.5 5.25v13.5L12 24l10.5-5.25v-13.5L12 0zm0 18L4.5 14.25v-4.5L12 13.5l7.5-3.75v4.5L12 18z" fill="#027DFD"/>
        <path d="M12 13.5l7.5-3.75L12 6L4.5 9.75L12 13.5z" fill="#44D9E8"/>
      </svg>
    ),
    color: '#027DFD',
    skills: ['BLoC / Cubit', 'Riverpod', 'State Hooks', 'Reactive Flows'],
    detail: 'Enterprise Logic'
  },
  {
    title: 'Data Systems',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M5.43 14.38a.75.75 0 0 1-.72-.94l2.12-8.5a.75.75 0 0 1 1.45.1l1.58 6.42 1.44-5.78a.75.75 0 0 1 1.45.1l1.44 5.78 1.58-6.42a.75.75 0 0 1 1.45.1l2.12 8.5a.75.75 0 0 1-1.45.36l-1.84-7.36-1.44 5.78a.75.75 0 0 1-1.45.1l-1.44-5.78-1.58 6.42a.75.75 0 0 1-1.45.1l-1.84-7.36-1.44 5.78a.75.75 0 0 1-.72.58z" fill="#FFCA28"/>
        <path d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24z" fill="#FFA000" fillOpacity=".1"/>
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zM3.4 17.4L12 22l8.6-4.6L12 2 3.4 17.4z" fill="#FFCA28" fillOpacity=".2"/>
      </svg>
    ),
    color: '#F97316',
    skills: ['Firebase / Supabase', 'Hive / SQLite', 'REST / GraphQL', 'PostgeSQL'],
    detail: 'Real-time Persistence'
  },
  {
    title: 'Native Android',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M1.3 24l11.3-11.5L24 24z" fill="#027DFD"/>
        <path d="M0 0h12L0 12.5z" fill="#7C3AED"/>
        <path d="M13.4 0L0 14v10l12-12L24 0z" fill="#F97316"/>
      </svg>
    ),
    color: '#10B981',
    skills: ['Kotlin Core', 'Jetpack Compose', 'Platform Bridges', 'Java Legacy'],
    detail: 'Android Framework'
  },
]

export default function Skills() {
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null)

  return (
    <section id="skills" className="py-40 px-6 bg-[#0A0A0F] relative overflow-hidden">
      {/* Dynamic Energy Grid */}
      <div className="absolute inset-x-0 top-0 h-full w-full -z-10 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#44D9E8 1px, transparent 1px), linear-gradient(90deg, #44D9E8 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
      }} />
      
      {/* Cinematic Glows */}
      <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-[-10%] w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-6 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em]"
            >
              <CircuitBoard size={14} />
              Technical Ecosystem
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
              Hardware-Level <br/>
              <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Engineering.</span>
            </h2>
          </div>
          <p className="text-white/40 text-xl font-light leading-relaxed max-w-sm border-l-2 border-accent-cyan/20 pl-8 pb-2">
            A battle-tested set of technologies designed for performance, stability, and extreme scale.
          </p>
        </div>

        {/* BENTO DASHBOARD REDESIGN */}
        <div className="grid lg:grid-cols-12 gap-6 mb-24">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredGroup(idx)}
              onMouseLeave={() => setHoveredGroup(null)}
              className={`
                relative p-10 rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden group
                ${idx === 0 ? 'lg:col-span-12 xl:col-span-7' : 'lg:col-span-6 xl:col-span-5'}
                ${idx === 1 ? 'xl:col-span-5' : ''}
                transition-all duration-700 hover:bg-white/[0.07]
              `}
            >
              {/* Active Background FX */}
              <AnimatePresence>
                {hoveredGroup === idx && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 z-0"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full" style={{ backgroundColor: `${group.color}20` }} />
                    <div className="absolute bottom-0 left-0 w-64 h-64 blur-[100px] rounded-full" style={{ backgroundColor: `${group.color}10` }} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 h-full flex flex-col gap-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-cyan/30 group-hover:bg-accent-cyan/10 transition-all duration-500 shadow-2xl">
                      <div style={{ color: group.color }}>{group.icon}</div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-3xl font-black text-white group-hover:tracking-wider transition-all duration-500">{group.title}</h3>
                      <p className="text-[10px] font-black text-accent-cyan uppercase tracking-[0.3em] opacity-60">{group.detail}</p>
                    </div>
                  </div>
                  <Binary className="text-white/5 group-hover:text-accent-cyan/20 transition-colors" size={60} />
                </div>

                <div className="flex flex-wrap gap-4">
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-black text-white/50 hover:text-white hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all cursor-default flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(68,217,232,1)]" />
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hardware Decor */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none scale-[2.5]">
                {group.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* REFINED CORE SECTION */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-6">
              <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Engineering <br/>
                <span className="text-accent-cyan italic">Philosophy.</span>
              </h3>
              <p className="text-white/40 text-xl font-light leading-relaxed">
                Hardware-accelerated performance, pixel-perfect layouts, and robust reactive state architectures.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { label: 'Clean Architecture', val: '100%', icon: <CheckCircle2 size={16}/> },
                { label: 'State Management', val: 'BLoC/Riverpod', icon: <Cpu size={16}/> },
                { label: 'Performance Score', val: '99+', icon: <Zap size={16}/> }
              ].map((m) => (
                <div key={m.label} className="p-6 rounded-[2rem] bg-white/5 border border-white/10 flex justify-between items-center group hover:bg-white/10 transition-all cursor-default">
                  <div className="flex items-center gap-4 text-white/40 group-hover:text-accent-cyan transition-colors">
                    {m.icon}
                    <span className="text-xs font-black uppercase tracking-widest">{m.label}</span>
                  </div>
                  <span className="text-lg font-black text-white">{m.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7"
          >
            <div className="rounded-[4rem] bg-[#0F0F1D] border border-white/10 shadow-[0_50px_150px_rgba(0,0,0,0.7)] p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                <Terminal size={300} className="text-accent-cyan" />
              </div>

              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase text-white/40 tracking-widest">
                    <Binary size={12} className="text-accent-cyan" />
                    production_core.dart
                  </div>
                </div>

                <div className="space-y-4 font-mono text-[16px] leading-[1.8]">
                  <p className="text-accent-cyan/60 italic">// Reactive Architecture Engine</p>
                  <div className="text-white/80 space-y-2">
                    <p><span className="text-accent-purple font-bold">void</span> <span className="text-accent-cyan">deploySuccess</span>() {'{'}</p>
                    <p className="pl-6">while (<span className="text-accent-blue font-bold">stillDeveloping</span>) {'{'}</p>
                    <p className="pl-12 opacity-60">optimizeLogic();</p>
                    <p className="pl-12 opacity-60">refactorWithGrit();</p>
                    <p className="pl-6">{'}'}</p>
                    <p>{'}'}</p>
                  </div>
                  <div className="inline-block px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs font-bold rounded-lg animate-pulse">
                    COMPILATION SUCCESSFUL
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
