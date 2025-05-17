"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

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

// Sample booking data
const initialBookings: Booking[] = [
  {
    id: "B-1234",
    productId: "3",
    productName: "Sony A7 S III Full Frame Camera",
    productImage: "/placeholder.svg?height=300&width=300",
    startDate: "2024-04-18T00:00:00.000Z",
    endDate: "2024-04-21T00:00:00.000Z",
    totalAmount: 990,
    currency: "AED",
    status: "active",
    customerId: "user-1",
    customerName: "John Doe",
    createdAt: "2024-04-15T10:30:00.000Z",
    location: "Dubai Marina",
  },
  {
    id: "B-1235",
    productId: "4",
    productName: "Canon RF 24-70mm f/2.8L IS USM",
    productImage: "/placeholder.svg?height=300&width=300",
    startDate: "2024-04-17T00:00:00.000Z",
    endDate: "2024-04-22T00:00:00.000Z",
    totalAmount: 600,
    currency: "AED",
    status: "active",
    customerId: "user-1",
    customerName: "John Doe",
    createdAt: "2024-04-14T14:15:00.000Z",
    location: "Downtown Dubai",
  },
]

// Maximum number of bookings to store
const MAX_BOOKINGS = 50

type BookingStore = {
  bookings: Booking[]
  addBooking: (booking: Booking) => void
  updateBookingStatus: (id: string, status: Booking["status"]) => void
  getBookingsByCustomerId: (customerId: string) => Booking[]
  getBookingById: (id: string) => Booking | undefined
  cleanOldBookings: () => void
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: typeof window === 'undefined' ? [] : initialBookings,
      addBooking: (booking) => {
        set((state) => {
          // First clean up old bookings if needed
          const now = new Date()
          const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))

          // Keep active/pending bookings and recent completed/cancelled ones
          const currentBookings = state.bookings.filter(b =>
            !["completed", "cancelled"].includes(b.status) ||
            new Date(b.endDate) > sixMonthsAgo
          )

          const newBookings = [...currentBookings, booking]

          // If still over limit, prioritize keeping active and recent bookings
          if (newBookings.length > MAX_BOOKINGS) {
            const activeBookings = newBookings.filter(
              b => !["completed", "cancelled"].includes(b.status)
            )
            const otherBookings = newBookings.filter(
              b => ["completed", "cancelled"].includes(b.status)
            ).sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())

            const keepCount = Math.min(MAX_BOOKINGS - activeBookings.length, otherBookings.length)
            return {
              bookings: [...activeBookings, ...otherBookings.slice(0, keepCount)]
            }
          }

          return { bookings: newBookings }
        })
      },
      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id ? { ...booking, status } : booking
          ),
        })),
      getBookingsByCustomerId: (customerId) =>
        get().bookings.filter((booking) => booking.customerId === customerId),
      getBookingById: (id) =>
        get().bookings.find((booking) => booking.id === id),
      cleanOldBookings: () => set((state) => {
        const now = new Date()
        const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))

        // Keep active/pending bookings and recent completed/cancelled ones
        const bookingsToKeep = state.bookings.filter(booking =>
          !["completed", "cancelled"].includes(booking.status) ||
          new Date(booking.endDate) > sixMonthsAgo
        ).slice(0, MAX_BOOKINGS)

        return { bookings: bookingsToKeep }
      }),
    }),
    {
      name: "booking-store"
    }
  )
)
