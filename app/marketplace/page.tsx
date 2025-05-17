"use client"

import { useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { Filter, type FilterState } from "@/components/filter"

export default function MarketplacePage() {
  const [filters, setFilters] = useState<FilterState | undefined>(undefined)

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container py-6">
        <div className="mb-8">
          <Filter onFilterChange={handleFilterChange} />
        </div>
        <ProductGrid filters={filters} />
      </div>
    </div>
  )
}
