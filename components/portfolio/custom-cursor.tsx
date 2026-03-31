'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }

      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`
        ringRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    document.body.style.cursor = 'none'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed w-8 h-8 border border-accent-cyan/60 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 opacity-70"
        style={{
          boxShadow: '0 0 20px rgba(68, 217, 232, 0.3)',
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed w-2 h-2 bg-accent-cyan rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
        style={{
          boxShadow: '0 0 12px rgba(68, 217, 232, 0.8)',
        }}
      />
    </>
  )
}
