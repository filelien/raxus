"use client"

import { useState, useMemo } from "react"
import { Cpu, HardDrive, MemoryStick, Plus, Search, Server, Wifi } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CyberCard } from "@/components/shared/cyber-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { servers } from "@/lib/mock-data"
import { useSimulatedMetrics } from "@/hooks/use-simulated-metrics"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts"

function generateCpuHistory() {
  return Array.from({ length: 30 }, (_, i) => ({
    time: `${i}m`,
    value: Math.floor(Math.random() * 40) + 30,
  }))
}

function generateMemHistory() {
  return Array.from({ length: 30 }, (_, i) => ({
    time: `${i}m`,
    value: Math.floor(Math.random() * 25) + 55,
  }))
}

const chartTooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(100,116,139,0.3)",
  borderRadius: 8,
  fontSize: 12,
  color: "#e2e8f0",
}

export default function ServersPage() {
  const [selectedId, setSelectedId] = useState(servers[0].id)
  const [filter, setFilter] = useState("")
  const metrics = useSimulatedMetrics(5000)

  const filteredServers = servers.filter(
    (s) =>
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.ip.includes(filter)
  )

  const selected = servers.find((s) => s.id === selectedId) || servers[0]

  const cpuHistory = useMemo(() => generateCpuHistory(), [selectedId])
  const memHistory = useMemo(() => generateMemHistory(), [selectedId])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Server list */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-1.5 rounded-lg bg-slate-800/60 px-3 py-2 border border-slate-700/50">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search servers..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-slate-950 font-medium">
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-2">
          {filteredServers.map((srv) => (
            <button
              key={srv.id}
              onClick={() => setSelectedId(srv.id)}
              className={`w-full text-left rounded-lg border p-4 transition-all ${
                srv.id === selectedId
                  ? "border-cyan-500/40 bg-slate-800/70 cyber-glow"
                  : "border-slate-700/50 bg-slate-900/50 hover:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-medium text-slate-200">{srv.name}</span>
                </div>
                <StatusBadge status={srv.status} />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="font-mono">{srv.ip}</span>
                <span>{srv.os}</span>
                <span>{srv.location}</span>
              </div>
              {srv.status !== "offline" && srv.status !== "maintenance" && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { label: "CPU", value: srv.cpu, color: srv.cpu > 80 ? "bg-red-500" : "bg-cyan-500" },
                    { label: "MEM", value: srv.memory, color: srv.memory > 80 ? "bg-amber-500" : "bg-purple-500" },
                    { label: "DISK", value: srv.disk, color: srv.disk > 80 ? "bg-red-500" : "bg-blue-500" },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] text-slate-500">{m.label}</span>
                        <span className="text-[10px] tabular-nums text-slate-400">{m.value}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-slate-700 overflow-hidden">
                        <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Server detail */}
      <div className="lg:col-span-7 space-y-6">
        <CyberCard title={selected.name} icon={Server} iconColor="text-cyan-400" glow>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Status", content: <StatusBadge status={selected.status} /> },
              { label: "IP Address", content: <span className="font-mono text-sm text-slate-200">{selected.ip}</span> },
              { label: "OS", content: <span className="text-sm text-slate-200">{selected.os}</span> },
              { label: "Uptime", content: <span className="font-mono text-sm text-slate-200">{selected.uptime}</span> },
              { label: "Cores", content: <span className="font-mono text-sm text-cyan-400">{selected.cores}</span> },
              { label: "RAM", content: <span className="font-mono text-sm text-purple-400">{selected.ramTotal} GB</span> },
              { label: "Location", content: <span className="text-sm text-slate-200">{selected.location}</span> },
              { label: "Last Checked", content: <span className="text-xs text-slate-400">{selected.lastChecked}</span> },
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-slate-700/50 bg-slate-800/40 p-3">
                <div className="text-[10px] uppercase tracking-wide text-slate-500 mb-1">{item.label}</div>
                {item.content}
              </div>
            ))}
          </div>
        </CyberCard>

        {/* CPU chart */}
        <CyberCard title="CPU Usage (Last 30 min)" icon={Cpu} iconColor="text-cyan-400">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuHistory}>
                <defs>
                  <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="#22d3ee" fill="url(#cpuGrad)" strokeWidth={2} name="CPU %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CyberCard>

        {/* Memory chart */}
        <CyberCard title="Memory Usage (Last 30 min)" icon={MemoryStick} iconColor="text-purple-400">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memHistory}>
                <defs>
                  <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="#a855f7" fill="url(#memGrad)" strokeWidth={2} name="Memory %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CyberCard>
      </div>
    </div>
  )
}
