'use client'

import { useEffect, useState, useRef } from 'react'
import { Quote, Star, Award, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Javiya Raj delivered exceptional work on our e-commerce app. His attention to detail and understanding of user experience made all the difference.',
    author: 'Sarah Johnson',
    role: 'CEO, ShopFlow Co',
    avatar: '👩‍💼',
    rating: 5,
    tag: 'Enterprise Retail',
  },
  {
    quote:
      'Working with Javiya Raj was transformative. He not only built our app but also improved our development processes and team capabilities.',
    author: 'Michael Chen',
    role: 'CTO, Digital Ventures',
    avatar: '👨‍💻',
    rating: 5,
    tag: 'FinTech Startup',
  },
  {
    quote:
      'The quality of code and responsiveness throughout the project was outstanding. Javiya Raj goes above and beyond on every deliverable.',
    author: 'Emma Roberts',
    role: 'Product Lead, TechFlow',
    avatar: '👩‍🔬',
    rating: 5,
    tag: 'Consumer Apps',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const startTimer = () => {
    stopTimer()
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
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
    <section id="testimonials" className="py-32 px-6 bg-[#0A0A0F] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-t from-accent-purple/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-purple text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
            <ShieldCheck size={14} className="text-accent-purple" />
            Verified Client Success
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Voices of <span className="bg-gradient-to-r from-accent-purple via-accent-blue to-accent-cyan bg-clip-text text-transparent italic">Innovation.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Collaborating with global leaders to build products that redefine industry standards.
          </p>
        </div>

        {/* PREMIUM CAROUSEL */}
        <div 
          className="relative group/carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden p-4">
            <div
              className="flex transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1)"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, tIdx) => (
                <div
                  key={tIdx}
                  className="w-full flex-shrink-0 px-2 flex justify-center"
                >
                   <div className="w-full max-w-2xl p-10 md:p-14 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl relative overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                      {/* Stylized Big Quote */}
                      <div className="absolute top-[-20px] left-[-20px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                         <Quote size={240} className="text-accent-blue" />
                      </div>

                      <div className="relative z-10 space-y-8">
                        <div className="flex gap-1.5">
                           {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" className="text-accent-cyan shadow-[0_0_10px_rgba(68,217,232,0.5)]" />
                           ))}
                        </div>

                        <blockquote className="text-lg md:text-2xl font-light text-white leading-relaxed italic tracking-tight">
                           &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6 border-t border-white/5">
                           <div className="flex items-center gap-5">
                              <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner group-hover:bg-accent-blue/10 transition-colors">
                                 {testimonial.avatar}
                              </div>
                              <div className="space-y-0.5">
                                 <h4 className="text-xl font-black text-white group-hover:text-accent-blue transition-colors">{testimonial.author}</h4>
                                 <p className="text-accent-blue font-bold tracking-widest text-[10px] uppercase opacity-70">{testimonial.role}</p>
                              </div>
                           </div>
                           
                           <div className="px-5 py-2 rounded-xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-[9px] font-black uppercase tracking-widest">
                              {testimonial.tag}
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={prev}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 p-5 rounded-full bg-[#0A0A0F] border border-white/10 text-white/40 hover:text-accent-cyan hover:border-accent-cyan transition-all hidden md:flex items-center justify-center focus:outline-none z-20 group/btn"
          >
            <ChevronLeft size={24} className="group-hover/btn:scale-125 transition-transform" />
          </button>
          <button 
            onClick={next}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 p-5 rounded-full bg-[#0A0A0F] border border-white/10 text-white/40 hover:text-accent-cyan hover:border-accent-cyan transition-all hidden md:flex items-center justify-center focus:outline-none z-20 group/btn"
          >
            <ChevronRight size={24} className="group-hover/btn:scale-125 transition-transform" />
          </button>
        </div>

        {/* PAGER INDICATORS */}
        <div className="flex justify-center gap-4 mt-16">
           {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); startTimer(); }}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                    activeIndex === i ? 'w-12 bg-accent-cyan shadow-[0_0_15px_rgba(68,217,232,0.8)]' : 'w-4 bg-white/10 hover:bg-white/30'
                }`}
              />
           ))}
        </div>
      </div>
    </section>
  )
}
