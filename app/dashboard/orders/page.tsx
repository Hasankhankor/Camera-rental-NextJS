"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileText } from "lucide-react"
import { useBookingStore } from "@/lib/booking-store"
import { BookingCard } from "@/components/booking-card"

const statusTypes = ["pending", "confirmed", "active", "completed", "cancelled"] as const

export default function OrdersPage() {
  const { bookings, updateBookingStatus } = useBookingStore()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage and track all equipment rental orders.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full bg-background pl-8 shadow-none md:w-[300px]"
          />
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          {statusTypes.map(status => (
            <TabsTrigger key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} onStatusUpdate={updateBookingStatus} />
            ))}
          </div>
        </TabsContent>

        {statusTypes.map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            <div className="grid gap-4">
              {bookings
                .filter((booking) => booking.status === status)
                .map((booking) => (
                  <BookingCard key={booking.id} booking={booking} onStatusUpdate={updateBookingStatus} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
