'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { workshops } from '@/lib/data/workshops'
import { BookOpen, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react'

export default function MisTalleresB2CPage() {
  const purchasedWorkshops = [workshops[0]]

  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow">MI APRENDIZAJE INDIVIDUAL</span>
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Mis Talleres Comprados
        </h1>
        <p className="mt-1 text-xs text-muted-text">
          Acceso ilimitado a tus formaciones y contenido práctico de reprogramación del SER.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {purchasedWorkshops.map((w) => (
          <Card key={w.id} className="p-6 flex flex-col">
            <Badge variant="teal">{w.tag}</Badge>
            <h2 className="mt-3 font-display text-base font-bold text-ink">{w.title}</h2>
            <p className="mt-1 text-xs text-muted-text flex-1">{w.subtitle}</p>

            <div className="mt-4 border-t border-line pt-3 text-xs text-muted-text">
              <span>{w.lessons.length} lecciones en video</span>
            </div>

            <Button asChild size="sm" className="mt-4 w-full">
              <Link href={`/colaborador/formacion?taller=${w.id}`}>
                Entrar al Aula
                <ArrowRight size={14} />
              </Link>
            </Button>
          </Card>
        ))}

        <Card className="flex flex-col items-center justify-center border-dashed p-6 text-center">
          <ShoppingBag size={28} className="text-muted-text/60 mb-2" />
          <h3 className="font-display text-sm font-bold text-ink">¿Quieres aprender más?</h3>
          <p className="text-xs text-muted-text mt-1">Explora los demás talleres disponibles en el catálogo</p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link href="/catalogo">Ver Catálogo</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
