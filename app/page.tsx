'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Orbit,
  Compass,
} from 'lucide-react'
import { Logo3be } from '@/components/shared/Logo3be'
import { Triquetra } from '@/components/shared/Triquetra'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { workshops } from '@/lib/data/workshops'
import { formatCOP } from '@/lib/utils'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  const stats = [
    { value: '400%', label: 'ROI de inversión en bienestar', sub: 'Retorno x4 según estudios HCM' },
    { value: '46%', label: 'Índice de burnout prevenible', sub: 'Reducción tras diagnóstico temprano' },
    { value: '80%', label: 'Estrés laboral mitigado', sub: 'Canal anónimo seguro para el equipo' },
    { value: '50', label: 'Preguntas Mapa de Consciencia', sub: 'Diagnóstico basado en Dr. David Hawkins' },
  ]

  const icons = [Orbit, Compass, Sparkles]

  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <Logo3be />

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#diagnostico" className="text-xs font-medium text-muted-text hover:text-ink">
              Diagnóstico Anónimo
            </Link>
            <Link href="#talleres" className="text-xs font-medium text-muted-text hover:text-ink">
              Talleres
            </Link>
            <Link href="#analitica" className="text-xs font-medium text-muted-text hover:text-ink">
              Analítica RRHH
            </Link>
            <Link href="/catalogo" className="text-xs font-medium text-muted-text hover:text-ink">
              Catálogo
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Acceso Clientes</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/login?mode=demo">Probar Demo</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-6 py-20 lg:py-28">
        {/* Triquetra ambient watermark */}
        <div className="pointer-events-none absolute right-[-50px] top-[-50px] text-navy/4 select-none">
          <Triquetra size={500} strokeWidth={2} />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-4 py-1 text-xs font-semibold text-teal-deep">
            <Sparkles size={14} className="text-teal" />
            <span>Transformamos el SER · Potenciamos el HACER</span>
          </div>

          <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Llevamos a <span className="text-orange">CEOs, equipos</span> y{' '}
            <span className="text-teal">organizaciones</span> a otro nivel.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-text sm:text-lg">
            Sistema integrado de <strong>diagnóstico anónimo</strong> de cultura y salud emocional,{' '}
            <strong>formación online por video</strong> y <strong>analítica en tiempo real</strong> para líderes de Talento Humano. Sin conferencias pasivas. Con impacto medible.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/login">
                Explorar Plataforma Demo
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/catalogo">Ver Catálogo de Talleres</Link>
            </Button>
          </div>

          {/* Privacy badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-muted-text">
            <ShieldCheck size={16} className="text-teal" />
            <span>Anonimato estricto garantizado bajo la Ley 1581 (sin exposición individual de respuestas)</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-line bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <span className="eyebrow">EL IMPACTO INVISIBLE EN LAS PERSONAS</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
              Métricas reales que justifican la transformación
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <Card key={idx} className="border-line bg-white p-6 shadow-soft text-center">
                <div className="font-display text-4xl font-extrabold text-orange">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-semibold text-ink">
                  {s.label}
                </div>
                <div className="mt-1 text-xs text-muted-text">
                  {s.sub}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="talleres" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">PROGRAMA DE FORMACIÓN</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl">
                Tres talleres diseñados para cambiar realidades
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-text">
                24 lecciones con video en alta definición, reflexiones profundas y ejercicios prácticos de reprogramación subconsciente.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/catalogo">Explorar todo el catálogo</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {workshops.map((w, idx) => {
              const Icon = icons[idx]
              return (
                <Card
                  key={w.id}
                  className="flex flex-col overflow-hidden border-line bg-white p-0 shadow-soft hover:shadow-card transition-shadow"
                >
                  <div
                    className={`relative flex h-36 flex-col justify-between p-6 ${
                      w.color === 'orange'
                        ? 'bg-orange text-white'
                        : w.color === 'teal'
                        ? 'bg-teal text-white'
                        : 'bg-petrol text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold tracking-wider opacity-80 uppercase">
                        TALLER 0{idx + 1} · {w.tag}
                      </span>
                      <Icon size={24} className="opacity-70" />
                    </div>
                    <div className="font-display text-lg font-bold leading-tight">
                      {w.subtitle}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-base font-bold text-ink">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-text">
                      {w.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs font-mono text-muted-text">
                      <span>{w.lessons.length} lecciones</span>
                      <span>·</span>
                      <span>Video & Ejercicios</span>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                      <div>
                        <span className="block font-mono text-[10px] text-muted-text">Precio B2C</span>
                        <span className="font-display text-sm font-bold text-ink">
                          {formatCOP(w.priceCop)}
                        </span>
                      </div>
                      <Button asChild size="sm" variant={w.color === 'orange' ? 'primary' : 'teal'}>
                        <Link href={`/catalogo`}>Ver Taller</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Diagnosis Section */}
      <section id="diagnostico" className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="font-mono text-xs font-bold tracking-widest text-sky uppercase">
                DIAGNÓSTICO ANÓNIMO HAWKINS
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl leading-tight">
                El colaborador se expresa sin miedo. La empresa evoluciona con datos.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                La mayoría de las encuestas corporativas fracasan porque los empleados temen represalias. En 3be disociamos la identidad con hashes irreversibles. El panel directivo solo refleja métricas agregadas cuando hay al menos 5 respuestas registradas.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 text-teal flex-none" />
                  <p className="text-xs text-white/80">
                    <strong>50 preguntas calibradas:</strong> Mapeo en las 6 zonas de consciencia emocional y energía del equipo.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 text-teal flex-none" />
                  <p className="text-xs text-white/80">
                    <strong>Reporte individual privado:</strong> El colaborador ve su diagnóstico personal sin que su jefe lo conozca.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 text-teal flex-none" />
                  <p className="text-xs text-white/80">
                    <strong>Buzón anónimo seguro:</strong> Escucha activa de clima laboral con categorización por temas clave.
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <Button asChild variant="primary" size="lg">
                  <Link href="/colaborador/diagnostico">
                    Probar el Test de Hawkins
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Card className="w-full max-w-md border-white/10 bg-white/5 p-8 text-white backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange p-3 text-white">
                    <BrainCircuit size={28} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">Mapa de la Consciencia</h3>
                    <p className="text-xs text-sky">Dr. David R. Hawkins</p>
                  </div>
                </div>

                <div className="mt-6 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                    <span className="text-purple-300 font-semibold">Zona 6: Trascendencia & Paz</span>
                    <span className="text-white/60">500+ Hz</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                    <span className="text-teal font-semibold">Zona 5: Sabiduría & Razón</span>
                    <span className="text-white/60">400 Hz</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                    <span className="text-emerald-400 font-semibold">Zona 4: Aceptación & Armonía</span>
                    <span className="text-white/60">250 - 350 Hz</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-amber/30 bg-amber/10 p-3">
                    <span className="text-amber font-semibold">Zona 3: El Umbral (Coraje)</span>
                    <span className="text-amber">200 Hz</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                    <span className="text-orange font-semibold">Zona 2: Fuerza & Resistencia</span>
                    <span className="text-white/60">100 - 175 Hz</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                    <span className="text-red-400 font-semibold">Zona 1: Supervivencia Reactiva</span>
                    <span className="text-white/60">20 - 75 Hz</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
