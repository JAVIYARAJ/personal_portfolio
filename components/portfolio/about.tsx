import { motion } from 'framer-motion'
import { Trophy, Code, Target, Zap, Cpu, Layers } from 'lucide-react'

const achievements = [
  {
    title: '20% Dev Speed',
    description: 'Reduced development time through modular architecture and automation.',
    icon: <Zap className="text-accent-cyan" />,
  },
  {
    title: '15% User Satisfaction.',
    description: 'Improved application performance and UI features contributing to higher satisfaction.',
    icon: <Trophy className="text-accent-blue" />,
  },
  {
    title: 'Clean Architecture',
    description: 'Maintain code quality and maintainability using standard clean architecture rules.',
    icon: <Code className="text-accent-purple" />,
  },
  {
    title: '30% Stability',
    description: 'Enhanced codebase maintainability and application stability during large-scale refactors.',
    icon: <Target className="text-accent-cyan" />,
  },
]

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <section id="about" className="py-24 sm:py-32 lg:py-40 px-6 relative overflow-hidden bg-[#0A0A0F]">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-[1000px] -z-10 bg-gradient-to-b from-accent-blue/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-accent-purple/5 rounded-full blur-[180px]" />

      <div className="max-w-7xl mx-auto space-y-40">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={containerVariants}
          className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start"
        >
          <motion.div
            variants={itemVariants}
            className="lg:col-span-12 xl:col-span-5 flex flex-col items-center text-center xl:items-start xl:text-left space-y-8"
          >
            <div className="space-y-6 flex flex-col items-center xl:items-start w-full">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                <Cpu size={14} className="animate-pulse" />
                Professional Vision
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter leading-none pb-2 break-words">
                Modern <br />
                <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic inline-block py-2">Flutter Architecture.</span>
              </h2>

                <div className="grid grid-cols-1 gap-3 w-full pt-4">
                  {[
                    { label: '3+ YEARS EXPERIENCE', sub: 'Production Flutter Ecosystems', icon: <Zap size={14} /> },
                    { label: 'STATE ORCHESTRATION', sub: 'BLoC, GetX & Riverpod Scalability', icon: <Layers size={14} /> },
                    { label: 'MODULAR SYSTEMS', sub: 'Clean Arch & Component Reuse', icon: <Zap size={14} /> }
                  ].map((param, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 group/param hover:bg-white/10 transition-all duration-500 overflow-hidden relative">
                       <div className="p-2 rounded-lg bg-accent-cyan/10 text-accent-cyan group-hover/param:scale-110 transition-transform">{param.icon}</div>
                       <div className="text-left">
                          <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">{param.label}</p>
                          <p className="text-[10px] text-white/30 font-light leading-none">{param.sub}</p>
                       </div>
                       <div className="absolute right-0 top-0 bottom-0 w-1 bg-accent-cyan/0 group-hover/param:bg-accent-cyan/50 transition-all" />
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>

          <div className="lg:col-span-12 xl:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-accent-cyan/30 transition-all duration-500 group relative overflow-hidden h-full flex flex-col"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent-cyan/10 transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white mb-2 leading-tight tracking-tight">{item.title}</h4>
                      <p className="text-[13px] text-white/40 leading-relaxed font-light">{item.description}</p>
                    </div>

                    <div className="mt-6 h-0.5 w-8 bg-white/10 rounded-full group-hover:w-16 group-hover:bg-accent-cyan transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
