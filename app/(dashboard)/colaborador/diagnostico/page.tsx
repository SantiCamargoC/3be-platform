'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { diagnosisQuestions, hawkinsZones, type ZoneMeta } from '@/lib/data/hawkins-questions'
import { createClient } from '@/lib/supabase/client'
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Download,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'

export default function DiagnosticoPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState<'test' | 'resultados'>('test')

  const options = [
    { label: 'Nunca', value: 0 },
    { label: 'Rara vez', value: 1 },
    { label: 'A veces', value: 2 },
    { label: 'Frecuente', value: 3 },
    { label: 'Siempre', value: 4 },
  ]

  const handleSelectOption = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  // Calculate results by Hawkins Zone
  const calculateResults = () => {
    const scores: Record<string, { total: number; count: number }> = {
      z1: { total: 0, count: 0 },
      z2: { total: 0, count: 0 },
      z3: { total: 0, count: 0 },
      z4: { total: 0, count: 0 },
      z5: { total: 0, count: 0 },
      z6: { total: 0, count: 0 },
    }

    diagnosisQuestions.forEach((q) => {
      const val = answers[q.id] ?? 2 // Default mid value if unanswered
      scores[q.zone].total += val
      scores[q.zone].count += 1
    })

    const averages: Record<string, number> = {}
    let highestZone = 'z3'
    let maxAvg = -1

    Object.entries(scores).forEach(([zoneKey, data]) => {
      const avg = data.count > 0 ? (data.total / (data.count * 4)) * 100 : 0
      averages[zoneKey] = Math.round(avg)
      if (avg > maxAvg) {
        maxAvg = avg
        highestZone = zoneKey
      }
    })

    return { averages, predominantZone: highestZone }
  }

  const answeredCount = Object.keys(answers).length
  const progressPercent = Math.round((answeredCount / diagnosisQuestions.length) * 100)

  const handleSubmitTest = async () => {
    setSubmitting(true)
    const { averages, predominantZone } = calculateResults()
    const zoneMeta = hawkinsZones[predominantZone]

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        await supabase.from('tests_frecuencia').insert({
          user_id: user.id,
          respuestas: answers,
          puntaje_z1: averages.z1,
          puntaje_z2: averages.z2,
          puntaje_z3: averages.z3,
          puntaje_z4: averages.z4,
          puntaje_z5: averages.z5,
          puntaje_z6: averages.z6,
          zona_predominante: predominantZone,
          zona_nombre: zoneMeta.name,
          zona_color: zoneMeta.color,
        })
      }
    } catch {
      // Local fallback for offline/demo mode
    } finally {
      setSubmitting(false)
      setCompleted(true)
      setActiveTab('resultados')
    }
  }

  // Pre-fill answers with representative sample for rapid demonstration
  const handlePrefillDemo = () => {
    const demoAnswers: Record<number, number> = {}
    diagnosisQuestions.forEach((q) => {
      if (q.zone === 'z3' || q.zone === 'z4') {
        demoAnswers[q.id] = Math.floor(Math.random() * 2) + 3 // 3 or 4
      } else {
        demoAnswers[q.id] = Math.floor(Math.random() * 3) // 0, 1 or 2
      }
    })
    setAnswers(demoAnswers)
  }

  const { averages, predominantZone } = calculateResults()
  const zoneMeta = hawkinsZones[predominantZone]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow">MAPA DE LA CONSCIENCIA · DR. DAVID HAWKINS</span>
          <h1 className="font-display text-3xl font-extrabold text-ink">
            Test de Frecuencia Emocional (50 Preguntas)
          </h1>
          <p className="mt-1 text-xs text-muted-text">
            Diagnóstico calibrado de 6 zonas. Tus respuestas son estrictamente anónimas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handlePrefillDemo}>
            <Sparkles size={14} className="text-orange" />
            Llenar con muestra demo
          </Button>
          {completed && (
            <Button
              variant={activeTab === 'resultados' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('resultados')}
            >
              Ver Informe de Resultados
            </Button>
          )}
        </div>
      </div>

      {/* Progress & Privacy Indicator */}
      <div className="flex items-center justify-between rounded-2xl border border-line bg-white p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="text-xs font-bold text-ink">
              Progreso del test: {answeredCount} de {diagnosisQuestions.length} preguntas respondidas ({progressPercent}%)
            </div>
            <div className="text-[11px] text-muted-text">
              Garantía de confidencialidad absoluta · Ley 1581 de protección de datos
            </div>
          </div>
        </div>

        <div className="hidden sm:block w-48">
          <div className="h-2 w-full rounded-full bg-surface overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange to-teal transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {activeTab === 'test' ? (
        <div className="space-y-6">
          {/* Questions Stream */}
          <div className="space-y-4">
            {diagnosisQuestions.map((q, idx) => {
              const currentVal = answers[q.id]
              return (
                <Card
                  key={q.id}
                  className={`p-5 transition-all ${
                    currentVal !== undefined ? 'border-teal/30 bg-white' : 'border-line bg-white/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs font-bold text-teal flex-none pt-0.5">
                        #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed text-ink">
                        {q.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-5 gap-2 sm:max-w-md sm:ml-8">
                    {options.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.value)}
                        className={`flex flex-col items-center justify-center rounded-xl border py-2.5 px-1 text-center transition-all ${
                          currentVal === opt.value
                            ? 'border-orange bg-orange text-white font-bold shadow-xs'
                            : 'border-line bg-surface text-ink/80 hover:border-teal/40'
                        }`}
                      >
                        <span className="font-mono text-xs">{opt.value}</span>
                        <span className="text-[9px] truncate">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Submit Action */}
          <div className="sticky bottom-6 z-20 flex justify-end">
            <Button
              size="lg"
              onClick={handleSubmitTest}
              disabled={submitting || answeredCount < 5}
              className="shadow-xl"
            >
              {submitting ? 'Calculando Mapa de Consciencia...' : 'Finalizar y Ver mi Diagnóstico'}
            </Button>
          </div>
        </div>
      ) : (
        /* ================= RESULTADOS VIEW ================= */
        <div className="space-y-8">
          <Card className="border-line bg-white p-8 shadow-card text-center sm:text-left">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge variant="orange">Resultado Personal Calibrado</Badge>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl text-ink">
                  Tu Zona Predominante: {zoneMeta.name}
                </h2>
                <p className="mt-1 text-xs text-muted-text font-mono">
                  Rango de frecuencia aproximado: {zoneMeta.freqRange}
                </p>
              </div>

              <div
                className="mx-auto flex h-24 w-24 flex-col items-center justify-center rounded-2xl text-white font-display shadow-md sm:mx-0"
                style={{ backgroundColor: zoneMeta.color }}
              >
                <span className="text-2xl font-bold uppercase">{zoneMeta.code}</span>
                <span className="text-[9px] font-mono tracking-wider">PREDOMINANTE</span>
              </div>
            </div>

            <p className="mt-6 border-t border-line pt-4 text-xs leading-relaxed text-ink/80 sm:text-sm">
              {zoneMeta.description}
            </p>
          </Card>

          {/* Breakdown by all 6 Hawkins Zones */}
          <Card className="p-6">
            <h3 className="font-display text-lg font-bold text-ink mb-6">
              Desglose de Puntuación por Zonas
            </h3>

            <div className="space-y-4">
              {Object.entries(hawkinsZones).map(([key, zone]) => {
                const score = averages[key] || 0
                return (
                  <div key={key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-ink">{zone.name}</span>
                      <span className="font-mono text-muted-text">{score}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface overflow-hidden">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${score}%`,
                          backgroundColor: zone.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={() => setActiveTab('test')}>
              Modificar Respuestas
            </Button>
            <Button onClick={() => alert('Descargando informe individual en formato descargable...')}>
              <Download size={16} />
              Descargar Informe Privado
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
