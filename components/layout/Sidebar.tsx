'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Users,
  BookOpen,
  HeartHandshake,
  ShoppingBag,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  CreditCard,
  MessageSquare,
  KeyRound,
  X,
  type LucideIcon,
} from 'lucide-react'
import { Logo3be } from '@/components/shared/Logo3be'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/types/database'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: string
  external?: boolean
  section?: string
}

interface SidebarProps {
  role?: UserRole
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({
  role = 'admin_tenant',
  isOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname()

  // Navigation items per role
  const getNavItems = (): NavItem[] => {
    switch (role) {
      case 'superadmin':
        return [
          { label: 'Vista Global', href: '/admin', icon: LayoutDashboard, section: 'PANEL 3BE' },
          { label: 'Empresas Clientes', href: '/admin/empresas', icon: Building2 },
          { label: 'Licencias & Facturación', href: '/admin/licencias', icon: KeyRound },
          { label: 'Catálogo de Talleres', href: '/catalogo', icon: ShoppingBag, section: 'EXPLORA', external: true },
        ]

      case 'admin_tenant':
      case 'rrhh':
      case 'directivo':
        return [
          { label: 'Vista General', href: '/empresa', icon: LayoutDashboard, section: 'ORGANIZACIÓN' },
          { label: 'Indicadores & Clima', href: '/empresa/indicadores', icon: BarChart3 },
          { label: 'Buzón Anónimo', href: '/empresa/buzon', icon: MessageSquare },
          { label: 'Licencias de Equipo', href: '/empresa/licencias', icon: KeyRound },
          { label: 'Facturación', href: '/empresa/facturacion', icon: CreditCard },
          { label: 'Mi Espacio Personal', href: '/colaborador', icon: HeartHandshake, section: 'MI APRENDIZAJE' },
          { label: 'Diagnóstico Emocional', href: '/colaborador/diagnostico', icon: Sparkles },
          { label: 'Mis Talleres', href: '/colaborador/formacion', icon: BookOpen },
          { label: 'Catálogo de Talleres', href: '/catalogo', icon: ShoppingBag, section: 'TIENDA', external: true },
        ]

      case 'cliente_b2c':
        return [
          { label: 'Mis Talleres', href: '/b2c/mis-talleres', icon: BookOpen, section: 'MI CUENTA' },
          { label: 'Diagnóstico Personal', href: '/colaborador/diagnostico', icon: Sparkles },
          { label: 'Catálogo de Talleres', href: '/catalogo', icon: ShoppingBag, section: 'TIENDA', external: true },
        ]

      case 'colaborador':
      default:
        return [
          { label: 'Mi Espacio', href: '/colaborador', icon: LayoutDashboard, section: 'TU ESPACIO' },
          { label: 'Diagnóstico Anónimo', href: '/colaborador/diagnostico', icon: Sparkles, badge: '50 P' },
          { label: 'Mis Talleres', href: '/colaborador/formacion', icon: BookOpen },
          { label: 'Mi Progreso', href: '/colaborador/progreso', icon: HeartHandshake },
          { label: 'Catálogo Público', href: '/catalogo', icon: ShoppingBag, section: 'EXPLORA', external: true },
        ]
    }
  }

  const items = getNavItems()

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-navy p-5 text-white transition-transform duration-200 lg:translate-x-0',
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        )}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6">
          <Logo3be variant="light" href="/" />
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto pr-1">
          <nav className="flex flex-col gap-1">
            {items.map((item, idx) => {
              const isActive = pathname === item.href
              const prevItem = items[idx - 1]
              const showSection = item.section && item.section !== prevItem?.section

              return (
                <div key={item.href}>
                  {showSection && (
                    <div className="mt-5 mb-2 px-3 font-mono text-[9px] font-bold tracking-[0.2em] text-sky/70 uppercase">
                      {item.section}
                    </div>
                  )}

                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-150',
                      isActive
                        ? 'bg-gradient-to-r from-orange to-orange-deep font-semibold text-white shadow-md'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <item.icon
                      size={18}
                      className={cn(
                        'transition-transform duration-150 group-hover:scale-105',
                        isActive ? 'text-white' : 'text-teal'
                      )}
                    />
                    <span className="flex-1 truncate">{item.label}</span>

                    {item.badge && (
                      <span className="rounded-md bg-white/20 px-1.5 py-0.5 font-mono text-[9px] font-bold">
                        {item.badge}
                      </span>
                    )}

                    {item.external && (
                      <ArrowUpRight
                        size={14}
                        className="text-white/40 group-hover:text-white"
                      />
                    )}
                  </Link>
                </div>
              )
            })}
          </nav>
        </div>

        {/* Privacy badge and footer */}
        <div className="mt-auto border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-sky">
            <ShieldCheck size={16} className="text-teal" />
            <span>Tu privacidad primero</span>
          </div>
          <p className="mt-1 text-[10px] leading-relaxed text-white/60">
            Respuestas seudonimizadas y protegidas bajo estricto aislamiento.
          </p>
          <div className="mt-4 font-mono text-[8.5px] tracking-wider text-white/30 uppercase">
            3be Consulting © 2026
          </div>
        </div>
      </aside>
    </>
  )
}
