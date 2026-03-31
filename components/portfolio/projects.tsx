'use client'

import { useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'ShopWave',
    description: 'Feature-rich e-commerce app with real-time inventory sync, secure payments, and AI-powered recommendations. 2M+ users, 4.8★ rating.',
    tags: ['Flutter', 'Firebase', 'Riverpod', 'Stripe'],
    accentColor: 'from-blue-500 to-blue-600',
    emoji: '🛍️',
    stats: { downloads: '2M+', rating: '4.8' },
    impact: 'Increased client sales by 300%',
  },
  {
    id: 2,
    name: 'MindMap AI',
    description: 'AI-powered journaling app that understands emotions and provides personalized insights. Uses OpenAI for emotion detection and pattern discovery.',
    tags: ['Flutter', 'OpenAI', 'Hive', 'Animations'],
    accentColor: 'from-purple-500 to-purple-600',
    emoji: '🧠',
    stats: { downloads: '500K+', rating: '4.9' },
    impact: 'Helped 100K+ users improve mental wellness',
  },
  {
    id: 3,
    name: 'GeoTrack',
    description: 'Real-time location tracking with geofencing, live notifications, and beautiful map visualization. Built for delivery and logistics companies.',
    tags: ['Flutter', 'Google Maps', 'WebSocket', 'BLoC'],
    accentColor: 'from-green-500 to-green-600',
    emoji: '🗺️',
    stats: { downloads: '1M+', rating: '4.7' },
    impact: 'Reduced delivery times by 25%',
  },
]

interface ProjectCardProps {
  project: (typeof projects)[0]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientY - rect.top - rect.height / 2) / 10
    const y = (e.clientX - rect.left - rect.width / 2) / 10 * -1

    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <div
      className="h-full rounded-2xl border border-glass-border bg-card hover:border-accent-cyan/50 overflow-hidden transition-all duration-300 group"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transitionProperty: 'transform, border-color, background-color',
        animation: `slideIn 0.6s ease-out ${index * 0.15}s forwards`,
        opacity: 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* Image placeholder with animated background */}
      <div
        className={`h-48 bg-gradient-to-br ${project.accentColor} flex flex-col items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
      >
        {/* Animated overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-end p-4">
            <p className="text-white text-sm font-semibold text-center">{project.impact}</p>
          </div>
        )}
        {project.emoji}
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">{project.name}</h3>
        
        {/* Stats row */}
        <div className="flex gap-6 mb-4 text-sm">
          <div>
            <p className="text-muted text-xs">Downloads</p>
            <p className="text-accent-cyan font-semibold">{project.stats?.downloads}</p>
          </div>
          <div>
            <p className="text-muted text-xs">Rating</p>
            <p className="text-accent-cyan font-semibold">⭐ {project.stats?.rating}</p>
          </div>
        </div>

        <p className="text-muted mb-6 leading-relaxed text-sm">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/30 text-accent-cyan text-xs font-semibold hover:bg-accent-blue/20 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="flex-1 px-4 py-2 rounded-lg bg-accent-blue hover:bg-accent-blue/80 text-foreground font-semibold transition-colors flex items-center justify-center gap-2 group/btn">
            <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            Case Study
          </button>
          <button className="flex-1 px-4 py-2 rounded-lg border border-accent-cyan/50 hover:bg-accent-cyan/10 text-accent-cyan font-semibold transition-colors flex items-center justify-center gap-2 group/btn">
            <Github size={18} className="group-hover/btn:scale-110 transition-transform" />
            Code
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-foreground tracking-tighter">
            Featured{' '}
            <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-muted text-lg max-w-2xl">
            Real-world applications used by millions. Each project showcases different aspects of modern Flutter development.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
