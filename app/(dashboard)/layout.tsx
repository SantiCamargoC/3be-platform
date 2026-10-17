'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { useApp } from '@/app/providers'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { role, setRole, tenantName } = useApp()

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Dynamic responsive sidebar */}
      <Sidebar
        role={role}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-[260px]">
        <Header
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          currentRole={role}
          onRoleChange={setRole}
          tenantName={tenantName}
        />

        <main className="flex-1 p-6 lg:p-10">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
