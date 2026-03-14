"use client"

import { useState } from "react"
import { Settings, Paintbrush, Bell, Database, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CyberCard } from "@/components/shared/cyber-card"

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <Label className="text-sm text-slate-200">{label}</Label>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  )
}

export default function SettingsPage() {
  const [particleDensity, setParticleDensity] = useState([80])
  const [cpuThreshold, setCpuThreshold] = useState([85])
  const [ramThreshold, setRamThreshold] = useState([90])
  const [diskThreshold, setDiskThreshold] = useState([95])
  const [retention, setRetention] = useState([30])

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="bg-slate-800/50 p-1 mb-6">
        <TabsTrigger value="general" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
          General
        </TabsTrigger>
        <TabsTrigger value="appearance" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
          Appearance
        </TabsTrigger>
        <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
          Notifications
        </TabsTrigger>
        <TabsTrigger value="data" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
          Data
        </TabsTrigger>
        <TabsTrigger value="system" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
          System
        </TabsTrigger>
      </TabsList>

      {/* General */}
      <TabsContent value="general">
        <CyberCard title="General Settings" icon={Settings} iconColor="text-cyan-400">
          <div className="divide-y divide-slate-700/50">
            <SettingRow label="System Name" description="Display name for this RAXUS instance">
              <input
                type="text"
                defaultValue="RAXUS-PROD-CLUSTER"
                className="rounded-md border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-200 w-56 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </SettingRow>
            <SettingRow label="Timezone" description="Default timezone for all timestamps">
              <select className="rounded-md border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option>UTC+01:00 (Europe/Paris)</option>
                <option>UTC+00:00 (UTC)</option>
                <option>UTC-05:00 (America/New_York)</option>
                <option>UTC-08:00 (America/Los_Angeles)</option>
              </select>
            </SettingRow>
            <SettingRow label="Language" description="Interface language">
              <select className="rounded-md border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option>English</option>
                <option>Francais</option>
                <option>Deutsch</option>
                <option>Espanol</option>
              </select>
            </SettingRow>
            <SettingRow label="Date Format" description="How dates are displayed">
              <select className="rounded-md border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option>YYYY-MM-DD</option>
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
              </select>
            </SettingRow>
            <SettingRow label="Auto-refresh interval" description="How often dashboards auto-refresh">
              <select className="rounded-md border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                <option>3 seconds</option>
                <option>5 seconds</option>
                <option>10 seconds</option>
                <option>30 seconds</option>
                <option>Manual only</option>
              </select>
            </SettingRow>
          </div>
        </CyberCard>
      </TabsContent>

      {/* Appearance */}
      <TabsContent value="appearance">
        <CyberCard title="Appearance" icon={Paintbrush} iconColor="text-purple-400">
          <div className="divide-y divide-slate-700/50">
            <SettingRow label="Dark Mode" description="Toggle between dark and light themes">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Accent Color" description="Primary accent color throughout the interface">
              <div className="flex items-center gap-2">
                {[
                  { color: "bg-cyan-500", name: "Cyan" },
                  { color: "bg-blue-500", name: "Blue" },
                  { color: "bg-emerald-500", name: "Green" },
                  { color: "bg-amber-500", name: "Amber" },
                ].map((c) => (
                  <button
                    key={c.name}
                    className={`h-6 w-6 rounded-full ${c.color} border-2 ${c.name === "Cyan" ? "border-white" : "border-transparent"} hover:scale-110 transition-transform`}
                    title={c.name}
                  />
                ))}
              </div>
            </SettingRow>
            <SettingRow label="Animations" description="Enable interface animations and transitions">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Particle Background" description="Animated particle effect in background">
              <Switch defaultChecked />
            </SettingRow>
            <div className="py-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <Label className="text-sm text-slate-200">Particle Density</Label>
                  <p className="text-xs text-slate-500 mt-0.5">Number of particles rendered</p>
                </div>
                <span className="text-sm font-mono text-cyan-400">{particleDensity[0]}</span>
              </div>
              <Slider value={particleDensity} onValueChange={setParticleDensity} min={20} max={150} step={10} className="w-full" />
            </div>
          </div>
        </CyberCard>
      </TabsContent>

      {/* Notifications */}
      <TabsContent value="notifications">
        <CyberCard title="Alert Thresholds" icon={Bell} iconColor="text-amber-400">
          <div className="divide-y divide-slate-700/50">
            <div className="py-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <Label className="text-sm text-slate-200">CPU Alert Threshold</Label>
                  <p className="text-xs text-slate-500 mt-0.5">Alert when CPU exceeds this percentage</p>
                </div>
                <span className="text-sm font-mono text-cyan-400">{cpuThreshold[0]}%</span>
              </div>
              <Slider value={cpuThreshold} onValueChange={setCpuThreshold} min={50} max={100} step={5} />
            </div>
            <div className="py-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <Label className="text-sm text-slate-200">RAM Alert Threshold</Label>
                  <p className="text-xs text-slate-500 mt-0.5">Alert when memory exceeds this percentage</p>
                </div>
                <span className="text-sm font-mono text-purple-400">{ramThreshold[0]}%</span>
              </div>
              <Slider value={ramThreshold} onValueChange={setRamThreshold} min={50} max={100} step={5} />
            </div>
            <div className="py-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <Label className="text-sm text-slate-200">Disk Alert Threshold</Label>
                  <p className="text-xs text-slate-500 mt-0.5">Alert when disk usage exceeds this percentage</p>
                </div>
                <span className="text-sm font-mono text-blue-400">{diskThreshold[0]}%</span>
              </div>
              <Slider value={diskThreshold} onValueChange={setDiskThreshold} min={50} max={100} step={5} />
            </div>
            <SettingRow label="Email Notifications" description="Receive critical alerts via email">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Slack Integration" description="Send alerts to a Slack channel">
              <Switch />
            </SettingRow>
            <SettingRow label="Desktop Notifications" description="Browser push notifications for alerts">
              <Switch defaultChecked />
            </SettingRow>
          </div>
        </CyberCard>
      </TabsContent>

      {/* Data */}
      <TabsContent value="data">
        <CyberCard title="Data Management" icon={Database} iconColor="text-emerald-400">
          <div className="divide-y divide-slate-700/50">
            <div className="py-3">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <Label className="text-sm text-slate-200">Data Retention Period</Label>
                  <p className="text-xs text-slate-500 mt-0.5">How long to keep historical data (days)</p>
                </div>
                <span className="text-sm font-mono text-cyan-400">{retention[0]} days</span>
              </div>
              <Slider value={retention} onValueChange={setRetention} min={7} max={365} step={1} />
            </div>
            <SettingRow label="Auto-purge old data" description="Automatically delete data older than retention period">
              <Switch defaultChecked />
            </SettingRow>
            <div className="py-3 flex items-center justify-between">
              <div>
                <Label className="text-sm text-slate-200">Export Data</Label>
                <p className="text-xs text-slate-500 mt-0.5">Download all system data as JSON</p>
              </div>
              <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 text-slate-200 text-xs">
                Export JSON
              </Button>
            </div>
            <div className="py-3 flex items-center justify-between">
              <div>
                <Label className="text-sm text-slate-200">Purge All Logs</Label>
                <p className="text-xs text-red-400/70 mt-0.5">Permanently delete all system logs</p>
              </div>
              <Button variant="outline" size="sm" className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs">
                Purge Logs
              </Button>
            </div>
          </div>
        </CyberCard>
      </TabsContent>

      {/* System */}
      <TabsContent value="system">
        <CyberCard title="System Information" icon={Info} iconColor="text-blue-400">
          <div className="divide-y divide-slate-700/50">
            {[
              { label: "Version", value: "RAXUS v12.4.5" },
              { label: "Build", value: "2026.02.12-stable" },
              { label: "License", value: "Enterprise" },
              { label: "Node.js", value: "v22.4.0" },
              { label: "Next.js", value: "v15.2.6" },
              { label: "API Status", value: "Connected" },
              { label: "Backend Version", value: "FastAPI v0.115.0" },
              { label: "Database", value: "PostgreSQL 16.2 + MongoDB 7.0" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-3">
                <span className="text-sm text-slate-400">{item.label}</span>
                <span className="text-sm font-mono text-slate-200">{item.value}</span>
              </div>
            ))}
            <div className="py-3 flex items-center justify-between">
              <div>
                <Label className="text-sm text-slate-200">System Diagnostics</Label>
                <p className="text-xs text-slate-500 mt-0.5">Run a full system health check</p>
              </div>
              <Button variant="outline" size="sm" className="border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 text-xs">
                Run Diagnostics
              </Button>
            </div>
          </div>
        </CyberCard>
      </TabsContent>
    </Tabs>
  )
}
