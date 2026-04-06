'use client'

import { motion, useReducedMotion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  fullWidth?: boolean
  className?: string
  duration?: number
  scale?: number
  blur?: boolean
  staggerChildren?: number
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  fullWidth = false,
  className = '',
  duration = 0.8,
  scale = 1,
  blur = false,
  staggerChildren
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: { x: 0, y: 0 }
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...(shouldReduceMotion ? {} : directions[direction]),
      scale: shouldReduceMotion ? 1 : scale,
      filter: blur && !shouldReduceMotion ? 'blur(10px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        staggerChildren: staggerChildren,
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}

      variants={variants}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}


