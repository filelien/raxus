"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="flex flex-col items-center">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 animate-ping rounded-full border-4 border-cyan-500/30" />
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-l-transparent border-r-transparent border-b-transparent border-t-cyan-500" />
          <div className="absolute inset-4 animate-[spin_3s_linear_infinite] rounded-full border-4 border-l-transparent border-t-transparent border-b-transparent border-r-blue-500" />
          <div className="absolute inset-6 animate-[spin_6s_linear_infinite_reverse] rounded-full border-4 border-t-transparent border-r-transparent border-l-transparent border-b-emerald-500" />
        </div>
        <div className="mt-4 font-mono text-sm tracking-widest text-cyan-400">
          RAXUS INITIALIZING
        </div>
        <div className="mt-2 h-1 w-48 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full animate-[loading_1.8s_ease-in-out] rounded-full bg-cyan-500" />
        </div>
      </div>
    </div>
  )
}
