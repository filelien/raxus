"""
RAXUS - Security Monitoring Endpoints
==========================================
Security events, firewall rules, and threat detection.
"""

from fastapi import APIRouter, HTTPException
from typing import List
from models import Alert, AlertCreate
import random
from datetime import datetime, timedelta

router = APIRouter()

# Mock security events
mock_events = [
    {
        "id": "evt-001",
        "type": "intrusion",
        "severity": "high",
        "title": "Failed SSH Login Attempts",
        "description": "Multiple failed SSH login attempts from IP 192.168.1.100",
        "source": "SSH Service",
        "timestamp": "2024-01-15T10:30:00Z",
        "status": "active"
    },
    {
        "id": "evt-002",
        "type": "malware",
        "severity": "critical",
        "title": "Suspicious File Detected",
        "description": "Malware signature detected in uploaded file on web server",
        "source": "File Scanner",
        "timestamp": "2024-01-15T09:15:00Z",
        "status": "investigating"
    },
    {
        "id": "evt-003",
        "type": "access",
        "severity": "medium",
        "title": "Unauthorized Database Access",
        "description": "Attempted access to restricted database table",
        "source": "Database Monitor",
        "timestamp": "2024-01-15T08:45:00Z",
        "status": "resolved"
    }
]

# Mock firewall rules
mock_firewall_rules = [
    {
        "id": "rule-001",
        "name": "SSH Access",
        "port": 22,
        "protocol": "TCP",
        "action": "allow",
        "source": "10.0.0.0/8",
        "destination": "any",
        "enabled": True
    },
    {
        "id": "rule-002",
        "name": "HTTP/HTTPS",
        "port": 80,
        "protocol": "TCP",
        "action": "allow",
        "source": "any",
        "destination": "any",
        "enabled": True
    },
    {
        "id": "rule-003",
        "name": "Block External RDP",
        "port": 3389,
        "protocol": "TCP",
        "action": "deny",
        "source": "0.0.0.0/0",
        "destination": "any",
        "enabled": True
    }
]

@router.get("/events", response_model=List[Alert])
async def get_security_events():
    """Get all security events."""
    return [
        Alert(
            id=event["id"],
            severity=event["severity"],
            title=event["title"],
            description=event["description"],
            source=event["source"],
            status=event["status"],
            created_at=event["timestamp"],
            resolved_at=None
        )
        for event in mock_events
    ]

@router.get("/events/{event_id}", response_model=Alert)
async def get_security_event(event_id: str):
    """Get a specific security event."""
    event = next((e for e in mock_events if e["id"] == event_id), None)
    if not event:
        raise HTTPException(status_code=404, detail="Security event not found")

    return Alert(
        id=event["id"],
        severity=event["severity"],
        title=event["title"],
        description=event["description"],
        source=event["source"],
        status=event["status"],
        created_at=event["timestamp"],
        resolved_at=None
    )

@router.post("/events", response_model=Alert, status_code=201)
async def create_security_event(event: AlertCreate):
    """Create a new security event."""
    new_id = f"evt-{len(mock_events) + 1:03d}"
    new_event = {
        "id": new_id,
        "type": "custom",
        "severity": event.severity,
        "title": event.title,
        "description": event.description,
        "source": event.source or "System",
        "timestamp": datetime.utcnow().isoformat(),
        "status": "active"
    }

    mock_events.append(new_event)

    return Alert(
        id=new_id,
        severity=event.severity,
        title=event.title,
        description=event.description,
        source=event.source or "System",
        status="active",
        created_at=new_event["timestamp"],
        resolved_at=None
    )

@router.put("/events/{event_id}/resolve")
async def resolve_security_event(event_id: str):
    """Mark a security event as resolved."""
    event = next((e for e in mock_events if e["id"] == event_id), None)
    if not event:
        raise HTTPException(status_code=404, detail="Security event not found")

    event["status"] = "resolved"
    return {"message": f"Event {event_id} marked as resolved"}

@router.get("/firewall/rules")
async def get_firewall_rules():
    """Get all firewall rules."""
    return {"rules": mock_firewall_rules}

@router.get("/firewall/rules/{rule_id}")
async def get_firewall_rule(rule_id: str):
    """Get a specific firewall rule."""
    rule = next((r for r in mock_firewall_rules if r["id"] == rule_id), None)
    if not rule:
        raise HTTPException(status_code=404, detail="Firewall rule not found")

    return rule

@router.put("/firewall/rules/{rule_id}")
async def update_firewall_rule(rule_id: str, enabled: bool):
    """Enable or disable a firewall rule."""
    rule = next((r for r in mock_firewall_rules if r["id"] == rule_id), None)
    if not rule:
        raise HTTPException(status_code=404, detail="Firewall rule not found")

    rule["enabled"] = enabled
    return {"message": f"Rule {rule_id} {'enabled' if enabled else 'disabled'}"}

@router.get("/scan")
async def run_security_scan():
    """Run a security scan on all systems."""
    # Mock scan results
    return {
        "scan_id": f"scan-{random.randint(1000, 9999)}",
        "status": "running",
        "start_time": datetime.utcnow().isoformat(),
        "estimated_completion": (datetime.utcnow() + timedelta(minutes=30)).isoformat(),
        "systems_scanned": 5,
        "vulnerabilities_found": random.randint(0, 5)
    }

@router.get("/threats")
async def get_threat_intelligence():
    """Get threat intelligence data."""
    return {
        "threat_database_version": "2024.01.15.001",
        "last_updated": "2024-01-15T06:00:00Z",
        "known_threats": 1250000,
        "blocked_today": random.randint(50, 200),
        "active_threats": random.randint(0, 10)
    }