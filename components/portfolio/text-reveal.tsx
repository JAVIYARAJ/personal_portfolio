'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  width?: 'fit-content' | '100%'
  delay?: number
}

export default function TextReveal({ text, className = '', width = 'fit-content', delay = 0 }: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })


  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ width, maxWidth: '100vw' }}>
      <motion.div
        className="w-fit max-w-full"
        variants={{
          hidden: { y: '100%' },
          visible: { y: 0 }
        }}

        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {text}
      </motion.div>
    </div>
  )
}
