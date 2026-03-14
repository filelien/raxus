"use client"

import { useState } from "react"
import { Database, Activity, Gauge, Search, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CyberCard } from "@/components/shared/cyber-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { databaseInstances, activeQueries } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

const dbTypeColors: Record<string, string> = {
  oracle: "text-red-400 bg-red-500/10 border-red-500/30",
  postgresql: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  mysql: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  mongodb: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
}

const chartTooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(100,116,139,0.3)",
  borderRadius: 8,
  fontSize: 12,
  color: "#e2e8f0",
}

function generateQpsData(base: number) {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    qps: Math.floor(base * (0.5 + Math.random())),
  }))
}

export default function DatabasesPage() {
  const [selectedId, setSelectedId] = useState(databaseInstances[0].id)
  const selected = databaseInstances.find((d) => d.id === selectedId) || databaseInstances[0]
  const qpsData = generateQpsData(selected.queriesPerSec)

  return (
    <div className="space-y-6">
      {/* Database instance cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {databaseInstances.map((db) => (
          <button
            key={db.id}
            onClick={() => setSelectedId(db.id)}
            className={`text-left rounded-lg border p-4 transition-all ${
              db.id === selectedId
                ? "border-cyan-500/40 bg-slate-800/70 cyber-glow"
                : "border-slate-700/50 bg-slate-900/50 hover:bg-slate-800/50"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className={`text-[10px] ${dbTypeColors[db.type]}`}>
                {db.type.toUpperCase()}
              </Badge>
              <StatusBadge status={db.status} />
            </div>
            <h3 className="text-sm font-medium text-slate-200 mb-1">{db.name}</h3>
            <p className="text-xs text-slate-500 mb-3">{db.version}</p>

            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-slate-500">Connections</span>
                  <span className="text-[10px] tabular-nums text-slate-400">
                    {db.connections.active}/{db.connections.max}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      db.connections.active / db.connections.max > 0.8 ? "bg-amber-500" : "bg-cyan-500"
                    }`}
                    style={{ width: `${(db.connections.active / db.connections.max) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Size</span>
                <span className="text-slate-300">{db.size}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">QPS</span>
                <span className="font-mono text-cyan-400">{db.queriesPerSec.toLocaleString()}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Detail area with tabs */}
      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="bg-slate-800/50 p-1">
          <TabsTrigger value="metrics" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
            Metrics
          </TabsTrigger>
          <TabsTrigger value="queries" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
            Active Queries
          </TabsTrigger>
          <TabsTrigger value="slow" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
            Slow Queries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Stats cards */}
            <div className="lg:col-span-4 space-y-4">
              <CyberCard title="Instance Details" icon={Database} iconColor="text-cyan-400">
                <div className="space-y-3">
                  {[
                    { label: "Host", value: selected.host },
                    { label: "Port", value: String(selected.port) },
                    { label: "Uptime", value: selected.uptime },
                    { label: "Replication", value: selected.replication },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{item.label}</span>
                      <span className="text-sm font-mono text-slate-200">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CyberCard>

              <CyberCard title="Performance" icon={Gauge} iconColor="text-emerald-400">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-400">Cache Hit Ratio</span>
                      <span className="text-sm font-mono text-emerald-400">{selected.cacheHitRatio}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                        style={{ width: `${selected.cacheHitRatio}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-400">Connection Usage</span>
                      <span className="text-sm font-mono text-cyan-400">
                        {Math.round((selected.connections.active / selected.connections.max) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${(selected.connections.active / selected.connections.max) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Active Connections</span>
                    <span className="text-lg font-mono font-bold text-cyan-400">{selected.connections.active}</span>
                  </div>
                </div>
              </CyberCard>
            </div>

            {/* QPS chart */}
            <div className="lg:col-span-8">
              <CyberCard title="Queries Per Second (24h)" icon={Zap} iconColor="text-amber-400">
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={qpsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" vertical={false} />
                      <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                      <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={chartTooltipStyle} />
                      <Bar dataKey="qps" fill="#22d3ee" radius={[3, 3, 0, 0]} name="QPS" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CyberCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="queries" className="mt-4">
          <CyberCard title="Active Queries" icon={Activity} iconColor="text-cyan-400" noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/50">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">PID</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Database</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">User</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Query</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Duration</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {activeQueries.map((q) => (
                    <tr key={q.pid} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-400">{q.pid}</td>
                      <td className="px-4 py-2.5 text-slate-300 text-xs">{q.database}</td>
                      <td className="px-4 py-2.5 text-slate-400 text-xs">{q.user}</td>
                      <td className="px-4 py-2.5 max-w-xs">
                        <code className="text-[11px] text-cyan-300/80 bg-slate-800/60 px-1.5 py-0.5 rounded font-mono truncate block">
                          {q.query}
                        </code>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-xs text-slate-300">{q.duration}</td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={q.status === "active" ? "online" : q.status === "idle" ? "standby" : "warning"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CyberCard>
        </TabsContent>

        <TabsContent value="slow" className="mt-4">
          <CyberCard title="Slow Query Log" icon={Activity} iconColor="text-amber-400" noPadding>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-slate-800/50">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Time</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Database</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Query</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Duration</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Rows</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {activeQueries
                    .filter((q) => q.duration > "00:01:00")
                    .map((q) => (
                      <tr key={q.pid} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-xs text-slate-400">{q.duration}</td>
                        <td className="px-4 py-2.5 text-slate-300 text-xs">{q.database}</td>
                        <td className="px-4 py-2.5 max-w-sm">
                          <code className="text-[11px] text-amber-300/80 bg-slate-800/60 px-1.5 py-0.5 rounded font-mono truncate block">
                            {q.query}
                          </code>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-xs text-amber-400">{q.duration}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-slate-300">{q.rows.toLocaleString()}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CyberCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
