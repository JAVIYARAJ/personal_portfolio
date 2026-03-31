'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-accent-cyan to-accent-blue bg-clip-text text-transparent hover:scale-110 transition-transform">
          JR
        </a>

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
      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-glass-border animate-slideDown">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted hover:text-accent-cyan transition-colors text-sm font-medium py-2 px-2 rounded hover:bg-accent-blue/10"
                onClick={() => setIsOpen(false)}
                style={{ animation: isOpen ? `slideIn 0.3s ease-out ${idx * 0.05}s forwards` : 'none' }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-4 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-cyan text-foreground transition-all text-sm font-semibold hover:scale-105 mt-2"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  )
}
