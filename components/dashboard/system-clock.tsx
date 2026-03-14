"use client"

import { useLiveClock } from "@/hooks/use-simulated-metrics"

export function SystemClock() {
  const { time, formatTime, formatDate } = useLiveClock()

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-900/60 overflow-hidden">
      <div className="bg-slate-800/60 p-5 border-b border-slate-700/50 text-center">
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-1">System Time</div>
        <div className="text-3xl font-mono font-bold tabular-nums text-cyan-400">{formatTime(time)}</div>
        <div className="text-sm text-slate-400 mt-0.5">{formatDate(time)}</div>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="rounded-md border border-slate-700/50 bg-slate-800/50 p-3">
          <div className="text-[10px] text-slate-500 mb-0.5">Uptime</div>
          <div className="text-sm font-mono text-slate-200">14d 06:42:18</div>
        </div>
        <div className="rounded-md border border-slate-700/50 bg-slate-800/50 p-3">
          <div className="text-[10px] text-slate-500 mb-0.5">Time Zone</div>
          <div className="text-sm font-mono text-slate-200">UTC+01:00</div>
        </div>
      </div>
    </div>
  )
}
