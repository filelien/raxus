import { storageDrives } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function StorageGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border border-slate-700/50 bg-slate-800/30 p-4">
      {storageDrives.map((drive) => {
        const pct = Math.round((drive.used / drive.total) * 100)
        return (
          <div key={drive.name} className="rounded-md border border-slate-700/50 bg-slate-800/50 p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">{drive.name}</span>
              <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-[10px]">
                {drive.type}
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-1.5 text-xs">
              <span className="text-slate-500">
                {drive.used} GB / {drive.total} GB
              </span>
              <span className="text-slate-400 tabular-nums">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-cyan-500"
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1.5 text-xs text-slate-500">
              Free: {drive.total - drive.used} GB
            </div>
          </div>
        )
      })}
    </div>
  )
}
