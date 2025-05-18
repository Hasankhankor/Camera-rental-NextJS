'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUserStore } from '@/lib/user-store'

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isLoggedIn } = useUserStore()

  useEffect(() => {
    // Allow access to marketplace home without login
    if (pathname === '/marketplace') return

    // Require login for all other marketplace routes
    if (!isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, router, pathname])

  // Remove the custom wrapper so ClientLayout (with MainHeader) is used
  return children
}