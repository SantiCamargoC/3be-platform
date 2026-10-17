'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShieldCheck, MessageSquare, Filter, Lock } from 'lucide-react'

interface Comentario {
  id: string
  texto: string
  categoria: string
  fecha: string
}

export default function BuzonAnonimoPage() {
  const [comentarios, setComentarios] = useState<Comentario[]>([
    {
      id: 'c1',
      texto:
        'Siento que en las reuniones de los lunes hay poca apertura para decir cuando una meta no es realista. Estaría bien tener un espacio de debate sin temor a ser juzgados.',
      categoria: 'Seguridad Psicológica',
      fecha: 'Hace 2 días',
    },
    {
      id: 'c2',
      texto:
        'El taller de creencias limitantes me ayudó a entender por qué me costaba delegar. Ojalá podamos hacer sesiones grupales de conversación sobre el tema.',
      categoria: 'Formación & Cultura',
      fecha: 'Hace 4 días',
    },
    {
      id: 'c3',
      texto:
        'Sería muy valioso mejorar la claridad de los objetivos trimestrales para evitar retrabajo y sobrecarga a fin de mes.',
      categoria: 'Clima Laboral',
      fecha: 'Hace 1 semana',
    },
  ])

  return (
    <div className="space-y-8">
      <div>
        <span className="eyebrow">CANAL DE ESCUCHA ACTIVA</span>
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Buzón de Voz Anónimo
        </h1>
        <p className="mt-1 text-xs text-muted-text">
          Comentarios enviados por colaboradores con anonimato garantizado en base de datos (sin registro de remitente).
        </p>
      </div>

      {/* Security alert banner */}
      <div className="flex items-center gap-3 rounded-2xl border border-teal/20 bg-teal/10 p-5 text-xs text-teal-deep">
        <Lock size={20} className="text-teal flex-none" />
        <p>
          Este buzón almacena comentarios sin asociar ningún <code className="font-mono bg-teal/20 px-1 py-0.5 rounded">user_id</code>. Ni los directivos ni los administradores del sistema pueden conocer la identidad del autor.
        </p>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comentarios.map((c) => (
          <Card key={c.id} className="p-6 hover:border-teal/30 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <Badge variant="teal">{c.categoria}</Badge>
              <span className="font-mono text-[11px] text-muted-text">{c.fecha}</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink/90">
              &ldquo;{c.texto}&rdquo;
            </p>

            <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[11px] text-muted-text">
              <ShieldCheck size={14} className="text-teal" />
              <span>Remitente Anónimo Protegido</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
