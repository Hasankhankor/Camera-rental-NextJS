'use client'

import type { UserSettings, UserCredentials } from '@/lib/types/settings'

// Define types for our database schema
export type UserProfile = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  bio: string
  avatar: string
  role: "user" | "admin"
  joinDate: string
  verified: boolean
  settings: UserSettings
  credentials: UserCredentials
}

export type Product = {
  id: string
  name: string
  category: string
  price: number
  currency: string
  image: string
  status: "pending" | "approved" | "rejected" | "available" | "rented"
  description: string
  condition: string
  location: string
  specifications?: string[]
  isApproved?: boolean
  approvedBy?: string
  approvalDate?: string
  owner?: {
    name: string
    rating: number
    reviews: number
    response: string
  }
  createdAt?: string
}

export type Booking = {
  id: string
  productId: string
  productName: string
  productImage: string
  startDate: string
  endDate: string
  totalAmount: number
  currency: string
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled"
  customerId: string
  customerName: string
  createdAt: string
  location: string
}

// Define database schema
export interface DbSchema {
  users: UserProfile[]
  products: Product[]
  bookings: Booking[]
}

// Define initial demo users
const demoAdmin: UserProfile = {
  id: "admin-1",
  firstName: "Admin",
  lastName: "User",
  email: "admin@capturecart.com",
  phone: "+971 50 987 6543",
  location: "Dubai Marina",
  bio: "System Administrator",
  avatar: "/placeholder.svg?height=200&width=200",
  role: "admin",
  joinDate: "2024-01-01",
  verified: true,
  settings: {
    companyName: "CaptureCart Admin",
    notificationPreferences: {
      emailNotifications: true,
      smsNotifications: false,
      orderUpdates: true,
      maintenanceAlerts: true,
      bookingReminders: true,
    },
    darkMode: false,
    language: "en"
  },
  credentials: {
    password: "admin123" // Only for demo purposes
  }
}

const demoUser: UserProfile = {
  id: "demo-1",
  firstName: "John",
  lastName: "Doe",
  email: "demo@capturecart.com",
  phone: "+971 50 123 4567",
  location: "Dubai Marina",
  bio: "Professional photographer specializing in portrait and landscape photography.",
  avatar: "/placeholder.svg?height=200&width=200",
  role: "user",
  joinDate: "2024-01-15",
  verified: true,
  settings: {
    companyName: "Demo Photography",
    notificationPreferences: {
      emailNotifications: true,
      smsNotifications: false,
      orderUpdates: true,
      maintenanceAlerts: true,
      bookingReminders: true,
    },
    darkMode: false,
    language: "en"
  },
  credentials: {
    password: "password" // Only for demo purposes
  }
}

// Create initial data
const initialData: DbSchema = {
  users: [demoAdmin, demoUser],
  products: [],
  bookings: []
}

// Create and export the database instance
export const db = {
  data: initialData as DbSchema,
  async read(): Promise<void> {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem('db')
      if (!stored) {
        // If no data in localStorage, write initial data
        await this.write()
        return
      }
      const parsedData = JSON.parse(stored) as Partial<DbSchema>
      if (parsedData && typeof parsedData === 'object') {
        // Ensure users array exists
        if (!parsedData.users) parsedData.users = []

        // Make sure demo users are always available
        if (!parsedData.users.some((u: UserProfile) => u.email === demoAdmin.email)) {
          parsedData.users.push(demoAdmin)
        }
        if (!parsedData.users.some((u: UserProfile) => u.email === demoUser.email)) {
          parsedData.users.push(demoUser)
        }

        // Ensure other arrays exist
        if (!parsedData.products) parsedData.products = []
        if (!parsedData.bookings) parsedData.bookings = []

        this.data = parsedData as DbSchema
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error)
    }
  },
  async write(): Promise<void> {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('db', JSON.stringify(this.data))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }
}

// Initialize database
export const initDb = async () => {
  if (typeof window === 'undefined') return

  try {
    await db.read()
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}