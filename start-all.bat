@echo off
title Green Route Planner - Launch All
echo ===================================================
echo Launching Green Route Planner Full-Stack System
echo 1. Starting Spring Boot Backend on http://localhost:8080
echo 2. Starting Vite React Frontend on http://localhost:5173
echo ===================================================
start "Green Route Backend" cmd /k "%~dp0start-backend.bat"
timeout /t 5 /nobreak >nul
start "Green Route Frontend" cmd /k "%~dp0start-frontend.bat"
timeout /t 3 /nobreak >nul
start http://localhost:5173
echo Applications launched!
