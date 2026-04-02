'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Layers, Smartphone, BarChart3, Target } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: 'DYSHEZ',
    category: 'Logistics / Consumer',
    description: 'Developed a scalable food delivery app with an intuitive UX and Supabase-powered backend. Features include real-time order handling and a custom Rewards system.',
    tags: ['Flutter', 'Supabase', 'Real-time SDK', 'Clean Architecture', 'CI/CD', 'Sentry', 'Posthog', 'Clarity (Heatmap)'],
    color: '#F97316',
    icon: <Smartphone className="text-orange-500" />,
    stats: [ { label: 'Scale', val: '10K+' }, { label: 'Rating', val: '4.8' } ],
    impact: 'Engineered a 30% increase in repeat orders via modular loyalty logic.',
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
  },
  {
    id: 3,
    name: 'GOALS.COM',
    category: 'Native Android / CRM',
    description: 'High-scale CRM for goal tracking and incentive management. Reduced processing time by 25% through advanced async optimization and network caching.',
    tags: ['Kotlin', 'MVVM Architecture', 'Retrofit', 'Glide', 'Firebase', 'Enterprise SDK'],
    color: '#10B981',
    icon: <Target className="text-emerald-500" />,
    stats: [ { label: 'Speed', val: '+25%' }, { label: 'Growth', val: '30%' } ],
    impact: 'Optimized network layer resulting in 30% faster data availability.',
  },
]

interface ProjectCardProps {
  project: (typeof projects)[0]
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 overflow-hidden transition-all duration-700 hover:bg-white/[0.08]"
    >
      {/* Dynamic Background Glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full opacity-20" style={{ backgroundColor: project.color }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 blur-[100px] rounded-full opacity-10" style={{ backgroundColor: project.color }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full gap-8">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
               {project.icon}
            </div>
            <div>
               <p className="text-[10px] font-black tracking-[0.3em] uppercase text-accent-cyan opacity-60 mb-1">{project.category}</p>
               <h3 className="text-3xl font-black text-white group-hover:tracking-wider transition-all duration-700">{project.name}</h3>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
             {project.stats.map(s => (
               <div key={s.label}>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none">{s.label}</p>
                  <p className="text-xl font-bold text-white">{s.val}</p>
               </div>
             ))}
          </div>
        </div>

        <p className="text-white/40 text-lg font-light leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest group-hover:text-white group-hover:border-white/20 transition-all">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-10 flex items-center justify-between border-t border-white/5">
           <div className="flex gap-4">
              <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-accent-cyan transition-all">
                 <Github size={20} />
              </button>
              <button className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:border-accent-cyan transition-all">
                 <ExternalLink size={20} />
              </button>
           </div>
           
           <button className="flex items-center gap-3 text-[10px] font-black text-accent-cyan uppercase tracking-widest group/more">
              Engineering Impact
              <ArrowRight size={14} className="group-hover/more:translate-x-2 transition-transform" />
           </button>
        </div>
      </div>

      {/* Narrative Impact Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute inset-0 z-20 flex flex-col justify-end p-12 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"
          >
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-cyan/20 border border-accent-cyan/30 text-white text-[9px] font-black uppercase tracking-widest">
                  <Layers size={12}/>
                  Production Case Study
               </div>
               <p className="text-xl font-light text-white italic leading-relaxed">
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
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-6">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md"
            >
               Portfolio Showcase
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
               Featured <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Impact.</span>
            </h2>
          </div>
          <p className="text-white/40 text-xl font-light leading-relaxed max-w-sm border-l-2 border-accent-cyan/20 pl-8">
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
