"""
RAXUS - Database Models & Pydantic Schemas
==============================================
SQLAlchemy models for PostgreSQL and Pydantic schemas for API validation.
"""

from datetime import datetime
from typing import Optional
from enum import Enum

# ---------- Enums ----------

class ServerType(str, Enum):
    LINUX = "linux"
    WINDOWS = "windows"
    ORACLE = "oracle"

class ServerStatus(str, Enum):
    ONLINE = "online"
    OFFLINE = "offline"
    MAINTENANCE = "maintenance"
    WARNING = "warning"

class DatabaseType(str, Enum):
    ORACLE = "oracle"
    POSTGRESQL = "postgresql"
    MYSQL = "mysql"
    MONGODB = "mongodb"

class AlertSeverity(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"

# ---------- SQLAlchemy Models (PostgreSQL) ----------

from sqlalchemy import Column, String, Integer, Float, DateTime, Enum as SAEnum, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Server(Base):
    __tablename__ = "servers"

    id = Column(String, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)
    ip_address = Column(String(45), nullable=False)
    server_type = Column(SAEnum(ServerType), nullable=False)
    os = Column(String(100))
    status = Column(SAEnum(ServerStatus), default=ServerStatus.OFFLINE)
    location = Column(String(100))
    cores = Column(Integer)
    ram_total_gb = Column(Integer)
    ssh_user = Column(String(50))
    ssh_port = Column(Integer, default=22)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    metrics = relationship("ServerMetric", back_populates="server")
    alerts = relationship("Alert", back_populates="server")


class ServerMetric(Base):
    __tablename__ = "server_metrics"

    id = Column(Integer, primary_key=True, autoincrement=True)
    server_id = Column(String, ForeignKey("servers.id"), nullable=False)
    cpu_percent = Column(Float)
    memory_percent = Column(Float)
    disk_percent = Column(Float)
    network_in_bytes = Column(Float)
    network_out_bytes = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    server = relationship("Server", back_populates="metrics")


class DatabaseInstance(Base):
    __tablename__ = "database_instances"

    id = Column(String, primary_key=True)
    name = Column(String(100), nullable=False)
    db_type = Column(SAEnum(DatabaseType), nullable=False)
    version = Column(String(20))
    host = Column(String(100), nullable=False)
    port = Column(Integer, nullable=False)
    username = Column(String(50))
    status = Column(String(20), default="offline")
    created_at = Column(DateTime, default=datetime.utcnow)


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    server_id = Column(String, ForeignKey("servers.id"), nullable=True)
    severity = Column(SAEnum(AlertSeverity), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(String(500))
    source = Column(String(100))
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

    server = relationship("Server", back_populates="alerts")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

# ---------- Pydantic Schemas ----------

from pydantic import BaseModel, Field
from typing import List, Optional

class ServerBase(BaseModel):
    name: str = Field(..., max_length=100)
    ip_address: str = Field(..., max_length=45)
    server_type: ServerType
    os: Optional[str] = None
    location: Optional[str] = None
    cores: Optional[int] = None
    ram_total_gb: Optional[int] = None
    ssh_user: Optional[str] = None
    ssh_port: int = 22

class ServerCreate(ServerBase):
    pass

class ServerUpdate(BaseModel):
    name: Optional[str] = None
    ip_address: Optional[str] = None
    server_type: Optional[ServerType] = None
    os: Optional[str] = None
    status: Optional[ServerStatus] = None
    location: Optional[str] = None
    cores: Optional[int] = None
    ram_total_gb: Optional[int] = None
    ssh_user: Optional[str] = None
    ssh_port: Optional[int] = None

class Server(ServerBase):
    id: str
    status: ServerStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ServerMetricBase(BaseModel):
    cpu_percent: Optional[float] = None
    memory_percent: Optional[float] = None
    disk_percent: Optional[float] = None
    network_in_bytes: Optional[float] = None
    network_out_bytes: Optional[float] = None

class ServerMetricCreate(ServerMetricBase):
    server_id: str

class ServerMetric(ServerMetricBase):
    id: int
    server_id: str
    timestamp: datetime

    class Config:
        from_attributes = True

class AlertBase(BaseModel):
    severity: AlertSeverity
    title: str = Field(..., max_length=200)
    description: Optional[str] = None
    source: Optional[str] = None

class AlertCreate(AlertBase):
    server_id: Optional[str] = None

class Alert(AlertBase):
    id: int
    server_id: Optional[str] = None
    status: str
    created_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class DatabaseInstanceBase(BaseModel):
    name: str
    db_type: DatabaseType
    version: Optional[str] = None
    host: str
    port: int
    username: Optional[str] = None

class DatabaseInstanceCreate(DatabaseInstanceBase):
    pass

class DatabaseInstance(DatabaseInstanceBase):
    id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
    name = Column(String(100), nullable=False, unique=True)
    ip_address = Column(String(45), nullable=False)
    server_type = Column(SAEnum(ServerType), nullable=False)
    os = Column(String(100))
    status = Column(SAEnum(ServerStatus), default=ServerStatus.OFFLINE)
    location = Column(String(100))
    cores = Column(Integer)
    ram_total_gb = Column(Integer)
    ssh_user = Column(String(50))
    ssh_port = Column(Integer, default=22)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    metrics = relationship("ServerMetric", back_populates="server")
    alerts = relationship("Alert", back_populates="server")


class ServerMetric(Base):
    __tablename__ = "server_metrics"

    id = Column(Integer, primary_key=True, autoincrement=True)
    server_id = Column(String, ForeignKey("servers.id"), nullable=False)
    cpu_percent = Column(Float)
    memory_percent = Column(Float)
    disk_percent = Column(Float)
    network_in_bytes = Column(Float)
    network_out_bytes = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)

    server = relationship("Server", back_populates="metrics")


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    server_id = Column(String, ForeignKey("servers.id"), nullable=True)
    severity = Column(SAEnum(AlertSeverity), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(String(500))
    source = Column(String(100))
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    resolved_at = Column(DateTime, nullable=True)

    server = relationship("Server", back_populates="alerts")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="viewer")  # admin, operator, viewer
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
"""

# ---------- Pydantic Schemas ----------

from pydantic import BaseModel, Field

class ServerCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    ip_address: str
    server_type: ServerType
    os: Optional[str] = None
    location: Optional[str] = None
    cores: Optional[int] = None
    ram_total_gb: Optional[int] = None
    ssh_user: Optional[str] = "root"
    ssh_port: Optional[int] = 22

class ServerResponse(BaseModel):
    id: str
    name: str
    ip_address: str
    server_type: ServerType
    os: Optional[str]
    status: ServerStatus
    location: Optional[str]
    cores: Optional[int]
    ram_total_gb: Optional[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class MetricResponse(BaseModel):
    server_id: str
    cpu_percent: float
    memory_percent: float
    disk_percent: float
    network_in_bytes: float
    network_out_bytes: float
    timestamp: datetime

class AlertCreate(BaseModel):
    server_id: Optional[str] = None
    severity: AlertSeverity
    title: str
    description: Optional[str] = None
    source: Optional[str] = None

class AlertResponse(BaseModel):
    id: int
    server_id: Optional[str]
    severity: AlertSeverity
    title: str
    description: Optional[str]
    source: Optional[str]
    status: str
    created_at: datetime
    resolved_at: Optional[datetime]

    class Config:
        from_attributes = True
