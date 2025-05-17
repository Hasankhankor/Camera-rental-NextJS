"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useBookingStore } from "@/lib/booking-store"
import { useUserStore } from "@/lib/user-store"
import { db, initDb } from "@/lib/db"

export function RecentBookings() {
  const bookingStore = useBookingStore()
  const { users } = useUserStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      await initDb()
      setMounted(true)
    }
    loadData()
  }, [])

  if (!mounted) {
    return null
  }

  // Get most recent 5 bookings, sorted by creation date
  const recentBookings = [...(bookingStore.bookings || [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-4">
      {recentBookings.map((booking) => {
        const customer = users.find(u => u.id === booking.customerId)
        const initials = customer
          ? `${customer.firstName[0]}${customer.lastName[0]}`
          : booking.customerName.split(" ").map(n => n[0]).join("")

        return (
          <div key={booking.id} className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={customer?.avatar || "/placeholder.svg"}
                alt={booking.customerName}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{booking.customerName}</p>
              <p className="text-sm text-muted-foreground">{booking.productName}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  booking.status === "active" || booking.status === "confirmed"
                    ? "default"
                    : booking.status === "completed"
                    ? "secondary"
                    : booking.status === "cancelled"
                    ? "destructive"
                    : "outline"
                }
              >
                {booking.status}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
