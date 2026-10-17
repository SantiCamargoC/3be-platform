'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { workshops, type Workshop, type Lesson } from '@/lib/data/workshops'
import {
  Play,
  CheckCircle2,
  BookOpen,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Save,
} from 'lucide-react'

export default function FormacionPage() {
  const [currentWorkshop, setCurrentWorkshop] = useState<Workshop>(workshops[0])
  const [currentLesson, setCurrentLesson] = useState<Lesson>(workshops[0].lessons[0])
  const [notes, setNotes] = useState<Record<string, string>>({
    'l1-1': 'Comprender que las creencias limitantes se forman en los primeros 7 años de vida. Reconfigurar a través del estado alpha.',
  })
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({
    'l1-1': true,
  })
  const [savedNotification, setSavedNotification] = useState(false)

  const handleSaveNotes = () => {
    setSavedNotification(true)
    setTimeout(() => setSavedNotification(false), 2000)
  }

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }))
  }

  return (
    <div className="space-y-8">
      {/* Workshop Navigation Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
        <div>
          <span className="eyebrow">AULA VIRTUAL 3BE</span>
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl text-ink">
            {currentWorkshop.title}
          </h1>
          <p className="text-xs text-muted-text mt-0.5">
            {currentWorkshop.subtitle}
          </p>
        </div>

        {/* Workshop switcher */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {workshops.map((w, idx) => (
            <button
              key={w.id}
              onClick={() => {
                setCurrentWorkshop(w)
                setCurrentLesson(w.lessons[0])
              }}
              className={`rounded-xl px-3 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                currentWorkshop.id === w.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-white border border-line text-muted-text hover:text-ink'
              }`}
            >
              Taller 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Classroom Layout: Player on Left, Playlist on Right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Video Player & Notes Area */}
        <div className="space-y-6 lg:col-span-8">
          {/* Protected Video Container */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-navy text-white shadow-card flex flex-col items-center justify-center p-8 text-center">
            {/* Ambient background decoration */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            <div className="relative z-10 max-w-md space-y-4">
              <span className="inline-block rounded-full bg-orange/20 px-3 py-1 font-mono text-[10px] font-bold text-orange uppercase tracking-wider">
                LECCIÓN {currentLesson.numero} DE {currentWorkshop.lessons.length}
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold leading-tight">
                {currentLesson.titulo}
              </h2>

              <div className="flex items-center justify-center gap-4 text-xs text-white/70">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {currentLesson.duracionMin} minutos
                </span>
                <span>·</span>
                <span className="capitalize">{currentLesson.tipo}</span>
              </div>

              {/* Play Button Simulation */}
              <button className="group mt-2 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange to-orange-deep text-white shadow-lg transition-transform hover:scale-105 active:scale-95">
                <Play size={24} className="ml-1 fill-white" />
              </button>

              <p className="text-[11px] text-white/50">
                Reproducción de video protegida mediante streaming seguro 3be
              </p>
            </div>
          </div>

          {/* Controls below video */}
          <div className="flex items-center justify-between rounded-xl border border-line bg-white p-4">
            <button
              onClick={() => toggleLessonCompleted(currentLesson.id)}
              className="flex items-center gap-2 text-xs font-semibold text-ink hover:text-teal transition-colors"
            >
              <CheckCircle2
                size={18}
                className={
                  completedLessons[currentLesson.id]
                    ? 'text-emerald-600 fill-emerald-100'
                    : 'text-line'
                }
              />
              <span>
                {completedLessons[currentLesson.id]
                  ? 'Lección marcada como completada'
                  : 'Marcar lección como vista'}
              </span>
            </button>

            <span className="font-mono text-xs text-muted-text">
              {currentLesson.duracionMin} min
            </span>
          </div>

          {/* Personal Notebook (notas_usuario) */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-teal" />
                <h3 className="font-display text-sm font-bold text-ink">
                  Mis Notas Personales de esta Lección
                </h3>
              </div>
              {savedNotification && (
                <span className="text-xs font-semibold text-emerald-600">
                  ¡Notas guardadas!
                </span>
              )}
            </div>

            <textarea
              rows={4}
              value={notes[currentLesson.id] || ''}
              onChange={(e) =>
                setNotes((prev) => ({
                  ...prev,
                  [currentLesson.id]: e.target.value,
                }))
              }
              placeholder="Escribe aquí tus reflexiones, tomas de consciencia o preguntas para llevar a la práctica..."
              className="w-full rounded-xl border border-line bg-surface p-4 text-xs text-ink leading-relaxed placeholder:text-muted-text focus:border-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal/20 transition-all"
            />

            <div className="mt-3 flex justify-end">
              <Button size="sm" onClick={handleSaveNotes}>
                <Save size={14} />
                Guardar Notas
              </Button>
            </div>
          </Card>
        </div>

        {/* Right: Lesson Playlist */}
        <div className="space-y-4 lg:col-span-4">
          <Card className="p-4">
            <div className="p-2 border-b border-line pb-3">
              <h3 className="font-display text-sm font-bold text-ink">
                Temario del Taller ({currentWorkshop.lessons.length} Lecciones)
              </h3>
              <p className="text-[11px] text-muted-text mt-0.5">
                Avanza a tu propio ritmo
              </p>
            </div>

            <div className="mt-3 space-y-1.5">
              {currentWorkshop.lessons.map((lesson) => {
                const isSelected = currentLesson.id === lesson.id
                const isDone = completedLessons[lesson.id]

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(lesson)}
                    className={`flex w-full items-center justify-between rounded-xl p-3 text-left transition-all ${
                      isSelected
                        ? 'border border-teal/40 bg-teal/10 font-bold text-ink'
                        : 'border border-transparent bg-surface hover:bg-black/5 text-muted-text hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-mono font-bold flex-none ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-700'
                            : isSelected
                            ? 'bg-teal text-white'
                            : 'bg-white text-muted-text border border-line'
                        }`}
                      >
                        {lesson.numero}
                      </div>
                      <span className="text-xs truncate">{lesson.titulo}</span>
                    </div>

                    <span className="font-mono text-[10px] opacity-70 flex-none ml-2">
                      {lesson.duracionMin}m
                    </span>
                  </button>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
