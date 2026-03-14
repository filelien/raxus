"use client"

import { useState } from "react"
import { Shield, AlertTriangle, Lock, Eye, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CyberCard } from "@/components/shared/cyber-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { securityEvents, firewallRules } from "@/lib/mock-data"
import { useSimulatedMetrics } from "@/hooks/use-simulated-metrics"

const severityColors: Record<string, string> = {
  critical: "text-red-400 bg-red-500/10 border-red-500/30",
  high: "text-orange-400 bg-orange-500/10 border-orange-500/30",
  medium: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  low: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  info: "text-slate-400 bg-slate-500/10 border-slate-500/30",
}

export default function SecurityPage() {
  const [rules, setRules] = useState(firewallRules)
  const metrics = useSimulatedMetrics()

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    )
  }

  const criticalCount = securityEvents.filter((e) => e.severity === "critical").length
  const highCount = securityEvents.filter((e) => e.severity === "high").length
  const activeThreats = securityEvents.filter((e) => e.status === "active").length

  return (
    <div className="space-y-6">
      {/* Threat overview row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Security Level", value: `${metrics.securityLevel}%`, color: "text-emerald-400", sub: "System Protection" },
          { label: "Active Threats", value: String(activeThreats), color: activeThreats > 0 ? "text-red-400" : "text-emerald-400", sub: "Requires Attention" },
          { label: "Critical Events", value: String(criticalCount), color: "text-red-400", sub: "Last 24 hours" },
          { label: "Blocked Attacks", value: "1,247", color: "text-cyan-400", sub: "This month" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-slate-700/50 bg-slate-900/60 p-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">{stat.label}</p>
            <p className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Security events */}
        <div className="lg:col-span-7">
          <CyberCard title="Security Events" icon={AlertTriangle} iconColor="text-amber-400" noPadding>
            <div className="divide-y divide-slate-700/30">
              {securityEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-800/50 transition-colors">
                  <div className="mt-1">
                    <Badge variant="outline" className={`text-[9px] px-1.5 ${severityColors[event.severity]}`}>
                      {event.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-medium text-slate-200">{event.title}</h4>
                      <StatusBadge status={event.status} />
                    </div>
                    <p className="text-xs text-slate-400 mb-1">{event.description}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span>Source: <span className="font-mono text-slate-400">{event.source}</span></span>
                      <span>{new Date(event.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CyberCard>
        </div>

        {/* Firewall rules */}
        <div className="lg:col-span-5">
          <CyberCard title="Firewall Rules" icon={Lock} iconColor="text-cyan-400" noPadding>
            <div className="divide-y divide-slate-700/30">
              {rules.map((rule) => (
                <div key={rule.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800/50 transition-colors">
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={() => toggleRule(rule.id)}
                    className="shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-200">{rule.name}</span>
                      <Badge
                        variant="outline"
                        className={`text-[9px] px-1.5 ${
                          rule.action === "allow"
                            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                            : rule.action === "deny"
                              ? "text-red-400 bg-red-500/10 border-red-500/30"
                              : "text-amber-400 bg-amber-500/10 border-amber-500/30"
                        }`}
                      >
                        {rule.action.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                      <span>Port {rule.port}</span>
                      <span>{rule.protocol}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CyberCard>
        </div>
      </div>

      {/* Audit log */}
      <CyberCard title="Audit Log" icon={Eye} iconColor="text-blue-400" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50 bg-slate-800/50">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Time</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Type</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Severity</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Event</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Source</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {securityEvents.map((event) => (
                <tr key={event.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-400 whitespace-nowrap">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge variant="outline" className="text-[10px] bg-slate-700/50 text-slate-300 border-slate-600/50">
                      {event.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    <Badge variant="outline" className={`text-[10px] ${severityColors[event.severity]}`}>
                      {event.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-200 max-w-xs truncate">{event.title}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-slate-400">{event.source}</td>
                  <td className="px-4 py-2.5">
                    <StatusBadge status={event.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CyberCard>
    </div>
  )
}
