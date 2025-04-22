import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Sample customer data
const customers = [
  {
    id: "C-1001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+971 50 123 4567",
    location: "Dubai Marina",
    joinDate: "Jan 15, 2024",
    totalBookings: 8,
    totalSpent: 2450.0,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SJ",
  },
  {
    id: "C-1002",
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+971 55 987 6543",
    location: "Downtown Dubai",
    joinDate: "Feb 3, 2024",
    totalBookings: 5,
    totalSpent: 1850.0,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MC",
  },
  {
    id: "C-1003",
    name: "Alex Rodriguez",
    email: "alex@example.com",
    phone: "+971 54 456 7890",
    location: "Business Bay",
    joinDate: "Mar 10, 2024",
    totalBookings: 2,
    totalSpent: 750.0,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AR",
  },
  {
    id: "C-1004",
    name: "Emily Wong",
    email: "emily@example.com",
    phone: "+971 56 234 5678",
    location: "JLT",
    joinDate: "Dec 5, 2023",
    totalBookings: 12,
    totalSpent: 4200.0,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EW",
  },
  {
    id: "C-1005",
    name: "David Smith",
    email: "david@example.com",
    phone: "+971 52 345 6789",
    location: "Dubai Silicon Oasis",
    joinDate: "Feb 20, 2024",
    totalBookings: 3,
    totalSpent: 980.0,
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DS",
  },
  {
    id: "C-1006",
    name: "Lisa Johnson",
    email: "lisa@example.com",
    phone: "+971 58 876 5432",
    location: "Palm Jumeirah",
    joinDate: "Jan 8, 2024",
    totalBookings: 6,
    totalSpent: 2100.0,
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "LJ",
  },
]

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Manage your customer accounts and information.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="w-full bg-background pl-8 shadow-none md:w-[300px]"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {customers.map((customer) => (
              <Card key={customer.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                        <AvatarFallback>{customer.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{customer.name}</h3>
                          <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                            {customer.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Customer ID: {customer.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end">
                      <div className="font-bold">AED {customer.totalSpent.toFixed(2)}</div>
                      <p className="text-sm text-muted-foreground">{customer.totalBookings} bookings</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{customer.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Joined</p>
                        <p className="text-sm text-muted-foreground">{customer.joinDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button size="sm">Contact</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {customers
              .filter((c) => c.status === "active")
              .map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="p-6">
                    {/* Similar content structure as above */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                          <AvatarFallback>{customer.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{customer.name}</h3>
                            <Badge variant="default">{customer.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Customer ID: {customer.id}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <div className="font-bold">AED {customer.totalSpent.toFixed(2)}</div>
                        <p className="text-sm text-muted-foreground">{customer.totalBookings} bookings</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{customer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{customer.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Joined</p>
                          <p className="text-sm text-muted-foreground">{customer.joinDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="grid gap-4">
            {customers
              .filter((c) => c.status === "inactive")
              .map((customer) => (
                <Card key={customer.id}>
                  {/* Similar content structure */}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                          <AvatarFallback>{customer.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{customer.name}</h3>
                            <Badge variant="secondary">{customer.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Customer ID: {customer.id}</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <div className="font-bold">AED {customer.totalSpent.toFixed(2)}</div>
                        <p className="text-sm text-muted-foreground">{customer.totalBookings} bookings</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{customer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{customer.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Joined</p>
                          <p className="text-sm text-muted-foreground">{customer.joinDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm">Reactivate</Button>
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
