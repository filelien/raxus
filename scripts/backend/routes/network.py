"""
RAXUS - Network Monitoring Endpoints
=========================================
Network topology, traffic, and latency data.
"""

from fastapi import APIRouter, Query
from typing import List, Dict, Any
import random
from datetime import datetime, timedelta

router = APIRouter()

# Mock network nodes
mock_nodes = [
    {
        "id": "node-001",
        "name": "Core Router",
        "type": "router",
        "ip": "10.0.0.1",
        "status": "online",
        "connections": ["node-002", "node-003", "node-004"],
        "traffic": {"inbound": 1250, "outbound": 980},
        "latency": 2
    },
    {
        "id": "node-002",
        "name": "Switch-01",
        "type": "switch",
        "ip": "10.0.1.1",
        "status": "online",
        "connections": ["node-001", "srv-001", "srv-002"],
        "traffic": {"inbound": 850, "outbound": 720},
        "latency": 1
    },
    {
        "id": "node-003",
        "name": "Firewall",
        "type": "firewall",
        "ip": "10.0.0.2",
        "status": "online",
        "connections": ["node-001", "node-005"],
        "traffic": {"inbound": 2100, "outbound": 1950},
        "latency": 3
    },
    {
        "id": "node-004",
        "name": "Load Balancer",
        "type": "loadbalancer",
        "ip": "10.0.2.1",
        "status": "online",
        "connections": ["node-001", "srv-003"],
        "traffic": {"inbound": 3200, "outbound": 3100},
        "latency": 5
    },
    {
        "id": "node-005",
        "name": "DMZ Switch",
        "type": "switch",
        "ip": "192.168.1.1",
        "status": "warning",
        "connections": ["node-003"],
        "traffic": {"inbound": 150, "outbound": 120},
        "latency": 8
    }
]

@router.get("/topology")
async def get_topology():
    """Get the network topology graph (nodes and edges)."""
    nodes = []
    edges = []

    for node in mock_nodes:
        nodes.append({
            "id": node["id"],
            "name": node["name"],
            "type": node["type"],
            "ip": node["ip"],
            "status": node["status"],
            "traffic": node["traffic"],
            "latency": node["latency"]
        })

        for conn in node["connections"]:
            # Avoid duplicate edges
            edge_id = f"{min(node['id'], conn)}-{max(node['id'], conn)}"
            if not any(e["id"] == edge_id for e in edges):
                edges.append({
                    "id": edge_id,
                    "source": node["id"],
                    "target": conn,
                    "status": "active"
                })

    return {"nodes": nodes, "edges": edges}

@router.get("/traffic")
async def get_traffic(hours: int = Query(default=24, ge=1, le=168)):
    """Get network traffic data over a time range."""
    data = []
    base_time = datetime.utcnow()

    for i in range(hours * 6):  # 6 data points per hour
        data_point = {
            "timestamp": (base_time - timedelta(minutes=i * 10)).isoformat(),
            "total_inbound": random.randint(2000, 5000),
            "total_outbound": random.randint(1800, 4500),
            "peak_inbound": random.randint(3000, 6000),
            "peak_outbound": random.randint(2800, 5500)
        }
        data.append(data_point)

    return {
        "hours": hours,
        "data": data,
        "summary": {
            "avg_inbound": sum(d["total_inbound"] for d in data) / len(data),
            "avg_outbound": sum(d["total_outbound"] for d in data) / len(data),
            "total_traffic": sum(d["total_inbound"] + d["total_outbound"] for d in data)
        }
    }

@router.get("/latency")
async def get_latency():
    """Get latency measurements for monitored endpoints."""
    endpoints = []

    # Internal endpoints
    for node in mock_nodes:
        endpoints.append({
            "name": node["name"],
            "ip": node["ip"],
            "type": "internal",
            "latency_ms": node["latency"] + random.randint(-1, 1),
            "status": node["status"],
            "last_check": datetime.utcnow().isoformat()
        })

    # External endpoints
    external_endpoints = [
        {"name": "Google DNS", "ip": "8.8.8.8", "type": "external"},
        {"name": "CloudFlare DNS", "ip": "1.1.1.1", "type": "external"},
        {"name": "AWS API", "ip": "amazonaws.com", "type": "external"},
        {"name": "GitHub", "ip": "github.com", "type": "external"}
    ]

    for ep in external_endpoints:
        endpoints.append({
            "name": ep["name"],
            "ip": ep["ip"],
            "type": ep["type"],
            "latency_ms": random.randint(10, 150),
            "status": "online" if random.random() > 0.1 else "offline",
            "last_check": datetime.utcnow().isoformat()
        })

    return {"endpoints": endpoints}

@router.post("/ping/{host}")
async def ping_host(host: str):
    """Ping a host and return latency."""
    # Mock ping result
    latency = random.randint(1, 50) if random.random() > 0.05 else None
    status = "ok" if latency else "timeout"

    return {
        "host": host,
        "latency_ms": latency,
        "status": status,
        "timestamp": datetime.utcnow().isoformat(),
        "packets_sent": 4,
        "packets_received": 4 if status == "ok" else 0
    }
