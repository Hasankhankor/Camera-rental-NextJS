"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { useUserStore } from "@/lib/user-store"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isLoggedIn, init } = useUserStore()

  useEffect(() => {
    init() // Initialize the user store
  }, [init])

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, router])

  // Don't render anything if not logged in
  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger className="flex md:hidden" />
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </div>
  )
}
