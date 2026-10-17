'use client'

import React from 'react'
import Link from 'next/link'
import {
  Users,
  Smile,
  GraduationCap,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
} from 'lucide-react'
import { KpiCard } from '@/components/charts/KpiCard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { workshops } from '@/lib/data/workshops'
import { useApp } from '@/app/providers'

export default function EmpresaOverviewPage() {
  const { tenantName } = useApp()

  return (
    <div className="space-y-8">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-soft">
        <div className="relative z-10 max-w-2xl">
          <span className="font-mono text-xs font-bold tracking-widest text-sky uppercase">
            PANEL DE DIRECCIÓN & TALENTO HUMANO
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Bienvenido al Centro de Cultura y Bienestar
          </h1>
          <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
            Monitorea los indicadores de clima en tiempo real, administra las licencias activas y acompaña la evolución de tu equipo hacia el liderazgo consciente.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/empresa/indicadores">
                Ver Indicadores de Bienestar
                <ArrowRight size={14} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              <Link href="/empresa/licencias">Gestionar Licencias</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Índice de Clima Organizacional"
          value="82"
          unit="/100"
          trend={{ value: '+4.5% este mes', isPositive: true }}
          foot="Basado en encuestas anónimas"
          icon={Smile}
        />
        <KpiCard
          label="Participación en Diagnóstico"
          value="78%"
          trend={{ value: '+12% vs periodo anterior', isPositive: true }}
          foot="54 de 69 colaboradores"
          icon={Users}
        />
        <KpiCard
          label="Horas de Formación SER"
          value="142"
          unit="hrs"
          trend={{ value: '+28 hrs esta semana', isPositive: true }}
          foot="24 lecciones disponibles"
          icon={GraduationCap}
        />
        <KpiCard
          label="Zona Emocional Predominante"
          value="Umbral Z3"
          foot="Frecuencia promedio: 200 Hz (Coraje)"
          icon={Sparkles}
        />
      </div>

      {/* Two column: Quick actions and Active workshops */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">
              Talleres Activos en tu Empresa
            </h2>
            <Link href="/empresa/licencias" className="text-xs font-semibold text-teal hover:underline">
              Ver licencias asignadas
            </Link>
          </div>

          <div className="space-y-4">
            {workshops.map((w, idx) => (
              <Card key={w.id} className="flex items-center justify-between p-5 hover:border-teal/30 transition-all">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl font-display text-sm font-bold text-white ${
                      w.color === 'orange' ? 'bg-orange' : w.color === 'teal' ? 'bg-teal' : 'bg-petrol'
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-ink">{w.title}</h3>
                    <p className="text-xs text-muted-text">{w.lessons.length} lecciones · Formato audiovisual</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="teal">Activo</Badge>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/colaborador/formacion">Explorar</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right column: Privacy Assurance & Anonymous Mailbox preview */}
        <div className="space-y-6 lg:col-span-5">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-teal/10 p-2.5 text-teal">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-ink">
                  Protocolo de Anonimato Estricto
                </h3>
                <p className="text-[11px] text-muted-text">Ley 1581 / Protección de Identidad</p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-text">
              Para garantizar la sinceridad de tus colaboradores, las respuestas nunca muestran su nombre ni correo. Los reportes se habilitan únicamente al alcanzar el umbral de <strong>5 respuestas</strong> por grupo.
            </p>

            <div className="mt-6 border-t border-line pt-4">
              <Button asChild variant="secondary" size="sm" className="w-full">
                <Link href="/empresa/buzon">Revisar Buzón Anónimo</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
