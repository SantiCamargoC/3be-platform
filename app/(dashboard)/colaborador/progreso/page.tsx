'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { KpiCard } from '@/components/charts/KpiCard'
import { workshops } from '@/lib/data/workshops'
import {
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
} from 'lucide-react'

export default function ProgresoPage() {
  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow">MI EVOLUCIÓN CONSCIENTE</span>
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Resumen de Mi Progreso y Horas
        </h1>
        <p className="mt-1 text-xs text-muted-text">
          Seguimiento de lecciones vistas, notas registradas y certificaciones del programa 3be.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <KpiCard
          label="Lecciones Completadas"
          value="8"
          unit="/ 24"
          foot="33% del programa total"
          icon={CheckCircle2}
        />
        <KpiCard
          label="Tiempo Invertido"
          value="4.5"
          unit="horas"
          foot="Videos y ejercicios prácticos"
          icon={Clock}
        />
        <KpiCard
          label="Estado del SER Predominante"
          value="Zona 3"
          foot="El Umbral del Coraje (200 Hz)"
          icon={Sparkles}
        />
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">
          Estado por Taller
        </h2>

        {workshops.map((w, idx) => {
          const completedCount = idx === 0 ? 3 : 0
          const pct = Math.round((completedCount / w.lessons.length) * 100)

          return (
            <Card key={w.id} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <Badge variant={w.color === 'orange' ? 'orange' : w.color === 'teal' ? 'teal' : 'navy'}>
                    Taller 0{idx + 1}
                  </Badge>
                  <h3 className="mt-2 font-display text-base font-bold text-ink">{w.title}</h3>
                  <p className="text-xs text-muted-text">{w.lessons.length} lecciones · {w.subtitle}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-ink">{pct}%</span>
                    <div className="text-[10px] text-muted-text">{completedCount} de {w.lessons.length} vistas</div>
                  </div>

                  <Button asChild variant="outline" size="sm">
                    <Link href={`/colaborador/formacion?taller=${w.id}`}>
                      Continuar
                      <ArrowRight size={14} />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-4 h-2 w-full rounded-full bg-surface overflow-hidden">
                <div
                  className="h-full bg-teal transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
