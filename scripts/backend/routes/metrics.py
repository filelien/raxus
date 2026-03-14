"""
RAXUS - Metrics Endpoints
=============================
Real-time and historical metric data for servers.
"""

from fastapi import APIRouter, Query
from datetime import datetime, timedelta
from typing import List, Dict, Any
from models import ServerMetric
import random

router = APIRouter()

def generate_mock_metrics(server_id: str) -> Dict[str, Any]:
    """Generate mock metrics for a server."""
    return {
        "server_id": server_id,
        "cpu": random.randint(10, 95),
        "memory": random.randint(20, 90),
        "disk": random.randint(15, 85),
        "network_in": random.randint(100, 1000),
        "network_out": random.randint(50, 500),
        "timestamp": datetime.utcnow().isoformat()
    }

@router.get("/latest/{server_id}")
async def get_latest_metrics(server_id: str):
    """Get the latest metrics for a specific server."""
    return generate_mock_metrics(server_id)

@router.get("/history/{server_id}")
async def get_metric_history(
    server_id: str,
    hours: int = Query(default=24, ge=1, le=168),
):
    """Get historical metrics for a server over a time range."""
    # Generate mock historical data
    data = []
    base_time = datetime.utcnow()

    for i in range(hours * 6):  # 6 data points per hour
        data_point = generate_mock_metrics(server_id)
        data_point["timestamp"] = (base_time - timedelta(minutes=i * 10)).isoformat()
        data.append(data_point)

    return {
        "server_id": server_id,
        "hours": hours,
        "data": data
    }

@router.get("/aggregate")
async def get_aggregate_metrics():
    """Get aggregate metrics across all servers."""
    # Mock aggregate data
    return {
        "avg_cpu": random.randint(30, 70),
        "avg_memory": random.randint(40, 80),
        "avg_disk": random.randint(30, 60),
        "server_count": 5,
        "timestamp": datetime.utcnow().isoformat()
    }
