'use client'

import { Github, Star, GitBranch, Terminal } from 'lucide-react'

const repositories = [
  {
    name: 'split_ease',
    description: 'A comprehensive expense management engine facilitating group orchestration, peer invitations, and automated split synchronization. Features multi-tier role management (Owner, Admin, Member) with granular permission control.',
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

import FadeIn from './fade-in'
import TextReveal from './text-reveal'
import Magnetic from './magnetic'


export default function OpenSource() {
  return (
    <section className="py-32 px-6 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8 items-center text-center lg:items-start lg:text-left" direction="none" blur scale={0.98}>
          <div className="space-y-4 flex flex-col items-center lg:items-start">

            <Magnetic>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                Recent Repositories
              </div>
            </Magnetic>
            <TextReveal
              text="Digital Foundations."
              className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter"
            />

            <p className="text-xl text-white/40 max-w-xl font-light leading-relaxed">
              Curated architectural modules and production-grade repositories designed for scalability.
            </p>
          </div>

          
          <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-accent-cyan">34+</span>
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-black">Repositories</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-accent-blue">8k+</span>
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-black">Code Commits</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn staggerChildren={0.15} direction="up" className="grid md:grid-cols-2 gap-8 mb-16">
          {repositories.map((repo, idx) => (
            <div key={repo.name}>
              <a
                href={repo.url}
                className="p-10 rounded-[32px] bg-white/5 border border-white/10 hover:border-accent-cyan/50 hover:bg-white/[0.07] transition-all duration-300 group relative overflow-hidden h-full block"
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
            </div>
          ))}
        </FadeIn>

        <FadeIn className="text-center mt-12" direction="up" blur scale={0.98}>

          <a
            href="https://github.com/JAVIYARAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-foreground font-bold transition-all hover:scale-[1.02] active:scale-95 group"
          >
            <Github size={20} className="text-accent-cyan" />
            <span>Follow my ecosystem on GitHub</span>
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
