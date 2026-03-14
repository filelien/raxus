"""
RAXUS - Server Management Endpoints
=======================================
CRUD operations for server management.
"""

from fastapi import APIRouter, HTTPException
from typing import List
from models import Server, ServerCreate, ServerUpdate
from lib.mock_data import servers as mock_servers

router = APIRouter()

# Mock database - in production, this would be a real database
mock_db = {server["id"]: server for server in mock_servers}

@router.get("/", response_model=List[Server])
async def list_servers():
    """List all registered servers with current status."""
    # Convert mock data to Server models
    return [
        Server(
            id=s["id"],
            name=s["name"],
            ip_address=s["ip"],
            server_type=s["type"],
            os=s["os"],
            status=s["status"],
            location=s["location"],
            cores=s["cores"],
            ram_total_gb=s["ramTotal"],
            created_at="2024-01-01T00:00:00Z",  # Mock timestamp
            updated_at="2024-01-01T00:00:00Z"
        )
        for s in mock_servers
    ]

@router.get("/{server_id}", response_model=Server)
async def get_server(server_id: str):
    """Get detailed information about a specific server."""
    server_data = mock_db.get(server_id)
    if not server_data:
        raise HTTPException(status_code=404, detail="Server not found")

    return Server(
        id=server_data["id"],
        name=server_data["name"],
        ip_address=server_data["ip"],
        server_type=server_data["type"],
        os=server_data["os"],
        status=server_data["status"],
        location=server_data["location"],
        cores=server_data["cores"],
        ram_total_gb=server_data["ramTotal"],
        created_at="2024-01-01T00:00:00Z",
        updated_at="2024-01-01T00:00:00Z"
    )

@router.post("/", response_model=Server, status_code=201)
async def create_server(server: ServerCreate):
    """Register a new server for monitoring."""
    # Check if server already exists
    if any(s["ip"] == server.ip_address for s in mock_servers):
        raise HTTPException(status_code=400, detail="Server with this IP already exists")

    # Create new server
    new_id = f"srv-{len(mock_servers) + 1:03d}"
    new_server_data = {
        "id": new_id,
        "name": server.name,
        "ip": server.ip_address,
        "type": server.server_type,
        "os": server.os,
        "status": "offline",
        "location": server.location,
        "cores": server.cores,
        "ramTotal": server.ram_total_gb,
        "lastChecked": "Never"
    }

    mock_servers.append(new_server_data)
    mock_db[new_id] = new_server_data

    return Server(
        id=new_id,
        name=server.name,
        ip_address=server.ip_address,
        server_type=server.server_type,
        os=server.os,
        status="offline",
        location=server.location,
        cores=server.cores,
        ram_total_gb=server.ram_total_gb,
        created_at="2024-01-01T00:00:00Z",
        updated_at="2024-01-01T00:00:00Z"
    )

@router.put("/{server_id}", response_model=Server)
async def update_server(server_id: str, server_update: ServerUpdate):
    """Update server configuration."""
    server_data = mock_db.get(server_id)
    if not server_data:
        raise HTTPException(status_code=404, detail="Server not found")

    # Update fields
    if server_update.name:
        server_data["name"] = server_update.name
    if server_update.ip_address:
        server_data["ip"] = server_update.ip_address
    if server_update.server_type:
        server_data["type"] = server_update.server_type
    if server_update.os:
        server_data["os"] = server_update.os
    if server_update.status:
        server_data["status"] = server_update.status
    if server_update.location:
        server_data["location"] = server_update.location
    if server_update.cores:
        server_data["cores"] = server_update.cores
    if server_update.ram_total_gb:
        server_data["ramTotal"] = server_update.ram_total_gb

    return Server(
        id=server_data["id"],
        name=server_data["name"],
        ip_address=server_data["ip"],
        server_type=server_data["type"],
        os=server_data["os"],
        status=server_data["status"],
        location=server_data["location"],
        cores=server_data["cores"],
        ram_total_gb=server_data["ramTotal"],
        created_at="2024-01-01T00:00:00Z",
        updated_at="2024-01-01T00:00:00Z"
    )

@router.delete("/{server_id}")
async def delete_server(server_id: str):
    """Remove a server from monitoring."""
    if server_id not in mock_db:
        raise HTTPException(status_code=404, detail="Server not found")

    del mock_db[server_id]
    mock_servers[:] = [s for s in mock_servers if s["id"] != server_id]

    return {"message": "Server deleted successfully"}

@router.delete("/{server_id}", status_code=204)
async def delete_server(server_id: str):
    """Remove a server from monitoring."""
    return None

@router.post("/{server_id}/restart")
async def restart_server(server_id: str):
    """Send restart command to a server via SSH."""
    # ssh = SSHManager()
    # result = await ssh.execute_command(server_id, "sudo reboot")
    return {"id": server_id, "action": "restart", "status": "initiated"}
