@echo off
title Green Route Planner - Frontend (React + Vite)
echo ===================================================
echo Starting Green Route Planner - React Vite Frontend
echo Local URL: http://localhost:5173
echo ===================================================
set PATH=C:\Program Files\nodejs;C:\Users\User\maven\apache-maven-3.9.9\bin;%PATH%
cd /d "%~dp0frontend"
npm.cmd run dev
pause
