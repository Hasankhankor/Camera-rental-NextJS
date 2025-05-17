"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Camera, Package, Star, Settings, LogOut } from "lucide-react"
import { useUserStore } from "@/lib/user-store"
import { useProductStore } from "@/lib/product-store"
import { useBookingStore } from "@/lib/booking-store"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { user, updateProfile, logout } = useUserStore()
  const { products } = useProductStore()
  const { getBookingsByCustomerId } = useBookingStore()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile")

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    router.push("/login")
  }

  // Don't render anything while checking authentication
  if (!user) {
    return null
  }

  // Initialize form state after we're sure user exists
  const [profileForm, setProfileForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || "",
    location: user.location || "",
    bio: user.bio || "",
  })

  // Filter products to only show those created by the current user
  const userProducts = products.filter((product) => product.id.startsWith("custom-"))

  // Get user bookings
  const userBookings = getBookingsByCustomerId(user.id)

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        toast({
          title: "Invalid file type",
          description: "Please upload a PNG or JPEG image.",
          variant: "destructive",
        })
        return
      }

      try {
        const reader = new FileReader()
        reader.onloadend = async () => {
          await updateProfile({
            avatar: reader.result as string
          })
          toast({
            title: "Profile picture updated",
            description: "Your profile picture has been updated successfully.",
          })
        }
        reader.readAsDataURL(file)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to update profile picture. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateProfile({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        phone: profileForm.phone,
        location: profileForm.location,
        bio: profileForm.bio,
      })

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <div className="flex flex-col items-center p-4 border rounded-lg bg-card">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src={user.avatar || "/placeholder.svg?height=96&width=96"}
                  alt="Profile picture"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-3 font-medium">Account Navigation</div>
              <div className="p-2">
                <nav className="flex flex-col space-y-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-accent text-left w-full ${activeTab === "profile" ? "bg-accent" : ""}`}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("listings")}
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-accent text-left w-full ${activeTab === "listings" ? "bg-accent" : ""}`}
                  >
                    <Camera className="h-4 w-4" />
                    <span>My Listings</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("rentals")}
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-accent text-left w-full ${activeTab === "rentals" ? "bg-accent" : ""}`}
                  >
                    <Package className="h-4 w-4" />
                    <span>My Rentals</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex items-center gap-2 p-2 rounded-md hover:bg-accent text-left w-full ${activeTab === "reviews" ? "bg-accent" : ""}`}
                  >
                    <Star className="h-4 w-4" />
                    <span>Reviews</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-accent text-left w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="rentals">My Rentals</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and contact details.</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleProfileSubmit}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" value={profileForm.firstName} onChange={handleProfileChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" value={profileForm.lastName} onChange={handleProfileChange} required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={profileForm.email} disabled className="bg-muted" />
                        <p className="text-xs text-muted-foreground">
                          Email cannot be changed. Contact support for assistance.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={profileForm.phone} onChange={handleProfileChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" value={profileForm.location} onChange={handleProfileChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          rows={4}
                          placeholder="Tell others about yourself and your photography experience..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="avatar">Profile Picture</Label>
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <Image
                              src={user.avatar || "/placeholder.svg?height=64&width=64"}
                              alt="Profile picture"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <input
                              type="file"
                              id="avatar"
                              accept="image/png,image/jpeg"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('avatar')?.click()}
                            >
                              Change Picture
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="listings">
                <Card>
                  <CardHeader>
                    <CardTitle>My Equipment Listings</CardTitle>
                    <CardDescription>Manage your equipment listings and track their status.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userProducts.length > 0 ? (
                      <div className="space-y-4">
                        {userProducts.map((product) => (
                          <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden">
                              <Image
                                src={product.image || "/placeholder.svg?height=64&width=64"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{product.name}</h3>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-medium">
                                  {product.currency} {product.price.toFixed(2)}/day
                                </span>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    product.status === "available"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                                  }`}
                                >
                                  {product.status === "available" ? "Active" : "Pending Review"}
                                </span>
                              </div>
                            </div>
                            <div>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">You haven't listed any equipment yet.</p>
                        <Link href="/marketplace/list-equipment">
                          <Button className="mt-4">List Equipment</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rentals">
                <Card>
                  <CardHeader>
                    <CardTitle>My Rentals</CardTitle>
                    <CardDescription>View your current and past equipment rentals.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userBookings.length > 0 ? (
                      <div className="space-y-4">
                        {userBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="flex flex-col md:flex-row items-start gap-4 p-4 border rounded-lg"
                          >
                            <div className="relative w-20 h-20 rounded-md overflow-hidden">
                              <Image
                                src={booking.productImage || "/placeholder.svg?height=80&width=80"}
                                alt={booking.productName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <h3 className="font-medium">{booking.productName}</h3>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    booking.status === "active"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : booking.status === "confirmed"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                        : booking.status === "completed"
                                          ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  }`}
                                >
                                  {booking.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                                <div>
                                  <p className="text-xs font-medium">Rental Period</p>
                                  <p className="text-sm">
                                    {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium">Location</p>
                                  <p className="text-sm">{booking.location}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium">Total Amount</p>
                                  <p className="text-sm font-medium">
                                    {booking.currency} {booking.totalAmount.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="self-end mt-2 md:mt-0">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">You don't have any active rentals.</p>
                        <Link href="/marketplace">
                          <Button className="mt-4">Browse Equipment</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                    <CardDescription>Reviews you've received and given.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">You don't have any reviews yet.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 CaptureCart. All rights reserved.</p>
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
