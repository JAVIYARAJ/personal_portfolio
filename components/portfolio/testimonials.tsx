'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ShieldCheck, ChevronLeft, ChevronRight, Cpu } from 'lucide-react'

const testimonials = [
  {
    quote:
      "Raj's ability to architect scalable solutions is unparalleled. He transformed our concept into a high-performance e-commerce engine that handles 10x our previous volume.",
    author: 'Sarah Johnson',
    role: 'CEO, ShopFlow Global',
    avatar: 'SJ',
    rating: 5,
    tag: 'SCALABLE ARCHITECTURE',
  },
  {
    quote:
      "Engineering velocity was our priority. Javiya delivered a flawless cross-platform experience using Flutter that outperformed our native benchmarks. Truly elite-tier work.",
    author: 'Michael Chen',
    role: 'VP of Engineering, NexaGate',
    avatar: 'MC',
    rating: 5,
    tag: 'FLUTTER OPTIMIZATION',
  },
  {
    quote:
      "Beyond just writing code, Raj understands the product vision. The clean architecture he implemented allowed our team to iterate 3x faster than ever before.",
    author: 'Emma Roberts',
    role: 'Product Director, TechLayer',
    avatar: 'ER',
    rating: 5,
    tag: 'CLEAN CODEBASE',
  },
  {
    quote:
      "The integration of complex financial APIs was handled with surgical precision. Javiya's work on our FinTech platform set a new internal benchmark for security and performance.",
    author: 'David Wright',
    role: 'CTO, FinEdge',
    avatar: 'DW',
    rating: 5,
    tag: 'FINTECH PRECISION',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const startTimer = () => {
    stopTimer()
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)
  }

  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, [])

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    startTimer()
  }

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    startTimer()
  }

  return (
    <section id="testimonials" className="py-24 px-6 bg-[#08080C] relative">
      {/* Backdrop Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(68,217,232,0.03),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl"
           >
             <ShieldCheck size={14} className="animate-pulse" />
             Verified Success Metrics
           </motion.div>
           
           <div className="space-y-4">
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
               Impactful <br/>
               <span className="bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-clip-text text-transparent italic">Partnerships.</span>
             </h2>
             <p className="text-white/30 text-lg max-w-xl mx-auto font-light leading-relaxed">
               Engineered solutions that redefine industry standards and drive exponential growth.
             </p>
           </div>
        </div>

        <div className="relative">
          {/* Floating Quote Decor - Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none">
            <Quote size={400} className="text-white fill-white" />
          </div>

          <div className="overflow-hidden relative z-10">
            <motion.div 
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex"
            >
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="w-full flex-shrink-0 flex justify-center px-4">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative p-10 md:p-12 max-w-2xl w-full rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-[0_30px_60px_rgba(0,0,0,0.3)] group overflow-hidden flex flex-col items-center text-center"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:opacity-[0.12] transition-opacity duration-700">
                       <Cpu size={80} className="text-accent-blue" />
                    </div>

                    <div className="relative z-10 space-y-8 w-full max-w-xl">
                      <div className="flex flex-col items-center gap-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-blue text-[10px] font-black uppercase tracking-widest shadow-inner">
                           <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
                           {testimonial.tag}
                        </div>
                        <div className="flex gap-1.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} fill="currentColor" className="text-accent-cyan drop-shadow-[0_0_10px_rgba(68,217,232,0.5)]" />
                          ))}
                        </div>
                      </div>

                      <blockquote className="text-xl md:text-2xl font-light text-white leading-relaxed tracking-tight italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>

                      <div className="flex flex-col items-center gap-5 pt-10 border-t border-white/10">
                        <div className="w-16 h-16 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center text-xl font-black text-white shadow-2xl group-hover:border-accent-cyan/50 transition-all duration-500">
                          {testimonial.avatar}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-2xl font-black text-white leading-none">{testimonial.author}</h4>
                          <p className="text-accent-cyan font-bold tracking-[0.3em] text-[10px] uppercase opacity-80">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Controls - Global-Safe Re-alignment */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-20 -mx-4 lg:-mx-12">
            <button 
              onClick={prev}
              className="p-4 md:p-6 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-accent-cyan hover:border-accent-cyan transition-all backdrop-blur-xl pointer-events-auto hover:scale-110 active:scale-95 group/btn"
            >
              <ChevronLeft size={28} className="group-hover/btn:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={next}
              className="p-4 md:p-6 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-accent-cyan hover:border-accent-cyan transition-all backdrop-blur-xl pointer-events-auto hover:scale-110 active:scale-95 group/btn"
            >
              <ChevronRight size={28} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-6 mt-12">
           {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); stopTimer(); startTimer(); }}
                className="group relative py-4 px-2 focus:outline-none"
              >
                <div className={`h-1.5 rounded-full transition-all duration-700 ${
                    activeIndex === i ? 'w-16 bg-accent-cyan shadow-[0_0_30px_rgba(68,217,232,0.8)]' : 'w-8 bg-white/10 group-hover:bg-white/30'
                }`} />
              </button>
           ))}
        </div>
      </div>
    </section>
  )
}
