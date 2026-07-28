'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Koliko se element podigne pri ulasku. 0 znači samo fade. */
  y?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
}

/**
 * Ulazna animacija sekcije. Jedan izvor istine za ritam cijele stranice —
 * ako se motion mijenja, mijenja se ovdje, ne po komponentama.
 */
export function Reveal({ children, className, delay = 0, y = 16, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
