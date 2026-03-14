"""
RAXUS - FastAPI Backend Entry Point
======================================
This is the reference backend structure for RAXUS.
Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

# Import routes
from routes import servers, metrics, databases, network, security
# from services.system_monitor import SystemMonitor

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    print("[RAXUS] Starting system monitor...")
    # monitor = SystemMonitor()
    # await monitor.start()
    # app.state.monitor = monitor
    yield
    # Shutdown
    print("[RAXUS] Shutting down...")
    # await monitor.stop()

app = FastAPI(
    title="RAXUS API",
    description="Centralized Infrastructure Management API",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev
        "https://raxus.vercel.app",  # Production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(servers.router, prefix="/api/v1/servers", tags=["servers"])
app.include_router(metrics.router, prefix="/api/v1/metrics", tags=["metrics"])
app.include_router(databases.router, prefix="/api/v1/databases", tags=["databases"])
app.include_router(network.router, prefix="/api/v1/network", tags=["network"])
app.include_router(security.router, prefix="/api/v1/security", tags=["security"])
app.include_router(network.router, prefix="/api/v1/network", tags=["network"])
app.include_router(security.router, prefix="/api/v1/security", tags=["security"])

@app.get("/")
async def root():
    return {"name": "RAXUS API", "version": "0.1.0", "status": "operational"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
