import { BarChart3, LineChart, TrendingDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const colorMap: Record<string, { border: string; glow: string }> = {
  cyan: { border: "border-cyan-500/30", glow: "from-cyan-500/20 to-blue-500/10" },
  purple: { border: "border-purple-500/30", glow: "from-purple-500/20 to-pink-500/10" },
  blue: { border: "border-blue-500/30", glow: "from-blue-500/20 to-indigo-500/10" },
  green: { border: "border-emerald-500/30", glow: "from-emerald-500/20 to-green-500/10" },
}

const trendIcons = {
  up: <BarChart3 className="h-4 w-4 text-amber-400" />,
  down: <TrendingDown className="h-4 w-4 text-emerald-400" />,
  stable: <LineChart className="h-4 w-4 text-blue-400" />,
}

interface MetricCardProps {
  title: string
  value: number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
}

export function MetricCard({ title, value, icon: Icon, trend, color, detail }: MetricCardProps) {
  const c = colorMap[color] || colorMap.cyan

  return (
    <div className={`relative overflow-hidden rounded-lg border bg-slate-800/50 p-4 ${c.border}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-400">{title}</span>
        <Icon className="h-5 w-5 text-cyan-400" />
      </div>
      <div className="text-2xl font-bold tabular-nums text-slate-100">{value}%</div>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
      <div className="absolute bottom-2 right-2">{trendIcons[trend]}</div>
      <div className={`pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-gradient-to-br ${c.glow} blur-xl`} />
    </div>
  )
}
