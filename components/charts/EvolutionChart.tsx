'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface EvolutionDataPoint {
  mes: string
  antes: number
  despues: number
}

interface EvolutionChartProps {
  data?: EvolutionDataPoint[]
  title?: string
  description?: string
  className?: string
}

const defaultData: EvolutionDataPoint[] = [
  { mes: 'Ene', antes: 45, despues: 72 },
  { mes: 'Feb', antes: 48, despues: 76 },
  { mes: 'Mar', antes: 52, despues: 81 },
  { mes: 'Abr', antes: 50, despues: 84 },
  { mes: 'May', antes: 55, despues: 88 },
]

export function EvolutionChart({
  data = defaultData,
  title = 'Impacto Antes vs. Después',
  description = 'Comparativo de índice de bienestar y cohesión post-talleres',
  className,
}: EvolutionChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(4,49,70,0.08)" />
            <XAxis dataKey="mes" tick={{ fill: '#5E6E7C', fontSize: 11 }} />
            <YAxis tick={{ fill: '#5E6E7C', fontSize: 11 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0A1F44',
                borderColor: '#0A1F44',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              formatter={(value) => (value === 'antes' ? 'Línea Base (Antes)' : 'Post-Entrenamiento')}
            />
            <Bar dataKey="antes" fill="#8FCBE5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="despues" fill="#00B4D8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
