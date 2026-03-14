"use client"

import { useMemo } from "react"
import { Globe, Wifi, Activity, Router } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CyberCard } from "@/components/shared/cyber-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { networkNodes, generateTrafficData, generateLatencyData } from "@/lib/mock-data"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"

// Force dynamic rendering to avoid prerendering issues
export const dynamic = 'force-dynamic'

const typeIcons: Record<string, string> = {
  router: "bg-blue-500",
  switch: "bg-emerald-500",
  firewall: "bg-red-500",
  server: "bg-cyan-500",
  loadbalancer: "bg-purple-500",
}

const chartTooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(100,116,139,0.3)",
  borderRadius: 8,
  fontSize: 12,
  color: "#e2e8f0",
}

export default function NetworkPage() {
  const trafficData = useMemo(() => generateTrafficData(24), [])
  const latencyData = useMemo(() => generateLatencyData(), [])

  return (
    <div className="space-y-6">
      {/* Network topology */}
      <CyberCard title="Network Topology" icon={Globe} iconColor="text-cyan-400" glow>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {networkNodes.map((node) => (
            <div
              key={node.id}
              className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-4 hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${typeIcons[node.type]}`} />
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">{node.type}</span>
                </div>
                <StatusBadge status={node.status} />
              </div>
              <h4 className="text-sm font-medium text-slate-200 mb-1">{node.name}</h4>
              <p className="text-xs font-mono text-slate-400 mb-3">{node.ip}</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">In</span>
                  <span className="font-mono text-emerald-400">{node.traffic.inbound} MB/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Out</span>
                  <span className="font-mono text-blue-400">{node.traffic.outbound} MB/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Latency</span>
                  <span className={`font-mono ${node.latency < 10 ? "text-emerald-400" : node.latency < 50 ? "text-amber-400" : "text-red-400"}`}>
                    {node.latency}ms
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CyberCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic chart */}
        <CyberCard title="Bandwidth (24h)" icon={Activity} iconColor="text-emerald-400">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="outGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" vertical={false} />
                <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="inbound" stroke="#10b981" fill="url(#inGrad)" strokeWidth={2} name="Inbound (MB/s)" />
                <Area type="monotone" dataKey="outbound" stroke="#3b82f6" fill="url(#outGrad)" strokeWidth={2} name="Outbound (MB/s)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Inbound</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Outbound</span>
          </div>
        </CyberCard>

        {/* Latency monitor */}
        <CyberCard title="Latency Monitor" icon={Wifi} iconColor="text-amber-400" noPadding>
          <div className="divide-y divide-slate-700/30">
            {latencyData.map((ep) => (
              <div key={ep.endpoint} className="flex items-center gap-4 px-4 py-3 hover:bg-slate-800/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 truncate">{ep.endpoint}</p>
                </div>
                {/* Sparkline */}
                <div className="flex items-end gap-px h-6 w-24 shrink-0">
                  {ep.history.map((v, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-t-sm ${
                        v < 50 ? "bg-emerald-500/60" : v < 100 ? "bg-amber-500/60" : "bg-red-500/60"
                      }`}
                      style={{ height: `${Math.min(100, (v / 150) * 100)}%` }}
                    />
                  ))}
                </div>
                <span
                  className={`text-sm font-mono tabular-nums min-w-[60px] text-right ${
                    ep.latency < 50 ? "text-emerald-400" : ep.latency < 100 ? "text-amber-400" : "text-red-400"
                  }`}
                >
                  {ep.latency}ms
                </span>
                <StatusBadge status={ep.status === "good" ? "online" : ep.status === "warning" ? "warning" : "degraded"} />
              </div>
            ))}
          </div>
        </CyberCard>
      </div>
    </div>
  )
}
