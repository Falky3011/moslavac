'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ADMIN_PATH, BRAND, NAV } from '../config'
import { ButtonLink } from '../ui/Button'
import { cn } from '../ui/cn'
import { Wordmark } from '../ui/Logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled || open
            ? 'border-b border-line bg-paper/85 backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label={`${BRAND.name} — naslovnica`}>
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[15px] text-muted transition-colors hover:bg-paper-2 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={ADMIN_PATH} variant="ghost" size="sm" className="hidden sm:inline-flex">
              Prijava za klub
            </ButtonLink>
            <ButtonLink href="/kontakt" size="sm" className="hidden sm:inline-flex">
              Zatraži demo
            </ButtonLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Izbornik"
              className="flex size-10 items-center justify-center rounded-full border border-line-strong lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    'absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-300',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-300',
                    open ? 'top-1.5 -rotate-45' : 'top-3',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-paper lg:hidden"
          >
            <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-1 px-5 py-4 sm:px-8">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[17px] hover:bg-paper-2"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <ButtonLink href={ADMIN_PATH} variant="secondary" onClick={() => setOpen(false)}>
                  Prijava
                </ButtonLink>
                <ButtonLink href="/kontakt" onClick={() => setOpen(false)}>
                  Zatraži demo
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
