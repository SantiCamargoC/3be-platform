'use client'

import React, { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Logo3be } from '@/components/shared/Logo3be'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { workshops } from '@/lib/data/workshops'
import { formatCOP } from '@/lib/utils'
import { CreditCard, Landmark, ShieldCheck, CheckCircle2 } from 'lucide-react'

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tallerId = searchParams.get('taller') || 'taller-01'
  const isB2B = searchParams.get('type') === 'b2b'

  const workshop = workshops.find((w) => w.id === tallerId) || workshops[0]
  const [seats, setSeats] = useState(isB2B ? 10 : 1)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pse'>('pse')
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  const unitPrice = isB2B ? workshop.priceEmpresaCop : workshop.priceCop
  const totalAmount = unitPrice * seats

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment transaction
    setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-white py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
          <Logo3be />
          <Link href="/catalogo" className="text-xs text-muted-text hover:text-ink">
            Volver al Catálogo
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <span className="eyebrow">PASARELA DE PAGO SEGURA</span>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-ink">
            Finalizar Orden de Compra
          </h1>
        </div>

        {success ? (
          <Card className="mx-auto max-w-lg p-10 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="font-display text-2xl font-bold">¡Pago Confirmado!</h2>
            <p className="mt-2 text-xs text-muted-text">
              Tu orden ha sido procesada con éxito a través de la pasarela y las licencias ya se encuentran activadas en tu cuenta.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild>
                <Link href={isB2B ? '/empresa/licencias' : '/b2c/mis-talleres'}>
                  Ver Mis Licencias Activadas
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Form */}
            <form onSubmit={handlePay} className="space-y-6 lg:col-span-7">
              <Card className="p-6">
                <h2 className="font-display text-base font-bold text-ink">
                  1. Información del Pagador
                </h2>
                <div className="mt-4 space-y-4">
                  <Input label="Nombre o Razón Social" placeholder="Empresa o Persona" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="NIT o Cédula" placeholder="1020304050" required />
                    <Input label="Teléfono de Contacto" placeholder="300 123 4567" required />
                  </div>
                  <Input label="Correo para Facturación Electrónica" type="email" placeholder="facturacion@empresa.com" required />
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="font-display text-base font-bold text-ink">
                  2. Método de Pago (Colombia)
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pse')}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      paymentMethod === 'pse'
                        ? 'border-teal bg-teal/5 text-ink font-semibold'
                        : 'border-line bg-white text-muted-text'
                    }`}
                  >
                    <Landmark size={20} className={paymentMethod === 'pse' ? 'text-teal' : ''} />
                    <div>
                      <div className="text-xs">PSE</div>
                      <div className="text-[10px] text-muted-text">Débito Bancario</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-teal bg-teal/5 text-ink font-semibold'
                        : 'border-line bg-white text-muted-text'
                    }`}
                  >
                    <CreditCard size={20} className={paymentMethod === 'card' ? 'text-teal' : ''} />
                    <div>
                      <div className="text-xs">Tarjeta de Crédito</div>
                      <div className="text-[10px] text-muted-text">Visa / Mastercard</div>
                    </div>
                  </button>
                </div>
              </Card>

              <Button type="submit" disabled={processing} size="lg" className="w-full">
                {processing ? 'Conectando con pasarela...' : `Pagar ${formatCOP(totalAmount)}`}
              </Button>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <Card className="p-6">
                <h2 className="font-display text-base font-bold text-ink">
                  Resumen de la Orden
                </h2>

                <div className="mt-4 space-y-4 border-b border-line pb-4">
                  <div>
                    <span className="font-mono text-[10px] text-teal uppercase font-bold">
                      {workshop.tag}
                    </span>
                    <h3 className="font-display text-sm font-bold text-ink">
                      {workshop.title}
                    </h3>
                    <p className="text-[11px] text-muted-text">
                      {workshop.lessons.length} lecciones con video y ejercicios prácticos
                    </p>
                  </div>

                  {isB2B && (
                    <div className="flex items-center justify-between border-t border-line pt-3 text-xs">
                      <span className="text-muted-text">Número de cupos/licencias:</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={500}
                          value={seats}
                          onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value) || 1))}
                          className="h-8 w-16 rounded-md border border-line px-2 text-center text-xs font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-muted-text">
                    <span>Precio unitario:</span>
                    <span>{formatCOP(unitPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-text">
                    <span>Cantidad:</span>
                    <span>{seats} {seats === 1 ? 'acceso' : 'licencias'}</span>
                  </div>
                  <div className="flex justify-between border-t border-line pt-3 font-display text-base font-bold text-ink">
                    <span>Total a pagar:</span>
                    <span className="text-orange">{formatCOP(totalAmount)}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-line pt-4 font-mono text-[10px] text-muted-text">
                  <ShieldCheck size={14} className="text-teal" />
                  <span>Transacción cifrada y protegida por Wompi / PSE</span>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-paper font-sans text-sm text-muted-text">Cargando checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
