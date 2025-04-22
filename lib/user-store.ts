"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

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
}

// Sample user data
const initialUser: UserProfile = {
  id: "user-1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+971 50 123 4567",
  location: "Dubai Marina",
  bio: "Professional photographer specializing in portrait and landscape photography.",
  avatar: "/placeholder.svg?height=200&width=200",
  role: "user",
  joinDate: "2024-01-15",
  verified: true,
}

type UserStore = {
  user: UserProfile
  isLoggedIn: boolean
  updateProfile: (updates: Partial<UserProfile>) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: initialUser,
      isLoggedIn: true, // For demo purposes, user is always logged in
      updateProfile: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates },
        })),
      login: async (email, password) => {
        // Simple mock login for demo purposes
        if (email === "demo@capturecart.com" && password === "password") {
          set({ isLoggedIn: true })
          return true
        }
        if (email === "admin@capturecart.com" && password === "admin123") {
          set({
            isLoggedIn: true,
            user: {
              ...initialUser,
              role: "admin",
              email: "admin@capturecart.com",
              firstName: "Admin",
              lastName: "User",
            },
          })
          return true
        }
        return false
      },
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: "user-store",
    },
  ),
)
