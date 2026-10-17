'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Logo3be } from '@/components/shared/Logo3be'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Ingresa un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/empresa'
  const [authError, setAuthError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true)
      setAuthError(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        setAuthError(error.message)
        return
      }

      const role = data.user?.user_metadata?.rol || 'admin_tenant'
      if (role === 'superadmin') router.push('/admin')
      else if (['admin_tenant', 'rrhh', 'directivo'].includes(role)) router.push('/empresa')
      else if (role === 'cliente_b2c') router.push('/b2c/mis-talleres')
      else router.push('/colaborador')
    } catch {
      setAuthError('Ocurrió un error inesperado al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  // Quick demo bypass for immediate evaluation
  const handleDemoAccess = (targetRole: string, destination: string) => {
    router.push(destination)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper p-6">
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo3be showTagline={true} />
      </div>

      <Card className="w-full max-w-md border-line bg-white p-8 shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa a tu portal de formación y analítica de bienestar
          </CardDescription>
        </CardHeader>

        {authError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Correo Corporativo o Personal"
            type="email"
            placeholder="ejemplo@empresa.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Button type="submit" disabled={loading} className="mt-2 w-full">
            {loading ? 'Accediendo...' : 'Entrar a la plataforma'}
            <ArrowRight size={16} />
          </Button>
        </form>

        {/* Demo fast-track for instant navigation testing */}
        <div className="mt-6 border-t border-line pt-5 text-center">
          <span className="font-mono text-[10px] uppercase text-muted-text">
            Acceso Rápido para Demostración:
          </span>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoAccess('admin_tenant', '/empresa')}
            >
              Demo Empresa (RRHH)
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoAccess('colaborador', '/colaborador')}
            >
              Demo Colaborador
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoAccess('superadmin', '/admin')}
            >
              Demo Superadmin
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoAccess('cliente_b2c', '/b2c/mis-talleres')}
            >
              Demo Cliente B2C
            </Button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-muted-text">
          <Link href="/register" className="hover:text-ink">
            ¿Nueva empresa? <span className="text-orange font-semibold">Registrarse</span>
          </Link>
          <Link href="/" className="hover:text-ink">
            Volver a inicio
          </Link>
        </div>
      </Card>

      <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-muted-text">
        <ShieldCheck size={14} className="text-teal" />
        <span>Garantía de anonimato en encuestas y confidencialidad Ley 1581</span>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-paper font-sans text-sm text-muted-text">Cargando inicio de sesión...</div>}>
      <LoginForm />
    </Suspense>
  )
}
