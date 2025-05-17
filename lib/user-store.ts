"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { db, initDb } from "./db"
import type { UserSettings, UserCredentials, UserProfileUpdate } from "./types/settings"

const DEFAULT_SETTINGS: UserSettings = {
  notificationPreferences: {
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    maintenanceAlerts: true,
    bookingReminders: true,
  },
  darkMode: false,
  language: 'en',
  companyName: ''
}

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
  resetToken?: string
}

// Sample user data for demo account
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

type UserStore = {
  user: UserProfile | null
  users: UserProfile[]
  isLoggedIn: boolean
  init: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (newUser: Partial<UserProfile> & { email: string; password: string }) => Promise<boolean>
  requestPasswordReset: (email: string) => Promise<boolean>
  resetPassword: (token: string, newPassword: string) => Promise<boolean>
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isLoggedIn: false,
      init: async () => {
        await initDb()
        const currentUser = get().user
        const isLoggedIn = get().isLoggedIn

        // Load all users
        set({ users: db.data.users })

        // If logged in but no user data, log out
        if (isLoggedIn && !currentUser) {
          set({ isLoggedIn: false, user: null })
        }
      },
      updateProfile: async (updates) => {
        await initDb()

        const currentUser = get().user
        if (!currentUser) return

        const updatedUser = { ...currentUser, ...updates }

        // Update user in database
        const userIndex = db.data.users.findIndex(u => u.id === updatedUser.id)
        if (userIndex === -1) {
          db.data.users.push(updatedUser)
        } else {
          db.data.users[userIndex] = updatedUser
        }
        await db.write()

        // Update state
        set({
          user: updatedUser,
          users: db.data.users
        })
      },
      updateSettings: async (settings) => {
        await initDb()

        const currentUser = get().user
        if (!currentUser) return

        const updatedUser = {
          ...currentUser,
          settings: {
            ...currentUser.settings,
            ...settings
          }
        }

        // Update user in database
        const userIndex = db.data.users.findIndex(u => u.id === updatedUser.id)
        if (userIndex === -1) {
          db.data.users.push(updatedUser)
        } else {
          db.data.users[userIndex] = updatedUser
        }
        await db.write()

        // Update state
        set({
          user: updatedUser,
          users: db.data.users
        })
      },
      login: async (email, password) => {
        await initDb()

        // Load all users to ensure we have the latest data
        set({ users: db.data.users })

        // Check admin account first
        if (email === "admin@capturecart.com" && password === "admin123") {
          const adminUser = db.data.users.find(u => u.email === "admin@capturecart.com")
          if (adminUser) {
            set({ isLoggedIn: true, user: adminUser })
            return true
          }
        }

        // Check demo user account
        if (email === "demo@capturecart.com" && password === "password") {
          const demoUser = db.data.users.find(u => u.email === "demo@capturecart.com")
          if (demoUser) {
            set({ isLoggedIn: true, user: demoUser })
            return true
          }
        }

        // Find regular user
        const user = db.data.users.find(u => u.email === email)
        if (!user) {
          return false
        }

        // In production, use proper password comparison with hashing
        if (user.credentials?.password === password) {
          set({ isLoggedIn: true, user })
          return true
        }

        return false
      },
      logout: () => {
        set({ isLoggedIn: false, user: null })
      },
      signup: async (newUser) => {
        await initDb()

        // Check if user already exists
        if (db.data.users.some(u => u.email === newUser.email)) {
          return false
        }

        const user: UserProfile = {
          id: `user-${Date.now()}`,
          firstName: newUser.firstName || "",
          lastName: newUser.lastName || "",
          email: newUser.email,
          phone: newUser.phone || "",
          location: newUser.location || "",
          bio: newUser.bio || "",
          avatar: "/placeholder.svg?height=200&width=200",
          role: "user",
          joinDate: new Date().toISOString(),
          verified: false,
          settings: DEFAULT_SETTINGS,
          credentials: {
            password: newUser.password // In production, hash the password
          }
        }

        // Add user to database
        db.data.users.push(user)
        await db.write()

        // Update state
        set({
          users: db.data.users,
          isLoggedIn: true,
          user
        })

        return true
      },
      requestPasswordReset: async (email) => {
        await initDb()
        const user = db.data.users.find(u => u.email === email)

        if (!user) {
          return false
        }

        // In a real application, you would:
        // 1. Generate a unique token
        // 2. Store it in the database with an expiration
        // 3. Send an email to the user with a reset link

        // For demo purposes, we'll just console.log the token
        const resetToken = Math.random().toString(36).substring(7)
        console.log(`Password reset token for ${email}: ${resetToken}`)

        // Store the reset token (in a real app, store with expiration)
        user.resetToken = resetToken
        await db.write()

        return true
      },
      resetPassword: async (token, newPassword) => {
        await initDb()
        const user = db.data.users.find(u => u.resetToken === token)

        if (!user) {
          return false
        }

        // Update password and remove reset token
        user.credentials.password = newPassword
        delete user.resetToken
        await db.write()

        return true
      }
    }),
    {
      name: "user-store",
      storage: {
        getItem: (name) => {
          try {
            if (typeof window === 'undefined') return null
            const item = window.localStorage.getItem(name)
            return item ? JSON.parse(item) : null
          } catch {
            return null
          }
        },
        setItem: (name, value) => {
          try {
            if (typeof window === 'undefined') return
            window.localStorage.setItem(name, JSON.stringify(value))
          } catch (error) {
            console.error('Failed to save to localStorage:', error)
          }
        },
        removeItem: (name) => {
          try {
            if (typeof window === 'undefined') return
            window.localStorage.removeItem(name)
          } catch (error) {
            console.error('Failed to remove from localStorage:', error)
          }
        },
      }
    }
  )
)
