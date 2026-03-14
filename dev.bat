@echo off
REM RAXUS Development Runner for Windows
REM Starts both frontend and backend servers

echo 🚀 Starting RAXUS Development Environment
echo ==============================================

REM Check if Python and Node.js are available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+
    pause
    exit /b 1
)

node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+
    pause
    exit /b 1
)

REM Start backend in background
echo 📡 Starting FastAPI backend...
cd scripts\backend
start "RAXUS Backend" cmd /c "python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000"

REM Go back to root
cd ..\..

REM Start frontend
echo 🖥️  Starting Next.js frontend...
start "RAXUS Frontend" cmd /c "npm run dev"

echo.
echo ✅ Development servers started!
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:8000
echo    API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause >nul