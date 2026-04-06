'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './magnetic'



export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-background/70 backdrop-blur-xl border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Magnetic strength={0.3}>
          <a href="#" className="text-2xl font-bold bg-gradient-to-r from-accent-cyan to-accent-blue bg-clip-text text-transparent block">
            JR
          </a>
        </Magnetic>


        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              className="text-muted hover:text-accent-cyan transition-colors text-sm font-medium relative group"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg bg-accent-blue hover:bg-accent-blue/80 text-foreground transition-all text-sm font-semibold hover:scale-105 active:scale-95 relative overflow-hidden group"
          >
            <span className="relative z-10">Get in Touch</span>
            <div className="absolute inset-0 bg-accent-cyan/30 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-2xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-12 flex flex-col items-center gap-8 text-center">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="text-2xl font-black text-white hover:text-accent-cyan transition-colors tracking-tighter"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1, duration: 0.5 }}
                className="w-full max-w-[280px] px-8 py-5 rounded-2xl bg-accent-blue text-white font-black uppercase tracking-widest text-center"
                onClick={() => setIsOpen(false)}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  )
}
