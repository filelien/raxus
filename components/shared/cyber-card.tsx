import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface CyberCardProps {
  title?: string
  icon?: LucideIcon
  iconColor?: string
  headerRight?: React.ReactNode
  children: React.ReactNode
  className?: string
  glow?: boolean
  noPadding?: boolean
}

export function CyberCard({
  title,
  icon: Icon,
  iconColor = "text-cyan-400",
  headerRight,
  children,
  className,
  glow = false,
  noPadding = false,
}: CyberCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm",
        glow && "shadow-[0_0_15px_rgba(34,211,238,0.08)]",
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-slate-700/50 px-4 py-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            {Icon && <Icon className={cn("h-4 w-4", iconColor)} />}
            {title}
          </h3>
          {headerRight}
        </div>
      )}
      <div className={cn(!noPadding && "p-4")}>{children}</div>
    </div>
  )
}
