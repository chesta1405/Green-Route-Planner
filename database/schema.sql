-- ==============================================================================
-- Green Route Planner - Database Schema (PostgreSQL)
-- Supports UN Sustainable Development Goal 13: Climate Action
-- ==============================================================================

-- Drop tables if needed during fresh install
DROP TABLE IF EXISTS route_history CASCADE;
DROP TABLE IF EXISTS emission_factors CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Users table (Supports guest / demo sessions and registered accounts)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Configurable Emission Factors table (g CO2 per passenger-kilometer)
CREATE TABLE emission_factors (
    id BIGSERIAL PRIMARY KEY,
    travel_mode VARCHAR(50) NOT NULL UNIQUE,
    vehicle_type VARCHAR(100) NOT NULL,
    factor_g_per_km NUMERIC(8, 2) NOT NULL,
    default_occupancy NUMERIC(4, 2) DEFAULT 1.0,
    source_reference VARCHAR(255),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Route History / Journeys table
CREATE TABLE route_history (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(100),
    source_name VARCHAR(255) NOT NULL,
    source_lat NUMERIC(10, 7) NOT NULL,
    source_lng NUMERIC(10, 7) NOT NULL,
    destination_name VARCHAR(255) NOT NULL,
    destination_lat NUMERIC(10, 7) NOT NULL,
    destination_lng NUMERIC(10, 7) NOT NULL,
    travel_mode VARCHAR(50) NOT NULL,
    route_preference VARCHAR(50) NOT NULL,
    distance_km NUMERIC(10, 2) NOT NULL,
    duration_minutes NUMERIC(10, 1) NOT NULL,
    co2_kg NUMERIC(10, 3) NOT NULL,
    eco_score INT NOT NULL CHECK (eco_score BETWEEN 0 AND 100),
    co2_saved_kg NUMERIC(10, 3) DEFAULT 0.0,
    route_geometry TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_route_history_user_id ON route_history(user_id);
CREATE INDEX idx_route_history_session_id ON route_history(session_id);
CREATE INDEX idx_route_history_created_at ON route_history(created_at DESC);
CREATE INDEX idx_route_history_travel_mode ON route_history(travel_mode);

-- Seed initial emission factors (based on European Environment Agency & DEFRA standards)
INSERT INTO emission_factors (travel_mode, vehicle_type, factor_g_per_km, default_occupancy, source_reference) VALUES
('CAR_PETROL', 'Standard Petrol Passenger Car', 171.00, 1.2, 'DEFRA / EEA 2024 Greenhouse Gas Reporting'),
('CAR_DIESEL', 'Standard Diesel Passenger Car', 171.00, 1.2, 'DEFRA / EEA 2024 Greenhouse Gas Reporting'),
('CAR_HYBRID', 'Hybrid Electric Car', 103.00, 1.2, 'EEA Standard Fleet Averages'),
('EV', 'Battery Electric Vehicle (Grid Mix)', 47.00, 1.2, 'Global Grid Average Life Cycle Analysis'),
('PUBLIC_TRANSIT', 'Urban Bus & Light Rail Average', 68.00, 1.0, 'Per-Passenger Average Transport Footprint'),
('BICYCLE', 'Human Powered Bicycle / E-Bike', 0.00, 1.0, 'Zero Direct Emissions (Human kinetic energy)'),
('WALKING', 'Pedestrian Walking', 0.00, 1.0, 'Zero Direct Emissions');

-- Seed demo user
INSERT INTO users (username, email, password_hash, role) VALUES
('demo_user', 'demo@greenroute.org', '$2a$12$e8Y1QxQfGf8oE...demo', 'DEMO');

-- Seed demo initial route history for dashboard demonstration
INSERT INTO route_history (session_id, source_name, source_lat, source_lng, destination_name, destination_lat, destination_lng, travel_mode, route_preference, distance_km, duration_minutes, co2_kg, eco_score, co2_saved_kg, created_at) VALUES
('demo-session', 'Central Railway Station', 12.9784, 77.5684, 'Eco Tech Park', 12.9352, 77.6245, 'EV', 'ECO_FRIENDLY', 14.2, 32.0, 0.67, 92, 1.76, CURRENT_TIMESTAMP - INTERVAL '3 days'),
('demo-session', 'Greenwood Library', 12.9716, 77.5946, 'Botanical Gardens', 12.9507, 77.5848, 'BICYCLE', 'SHORTEST', 3.8, 15.0, 0.00, 100, 0.65, CURRENT_TIMESTAMP - INTERVAL '2 days'),
('demo-session', 'University Campus', 12.9345, 77.6101, 'City Civic Center', 12.9719, 77.6412, 'PUBLIC_TRANSIT', 'FASTEST', 8.5, 26.0, 0.58, 85, 0.87, CURRENT_TIMESTAMP - INTERVAL '1 day'),
('demo-session', 'Downtown Market', 12.9698, 77.5982, 'Renewable Energy Hub', 12.9123, 77.6432, 'CAR_PETROL', 'FASTEST', 11.4, 28.0, 1.95, 45, 0.00, CURRENT_TIMESTAMP - INTERVAL '12 hours'),
('demo-session', 'Metro Central', 12.9750, 77.5700, 'Green Lake Park', 12.9600, 77.5800, 'WALKING', 'ECO_FRIENDLY', 2.1, 28.0, 0.00, 100, 0.36, CURRENT_TIMESTAMP - INTERVAL '2 hours');
