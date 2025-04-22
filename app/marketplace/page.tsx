"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"
import { Filter, type FilterState } from "@/components/filter"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function MarketplacePage() {
  const [filters, setFilters] = useState<FilterState | undefined>(undefined)

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/">
              <span className="text-primary">Capture</span>Cart
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-sm font-medium">
              Marketplace
            </Link>
            <Link href="/login" className="text-sm font-medium">
              Rent
            </Link>
            <Link href="/login" className="text-sm font-medium">
              How It Works
            </Link>
            <Link href="/login" className="text-sm font-medium">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/marketplace/list-equipment">
              <Button variant="outline">List Equipment</Button>
            </Link>
            <Link href="/marketplace/account">
              <Button>My Account</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Available products for rent</h1>
          <div className="flex gap-4">
            <Filter onFilterChange={handleFilterChange} />
          </div>
        </div>

        <ProductGrid filters={filters} />
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 CaptureCart. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
