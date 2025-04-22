"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    utilization: 65,
    maintenance: 12,
  },
  {
    name: "Feb",
    utilization: 59,
    maintenance: 10,
  },
  {
    name: "Mar",
    utilization: 80,
    maintenance: 15,
  },
  {
    name: "Apr",
    utilization: 81,
    maintenance: 8,
  },
  {
    name: "May",
    utilization: 56,
    maintenance: 14,
  },
  {
    name: "Jun",
    utilization: 55,
    maintenance: 9,
  },
  {
    name: "Jul",
    utilization: 72,
    maintenance: 11,
  },
  {
    name: "Aug",
    utilization: 69,
    maintenance: 13,
  },
  {
    name: "Sep",
    utilization: 75,
    maintenance: 10,
  },
  {
    name: "Oct",
    utilization: 80,
    maintenance: 12,
  },
  {
    name: "Nov",
    utilization: 85,
    maintenance: 14,
  },
  {
    name: "Dec",
    utilization: 90,
    maintenance: 16,
  },
]

export function InventoryStats() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <ChartTooltip>
                  <ChartTooltipContent
                    title={payload[0].payload.name}
                    content={[
                      { label: "Utilization", value: `${payload[0].value}%` },
                      { label: "Maintenance", value: `${payload[1].value}%` },
                    ]}
                  />
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="utilization" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="maintenance" stroke="#f97316" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
