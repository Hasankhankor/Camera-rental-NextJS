"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useProductStore } from "@/lib/product-store"
import { useBookingStore } from "@/lib/booking-store"
import { db, initDb } from "@/lib/db"

interface MonthlyStats {
  name: string
  utilization: number
  availability: number
}

export function InventoryStats() {
  const [mounted, setMounted] = useState(false)
  const [monthlyData, setMonthlyData] = useState<MonthlyStats[]>([])
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

    // Get last 12 months
    const months = Array.from({ length: 12 }, (_, i) => {
      const d = new Date()
      d.setMonth(d.getMonth() - (11 - i))
      return {
        name: d.toLocaleString('default', { month: 'short' }),
        date: d
      }
    })

    // Calculate utilization for each month
    const stats = months.map(({ name, date }) => {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      // Count active bookings in this month
      const monthlyBookings = bookings.filter(booking => {
        const bookingStart = new Date(booking.startDate)
        const bookingEnd = new Date(booking.endDate)
        return bookingStart <= monthEnd && bookingEnd >= monthStart &&
               (booking.status === "active" || booking.status === "completed")
      })

      // Calculate utilization percentage
      const totalProducts = products.length
      const activeProducts = monthlyBookings.length
      const utilization = totalProducts > 0 ? (activeProducts / totalProducts) * 100 : 0

      // Calculate availability percentage
      const availableProducts = products.filter(p => p.status === "available").length
      const availability = totalProducts > 0 ? (availableProducts / totalProducts) * 100 : 0

      return {
        name,
        utilization: Math.round(utilization),
        availability: Math.round(availability)
      }
    })

    setMonthlyData(stats)
  }, [mounted, products, bookings])

  if (!mounted) return null

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={monthlyData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <ChartTooltip>
                  <ChartTooltipContent
                    title={payload[0].payload.name}
                    content={[
                      { label: "Utilization", value: `${payload[0].value}%` },
                      { label: "Availability", value: `${payload[1].value}%` },
                    ]}
                  />
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="utilization" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="availability" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
