'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Cpu, ArrowUp, Globe, Terminal, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { name: 'Architecture', href: '#about' },
        { name: 'Prototypes', href: '#projects' },
        { name: 'Core Engine', href: '#skills' },
        { name: 'Stats', href: '#stats' },
      ]
    },
    {
      title: 'Expertise',
      links: [
        { name: 'Flutter Dev', href: '#' },
        { name: 'Clean Architecture', href: '#' },
        { name: 'Cross-Platform', href: '#' },
        { name: 'Performance Optimization', href: '#' },
      ]
    },
    {
      title: 'Contact',
      links: [
        { name: 'javiyaraj4@gmail.com', href: 'mailto:javiyaraj4@gmail.com?subject=Project Inquiry', icon: <Mail size={14} /> },
        { name: 'GitHub', href: 'https://github.com/JAVIYARAJ', icon: <Github size={14} /> },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/javiyaraj/', icon: <Linkedin size={14} /> },
      ]
    }
  ]

  return (
    <footer className="relative bg-[#050508] border-t border-white/5 pt-24 pb-12 overflow-hidden selection:bg-accent-cyan/30">
      {/* Background Accents */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-accent-blue/10 to-transparent pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">

          {/* Brand/Identity Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-accent-cyan transition-transform hover:scale-110">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tighter uppercase leading-none">JAVIYA RAJ.</h3>
                <p className="text-[10px] font-black text-accent-cyan tracking-[0.4em] uppercase mt-1">Flutter App Architect</p>
              </div>
            </div>

            <p className="text-sm text-white/40 leading-relaxed font-light max-w-xs">
              Specialized in high-performance cross-platform development since 2021.
              Specialized in high-performance cross-platform development with 3+ years of experience.
              Engineering scalable mobile ecosystems with Clean Architecture.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: <Github size={18} />, href: 'https://github.com/JAVIYARAJ' },
                { icon: <Linkedin size={18} />, href: 'https://linkedin.com/in/javiyaraj/' },
                { icon: <Twitter size={18} />, href: '#' },
                { icon: <Mail size={18} />, href: 'mailto:javiyaraj4@gmail.com?subject=Portfolio Inquiry' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-accent-cyan hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link: any, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        {link.icon && <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all">{link.icon}</span>}
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Metrics / System info removed as requested */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black text-white/15 uppercase tracking-widest">
            {/* Technical metrics removed */}
          </div>

          <div className="flex items-center gap-8">
            <p className="text-[11px] text-white/20 font-black tracking-tighter uppercase whitespace-nowrap">
              &copy; {currentYear} Developed by Raj Javiya
            </p>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all"
            >
              <span className="text-[10px] font-black uppercase text-white/30 group-hover:text-white transition-colors">Uplink</span>
              <ArrowUp size={14} className="text-accent-cyan group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
