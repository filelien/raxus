"use client"

import { useState, useRef, useEffect } from "react"
import { Terminal, Play, Square, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CyberCard } from "@/components/shared/cyber-card"
import { Badge } from "@/components/ui/badge"

interface Command {
  id: string
  command: string
  output: string[]
  status: "running" | "completed" | "error"
  timestamp: Date
}

const systemCommands = [
  { cmd: "status", desc: "Show system status" },
  { cmd: "ps", desc: "List running processes" },
  { cmd: "df", desc: "Show disk usage" },
  { cmd: "netstat", desc: "Network connections" },
  { cmd: "top", desc: "System monitor" },
  { cmd: "logs", desc: "System logs" },
  { cmd: "services", desc: "Service status" },
  { cmd: "backup", desc: "Backup status" },
]

export default function ConsolePage() {
  const [commands, setCommands] = useState<Command[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  const executeCommand = async (cmd: string) => {
    const commandId = Date.now().toString()
    const newCommand: Command = {
      id: commandId,
      command: cmd,
      output: [],
      status: "running",
      timestamp: new Date()
    }

    setCommands(prev => [...prev, newCommand])
    setIsRunning(true)

    // Simulate command execution
    setTimeout(() => {
      const output = generateCommandOutput(cmd)
      setCommands(prev =>
        prev.map(c =>
          c.id === commandId
            ? { ...c, output, status: output.some(line => line.includes("ERROR")) ? "error" : "completed" }
            : c
        )
      )
      setIsRunning(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateCommandOutput = (cmd: string): string[] => {
    const baseCmd = cmd.toLowerCase().split(" ")[0]

    switch (baseCmd) {
      case "status":
        return [
          "RAXUS System Status",
          "======================",
          "CPU Usage: 42% | Memory: 68% | Network: 92%",
          "Active Services: 12/12 | Security Level: HIGH",
          "Last Backup: 2 hours ago | Uptime: 45d 12h",
          "All systems operational ✓"
        ]
      case "ps":
        return [
          "PID   USER     %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND",
          "1     root      0.0  0.1  12345  1234 ?        Ss   12:00   0:01 init",
          "234   raxus     5.2  2.1  45678  5678 ?        Sl   12:01   1:23 raxus-service",
          "456   admin     12.4 8.9  78901 11234 pts/0    S+   14:30   0:45 system-monitor",
          "678   system    0.8  1.2  34567  3456 ?        S    12:05   0:12 backup-daemon"
        ]
      case "df":
        return [
          "Filesystem      Size  Used Avail Use% Mounted on",
          "/dev/sda1        50G   25G   23G  53% /",
          "/dev/sdb1       100G   45G   52G  47% /data",
          "/dev/sdc1       500G  120G  365G  25% /backup",
          "tmpfs           7.8G     0  7.8G   0% /tmp"
        ]
      case "netstat":
        return [
          "Active Internet connections (servers and established)",
          "Proto Recv-Q Send-Q Local Address           Foreign Address         State",
          "tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN",
          "tcp        0      0 10.0.1.10:443           192.168.1.100:54321     ESTABLISHED",
          "tcp        0      0 10.0.1.10:80            192.168.1.101:45678     ESTABLISHED",
          "tcp        0      0 127.0.0.1:5432          127.0.0.1:34567         ESTABLISHED"
        ]
      case "services":
        return [
          "Service Status Overview",
          "=======================",
          "✓ raxus-api          RUNNING   10.0.1.10:8000",
          "✓ raxus-frontend     RUNNING   10.0.1.10:3000",
          "✓ database-service   RUNNING   10.0.2.10:5432",
          "✓ monitoring-agent   RUNNING   localhost:9090",
          "✓ backup-service     RUNNING   localhost:8080",
          "✓ security-scanner   RUNNING   localhost:8443"
        ]
      default:
        return [
          `Command '${cmd}' not found. Type 'help' for available commands.`,
          "Available commands: status, ps, df, netstat, services, logs, top, backup"
        ]
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim() && !isRunning) {
      executeCommand(currentCommand.trim())
      setCurrentCommand("")
    }
  }

  const clearTerminal = () => {
    setCommands([])
  }

  return (
    <div className="space-y-6">
      {/* Command Reference */}
      <CyberCard title="System Commands" icon={Terminal} iconColor="text-emerald-400">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {systemCommands.map((cmd) => (
            <button
              key={cmd.cmd}
              onClick={() => setCurrentCommand(cmd.cmd)}
              className="text-left p-3 rounded-lg border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/60 transition-colors"
            >
              <div className="text-sm font-mono text-cyan-400">{cmd.cmd}</div>
              <div className="text-xs text-slate-400">{cmd.desc}</div>
            </button>
          ))}
        </div>
      </CyberCard>

      {/* Terminal */}
      <CyberCard
        title="System Console"
        icon={Terminal}
        iconColor="text-emerald-400"
        headerRight={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs ${isRunning ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
              {isRunning ? "EXECUTING" : "READY"}
            </Badge>
            <Button variant="ghost" size="sm" onClick={clearTerminal} className="text-slate-400 hover:text-slate-200">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        }
        noPadding
      >
        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="h-96 overflow-y-auto bg-slate-950 p-4 font-mono text-sm"
        >
          <div className="text-emerald-400 mb-4">
            RAXUS Console v2.1.0 - Type commands or click buttons above
          </div>

          {commands.map((cmd) => (
            <div key={cmd.id} className="mb-4">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-cyan-400">raxus@system:~$</span>
                <span>{cmd.command}</span>
                <Badge
                  variant="outline"
                  className={`text-xs ml-auto ${
                    cmd.status === "error"
                      ? "bg-red-500/10 text-red-400 border-red-500/30"
                      : cmd.status === "running"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  }`}
                >
                  {cmd.status}
                </Badge>
              </div>
              <div className="mt-2 space-y-1">
                {cmd.output.map((line, idx) => (
                  <div key={idx} className="text-slate-300 pl-4 border-l border-slate-700">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Current Command Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
            <span className="text-cyan-400">raxus@system:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              disabled={isRunning}
              className="flex-1 bg-transparent text-slate-300 focus:outline-none"
              placeholder="Enter command..."
              autoFocus
            />
            <Button
              type="submit"
              size="sm"
              disabled={!currentCommand.trim() || isRunning}
              className="bg-cyan-600 hover:bg-cyan-700"
            >
              <Play className="h-3 w-3" />
            </Button>
          </form>
        </div>
      </CyberCard>
    </div>
  )
}