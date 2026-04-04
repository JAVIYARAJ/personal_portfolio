'use client'

import { useEffect, useState } from 'react'
import { Github, Star, GitBranch, Terminal } from 'lucide-react'

const repositories = [
  {
    name: 'flutter_secure_sync',
    description: 'High-performance offline-first synchronization engine for Flutter applications using Supabase.',
    stars: '420',
    url: '#',
    tech: 'FLUTTER / SUPABASE'
  },
  {
    name: 'dart_platform_bridge',
    description: 'Optimized Method Channel wrapper for seamless biometric and complex native permissions handling.',
    stars: '215',
    url: '#',
    tech: 'DART / KOTLIN'
  },
]

export default function OpenSource() {
  const [activities, setActivities] = useState<{ week: number; day: number; intensity: number }[]>([])

  useEffect(() => {
    const newActivities = []
    for (let week = 0; week < 52; week++) {
      for (let day = 0; day < 7; day++) {
        newActivities.push({
          week,
          day,
          intensity: Math.random(),
        })
      }
    }
    setActivities(newActivities)
  }, [])

  return (
    <section className="py-32 px-6 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
              Recent Repositories
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Digital <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Foundations.</span>
            </h2>
            <p className="text-xl text-white/40 max-w-xl font-light leading-relaxed">
              Curated architectural modules and production-grade repositories designed for scalability.
            </p>
          </div>
          
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-accent-cyan">24+</span>
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-black">Repositories</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-accent-blue">8k+</span>
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-black">Code Commits</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {repositories.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              className="p-10 rounded-[32px] bg-white/5 border border-white/10 hover:border-accent-cyan/50 hover:bg-white/[0.07] transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <GitBranch size={80} className="text-accent-cyan" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-2xl bg-accent-blue/10 text-accent-blue">
                    <Terminal size={24} />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Star size={16} className="text-accent-cyan" />
                    <span className="text-accent-cyan font-bold text-sm tracking-tight">{repo.stars}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-accent-cyan transition-colors">
                    {repo.name}
                  </h3>
                  <p className="text-xs text-accent-blue font-bold uppercase tracking-widest">{repo.tech}</p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {repo.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub Contribution Graph */}
        <div className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-10 bottom-0 w-64 bg-accent-cyan/5 blur-[80px] -z-10" />
          
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-accent-cyan/10 flex items-center justify-center">
              <Github size={28} className="text-accent-cyan" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Activity Pulse</h3>
              <p className="text-xs text-muted uppercase tracking-widest font-bold">Real-time developer velocity</p>
            </div>
          </div>

          <div className="overflow-x-auto pb-6 custom-scrollbar">
            <div className="flex gap-1.5 min-w-max">
              {Array.from({ length: 52 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1.5">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const activity = activities.find(a => a.week === weekIndex && a.day === dayIndex)
                    const intensity = activity ? activity.intensity : 0
                    
                    let color = 'bg-white/5'
                    if (intensity > 0.75) color = 'bg-accent-cyan shadow-[0_0_8px_rgba(68,217,232,0.6)]'
                    else if (intensity > 0.5) color = 'bg-accent-blue shadow-[0_0_8px_rgba(2,125,253,0.4)]'
                    else if (intensity > 0.25) color = 'bg-accent-blue/40'
                    else if (intensity > 0) color = 'bg-accent-blue/20'

                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-3.5 h-3.5 rounded-[3px] ${color} hover:ring-2 ring-white/30 transition-all cursor-pointer`}
                        title={`Activity Intensity: ${Math.round(intensity * 100)}%`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-muted-foreground">
              Total Contributions: <span className="text-white font-bold">2,481 this year</span>
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-tighter">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-[2px] bg-white/5" />
                <div className="w-3 h-3 rounded-[2px] bg-accent-blue/20" />
                <div className="w-3 h-3 rounded-[2px] bg-accent-blue/40" />
                <div className="w-3 h-3 rounded-[2px] bg-accent-blue" />
                <div className="w-3 h-3 rounded-[2px] bg-accent-cyan" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-foreground font-bold transition-all hover:scale-[1.02] active:scale-95 group"
          >
            <Github size={20} className="text-accent-cyan" />
            <span>Follow my ecosystem on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}
