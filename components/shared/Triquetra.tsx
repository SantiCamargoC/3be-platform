import React from 'react'
import { cn } from '@/lib/utils'

interface TriquetraProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
  strokeWidth?: number
}

export function Triquetra({
  size = 40,
  className = '',
  strokeWidth = 4.5,
  ...props
}: TriquetraProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-40 -40 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('inline-block flex-none text-current', className)}
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="0"
        cy="-14"
        r="21"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="-12.12"
        cy="7"
        r="21"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="12.12"
        cy="7"
        r="21"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
