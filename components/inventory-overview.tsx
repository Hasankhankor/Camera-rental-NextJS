"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useProductStore } from "@/lib/product-store"
import { useBookingStore } from "@/lib/booking-store"
import { db, initDb } from "@/lib/db"

interface CategoryStats {
  name: string
  total: number
  available: number
  rented: number
}

export function InventoryOverview() {
  const [mounted, setMounted] = useState(false)
  const [categoryData, setCategoryData] = useState<CategoryStats[]>([])
  const { products, init: initProducts } = useProductStore()
  const bookings = useBookingStore(state => state.bookings)

  useEffect(() => {
    const initData = async () => {
      await Promise.all([initProducts(), initDb()])
      setMounted(true)
    }
    initData()
  }, [initProducts])

  useEffect(() => {
    if (!mounted) return

    // Get unique categories
    const categories = [...new Set(products.map(p => p.category))]

    // Calculate stats for each category
    const stats = categories.map(category => {
      const categoryProducts = products.filter(p => p.category === category)
      const total = categoryProducts.length
      const available = categoryProducts.filter(p => p.status === "available").length

      // Count currently active rentals in this category
      const rented = bookings.filter(booking => {
        const product = products.find(p => p.id === booking.productId)
        return product?.category === category && booking.status === "active"
      }).length

      return {
        name: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize first letter
        total,
        available,
        rented
      }
    })

    // Sort by total items descending
    stats.sort((a, b) => b.total - a.total)
    setCategoryData(stats)
  }, [mounted, products, bookings])

  if (!mounted) return null

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer>
        <BarChart data={categoryData}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      title={payload[0].payload.name}
                      content={[
                        { label: "Total", value: payload[0].payload.total },
                        { label: "Available", value: payload[0].payload.available },
                        { label: "Rented", value: payload[0].payload.rented },
                      ]}
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Bar
            dataKey="available"
            fill="#16a34a"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="rented"
            fill="#f97316"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
