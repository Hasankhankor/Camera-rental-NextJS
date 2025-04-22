"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "DSLR Cameras",
    total: 42,
    available: 32,
    rented: 10,
  },
  {
    name: "Mirrorless",
    total: 38,
    available: 25,
    rented: 13,
  },
  {
    name: "Lenses",
    total: 85,
    available: 65,
    rented: 20,
  },
  {
    name: "Lighting",
    total: 30,
    available: 22,
    rented: 8,
  },
  {
    name: "Tripods",
    total: 25,
    available: 18,
    rented: 7,
  },
  {
    name: "Audio",
    total: 20,
    available: 15,
    rented: 5,
  },
  {
    name: "Accessories",
    total: 45,
    available: 35,
    rented: 10,
  },
]

export function InventoryOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <ChartTooltip>
                  <ChartTooltipContent
                    title={payload[0].payload.name}
                    content={[
                      { label: "Total", value: payload[0].payload.total },
                      { label: "Available", value: payload[0].payload.available },
                      { label: "Rented", value: payload[0].payload.rented },
                    ]}
                  />
                </ChartTooltip>
              )
            }
            return null
          }}
        />
        <Bar dataKey="available" fill="#16a34a" radius={[4, 4, 0, 0]} />
        <Bar dataKey="rented" fill="#f97316" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
