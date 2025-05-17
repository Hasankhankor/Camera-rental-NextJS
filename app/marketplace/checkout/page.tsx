"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { useUserStore } from "@/lib/user-store"
import { useBookingStore } from "@/lib/booking-store"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Product } from "@/lib/db"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { getProduct } = useProductStore()
  const { user } = useUserStore()
  const { addBooking } = useBookingStore()

  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [bookingDetails, setBookingDetails] = useState({
    productId: searchParams.get("productId") || "",
    start: searchParams.get("start") ? new Date(searchParams.get("start") as string) : null,
    end: searchParams.get("end") ? new Date(searchParams.get("end") as string) : null,
  })

  useEffect(() => {
    if (!bookingDetails.productId || !bookingDetails.start || !bookingDetails.end) {
      router.push("/marketplace")
      return
    }

    const productData = getProduct(bookingDetails.productId)
    if (!productData) {
      router.push("/marketplace")
      return
    }

    setProduct(productData)
  }, [bookingDetails.productId, bookingDetails.start, bookingDetails.end, getProduct, router])

  if (!product || !bookingDetails.start || !bookingDetails.end) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading checkout details...</p>
        </div>
      </div>
    )
  }

  const startDate = new Date(bookingDetails.start)
  const endDate = new Date(bookingDetails.end)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const subtotal = product.price * days
  const depositAmount = product.price * 0.5 // 50% deposit
  const totalAmount = subtotal + depositAmount

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleConfirmCheckout = () => {
    setIsLoading(true)

    // Create new booking
    const newBooking = {
      id: `B-${Math.floor(Math.random() * 10000)}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      totalAmount: totalAmount,
      currency: product.currency,
      status: "confirmed" as const,
      customerId: user.id,
      customerName: `${user.firstName} ${user.lastName}`,
      createdAt: new Date().toISOString(),
      location: product.location,
    }

    // Simulate API call delay
    setTimeout(() => {
      addBooking(newBooking)
      toast({
        title: "Payment successful!",
        description: "Your equipment rental has been confirmed.",
      })
      router.push("/marketplace/account?tab=rentals")
      setIsLoading(false)
    }, 1500)
  }
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <Link
            href={`/marketplace/product/${product.id}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to product
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{product.location}</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Rental Period</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(startDate)} - {formatDate(endDate)} ({days} days)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Daily Rate</p>
                        <p className="text-sm text-muted-foreground">
                          {product.currency} {product.price.toFixed(2)} per day
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({days} days)</span>
                      <span>
                        {product.currency} {subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Security Deposit (50%)</span>
                      <span>
                        {product.currency} {depositAmount.toFixed(2)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        {product.currency} {totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Action */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span>
                        {product.currency} {totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleConfirmCheckout}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        "Confirm & Pay"
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By confirming, you agree to our terms of service and rental policies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>      </main>
    </div>
  )
}
