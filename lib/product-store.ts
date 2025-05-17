'use client'

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { db, initDb, type Product } from "./db"

interface ProductState {
  products: Product[]
  isInitialized: boolean
  init: () => Promise<void>
  addProduct: (product: Product) => Promise<void>
  getProduct: (id: string) => Product | undefined
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: [],
      isInitialized: false,

      init: async () => {
        if (get().isInitialized) return
        try {
          await initDb()
          const dbProducts = db.data.products || []
          set({ products: dbProducts, isInitialized: true })
        } catch (error) {
          console.error('Failed to initialize product store:', error)
        }
      },

      addProduct: async (product) => {
        if (!get().isInitialized) await get().init()
        try {
          await initDb()
          db.data.products.push(product)
          await db.write()
          set((state) => ({ products: [...state.products, product] }))
        } catch (error) {
          console.error('Failed to add product:', error)
          throw error
        }
      },

      getProduct: (id) => {
        return get().products.find((product) => product.id === id)
      },

      updateProduct: async (id, updates) => {
        if (!get().isInitialized) await get().init()
        try {
          await initDb()
          const index = db.data.products.findIndex(p => p.id === id)
          if (index === -1) {
            throw new Error(`Product with id ${id} not found`)
          }
          const updatedProduct = { ...db.data.products[index], ...updates }
          db.data.products[index] = updatedProduct
          await db.write()
          set((state) => ({
            products: state.products.map(p =>
              p.id === id ? updatedProduct : p
            )
          }))
        } catch (error) {
          console.error('Failed to update product:', error)
          throw error
        }
      },

      deleteProduct: async (id) => {
        if (!get().isInitialized) await get().init()
        try {
          await initDb()
          const index = db.data.products.findIndex(p => p.id === id)
          if (index === -1) {
            throw new Error(`Product with id ${id} not found`)
          }
          db.data.products.splice(index, 1)
          await db.write()
          set((state) => ({
            products: state.products.filter(p => p.id !== id)
          }))
        } catch (error) {
          console.error('Failed to delete product:', error)
          throw error
        }
      }
    }),
    {
      name: "product-store",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          try {
            if (typeof window === 'undefined') return null
            return window.localStorage.getItem(name)
          } catch {
            return null
          }
        },
        setItem: (name, value) => {
          try {
            if (typeof window === 'undefined') return
            window.localStorage.setItem(name, value)
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
      })),
    }
  )
)