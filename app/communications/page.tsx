"use client"

import { useState, useMemo } from "react"
import { Bell, Filter, MessageSquare, Search, Terminal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CyberCard } from "@/components/shared/cyber-card"
import { generateSystemLogs, notifications } from "@/lib/mock-data"

const levelColors: Record<string, string> = {
  INFO: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  WARNING: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  ERROR: "text-red-400 bg-red-500/10 border-red-500/30",
  DEBUG: "text-slate-400 bg-slate-500/10 border-slate-500/30",
  CRITICAL: "text-red-400 bg-red-500/10 border-red-500/30",
}

const notifTypeColors: Record<string, string> = {
  info: "text-blue-400",
  warning: "text-amber-400",
  error: "text-red-400",
  success: "text-emerald-400",
}

const messages = [
  { sender: "System Administrator", time: "15:42:12", message: "Scheduled maintenance will occur at 02:00. All systems will be temporarily offline.", initials: "SA" },
  { sender: "Security Module", time: "14:30:45", message: "Unusual login attempt blocked from IP 192.168.1.45. Added to watchlist.", initials: "SM" },
  { sender: "Network Control", time: "12:15:33", message: "Bandwidth allocation adjusted for priority services during peak hours.", initials: "NC" },
  { sender: "Data Center", time: "09:05:18", message: "Backup verification complete. All data integrity checks passed.", initials: "DC" },
]

export default function CommunicationsPage() {
  const logs = useMemo(() => generateSystemLogs(60), [])
  const [levelFilter, setLevelFilter] = useState<string>("ALL")
  const [searchTerm, setSearchTerm] = useState("")
  const [notifList, setNotifList] = useState(notifications)

  const filteredLogs = logs.filter((log) => {
    const matchesLevel = levelFilter === "ALL" || log.level === levelFilter
    const matchesSearch =
      searchTerm === "" ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesLevel && matchesSearch
  })

  const markAsRead = (id: string) => {
    setNotifList((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllRead = () => {
    setNotifList((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <Tabs defaultValue="logs" className="w-full">
      <TabsList className="bg-slate-800/50 p-1 mb-6">
        <TabsTrigger value="logs" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
          System Logs
        </TabsTrigger>
        <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
          Notifications
          {notifList.filter((n) => !n.read).length > 0 && (
            <span className="ml-1.5 rounded-full bg-cyan-500 px-1.5 py-0.5 text-[9px] font-bold text-slate-950">
              {notifList.filter((n) => !n.read).length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="messages" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400 text-xs">
          Messages
        </TabsTrigger>
      </TabsList>

      {/* System Logs */}
      <TabsContent value="logs">
        <CyberCard title="System Logs" icon={Terminal} iconColor="text-emerald-400" noPadding>
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-slate-700/50">
            <div className="flex items-center gap-1.5 rounded-md bg-slate-800/60 px-3 py-1.5 border border-slate-700/50 flex-1 min-w-[200px]">
              <Search className="h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {["ALL", "INFO", "WARNING", "ERROR", "DEBUG", "CRITICAL"].map((level) => (
                <Button
                  key={level}
                  variant="ghost"
                  size="sm"
                  onClick={() => setLevelFilter(level)}
                  className={`text-[10px] h-7 px-2 ${
                    levelFilter === level
                      ? "bg-slate-700 text-cyan-400"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>

          {/* Log entries */}
          <div className="max-h-[600px] overflow-y-auto divide-y divide-slate-700/20">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 px-4 py-2 hover:bg-slate-800/50 transition-colors font-mono text-xs">
                <span className="text-slate-500 whitespace-nowrap shrink-0 w-20">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
                <Badge variant="outline" className={`text-[9px] px-1.5 shrink-0 w-16 justify-center ${levelColors[log.level]}`}>
                  {log.level}
                </Badge>
                <span className="text-cyan-400/70 shrink-0 w-28 truncate">{log.source}</span>
                <span className="text-slate-300 flex-1">{log.message}</span>
              </div>
            ))}
          </div>
        </CyberCard>
      </TabsContent>

      {/* Notifications */}
      <TabsContent value="notifications">
        <CyberCard
          title="Notifications"
          icon={Bell}
          iconColor="text-amber-400"
          headerRight={
            <Button variant="ghost" size="sm" onClick={markAllRead} className="text-xs text-slate-400 hover:text-slate-200">
              Mark all read
            </Button>
          }
          noPadding
        >
          <div className="divide-y divide-slate-700/30">
            {notifList.map((notif) => (
              <button
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-slate-800/50 transition-colors ${
                  !notif.read ? "bg-slate-800/30" : ""
                }`}
              >
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${!notif.read ? "bg-cyan-400" : "bg-transparent"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm font-medium ${notifTypeColors[notif.type]}`}>{notif.title}</span>
                    <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-400">{notif.message}</p>
                </div>
              </button>
            ))}
          </div>
        </CyberCard>
      </TabsContent>

      {/* Messages */}
      <TabsContent value="messages">
        <CyberCard title="Communications Log" icon={MessageSquare} iconColor="text-blue-400">
          <div className="space-y-3 mb-4">
            {messages.map((msg, i) => (
              <div key={i} className="flex gap-3 rounded-md border border-slate-700/50 bg-slate-800/50 p-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-slate-700 text-cyan-400 text-xs">{msg.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-200">{msg.sender}</span>
                    <span className="text-xs text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-xs text-slate-400">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-md border border-slate-700/50 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-slate-950">
              Send
            </Button>
          </div>
        </CyberCard>
      </TabsContent>
    </Tabs>
  )
}
