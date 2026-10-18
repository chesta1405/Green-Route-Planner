-- ==============================================================================
-- PostgreSQL Database Initialization Script for Green Route Planner
-- Run in psql or pgAdmin:
-- ==============================================================================

-- 1. Create the database
CREATE DATABASE greenroutedb
    WITH 
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\c greenroutedb;

-- 2. Execute the table creation schema (schema.sql will also be automatically applied by Hibernate / JPA)
-- See database/schema.sql for the complete DDL table structures and initial seed data.
