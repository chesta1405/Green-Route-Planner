# Green Route Planner 🌿

> **Eco-Friendly Multi-Modal Navigation & Carbon Footprint Analysis System**  
> Aligned with **UN Sustainable Development Goal 13: Climate Action**  
> *A Modern Full-Stack College Mini-Project*

---

## 📖 1. Project Overview

**Green Route Planner** is an eco-friendly navigation web application that empowers commuters and urban travelers to make environmentally responsible transportation decisions. While legacy navigation systems focus solely on minimizing travel duration or distance, Green Route Planner compares:

- **Geometric & Topological Road Distance** (km)
- **Estimated Travel Duration** (minutes)
- **Estimated CO₂ Greenhouse Gas Emissions** (kg CO₂e)
- **Standardized Eco-Score** (0 to 100)
- **Carbon Offsets & Savings** compared to a conventional Internal Combustion Engine (ICE) baseline
- **Multi-Modal Options**: Electric Vehicles (EV), Public Transit (Bus/Metro), Bicycle, and Pedestrian Walking
- **Nearby Public EV Charging Stations** with real-time connector and power specifications
- **Weather-Aware Travel Advisories**

---

## 🛠️ 2. Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Lucide React Icons |
| **Maps & Visualization** | Leaflet, React-Leaflet, OpenStreetMap tiles, Recharts (Carbon charts) |
| **Backend** | Java 17/24, Spring Boot 3.3.4, Spring Web, Spring Data JPA, Hibernate, Bean Validation |
| **Database** | PostgreSQL with automated Hibernate DDL schema, plus zero-config embedded H2 fallback for standalone demo mode |
| **Algorithms** | **A\* Search Algorithm** (Eco-weighted heuristic) & **Dijkstra's Algorithm** (Shortest path) |
| **Geospatial & APIs** | OpenStreetMap OSRM Routing Engine, Nominatim Geocoding, Overpass API (EV stations), OpenWeather API |

---

## 🏛️ 3. System Architecture & Project Structure

```
mini project/
├── backend/                               # Spring Boot 3 Application
│   ├── pom.xml                            # Maven dependencies & build configuration
│   └── src/
│       ├── main/
│       │   ├── java/com/greenroute/
│       │   │   ├── GreenRoutePlannerApplication.java
│       │   │   ├── config/                # CorsConfig, EmissionConfig
│       │   │   ├── controller/            # Health, Route, Emission, Station, Weather, History, Dashboard
│       │   │   ├── dto/                   # Structured request/response Data Transfer Objects
│       │   │   ├── exception/             # GlobalExceptionHandler
│       │   │   ├── model/                 # RouteHistory & EmissionFactor JPA entities
│       │   │   ├── repository/            # RouteHistoryRepository & custom JPQL queries
│       │   │   └── service/               # RoutingService, DijkstraRouterService, EmissionService,
│       │   │                              # ChargingStationService, WeatherService, RouteHistoryService
│       │   └── resources/
│       │       └── application.properties # Server, database, emission factors & API configurations
│       └── test/java/com/greenroute/      # EmissionServiceTest & DijkstraRouterTest (JUnit 5)
├── frontend/                              # React + Vite Application
│   ├── package.json                       # React 18, Leaflet, Recharts, Tailwind CSS
│   ├── vite.config.js                     # Proxy configurations for /api -> localhost:8080
│   ├── tailwind.config.js                 # Customized forest green and emerald color palette
│   ├── index.html                         # Leaflet CSS, Google Fonts
│   └── src/
│       ├── main.jsx                       # React root entry point
│       ├── App.jsx                        # React Router layout (Navbar, Footer, Routes)
│       ├── index.css                      # Tailwind base directives & Leaflet styling
│       ├── components/                    # Modular UI components:
│       │   ├── Navbar.jsx                 # Responsive header with SDG 13 badge & navigation links
│       │   ├── Footer.jsx                 # Footer with architecture and methodology notes
│       │   ├── RouteSearchForm.jsx        # Origin/destination inputs with Nominatim autocomplete & GPS
│       │   ├── TravelModeSelector.jsx     # EV, Public Transit, Bicycle, Walking, Car selection
│       │   ├── MapView.jsx                # Interactive Leaflet map with custom SVG markers & polylines
│       │   ├── RouteCard.jsx              # Alternative comparison cards (Distance, Time, CO2, Eco-Score)
│       │   ├── RouteComparisonChart.jsx   # Multi-route Recharts bar graph
│       │   ├── EmissionsSummary.jsx       # Documented formula & assumptions breakdown
│       │   ├── EcoScoreBadge.jsx          # Color-coded badge (0–100)
│       │   ├── ChargingStationCard.jsx    # EV station card with power, connectors, and directions
│       │   ├── WeatherCard.jsx            # Current weather & travel notice
│       │   ├── DashboardStatCard.jsx      # KPI metrics cards
│       │   ├── LoadingState.jsx           # Animated green route spinner
│       │   └── ErrorMessage.jsx           # Friendly error alerts
│       ├── pages/                         # Core application pages:
│       │   ├── Home.jsx                   # Hero, SDG 13, How it works, Sustainability stats
│       │   ├── RoutePlanner.jsx           # Main feature: 2-column interactive planning & map
│       │   ├── StationExplorer.jsx        # EV charging station discovery via Overpass API
│       │   ├── PublicTransit.jsx          # Commuter savings calculator & sustainable tips
│       │   ├── Dashboard.jsx              # Route history log, delete option, emissions trend
│       │   └── About.jsx                  # College mini-project technical report & algorithm review
│       └── services/
│           └── api.js                     # Centralized API client with offline/graceful fallbacks
├── database/
│   ├── schema.sql                         # PostgreSQL DDL table definitions & seed data
│   └── setup-postgres.sql                 # Database creation script
├── .env.example                           # Configuration environment variable template
├── start-all.bat                          # One-click Windows launcher for both backend & frontend
├── start-backend.bat                      # One-click Spring Boot launcher
├── start-frontend.bat                     # One-click React Vite launcher
└── README.md                              # Complete setup & project documentation
```

---

## 🚀 4. Installation & Local Execution

### Prerequisites
- **Java Development Kit (JDK 17 or higher)**
- **Node.js (v18 or higher)**
- **Apache Maven (3.8+)** *(Or use the pre-packaged binary in `C:\Users\User\maven`)*
- **PostgreSQL (Optional)** *(The application automatically falls back to an embedded in-memory H2 database if PostgreSQL is not active, allowing instant demonstration out of the box!)*

---

### Option A: One-Click Launch (Recommended for Windows)

Simply double-click:
```bat
start-all.bat
```
This batch file:
1. Launches the Spring Boot backend on `http://localhost:8080`.
2. Launches the React Vite frontend on `http://localhost:5173`.
3. Automatically opens your default web browser to the homepage!

---

### Option B: Manual Execution

#### 1. Start the Backend
Open a terminal in `mini project/backend`:
```powershell
# Using Maven
mvn spring-boot:run

# Or run the pre-built standalone executable JAR
java -jar target/green-route-planner-1.0.0.jar
```
*The backend starts at `http://localhost:8080`.*

#### 2. Start the Frontend
Open a second terminal in `mini project/frontend`:
```powershell
npm install
npm run dev
```
*The frontend starts at `http://localhost:5173`.*

---

## 🗄️ 5. PostgreSQL Database Configuration

### 1. Create the Database
In PostgreSQL (`psql` or pgAdmin):
```sql
CREATE DATABASE greenroutedb;
```

### 2. Connect the Backend
Set the environment variables before starting the backend, or edit `backend/src/main/resources/application.properties`:
```properties
DB_URL=jdbc:postgresql://localhost:5432/greenroutedb
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DRIVER=org.postgresql.Driver
JPA_DIALECT=org.hibernate.dialect.PostgreSQLDialect
```

### 3. Apply Schema
Run `database/schema.sql` in PostgreSQL, or let Hibernate's `ddl-auto=update` automatically create the tables and indexes upon backend launch.

> **Zero-Config Demo Mode:** If PostgreSQL is not configured, the application automatically activates embedded H2 in-memory storage with pre-seeded demo journeys. You can inspect the H2 database console at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:greenroutedb`).

---

## 📡 6. REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint returning application status and SDG 13 metadata |
| `POST` | `/api/routes/plan` | Calculate and compare multi-corridor route alternatives (OSRM + Dijkstra/A*) |
| `POST` | `/api/emissions/calculate` | Compute carbon emissions, savings, and eco-score for a given distance and mode |
| `GET` | `/api/emissions/factors` | Retrieve all configurable emission factors (g CO₂/km) |
| `GET` | `/api/stations/nearby` | Retrieve nearby EV charging stations (lat, lng, radius) via Overpass API |
| `GET` | `/api/weather` | Retrieve current weather conditions and weather-aware travel notices |
| `GET` | `/api/history` | Retrieve recorded route history for a session |
| `POST` | `/api/history` | Save a completed journey into the database |
| `DELETE` | `/api/history/{id}` | Delete a route history record |
| `GET` | `/api/dashboard/summary` | Retrieve aggregated dashboard statistics (trips, distance, CO₂ saved, trend) |

### Sample Route Plan Request (`POST /api/routes/plan`):
```json
{
  "sourceName": "Central Railway Station, Bangalore",
  "sourceLat": 12.9784,
  "sourceLng": 77.5684,
  "destinationName": "Eco Tech Park, Bangalore",
  "destinationLat": 12.9352,
  "destinationLng": 77.6245,
  "travelMode": "EV",
  "routePreference": "ECO_FRIENDLY",
  "vehicleOccupancy": 1
}
```

---

## 🧮 7. Environmental Impact Calculation & Methodology

Emissions are estimated using European Environment Agency (EEA) and UK Department for Environment, Food & Rural Affairs (DEFRA) 2024 Greenhouse Gas Conversion Standards:

$$\text{Estimated CO}_2\text{ (kg)} = \frac{\text{Distance (km)} \times \text{Emission Factor (g/km)}}{1000 \times \text{Occupancy}}$$

### Standard Emission Factors Configured:
- **Bicycle / E-Bike:** `0.0 g CO₂/km` (Zero direct operational emissions)
- **Pedestrian Walking:** `0.0 g CO₂/km` (Zero direct exhaust)
- **Electric Vehicle (EV):** `47.0 g CO₂/km` (Average grid lifecycle generation mix)
- **Public Transit (Bus / Metro):** `68.0 g CO₂/passenger-km` (Shared occupancy standard)
- **Hybrid Passenger Car:** `103.0 g CO₂/km`
- **Standard ICE Petrol / Diesel Car:** `171.0 g CO₂/km` (Baseline benchmark vehicle)

### Eco-Score Formulation (0 to 100):
The eco-score normalizes route impact against standard petrol passenger car emissions:

$$\text{Eco-Score} = \text{clamp}\left(0, 100, \text{round}\left[\left(1.0 - \frac{\text{Emissions}}{\text{Baseline Emissions}}\right) \times 100\right]\right)$$

- Walking / Cycling: **100/100** (SDG 13 Champion)
- Electric Vehicle: **85–92/100** (Ultra Green)
- Public Transit: **70–80/100** (Low Carbon)
- Standard Solo ICE: **35–45/100** (Baseline Impact)

---

## 🧠 8. Algorithmic Pathfinding: Dijkstra & A*

Located in `backend/src/main/java/com/greenroute/service/DijkstraRouterService.java`:

1. **Dijkstra's Algorithm (Shortest Route):**
   - Utilizes a min-priority queue over a weighted corridor mesh.
   - Evaluates node distances strictly by cumulative physical distance $g(n) = \sum \text{dist}(u, v)$.
   - Guarantees the absolute shortest physical road distance.

2. **A\* Search Algorithm (Eco-Friendly Route):**
   - Implements evaluation function $f(n) = g(n) + h(n)$.
   - Edge cost incorporates environmental road penalties (higher penalties for idling, congestion, and elevated vehicle friction):
     $$\text{cost}(u, v) = \text{dist}(u, v) \times \text{ecoPenaltyFactor}$$
   - Heuristic $h(n)$ utilizes the admissible Great-Circle Haversine distance between node $n$ and the destination, guaranteeing optimal exploration of green bypass corridors.

---

## 🧪 9. Unit & Integration Testing

The project includes JUnit 5 tests covering emission calculations and graph pathfinding:

```powershell
cd backend
mvn test
```
**Test Results:**
- `EmissionServiceTest`: Validates petrol emissions, zero-emission active travel, and EV carbon offset savings.
- `DijkstraRouterTest`: Verifies the execution of Dijkstra's algorithm and A* eco-heuristic route generation.
- **5 of 5 tests passing (100% success rate).**

Frontend build verification:
```powershell
cd frontend
npm run build
```
- **Vite production bundle compiled with 0 errors.**

---

## 🌐 10. External Services & API Key Configuration

- **OpenStreetMap Nominatim:** Free, public geocoding and address autocomplete (no API key required).
- **OSRM Routing API:** Free, open road network geometry and routing (no API key required).
- **Overpass API:** Free OpenStreetMap infrastructure queries for EV charging stations (no API key required).
- **OpenWeather API (Optional):** If you provide an `OPENWEATHER_API_KEY` in `application.properties` or environment variables, the backend fetches live meteorological reports. If omitted, the backend automatically provides realistic environmental weather simulation so the application works seamlessly without requiring third-party subscriptions.

---

## 🎓 11. College Mini-Project Demonstration Notes

When presenting to evaluators or professors:
1. **Highlight SDG 13 Alignment:** Emphasize how the application directly addresses climate action by quantifying transportation carbon offsets.
2. **Demonstrate Algorithmic Depth:** Navigate to the `/about` page or open `DijkstraRouterService.java` to showcase the Java graph data structures, min-priority queues, and A* heuristic functions.
3. **Show Multi-Modal Comparison:** Use the Route Planner to toggle between Petrol Car, EV, Bus, and Bicycle to observe live changes in the Recharts bar graphs and Eco-Score badges.
4. **Demonstrate Data Persistence:** Plan a route, click **"Save Trip"**, and navigate to the **Dashboard** to view updated cumulative statistics and the journey history table.
