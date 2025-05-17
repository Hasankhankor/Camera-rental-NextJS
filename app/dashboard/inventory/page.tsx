'use client'

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { InventoryList } from "@/components/inventory-list"
import { EquipmentApprovals } from "@/components/equipment-approvals"
import { EquipmentForm } from "@/components/equipment-form"
import { Plus, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ErrorBoundary } from "react-error-boundary"
import { useProductStore } from "@/lib/product-store"

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  const { toast } = useToast()

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <p className="text-lg font-medium">Something went wrong</p>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  )
}

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("inventory")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { addProduct } = useProductStore()

  const handleAddEquipment = async (data: any) => {
    try {
      await addProduct(data)
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error('Failed to add equipment:', error)
      throw error
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground">Manage equipment inventory and review new listings.</p>
      </div>

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => setActiveTab("inventory")}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search inventory..."
                  className="w-full bg-background pl-8 shadow-none md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Equipment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <EquipmentForm onSubmit={handleAddEquipment} />
                </DialogContent>
              </Dialog>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="cameras">Cameras</TabsTrigger>
                <TabsTrigger value="lenses">Lenses</TabsTrigger>
                <TabsTrigger value="lighting">Lighting</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
              </TabsList>
              <Suspense fallback={<div>Loading inventory...</div>}>
                <TabsContent value="all" className="space-y-4">
                  <InventoryList searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="cameras" className="space-y-4">
                  <InventoryList category="cameras" searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="lenses" className="space-y-4">
                  <InventoryList category="lenses" searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="lighting" className="space-y-4">
                  <InventoryList category="lighting" searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="audio" className="space-y-4">
                  <InventoryList category="audio" searchQuery={searchQuery} />
                </TabsContent>
                <TabsContent value="accessories" className="space-y-4">
                  <InventoryList category="accessories" searchQuery={searchQuery} />
                </TabsContent>
              </Suspense>
            </Tabs>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-4">
            <Suspense fallback={<div>Loading approvals...</div>}>
              <EquipmentApprovals />
            </Suspense>
          </TabsContent>
        </Tabs>
      </ErrorBoundary>
    </div>
  )
}
