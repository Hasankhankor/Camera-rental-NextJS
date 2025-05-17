"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryOverview } from "@/components/inventory-overview"
import { RecentBookings } from "@/components/recent-bookings"
import { UpcomingReturns } from "@/components/upcoming-returns"
import { InventoryStats } from "@/components/inventory-stats"
import { useProductStore } from "@/lib/product-store"
import { useBookingStore } from "@/lib/booking-store"
import { db, initDb } from "@/lib/db"

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const { products, init: initProducts } = useProductStore()
  const bookings = useBookingStore(state => state.bookings)

  useEffect(() => {
    const initData = async () => {
      await Promise.all([initProducts(), initDb()])
      setMounted(true)
    }
    initData()
  }, [initProducts])

  if (!mounted) return null

  // Calculate real-time stats
  const totalRevenue = bookings
    .filter(b => b.status === "completed")
    .reduce((sum, booking) => sum + booking.totalAmount, 0)

  const activeRentals = bookings.filter(b => b.status === "active").length
  const availableItems = products.filter(p => p.status === "available").length
  const needsAttention = products.filter(p => p.status === "pending" || p.status === "rejected").length
  const pendingApprovals = products.filter(p => p.status === "pending").length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your rental business.</p>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeRentals}</div>
                <p className="text-xs text-muted-foreground">+12 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{availableItems}</div>
                <p className="text-xs text-muted-foreground">{((availableItems / products.length) * 100).toFixed(0)}% of total inventory</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{needsAttention}</div>
                <p className="text-xs text-muted-foreground">{pendingApprovals} pending approval</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Inventory Overview</CardTitle>
                <CardDescription>Current status of your equipment by category</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <InventoryOverview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest equipment rentals</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentBookings />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Returns</CardTitle>
                <CardDescription>Equipment due back soon</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingReturns />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Inventory Stats</CardTitle>
                <CardDescription>Equipment utilization and performance</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <InventoryStats />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
