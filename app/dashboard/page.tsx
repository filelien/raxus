"use client"

import { Suspense, lazy, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  AlertCircle,
  Cpu,
  Download,
  HardDrive,
  Lock,
  Radio,
  RefreshCw,
  Shield,
  Terminal,
  Wifi,
  Zap,
  CircleOff,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CyberCard } from "@/components/shared/cyber-card"
import { isAuthenticated, isInitialized } from "@/lib/auth"

// Lazy load heavy components
const MetricCard = lazy(() => import("@/components/dashboard/metric-card").then(mod => ({ default: mod.MetricCard })))
const PerformanceChart = lazy(() => import("@/components/dashboard/performance-chart").then(mod => ({ default: mod.PerformanceChart })))
const ProcessTable = lazy(() => import("@/components/dashboard/process-table").then(mod => ({ default: mod.ProcessTable })))
const StorageGrid = lazy(() => import("@/components/dashboard/storage-grid").then(mod => ({ default: mod.StorageGrid })))
const SystemAlerts = lazy(() => import("@/components/dashboard/system-alerts").then(mod => ({ default: mod.SystemAlerts })))
const SystemClock = lazy(() => import("@/components/dashboard/system-clock").then(mod => ({ default: mod.SystemClock })))

import { useSimulatedMetrics } from "@/hooks/use-simulated-metrics"

export default function DashboardPage() {
  const router = useRouter()
  const metrics = useSimulatedMetrics()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login")
      return
    }

    // Ensure the initialization flow runs after authentication.
    if (!isInitialized()) {
      router.replace("/loader")
    }
  }, [router])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Main content area */}
      <div className="lg:col-span-9 space-y-6">
        {/* System overview card */}
        <CyberCard
          title="System Overview"
          icon={Activity}
          iconColor="text-cyan-400"
          glow
          headerRight={
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-[10px] font-mono">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
                LIVE
              </Badge>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-100">
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            </div>
          }
        >
          {/* Metric cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Suspense fallback={<div className="h-24 bg-slate-800/50 rounded-lg animate-pulse" />}>
              <MetricCard title="CPU Usage" value={metrics.cpu} icon={Cpu} trend="up" color="cyan" detail="3.8 GHz | 12 Cores" />
            </Suspense>
            <Suspense fallback={<div className="h-24 bg-slate-800/50 rounded-lg animate-pulse" />}>
              <MetricCard title="Memory" value={metrics.memory} icon={HardDrive} trend="stable" color="purple" detail="16.4 GB / 24 GB" />
            </Suspense>
            <Suspense fallback={<div className="h-24 bg-slate-800/50 rounded-lg animate-pulse" />}>
              <MetricCard title="Network" value={metrics.network} icon={Wifi} trend="down" color="blue" detail="1.2 GB/s | 42ms" />
            </Suspense>
          </div>

          {/* Tabbed section */}
          <Tabs defaultValue="performance" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-slate-800/50 p-1">
                <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
                  Performance
                </TabsTrigger>
                <TabsTrigger value="processes" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
                  Processes
                </TabsTrigger>
                <TabsTrigger value="storage" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
                  Storage
                </TabsTrigger>
              </TabsList>
              <div className="hidden md:flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cyan-500" /> CPU</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-purple-500" /> Memory</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500" /> Network</span>
              </div>
            </div>

            <TabsContent value="performance" className="mt-0">
              <div className="relative rounded-lg border border-slate-700/50 bg-slate-800/30 overflow-hidden p-2">
                <Suspense fallback={<div className="h-64 bg-slate-800/50 rounded-lg animate-pulse" />}>
                  <PerformanceChart />
                </Suspense>
                <div className="absolute bottom-4 right-4 rounded-md border border-slate-700/50 bg-slate-900/80 backdrop-blur-sm px-3 py-2">
                  <div className="text-[10px] text-slate-400">System Load</div>
                  <div className="text-lg font-mono font-bold text-cyan-400">{metrics.cpu}%</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="processes" className="mt-0">
              <Suspense fallback={<div className="h-64 bg-slate-800/50 rounded-lg animate-pulse" />}>
                <ProcessTable />
              </Suspense>
            </TabsContent>

            <TabsContent value="storage" className="mt-0">
              <Suspense fallback={<div className="h-64 bg-slate-800/50 rounded-lg animate-pulse" />}>
                <StorageGrid />
              </Suspense>
            </TabsContent>
          </Tabs>
        </CyberCard>

        {/* Security & Alerts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CyberCard title="Security Status" icon={Shield} iconColor="text-emerald-400">
            <div className="space-y-3">
              {[
                { label: "Firewall", active: true },
                { label: "Intrusion Detection", active: true },
                { label: "Encryption", active: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{item.label}</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 text-[10px]">Active</Badge>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Threat Database</span>
                <span className="text-sm text-cyan-400">Updated <span className="text-slate-500">12 min ago</span></span>
              </div>
              <div className="pt-2 mt-2 border-t border-slate-700/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-200">Security Level</span>
                  <span className="text-sm tabular-nums text-cyan-400">{metrics.securityLevel}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-700"
                    style={{ width: `${metrics.securityLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </CyberCard>

          <CyberCard title="System Alerts" icon={AlertCircle} iconColor="text-amber-400">
            <Suspense fallback={<div className="h-32 bg-slate-800/50 rounded-lg animate-pulse" />}>
              <SystemAlerts />
            </Suspense>
          </CyberCard>
        </div>
      </div>

      {/* Right sidebar widgets */}
      <div className="lg:col-span-3 space-y-6">
        <Suspense fallback={<div className="h-24 bg-slate-800/50 rounded-lg animate-pulse" />}>
          <SystemClock />
        </Suspense>

        {/* Quick actions */}
        <CyberCard title="Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Shield, label: "Security Scan" },
              { icon: RefreshCw, label: "Sync Data" },
              { icon: Download, label: "Backup" },
              { icon: Terminal, label: "Console" },
            ].map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center gap-1.5 text-slate-300"
              >
                <action.icon className="h-5 w-5 text-cyan-400" />
                <span className="text-[11px]">{action.label}</span>
              </Button>
            ))}
          </div>
        </CyberCard>

        {/* Resource allocation */}
        <CyberCard title="Resource Allocation">
          <div className="space-y-4">
            {[
              { label: "Processing Power", value: metrics.cpu, color: "from-cyan-500 to-blue-500", textColor: "text-cyan-400" },
              { label: "Memory Allocation", value: metrics.memory, color: "from-purple-500 to-pink-500", textColor: "text-purple-400" },
              { label: "Network Bandwidth", value: 35, color: "from-blue-500 to-indigo-500", textColor: "text-blue-400" },
            ].map((res) => (
              <div key={res.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">{res.label}</span>
                  <span className={`text-xs tabular-nums ${res.textColor}`}>{res.value}% allocated</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${res.color} transition-all duration-700`}
                    style={{ width: `${res.value}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Priority Level</span>
                <div className="flex items-center gap-2">
                  <Slider defaultValue={[3]} max={5} step={1} className="w-20" />
                  <span className="text-cyan-400 tabular-nums">3/5</span>
                </div>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* Environment controls */}
        <CyberCard title="Environment Controls">
          <div className="space-y-4">
            {[
              { icon: Radio, label: "Power Management", checked: false },
              { icon: Lock, label: "Security Protocol", checked: true },
              { icon: Zap, label: "Power Saving Mode", checked: false },
              { icon: CircleOff, label: "Auto Shutdown", checked: true },
            ].map((ctrl) => (
              <div key={ctrl.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ctrl.icon className="h-4 w-4 text-cyan-400" />
                  <Label className="text-sm text-slate-400">{ctrl.label}</Label>
                </div>
                <Switch defaultChecked={ctrl.checked} />
              </div>
            ))}
          </div>
        </CyberCard>
      </div>
    </div>
  )
}
