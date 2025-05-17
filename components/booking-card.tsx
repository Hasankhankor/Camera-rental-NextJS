"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, MapPin } from "lucide-react"
import type { Booking } from "@/lib/booking-store"

interface BookingCardProps {
  booking: Booking
  onStatusUpdate: (id: string, status: Booking['status']) => void
}

export function BookingCard({ booking, onStatusUpdate }: BookingCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{booking.id}</h3>
              <Badge
                variant={
                  booking.status === "active"
                    ? "default"
                    : booking.status === "pending"
                      ? "outline"
                      : booking.status === "completed"
                        ? "secondary"
                        : "destructive"
                }
              >
                {booking.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Equipment: {booking.productName}</p>
          </div>
          <div className="font-bold">
            {booking.currency} {booking.totalAmount.toFixed(2)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Customer</p>
              <p className="text-sm text-muted-foreground">{booking.customerName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">
                {new Date(booking.startDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{booking.location}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          {booking.status === "pending" && (
            <>
              <Button variant="outline" size="sm" onClick={() => onStatusUpdate(booking.id, "cancelled")}>
                Reject
              </Button>
              <Button size="sm" onClick={() => onStatusUpdate(booking.id, "active")}>
                Approve
              </Button>
            </>
          )}
          {booking.status === "active" && (
            <Button size="sm" onClick={() => onStatusUpdate(booking.id, "completed")}>
              Mark as Returned
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
