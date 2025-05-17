"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { db, initDb, type Product } from "./db"

type ProductStoreState = {
  products: Product[]
  addProduct: (product: Product) => Promise<void>
  getProduct: (id: string) => Product | undefined
  init: () => Promise<void>
}

export const useProductStore = create<ProductStoreState>()(
  persist(
    (set, get) => ({
      products: [],
      init: async () => {
        await initDb()
        const dbProducts = db.data.products || []
        set({ products: dbProducts })
      },
      addProduct: async (product) => {
        await initDb()
        // Add to database
        db.data.products.push(product)
        await db.write()
        // Update store
        set((state) => ({ products: [...state.products, product] }))
      },
      getProduct: (id) => get().products.find((product) => product.id === id),
    }),
    {
      name: "product-store",
    },
  ),
)
