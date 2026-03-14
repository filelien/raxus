"use client"

import { useState, useEffect, useCallback, useMemo } from "react"

interface MetricConfig {
  min: number
  max: number
  base: number
  variance: number
}

interface SimulatedMetrics {
  cpu: number
  memory: number
  network: number
  systemStatus: number
  securityLevel: number
  diskIO: number
}

const defaultConfig: Record<keyof SimulatedMetrics, MetricConfig> = {
  cpu: { min: 20, max: 95, base: 42, variance: 15 },
  memory: { min: 40, max: 95, base: 68, variance: 10 },
  network: { min: 60, max: 99, base: 92, variance: 8 },
  systemStatus: { min: 70, max: 99, base: 85, variance: 5 },
  securityLevel: { min: 60, max: 100, base: 75, variance: 5 },
  diskIO: { min: 10, max: 80, base: 35, variance: 20 },
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function fluctuate(current: number, config: MetricConfig): number {
  const delta = (Math.random() - 0.5) * 2 * config.variance
  const pullToBase = (config.base - current) * 0.1
  return clamp(Math.round(current + delta + pullToBase), config.min, config.max)
}

export function useSimulatedMetrics(intervalMs: number = 10000): SimulatedMetrics {
  const [metrics, setMetrics] = useState<SimulatedMetrics>({
    cpu: defaultConfig.cpu.base,
    memory: defaultConfig.memory.base,
    network: defaultConfig.network.base,
    systemStatus: defaultConfig.systemStatus.base,
    securityLevel: defaultConfig.securityLevel.base,
    diskIO: defaultConfig.diskIO.base,
  })

  const updateMetrics = useCallback(() => {
    setMetrics(prev => ({
      cpu: fluctuate(prev.cpu, defaultConfig.cpu),
      memory: fluctuate(prev.memory, defaultConfig.memory),
      network: fluctuate(prev.network, defaultConfig.network),
      systemStatus: fluctuate(prev.systemStatus, defaultConfig.systemStatus),
      securityLevel: fluctuate(prev.securityLevel, defaultConfig.securityLevel),
      diskIO: fluctuate(prev.diskIO, defaultConfig.diskIO),
    }))
  }, [])

  useEffect(() => {
    const interval = setInterval(updateMetrics, intervalMs)
    return () => clearInterval(interval)
  }, [updateMetrics, intervalMs])

  // Memoize the metrics object to prevent unnecessary re-renders
  return useMemo(() => metrics, [metrics.cpu, metrics.memory, metrics.network, metrics.systemStatus, metrics.securityLevel, metrics.diskIO])
}

export function useLiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })

  return { time, formatTime, formatDate }
}
