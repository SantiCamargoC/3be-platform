'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Menu,
  ChevronRight,
  LogOut,
  User,
  ShoppingBag,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import type { UserRole } from '@/types/database'

interface HeaderProps {
  onOpenMobileSidebar?: () => void
  currentRole?: UserRole
  onRoleChange?: (role: UserRole) => void
  userName?: string
  tenantName?: string
}

export function Header({
  onOpenMobileSidebar,
  currentRole = 'admin_tenant',
  onRoleChange,
  userName = 'Usuario Demo',
  tenantName = 'Empresa Cliente',
}: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const roleLabels: Record<UserRole, string> = {
    superadmin: 'Superadmin 3be',
    admin_tenant: 'Admin Empresa',
    rrhh: 'Talento Humano',
    directivo: 'Directivo / Líder',
    colaborador: 'Colaborador',
    cliente_b2c: 'Cliente B2C',
  }

  return (
    <header className="sticky top-0 z-30 flex h-18 w-full items-center justify-between border-b border-line bg-white/95 px-6 backdrop-blur-xs lg:px-10">
      {/* Left: Mobile trigger & breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="rounded-lg p-2 text-ink hover:bg-black/5 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2 text-xs text-muted-text">
          <span className="font-semibold text-ink">{tenantName}</span>
          <ChevronRight size={13} className="text-muted-text/60" />
          <Badge variant="teal">{roleLabels[currentRole]}</Badge>
        </div>
      </div>

      {/* Right: Role preview switcher, store link, and user profile */}
      <div className="flex items-center gap-3">
        {/* Role switcher for rapid previewing during evaluation */}
        {onRoleChange && (
          <div className="hidden items-center gap-1.5 sm:flex">
            <span className="font-mono text-[9px] uppercase text-muted-text">
              Ver como:
            </span>
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="h-8 rounded-lg border border-line bg-surface px-2 font-mono text-[11px] text-ink outline-none focus:border-teal"
            >
              <option value="admin_tenant">Admin Empresa</option>
              <option value="rrhh">Talento Humano</option>
              <option value="colaborador">Colaborador</option>
              <option value="superadmin">Superadmin</option>
              <option value="cliente_b2c">Cliente B2C</option>
            </select>
          </div>
        )}

        <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
          <Link href="/catalogo">
            <ShoppingBag size={14} className="text-orange" />
            Catálogo
          </Link>
        </Button>

        {/* User avatar and logout */}
        <div className="flex items-center gap-2 border-l border-line pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange to-orange-deep font-display text-xs font-bold text-white shadow-xs">
            {userName.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="rounded-lg p-2 text-muted-text hover:bg-black/5 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
