'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Logo3be } from '@/components/shared/Logo3be'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ShieldCheck, ArrowRight } from 'lucide-react'

function InviteForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') || 'demo-token'
  const email = searchParams.get('email') || 'colaborador@empresa.com'

  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push('/colaborador')
    }, 800)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper p-6">
      <div className="mb-6">
        <Logo3be showTagline={true} />
      </div>

      <Card className="w-full max-w-md border-line bg-white p-8 shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Aceptar Invitación</CardTitle>
          <CardDescription>
            Has sido invitado a formar parte del programa de bienestar y formación de tu empresa
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Correo Electrónico (Registrado)"
            value={email}
            disabled
            className="bg-surface text-muted-text"
          />

          <Input
            label="Tu Nombre Completo"
            placeholder="Ej. Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <Input
            label="Crea tu Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? 'Activando acceso...' : 'Activar mi cuenta y entrar'}
            <ArrowRight size={16} />
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 border-t border-line pt-4 text-center font-mono text-[10px] text-muted-text">
          <ShieldCheck size={14} className="text-teal" />
          <span>Tus respuestas a encuestas serán siempre 100% anónimas</span>
        </div>
      </Card>
    </div>
  )
}

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-paper font-sans text-sm text-muted-text">Cargando invitación...</div>}>
      <InviteForm />
    </Suspense>
  )
}
