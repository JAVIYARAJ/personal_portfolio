'use client'

import { useEffect, useRef, useState } from 'react'
import { Code2, Cpu, Database, Layout, Smartphone, Terminal, Zap } from 'lucide-react'

const skillGroups = [
  {
    title: 'Core Architecture',
    icon: <Cpu size={24} className="text-accent-cyan" />,
    skills: ['Flutter SDK', 'Dart (Sound Null Safety)', 'Business Logic (BLoC)', 'Riverpod (Provider)'],
    detail: 'v3.x / Cross-platform Engine'
  },
  {
    title: 'Data & Realtime',
    icon: <Database size={24} className="text-accent-blue" />,
    skills: ['Supabase (PostgreSQL)', 'Firebase (Firestore/Auth)', 'GraphQL / Apollo', 'REST / WebSockets'],
    detail: 'Scalable cloud infrastructure'
  },
  {
    title: 'Native Integration',
    icon: <Smartphone size={24} className="text-accent-purple" />,
    skills: ['Kotlin (Android Native)', 'Swift (iOS Native)', 'Platform Channels', 'FFI / C++ Bridges'],
    detail: 'Bridging the hardware gap'
  },
  {
    title: 'Automated Lifecycle',
    icon: <Zap size={24} className="text-accent-cyan" />,
    skills: ['Codemagic (CI/CD)', 'Sentry (Observability)', 'GitHub Actions', 'Shorebird (Patching)'],
    detail: 'Enterprise release engineering'
  },
]

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null)
  const [typedCode, setTypedCode] = useState('')
  const fullCode = `// Standard Reactive Architecture
class DataRepository {
  final _service = SupabaseService();
  
  Stream<List<Data>> watchData() {
    return _service.stream('metrics')
      .map((json) => Data.fromMap(json));
  }
}`

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTypedCode(fullCode.slice(0, index))
      index++
      if (index > fullCode.length) clearInterval(interval)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="skills" className="py-32 px-6 bg-[#0A0A0F] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-[800px] -z-10 bg-gradient-to-b from-accent-cyan/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
            Production Ready Stack
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Technical <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Toolkit.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-light leading-relaxed">
            A battle-tested set of technologies designed for performance, stability, and scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-32">
          {skillGroups.map((group, gIdx) => (
            <div
              key={group.title}
              onMouseEnter={() => setActiveGroup(gIdx)}
              onMouseLeave={() => setActiveGroup(null)}
              className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 hover:border-accent-cyan/30 transition-all duration-500 group relative overflow-hidden shadow-2xl flex flex-col gap-10"
              style={{
                animation: `fadeInUp 0.6s ease-out ${gIdx * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              {/* Animated Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex justify-between items-start relative z-10">
                 <div className="space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent-cyan/10 transition-all duration-500 shadow-inner">
                       {group.icon}
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-2xl font-black text-white group-hover:text-accent-cyan transition-colors">{group.title}</h3>
                       <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">{group.detail}</p>
                    </div>
                 </div>
                 <div className="text-[8px] font-mono text-white/10 group-hover:text-accent-cyan/40 transition-colors uppercase vertical-text tracking-widest pt-4">
                    Stable Release
                 </div>
              </div>

              <div className="flex flex-wrap gap-3 relative z-10">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={skill}
                    className="px-6 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-black text-white/60 hover:border-accent-cyan/50 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105 cursor-default flex items-center gap-2 group/skill"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan/20 group-hover/skill:bg-accent-cyan transition-all" />
                    {skill}
                  </div>
                ))}
              </div>

              {/* Decorative hardware corner */}
              <div className="absolute bottom-10 right-10 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity rotate-[-15deg] pointer-events-none origin-center transform scale-150">
                 {group.icon}
              </div>
            </div>
          ))}
        </div>

        {/* REFINED TERMINAL EXPERIENCE */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-12 xl:col-span-4 space-y-8">
              <div className="space-y-4">
                 <h3 className="text-4xl font-black text-white leading-tight">Code <span className="text-accent-cyan italic">Philosophy.</span></h3>
                 <p className="text-white/40 font-light leading-relaxed">
                    Writing clean, maintainable, and reactive code is at the heart of my development process. 
                    I prioritize asynchronous patterns and rigorous state management.
                 </p>
              </div>
              <div className="flex flex-col gap-4">
                 {[
                    { label: 'Clean Architecture', value: '100%' },
                    { label: 'Reactive Pattern', value: 'Enabled' },
                    { label: 'Unit Test Coverage', value: 'High' }
                 ].map((metric) => (
                    <div key={metric.label} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center group/metric hover:bg-white/10 transition-colors">
                       <span className="text-[11px] font-black text-white/40 uppercase tracking-widest group-hover/metric:text-white transition-colors">{metric.label}</span>
                       <span className="text-xs font-black text-accent-cyan group-hover/metric:scale-110 transition-transform">{metric.value}</span>
                    </div>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-12 xl:col-span-8">
              <div className="rounded-[3rem] bg-[#0F0F1A] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* IDE HEADER */}
                <div className="px-10 py-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-red-400/20 border border-red-400/40" />
                    <div className="w-3.5 h-3.5 rounded-full bg-yellow-400/20 border border-yellow-400/40" />
                    <div className="w-3.5 h-3.5 rounded-full bg-green-400/20 border border-green-400/40" />
                  </div>
                  <div className="flex items-center gap-2 text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Terminal size={12} className="text-accent-cyan" />
                    user_repository.dart
                  </div>
                  <div className="w-20" /> {/* Spacer */}
                </div>

                {/* IDE CONTENT */}
                <div className="p-12 font-mono text-[15px] leading-relaxed relative min-h-[300px]">
                   <div className="text-accent-cyan opacity-40 mb-4">// Production Grade Dart Implementation</div>
                   <pre className="text-white/80">
                      {typedCode}
                      <span className="inline-block w-2.5 h-5 bg-accent-cyan ml-1 animate-pulse" />
                   </pre>
                   
                   {/* Background hardware glow */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-blue/5 blur-[100px] pointer-events-none" />
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
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  )
}
