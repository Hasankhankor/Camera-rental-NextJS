"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Calendar, Clock, MapPin, Loader2 } from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { useUserStore } from "@/lib/user-store"
import { useBookingStore } from "@/lib/booking-store"
import { ThemeToggle } from "@/components/theme-toggle"

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { getProduct } = useProductStore()
  const { user } = useUserStore()
  const { addBooking } = useBookingStore()

  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [bookingDetails, setBookingDetails] = useState({
    productId: searchParams.get("productId") || "",
    from: searchParams.get("from") ? new Date(searchParams.get("from") as string) : null,
    to: searchParams.get("to") ? new Date(searchParams.get("to") as string) : null,
  })

  useEffect(() => {
    if (!bookingDetails.productId || !bookingDetails.from || !bookingDetails.to) {
      router.push("/marketplace")
      return
    }

    const productData = getProduct(bookingDetails.productId)
    if (!productData) {
      router.push("/marketplace")
      return
    }

    setProduct(productData)
  }, [bookingDetails.productId, bookingDetails.from, bookingDetails.to, getProduct, router])

  if (!product || !bookingDetails.from || !bookingDetails.to) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading booking details...</p>
        </div>
      </div>
    )
  }

  const startDate = new Date(bookingDetails.from)
  const endDate = new Date(bookingDetails.to)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const subtotal = product.price * days
  const depositAmount = product.price * 0.5
  const totalAmount = subtotal + depositAmount

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const handleConfirmBooking = () => {
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
        title: "Booking confirmed!",
        description: "Your equipment rental has been successfully booked.",
      })

      router.push("/marketplace/account?tab=rentals")
      setIsLoading(false)
    }, 1500)
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
          <Link
            href={`/marketplace/product/${product.id}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to product
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                  <CardDescription>Review your equipment rental details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-sm mt-1">{product.condition} condition</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Rental Period</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(startDate)} - {formatDate(endDate)}
                        </p>
                        <p className="text-sm text-muted-foreground">({days} days)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Pickup Time</p>
                        <p className="text-sm text-muted-foreground">10:00 AM - 6:00 PM</p>
                        <p className="text-sm text-muted-foreground">On {formatDate(startDate)}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Pickup Location</p>
                        <p className="text-sm text-muted-foreground">{product.location}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Renter Information</CardTitle>
                  <CardDescription>Your contact and personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{user.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{user.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Price Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Daily Rate</span>
                    <span>
                      {product.currency} {product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rental Period</span>
                    <span>{days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {product.currency} {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Deposit</span>
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
                  <p className="text-xs text-muted-foreground">
                    Security deposit will be refunded upon safe return of the equipment.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleConfirmBooking} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
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
