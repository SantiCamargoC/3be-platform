import React from 'react'
import Link from 'next/link'
import { Triquetra } from './Triquetra'
import { cn } from '@/lib/utils'

interface Logo3beProps {
  className?: string
  variant?: 'light' | 'dark'
  showTagline?: boolean
  href?: string
}

export function Logo3be({
  className,
  variant = 'dark',
  showTagline = false,
  href = '/',
}: Logo3beProps) {
  const content = (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-xl p-2 transition-transform duration-200 group-hover:scale-105',
          variant === 'light'
            ? 'bg-white/10 text-orange'
            : 'bg-navy text-orange shadow-md'
        )}
      >
        <Triquetra size={30} strokeWidth={5} />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              'font-display text-2xl font-extrabold tracking-tight',
              variant === 'light' ? 'text-white' : 'text-navy'
            )}
          >
            3be
          </span>
          <span
            className={cn(
              'font-mono text-[9px] font-bold tracking-[0.25em] uppercase',
              variant === 'light' ? 'text-sky' : 'text-teal'
            )}
          >
            CONSULTING
          </span>
        </div>
        {showTagline && (
          <span
            className={cn(
              'text-[10px] leading-tight',
              variant === 'light' ? 'text-white/60' : 'text-muted-text'
            )}
          >
            Transformamos el SER, potenciamos el HACER
          </span>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="group inline-flex items-center">
        {content}
      </Link>
    )
  }

  return content
}
