'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Code2, Cpu, Database, Layout, Smartphone, Terminal, Zap, CheckCircle2, Binary, CircuitBoard, Activity, RotateCw } from 'lucide-react'

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
  const [snippetIndex, setSnippetIndex] = useState(0)

  const snippets = [
    (
          <div key="s1" className="space-y-4">
        <div className="space-y-1">
          <p className="text-white/20 italic">// Clean Architecture: Dependency Layer</p>
          <p className="text-white/80 font-bold"><span className="text-accent-purple">class</span> <span className="text-accent-cyan">ProjectRepository</span> {'{'}</p>
        </div>
        <div className="pl-8 space-y-2 border-l border-white/5">
          <p className="text-white/40 italic">// Domain-driven decoupled logic</p>
          <p className="text-white/80"><span className="text-accent-purple font-bold">final</span> <span className="text-accent-blue">RemoteDataSource</span> _source;</p>
          <p className="text-white/80"><span className="text-accent-cyan">ProjectRepository</span>(<span className="text-accent-purple font-bold">this</span>._source);</p>
          <p className="text-white/80"><span className="text-accent-blue font-bold">Future</span>&lt;<span className="text-accent-cyan">Data</span>&gt; <span className="text-accent-cyan">fetch</span>() =&gt; _source.<span className="text-accent-cyan">call</span>();</p>
        </div>
        <p className="text-white/80">{'}'}</p>
      </div>
    ),
    (
      <div key="s2" className="space-y-4">
        <div className="space-y-1">
          <p className="text-white/20 italic">// State Orchestration: Reactive BLoC</p>
          <p className="text-white/80 font-bold"><span className="text-accent-purple">class</span> <span className="text-accent-cyan">CoreEngine</span> <span className="text-accent-purple">extends</span> <span className="text-accent-blue">Bloc</span> {'{'}</p>
        </div>
        <div className="pl-8 space-y-2 border-l border-white/5">
          <p className="text-white/80"><span className="text-accent-cyan">CoreEngine</span>() : <span className="text-accent-purple font-bold">super</span>(<span className="text-accent-cyan">Initial</span>()) {'{'}</p>
          <p className="pl-8 text-white/80">on&lt;<span className="text-accent-cyan">Trigger</span>&gt;((event, emit) {'{'}</p>
          <p className="pl-16 text-white/80">emit(<span className="text-accent-cyan">Success</span>(data: event.payload));</p>
          <p className="pl-8 text-white/80">{'}'});</p>
          <p className="text-white/80">{'}'}</p>
        </div>
        <p className="text-white/80">{'}'}</p>
      </div>
    ),
    (
      <div key="s3" className="space-y-4">
        <div className="space-y-1">
          <p className="text-white/20 italic">// Performance: Hardware Acceleration</p>
          <p className="text-white/80 font-bold"><span className="text-accent-purple">Widget</span> <span className="text-accent-cyan">build</span>(<span className="text-accent-blue">BuildContext</span> context) {'{'}</p>
        </div>
        <div className="pl-8 space-y-2 border-l border-white/5">
          <p className="text-white/80"><span className="text-accent-purple font-bold">return</span> <span className="text-accent-cyan">RepaintBoundary</span>(</p>
          <p className="pl-8 text-white/80">child: <span className="text-accent-cyan">ExpensiveSurface</span>(</p>
          <p className="pl-16 text-white/80">isOptimized: <span className="text-accent-purple font-bold">true</span>,</p>
          <p className="pl-16 text-white/80">targetFps: <span className="text-accent-blue font-bold">120.0</span>,</p>
          <p className="pl-8 text-white/80">),</p>
          <p className="text-white/80">);</p>
        </div>
        <p className="text-white/80">{'}'}</p>
      </div>
    )
  ]

  // Removed automatic interval per user request
  useEffect(() => {
    // Persistent static state, only updates on manual trigger
  }, [])

  return (
    <section id="skills" className="py-32 px-6 bg-[#08080C] relative overflow-hidden">
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
                min-h-[420px] h-full
                ${idx === 0 ? 'lg:col-span-8' : ''}
                ${idx === 1 ? 'lg:col-span-4' : ''}
                ${idx === 2 ? 'lg:col-span-4' : ''}
                ${idx === 3 ? 'lg:col-span-8' : ''}
                ${idx === 4 ? 'lg:col-span-6' : ''}
                ${idx === 5 ? 'lg:col-span-6' : ''}
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

        {/* REFINED PHILOSOPHY SECTION REDESIGN */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="bg-white/5 border border-white/10 rounded-[4rem] p-10 flex flex-col space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-accent-cyan text-[10px] font-black uppercase tracking-widest">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
                   Core Principles
                </div>
                <h3 className="text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter">
                  Engineering <br/>
                  <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Philosophy.</span>
                </h3>
                <p className="text-white/40 text-lg font-light leading-relaxed border-l-2 border-white/5 pl-8 italic">
                  "I don't just write code; I architect resilient digital ecosystems where performance is a feature, not an afterthought."
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  { label: 'CLEAN ARCHITECTURE', val: 'MISSION CRITICAL', icon: <CheckCircle2 size={18}/>, color: '#027DFD' },
                  { label: 'STATE ORCHESTRATION', val: 'FLAWLESS REACTIVITY', icon: <Cpu size={18}/>, color: '#44D9E8' },
                  { label: 'PERFORMANCE SCORE', val: '99+ OPTIMIZED', icon: <Zap size={18}/>, color: '#10B981' }
                ].map((m, i) => (
                  <motion.div 
                    key={m.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    onMouseEnter={() => setSnippetIndex(i)}
                    className={`relative p-5 rounded-[2rem] border transition-all duration-500 group overflow-hidden cursor-pointer ${snippetIndex === i ? 'bg-white/10 border-accent-cyan/50 shadow-[0_0_30px_rgba(68,217,232,0.1)]' : 'bg-white/5 border-white/10'}`}
                  >
                    <div className={`absolute inset-y-0 left-0 w-1 transition-all duration-500 ${snippetIndex === i ? 'bg-accent-cyan w-1.5' : 'bg-white/20'}`} />
                    <div className="flex justify-between items-center relative z-10">
                      <div className={`flex items-center gap-5 transition-colors ${snippetIndex === i ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                        <div className={`p-2.5 rounded-xl border transition-all duration-500 ${snippetIndex === i ? 'bg-accent-cyan/20 border-accent-cyan/40 scale-110 shadow-lg' : 'bg-white/5 border-white/10'}`} style={{ color: snippetIndex === i ? '#44D9E8' : m.color }}>
                          {m.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{m.label}</span>
                      </div>
                      <span className={`text-xs font-black italic transition-opacity ${snippetIndex === i ? 'text-accent-cyan opacity-100' : 'text-white opacity-40 group-hover:opacity-100'}`}>{m.val}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2 }}
            className="lg:col-span-7"
          >
            <div className="rounded-[4rem] bg-[#0A0A0F] border border-white/10 shadow-[0_50px_150px_rgba(0,0,0,0.8)] p-1 w-full group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               
               <div className="bg-[#0D0D15] rounded-[3.8rem] p-10 relative z-10 border border-white/5">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-2.5 items-center">
                      <div 
                        onClick={() => setSnippetIndex((prev) => (prev + 1) % snippets.length)}
                        className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.3)] cursor-pointer hover:scale-110 transition-all active:scale-95" 
                      />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.3)]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.3)] mr-2" />
                    </div>
                    <div className="flex items-center gap-4 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">
                      <Terminal size={14} className="text-accent-cyan" />
                      developer_brain_dump.dart
                      <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                    </div>
                 </div>

                 <div className="min-h-[280px] relative">
                   <AnimatePresence mode="wait">
                     <motion.div
                       key={snippetIndex}
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -15 }}
                       transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                       className="space-y-6 font-mono text-[14px] md:text-[16px] leading-[1.8] absolute inset-0"
                     >
                       {snippets[snippetIndex]}
                     </motion.div>
                   </AnimatePresence>
                 </div>

                <div className="absolute bottom-12 left-12 right-12 pt-6 border-t border-white/5 bg-[#0D0D15]/95 backdrop-blur-md z-30">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9, y: 10 }}
                     whileInView={{ opacity: 1, scale: 1, y: 0 }}
                     className="inline-flex items-center gap-3 px-6 py-3 bg-accent-cyan/10 border border-accent-cyan/40 text-accent-cyan text-[11px] font-black rounded-2xl relative overflow-hidden group/badge shadow-[0_0_20px_rgba(68,217,232,0.1)]"
                   >
                     {/* Breathing Glow Overlay */}
                     <div className="absolute inset-0 bg-accent-cyan/5 animate-pulse" />
                     
                     <span className="relative z-10 flex items-center gap-2 tracking-widest">
                        <Activity size={14} className="animate-pulse text-accent-cyan" />
                        OPTIMIZATION_SUCCESSFUL (REFRESH)
                     </span>

                     {/* High-Performance Scan Line */}
                     <motion.div 
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] z-20 pointer-events-none"
                     />
                   </motion.div>
                </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </section>
  )
}
