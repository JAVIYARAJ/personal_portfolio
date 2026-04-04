'use client'

import { motion } from 'framer-motion'
import { Quote, Star, ShieldCheck, Cpu } from 'lucide-react'

const testimonials = [
  {
    quote:
      "Architected a high-performance e-commerce engine handling 10x previous volume with surgical precision.",
    author: 'Sarah Johnson',
    role: 'CEO, ShopFlow Global',
    avatar: 'SJ',
    metric: '10X',
    metricLabel: 'Scaling',
    tag: 'ARCHITECTURE',
  },
  {
    quote:
      "Delivered a flawless cross-platform Flutter experience that outperformed all native benchmarks.",
    author: 'Michael Chen',
    role: 'VP Engineering, NexaGate',
    avatar: 'MC',
    metric: '40%',
    metricLabel: 'Performance',
    tag: 'OPTIMIZATION',
  },
  {
    quote:
      "Implemented clean architecture that allowed our development team to iterate 3x faster than before.",
    author: 'Emma Roberts',
    role: 'Product Director, TechLayer',
    avatar: 'ER',
    metric: '3X',
    metricLabel: 'Velocity',
    tag: 'CLEAN CODE',
  },
  {
    quote:
      "Complex financial API integrations handled with unmatched security standards and performance.",
    author: 'David Wright',
    role: 'CTO, FinEdge',
    avatar: 'DW',
    metric: '99.9%',
    metricLabel: 'Reliability',
    tag: 'FINTECH',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-6 bg-[#08080C] relative overflow-hidden">
      {/* Backdrop Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(68,217,232,0.05),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-6">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl backdrop-blur-md"
           >
             <ShieldCheck size={14} className="animate-pulse" />
             Verified Success Metrics
           </motion.div>
           
           <div className="space-y-4">
             <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
               Performance <br/>
               <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Validated.</span>
             </h2>
             <p className="text-white/30 text-lg max-w-xl mx-auto font-light leading-relaxed">
               Quantifiable engineering impact validated by industry-leading product partners.
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl group overflow-hidden flex flex-col justify-between min-h-[400px] hover:bg-white/[0.05] transition-all duration-500"
            >
              {/* Card Decor */}
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none">
                 <Cpu size={120} className="text-accent-blue" />
              </div>

              {/* Top Section: Metrics */}
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-blue text-[9px] font-black uppercase tracking-widest">
                     <div className="w-1 h-1 rounded-full bg-accent-blue animate-pulse" />
                     {testimonial.tag}
                  </div>
                  <Quote size={20} className="text-white/10 group-hover:text-accent-cyan transition-colors" />
                </div>

                <div className="space-y-1">
                  <p className="text-4xl md:text-5xl font-black text-white tracking-tighter group-hover:text-accent-cyan transition-colors">
                    {testimonial.metric}
                  </p>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] pl-1">
                    {testimonial.metricLabel}
                  </p>
                </div>
              </div>

              {/* Middle Section: Quote */}
              <div className="relative z-10 pb-10">
                <p className="text-sm md:text-base font-light text-white/60 leading-relaxed italic border-l-2 border-white/5 pl-4 group-hover:text-white/90 transition-colors">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Section: Author */}
              <div className="pt-6 border-t border-white/5 flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-white group-hover:border-accent-cyan/30 transition-all duration-500 truncate px-1">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-black text-white group-hover:text-accent-cyan transition-colors">{testimonial.author}</h4>
                  <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Performance Validation Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 rounded-[2rem] bg-gradient-to-r from-accent-blue/10 via-transparent to-accent-cyan/10 border border-white/5 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-8 group"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan group-hover:scale-110 transition-transform">
               <Star size={24} fill="currentColor" />
            </div>
            <div>
               <h3 className="text-xl font-black text-white">Elite Engineering Benchmark</h3>
               <p className="text-white/40 text-sm font-light uppercase tracking-widest">Industry Scale Capacity: Unrestricted</p>
            </div>
          </div>
          <div className="flex gap-10 border-l border-white/10 pl-10">
             {[
               { label: 'RETENTION', val: '99%' },
               { label: 'SATISFACTION', val: '5/5' },
               { label: 'SLA', val: '< 24H' }
             ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-black text-white">{item.val}</p>
                  <p className="text-[10px] font-black text-white/20 tracking-tighter">{item.label}</p>
                </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

