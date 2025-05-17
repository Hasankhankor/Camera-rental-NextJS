"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"
import { useProductStore } from "@/lib/product-store"

export default function ListEquipmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addProduct } = useProductStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    condition: "",
    location: "",
    imageUrl: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      // For now, we'll just use a URL input, but in production you'd upload to a storage service
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageUrl: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.imageUrl) {
      toast({
        title: "Image required",
        description: "Please upload an image or provide an image URL.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validate form
    if (!formData.title || !formData.category || !formData.price || !formData.description || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Create new product
      const newProduct = {
        id: `custom-${Date.now()}`,
        name: formData.title,
        category: formData.category,
        price: Number.parseFloat(formData.price),
        currency: "AED",
        image: formData.imageUrl || "/placeholder.svg?height=300&width=300",
        status: "pending",
        description: formData.description,
        condition: formData.condition,
        location: formData.location,
        isApproved: false,
        createdAt: new Date().toISOString(),
      }

      // Add product to store and database
      await addProduct(newProduct)

      toast({
        title: "Equipment listed for review",
        description: "Your equipment has been submitted for review. We'll notify you once it's approved.",
      })
      router.push("/marketplace")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit equipment listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 container py-6">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">List Your Equipment</CardTitle>
              <CardDescription>
                Share your camera gear with the community. All listings will be reviewed before appearing on the
                marketplace.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Equipment Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Sony A7 III Full Frame Camera"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cameras">Cameras</SelectItem>
                        <SelectItem value="Lenses">Lenses</SelectItem>
                        <SelectItem value="Lighting">Lighting</SelectItem>
                        <SelectItem value="Audio">Audio</SelectItem>
                        <SelectItem value="Stabilizers">Stabilizers</SelectItem>
                        <SelectItem value="Supports">Supports</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Daily Rental Price (AED)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="e.g. 150"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your equipment, including specifications, features, and any included accessories."
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleSelectChange("condition", value)}
                    >
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Like New">Like New</SelectItem>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g. Dubai Marina"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Equipment Photos</Label>
                  <div className="border-2 border-dashed rounded-md p-8 text-center">
                    <div className="flex flex-col items-center">
                      <Input
                        id="image"
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="mb-4">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image')?.click()}
                      >
                        Select Image
                      </Button>
                      <span className="mt-2 text-sm text-muted-foreground">or</span>
                      <Input
                        id="imageUrl"
                        placeholder="Paste image URL"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="mt-2 max-w-sm"
                      />
                      <p className="mt-2 text-xs text-muted-foreground">
                        Upload a PNG/JPEG image or provide an image URL
                      </p>
                    </div>
                    {formData.imageUrl && (
                      <div className="mt-4 relative w-full max-w-md mx-auto aspect-video rounded-lg overflow-hidden border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formData.imageUrl}
                          alt="Equipment preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/marketplace")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Listing"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
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
