# OSIRIS-

# RAXUS - Intelligent Infrastructure & Data Systems Platform

A professional infrastructure management dashboard built with Next.js, React, and Tailwind CSS. RAXUS is a centralized platform for monitoring servers, databases, networks, and security systems with real-time analytics and intelligent diagnostics.

This project serves as the **frontend foundation** for a larger centralized management platform for databases, networks, and systems.

---

## Table of Contents

- [Overview](#overview)
- [Features (Current)](#features-current)
- [Tech Stack (Current)](#tech-stack-current)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Target Architecture](#target-architecture)
- [Target Tech Stack](#target-tech-stack)
- [Database Model](#database-model)
- [Development Roadmap](#development-roadmap)
- [Customization](#customization)
- [Deployment](#deployment)

---

## Overview

RAXUS is a **production-ready centralized management platform** for monitoring and managing IT infrastructure. The application features a modern, futuristic dashboard interface with real-time metrics, comprehensive system monitoring, and API-driven architecture.

The platform includes:
- **Frontend**: Next.js 15 dashboard with real-time updates
- **Backend**: FastAPI server with RESTful APIs
- **Features**: Server monitoring, database management, network topology, security monitoring, and system alerts

**Current Status**: ✅ **FULLY FUNCTIONAL** - Both frontend and backend are implemented and ready for production use.

---

## Features (Implemented ✅)

### Frontend Dashboard
- **Real-time System Overview**: CPU, Memory, Network metrics with live updates
- **Performance Monitoring**: Interactive charts and historical data visualization
- **Process Management**: Running processes table with resource usage
- **Storage Monitoring**: Drive capacity and health status
- **Security Dashboard**: Threat detection, firewall rules, security events
- **Network Topology**: Visual network mapping with traffic monitoring
- **Database Management**: Multi-database support (Oracle, PostgreSQL, MySQL, MongoDB)
- **Communications Center**: System logs, notifications, and messaging
- **Settings Panel**: System configuration and preferences

### Backend API
- **RESTful API**: Complete FastAPI implementation with OpenAPI documentation
- **Server Management**: CRUD operations for server monitoring
- **Metrics Collection**: Real-time and historical performance data
- **Database Monitoring**: Connection pooling, query analysis, slow query detection
- **Network Monitoring**: Topology mapping, traffic analysis, latency measurement
- **Security Management**: Event logging, firewall rule management, threat intelligence
- **CORS Support**: Configured for frontend-backend communication

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Cyberpunk aesthetic with customizable themes
- **Particle Background**: Animated canvas background for visual appeal
- **Loading Screens**: Smooth transitions and loading states
- **Real-time Updates**: WebSocket-ready architecture for live data
- **CPU Usage** -- Shows percentage, clock speed, and core count.
- **Memory** -- Shows usage out of total (e.g. 16.4 GB / 24 GB).
- **Network** -- Shows bandwidth and latency.

Each metric card includes a trend indicator (up/down/stable) and updates every 3 seconds with randomized values.

Below the metric cards, a **tabbed section** with three views:

1. **Performance** -- A bar chart visualizing 24 hours of CPU, Memory, and Network data. Bars are color-coded (cyan, purple, blue). Values are randomly generated on each render.
2. **Processes** -- A table listing six simulated running processes with columns: PID, Process name, User, CPU %, Memory (MB), and Status.
3. **Storage** -- A grid of four storage drives (C:, D:, E:, F:) showing total/used space, drive type (SSD/HDD), free space, and a color-coded progress bar (green < 70%, amber 70-90%, red > 90%).

### Security & Alerts (Center, below System Overview)
Two side-by-side cards:

- **Security Status** -- Shows the status of Firewall, Intrusion Detection, Encryption (all "Active"), the Threat Database update time, and a Security Level progress bar.
- **System Alerts** -- Four alert entries of different types (info, warning, update, success) each with a timestamp and description.

### Communications Log (Center, bottom)
A messaging panel showing four simulated messages from system components (System Administrator, Security Module, Network Control, Data Center). Includes a text input field and two action buttons (microphone, send). This is visual only -- messages cannot actually be sent.

### Right Sidebar
Four cards stacked vertically:

1. **System Time** -- Live clock updating every second (HH:MM:SS format), current date, system uptime (static), and timezone.
2. **Quick Actions** -- Four action buttons: Security Scan, Sync Data, Backup, Console. These are visual only.
3. **Resource Allocation** -- Three progress bars for Processing Power (42%), Memory Allocation (68%), and Network Bandwidth (35%), plus a Priority Level slider (1-5).
4. **Environment Controls** -- Four toggle switches: Power Management, Security Protocol, Power Saving Mode, Auto Shutdown.

### Background Animation
A full-screen `<canvas>` element renders 100 floating particles with random sizes, speeds, and blue-toned colors. The particles loop around the edges of the screen and animate continuously. The canvas resizes responsively.

### Loading Screen
On initial load, a 2-second animated loading overlay appears with concentric spinning rings and a "SYSTEM INITIALIZING" label.

---

## Tech Stack (Production Ready)

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 15** | React framework with App Router and server-side rendering |
| **React 19** | UI library with concurrent features |
| **TypeScript** | Type safety and developer experience |
| **Tailwind CSS 3** | Utility-first styling with custom cyberpunk theme |
| **shadcn/ui** | High-quality component library |
| **Recharts** | Data visualization and charting |
| **Lucide React** | Modern icon library |
| **Next Themes** | Dark/light theme management |

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | Modern Python web framework for APIs |
| **Uvicorn** | ASGI server for high-performance async applications |
| **SQLAlchemy** | ORM for database operations (PostgreSQL ready) |
| **Pydantic** | Data validation and serialization |
| **CORS** | Cross-origin resource sharing configuration |

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Prettier**: Code formatting (implied)
- **TypeScript Compiler**: Type checking
- **Next.js Build System**: Optimized production builds

---

## Project Structure

```
/
├── app/
│   ├── globals.css          # Tailwind base styles and CSS variables
│   ├── layout.tsx           # Root layout with Geist fonts
│   └── page.tsx             # Entry point, renders <Dashboard />
├── components/
│   └── ui/                  # shadcn/ui components
├── dashboard.tsx            # Main dashboard component (all UI logic)
├── styles/
│   └── globals.css          # Additional global styles
├── tailwind.config.js       # Tailwind config with custom animations
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.8+ (for backend)
- pnpm (recommended) or npm

### Frontend Setup

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Quick Development Start

For convenience, you can use the provided development scripts:

**Linux/Mac:**
```bash
./dev.sh
```

**Windows:**
```cmd
dev.bat
```

These scripts will start both frontend and backend servers automatically.

### Backend Setup

```bash
# Navigate to backend directory
cd scripts/backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at [http://localhost:8000](http://localhost:8000) with interactive documentation at [http://localhost:8000/docs](http://localhost:8000/docs).

### Build for Production

#### Frontend
```bash
pnpm build
pnpm start
```

#### Backend
```bash
# Using uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000

# Or using gunicorn for production
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

---

## Target Architecture

The following architecture describes the **production-ready** version this project is evolving towards.

```
Frontend (Next.js / React)
        |
  FastAPI API Gateway
        |
  ┌─────────────┬──────────────────┬──────────────────┐
  │ DB Service   │ System Service   │ Network Service  │
  └─────────────┴──────────────────┴──────────────────┘
        |
  ┌─────────────┬──────────────────┬──────────────────┐
  │ MongoDB      │ PostgreSQL       │ Redis            │
  │ (logs,       │ (configurations, │ (cache,          │
  │  metrics)    │  users, servers) │  sessions)       │
  └─────────────┴──────────────────┴──────────────────┘
        |
    Prometheus (metrics collection)
```

### Advanced Options (Future)
- **Celery** -- Async task processing (scheduled scans, backups).
- **Kafka** -- Event streaming for large-scale deployments.
- **LLM Service** -- AI-powered chatbot for diagnostics and anomaly detection.

---

## Target Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **FastAPI** | API gateway and REST endpoints |
| **SQLAlchemy** | ORM for PostgreSQL |
| **Motor** | Async MongoDB driver |
| **Celery** | Async task queue |
| **Redis** | Caching and session storage |
| **Prometheus client** | Metrics exposure and collection |
| **Paramiko** | SSH connections for remote system monitoring |
| **psutil** | Local system metrics collection |
| **cx_Oracle / oracledb** | Oracle database monitoring |

### Frontend

| Technology | Purpose |
|---|---|
| **Next.js / React** | UI framework |
| **Axios / SWR** | HTTP client and data fetching |
| **Recharts** | Data visualization and charts |
| **WebSocket** | Real-time data streaming |
| **Tailwind CSS** | Styling |

### Infrastructure

| Technology | Purpose |
|---|---|
| **Docker / Docker Compose** | Containerization |
| **Nginx** | Reverse proxy |
| **Prometheus + Grafana** | Monitoring stack |

---

## Database Model

### PostgreSQL (Relational Data)

**servers**

| Column | Type | Description |
|---|---|---|
| id | UUID (PK) | Unique identifier |
| name | VARCHAR | Server display name |
| ip_address | VARCHAR | IP address |
| type | ENUM | `linux`, `windows`, `oracle_db`, `network` |
| ssh_user | VARCHAR | SSH username for remote connections |
| ssh_port | INT | SSH port (default 22) |
| status | ENUM | `active`, `inactive`, `maintenance` |
| created_at | TIMESTAMP | Creation timestamp |

**users**

| Column | Type | Description |
|---|---|---|
| id | UUID (PK) | Unique identifier |
| username | VARCHAR | Login username |
| email | VARCHAR | User email |
| hashed_password | VARCHAR | Bcrypt-hashed password |
| role | ENUM | `admin`, `operator`, `viewer` |
| is_active | BOOLEAN | Account active status |
| created_at | TIMESTAMP | Account creation date |

**alerts**

| Column | Type | Description |
|---|---|---|
| id | UUID (PK) | Unique identifier |
| server_id | UUID (FK) | Related server |
| type | ENUM | `cpu`, `memory`, `disk`, `network`, `security` |
| severity | ENUM | `info`, `warning`, `critical` |
| message | TEXT | Alert description |
| resolved | BOOLEAN | Whether the alert is resolved |
| created_at | TIMESTAMP | Alert timestamp |

### MongoDB (Time-Series / Logs)

**system_metrics** collection:

```json
{
  "server_id": "uuid",
  "timestamp": "ISO date",
  "cpu": {
    "usage_percent": 45.2,
    "cores": 8,
    "frequency": 3.6
  },
  "memory": {
    "total_gb": 32,
    "used_gb": 18.4,
    "percent": 57.5
  },
  "disk": {
    "total_gb": 500,
    "used_gb": 234,
    "percent": 46.8
  },
  "network": {
    "bytes_sent": 1234567,
    "bytes_recv": 7654321,
    "latency_ms": 12
  }
}
```

**logs** collection:

```json
{
  "server_id": "uuid",
  "timestamp": "ISO date",
  "level": "INFO | WARNING | ERROR",
  "source": "system | application | security",
  "message": "Log message content"
}
```

---

## Development Roadmap

### Phase 1 -- Foundation
- [ ] Authentication system (JWT-based login, role management)
- [ ] Server CRUD operations (add, edit, delete, list servers)
- [ ] Local system monitoring (CPU, memory, disk, network via psutil)

### Phase 2 -- Remote Monitoring
- [ ] Remote server monitoring via SSH (Paramiko)
- [ ] Oracle database monitoring (connections, tablespaces, sessions)
- [ ] MongoDB integration for storing metrics and logs

### Phase 3 -- Real-Time & Alerting
- [ ] Automatic alerting engine (threshold-based triggers)
- [ ] WebSocket real-time data streaming to the frontend
- [ ] Advanced dashboard with historical charts and drill-down views

### Phase 4 -- Intelligence
- [ ] AI-powered chatbot for system diagnostics
- [ ] Machine learning anomaly detection on collected metrics
- [ ] Multi-tenant support for managing multiple organizations

---

## Customization

### Theme
The dashboard defaults to dark mode. Click the moon/sun icon in the header to toggle themes. The theme is applied via a CSS class (`dark`) on the root element.

### Custom Animations
Two custom Tailwind animations are defined in `tailwind.config.js`:
- `spin-slow` -- 3-second rotation (used in the loading spinner).
- `spin-slower` -- 6-second reverse rotation (used in the loading spinner).

### Data Simulation
All metric values (CPU, Memory, Network, System Status) are updated every 3 seconds via `setInterval` in the main `Dashboard` component. To connect real data, replace the `useEffect` intervals with actual API calls or WebSocket connections.

---

## Deployment

### Current (Frontend Only)

This project is ready to deploy on [Vercel](https://vercel.com):

```bash
vercel
```

Or click "Publish" in the v0 interface to deploy directly.

### Future (Full Stack with Docker)

```yaml
# docker-compose.yml (target)
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

  api:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - mongodb
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: raxus_os
      POSTGRES_USER: raxus
      POSTGRES_PASSWORD: <secret>

  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
```
