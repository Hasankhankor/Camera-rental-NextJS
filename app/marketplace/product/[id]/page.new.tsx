"use client"

import { useEffect, useState } from "react"
import { use } from "react"
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

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { getProduct } = useProductStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDates, setSelectedDates] = useState<Required<DateRange>>({
    from: undefined,
    to: undefined,
  })

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = getProduct(resolvedParams.id)
      if (foundProduct) {
        setProduct(foundProduct)
      } else {
        // Product not found, redirect to marketplace
        router.push("/marketplace")
      }
      setLoading(false)
    }

    fetchProduct()
  }, [resolvedParams.id, getProduct, router])

  if (loading) {
    return (
      <div className="container max-w-6xl py-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const handleBookNow = () => {
    if (!selectedDates.from || !selectedDates.to) {
      alert("Please select rental dates")
      return
    }

    if (product) {
      router.push(
        `/marketplace/booking?productId=${product.id}&start=${selectedDates.from.toISOString()}&end=${selectedDates.to.toISOString()}`
      )
    }
  }

  return (
    <div className="container max-w-6xl py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-muted-foreground">{product.description}</p>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{product.location}</span>
              </div>
            </TabsContent>
            <TabsContent value="specifications">
              <Card>
                <CardContent className="space-y-2 pt-6">
                  <ul className="list-disc pl-4 space-y-2">
                    {product.specifications?.map((spec: string) => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>{product.condition}</Badge>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <div className="text-2xl font-bold">
                    {product.price} {product.currency}
                    <span className="text-sm font-normal text-muted-foreground"> / day</span>
                  </div>
                </div>
                {product.owner && (
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{product.owner.rating}</span>
                      <span className="text-muted-foreground">({product.owner.reviews})</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Response: {product.owner.response}</div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={selectedDates.from}
                    selected={{
                      from: selectedDates.from,
                      to: selectedDates.to
                    }}
                    onSelect={(range: DateRange | undefined) =>
                      setSelectedDates({
                        from: range?.from,
                        to: range?.to
                      } as Required<DateRange>)
                    }
                    numberOfMonths={2}
                    disabled={{ before: new Date() }}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <Button onClick={handleBookNow} className="w-full">
                  Book Now
                </Button>
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Insurance coverage included
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    24/7 customer support
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
