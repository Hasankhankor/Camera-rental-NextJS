"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Shield, Clock, ArrowLeft } from "lucide-react"
import { useProductStore, type Product } from "@/lib/product-store"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getProduct } = useProductStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDates, setSelectedDates] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = getProduct(params.id)
      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        // Product not found, redirect to marketplace
        router.push("/marketplace")
      }
      setLoading(false)
    }

    fetchProduct()
  }, [params.id, getProduct, router])

  const handleBookNow = () => {
    if (!selectedDates.from || !selectedDates.to) {
      alert("Please select rental dates")
      return
    }

    if (product) {
      router.push(
        `/marketplace/booking?productId=${product.id}&from=${selectedDates.from.toISOString()}&to=${selectedDates.to.toISOString()}`,
      )
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return null // Router will handle the redirect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/">
              <span className="text-primary">Capture</span>Cart
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-sm font-medium">
              Marketplace
            </Link>
            <Link href="/login" className="text-sm font-medium">
              Rent
            </Link>
            <Link href="/login" className="text-sm font-medium">
              How It Works
            </Link>
            <Link href="/login" className="text-sm font-medium">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/marketplace/list-equipment">
              <Button variant="outline">List Equipment</Button>
            </Link>
            <Link href="/marketplace/account">
              <Button>My Account</Button>
            </Link>
          </div>
        </div>
      </header>

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
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              <Badge
                className={`absolute top-4 right-4 ${
                  product.status === "pending" ? "bg-amber-500 hover:bg-amber-600" : "bg-cyan-500 hover:bg-cyan-600"
                }`}
              >
                {product.status === "pending" ? "PENDING REVIEW" : "FOR RENT"}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="p-4">
                <ul className="list-disc pl-5 space-y-1">
                  {product.specifications ? (
                    product.specifications.map((spec, index) => <li key={index}>{spec}</li>)
                  ) : (
                    <li>No specifications available</li>
                  )}
                </ul>
              </TabsContent>
              <TabsContent value="reviews" className="p-4">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          product.owner && i < Math.floor(product.owner.rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {product.owner ? `${product.owner.rating} (${product.owner.reviews} reviews)` : "No reviews yet"}
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
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-muted-foreground">{product.category}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">
                      {product.currency} {product.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">per day</div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Select Rental Dates</h3>
                    <div className="border rounded-md p-3 overflow-auto max-w-full">
                      <Calendar
                        mode="range"
                        selected={selectedDates}
                        onSelect={(range) => setSelectedDates(range || { from: undefined, to: undefined })}
                        className="mx-auto"
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={product.status === "pending" || !selectedDates.from || !selectedDates.to}
                    onClick={handleBookNow}
                  >
                    {product.status === "pending" ? "Pending Review" : "Book Now"}
                  </Button>

                  <div className="pt-4 border-t space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Pickup Location</p>
                        <p className="text-sm text-muted-foreground">{product.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Equipment Condition</p>
                        <p className="text-sm text-muted-foreground">{product.condition}</p>
                      </div>
                    </div>

                    {product.owner && (
                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Response Time</p>
                          <p className="text-sm text-muted-foreground">{product.owner.response}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {product.owner && (
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{product.owner.name}</p>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.owner.rating)
                                      ? "fill-primary text-primary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-1 text-xs text-muted-foreground">({product.owner.reviews})</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 CaptureCart. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
