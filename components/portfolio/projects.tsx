'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Layers, Smartphone, BarChart3, Target, Activity, Apple, Play } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'DYSHEZ',
    category: 'Logistics / Consumer',
    description: 'Developed a scalable food delivery app with an intuitive UX and Supabase-powered backend. Features include real-time order handling and a custom Rewards system.',
    tags: ['Flutter', 'Supabase', 'Real-time SDK', 'Clean Architecture', 'CI/CD', 'Sentry', 'Posthog', 'Clarity (Heatmap)'],
    color: '#F97316',
    icon: <Smartphone className="text-orange-500" />,
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/ef/05/79/ef05799b-bf3d-db54-943b-67951e75d071/Placeholder.mill/400x400bb-75.webp',
    stats: [ { label: 'Scale', val: '10K+' }, { label: 'Rating', val: '4.8' } ],
    impact: 'Engineered a 30% increase in repeat orders via modular loyalty logic.',
    appstore: 'https://apps.apple.com/in/app/dyshez/id6474236767',
    playstore: 'https://play.google.com/store/apps/details?id=com.dyshez.app',
  },
  {
    id: 2,
    name: 'SMACKDAB',
    category: 'Sales / Productivity',
    description: 'A dedicated productivity engine that boosted team efficiency by 40%. Engineered with high-performance custom calendar modules and reactive data flows.',
    tags: ['Flutter', 'Responsive Design', 'Modular UI', 'Complex Logic', 'Reactive Dart', 'Sales Intelligence'],
    color: '#027DFD',
    icon: <BarChart3 className="text-blue-500" />,
    stats: [ { label: 'Efficiency', val: '+40%' }, { label: 'Lift', val: '25%' } ],
    impact: 'Transformed sales workflow into a mobile-first intelligent engine.',
    playstore: '#',
  },
  {
    id: 3,
    name: 'GOALS.COM',
    category: 'Native Android / CRM',
    description: 'High-scale CRM for goal tracking and incentive management. Reduced processing time by 25% through advanced async optimization and network caching.',
    tags: ['Kotlin', 'MVVM Architecture', 'Retrofit', 'Glide', 'Firebase', 'Enterprise SDK'],
    color: '#10B981',
    icon: <Target className="text-emerald-500" />,
    image: 'https://www.goals.com/wp-content/uploads/2022/07/goals-logo.svg',
    stats: [ { label: 'Speed', val: '+25%' }, { label: 'Growth', val: '30%' } ],
    impact: 'Optimized network layer resulting in 30% faster data availability.',
    playstore: '#',
  },
]

interface ProjectCardProps {
  project: (typeof projects)[0]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // 3D Parallax Tilt Logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = (mouseX / width) - 0.5
    const yPct = (mouseY / height) - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className="group relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 overflow-hidden transition-all duration-700"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 flex flex-col h-full gap-6"
      >
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl overflow-hidden p-2" style={{ boxShadow: `0 10px 40px -10px ${project.color}30` }}>
               {(project as any).image ? (
                 <img src={(project as any).image} alt={project.name} className="w-full h-full object-contain" />
               ) : (
                 project.icon
               )}
            </div>
            <div>
               <div className="flex items-center gap-2 mb-1">
                 <div className="w-1 h-1 rounded-full bg-accent-cyan animate-pulse" />
                 <p className="text-[9px] font-black tracking-[0.2em] uppercase text-accent-cyan opacity-60">{project.category}</p>
               </div>
               <h3 className="text-2xl font-black text-white group-hover:tracking-wider transition-all duration-700">{project.name}</h3>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-3 text-right">
             {project.stats.map(s => (
               <div key={s.label} className="p-2 px-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-[8px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">{s.label}</p>
                  <p className="text-base font-bold text-white tracking-tight">{s.val}</p>
               </div>
             ))}
          </div>
        </div>

        <p className="text-white/40 text-base font-light leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-white/30 text-[9px] font-bold uppercase tracking-wider group-hover:text-accent-cyan group-hover:border-accent-cyan/20 transition-all">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/5 relative z-30">
          <div className="flex gap-4">
            {(project as any).github && (
              <a href={(project as any).github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center hover:text-white hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all shadow-lg pointer-events-auto" title="GitHub Codebase">
                <Github size={18} />
              </a>
            )}
            {(project as any).appstore && (
              <a href={(project as any).appstore} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center hover:text-white hover:border-white hover:bg-white/10 transition-all shadow-lg pointer-events-auto" title="Apple App Store">
                <Apple size={18} />
              </a>
            )}
            {(project as any).playstore && (project as any).playstore !== '#' && (
              <a href={(project as any).playstore} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center hover:text-white hover:border-[#10B981] hover:bg-[#10B981]/10 transition-all shadow-lg pointer-events-auto" title="Google Play Store">
                <Play size={18} fill="currentColor" strokeWidth={1} />
              </a>
            )}
            {(project as any).external && (
              <a href={(project as any).external} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center hover:text-white hover:border-accent-cyan hover:bg-accent-cyan/10 transition-all shadow-lg pointer-events-auto" title="Live Preview">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
          
          <button className="flex items-center gap-2 group/more pointer-events-auto">
            <span className="text-[9px] font-black text-accent-blue uppercase tracking-widest group-hover/more:text-accent-cyan transition-colors">Engineering Impact</span>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-accent-cyan group-hover/more:translate-x-1 transition-all">
              <ArrowRight size={12} />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Dynamic Background Pulse */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${project.color}15 0%, transparent 70%)`
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Laboratory Narrative Overlay: Repositioned for Clarity */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-x-0 bottom-28 z-20 p-8 py-10 bg-gradient-to-t from-[#0A0A0F]/80 to-transparent pointer-events-none backdrop-blur-sm"
          >
            <div className="space-y-3">
               <div className="flex items-center gap-2">
                  <Activity size={12} className="text-accent-cyan animate-pulse" />
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Production Validation</span>
               </div>
               <p className="text-sm font-light text-white italic leading-relaxed">
                 "{project.impact}"
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-40 px-6 bg-[#0B0B13] relative overflow-hidden">
      {/* Static Background Grid */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: '30px 30px'
      }} />

      <div className="max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-center md:items-end gap-10 text-center md:text-left">
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md"
            >
               Portfolio Showcase
            </motion.div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
               Featured <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Impact.</span>
            </h2>
          </div>
          <p className="text-white/40 text-base sm:text-xl font-light leading-relaxed max-w-sm md:border-l-2 border-accent-cyan/20 md:pl-8">
            Real-world applications engineered for performance, used by thousands of active users.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
