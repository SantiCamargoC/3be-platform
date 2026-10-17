'use client'

import React, { useState } from 'react'
import { KpiCard } from '@/components/charts/KpiCard'
import { RadarChart } from '@/components/charts/RadarChart'
import { EvolutionChart } from '@/components/charts/EvolutionChart'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Download,
  Filter,
  ShieldAlert,
  Sparkles,
  Smile,
  Users,
  Activity,
  HeartHandshake,
} from 'lucide-react'

export default function IndicadoresPage() {
  const [periodo, setPeriodo] = useState('2026-Q1')
  const totalRespuestas = 38 // Greater than minimum threshold of 5

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow">ANALÍTICA DE BIENESTAR & CULTURA</span>
          <h1 className="font-display text-3xl font-extrabold text-ink">
            Indicadores Agregados de la Organización
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Métricas calculadas bajo el umbral de anonimato (mínimo 5 participantes requeridos).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="h-10 rounded-xl border border-line bg-white px-3 font-mono text-xs text-ink outline-none focus:border-teal"
          >
            <option value="2026-Q1">Primer Trimestre 2026</option>
            <option value="2025-Q4">Cuarto Trimestre 2025</option>
            <option value="2025-Q3">Tercer Trimestre 2025</option>
          </select>

          <Button variant="outline" size="sm" onClick={() => alert('Generando informe ejecutivo PDF...')}>
            <Download size={14} />
            Exportar Informe
          </Button>
        </div>
      </div>

      {/* Threshold Status Banner */}
      <div className="flex items-center justify-between rounded-2xl border border-teal/20 bg-teal/10 p-4 text-xs text-teal-deep">
        <div className="flex items-center gap-2.5">
          <Badge variant="teal">Anonimato Protegido</Badge>
          <span>
            Muestra evaluada: <strong>{totalRespuestas} respuestas</strong> (Supera el umbral mínimo de 5).
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-text">Último cálculo: Hoy</span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Clima Global Promedio"
          value="84"
          unit="/100"
          trend={{ value: '+6.2% vs Q anterior', isPositive: true }}
          foot="Seguridad y confianza en el equipo"
          icon={Smile}
        />
        <KpiCard
          label="Seguridad Psicológica"
          value="79%"
          trend={{ value: '+5.1% de avance', isPositive: true }}
          foot="Capacidad de expresar discrepancias"
          icon={HeartHandshake}
        />
        <KpiCard
          label="Tasa de Participación"
          value="86%"
          trend={{ value: '+8% vs benchmark sector', isPositive: true }}
          foot="38 colaboradores evaluados"
          icon={Users}
        />
        <KpiCard
          label="Frecuencia Hawkins Promedio"
          value="240 Hz"
          foot="Zona 4 (Neutralidad & Aceptación)"
          icon={Sparkles}
        />
      </div>

      {/* Two Column Charts: Radar & Evolution */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <RadarChart
          title="Dimensiones Culturales y Psicológicas"
          description="Evaluación multidimensional de las 6 áreas críticas de interacción humana"
        />

        <EvolutionChart
          title="Evolución Trimestral de Bienestar"
          description="Comparativa antes del programa 3be vs mediciones posteriores"
        />
      </div>

      {/* Hawkins Zone Distribution in the Team */}
      <Card className="p-6">
        <CardHeader className="mb-6">
          <CardTitle>Distribución del Equipo por Zonas de Consciencia</CardTitle>
          <CardDescription>
            Porcentaje de colaboradores en cada zona según el test de diagnóstico Hawkins
          </CardDescription>
        </CardHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6 font-mono text-center">
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <span className="text-[10px] text-red-500 uppercase font-bold">Zona 1: Supervivencia</span>
            <div className="mt-2 text-2xl font-bold text-red-600">8%</div>
            <span className="text-[10px] text-muted-text">Culpa/Apatía</span>
          </div>

          <div className="rounded-xl border border-orange/20 bg-orange/5 p-4">
            <span className="text-[10px] text-orange uppercase font-bold">Zona 2: Fuerza</span>
            <div className="mt-2 text-2xl font-bold text-orange">16%</div>
            <span className="text-[10px] text-muted-text">Miedo/Ira</span>
          </div>

          <div className="rounded-xl border border-amber/30 bg-amber/10 p-4">
            <span className="text-[10px] text-amber uppercase font-bold">Zona 3: El Umbral</span>
            <div className="mt-2 text-2xl font-bold text-amber">34%</div>
            <span className="text-[10px] text-muted-text">Coraje</span>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <span className="text-[10px] text-emerald-600 uppercase font-bold">Zona 4: Armonía</span>
            <div className="mt-2 text-2xl font-bold text-emerald-600">24%</div>
            <span className="text-[10px] text-muted-text">Aceptación</span>
          </div>

          <div className="rounded-xl border border-teal/20 bg-teal/10 p-4">
            <span className="text-[10px] text-teal-deep uppercase font-bold">Zona 5: Sabiduría</span>
            <div className="mt-2 text-2xl font-bold text-teal">14%</div>
            <span className="text-[10px] text-muted-text">Razón/Estrategia</span>
          </div>

          <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
            <span className="text-[10px] text-purple-600 uppercase font-bold">Zona 6: Paz</span>
            <div className="mt-2 text-2xl font-bold text-purple-600">4%</div>
            <span className="text-[10px] text-muted-text">Trascendencia</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
