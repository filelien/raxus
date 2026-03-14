"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { generatePerformanceData } from "@/lib/mock-data"

export function PerformanceChart() {
  const data = useMemo(() => generatePerformanceData(24), [])

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={1} barSize={6}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fill: "#64748b", fontSize: 10 }}
            axisLine={{ stroke: "rgba(100,116,139,0.2)" }}
            tickLine={false}
            interval={3}
          />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(100,116,139,0.3)",
              borderRadius: 8,
              fontSize: 12,
              color: "#e2e8f0",
            }}
            labelStyle={{ color: "#94a3b8" }}
          />
          <Bar dataKey="cpu" fill="#22d3ee" radius={[2, 2, 0, 0]} name="CPU" />
          <Bar dataKey="memory" fill="#a855f7" radius={[2, 2, 0, 0]} name="Memory" />
          <Bar dataKey="network" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Network" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
