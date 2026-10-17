'use client'

import React, { createContext, useContext, useState } from 'react'
import type { UserRole } from '@/types/database'

interface AppContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  tenantName: string
  setTenantName: (name: string) => void
}

const AppContext = createContext<AppContextType>({
  role: 'admin_tenant',
  setRole: () => {},
  tenantName: 'Empresa Cliente',
  setTenantName: () => {},
})

export function useApp() {
  return useContext(AppContext)
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('admin_tenant')
  const [tenantName, setTenantName] = useState('Acme Corp / 3be Demo')

  return (
    <AppContext.Provider value={{ role, setRole, tenantName, setTenantName }}>
      {children}
    </AppContext.Provider>
  )
}
