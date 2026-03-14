"use client"

import { useState, useEffect } from "react"
import { Activity, AlertTriangle, CheckCircle, Clock, Download, RefreshCw, Zap } from "lucide-react"
import { CyberCard } from "@/components/shared/cyber-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge } from "@/components/shared/status-badge"
import { useSimulatedMetrics } from "@/hooks/use-simulated-metrics"

interface DiagnosticTest {
  id: string
  name: string
  description: string
  status: "pending" | "running" | "passed" | "failed" | "warning"
  duration: number
  lastRun: Date | null
  details: string[]
}

interface SystemHealth {
  component: string
  status: "healthy" | "warning" | "critical"
  score: number
  issues: string[]
}

const initialTests: DiagnosticTest[] = [
  {
    id: "cpu-stress",
    name: "CPU Stress Test",
    description: "Tests CPU performance under load",
    status: "pending",
    duration: 30000,
    lastRun: null,
    details: []
  },
  {
    id: "memory-leak",
    name: "Memory Leak Detection",
    description: "Scans for memory leaks and excessive usage",
    status: "pending",
    duration: 45000,
    lastRun: null,
    details: []
  },
  {
    id: "network-latency",
    name: "Network Latency Test",
    description: "Measures network response times",
    status: "pending",
    duration: 20000,
    lastRun: null,
    details: []
  },
  {
    id: "disk-io",
    name: "Disk I/O Performance",
    description: "Tests disk read/write speeds",
    status: "pending",
    duration: 25000,
    lastRun: null,
    details: []
  },
  {
    id: "security-scan",
    name: "Security Vulnerability Scan",
    description: "Scans for security vulnerabilities",
    status: "pending",
    duration: 60000,
    lastRun: null,
    details: []
  }
]

const systemHealth: SystemHealth[] = [
  {
    component: "CPU",
    status: "healthy",
    score: 95,
    issues: []
  },
  {
    component: "Memory",
    status: "warning",
    score: 78,
    issues: ["High memory usage detected", "Potential memory leak in process 1234"]
  },
  {
    component: "Storage",
    status: "healthy",
    score: 88,
    issues: []
  },
  {
    component: "Network",
    status: "healthy",
    score: 92,
    issues: []
  },
  {
    component: "Security",
    status: "warning",
    score: 85,
    issues: ["Outdated SSL certificates", "Weak password policies detected"]
  }
]

export default function DiagnosticsPage() {
  const [tests, setTests] = useState<DiagnosticTest[]>(initialTests)
  const [runningTest, setRunningTest] = useState<string | null>(null)
  const [overallHealth, setOverallHealth] = useState(87)
  const metrics = useSimulatedMetrics()

  const runTest = async (testId: string) => {
    if (runningTest) return

    setRunningTest(testId)
    setTests(prev => prev.map(test =>
      test.id === testId
        ? { ...test, status: "running", details: [] }
        : test
    ))

    // Simulate test execution
    setTimeout(() => {
      const results = generateTestResults(testId)
      setTests(prev => prev.map(test =>
        test.id === testId
          ? {
              ...test,
              status: results.status,
              lastRun: new Date(),
              details: results.details
            }
          : test
      ))
      setRunningTest(null)
    }, tests.find(t => t.id === testId)?.duration || 10000)
  }

  const generateTestResults = (testId: string) => {
    const random = Math.random()
    let status: DiagnosticTest["status"] = "passed"
    let details: string[] = []

    switch (testId) {
      case "cpu-stress":
        if (random < 0.1) {
          status = "failed"
          details = ["CPU failed stress test", "Thermal throttling detected", "Performance degradation at 85% load"]
        } else if (random < 0.3) {
          status = "warning"
          details = ["CPU performance slightly below optimal", "Consider thermal paste replacement"]
        } else {
          details = ["CPU passed all stress tests", "Performance within acceptable parameters", "No thermal issues detected"]
        }
        break
      case "memory-leak":
        if (random < 0.2) {
          status = "failed"
          details = ["Memory leak detected in process 1234", "Memory usage growing steadily", "Potential application bug"]
        } else if (random < 0.4) {
          status = "warning"
          details = ["Memory usage higher than expected", "Monitor for potential leaks"]
        } else {
          details = ["No memory leaks detected", "Memory usage within normal parameters"]
        }
        break
      case "network-latency":
        if (random < 0.15) {
          status = "failed"
          details = ["High network latency detected", "Packet loss > 5%", "Connection unstable"]
        } else if (random < 0.35) {
          status = "warning"
          details = ["Slightly elevated latency", "Network performance degraded"]
        } else {
          details = ["Network latency within acceptable range", "Connection stable"]
        }
        break
      case "disk-io":
        if (random < 0.1) {
          status = "failed"
          details = ["Disk I/O performance critical", "Read speeds below threshold", "Consider disk replacement"]
        } else if (random < 0.25) {
          status = "warning"
          details = ["Disk performance degraded", "Slower than expected I/O speeds"]
        } else {
          details = ["Disk I/O performance optimal", "Read/write speeds within parameters"]
        }
        break
      case "security-scan":
        if (random < 0.05) {
          status = "failed"
          details = ["Critical security vulnerabilities found", "Immediate patching required", "System at risk"]
        } else if (random < 0.3) {
          status = "warning"
          details = ["Security vulnerabilities detected", "Update recommended", "Monitor security logs"]
        } else {
          details = ["Security scan passed", "No critical vulnerabilities found", "System secure"]
        }
        break
    }

    return { status, details }
  }

  const runAllTests = () => {
    tests.forEach(test => {
      if (test.status !== "running") {
        setTimeout(() => runTest(test.id), Math.random() * 5000)
      }
    })
  }

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      overallHealth,
      systemHealth,
      diagnosticTests: tests,
      metrics: {
        cpu: metrics.cpu,
        memory: metrics.memory,
        network: metrics.network,
        diskIO: metrics.diskIO
      }
    }

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `raxus-diagnostics-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    const avgHealth = systemHealth.reduce((sum, comp) => sum + comp.score, 0) / systemHealth.length
    setOverallHealth(avgHealth)
  }, [])

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <CyberCard title="System Health Overview" icon={Activity} iconColor="text-emerald-400">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-400 mb-2">
              {overallHealth.toFixed(0)}%
            </div>
            <div className="text-sm text-slate-400">Overall Health Score</div>
            <Progress value={overallHealth} className="mt-2 h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Tests Passed</span>
              <span>{tests.filter(t => t.status === "passed").length}/{tests.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Warnings</span>
              <span>{tests.filter(t => t.status === "warning").length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Critical Issues</span>
              <span>{tests.filter(t => t.status === "failed").length}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={runAllTests} disabled={!!runningTest} className="w-full">
              <RefreshCw className={`h-4 w-4 mr-2 ${runningTest ? 'animate-spin' : ''}`} />
              Run All Tests
            </Button>
            <Button variant="outline" onClick={exportReport} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </CyberCard>

      <Tabs defaultValue="tests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tests">Diagnostic Tests</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          {tests.map((test) => (
            <CyberCard
              key={test.id}
              title={test.name}
              icon={test.status === "running" ? RefreshCw : test.status === "passed" ? CheckCircle : test.status === "failed" ? AlertTriangle : Clock}
              iconColor={
                test.status === "running" ? "text-amber-400" :
                test.status === "passed" ? "text-emerald-400" :
                test.status === "failed" ? "text-red-400" : "text-slate-400"
              }
              headerRight={
                <div className="flex items-center gap-2">
                  <StatusBadge status={test.status === "running" ? "active" : test.status === "passed" ? "online" : test.status === "failed" ? "offline" : test.status === "warning" ? "warning" : "none"} />
                  <Button
                    size="sm"
                    onClick={() => runTest(test.id)}
                    disabled={runningTest !== null}
                    variant={test.status === "failed" ? "destructive" : "default"}
                  >
                    {runningTest === test.id ? (
                      <RefreshCw className="h-3 w-3 animate-spin" />
                    ) : (
                      <Zap className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              }
            >
              <div className="space-y-3">
                <p className="text-sm text-slate-400">{test.description}</p>

                {test.lastRun && (
                  <div className="text-xs text-slate-500">
                    Last run: {test.lastRun.toLocaleString()}
                  </div>
                )}

                {test.details.length > 0 && (
                  <div className="space-y-1">
                    {test.details.map((detail, idx) => (
                      <div key={idx} className="text-sm pl-3 border-l-2 border-slate-700 text-slate-300">
                        {detail}
                      </div>
                    ))}
                  </div>
                )}

                {test.status === "running" && (
                  <Progress value={Math.random() * 100} className="h-1" />
                )}
              </div>
            </CyberCard>
          ))}
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          {systemHealth.map((component) => (
            <CyberCard
              key={component.component}
              title={`${component.component} Health`}
              icon={component.status === "healthy" ? CheckCircle : component.status === "warning" ? AlertTriangle : AlertTriangle}
              iconColor={
                component.status === "healthy" ? "text-emerald-400" :
                component.status === "warning" ? "text-amber-400" : "text-red-400"
              }
              headerRight={
                <Badge
                  variant="outline"
                  className={
                    component.status === "healthy"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : component.status === "warning"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-red-500/10 text-red-400 border-red-500/30"
                  }
                >
                  {component.score}%
                </Badge>
              }
            >
              <div className="space-y-3">
                <Progress value={component.score} className="h-2" />

                {component.issues.length > 0 ? (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-300">Issues Detected:</div>
                    {component.issues.map((issue, idx) => (
                      <div key={idx} className="text-sm pl-3 border-l-2 border-amber-500/30 text-amber-300">
                        {issue}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-emerald-400">
                    No issues detected. Component operating normally.
                  </div>
                )}
              </div>
            </CyberCard>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}