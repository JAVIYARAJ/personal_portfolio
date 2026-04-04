'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function BackgroundAmbience() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const [streams, setStreams] = useState<{ y: string, duration: number, delay: number }[]>([])

  useEffect(() => {
    // Generate static values for hydration stability
    const newStreams = [...Array(6)].map(() => ({
      y: Math.random() * 100 + '%',
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 20
    }))
    setStreams(newStreams)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-20 pointer-events-none overflow-hidden bg-[#050508]">
      {/* Dynamic Grid System */}
      <motion.div
        style={{
          y: backgroundY,
          backgroundImage: `
            linear-gradient(rgba(68, 217, 232, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(68, 217, 232, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
        className="absolute inset-0 opacity-20"
      />

      {/* Radial Gradient Follower */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(2, 125, 253, 0.05) 0%, transparent 60%)`
        }}
      />

      {/* Hardware Accents - Fixed */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[150px] opacity-10 animate-floatingSoft" />

      {/* Floating Data Streams */}
      <div className="absolute inset-0 opacity-10">
        {streams.map((stream, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, y: stream.y }}
            animate={{
              x: '110vw',
              transition: {
                duration: stream.duration,
                repeat: Infinity,
                ease: "linear",
                delay: stream.delay
              }
            }}
            className="h-px w-64 bg-gradient-to-r from-transparent via-accent-cyan to-transparent absolute"
          />
        ))}
      </div>

      {/* Circuit Trace Decor */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <defs>
          <pattern id="circuits" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 10 10 L 10 50 L 50 50 M 50 10 L 50 50 L 90 50 M 90 10 L 90 90 L 10 90" fill="none" stroke="#44D9E8" strokeWidth="0.5" />
            <circle cx="10" cy="10" r="1.5" fill="#44D9E8" />
            <circle cx="50" cy="10" r="1.5" fill="#44D9E8" />
            <circle cx="90" cy="10" r="1.5" fill="#44D9E8" />
            <circle cx="10" cy="90" r="1.5" fill="#44D9E8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuits)" />
      </svg>
    </div>
  )
}
