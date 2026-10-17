'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { workshops } from '@/lib/data/workshops'
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Smile,
  Heart,
  Meh,
  Frown,
} from 'lucide-react'

export default function ColaboradorHomePage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [moodSaved, setMoodSaved] = useState(false)

  const moods = [
    { label: 'En calma & enfocado', icon: Smile, color: 'text-teal' },
    { label: 'Con energía & entusiasmo', icon: Heart, color: 'text-orange' },
    { label: 'Neutro o reflexivo', icon: Meh, color: 'text-amber' },
    { label: 'Con tensión o fatiga', icon: Frown, color: 'text-red-400' },
  ]

  const handleSelectMood = (label: string) => {
    setSelectedMood(label)
    setMoodSaved(true)
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-soft">
        <div className="relative z-10 max-w-2xl">
          <span className="font-mono text-xs font-bold tracking-widest text-sky uppercase">
            TU ESPACIO PERSONAL DE TRANSFORMACIÓN
          </span>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            Hola, Colaborador
          </h1>
          <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
            Este es un espacio confidencial para conectar con tu SER, evaluar tu bienestar emocional de manera anónima y desarrollar tu liderazgo a través de los talleres.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/colaborador/diagnostico">
                <Sparkles size={14} />
                Realizar Diagnóstico Hawkins
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
              <Link href="/colaborador/formacion">Continuar Formación</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mood Check-In Widget (from Lovable) */}
      <Card className="border-teal/20 bg-teal/5 p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-base font-bold text-ink">
              ¿Cómo te sientes hoy?
            </h2>
            <p className="text-xs text-muted-text">
              Un momento de introspección para conectar contigo. Tu registro es privado e intransferible.
            </p>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-teal-deep">
            <ShieldCheck size={14} />
            <span>Privado</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => handleSelectMood(m.label)}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition-all ${
                selectedMood === m.label
                  ? 'border-teal bg-white shadow-sm ring-2 ring-teal/30'
                  : 'border-line bg-white hover:border-teal/30'
              }`}
            >
              <m.icon size={24} className={m.color} />
              <span className="text-xs font-medium text-ink">{m.label}</span>
            </button>
          ))}
        </div>

        {moodSaved && (
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700">
            <CheckCircle2 size={14} />
            <span>Registro guardado en tu historial personal: &ldquo;{selectedMood}&rdquo;</span>
          </div>
        )}
      </Card>

      {/* Active Workshops for Collaborator */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-ink">
            Tus Talleres Asignados
          </h2>
          <Link href="/colaborador/formacion" className="text-xs font-semibold text-teal hover:underline">
            Ver todas las lecciones
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {workshops.map((w, idx) => (
            <Card key={w.id} className="flex flex-col p-6 hover:shadow-card transition-shadow">
              <div className="flex items-center justify-between">
                <Badge variant={w.color === 'orange' ? 'orange' : w.color === 'teal' ? 'teal' : 'navy'}>
                  {w.tag}
                </Badge>
                <span className="font-mono text-xs text-muted-text">{w.lessons.length} lecciones</span>
              </div>

              <h3 className="mt-4 font-display text-base font-bold text-ink">
                {w.title}
              </h3>
              <p className="mt-1 text-xs text-muted-text flex-1">
                {w.subtitle}
              </p>

              {/* Progress bar */}
              <div className="mt-5 space-y-1.5 border-t border-line pt-4">
                <div className="flex justify-between text-[11px] text-muted-text">
                  <span>Progreso</span>
                  <span className="font-mono font-semibold">{idx === 0 ? '33%' : '0%'}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
                  <div
                    className="h-full bg-teal transition-all"
                    style={{ width: idx === 0 ? '33%' : '0%' }}
                  />
                </div>
              </div>

              <div className="mt-5">
                <Button asChild size="sm" className="w-full">
                  <Link href={`/colaborador/formacion?taller=${w.id}`}>
                    {idx === 0 ? 'Continuar Lección' : 'Iniciar Taller'}
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
