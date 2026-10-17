'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { workshops } from '@/lib/data/workshops'
import { KeyRound, UserPlus, Mail, Check, Copy, ShoppingBag } from 'lucide-react'

export default function LicenciasPage() {
  const [copiedToken, setCopiedToken] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [sentInvites, setSentInvites] = useState([
    { email: 'carlos.m@empresa.com', rol: 'colaborador', estado: 'aceptada' },
    { email: 'laura.v@empresa.com', rol: 'colaborador', estado: 'pendiente' },
    { email: 'andres.s@empresa.com', rol: 'directivo', estado: 'aceptada' },
  ])

  const inviteLink = 'http://localhost:3000/invite?token=3be-tk-928f01a'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopiedToken(true)
    setTimeout(() => setCopiedToken(false), 2000)
  }

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail) return
    setSentInvites([
      ...sentInvites,
      { email: inviteEmail, rol: 'colaborador', estado: 'pendiente' },
    ])
    setInviteEmail('')
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow">GESTIÓN DE CUPOS & ACCESOS</span>
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Licencias de Formación Asignadas
        </h1>
        <p className="mt-1 text-xs text-muted-text">
          Controla los cupos contratados por taller e invita a nuevos colaboradores a la plataforma.
        </p>
      </div>

      {/* Licenses summary cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {workshops.map((w, idx) => (
          <Card key={w.id} className="p-6">
            <div className="flex items-center justify-between">
              <Badge variant="teal">Taller 0{idx + 1}</Badge>
              <KeyRound size={18} className="text-teal" />
            </div>

            <h3 className="mt-3 font-display text-base font-bold text-ink">{w.title}</h3>
            <p className="mt-1 text-xs text-muted-text">{w.subtitle}</p>

            <div className="mt-5 space-y-2 border-t border-line pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-text">Cupos adquiridos:</span>
                <span className="font-bold">50 licencias</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-text">Activadas por colaboradores:</span>
                <span className="font-bold text-teal">38 activas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-text">Cupos disponibles:</span>
                <span className="font-bold text-orange">12 cupos</span>
              </div>
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/catalogo">
                  <ShoppingBag size={14} />
                  Comprar más licencias
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Invite collaborator panel */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <Card className="p-6">
            <h2 className="font-display text-base font-bold text-ink">
              Invitar Colaborador por Correo
            </h2>
            <p className="mt-1 text-xs text-muted-text">
              El colaborador recibirá un correo seguro para activar su usuario y responder las encuestas.
            </p>

            <form onSubmit={handleSendInvite} className="mt-4 space-y-3">
              <Input
                placeholder="colaborador@tuempresa.com"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
              <Button type="submit" size="sm" className="w-full">
                <UserPlus size={14} />
                Enviar Invitación
              </Button>
            </form>

            <div className="mt-6 border-t border-line pt-4">
              <span className="text-xs font-semibold text-ink">Enlace directo de registro:</span>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-line bg-surface p-2 text-xs font-mono">
                <input
                  readOnly
                  value={inviteLink}
                  className="w-full bg-transparent text-muted-text outline-none truncate"
                />
                <button
                  onClick={copyToClipboard}
                  className="rounded-lg bg-white p-1.5 shadow-xs hover:bg-black/5"
                  title="Copiar enlace"
                >
                  {copiedToken ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Invited List */}
        <div className="lg:col-span-7">
          <Card className="p-6">
            <h2 className="font-display text-base font-bold text-ink">
              Colaboradores Invitados
            </h2>
            <p className="mt-1 text-xs text-muted-text">
              Estado de invitaciones enviadas en el tenant
            </p>

            <div className="mt-4 divide-y divide-line">
              {sentInvites.map((inv, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-teal" />
                    <span className="font-medium text-ink">{inv.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={inv.estado === 'aceptada' ? 'teal' : 'orange'}>
                      {inv.estado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
