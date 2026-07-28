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

/** Isti motiv travnjaka, samo linije — služi kao veliki vodeni žig u pozadini. */
export function LogoVector({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth="8">
        <line x1="4" y1="64" x2="124" y2="64" />
        <circle cx="64" cy="64" r="26" />
        <path d="M44 4h40v14a20 20 0 0 1-40 0V4Z" />
        <path d="M44 124h40v-14a20 20 0 0 0-40 0v14Z" />
      </g>
    </svg>
  )
}

export function Wordmark({ className }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn('display text-[19px] tracking-[-0.02em]', className)}>{BRAND.name}</span>
  )
}
