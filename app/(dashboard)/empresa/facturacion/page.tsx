'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCOP } from '@/lib/utils'
import { Receipt, Download, CreditCard, Building } from 'lucide-react'

export default function FacturacionPage() {
  const invoices = [
    {
      id: 'INV-3BE-2026-001',
      concepto: 'Paquete 50 Licencias Taller Descubre + Propósito',
      fecha: '02 Mar 2026',
      monto: 9000000,
      estado: 'pagada',
    },
    {
      id: 'INV-3BE-2025-089',
      concepto: 'Renovación Licencias Bienestar Q4',
      fecha: '15 Dic 2025',
      monto: 5400000,
      estado: 'pagada',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow">ADMINISTRACIÓN & PAGOS</span>
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Facturación & Comprobantes
        </h1>
        <p className="mt-1 text-xs text-muted-text">
          Historial de compras corporativas, licencias y comprobantes para soporte contable.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange/10 p-2.5 text-orange">
              <CreditCard size={22} />
            </div>
            <div>
              <h2 className="font-display text-sm font-bold text-ink">Plan Actual</h2>
              <p className="text-xs text-muted-text">Empresarial Pro (Multi-tenant)</p>
            </div>
          </div>
          <div className="mt-4 border-t border-line pt-3 text-xs text-muted-text">
            Total colaboradores activos: <strong>38 usuarios</strong>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-teal/10 p-2.5 text-teal">
              <Building size={22} />
            </div>
            <div>
              <h2 className="font-display text-sm font-bold text-ink">Datos de Facturación</h2>
              <p className="text-xs text-muted-text">NIT 900.554.321-9 · Facturación Electrónica DIAN</p>
            </div>
          </div>
          <div className="mt-4 border-t border-line pt-3 text-xs text-muted-text">
            Correo tributario: <strong>contabilidad@empresa.com</strong>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-display text-base font-bold text-ink mb-4">
          Comprobantes Emitidos
        </h2>
        <div className="divide-y divide-line text-xs">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Receipt size={18} className="text-teal" />
                <div>
                  <div className="font-bold text-ink">{inv.id}</div>
                  <div className="text-muted-text">{inv.concepto} · {inv.fecha}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-display font-bold text-ink">
                  {formatCOP(inv.monto)}
                </span>
                <Badge variant="teal">{inv.estado}</Badge>
                <Button variant="outline" size="sm" onClick={() => alert('Descargando comprobante en PDF...')}>
                  <Download size={14} />
                  PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
