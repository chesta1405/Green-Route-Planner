@echo off
title Green Route Planner - Backend (Spring Boot)
echo ===================================================
echo Starting Green Route Planner - Spring Boot Backend
echo Server port: 8080
echo Database: PostgreSQL (or in-memory H2 demo fallback)
echo ===================================================
set PATH=C:\Program Files\nodejs;C:\Users\User\maven\apache-maven-3.9.9\bin;%PATH%
cd /d "%~dp0backend"
if exist "target\green-route-planner-1.0.0.jar" (
    java -jar target\green-route-planner-1.0.0.jar
) else (
    mvn spring-boot:run
)
pause
