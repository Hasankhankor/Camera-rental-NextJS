"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Mail, Phone, MapPin, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useUserStore } from "@/lib/user-store"
import { useBookingStore } from "@/lib/booking-store"
import type { UserProfile } from "@/lib/user-store"

interface CustomerStats extends UserProfile {
  totalBookings: number
  totalSpent: number
  initials: string
}

export default function CustomersPage() {
  const { users, init } = useUserStore()
  const bookings = useBookingStore(state => state.bookings)
  const [searchQuery, setSearchQuery] = useState("")
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    init()
  }, [init])

  // Calculate customer stats and format customer data
  const getCustomerStats = (user: UserProfile): CustomerStats => {
    const initials = `${user.firstName[0]}${user.lastName[0]}`

    const userBookings = bookings.filter(b => b.customerId === user.id)
    const totalSpent = userBookings.reduce((sum, booking) => sum + booking.totalAmount, 0)

    return {
      ...user,
      totalBookings: userBookings.length,
      totalSpent,
      initials,
    }
  }

  // Filter and format customers
  const customers = !hasMounted ? [] : users
    .filter(user => user.role === "user")
    .map(getCustomerStats)
    .filter(customer => {
      if (!searchQuery) return true
      const searchLower = searchQuery.toLowerCase()
      return (
        customer.firstName.toLowerCase().includes(searchLower) ||
        customer.lastName.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.toLowerCase().includes(searchLower) ||
        customer.location.toLowerCase().includes(searchLower)
      )
    })

  // Show loading state during SSR/hydration
  if (!hasMounted) {
    return (
      <div className="flex flex-col gap-5 p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Customers</h2>
            <p className="text-sm text-muted-foreground">
              Loading customer data...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Customers</h2>
          <p className="text-sm text-muted-foreground">
            Manage your customer accounts and view their rental history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {customers
              .filter((c) => c.verified)
              .map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={customer.avatar} alt={`${customer.firstName} ${customer.lastName}`} />
                          <AvatarFallback>{customer.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{`${customer.firstName} ${customer.lastName}`}</h3>
                            <Badge variant={customer.verified ? "default" : "secondary"}>
                              {customer.verified ? "Active" : "Inactive"}
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
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
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
                          <p className="text-sm text-muted-foreground">{customer.phone || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{customer.location || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Joined</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(customer.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          <div className="grid gap-4">
            {customers
              .filter((c) => !c.verified)
              .map((customer) => (
                <Card key={customer.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={customer.avatar} alt={`${customer.firstName} ${customer.lastName}`} />
                          <AvatarFallback>{customer.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{`${customer.firstName} ${customer.lastName}`}</h3>
                            <Badge variant={customer.verified ? "default" : "secondary"}>
                              {customer.verified ? "Active" : "Inactive"}
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
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
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
                          <p className="text-sm text-muted-foreground">{customer.phone || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">{customer.location || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Joined</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(customer.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
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
