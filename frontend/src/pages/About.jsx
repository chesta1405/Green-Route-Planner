import React from 'react';
import {
  Leaf,
  ShieldCheck,
  Cpu,
  Layers,
  Database,
  Globe,
  Code2,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Award
} from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Title */}
      <div className="border-b border-forest-100 pb-6 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold uppercase mb-3">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>College Mini-Project Documentation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 tracking-tight">
          About Green Route Planner
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          A full-stack sustainable transportation web platform designed to quantify, compare, and minimize vehicular carbon emissions through multi-criteria route optimization.
        </p>
      </div>

      {/* 1. Problem Statement & Objectives */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-forest-100 shadow-soft space-y-4">
        <h2 className="text-xl font-bold text-forest-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-forest-700" />
          1. Problem Statement &amp; Project Objectives
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            <strong>Problem Statement:</strong> Traditional navigation systems (such as Google Maps or Apple Maps) predominantly optimize routes exclusively for travel duration or shortest geometric distance. By failing to account for vehicular emission factors, road topography, or low-emission transport modes, current navigation tools encourage unnecessary carbon generation in urban corridors.
          </p>
          <p>
            <strong>Project Objectives:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-700 font-medium">
            <li>Develop an end-to-end full-stack navigation application comparing distance, travel time, and estimated CO₂ emissions.</li>
            <li>Implement algorithmic pathfinding via Dijkstra's Algorithm and A* Search with eco-penalties and admissible heuristics.</li>
            <li>Integrate live open spatial data via OpenStreetMap OSRM and Overpass API for EV charging station discovery without commercial API costs.</li>
            <li>Operationalize UN Sustainable Development Goal 13 (Climate Action) through transparent, reproducible carbon accounting.</li>
          </ul>
        </div>
      </section>

      {/* 2. System Architecture & Tech Stack */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-forest-100 shadow-soft space-y-6">
        <h2 className="text-xl font-bold text-forest-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-forest-700" />
          2. System Architecture &amp; Technology Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Frontend */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-forest-900 text-sm block">Frontend Presentation Layer</span>
            <ul className="space-y-1.5 text-slate-600">
              <li>• <strong>React 18 &amp; Vite:</strong> High-performance SPA</li>
              <li>• <strong>Tailwind CSS:</strong> Modern eco-palette styling</li>
              <li>• <strong>Leaflet + OSM:</strong> Interactive vector mapping</li>
              <li>• <strong>Recharts:</strong> Environmental carbon graphs</li>
              <li>• <strong>Lucide React:</strong> Accessible iconography</li>
            </ul>
          </div>

          {/* Backend */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-forest-900 text-sm block">Backend RESTful Core</span>
            <ul className="space-y-1.5 text-slate-600">
              <li>• <strong>Java 17/24:</strong> Strongly-typed business logic</li>
              <li>• <strong>Spring Boot 3:</strong> RESTful API micro-framework</li>
              <li>• <strong>Spring Data JPA:</strong> ORM repository layer</li>
              <li>• <strong>Bean Validation:</strong> Input sanitization</li>
              <li>• <strong>RestTemplate:</strong> External service client</li>
            </ul>
          </div>

          {/* Database & External APIs */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="font-bold text-forest-900 text-sm block">Data &amp; Geocoding Services</span>
            <ul className="space-y-1.5 text-slate-600">
              <li>• <strong>PostgreSQL / H2:</strong> Relational journey logs</li>
              <li>• <strong>OSRM Engine:</strong> Road geometry calculation</li>
              <li>• <strong>Nominatim:</strong> Geocoding and autocomplete</li>
              <li>• <strong>Overpass API:</strong> EV charging infrastructure</li>
              <li>• <strong>OpenWeather:</strong> Meteorological integration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Dijkstra & A* Algorithm Implementation */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-forest-100 shadow-soft space-y-4">
        <h2 className="text-xl font-bold text-forest-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-forest-700" />
          3. Dijkstra's Algorithm &amp; A* Route Optimization
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            The backend features an explicit graph optimization engine (<code className="bg-slate-100 px-1.5 py-0.5 rounded text-forest-800 font-mono">DijkstraRouterService.java</code>) executing both Dijkstra and A* pathfinding algorithms across directed road corridors:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-forest-50/70 rounded-2xl border border-forest-100">
              <strong className="text-forest-900 font-bold block mb-1">Dijkstra's Algorithm (Shortest Path)</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Computes single-source shortest path using a min-priority queue ordered by accumulated geometric distance <code className="font-mono">g(n)</code>. Guarantees the absolute shortest physical route without relying on heuristic estimates.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100">
              <strong className="text-forest-900 font-bold block mb-1">A* Search (Eco-Weighted Heuristic)</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Minimizes evaluation function <code className="font-mono">f(n) = g(n) + h(n)</code>, where edge weights incorporate carbon emission penalties (penalizing stop-and-go congestion and higher friction) and <code className="font-mono">h(n)</code> uses the admissible Great-Circle Haversine distance to destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Carbon Footprint Formula & Eco-Score Methodology */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-forest-100 shadow-soft space-y-4">
        <h2 className="text-xl font-bold text-forest-900 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-600" />
          4. Documented Environmental Formula &amp; Scoring Methodology
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            Emission calculations adhere to the guidelines set by the European Environment Agency (EEA) and the UK Department for Environment, Food &amp; Rural Affairs (DEFRA):
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-xs text-forest-900 space-y-2">
            <div><strong>Carbon Formula:</strong> CO₂ (kg) = ( Distance (km) × Factor (g/km) ) ÷ ( 1000 × Occupancy )</div>
            <div><strong>Baseline Comparison:</strong> Standard ICE Petrol Passenger Car = 171.0 g CO₂/km</div>
            <div><strong>Electric Vehicle (Grid Average):</strong> 47.0 g CO₂/km</div>
            <div><strong>Public Transit (Per Passenger):</strong> 68.0 g CO₂/passenger-km</div>
            <div><strong>Active Travel (Walking &amp; Bicycle):</strong> 0.0 g CO₂/km (Zero Direct Exhaust)</div>
          </div>

          <p>
            <strong>Eco-Score Formulation (0 to 100):</strong> Normalized against conventional combustion baselines:
            <br />
            <code className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-forest-900 inline-block mt-1">
              Score = clamp(0, 100, round( (1.0 - (Emissions ÷ Baseline_Emissions)) × 100 ))
            </code>
            <br />
            Walking and cycling achieve a perfect 100/100, electric vehicles score ~85–92/100, and conventional solo ICE vehicles score ~35–45/100.
          </p>
        </div>
      </section>

      {/* 5. SDG 13 & Future Scope */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-forest-100 shadow-soft space-y-4">
        <h2 className="text-xl font-bold text-forest-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          5. Contribution to SDG 13 &amp; Future Scope
        </h2>

        <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            <strong>UN Sustainable Development Goal 13: Climate Action:</strong> By empowering urban travelers with transparent emissions intelligence, the application directly promotes lower-carbon transit choices and supports municipal decarbonization goals.
          </p>
          <p>
            <strong>Future Scope:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>Integration with GTFS (General Transit Feed Specification) for live bus and metro timetables.</li>
            <li>Dynamic real-time charging plug availability using OCPP / Open Charge Point protocols.</li>
            <li>Incentive gamification rewarding users with eco-badges and verified carbon offset credits.</li>
            <li>Mobile PWA support with offline caching of pedestrian and cycling greenways.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
