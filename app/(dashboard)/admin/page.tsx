'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { KpiCard } from '@/components/charts/KpiCard'
import { Building2, KeyRound, DollarSign, Users, ShieldAlert, ArrowRight } from 'lucide-react'
import { formatCOP } from '@/lib/utils'

export default function SuperadminPage() {
  const tenants = [
    {
      id: 't-1',
      nombre: 'Grupo Argos & Cemento SAS',
      plan: 'enterprise',
      colaboradores: 120,
      licencias: 350,
      activo: true,
      fecha: '01 Feb 2026',
    },
    {
      id: 't-2',
      nombre: 'Bancolombia Transformación',
      plan: 'pro',
      colaboradores: 80,
      licencias: 200,
      activo: true,
      fecha: '15 Ene 2026',
    },
    {
      id: 't-3',
      nombre: 'Financiera del Llano',
      plan: 'starter',
      colaboradores: 25,
      licencias: 50,
      activo: true,
      fecha: '05 Mar 2026',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow">PANEL SUPERADMIN 3BE</span>
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Gestión Global de la Plataforma
        </h1>
        <p className="mt-1 text-xs text-muted-text">
          Control de todos los clientes corporativos (tenants), licencias y métricas del sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <KpiCard
          label="Empresas Clientes (Tenants)"
          value="18"
          foot="14 activas / 4 onboarding"
          icon={Building2}
        />
        <KpiCard
          label="Licencias Totales Activas"
          value="1,420"
          trend={{ value: '+18% este mes', isPositive: true }}
          foot="Distribuido en 3 talleres"
          icon={KeyRound}
        />
        <KpiCard
          label="Total Colaboradores Registrados"
          value="892"
          foot="Usuarios con cuenta activa"
          icon={Users}
        />
        <KpiCard
          label="Ingresos Facturados (YTD)"
          value={formatCOP(185400000)}
          trend={{ value: '+32% vs año anterior', isPositive: true }}
          foot="Pagos vía pasarela y PSE"
          icon={DollarSign}
        />
      </div>

      {/* Tenants Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base font-bold text-ink">
            Empresas Clientes en el Sistema
          </h2>
          <Button size="sm">
            <Building2 size={14} />
            Crear Nueva Empresa
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-line text-muted-text font-mono uppercase text-[10px]">
              <tr>
                <th className="pb-3">Empresa</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Colaboradores</th>
                <th className="pb-3">Licencias</th>
                <th className="pb-3">Estado</th>
                <th className="pb-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-surface/50">
                  <td className="py-3.5 font-bold text-ink">{t.nombre}</td>
                  <td className="py-3.5">
                    <Badge variant="teal">{t.plan}</Badge>
                  </td>
                  <td className="py-3.5 font-mono">{t.colaboradores} usuarios</td>
                  <td className="py-3.5 font-mono">{t.licencias} cupos</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      Activo
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Button variant="outline" size="sm">
                      Administrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
