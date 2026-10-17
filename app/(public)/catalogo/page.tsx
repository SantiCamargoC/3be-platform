'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo3be } from '@/components/shared/Logo3be'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { workshops, type Workshop } from '@/lib/data/workshops'
import { formatCOP } from '@/lib/utils'
import { Footer } from '@/components/layout/Footer'
import { Check, Play, BookOpen, Users, ShieldCheck, ArrowRight } from 'lucide-react'

export default function CatalogoPage() {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
  const [purchaseType, setPurchaseType] = useState<'b2c' | 'b2b'>('b2b')
  const [seats, setSeats] = useState(10)

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <Logo3be />
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Acceso Clientes</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/checkout">Ir a Pagar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <span className="eyebrow">CATÁLOGO OFICIAL DE FORMACIÓN</span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-5xl">
            Talleres Prácticos para la Cultura del SER
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-text">
            Disponible para compra individual (B2C) o por paquetes de licencias empresariales (B2B) con pasarela integrada.
          </p>
        </div>

        {/* Modalidad Selector */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-xl border border-line bg-white p-1 shadow-xs">
            <button
              onClick={() => setPurchaseType('b2b')}
              className={`rounded-lg px-4 py-2 font-display text-xs font-semibold transition-all ${
                purchaseType === 'b2b'
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-muted-text hover:text-ink'
              }`}
            >
              Para Empresas (Licencias B2B)
            </button>
            <button
              onClick={() => setPurchaseType('b2c')}
              className={`rounded-lg px-4 py-2 font-display text-xs font-semibold transition-all ${
                purchaseType === 'b2c'
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-muted-text hover:text-ink'
              }`}
            >
              Individual (Persona Natural B2C)
            </button>
          </div>
        </div>

        {/* Grid de Talleres */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {workshops.map((w, idx) => (
            <Card key={w.id} className="flex flex-col border-line bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <Badge variant={w.color === 'orange' ? 'orange' : w.color === 'teal' ? 'teal' : 'navy'}>
                  {w.tag}
                </Badge>
                <span className="font-mono text-xs text-muted-text">
                  {w.lessons.length} lecciones
                </span>
              </div>

              <h2 className="mt-4 font-display text-xl font-bold text-ink">
                {w.title}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-text">
                {w.subtitle}
              </p>

              {/* Lista de lecciones destacadas */}
              <div className="mt-6 flex-1 space-y-2 border-t border-line pt-4">
                <span className="font-mono text-[10px] font-bold text-muted-text uppercase">
                  Contenido incluido:
                </span>
                {w.lessons.slice(0, 4).map((l) => (
                  <div key={l.id} className="flex items-center gap-2 text-xs text-ink/80">
                    <Play size={12} className="text-teal flex-none" />
                    <span className="truncate">{l.titulo}</span>
                  </div>
                ))}
                {w.lessons.length > 4 && (
                  <div className="text-[11px] font-semibold text-teal">
                    + {w.lessons.length - 4} lecciones adicionales y ejercicios
                  </div>
                )}
              </div>

              {/* Precios y Botón de Compra */}
              <div className="mt-6 border-t border-line pt-5">
                <div className="mb-4">
                  {purchaseType === 'b2b' ? (
                    <div>
                      <span className="text-[11px] text-muted-text">Por licencia corporativa:</span>
                      <div className="font-display text-2xl font-bold text-ink">
                        {formatCOP(w.priceEmpresaCop)}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[11px] text-muted-text">Acceso personal completo:</span>
                      <div className="font-display text-2xl font-bold text-ink">
                        {formatCOP(w.priceCop)}
                      </div>
                    </div>
                  )}
                </div>

                <Button asChild className="w-full">
                  <Link href={`/checkout?taller=${w.id}&type=${purchaseType}`}>
                    Comprar Ahora
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
