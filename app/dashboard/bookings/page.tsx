import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Calendar, User, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample booking data
const bookings = [
  {
    id: "B-1234",
    customer: "Sarah Johnson",
    equipment: "Sony A7III + 24-70mm Lens",
    status: "active",
    startDate: "Apr 18, 2024",
    endDate: "Apr 21, 2024",
    totalAmount: 255.0,
    location: "Dubai Marina",
  },
  {
    id: "B-1235",
    customer: "Michael Chen",
    equipment: "Canon EOS R5 + 3 Lenses",
    status: "active",
    startDate: "Apr 17, 2024",
    endDate: "Apr 22, 2024",
    totalAmount: 600.0,
    location: "Downtown Dubai",
  },
  {
    id: "B-1236",
    customer: "Alex Rodriguez",
    equipment: "Lighting Kit + Stands",
    status: "pending",
    startDate: "Apr 20, 2024",
    endDate: "Apr 23, 2024",
    totalAmount: 90.0,
    location: "Business Bay",
  },
  {
    id: "B-1237",
    customer: "Emily Wong",
    equipment: "DJI Ronin Gimbal",
    status: "active",
    startDate: "Apr 16, 2024",
    endDate: "Apr 19, 2024",
    totalAmount: 255.0,
    location: "JLT",
  },
  {
    id: "B-1238",
    customer: "David Smith",
    equipment: "Nikon Z6 + 50mm Lens",
    status: "completed",
    startDate: "Apr 10, 2024",
    endDate: "Apr 15, 2024",
    totalAmount: 375.0,
    location: "Dubai Marina",
  },
  {
    id: "B-1239",
    customer: "Lisa Johnson",
    equipment: "Sony FE 70-200mm f/2.8 GM",
    status: "cancelled",
    startDate: "Apr 12, 2024",
    endDate: "Apr 14, 2024",
    totalAmount: 140.0,
    location: "Palm Jumeirah",
  },
]

export default function BookingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage all equipment bookings and reservations.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bookings..."
            className="w-full bg-background pl-8 shadow-none md:w-[300px]"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{booking.equipment}</h3>
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
                      <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                    </div>
                    <div className="font-bold">AED {booking.totalAmount.toFixed(2)}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-sm text-muted-foreground">{booking.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Rental Period</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.startDate} - {booking.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Pickup Location</p>
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
                        <Button variant="outline" size="sm">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                      </>
                    )}
                    {booking.status === "active" && <Button size="sm">Mark as Returned</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {bookings
              .filter((b) => b.status === "active")
              .map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{booking.equipment}</h3>
                          <Badge variant="default">{booking.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                      </div>
                      <div className="font-bold">AED {booking.totalAmount.toFixed(2)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Customer</p>
                          <p className="text-sm text-muted-foreground">{booking.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Rental Period</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate} - {booking.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Pickup Location</p>
                          <p className="text-sm text-muted-foreground">{booking.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Mark as Returned</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* Other tab contents would follow the same pattern */}
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {bookings
              .filter((b) => b.status === "pending")
              .map((booking) => (
                <Card key={booking.id}>
                  {/* Similar content structure */}
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{booking.equipment}</h3>
                          <Badge variant="outline">{booking.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                      </div>
                      <div className="font-bold">AED {booking.totalAmount.toFixed(2)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Customer</p>
                          <p className="text-sm text-muted-foreground">{booking.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Rental Period</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate} - {booking.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Pickup Location</p>
                          <p className="text-sm text-muted-foreground">{booking.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Reject
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {bookings
              .filter((b) => b.status === "completed")
              .map((booking) => (
                <Card key={booking.id}>
                  {/* Similar content structure */}
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{booking.equipment}</h3>
                          <Badge variant="secondary">{booking.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                      </div>
                      <div className="font-bold">AED {booking.totalAmount.toFixed(2)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Customer</p>
                          <p className="text-sm text-muted-foreground">{booking.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Rental Period</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate} - {booking.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Pickup Location</p>
                          <p className="text-sm text-muted-foreground">{booking.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <div className="grid gap-4">
            {bookings
              .filter((b) => b.status === "cancelled")
              .map((booking) => (
                <Card key={booking.id}>
                  {/* Similar content structure */}
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{booking.equipment}</h3>
                          <Badge variant="destructive">{booking.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                      </div>
                      <div className="font-bold">AED {booking.totalAmount.toFixed(2)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Customer</p>
                          <p className="text-sm text-muted-foreground">{booking.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Rental Period</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.startDate} - {booking.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Pickup Location</p>
                          <p className="text-sm text-muted-foreground">{booking.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
