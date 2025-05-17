"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { useBookingStore } from "@/lib/booking-store"
import { useUserStore } from "@/lib/user-store"
import { useProductStore } from "@/lib/product-store"
import { format, isBefore, addDays } from "date-fns"
import { db, initDb } from "@/lib/db"

interface UpcomingReturn {
  id: string
  equipment: string
  customer: string
  dueDate: string
  dueTime: string
  status: "on-time" | "late"
}

export function UpcomingReturns() {
  const [mounted, setMounted] = useState(false)
  const [upcomingReturns, setUpcomingReturns] = useState<UpcomingReturn[]>([])
  const bookings = useBookingStore(state => state.bookings)
  const { products, init: initProducts } = useProductStore()
  const { users } = useUserStore()

  useEffect(() => {
    const initData = async () => {
      await Promise.all([initProducts(), initDb()])
      setMounted(true)
    }
    initData()
  }, [initProducts])

  useEffect(() => {
    if (!mounted) return

    const now = new Date()
    const next7Days = addDays(now, 7)

    // Get active bookings that are due in the next 7 days
    const activeReturns = bookings
      .filter(booking => {
        if (booking.status !== "active") return false
        const dueDate = new Date(booking.endDate)
        return dueDate <= next7Days
      })
      .map(booking => {
        const product = products.find(p => p.id === booking.productId)
        const customer = users.find(u => u.id === booking.customerId)
        const dueDate = new Date(booking.endDate)
        const isLate = isBefore(dueDate, now)

        return {
          id: booking.id,
          equipment: product?.name || "Unknown Equipment",
          customer: customer ? `${customer.firstName} ${customer.lastName}` : booking.customerName,
          dueDate: format(dueDate, "MMM dd, yyyy"),
          dueTime: format(dueDate, "h:mm a"),
          status: isLate ? "late" as const : "on-time" as const
        } satisfies UpcomingReturn
      })
      .sort((a, b) => {
        // Sort by status (late first) then by date
        if (a.status === "late" && b.status !== "late") return -1
        if (a.status !== "late" && b.status === "late") return 1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
      .slice(0, 5) // Show only the 5 most urgent returns

    setUpcomingReturns(activeReturns)
  }, [mounted, bookings, products, users])

  if (!mounted) return null

  return (
    <div className="space-y-4">
      {upcomingReturns.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No upcoming returns in the next 7 days
        </p>
      ) : (
        upcomingReturns.map((item) => (
          <div key={item.id} className="flex flex-col space-y-2 rounded-md border p-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{item.equipment}</h4>
              <Badge variant={item.status === "on-time" ? "outline" : "destructive"}>
                {item.status === "on-time" ? "On Time" : "Late"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{item.customer}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{item.dueDate}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{item.dueTime}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
