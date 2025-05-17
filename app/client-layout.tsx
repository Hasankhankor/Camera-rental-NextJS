'use client'

import { useEffect, useState } from 'react'
import { useUserStore } from '@/lib/user-store'
import { useProductStore } from '@/lib/product-store'
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { MainHeader } from '@/components/main-header'
import { initDb } from '@/lib/db'

export function ClientLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  const [mounted, setMounted] = useState(false)
  const initUser = useUserStore((state) => state.init)
  const initProducts = useProductStore((state) => state.init)

  useEffect(() => {
    const initialize = async () => {
      try {
        // First initialize the database
        await initDb()

        // Then initialize the stores sequentially
        await initUser()
        await initProducts()

        setMounted(true)
      } catch (error) {
        console.error('Failed to initialize:', error)
      }
    }

    initialize()
  }, [initUser, initProducts])

  if (!mounted) {
    return null
  }
  // Check if the current path is in the dashboard
  const isDashboard = typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard')

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <div className="relative w-full min-h-screen bg-background">
          {!isDashboard && <MainHeader />}
          <div className="mx-auto w-full max-w-[1400px]">
            {children}
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  )
}
