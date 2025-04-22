import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const returns = [
  {
    id: "R-1234",
    equipment: "Sony A7III + 24-70mm Lens",
    customer: "Sarah Johnson",
    dueDate: "Apr 21, 2024",
    dueTime: "5:00 PM",
    status: "on-time",
  },
  {
    id: "R-1235",
    equipment: "Canon EOS R5 + 3 Lenses",
    customer: "Michael Chen",
    dueDate: "Apr 22, 2024",
    dueTime: "10:00 AM",
    status: "on-time",
  },
  {
    id: "R-1236",
    equipment: "DJI Ronin Gimbal",
    customer: "Emily Wong",
    dueDate: "Apr 19, 2024",
    dueTime: "3:00 PM",
    status: "late",
  },
  {
    id: "R-1237",
    equipment: "Nikon Z6 + 50mm Lens",
    customer: "David Smith",
    dueDate: "Apr 23, 2024",
    dueTime: "12:00 PM",
    status: "on-time",
  },
]

export function UpcomingReturns() {
  return (
    <div className="space-y-4">
      {returns.map((item) => (
        <div key={item.id} className="flex flex-col space-y-2 rounded-md border p-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{item.equipment}</h4>
            <Badge variant={item.status === "on-time" ? "outline" : "destructive"}>
              {item.status === "on-time" ? "On Time" : "Late"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{item.customer}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{item.dueDate}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{item.dueTime}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
