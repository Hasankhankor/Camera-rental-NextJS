'use client'

import { use, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Shield, Clock, ArrowLeft } from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import type { Product } from "@/lib/db"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { validateBookingDates, formatBookingUrl, ProductLoadingState } from "./product-utils"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { getProduct, isInitialized, init } = useProductStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDates, setSelectedDates] = useState<DateRange>({
    from: undefined,
    to: undefined,
  })

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!isInitialized) {
          await init()
        }

        const foundProduct = getProduct(resolvedParams.id)
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          setError("Product not found")
        }
      } catch (error) {
        console.error("Error loading product:", error)
        setError("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [resolvedParams.id, getProduct, init, isInitialized])

  const handleBookNow = () => {
    if (!validateBookingDates(selectedDates)) {
      return
    }

    if (product && selectedDates.from && selectedDates.to) {
      // Redirect to checkout instead of booking
      router.push(`/marketplace/checkout?${new URLSearchParams({
        productId: product.id,
        start: selectedDates.from.toISOString(),
        end: selectedDates.to.toISOString()
      }).toString()}`)
    }
  }

  if (loading) {
    return <ProductLoadingState />
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 container py-6">
          <div className="max-w-md mx-auto text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-6">
              {error || "We couldn't load this product. It might have been removed or you may not have permission to view it."}
            </p>
            <Link href="/marketplace">
              <Button>Return to Marketplace</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // Since we've checked for product being null above, we can safely use it here
  const { name, image, status, description, specifications, owner, category, currency, price, location } = product

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <Link href="/marketplace" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to marketplace
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
              <Badge
                className={`absolute top-4 right-4 ${
                  status === "pending" ? "bg-amber-500 hover:bg-amber-600" : "bg-cyan-500 hover:bg-cyan-600"
                }`}
              >
                {status === "pending" ? "PENDING REVIEW" : "FOR RENT"}
              </Badge>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4">
                <p className="text-muted-foreground">{description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="p-4">
                <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                  {specifications && specifications.length > 0 ? (
                    specifications.map((spec, index) => <li key={index}>{spec}</li>)
                  ) : (
                    <li>No specifications available</li>
                  )}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="p-4">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${
                          owner?.rating && index < Math.floor(owner.rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {owner?.rating ? `${owner.rating} (${owner.reviews} reviews)` : "No reviews yet"}
                  </span>
                </div>
                <p className="text-muted-foreground">No reviews for this specific item yet.</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Panel */}
          <div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p className="text-muted-foreground">{category}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">
                      {currency} {price.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">per day</div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Select Rental Dates</h3>
                    <div className="border rounded-md p-3">
                      <Calendar
                        mode="range"
                        selected={selectedDates}
                        onSelect={(range) => setSelectedDates(range || { from: undefined, to: undefined })}
                        disabled={{ before: new Date() }}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!selectedDates.from || !selectedDates.to}
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Insurance Coverage</p>
                        <p className="text-sm text-muted-foreground">Basic coverage included</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Rental Period</p>
                        <p className="text-sm text-muted-foreground">Minimum 1 day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
