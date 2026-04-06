'use client'

import { useState } from 'react'
import { Mail, Linkedin, Github, Twitter, Copy, Check, Send } from 'lucide-react'
import FadeIn from './fade-in'
import TextReveal from './text-reveal'
import Magnetic from './magnetic'


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })

    // Trigger confetti-like effect
    triggerSuccessAnimation()

    setTimeout(() => setSubmitted(false), 3000)
  }

  const triggerSuccessAnimation = () => {
    // Create success particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.innerHTML = '✨'
      particle.style.position = 'fixed'
      particle.style.left = Math.random() * window.innerWidth + 'px'
      particle.style.top = '50%'
      particle.style.fontSize = Math.random() * 10 + 20 + 'px'
      particle.style.zIndex = '9999'
      particle.style.pointerEvents = 'none'
      particle.style.opacity = '1'
      document.body.appendChild(particle)

      const duration = Math.random() * 1 + 1.5
      particle.animate(
        [
          { transform: 'translateY(0) scale(1)', opacity: 1 },
          {
            transform: `translateY(-${Math.random() * 200 + 100}px) scale(0)`,
            opacity: 0,
          },
        ],
        { duration: duration * 1000, easing: 'ease-out' }
      )

      setTimeout(() => particle.remove(), duration * 1000)
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText('javiyaraj4@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-background via-card/10 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        <FadeIn className="flex flex-col items-center text-center mb-16" direction="up" blur scale={0.95}>
          <Magnetic>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md mb-8">
              Transmission Link
            </div>
          </Magnetic>
          <TextReveal
            text="Let's Build Something Extraordinary."
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white text-balance tracking-tighter"
          />

          <p className="text-base sm:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
            Whether you have an app idea, need technical consulting, or want to collaborate on open-source, I&apos;m all ears.
          </p>
        </FadeIn>



        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Form */}
          <FadeIn direction="right" delay={0.2} blur scale={0.98}>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.08]">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-white/60 text-[10px] font-black uppercase tracking-widest mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-medium"
                      placeholder="Javiya Raj"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/60 text-[10px] font-black uppercase tracking-widest mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all font-medium"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/60 text-[10px] font-black uppercase tracking-widest mb-3">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/20 transition-all resize-none font-medium"
                      placeholder="Tell me about your vision..."
                    />
                  </div>
                </div>

                <Magnetic strength={0.1} className="w-full">
                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full mt-10 px-8 py-5 rounded-2xl bg-gradient-to-r from-accent-blue via-accent-cyan to-white bg-[length:200%_auto] hover:bg-right text-[#0A0A0F] font-black uppercase tracking-widest transition-all duration-700 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group relative overflow-hidden shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                    <span className="relative z-10">{submitted ? 'Transmission Received!' : 'Submit'}</span>
                  </button>
                </Magnetic>

              </div>
            </form>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn direction="left" delay={0.3} blur scale={0.98} className="flex flex-col gap-10 sm:gap-12">

            <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">Get in <span className="text-accent-blue italic">Touch.</span></h3>
              <p className="text-white/40 text-base sm:text-lg leading-relaxed font-light max-w-md lg:border-l border-white/10 lg:pl-6">
                Ready to architect your next high-performance mobile ecosystem. I typically respond within one business cycle.
              </p>
            </div>

            {/* Email - Enhanced */}
            <div
              className="p-4 sm:p-6 rounded-[2rem] border border-white/10 bg-white/5 hover:border-accent-cyan/40 hover:bg-white/[0.08] transition-all duration-500 group cursor-pointer relative overflow-hidden"
              onClick={copyEmail}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 flex items-center justify-center text-accent-blue group-hover:scale-110 group-hover:bg-accent-blue/20 transition-all duration-500 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-1">Direct Communication</p>
                  <p className="text-sm sm:text-lg text-white font-black group-hover:text-accent-cyan transition-colors truncate">
                    javiyaraj4@gmail.com
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-accent-cyan group-hover:bg-accent-cyan/10 transition-all">
                  {copiedEmail ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </div>
              </div>
            </div>

            {/* Social Links - Enhanced */}
            <div className="space-y-6 flex flex-col items-center lg:items-start">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Network Protocols</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {[
                  { icon: Github, label: 'GitHub', url: 'https://github.com/JAVIYARAJ' },
                  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/javiyaraj/' },
                  { icon: Twitter, label: 'Twitter', url: 'https://x.com/Rjcoding' },

                ].map(({ icon: Icon, label, url }) => (
                  <Magnetic key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-accent-cyan hover:border-accent-cyan/40 hover:bg-accent-cyan/5 transition-all group"
                    >
                      <Icon size={22} className="group-hover:rotate-12 transition-transform" />
                    </a>
                  </Magnetic>
                ))}
              </div>

            </div>

            {/* Availability */}
            <div className="p-4 sm:p-6 rounded-[2rem] bg-accent-cyan/[0.03] border border-accent-cyan/20 group hover:bg-accent-cyan/[0.06] transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="relative">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-accent-cyan text-sm font-black uppercase tracking-widest leading-none">Operational Status</p>
                  <p className="text-xs text-white/30 font-light mt-1">Currently work on personal projects</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
