"use client"

import { useEffect, useState } from "react"
import { LoadingScreen } from "@/components/shared/loading-screen"

export function AppLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timeout = window.requestAnimationFrame(() => setReady(true))
    return () => window.cancelAnimationFrame(timeout)
  }, [])

  if (!ready) return <LoadingScreen />

  return <>{children}</>
}
