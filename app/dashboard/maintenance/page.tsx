import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Calendar, PenToolIcon as Tool } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample maintenance data
const maintenanceItems = [
  {
    id: "M-1001",
    equipment: "Sony A7III",
    issue: "Sensor cleaning required",
    status: "pending",
    priority: "medium",
    reportedDate: "Apr 15, 2024",
    scheduledDate: "Apr 22, 2024",
    notes: "Regular maintenance cleaning needed before next rental.",
  },
  {
    id: "M-1002",
    equipment: "Canon EF 70-200mm f/2.8L IS III USM",
    issue: "Autofocus not working properly",
    status: "in-progress",
    priority: "high",
    reportedDate: "Apr 14, 2024",
    scheduledDate: "Apr 18, 2024",
    notes: "Customer reported inconsistent autofocus performance. Needs calibration.",
  },
  {
    id: "M-1003",
    equipment: "Godox SL-60W LED",
    issue: "Flickering at high power",
    status: "completed",
    priority: "medium",
    reportedDate: "Apr 10, 2024",
    scheduledDate: "Apr 12, 2024",
    completedDate: "Apr 13, 2024",
    notes: "Power supply replaced. Working properly now.",
  },
  {
    id: "M-1004",
    equipment: "DJI Ronin-S Gimbal",
    issue: "Battery not holding charge",
    status: "pending",
    priority: "high",
    reportedDate: "Apr 16, 2024",
    scheduledDate: "Apr 19, 2024",
    notes: "Battery drains within 30 minutes. Needs replacement.",
  },
  {
    id: "M-1005",
    equipment: "Nikon Z6",
    issue: "Routine maintenance check",
    status: "scheduled",
    priority: "low",
    reportedDate: "Apr 17, 2024",
    scheduledDate: "Apr 25, 2024",
    notes: "Regular maintenance check after 50 rentals.",
  },
]

export default function MaintenancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Equipment Maintenance</h1>
        <p className="text-muted-foreground">Track and manage maintenance tasks for your rental equipment.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search maintenance tasks..."
            className="w-full bg-background pl-8 shadow-none md:w-[300px]"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Maintenance Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {maintenanceItems.filter((item) => item.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {maintenanceItems.filter((item) => item.status === "pending" && item.priority === "high").length} high
              priority
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {maintenanceItems.filter((item) => item.status === "scheduled").length}
            </div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {maintenanceItems.filter((item) => item.status === "in-progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently being worked on</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {maintenanceItems.filter((item) => item.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {maintenanceItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{item.equipment}</h3>
                        <Badge
                          variant={
                            item.status === "completed"
                              ? "default"
                              : item.status === "in-progress"
                              ? "secondary"
                              : item.status === "scheduled"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {item.status}
                        </Badge>
                        {item.priority === "high" && (
                          <Badge variant="destructive" className="ml-2">
                            High Priority
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Task ID: {item.id}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="font-medium">Issue:</p>
                    <p className="text-sm text-muted-foreground">{item.issue}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Reported</p>
                        <p className="text-sm text-muted-foreground">{item.reportedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Scheduled</p>
                        <p className="text-sm text-muted-foreground">{item.scheduledDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tool className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Notes</p>
                        <p className="text-sm text-muted-foreground">{item.notes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {item.status === "pending" && (
                      <Button size="sm">Start Maintenance</Button>
                    )}
                    {item.status === "in-progress" && (
                      <Button size="sm">Mark as Completed</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other tab contents would follow the same pattern */}
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {maintenanceItems
              .filter((item) => item.status === "pending")
              .map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    {/* Similar content structure */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{item.equipment}</h3>
                          <Badge variant="destructive">{item.status}</Badge>
                          {item.priority === "high" && (
                            <Badge variant="destructive" className="ml-2">
                              High Priority
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Task ID: {item.id}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="font-medium">Issue:</p>
                      <p className="text-sm text-muted-foreground">{item.issue}</p>
                    </div>

                    <div className="grid grid-cols\
