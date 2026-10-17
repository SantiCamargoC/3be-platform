import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'teal' | 'orange' | 'navy' | 'gray' | 'success'
}

export function Badge({
  className,
  variant = 'teal',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    teal: 'bg-teal/15 text-teal-deep border border-teal/20',
    orange: 'bg-orange/15 text-orange-deep border border-orange/20',
    navy: 'bg-navy/10 text-navy border border-navy/20',
    gray: 'bg-black/5 text-muted-text border border-line',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide uppercase',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
