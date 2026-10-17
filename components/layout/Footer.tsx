import React from 'react'
import Link from 'next/link'
import { Logo3be } from '@/components/shared/Logo3be'

export function Footer() {
  return (
    <footer className="border-t border-line bg-white py-12 text-xs text-muted-text">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <Logo3be showTagline={true} />

        <div className="flex flex-wrap items-center gap-6 text-xs">
          <Link href="/catalogo" className="hover:text-ink transition-colors">
            Catálogo de Talleres
          </Link>
          <Link href="/login" className="hover:text-ink transition-colors">
            Acceso Empresas
          </Link>
          <span className="font-mono text-[10px]">Ley 1581 / Confidencialidad</span>
        </div>

        <div className="font-mono text-[10px] text-muted-text/80">
          3be Consulting © 2026 · Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
