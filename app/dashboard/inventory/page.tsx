import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InventoryList } from "@/components/inventory-list"
import { Plus, Search } from "lucide-react"

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">Manage your camera equipment inventory.</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search inventory..."
            className="w-full bg-background pl-8 shadow-none md:w-[300px]"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
        </Button>
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
        <TabsContent value="all" className="space-y-4">
          <InventoryList />
        </TabsContent>
        <TabsContent value="cameras" className="space-y-4">
          <InventoryList category="cameras" />
        </TabsContent>
        <TabsContent value="lenses" className="space-y-4">
          <InventoryList category="lenses" />
        </TabsContent>
        <TabsContent value="lighting" className="space-y-4">
          <InventoryList category="lighting" />
        </TabsContent>
        <TabsContent value="audio" className="space-y-4">
          <InventoryList category="audio" />
        </TabsContent>
        <TabsContent value="accessories" className="space-y-4">
          <InventoryList category="accessories" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
