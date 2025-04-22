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

type BookingStore = {
  bookings: Booking[]
  addBooking: (booking: Booking) => void
  updateBookingStatus: (id: string, status: Booking["status"]) => void
  getBookingsByCustomerId: (customerId: string) => Booking[]
  getBookingById: (id: string) => Booking | undefined
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: initialBookings,
      addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking)),
        })),
      getBookingsByCustomerId: (customerId) => get().bookings.filter((booking) => booking.customerId === customerId),
      getBookingById: (id) => get().bookings.find((booking) => booking.id === id),
    }),
    {
      name: "booking-store",
    },
  ),
)
