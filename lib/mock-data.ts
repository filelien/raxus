// ============================================================
// RAXUS - Centralized Mock Data Layer with API Integration
// All mock data generators and static datasets for the application
// Can optionally fetch from backend API when available
// ============================================================

import type { LucideIcon } from "lucide-react"
import { apiClient, isBackendAvailable } from "./api-client"

// Global flag to determine if we should use API or mock data
let useApi = false;

// Check backend availability on module load - moved to a function to avoid SSR issues
async function checkBackendAvailability() {
  try {
    const available = await isBackendAvailable();
    useApi = available;
    console.log(`[RAXUS] Backend ${available ? 'available' : 'unavailable'}, using ${available ? 'API' : 'mock'} data`);
  } catch {
    useApi = false;
    console.log('[RAXUS] Backend unavailable, using mock data');
  }
}

// Initialize backend check (but don't block module loading)
if (typeof window !== 'undefined') {
  checkBackendAvailability();
}

// ---------- Types ----------

export interface Server {
  id: string
  name: string
  ip: string
  type: "linux" | "windows" | "oracle"
  os: string
  status: "online" | "offline" | "maintenance" | "warning"
  cpu: number
  memory: number
  disk: number
  uptime: string
  location: string
  cores: number
  ramTotal: number
  lastChecked: string
}

export interface DatabaseInstance {
  id: string
  name: string
  type: "oracle" | "postgresql" | "mysql" | "mongodb"
  version: string
  status: "online" | "offline" | "degraded" | "maintenance"
  host: string
  port: number
  connections: { active: number; max: number }
  size: string
  replication: "active" | "standby" | "none"
  cacheHitRatio: number
  queriesPerSec: number
  uptime: string
}

export interface NetworkNode {
  id: string
  name: string
  type: "router" | "switch" | "firewall" | "server" | "loadbalancer"
  status: "online" | "offline" | "warning"
  ip: string
  connections: string[]
  traffic: { inbound: number; outbound: number }
  latency: number
}

export interface SecurityEvent {
  id: string
  type: "intrusion" | "malware" | "access" | "policy" | "audit"
  severity: "critical" | "high" | "medium" | "low" | "info"
  title: string
  description: string
  source: string
  timestamp: string
  status: "active" | "resolved" | "investigating"
}

export interface FirewallRule {
  id: string
  name: string
  port: number
  protocol: "TCP" | "UDP" | "ICMP" | "ANY"
  action: "allow" | "deny" | "drop"
  source: string
  destination: string
  enabled: boolean
}

export interface SystemLog {
  id: string
  level: "INFO" | "WARNING" | "ERROR" | "DEBUG" | "CRITICAL"
  source: string
  message: string
  timestamp: string
  details?: string
}

export interface Process {
  pid: string
  name: string
  user: string
  cpu: number
  memory: number
  status: "running" | "sleeping" | "stopped"
}

export interface StorageDrive {
  name: string
  total: number
  used: number
  type: "SSD" | "HDD" | "NVMe"
}

export interface ActiveQuery {
  pid: number
  database: string
  user: string
  query: string
  duration: string
  status: "active" | "idle" | "waiting"
  rows: number
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  read: boolean
  timestamp: string
}

// ---------- Static Data ----------

export const servers: Server[] = [
  {
    id: "srv-001",
    name: "RAXUS-PROD-01",
    ip: "100.229.0.2",
    type: "linux",
    os: "Ubuntu 22.04 LTS",
    status: "online",
    cpu: 42,
    memory: 68,
    disk: 55,
    uptime: "45d 12h 32m",
    location: "DC-INDE-01",
    cores: 16,
    ramTotal: 64,
    lastChecked: "2 min ago",
  },
  {
    id: "srv-002",
    name: "RAXUS-PROD-02",
    ip: "10.0.1.11",
    type: "linux",
    os: "CentOS 8",
    status: "online",
    cpu: 78,
    memory: 82,
    disk: 45,
    uptime: "30d 08h 15m",
    location: "DC-LONDRES-01",
    cores: 32,
    ramTotal: 128,
    lastChecked: "1 min ago",
  },
  {
    id: "srv-003",
    name: "RAXUS-DB-01",
    ip: "222.0.24.10",
    type: "oracle",
    os: "Oracle Linux 8.6",
    status: "online",
    cpu: 55,
    memory: 75,
    disk: 72,
    uptime: "90d 03h 45m",
    location: "DC-Lyon-01",
    cores: 48,
    ramTotal: 256,
    lastChecked: "30 sec ago",
  },
  {
    id: "srv-004",
    name: "RAXUS-WIN-01",
    ip: "190.03.3.120",
    type: "windows",
    os: "Windows Server 2022",
    status: "warning",
    cpu: 91,
    memory: 88,
    disk: 82,
    uptime: "15d 22h 10m",
    location: "DC-Paris-02",
    cores: 8,
    ramTotal: 32,
    lastChecked: "5 min ago",
  },
  {
    id: "srv-005",
    name: "RAXUS-BACKUP-01",
    ip: "178.0.4.10",
    type: "linux",
    os: "Debian 12",
    status: "online",
    cpu: 12,
    memory: 35,
    disk: 68,
    uptime: "120d 15h 00m",
    location: "DC-Lyon-01",
    cores: 8,
    ramTotal: 32,
    lastChecked: "1 min ago",
  },
  {
    id: "srv-006",
    name: "RAXUS-DEV-01",
    ip: "10.0.5.10",
    type: "linux",
    os: "Ubuntu 24.04 LTS",
    status: "maintenance",
    cpu: 0,
    memory: 0,
    disk: 30,
    uptime: "0d 00h 00m",
    location: "DC-Paris-01",
    cores: 16,
    ramTotal: 64,
    lastChecked: "Offline",
  },
]

export const databaseInstances: DatabaseInstance[] = [
  {
    id: "db-001",
    name: "RAXUS-ORA-PROD",
    type: "oracle",
    version: "Oracle 19c",
    status: "online",
    host: "10.0.2.10",
    port: 1521,
    connections: { active: 145, max: 300 },
    size: "2.4 TB",
    replication: "active",
    cacheHitRatio: 97.8,
    queriesPerSec: 1250,
    uptime: "90d 03h",
  },
  {
    id: "db-002",
    name: "RAXUS-PG-PROD",
    type: "postgresql",
    version: "PostgreSQL 16.2",
    status: "online",
    host: "10.0.2.11",
    port: 5432,
    connections: { active: 82, max: 200 },
    size: "856 GB",
    replication: "active",
    cacheHitRatio: 99.1,
    queriesPerSec: 3400,
    uptime: "60d 15h",
  },
  {
    id: "db-003",
    name: "RAXUS-MY-PROD",
    type: "mysql",
    version: "MySQL 8.0.36",
    status: "degraded",
    host: "10.0.2.12",
    port: 3306,
    connections: { active: 190, max: 250 },
    size: "1.1 TB",
    replication: "standby",
    cacheHitRatio: 94.2,
    queriesPerSec: 890,
    uptime: "45d 08h",
  },
  {
    id: "db-004",
    name: "RAXUS-MONGO-PROD",
    type: "mongodb",
    version: "MongoDB 7.0",
    status: "online",
    host: "10.0.2.13",
    port: 27017,
    connections: { active: 56, max: 500 },
    size: "3.2 TB",
    replication: "active",
    cacheHitRatio: 96.5,
    queriesPerSec: 5600,
    uptime: "30d 12h",
  },
]

export const networkNodes: NetworkNode[] = [
  {
    id: "net-001",
    name: "CORE-RTR-01",
    type: "router",
    status: "online",
    ip: "10.0.0.1",
    connections: ["net-002", "net-003", "net-004"],
    traffic: { inbound: 850, outbound: 720 },
    latency: 2,
  },
  {
    id: "net-002",
    name: "FW-EDGE-01",
    type: "firewall",
    status: "online",
    ip: "10.0.0.2",
    connections: ["net-001", "net-005"],
    traffic: { inbound: 1200, outbound: 980 },
    latency: 5,
  },
  {
    id: "net-003",
    name: "SW-CORE-01",
    type: "switch",
    status: "online",
    ip: "10.0.0.3",
    connections: ["net-001", "net-006", "net-007"],
    traffic: { inbound: 450, outbound: 380 },
    latency: 1,
  },
  {
    id: "net-004",
    name: "LB-PROD-01",
    type: "loadbalancer",
    status: "online",
    ip: "10.0.0.4",
    connections: ["net-001", "net-008"],
    traffic: { inbound: 2400, outbound: 2200 },
    latency: 3,
  },
  {
    id: "net-005",
    name: "FW-DMZ-01",
    type: "firewall",
    status: "warning",
    ip: "10.0.0.5",
    connections: ["net-002"],
    traffic: { inbound: 300, outbound: 250 },
    latency: 8,
  },
  {
    id: "net-006",
    name: "SW-ACC-01",
    type: "switch",
    status: "online",
    ip: "10.0.0.6",
    connections: ["net-003"],
    traffic: { inbound: 180, outbound: 150 },
    latency: 1,
  },
  {
    id: "net-007",
    name: "SW-ACC-02",
    type: "switch",
    status: "offline",
    ip: "10.0.0.7",
    connections: ["net-003"],
    traffic: { inbound: 0, outbound: 0 },
    latency: 0,
  },
  {
    id: "net-008",
    name: "SRV-POOL-01",
    type: "server",
    status: "online",
    ip: "10.0.1.0",
    connections: ["net-004"],
    traffic: { inbound: 1800, outbound: 1650 },
    latency: 4,
  },
]

export const securityEvents: SecurityEvent[] = [
  {
    id: "sec-001",
    type: "intrusion",
    severity: "critical",
    title: "Brute Force Attack Detected",
    description: "Multiple failed SSH login attempts from 203.0.113.45 targeting RAXUS-PROD-01",
    source: "203.0.113.45",
    timestamp: "2026-02-12T14:32:00Z",
    status: "active",
  },
  {
    id: "sec-002",
    type: "malware",
    severity: "high",
    title: "Suspicious File Upload Blocked",
    description: "Potentially malicious file blocked by WAF on port 443",
    source: "198.51.100.22",
    timestamp: "2026-02-12T13:15:00Z",
    status: "resolved",
  },
  {
    id: "sec-003",
    type: "access",
    severity: "medium",
    title: "Unauthorized Access Attempt",
    description: "Failed database connection attempt with invalid credentials on RAXUS-ORA-PROD",
    source: "10.0.5.100",
    timestamp: "2026-02-12T12:45:00Z",
    status: "investigating",
  },
  {
    id: "sec-004",
    type: "policy",
    severity: "low",
    title: "Firewall Rule Modified",
    description: "Rule FW-042 updated by admin user to allow port 8443",
    source: "admin@raxus",
    timestamp: "2026-02-12T11:30:00Z",
    status: "resolved",
  },
  {
    id: "sec-005",
    type: "audit",
    severity: "info",
    title: "Security Scan Completed",
    description: "Scheduled vulnerability scan finished. 0 critical, 2 medium findings",
    source: "RAXUS-SECURITY",
    timestamp: "2026-02-12T10:00:00Z",
    status: "resolved",
  },
  {
    id: "sec-006",
    type: "intrusion",
    severity: "high",
    title: "Port Scan Detected",
    description: "Sequential port scanning activity detected from external IP on DMZ segment",
    source: "192.0.2.100",
    timestamp: "2026-02-12T09:20:00Z",
    status: "resolved",
  },
]

export const firewallRules: FirewallRule[] = [
  { id: "fw-001", name: "Allow HTTPS", port: 443, protocol: "TCP", action: "allow", source: "0.0.0.0/0", destination: "10.0.1.0/24", enabled: true },
  { id: "fw-002", name: "Allow SSH Internal", port: 22, protocol: "TCP", action: "allow", source: "10.0.0.0/8", destination: "10.0.0.0/8", enabled: true },
  { id: "fw-003", name: "Block Telnet", port: 23, protocol: "TCP", action: "deny", source: "0.0.0.0/0", destination: "0.0.0.0/0", enabled: true },
  { id: "fw-004", name: "Allow DNS", port: 53, protocol: "UDP", action: "allow", source: "10.0.0.0/8", destination: "10.0.0.1", enabled: true },
  { id: "fw-005", name: "Allow Oracle DB", port: 1521, protocol: "TCP", action: "allow", source: "10.0.1.0/24", destination: "10.0.2.10", enabled: true },
  { id: "fw-006", name: "Allow PostgreSQL", port: 5432, protocol: "TCP", action: "allow", source: "10.0.1.0/24", destination: "10.0.2.11", enabled: true },
  { id: "fw-007", name: "Block ICMP External", port: 0, protocol: "ICMP", action: "drop", source: "0.0.0.0/0", destination: "10.0.0.0/8", enabled: false },
  { id: "fw-008", name: "Allow HTTP", port: 80, protocol: "TCP", action: "allow", source: "0.0.0.0/0", destination: "10.0.1.0/24", enabled: true },
]

export const processes: Process[] = [
  { pid: "1024", name: "system_core.exe", user: "SYSTEM", cpu: 12.4, memory: 345, status: "running" },
  { pid: "1842", name: "raxus_service.exe", user: "SYSTEM", cpu: 8.7, memory: 128, status: "running" },
  { pid: "2156", name: "security_monitor.exe", user: "ADMIN", cpu: 5.2, memory: 96, status: "running" },
  { pid: "3012", name: "network_manager.exe", user: "SYSTEM", cpu: 3.8, memory: 84, status: "running" },
  { pid: "4268", name: "user_interface.exe", user: "USER", cpu: 15.3, memory: 256, status: "running" },
  { pid: "5124", name: "data_analyzer.exe", user: "ADMIN", cpu: 22.1, memory: 512, status: "running" },
  { pid: "6001", name: "backup_daemon.exe", user: "SYSTEM", cpu: 1.2, memory: 64, status: "sleeping" },
  { pid: "7200", name: "log_collector.exe", user: "SYSTEM", cpu: 0.8, memory: 48, status: "running" },
]

export const storageDrives: StorageDrive[] = [
  { name: "System Drive (C:)", total: 512, used: 324, type: "SSD" },
  { name: "Data Drive (D:)", total: 2048, used: 1285, type: "HDD" },
  { name: "Backup Drive (E:)", total: 4096, used: 1865, type: "HDD" },
  { name: "Fast Storage (F:)", total: 1024, used: 210, type: "NVMe" },
]

export const activeQueries: ActiveQuery[] = [
  { pid: 4521, database: "RAXUS-ORA-PROD", user: "app_user", query: "SELECT * FROM transactions WHERE date > SYSDATE - 7", duration: "00:00:12", status: "active", rows: 15420 },
  { pid: 4522, database: "RAXUS-PG-PROD", user: "report_user", query: "SELECT COUNT(*) FROM analytics GROUP BY region, month", duration: "00:02:45", status: "active", rows: 0 },
  { pid: 4523, database: "RAXUS-MY-PROD", user: "sync_service", query: "INSERT INTO audit_log (action, user_id, ts) VALUES (...)", duration: "00:00:01", status: "active", rows: 1 },
  { pid: 4524, database: "RAXUS-ORA-PROD", user: "admin", query: "ALTER INDEX idx_transactions REBUILD ONLINE", duration: "00:15:32", status: "active", rows: 0 },
  { pid: 4525, database: "RAXUS-PG-PROD", user: "api_service", query: "UPDATE users SET last_login = NOW() WHERE id = $1", duration: "00:00:00", status: "idle", rows: 1 },
  { pid: 4526, database: "RAXUS-MONGO-PROD", user: "analytics", query: "db.events.aggregate([{$match: {ts: {$gte: ISODate()}}}, ...])", duration: "00:01:18", status: "active", rows: 89200 },
]

export const notifications: Notification[] = [
  { id: "notif-001", title: "Server Alert", message: "RAXUS-WIN-01 CPU usage exceeded 90% threshold", type: "warning", read: false, timestamp: "2 min ago" },
  { id: "notif-002", title: "Backup Complete", message: "Daily backup of RAXUS-ORA-PROD completed successfully", type: "success", read: false, timestamp: "15 min ago" },
  { id: "notif-003", title: "Security Alert", message: "Brute force attack detected and blocked on RAXUS-PROD-01", type: "error", read: false, timestamp: "32 min ago" },
  { id: "notif-004", title: "Maintenance Scheduled", message: "RAXUS-DEV-01 scheduled for maintenance window", type: "info", read: true, timestamp: "1 hour ago" },
  { id: "notif-005", title: "Database Warning", message: "RAXUS-MY-PROD connection pool at 76% capacity", type: "warning", read: true, timestamp: "2 hours ago" },
  { id: "notif-006", title: "System Update", message: "Security patch KB-2026-001 applied successfully", type: "success", read: true, timestamp: "4 hours ago" },
]

// ---------- Generators ----------

export function generateSystemLogs(count: number = 50): SystemLog[] {
  const sources = ["system_core", "security_module", "network_manager", "database_monitor", "backup_service", "web_server", "load_balancer", "auth_service"]
  const levels: SystemLog["level"][] = ["INFO", "WARNING", "ERROR", "DEBUG", "CRITICAL"]
  const messages: Record<SystemLog["level"], string[]> = {
    INFO: [
      "Service health check passed",
      "Connection pool refreshed",
      "Cache invalidation completed",
      "Scheduled task executed successfully",
      "Configuration reloaded",
      "SSL certificate valid for 45 days",
      "Log rotation completed",
      "Metrics exported successfully",
    ],
    WARNING: [
      "High memory usage detected on worker process",
      "Slow query detected (>2s execution time)",
      "Connection pool nearing capacity",
      "Disk I/O latency above threshold",
      "Certificate expiring in 30 days",
      "Retry attempt 3/5 for external API call",
    ],
    ERROR: [
      "Failed to connect to replica database",
      "Request timeout after 30s on /api/reports",
      "Out of memory error in data_analyzer process",
      "TLS handshake failed with external service",
      "File descriptor limit reached",
    ],
    DEBUG: [
      "Query plan generated for complex join",
      "WebSocket connection established from 10.0.1.50",
      "Cache miss for key: user_session_4521",
      "Thread pool size adjusted to 24",
    ],
    CRITICAL: [
      "Primary database failover initiated",
      "System resource exhaustion imminent",
      "Multiple authentication failures detected",
    ],
  }

  const logs: SystemLog[] = []
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)]
    const source = sources[Math.floor(Math.random() * sources.length)]
    const msgList = messages[level]
    const message = msgList[Math.floor(Math.random() * msgList.length)]
    const timestamp = new Date(now - i * 30000 - Math.random() * 60000).toISOString()

    logs.push({
      id: `log-${String(i).padStart(4, "0")}`,
      level,
      source,
      message,
      timestamp,
    })
  }

  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function generatePerformanceData(hours: number = 24): { time: string; cpu: number; memory: number; network: number }[] {
  const data = []
  for (let i = 0; i < hours; i++) {
    const hour = String(i).padStart(2, "0")
    data.push({
      time: `${hour}:00`,
      cpu: Math.floor(Math.random() * 60) + 20,
      memory: Math.floor(Math.random() * 40) + 40,
      network: Math.floor(Math.random() * 30) + 30,
    })
  }
  return data
}

export function generateTrafficData(points: number = 24): { time: string; inbound: number; outbound: number }[] {
  const data = []
  for (let i = 0; i < points; i++) {
    const hour = String(i).padStart(2, "0")
    data.push({
      time: `${hour}:00`,
      inbound: Math.floor(Math.random() * 2000) + 500,
      outbound: Math.floor(Math.random() * 1800) + 400,
    })
  }
  return data
}

export function generateLatencyData(): { endpoint: string; latency: number; status: "good" | "warning" | "critical"; history: number[] }[] {
  return [
    { endpoint: "api.raxus-internal.local", latency: 12, status: "good", history: Array.from({ length: 20 }, () => Math.floor(Math.random() * 30) + 5) },
    { endpoint: "db-primary.raxus.local", latency: 3, status: "good", history: Array.from({ length: 20 }, () => Math.floor(Math.random() * 10) + 1) },
    { endpoint: "cdn.raxus-edge.com", latency: 45, status: "good", history: Array.from({ length: 20 }, () => Math.floor(Math.random() * 60) + 20) },
    { endpoint: "backup.raxus-dr.com", latency: 85, status: "warning", history: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 50) },
    { endpoint: "external-api.partner.io", latency: 120, status: "critical", history: Array.from({ length: 20 }, () => Math.floor(Math.random() * 150) + 80) },
    { endpoint: "monitoring.raxus.local", latency: 8, status: "good", history: Array.from({ length: 20 }, () => Math.floor(Math.random() * 15) + 3) },
  ]
}

// ---------- API Integration Functions ----------
// These functions try to fetch from API first, then fall back to mock data

export async function getServersData(): Promise<Server[]> {
  if (useApi) {
    try {
      const response = await apiClient.getServers() as any[];
      return response.map((s: any) => ({
        id: s.id,
        name: s.name,
        ip: s.ip_address,
        type: s.server_type,
        os: s.os || "Unknown",
        status: s.status,
        cpu: 0, // Would come from metrics API
        memory: 0,
        disk: 0,
        uptime: "Unknown",
        location: s.location || "Unknown",
        cores: s.cores || 0,
        ramTotal: s.ram_total_gb || 0,
        lastChecked: "API"
      }));
    } catch (error) {
      console.warn('API call failed, falling back to mock data:', error);
    }
  }
  return servers;
}

export async function getDatabasesData(): Promise<DatabaseInstance[]> {
  if (useApi) {
    try {
      const response = await apiClient.getDatabases() as any[];
      return response.map((db: any) => ({
        id: db.id,
        name: db.name,
        type: db.db_type,
        version: db.version || "Unknown",
        status: db.status,
        host: db.host,
        port: db.port,
        connections: { active: 0, max: 0 }, // Would come from metrics
        size: "Unknown",
        replication: "none",
        cacheHitRatio: 0,
        queriesPerSec: 0,
        uptime: "Unknown"
      }));
    } catch (error) {
      console.warn('API call failed, falling back to mock data:', error);
    }
  }
  return databaseInstances;
}

export async function getSecurityEventsData(): Promise<SecurityEvent[]> {
  if (useApi) {
    try {
      const response = await apiClient.getSecurityEvents() as any[];
      return response.map((event: any) => ({
        id: event.id,
        type: "audit" as const, // API doesn't provide type, using audit as fallback
        severity: event.severity,
        title: event.title,
        description: event.description,
        source: event.source,
        timestamp: event.created_at,
        status: event.status
      }));
    } catch (error) {
      console.warn('API call failed, falling back to mock data:', error);
    }
  }
  return securityEvents;
}

export async function getNetworkTopologyData() {
  if (useApi) {
    try {
      return await apiClient.getNetworkTopology();
    } catch (error) {
      console.warn('API call failed, falling back to mock data:', error);
    }
  }
  // Return mock topology data
  return {
    nodes: networkNodes.map(node => ({
      id: node.id,
      name: node.name,
      type: node.type,
      ip: node.ip,
      status: node.status,
      traffic: node.traffic,
      latency: node.latency
    })),
    edges: [
      { id: "edge-001", source: "net-001", target: "net-002" },
      { id: "edge-002", source: "net-001", target: "net-003" },
      { id: "edge-003", source: "net-002", target: "srv-001" },
      { id: "edge-004", source: "net-002", target: "srv-002" },
      { id: "edge-005", source: "net-003", target: "net-004" },
    ]
  };
}
