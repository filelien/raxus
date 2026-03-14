import { processes } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export function ProcessTable() {
  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 overflow-hidden">
      <div className="grid grid-cols-12 gap-2 px-3 py-2.5 text-xs font-medium text-slate-400 bg-slate-800/50 border-b border-slate-700/50">
        <div className="col-span-1">PID</div>
        <div className="col-span-4">Process</div>
        <div className="col-span-2">User</div>
        <div className="col-span-2">CPU</div>
        <div className="col-span-2">Memory</div>
        <div className="col-span-1">Status</div>
      </div>
      <div className="divide-y divide-slate-700/30">
        {processes.map((p) => (
          <div key={p.pid} className="grid grid-cols-12 gap-2 px-3 py-2 text-sm hover:bg-slate-800/50 transition-colors">
            <div className="col-span-1 text-slate-500 font-mono text-xs">{p.pid}</div>
            <div className="col-span-4 text-slate-300 truncate">{p.name}</div>
            <div className="col-span-2 text-slate-400 text-xs">{p.user}</div>
            <div className="col-span-2 font-mono text-cyan-400 text-xs">{p.cpu}%</div>
            <div className="col-span-2 font-mono text-purple-400 text-xs">{p.memory} MB</div>
            <div className="col-span-1">
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 ${
                  p.status === "running"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : p.status === "sleeping"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      : "bg-red-500/10 text-red-400 border-red-500/30"
                }`}
              >
                {p.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
