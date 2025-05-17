'use client'

import { useEffect } from "react"
import { initDb } from "@/lib/db"

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize the database when the app starts
    const initDatabase = async () => {
      try {
        await initDb()
      } catch (error) {
        console.error('Failed to initialize database:', error)
      }
    }
    initDatabase()
  }, [])

  return children
}
