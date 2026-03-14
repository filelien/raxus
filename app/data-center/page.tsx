"use client"

import { useState, useEffect } from "react"
import { Server, Database, Network, Shield, Activity, MapPin } from "lucide-react"
import { CyberCard } from "@/components/shared/cyber-card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { StatusBadge } from "@/components/shared/status-badge"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useSimulatedMetrics } from "@/hooks/use-simulated-metrics"

interface DataCenter {
  id: string
  name: string
  location: string
  status: "online" | "maintenance" | "offline"
  capacity: number
  utilization: number
  servers: number
  activeServers: number
  powerConsumption: number
  temperature: number
  uptime: string
}

const dataCenters: DataCenter[] = [
  {
    id: "dc-01",
    name: "Primary DC - East",
    location: "New York, NY",
    status: "online",
    capacity: 1000,
    utilization: 78,
    servers: 500,
    activeServers: 485,
    powerConsumption: 245,
    temperature: 22,
    uptime: "99.98%"
  },
  {
    id: "dc-02",
    name: "Secondary DC - West",
    location: "San Francisco, CA",
    status: "online",
    capacity: 800,
    utilization: 65,
    servers: 400,
    activeServers: 392,
    powerConsumption: 189,
    temperature: 20,
    uptime: "99.95%"
  },
  {
    id: "dc-03",
    name: "Backup DC - Central",
    location: "Chicago, IL",
    status: "maintenance",
    capacity: 600,
    utilization: 45,
    servers: 300,
    activeServers: 285,
    powerConsumption: 134,
    temperature: 18,
    uptime: "99.92%"
  }
]

export default function DataCenterPage() {
  const metrics = useSimulatedMetrics()
  const [selectedDC, setSelectedDC] = useState<string | null>(null)

  const totalCapacity = dataCenters.reduce((sum, dc) => sum + dc.capacity, 0)
  const totalUtilization = dataCenters.reduce((sum, dc) => sum + dc.utilization, 0) / dataCenters.length
  const totalServers = dataCenters.reduce((sum, dc) => sum + dc.servers, 0)
  const activeServers = dataCenters.reduce((sum, dc) => sum + dc.activeServers, 0)

  const selectedDataCenter = selectedDC ? dataCenters.find(dc => dc.id === selectedDC) : null

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Capacity"
          value={totalCapacity}
          icon={Server}
          trend="up"
          color="cyan"
          detail={`${totalCapacity} rack units`}
        />
        <MetricCard
          title="Avg Utilization"
          value={Math.round(totalUtilization)}
          icon={Activity}
          trend="down"
          color="green"
          detail={`${totalUtilization.toFixed(1)}% across all DCs`}
        />
        <MetricCard
          title="Active Servers"
          value={Math.round((activeServers / totalServers) * 100)}
          icon={Database}
          trend="up"
          color="purple"
          detail={`${activeServers}/${totalServers} servers online`}
        />
        <MetricCard
          title="Power Usage"
          value={Math.round((dataCenters.reduce((sum, dc) => sum + dc.powerConsumption, 0) / 1000) * 100)}
          icon={Network}
          trend="down"
          color="blue"
          detail={`${dataCenters.reduce((sum, dc) => sum + dc.powerConsumption, 0)}kW total`}
        />
      </div>

      {/* Data Center Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {dataCenters.map((dc) => (
          <div
            key={dc.id}
            onClick={() => setSelectedDC(selectedDC === dc.id ? null : dc.id)}
            className="cursor-pointer"
          >
            <CyberCard
              title={dc.name}
              icon={MapPin}
              iconColor="text-cyan-400"
              className={`transition-all duration-200 ${
                selectedDC === dc.id ? 'ring-2 ring-cyan-400/50 bg-slate-800/60' : 'hover:bg-slate-800/40'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{dc.location}</span>
                  <StatusBadge status={dc.status} />
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Capacity</span>
                      <span>{dc.capacity}U</span>
                    </div>
                    <Progress value={dc.utilization} className="h-2" />
                    <div className="text-xs text-slate-400 mt-1">
                      {dc.utilization}% utilized
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Servers</div>
                      <div className="font-mono">{dc.activeServers}/{dc.servers}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Power</div>
                      <div className="font-mono">{dc.powerConsumption}kW</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Temp</div>
                      <div className="font-mono">{dc.temperature}°C</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Uptime</div>
                      <div className="font-mono">{dc.uptime}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CyberCard>
          </div>
        ))}
      </div>

      {/* Detailed View */}
      {selectedDataCenter && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CyberCard title={`${selectedDataCenter.name} - Performance`} icon={Activity} iconColor="text-emerald-400">
            <PerformanceChart />
          </CyberCard>

          <CyberCard title="Infrastructure Health" icon={Shield} iconColor="text-blue-400">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Power Systems</span>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                  NOMINAL
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cooling Systems</span>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                  NOMINAL
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Network Connectivity</span>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                  DEGRADED
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Security Systems</span>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                  ACTIVE
                </Badge>
              </div>
            </div>
          </CyberCard>
        </div>
      )}

      {/* Capacity Planning */}
      <CyberCard title="Capacity Planning" icon={Server} iconColor="text-purple-400">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-slate-800/40">
              <div className="text-2xl font-bold text-emerald-400">6 months</div>
              <div className="text-sm text-slate-400">Until capacity limit</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/40">
              <div className="text-2xl font-bold text-amber-400">15 servers</div>
              <div className="text-sm text-slate-400">Additional needed</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-slate-800/40">
              <div className="text-2xl font-bold text-blue-400">$2.4M</div>
              <div className="text-sm text-slate-400">Expansion cost</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current Utilization</span>
              <span>{totalUtilization.toFixed(1)}%</span>
            </div>
            <Progress value={totalUtilization} className="h-3" />
            <div className="text-xs text-slate-400">
              Recommended: Keep utilization below 85% for optimal performance
            </div>
          </div>
        </div>
      </CyberCard>
    </div>
  )
}