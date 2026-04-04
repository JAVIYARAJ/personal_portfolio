'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Code2, Cpu, Database, Layout, Smartphone, Terminal, Zap, CheckCircle2, Binary, CircuitBoard, Activity, RotateCw } from 'lucide-react'

const skillGroups = [
  {
    title: 'Framework Core',
    icon: (
      <svg width="24" height="24" viewBox="0 0 38 44" fill="none">
        <path d="M37.0631 20.0376H23.7056L12.0195 31.7265L18.6969 38.4038L37.0631 20.0376Z" fill="#54C5F8"/>
        <path d="M8.68014 28.3864L2 21.7063L23.7063 0H37.0638L8.68014 28.3864Z" fill="#54C5F8"/>
        <path d="M18.6975 38.4039L23.7062 43.4126H37.0637L25.3749 31.7266L18.6975 38.4039Z" fill="#01579B"/>
        <path d="M18.6966 25.0456L12.019 31.7231L18.6966 38.4007L25.3741 31.7231L18.6966 25.0456Z" fill="#29B6F6"/>
      </svg>
    ),
    color: '#44D9E8',
    skills: ['Flutter SDK', 'Dart', 'Modular Design', 'Clean Architecture','Solid principles'],
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
  {
    title: 'AI Intelligence',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#C084FC"/>
        <path d="M12 6v6l4 2" stroke="#C084FC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12L8 14" stroke="#C084FC" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: '#C084FC',
    skills: ['Claude', 'Antigravity', 'Cursor', 'Gemini', 'ChatGPT'],
    detail: 'Advanced Intelligence'
  },
  {
    title: 'Automation & DevOps',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="#F87171"/>
      </svg>
    ),
    color: '#F87171',
    skills: ['Shorebird (OTA)', 'Codemagic', 'Fastlane', 'GitHub Actions'],
    detail: 'Continuous Delivery'
  },
]

export default function Skills() {
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null)

  return (
    <section id="skills" className="py-32 px-6 bg-[#08080C] relative overflow-hidden">
      {/* ... Energy Grid & Glows ... */}
      <div className="absolute inset-x-0 top-0 h-full w-full -z-10 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#44D9E8 1px, transparent 1px), linear-gradient(90deg, #44D9E8 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
      }} />
      
      <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 left-[-10%] w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 gap-8 text-center md:text-left">
          <div className="space-y-6 max-w-2xl flex flex-col items-center md:items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em]"
            >
              <CircuitBoard size={14} />
              Technical Ecosystem
            </motion.div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
              Hardware-Level <br/>
              <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Engineering.</span>
            </h2>
          </div>
          <p className="text-white/40 text-base sm:text-xl font-light leading-relaxed max-w-sm md:border-l-2 border-accent-cyan/20 md:pl-8 pb-2">
            A battle-tested set of technologies designed for performance, stability, and extreme scale.
          </p>
        </div>

        {/* BENTO DASHBOARD: COMPACT HIGH-DENSITY GRID */}
        <div className="grid lg:grid-cols-12 gap-5">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onMouseEnter={() => setHoveredGroup(idx)}
              onMouseLeave={() => setHoveredGroup(null)}
              className={`
                relative p-6 sm:p-7 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden group
                min-h-[260px] sm:min-h-[280px] h-full flex flex-col justify-between
                col-span-1 md:col-span-6
                ${idx === 0 ? 'lg:col-span-8' : ''}
                ${idx === 1 ? 'lg:col-span-4' : ''}
                ${idx === 2 ? 'lg:col-span-4' : ''}
                ${idx === 3 ? 'lg:col-span-8' : ''}
                ${idx === 4 ? 'lg:col-span-6' : ''}
                ${idx === 5 ? 'lg:col-span-6' : ''}
                transition-all duration-500 hover:bg-white/[0.08]
              `}
            >
              {/* Active Background FX */}
              <AnimatePresence>
                {hoveredGroup === idx && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-0"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 blur-[80px] rounded-full" style={{ backgroundColor: `${group.color}15` }} />
                    <div className="absolute bottom-0 left-0 w-48 h-48 blur-[80px] rounded-full" style={{ backgroundColor: `${group.color}05` }} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent-cyan/30 group-hover:bg-accent-cyan/10 transition-all duration-500">
                      <div className="scale-75" style={{ color: group.color }}>{group.icon}</div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-white group-hover:text-accent-cyan transition-colors">{group.title}</h3>
                      <p className="text-[8px] font-black text-accent-cyan uppercase tracking-[0.2em] opacity-40">{group.detail}</p>
                    </div>
                  </div>
                  <Binary className="text-white/5 group-hover:text-accent-cyan/10 transition-colors" size={40} />
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-white/40 hover:text-white hover:border-accent-cyan/40 hover:bg-accent-cyan/5 transition-all cursor-default flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full bg-accent-cyan" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Decor */}
              <div className="absolute -bottom-6 -right-6 opacity-[0.01] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none scale-[2]">
                {group.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
