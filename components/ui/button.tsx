import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'teal'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', asChild = false, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const base =
      'inline-flex items-center justify-center font-display font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none rounded-xl'

    const variants = {
      primary:
        'bg-gradient-to-r from-orange to-orange-deep text-white shadow-md hover:brightness-105 active:scale-[0.98]',
      secondary:
        'bg-navy text-white hover:bg-petrol active:scale-[0.98]',
      outline:
        'border border-line bg-white text-ink hover:bg-surface active:scale-[0.98]',
      ghost:
        'text-ink hover:bg-black/5 active:scale-[0.98]',
      teal:
        'bg-teal text-white hover:bg-teal-deep active:scale-[0.98]',
    }

    const sizes = {
      sm: 'h-9 px-3.5 text-xs gap-1.5',
      md: 'h-11 px-5 text-sm gap-2',
      lg: 'h-13 px-7 text-base gap-2.5',
      icon: 'h-10 w-10 p-0',
    }

    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'
