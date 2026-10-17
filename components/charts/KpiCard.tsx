'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  label: string
  value: string | number
  unit?: string
  trend?: {
    value: string
    isPositive?: boolean
  }
  foot?: string
  icon?: LucideIcon
  className?: string
}

export function KpiCard({
  label,
  value,
  unit,
  trend,
  foot,
  icon: Icon,
  className,
}: KpiCardProps) {
  return (
    <Card className={cn('p-5 hover:border-teal/30 transition-colors', className)}>
      <div className="flex items-center justify-between text-xs text-muted-text">
        <span className="font-medium">{label}</span>
        {Icon && <Icon size={18} className="text-teal" />}
      </div>

      <div className="my-3 flex items-baseline gap-1.5 font-display text-3xl font-bold text-ink">
        <span>{value}</span>
        {unit && <span className="text-sm font-normal text-muted-text">{unit}</span>}
      </div>

      {(trend || foot) && (
        <div className="flex items-center gap-2 text-[11px] text-muted-text">
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-semibold',
                trend.isPositive ? 'text-emerald-600' : 'text-red-500'
              )}
            >
              {trend.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend.value}
            </span>
          )}
          {foot && <span>{foot}</span>}
        </div>
      )}
    </Card>
  )
}
