import { motion } from 'framer-motion'
import { Zap, Cpu, Layers, ShieldCheck, Smartphone, Activity, Code } from 'lucide-react'

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

      <div className="max-w-7xl mx-auto space-y-32">
        {/* Header Section: Professional Vision */}
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-20px" }}
           variants={containerVariants}
           className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 text-center md:text-left"
        >
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
              <Cpu size={14} className="animate-pulse" />
              Professional Vision
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
              Modern <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Architecture.</span>
            </h2>
          </div>
          <p className="text-white/40 text-base sm:text-xl font-light leading-relaxed max-w-md md:border-l-2 border-accent-cyan/20 md:pl-8 text-center md:text-left">
            I believe in building software that is as beautiful under the hood as it is on the surface. My approach centers on modularity, testability, and deterministic state management.
          </p>
        </motion.div>

        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-20px" }}
           variants={containerVariants}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { title: 'Performance Optimization', desc: 'Maximizing frame rates and minimizing resource overhead.', icon: <Zap size={32} />, color: 'text-yellow-400' },
            { title: 'Clean Architecture', desc: 'Separating concerns for maintainable and scalable codebases.', icon: <ShieldCheck size={32} />, color: 'text-blue-400' },
            { title: 'Cross-Platform Mastery', desc: 'Seamlessly targets iOS, Android, and Web with zero compromise.', icon: <Smartphone size={32} />, color: 'text-accent-cyan' },
            { title: 'CI/CD Automation', desc: 'Robust deployment pipelines for reliable app deliveries.', icon: <Activity size={32} />, color: 'text-purple-400' }
          ].map((feature, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5 group hover:bg-white/[0.06] hover:border-white/10 transition-all duration-700 flex flex-col gap-8 relative overflow-hidden h-full shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center ${feature.color} transition-all duration-700 group-hover:scale-110 group-hover:bg-white/10 relative z-10`}>
                {feature.icon}
              </div>
              <div className="space-y-4 relative z-10">
                <h4 className="text-2xl font-black text-white tracking-tighter leading-tight">{feature.title}</h4>
                <p className="text-[15px] text-white/40 font-light leading-relaxed group-hover:text-white/60 transition-colors">{feature.desc}</p>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:w-full transition-all duration-1000`} />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
