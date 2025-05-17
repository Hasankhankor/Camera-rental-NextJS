"use client"

import type { FC } from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/db"
import { useProductStore } from "@/lib/product-store"

export const EquipmentApprovals: FC = () => {
  const { toast } = useToast()
  const products = useProductStore(state => state.products)
  const updateProduct = useProductStore(state => state.updateProduct)
  const [pendingProducts, setPendingProducts] = useState<Product[]>([])

  useEffect(() => {
    setPendingProducts(products.filter(p => p.status === "pending"))
  }, [products])

  const handleApprove = async (product: Product) => {
    try {
      const updates: Partial<Product> = {
        status: "available" as const, // Changed from "approved" to "available" to match the status type
        isApproved: true,
        approvedBy: "admin",
        approvalDate: new Date().toISOString()
      }

      await updateProduct(product.id, updates)
      setPendingProducts(prev => prev.filter(p => p.id !== product.id))

      toast({
        title: "Equipment approved",
        description: "The equipment listing is now live on the marketplace."
      })
    } catch (error) {
      console.error("Error approving equipment:", error)
      toast({
        title: "Error",
        description: "Failed to approve equipment. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleReject = async (product: Product) => {
    try {
      const updates: Partial<Product> = {
        status: "rejected" as const,
        isApproved: false,
        approvedBy: "admin",
        approvalDate: new Date().toISOString()
      }

      await updateProduct(product.id, updates)
      setPendingProducts(prev => prev.filter(p => p.id !== product.id))

      toast({
        title: "Equipment rejected",
        description: "The equipment listing has been rejected."
      })
    } catch (error) {
      console.error("Error rejecting equipment:", error)
      toast({
        title: "Error",
        description: "Failed to reject equipment. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (pendingProducts.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-muted-foreground">No pending equipment approvals</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Equipment Approvals</h2>
        <Badge variant="secondary">{pendingProducts.length} Pending</Badge>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Equipment Details</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative w-16 h-16">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {product.price} {product.currency}
                </TableCell>
                <TableCell>{product.location}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleApprove(product)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(product)}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
