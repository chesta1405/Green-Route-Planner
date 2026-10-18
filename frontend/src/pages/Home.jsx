import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navigation,
  Leaf,
  Zap,
  Bus,
  CloudSun,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Compass,
  CheckCircle2,
  Cpu,
  BarChart2,
  TreeDeciduous
} from 'lucide-react';
import EcoScoreBadge from '../components/EcoScoreBadge';

export default function Home() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-20 bg-gradient-to-b from-forest-50/80 via-white to-slate-50 border-b border-forest-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading, Subtext, CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-100/70 border border-emerald-300 text-emerald-900 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-xs">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Supporting UN SDG 13: Climate Action</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-900 tracking-tight leading-[1.12]">
                Travel Smarter. <br />
                <span className="bg-gradient-to-r from-forest-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Travel Greener.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                The intelligent eco-navigation platform comparing travel distance, duration, and carbon emissions. Discover greener corridors, nearby EV charging hubs, and multimodal transit to minimize your daily footprint.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/plan"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-base shadow-md shadow-forest-800/25 hover:shadow-lg transition-all active:scale-95"
                >
                  <Navigation className="w-5 h-5 text-emerald-400" />
                  <span>Plan Your Route</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/stations"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-forest-800 font-bold text-base border border-slate-300 shadow-xs hover:border-forest-300 transition-all"
                >
                  <Zap className="w-5 h-5 text-sky-600" />
                  <span>Explore EV Stations</span>
                </Link>
              </div>

              {/* Quick stats banner */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-forest-100 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <span className="text-2xl font-extrabold text-forest-800 block">40%+</span>
                  <span className="text-xs text-slate-500 font-medium">CO₂ Reduction Potential</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-forest-800 block">A* &amp; Dijkstra</span>
                  <span className="text-xs text-slate-500 font-medium">Eco-Weight Routing</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-forest-800 block">OpenStreetMap</span>
                  <span className="text-xs text-slate-500 font-medium">Zero Paid API Locks</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Map Simulation Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white p-5 rounded-3xl shadow-soft border border-forest-100">
                {/* Mock Card Preview */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold text-forest-900">Live Eco-Corridor Analysis</span>
                  </div>
                  <EcoScoreBadge score={94} size="sm" />
                </div>

                {/* Route visualization preview */}
                <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-forest-50/50 border border-emerald-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-forest-900">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                      Bangalore Tech Center
                    </span>
                    <span className="text-slate-400">→</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      Green Lake District
                    </span>
                  </div>

                  {/* Route Bar */}
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-emerald-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 block">A* Green Corridor</span>
                      <strong className="text-sm text-forest-900">12.4 km • 28 min</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-forest-700 block">0.58 kg CO₂</span>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        -1.54 kg saved
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between opacity-75">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Highway Express</span>
                      <span className="text-xs text-slate-700">14.1 km • 24 min</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-rose-600 block">2.12 kg CO₂</span>
                      <span className="text-[10px] text-slate-400">Baseline ICE</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <TreeDeciduous className="w-4 h-4 text-emerald-600" />
                    Equivalent to planting 1 tree
                  </span>
                  <Link to="/plan" className="text-forest-700 font-bold hover:underline">
                    Try route →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-forest-900 tracking-tight">
            Designed for Climate-Conscious Commuters
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Every feature is engineered to provide actionable sustainability insights using real environmental data and intelligent pathfinding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-700 flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-forest-700" />
            </div>
            <h3 className="font-bold text-lg text-forest-900 mb-2">Eco Routes &amp; Scores</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Calculate exact carbon emissions and an eco-score out of 100 using documented European Environment Agency (EEA) factors.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-sky-600" />
            </div>
            <h3 className="font-bold text-lg text-forest-900 mb-2">EV-Friendly Travel</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Discover real-time EV charging stations powered by OpenStreetMap Overpass API, with connector types, power ratings, and directions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
              <Bus className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-bold text-lg text-forest-900 mb-2">Public Transit Options</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Compare walking, cycling, and public transit alternatives to replace single-occupancy vehicle trips with shared low-carbon mobility.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <CloudSun className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-lg text-forest-900 mb-2">Weather-Aware Alerts</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              OpenWeather integration delivers meteorological travel notices, cautioning cyclists against rain and highlighting optimal walking conditions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="bg-forest-900 text-white py-16 sm:py-20 rounded-3xl mx-4 sm:mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step-by-Step Navigation</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-1 tracking-tight">
              How Green Route Planner Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-extrabold text-lg">
                1
              </div>
              <h4 className="font-bold text-lg">Enter Origin &amp; Destination</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use intelligent OpenStreetMap Nominatim geocoding or GPS geolocation to pinpoint your exact journey endpoints.
              </p>
            </div>

            <div className="relative space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-extrabold text-lg">
                2
              </div>
              <h4 className="font-bold text-lg">Select Travel Mode</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Choose between Electric Vehicles, Public Transit, Bicycle, Pedestrian Walking, or conventional cars with custom passenger occupancy.
              </p>
            </div>

            <div className="relative space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-extrabold text-lg">
                3
              </div>
              <h4 className="font-bold text-lg">A* &amp; Dijkstra Optimization</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our backend engine runs graph-search algorithms balancing shortest distance, duration, and carbon-penalized eco weights.
              </p>
            </div>

            <div className="relative space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-extrabold text-lg">
                4
              </div>
              <h4 className="font-bold text-lg">Inspect Impact &amp; Log Trip</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Review interactive Leaflet routes, analyze CO₂ savings, locate charging stations, and track cumulative environmental benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SDG 13 Climate Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-500/10 via-forest-50 to-teal-500/10 p-8 sm:p-12 rounded-3xl border border-emerald-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Global Goals Commitment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
                Supporting UN Sustainable Development Goal 13: Climate Action
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Transportation accounts for approximately 25% of global energy-related greenhouse gas emissions. Green Route Planner directly operationalizes SDG 13 by providing individuals and organizations with the computational tools to quantify, compare, and intentionally reduce transport emissions.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Transparency in vehicle emission calculations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Incentivizing zero-emission active mobility
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Accelerating EV adoption with charging discovery
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Open-source architecture for broad accessibility
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-emerald-200 shadow-soft text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3">
                <Leaf className="w-10 h-10" />
              </div>
              <h4 className="font-extrabold text-forest-900 text-lg">Goal 13 Aligned</h4>
              <p className="text-xs text-slate-500 mt-1">Take urgent action to combat climate change and its impacts.</p>
              <Link
                to="/about"
                className="mt-4 text-xs font-bold text-forest-700 hover:text-emerald-600 underline"
              >
                Read Technical Methodology →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 bg-white rounded-3xl border border-forest-100 shadow-card max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900">
            Ready to Plan Your Next Sustainable Journey?
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Experience our Dijkstra &amp; A* powered eco-navigation right in your browser. Free, open-source, and privacy-respecting.
          </p>
          <div className="pt-2">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-forest-700 to-emerald-600 hover:from-forest-800 hover:to-emerald-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-sm"
            >
              <Navigation className="w-4 h-4 text-emerald-300" />
              Launch Route Planner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
