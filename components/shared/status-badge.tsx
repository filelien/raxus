import { cn } from "@/lib/utils"

const statusConfig = {
  online: { label: "Online", dot: "bg-emerald-400", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", pulse: true },
  offline: { label: "Offline", dot: "bg-red-400", bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30", pulse: false },
  warning: { label: "Warning", dot: "bg-amber-400", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", pulse: true },
  maintenance: { label: "Maintenance", dot: "bg-blue-400", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", pulse: false },
  degraded: { label: "Degraded", dot: "bg-orange-400", bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30", pulse: true },
  active: { label: "Active", dot: "bg-emerald-400", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", pulse: true },
  resolved: { label: "Resolved", dot: "bg-slate-400", bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/30", pulse: false },
  investigating: { label: "Investigating", dot: "bg-amber-400", bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", pulse: true },
  standby: { label: "Standby", dot: "bg-blue-400", bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", pulse: false },
  none: { label: "None", dot: "bg-slate-400", bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/30", pulse: false },
} as const

type StatusType = keyof typeof statusConfig

export function StatusBadge({ status, className }: { status: StatusType; className?: string }) {
  const config = statusConfig[status] || statusConfig.offline

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot, config.pulse && "animate-pulse")} />
      {config.label}
    </span>
  )
}
