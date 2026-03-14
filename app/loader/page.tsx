"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Hexagon } from "lucide-react"
import { initializeSession } from "@/lib/session"
import { isAuthenticated, isInitialized } from "@/lib/auth"

export default function LoaderPage() {
  const router = useRouter()
  const [step, setStep] = useState("Initialisation de votre espace…")

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login")
      return
    }

    if (isInitialized()) {
      router.replace("/dashboard")
      return
    }

    let cancelled = false

    initializeSession((message) => {
      if (!cancelled) {
        setStep(message)
      }
    }).then(() => {
      if (!cancelled) {
        router.replace("/dashboard")
      }
    })

    return () => {
      cancelled = true
    }
  }, [router])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-10 text-center shadow-xl">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-cyan-500/10 text-cyan-300">
          <Hexagon className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-slate-100">Initialisation de votre espace…</p>
          <p className="text-sm text-slate-400">{step}</p>
        </div>
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700/40" />
          <div className="absolute inset-1 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        </div>
      </div>
    </div>
  )
}
