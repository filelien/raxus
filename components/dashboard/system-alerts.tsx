import { AlertCircle, CheckCircle2, Download, Info } from "lucide-react"

const alertTypeConfig = {
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
  warning: { icon: AlertCircle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  error: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  update: { icon: Download, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
}

interface AlertItemProps {
  title: string
  time: string
  description: string
  type: keyof typeof alertTypeConfig
}

const alerts: AlertItemProps[] = [
  { title: "Security Scan Complete", time: "14:32:12", description: "No threats detected in system scan", type: "info" },
  { title: "Bandwidth Spike Detected", time: "13:45:06", description: "Unusual network activity on port 443", type: "warning" },
  { title: "System Update Available", time: "09:12:45", description: "Version 12.4.5 ready to install", type: "update" },
  { title: "Backup Completed", time: "04:30:00", description: "Incremental backup to drive E: successful", type: "success" },
]

export function SystemAlerts() {
  return (
    <div className="space-y-3">
      {alerts.map((alert, i) => {
        const config = alertTypeConfig[alert.type]
        const Icon = config.icon
        return (
          <div key={i} className="flex items-start gap-3">
            <div className={`mt-0.5 rounded-full p-1 ${config.bg} border ${config.border}`}>
              <Icon className={`h-3 w-3 ${config.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-200">{alert.title}</span>
                <span className="text-xs text-slate-500">{alert.time}</span>
              </div>
              <p className="text-xs text-slate-400">{alert.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
