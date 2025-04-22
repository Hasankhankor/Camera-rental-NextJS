"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"

// Sample inventory data
const inventoryData = {
  all: [
    {
      id: "cam-001",
      name: "Sony A7III",
      category: "cameras",
      description: "Full-frame mirrorless camera with 24.2MP sensor",
      status: "available",
      dailyRate: 85,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-03-15",
    },
    {
      id: "lens-001",
      name: "Sony 24-70mm f/2.8 GM",
      category: "lenses",
      description: "Standard zoom lens for Sony E-mount",
      status: "rented",
      dailyRate: 45,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-02-20",
    },
    {
      id: "light-001",
      name: "Godox SL-60W LED",
      category: "lighting",
      description: "60W LED continuous light with bowens mount",
      status: "available",
      dailyRate: 30,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "needs attention",
      lastMaintenance: "2023-12-10",
    },
    {
      id: "audio-001",
      name: "Rode VideoMic Pro+",
      category: "audio",
      description: "Shotgun microphone for DSLR and mirrorless cameras",
      status: "available",
      dailyRate: 25,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-01-05",
    },
    {
      id: "acc-001",
      name: "Manfrotto 055XPRO3 Tripod",
      category: "accessories",
      description: "Professional aluminum tripod with 3-section legs",
      status: "rented",
      dailyRate: 20,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-02-10",
    },
    {
      id: "cam-002",
      name: "Canon EOS R5",
      category: "cameras",
      description: "Full-frame mirrorless camera with 45MP sensor and 8K video",
      status: "available",
      dailyRate: 120,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-03-01",
    },
  ],
  cameras: [
    {
      id: "cam-001",
      name: "Sony A7III",
      category: "cameras",
      description: "Full-frame mirrorless camera with 24.2MP sensor",
      status: "available",
      dailyRate: 85,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-03-15",
    },
    {
      id: "cam-002",
      name: "Canon EOS R5",
      category: "cameras",
      description: "Full-frame mirrorless camera with 45MP sensor and 8K video",
      status: "available",
      dailyRate: 120,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-03-01",
    },
  ],
  lenses: [
    {
      id: "lens-001",
      name: "Sony 24-70mm f/2.8 GM",
      category: "lenses",
      description: "Standard zoom lens for Sony E-mount",
      status: "rented",
      dailyRate: 45,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-02-20",
    },
  ],
  lighting: [
    {
      id: "light-001",
      name: "Godox SL-60W LED",
      category: "lighting",
      description: "60W LED continuous light with bowens mount",
      status: "available",
      dailyRate: 30,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "needs attention",
      lastMaintenance: "2023-12-10",
    },
  ],
  audio: [
    {
      id: "audio-001",
      name: "Rode VideoMic Pro+",
      category: "audio",
      description: "Shotgun microphone for DSLR and mirrorless cameras",
      status: "available",
      dailyRate: 25,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-01-05",
    },
  ],
  accessories: [
    {
      id: "acc-001",
      name: "Manfrotto 055XPRO3 Tripod",
      category: "accessories",
      description: "Professional aluminum tripod with 3-section legs",
      status: "rented",
      dailyRate: 20,
      image: "/placeholder.svg?height=200&width=300",
      maintenanceStatus: "good",
      lastMaintenance: "2024-02-10",
    },
  ],
}

export function InventoryList({ category = "all" }: { category?: string }) {
  const [inventory, setInventory] = useState(inventoryData[category as keyof typeof inventoryData])

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {inventory.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative aspect-video">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            <Badge variant={item.status === "available" ? "default" : "secondary"} className="absolute top-2 right-2">
              {item.status}
            </Badge>
            {item.maintenanceStatus !== "good" && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Maintenance needed
              </Badge>
            )}
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2 mt-1">{item.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="-mt-1">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">ID: {item.id}</div>
              <div className="font-medium">${item.dailyRate}/day</div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button size="sm" disabled={item.status !== "available"}>
              {item.status === "available" ? "Book Now" : "Unavailable"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
