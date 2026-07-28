import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from './cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium ' +
  'transition-[transform,background-color,color,border-color] duration-200 active:scale-[0.98] ' +
  'whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-pitch text-white hover:bg-pitch-dark shadow-[0_1px_0_rgba(0,0,0,0.04)]',
  secondary: 'border border-line-strong bg-white text-ink hover:border-ink hover:bg-paper-2',
  ghost: 'text-ink hover:bg-paper-2',
  onDark: 'bg-lime text-ink hover:bg-white',
}

const sizes = {
  sm: 'h-9 px-4',
  md: 'h-11 px-5',
  lg: 'h-13 px-7 text-base',
} as const

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant
  size?: keyof typeof sizes
  children: ReactNode
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  )
}
