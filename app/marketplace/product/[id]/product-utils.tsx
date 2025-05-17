'use client'

import type { Product } from "@/lib/db"

// Helper functions for the product page
export function validateBookingDates(selectedDates: { from?: Date; to?: Date }) {
  if (!selectedDates.from || !selectedDates.to) {
    return false
  }

  const now = new Date()
  now.setHours(0, 0, 0, 0)

  return selectedDates.from >= now && selectedDates.to >= selectedDates.from
}

export function formatBookingUrl(product: Product, start: Date, end: Date) {
  return `/marketplace/booking?${new URLSearchParams({
    productId: product.id,
    start: start.toISOString(),
    end: end.toISOString()
  }).toString()}`
}

interface LoadingStateProps {
  className?: string
}

export function ProductLoadingState({ className }: LoadingStateProps) {
  return (
    <div className={`container max-w-6xl py-6 ${className || ''}`}>
      <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-[400px] bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  )
}
