import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const bookings = [
  {
    id: "B-1234",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    equipment: "Sony A7III + 24-70mm Lens",
    status: "active",
    date: "Apr 18, 2024",
  },
  {
    id: "B-1235",
    customer: {
      name: "Michael Chen",
      email: "michael@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    equipment: "Canon EOS R5 + 3 Lenses",
    status: "active",
    date: "Apr 17, 2024",
  },
  {
    id: "B-1236",
    customer: {
      name: "Alex Rodriguez",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AR",
    },
    equipment: "Lighting Kit + Stands",
    status: "pending",
    date: "Apr 20, 2024",
  },
  {
    id: "B-1237",
    customer: {
      name: "Emily Wong",
      email: "emily@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EW",
    },
    equipment: "DJI Ronin Gimbal",
    status: "active",
    date: "Apr 16, 2024",
  },
]

export function RecentBookings() {
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={booking.customer.avatar || "/placeholder.svg"} alt={booking.customer.name} />
            <AvatarFallback>{booking.customer.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{booking.customer.name}</p>
            <p className="text-sm text-muted-foreground">{booking.equipment}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={booking.status === "active" ? "default" : "outline"}>{booking.status}</Badge>
            <p className="text-sm text-muted-foreground">{booking.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
