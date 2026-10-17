'use client'

import React from 'react'
import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface RadarDataPoint {
  dimension: string
  actual: number
  objetivo?: number
}

interface RadarChartProps {
  data?: RadarDataPoint[]
  title?: string
  description?: string
  className?: string
}

const defaultData: RadarDataPoint[] = [
  { dimension: 'Clima', actual: 82, objetivo: 85 },
  { dimension: 'Seguridad Psicológica', actual: 76, objetivo: 80 },
  { dimension: 'Comunicación', actual: 70, objetivo: 80 },
  { dimension: 'Propósito', actual: 88, objetivo: 90 },
  { dimension: 'Reconocimiento', actual: 65, objetivo: 75 },
  { dimension: 'Manejo Conflictos', actual: 74, objetivo: 80 },
]

export function RadarChart({
  data = defaultData,
  title = 'Dimensiones de Bienestar',
  description = 'Medición de cultura y seguridad psicológica',
  className,
}: RadarChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadar data={data}>
            <PolarGrid stroke="#043146" strokeOpacity={0.12} />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: '#5E6E7C', fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#5E6E7C', fontSize: 9 }}
            />
            <Radar
              name="Actual"
              dataKey="actual"
              stroke="#00B4D8"
              fill="#00B4D8"
              fillOpacity={0.4}
            />
            {data.some((d) => d.objetivo !== undefined) && (
              <Radar
                name="Meta"
                dataKey="objetivo"
                stroke="#FF6B35"
                fill="#FF6B35"
                fillOpacity={0.15}
                strokeDasharray="3 3"
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A1F44',
                borderColor: '#0A1F44',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
          </RechartsRadar>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
