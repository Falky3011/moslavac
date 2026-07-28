'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { FAQ } from '../data/faq'
import { LEGAL } from '../config'
import { cn } from '../ui/cn'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <section id="pitanja" className="border-t border-line bg-paper-2/60">
      <div className="mx-auto grid w-full max-w-[1180px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-32">
        <div>
          <p className="label text-pitch">Pitanja</p>
          <h2 className="display mt-4 text-[clamp(2rem,4.4vw,3.2rem)]">Ono što klubovi pitaju</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            Nema odgovora na vaše pitanje? Pišite na{' '}
            <a
              href={`mailto:${LEGAL.email}`}
              className="text-pitch underline underline-offset-4"
            >
              {LEGAL.email}
            </a>
            .
          </p>
        </div>

        <ul className="border-t border-line">
          {FAQ.map((item, index) => {
            const isOpen = open === index
            return (
              <li key={item.question} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                >
                  <span className="display text-[18px] leading-snug">{item.question}</span>
                  <Plus
                    className={cn(
                      'mt-0.5 size-5 shrink-0 text-muted transition-transform duration-300',
                      isOpen && 'rotate-45 text-pitch',
                    )}
                    strokeWidth={1.8}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduced ? 0 : 0.32,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
