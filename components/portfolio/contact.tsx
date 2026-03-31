'use client'

import { useState, useRef, useEffect } from 'react'
import { Mail, Linkedin, Github, Twitter, Copy, Check, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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
    navigator.clipboard.writeText('hello@javiyaraj.dev')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-background via-card/10 to-background relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fadeInUp' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground text-balance">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Whether you have an app idea, need technical consulting, or want to collaborate on open-source, I&apos;m all ears.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className={`space-y-6 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0.1s' }}>
            <div className="p-8 rounded-2xl border border-glass-border bg-card/50 backdrop-blur-sm">
              <div>
                <label htmlFor="name" className="block text-foreground font-semibold mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-glass-border text-foreground placeholder-muted focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                  placeholder="Javiya Raj"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="email" className="block text-foreground font-semibold mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-glass-border text-foreground placeholder-muted focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-foreground font-semibold mb-3">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-glass-border text-foreground placeholder-muted focus:outline-none focus:border-accent-cyan focus:ring-2 focus:ring-accent-cyan/20 transition-all resize-none"
                  placeholder="Tell me about your project, timeline, and vision..."
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full mt-8 px-6 py-4 rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan hover:from-accent-blue/80 hover:to-accent-cyan/80 disabled:from-green-600 disabled:to-green-600 text-foreground font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                {submitted ? 'Message Sent! 🎉' : 'Send Message'}
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className={`space-y-8 ${isVisible ? 'animate-fadeInUp' : ''}`} style={{ animationDelay: '0.2s' }}>
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h3>
              <p className="text-muted text-lg leading-relaxed">
                I check messages regularly and typically respond within 24 hours. Let&apos;s talk about building something amazing together.
              </p>
            </div>

            {/* Email - Enhanced */}
            <div
              className="p-6 rounded-xl border border-glass-border bg-card/50 hover:border-accent-cyan/80 hover:bg-accent-blue/10 transition-all duration-300 group cursor-pointer"
              onClick={copyEmail}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent-blue/20 group-hover:bg-accent-cyan/20 transition-colors">
                  <Mail className="text-accent-cyan" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted uppercase tracking-wider">Email</p>
                  <p className="text-lg text-foreground font-semibold group-hover:text-accent-cyan transition-colors font-mono">
                    hello@javiyaraj.dev
                  </p>
                </div>
                {copiedEmail ? (
                  <Check size={20} className="text-green-400 animate-bounce" />
                ) : (
                  <Copy size={20} className="text-muted group-hover:text-accent-cyan transition-colors" />
                )}
              </div>
            </div>

            {/* Social Links - Enhanced */}
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-4">Connect Online</p>
              <div className="flex gap-4">
                {[
                  { icon: Github, label: 'GitHub' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Twitter, label: 'Twitter' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="p-4 rounded-lg border border-glass-border hover:border-accent-cyan/80 hover:bg-accent-cyan/10 text-accent-cyan transition-all hover:scale-110 duration-300 group"
                    title={label}
                  >
                    <Icon size={24} className="group-hover:rotate-12 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/20 border border-accent-blue/30 hover:border-accent-cyan/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <div>
                  <p className="text-accent-cyan font-semibold">Currently Available</p>
                  <p className="text-sm text-muted">For new freelance & contract projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
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
    </section>
  )
}
