"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FilterState } from "./filter"
import { useProductStore } from "@/lib/product-store"

export function ProductGrid({ filters }: { filters?: FilterState }) {
  const { products } = useProductStore()

  // Filter products based on the selected filters
  const filteredProducts = products.filter((product) => {
    // Only show available or pending products
    if (product.status !== "available" && product.status !== "pending") return false

    // If no filters are selected, show all products
    if (!filters) return true

    // Check if any category filter is active
    const anyCategorySelected = Object.values(filters.categories).some((value) => value)

    // Category filtering - case insensitive comparison
    const categoryMatch =
      !anyCategorySelected ||
      (filters.categories.cameras && product.category.toLowerCase() === "cameras") ||
      (filters.categories.lenses && product.category.toLowerCase() === "lenses") ||
      (filters.categories.lighting && product.category.toLowerCase() === "lighting") ||
      (filters.categories.audio && product.category.toLowerCase() === "audio") ||
      (filters.categories.stabilizers && product.category.toLowerCase() === "stabilizers") ||
      (filters.categories.supports && product.category.toLowerCase() === "supports")

    // Check if any price filter is active
    const anyPriceSelected = Object.values(filters.priceRange).some((value) => value)

    // Price filtering
    const priceMatch =
      !anyPriceSelected ||
      (filters.priceRange.under50 && product.price < 50) ||
      (filters.priceRange.under100 && product.price >= 50 && product.price < 100) ||
      (filters.priceRange.under200 && product.price >= 100 && product.price < 200) ||
      (filters.priceRange.over200 && product.price >= 200)

    return categoryMatch && priceMatch
  })

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <h3 className="text-lg font-medium">No products match your filters</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/marketplace/product/${product.id}`} key={product.id} className="block group">
              <Card className="overflow-hidden border-0 shadow-md transition-all duration-200 hover:shadow-lg group-hover:scale-[1.02]">
                <div className="relative aspect-square bg-muted">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      product.status === "pending" ? "bg-amber-500 hover:bg-amber-600" : "bg-cyan-500 hover:bg-cyan-600"
                    }`}
                  >
                    {product.status === "pending" ? "PENDING REVIEW" : "FOR RENT"}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <div className="font-bold text-lg">
                    {product.currency} {product.price.toFixed(2)}
                  </div>
                  <Button size="sm">Rent Now</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
