"""
RAXUS - Database Management Endpoints
==========================================
Manage and monitor Oracle, PostgreSQL, MySQL, and MongoDB instances.
"""

from fastapi import APIRouter, HTTPException
from typing import List
from models import DatabaseInstance, DatabaseInstanceCreate
import random

router = APIRouter()

# Mock database instances
mock_databases = [
    {
        "id": "db-001",
        "name": "RAXUS-ORACLE",
        "type": "oracle",
        "version": "19c",
        "host": "10.0.2.10",
        "port": 1521,
        "username": "system",
        "status": "online",
        "connections": {"active": 45, "max": 100},
        "size": "2.1 TB",
        "replication": "active",
        "cacheHitRatio": 0.94,
        "queriesPerSec": 1250,
        "uptime": "90d 03h 45m"
    },
    {
        "id": "db-002",
        "name": "RAXUS-POSTGRES",
        "type": "postgresql",
        "version": "15.3",
        "host": "10.0.2.11",
        "port": 5432,
        "username": "postgres",
        "status": "online",
        "connections": {"active": 23, "max": 50},
        "size": "850 GB",
        "replication": "standby",
        "cacheHitRatio": 0.97,
        "queriesPerSec": 890,
        "uptime": "45d 12h 32m"
    },
    {
        "id": "db-003",
        "name": "RAXUS-MYSQL",
        "type": "mysql",
        "version": "8.0.33",
        "host": "10.0.2.12",
        "port": 3306,
        "username": "root",
        "status": "online",
        "connections": {"active": 67, "max": 200},
        "size": "1.2 TB",
        "replication": "active",
        "cacheHitRatio": 0.89,
        "queriesPerSec": 2100,
        "uptime": "30d 08h 15m"
    }
]

mock_db = {db["id"]: db for db in mock_databases}

@router.get("/", response_model=List[DatabaseInstance])
async def list_databases():
    """List all monitored database instances."""
    return [
        DatabaseInstance(
            id=db["id"],
            name=db["name"],
            db_type=db["type"],
            version=db["version"],
            host=db["host"],
            port=db["port"],
            username=db["username"],
            status=db["status"],
            created_at="2024-01-01T00:00:00Z"
        )
        for db in mock_databases
    ]

@router.get("/{db_id}", response_model=DatabaseInstance)
async def get_database(db_id: str):
    """Get detailed info about a database instance."""
    db = mock_db.get(db_id)
    if not db:
        raise HTTPException(status_code=404, detail="Database not found")

    return DatabaseInstance(
        id=db["id"],
        name=db["name"],
        db_type=db["type"],
        version=db["version"],
        host=db["host"],
        port=db["port"],
        username=db["username"],
        status=db["status"],
        created_at="2024-01-01T00:00:00Z"
    )

@router.get("/{db_id}/metrics")
async def get_database_metrics(db_id: str):
    """Get current performance metrics for a database."""
    db = mock_db.get(db_id)
    if not db:
        raise HTTPException(status_code=404, detail="Database not found")

    return {
        "id": db_id,
        "connections": db["connections"],
        "qps": random.randint(db["queriesPerSec"] - 100, db["queriesPerSec"] + 100),
        "cache_hit_ratio": db["cacheHitRatio"],
        "size": db["size"],
        "uptime": db["uptime"]
    }

@router.get("/{db_id}/queries")
async def get_active_queries(db_id: str):
    """Get currently running queries on a database."""
    db = mock_db.get(db_id)
    if not db:
        raise HTTPException(status_code=404, detail="Database not found")

    # Generate mock active queries
    queries = []
    for i in range(random.randint(1, 10)):
        queries.append({
            "pid": random.randint(1000, 9999),
            "database": db["name"],
            "user": f"user_{random.randint(1, 50)}",
            "query": f"SELECT * FROM table_{random.randint(1, 100)} WHERE id = {random.randint(1, 10000)}",
            "duration": f"{random.randint(1, 300)}s",
            "status": random.choice(["active", "idle", "waiting"])
        })

    return {"id": db_id, "queries": queries}

@router.get("/{db_id}/slow-queries")
async def get_slow_queries(db_id: str):
    """Get slow query log for a database."""
    db = mock_db.get(db_id)
    if not db:
        raise HTTPException(status_code=404, detail="Database not found")

    # Generate mock slow queries
    slow_queries = []
    for i in range(random.randint(5, 20)):
        slow_queries.append({
            "query": f"SELECT * FROM large_table_{random.randint(1, 50)} WHERE date BETWEEN '2024-01-01' AND '2024-12-31' ORDER BY created_at DESC",
            "duration": f"{random.randint(30, 300)}s",
            "executions": random.randint(1, 100),
            "avg_time": f"{random.randint(10, 200)}s",
            "last_executed": f"2024-01-{random.randint(1, 31):02d} {random.randint(0, 23):02d}:{random.randint(0, 59):02d}:00"
        })

    return {"id": db_id, "slow_queries": slow_queries}

@router.post("/{db_id}/queries/{pid}/kill")
async def kill_query(db_id: str, pid: int):
    """Kill a running query by PID."""
    db = mock_db.get(db_id)
    if not db:
        raise HTTPException(status_code=404, detail="Database not found")

    return {"db_id": db_id, "pid": pid, "status": "killed", "message": f"Query {pid} killed successfully"}

@router.post("/", response_model=DatabaseInstance, status_code=201)
async def create_database(db: DatabaseInstanceCreate):
    """Register a new database instance for monitoring."""
    # Check if database already exists
    if any(d["host"] == db.host and d["port"] == db.port for d in mock_databases):
        raise HTTPException(status_code=400, detail="Database with this host:port already exists")

    # Create new database
    new_id = f"db-{len(mock_databases) + 1:03d}"
    new_db = {
        "id": new_id,
        "name": db.name,
        "type": db.db_type,
        "version": db.version,
        "host": db.host,
        "port": db.port,
        "username": db.username,
        "status": "offline"
    }

    mock_databases.append(new_db)
    mock_db[new_id] = new_db

    return DatabaseInstance(
        id=new_id,
        name=db.name,
        db_type=db.db_type,
        version=db.version,
        host=db.host,
        port=db.port,
        username=db.username,
        status="offline",
        created_at="2024-01-01T00:00:00Z"
    )
