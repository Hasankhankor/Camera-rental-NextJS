"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { useProductStore } from "@/lib/product-store"
import { useToast } from "@/components/ui/use-toast"

interface InventoryListProps {
  category?: string
  searchQuery?: string
}

export function InventoryList({ category = "all", searchQuery = "" }: InventoryListProps) {
  const { products, init, isInitialized, deleteProduct } = useProductStore()
  const { toast } = useToast()
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null)

  useEffect(() => {
    if (!isInitialized) {
      init()
    }
  }, [init, isInitialized])

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
      toast({
        title: "Equipment deleted",
        description: "The equipment has been removed from inventory and marketplace.",
      })
    } catch (error) {
      console.error('Failed to delete equipment:', error)
      toast({
        title: "Error",
        description: "Failed to delete the equipment. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Filter products by category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = category === "all" || product.category === category
    const matchesSearch = searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (filteredProducts.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
        <p className="text-sm text-muted-foreground">
          {searchQuery
            ? "No items match your search criteria"
            : category === "all"
              ? "No equipment items found"
              : `No ${category} found`}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
              <Badge
                variant={item.status === "available" ? "default" : "secondary"}
                className="absolute top-2 right-2"
              >
                {item.status}
              </Badge>
            </div>
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setDeleteItemId(item.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
            <CardFooter className="p-4">
              <p className="text-sm font-medium">AED {item.price}/day</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteItemId} onOpenChange={() => setDeleteItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Equipment</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this equipment from both the inventory and marketplace.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (deleteItemId) {
                  handleDelete(deleteItemId)
                }
                setDeleteItemId(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
