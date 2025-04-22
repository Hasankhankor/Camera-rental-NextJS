import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, FileText, User, Calendar, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample order data
const orders = [
  {
    id: "ORD-1234",
    customer: "Sarah Johnson",
    equipment: "Sony A7III + 24-70mm Lens",
    status: "completed",
    date: "Apr 18, 2024",
    amount: 255.0,
    paymentMethod: "Credit Card",
    invoiceNumber: "INV-1234-A",
  },
  {
    id: "ORD-1235",
    customer: "Michael Chen",
    equipment: "Canon EOS R5 + 3 Lenses",
    status: "processing",
    date: "Apr 17, 2024",
    amount: 600.0,
    paymentMethod: "PayPal",
    invoiceNumber: "INV-1235-A",
  },
  {
    id: "ORD-1236",
    customer: "Alex Rodriguez",
    equipment: "Lighting Kit + Stands",
    status: "pending",
    date: "Apr 20, 2024",
    amount: 90.0,
    paymentMethod: "Credit Card",
    invoiceNumber: "INV-1236-A",
  },
  {
    id: "ORD-1237",
    customer: "Emily Wong",
    equipment: "DJI Ronin Gimbal",
    status: "completed",
    date: "Apr 16, 2024",
    amount: 255.0,
    paymentMethod: "Bank Transfer",
    invoiceNumber: "INV-1237-A",
  },
  {
    id: "ORD-1238",
    customer: "David Smith",
    equipment: "Nikon Z6 + 50mm Lens",
    status: "cancelled",
    date: "Apr 10, 2024",
    amount: 375.0,
    paymentMethod: "Credit Card",
    invoiceNumber: "INV-1238-A",
  },
]

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Manage and track all equipment rental orders.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full bg-background pl-8 shadow-none md:w-[300px]"
          />
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "processing"
                                ? "secondary"
                                : order.status === "pending"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Invoice: {order.invoiceNumber}</p>
                    </div>
                    <div className="font-bold">AED {order.amount.toFixed(2)}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Order Date</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Payment Method</p>
                        <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Equipment</p>
                        <p className="text-sm text-muted-foreground">{order.equipment}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm">
                          Cancel
                        </Button>
                        <Button size="sm">Process</Button>
                      </>
                    )}
                    {order.status === "processing" && <Button size="sm">Mark as Completed</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tab contents would follow the same pattern */}
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {orders
              .filter((o) => o.status === "pending")
              .map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <Badge variant="outline">{order.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Invoice: {order.invoiceNumber}</p>
                      </div>
                      <div className="font-bold">AED {order.amount.toFixed(2)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Customer</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Order Date</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Equipment</p>
                          <p className="text-sm text-muted-foreground">{order.equipment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                      <Button size="sm">Process</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          <div className="grid gap-4">
            {orders
              .filter((o) => o.status === "processing")
              .map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    {/* Similar content structure */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <Badge variant="secondary">{order.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Invoice: {order.invoiceNumber}</p>
                      </div>
                      <div className="font-bold">AED {order.amount.toFixed(2)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Customer</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Order Date</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Equipment</p>
                          <p className="text-sm text-muted-foreground">{order.equipment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Mark as Completed</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {orders
              .filter((o) => o.status === "completed")
              .map((order) => (
                <Card key={order.id}>
                  {/* Similar content structure */}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <Badge variant="default">{order.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Invoice: {order.invoiceNumber}</p>
                      </div>
                      <div className="font-bold">AED {order.amount.toFixed(2)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Customer</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Order Date</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Equipment</p>
                          <p className="text-sm text-muted-foreground">{order.equipment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <div className="grid gap-4">
            {orders
              .filter((o) => o.status === "cancelled")
              .map((order) => (
                <Card key={order.id}>
                  {/* Similar content structure */}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{order.id}</h3>
                          <Badge variant="destructive">{order.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Invoice: {order.invoiceNumber}</p>
                      </div>
                      <div className="font-bold">AED {order.amount.toFixed(2)}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Customer</p>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Order Date</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Equipment</p>
                          <p className="text-sm text-muted-foreground">{order.equipment}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
