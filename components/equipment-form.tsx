"use client"

import { useState } from "react"
import type { Product } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"

interface EquipmentFormData {
  title: string
  category: string
  price: string
  description: string
  condition: string
  location: string
  imageUrl: string
}

interface EquipmentFormProps {
  onSubmit: (product: Partial<Product>) => Promise<void>
  initialData?: Partial<EquipmentFormData>
  submitLabel?: string
  title?: string
  description?: string
}

export function EquipmentForm({
  onSubmit,
  initialData,
  submitLabel = "Add Equipment",
  title = "Add New Equipment",
  description = "Fill out the form below to add new equipment to your inventory."
}: EquipmentFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<EquipmentFormData>({
    title: initialData?.title || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
    condition: initialData?.condition || "",
    location: initialData?.location || "",
    imageUrl: initialData?.imageUrl || "",
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

    try {
      // Validate form
      if (!formData.imageUrl) {
        toast({
          title: "Image required",
          description: "Please upload an image or provide an image URL.",
          variant: "destructive",
        })
        return
      }

      if (!formData.title || !formData.category || !formData.price || !formData.description || !formData.location) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      const productData = {
        name: formData.title,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        condition: formData.condition,
        location: formData.location,
        image: formData.imageUrl,
        currency: "AED",
        status: "available",
      }

      await onSubmit(productData)
    } catch (error) {
      console.error('Failed to submit equipment:', error)
      toast({
        title: "Error",
        description: "Failed to submit the equipment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter equipment name"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cameras">Cameras</SelectItem>
                <SelectItem value="lenses">Lenses</SelectItem>
                <SelectItem value="lighting">Lighting</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Daily Rate (AED)</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter daily rental rate"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the equipment"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="condition">Condition</Label>
            <Select value={formData.condition} onValueChange={(value) => handleSelectChange("condition", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter pickup location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
