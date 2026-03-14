"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Activity,
  Database,
  Globe,
  Hexagon,
  LayoutDashboard,
  MessageSquare,
  Server,
  Settings,
  Shield,
  Terminal,
  MapPin,
  Wrench,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useSimulatedMetrics } from "@/hooks/use-simulated-metrics"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Servers", href: "/servers", icon: Server },
  { title: "Databases", href: "/databases", icon: Database },
  { title: "Network", href: "/network", icon: Globe },
  { title: "Security", href: "/security", icon: Shield },
  { title: "Communications", href: "/communications", icon: MessageSquare },
  { title: "Console", href: "/console", icon: Terminal },
  { title: "Data Center", href: "/data-center", icon: MapPin },
  { title: "Diagnostics", href: "/diagnostics", icon: Wrench },
  { title: "Settings", href: "/settings", icon: Settings },
]

function StatusBar({ label, value, gradient }: { label: string; value: number; gradient: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-slate-400">{label}</span>
        <span className="text-[11px] tabular-nums text-slate-400">{value}%</span>
      </div>
      <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const metrics = useSimulatedMetrics()

  // Hide sidebar on public/auth pages to keep the login experience clean.
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/loader")
  ) {
    return null
  }

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="border-b border-slate-700/50 px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Hexagon className="h-7 w-7 shrink-0 text-cyan-400" />
          {state === "expanded" && (
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              RAXUS
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon className={isActive ? "text-cyan-400" : ""} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-700/50">
        {state === "expanded" && (
          <div className="px-2 py-3 space-y-2.5">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-2">
              System Status
            </div>
            <StatusBar label="Core Systems" value={metrics.systemStatus} gradient="from-cyan-500 to-blue-500" />
            <StatusBar label="Security" value={metrics.securityLevel} gradient="from-emerald-500 to-green-500" />
            <StatusBar label="Network" value={metrics.network} gradient="from-blue-500 to-indigo-500" />
          </div>
        )}
        {state === "collapsed" && (
          <div className="flex flex-col items-center py-2 gap-1.5">
            <Activity className="h-4 w-4 text-cyan-400" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
