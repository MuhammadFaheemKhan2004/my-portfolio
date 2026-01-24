@echo off
REM MERN Portfolio Setup Script for Windows

echo.
echo ===================================
echo MERN Portfolio Setup
echo ===================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed. Please install Node.js from https://nodejs.org/
    exit /b 1
)

echo Node.js found: 
node --version
echo.

REM Install root dependencies
echo Installing root dependencies...
call npm install

REM Install frontend dependencies
echo.
echo Installing frontend dependencies...
cd client
call npm install
cd ..

REM Install backend dependencies
echo.
echo Installing backend dependencies...
cd server
call npm install
cd ..

echo.
echo ===================================
echo Setup Complete!
echo ===================================
echo.
echo Next steps:
echo 1. Configure MongoDB connection in server/.env
echo 2. Set Gmail credentials in server/.env
echo 3. Run: npm run dev
echo.
echo See QUICKSTART.md for detailed instructions.
echo.
