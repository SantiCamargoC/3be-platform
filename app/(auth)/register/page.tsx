'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Logo3be } from '@/components/shared/Logo3be'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight, Building2, UserCheck } from 'lucide-react'

const registerSchema = z.object({
  empresaNombre: z.string().min(2, 'Ingresa el nombre de la empresa'),
  nit: z.string().optional(),
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  email: z.string().email('Ingresa un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            nombre: values.nombre,
            empresa_nombre: values.empresaNombre,
            rol: 'admin_tenant',
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      router.push('/empresa')
    } catch {
      setError('Ocurrió un error al procesar el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper p-6">
      <div className="mb-6">
        <Logo3be showTagline={true} />
      </div>

      <Card className="w-full max-w-lg border-line bg-white p-8 shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Crear Cuenta Empresa</CardTitle>
          <CardDescription>
            Comienza a transformar la cultura y bienestar de tu organización con 3be
          </CardDescription>
        </CardHeader>

        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Nombre de la Empresa"
              placeholder="Ej. Inversiones SAS"
              error={errors.empresaNombre?.message}
              {...register('empresaNombre')}
            />
            <Input
              label="NIT (Opcional)"
              placeholder="900.123.456-7"
              {...register('nit')}
            />
          </div>

          <Input
            label="Nombre del Administrador / RRHH"
            placeholder="María López"
            error={errors.nombre?.message}
            {...register('nombre')}
          />

          <Input
            label="Correo Corporativo"
            type="email"
            placeholder="maria@empresa.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Mínimo 6 caracteres"
            error={errors.password?.message}
            {...register('password')}
          />

          <Button type="submit" disabled={loading} className="mt-3 w-full">
            {loading ? 'Creando cuenta...' : 'Crear Organización y Acceder'}
            <ArrowRight size={16} />
          </Button>
        </form>

        <div className="mt-6 border-t border-line pt-4 text-center text-xs text-muted-text">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="font-semibold text-teal hover:underline">
            Inicia sesión aquí
          </Link>
        </div>
      </Card>
    </div>
  )
}
