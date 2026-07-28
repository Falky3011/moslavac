import { BRAND } from '../config'
import { cn } from './cn'

/** Znak: pola travnjaka odozgo — središnji krug i središnja linija. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn('size-8', className)}>
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <g stroke="var(--color-lime)" strokeWidth="1.6" fill="none" opacity="0.95">
        <line x1="4" y1="16" x2="28" y2="16" />
        <circle cx="16" cy="16" r="5.5" />
        <path d="M11 4h10v3.5a5 5 0 0 1-10 0V4Z" />
        <path d="M11 28h10v-3.5a5 5 0 0 0-10 0V28Z" />
      </g>
    </svg>
  )
}

export function Wordmark({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className={cn('text-ink', markClassName)} />
      <span className="display text-[19px] tracking-[-0.02em]">{BRAND.name}</span>
    </span>
  )
}
