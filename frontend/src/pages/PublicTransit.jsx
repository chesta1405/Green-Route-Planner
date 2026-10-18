import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bus,
  Bike,
  Footprints,
  Train,
  Leaf,
  Navigation,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import EcoScoreBadge from '../components/EcoScoreBadge';

export default function PublicTransit() {
  const [commuteDistance, setCommuteDistance] = useState(12);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  // Carbon comparison calculations (g CO2 per km)
  // Car ICE: 171g/km, Bus/Metro: 68g/km, Bike: 0g, Walk: 0g
  const totalWeeklyKm = commuteDistance * 2 * daysPerWeek;
  const annualKm = totalWeeklyKm * 48; // 48 working weeks

  const carAnnualCo2 = Math.round((annualKm * 171) / 1000);
  const transitAnnualCo2 = Math.round((annualKm * 68) / 1000);
  const transitAnnualSavings = carAnnualCo2 - transitAnnualCo2;

  const bikeAnnualSavings = carAnnualCo2; // 100% saved

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Page Header */}
      <div className="border-b border-forest-100 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
          <Bus className="w-7 h-7 text-teal-600" />
          Public Transit &amp; Sustainable Mobility Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Evaluate public transit, active cycling, and pedestrian corridors to cut daily commuting emissions.
        </p>
      </div>

      {/* Sustainable Modes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Cycling */}
        <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-soft hover:shadow-card transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Bike className="w-6 h-6" />
            </div>
            <EcoScoreBadge score={100} size="sm" />
          </div>
          <h3 className="text-lg font-bold text-forest-900">Active Cycling / E-Bikes</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Direct operational emissions are 0.0g CO₂/km. Cycling eliminates traffic congestion and delivers cardiovascular health benefits for journeys under 8 km.
          </p>
          <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 font-medium">
            🌱 100% Carbon Reduction vs Private ICE Vehicles
          </div>
        </div>

        {/* Card 2: Urban Public Transit */}
        <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-soft hover:shadow-card transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Bus className="w-6 h-6" />
            </div>
            <EcoScoreBadge score={76} size="sm" />
          </div>
          <h3 className="text-lg font-bold text-forest-900">Buses &amp; Light Rail / Metro</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            By sharing vehicular space among 30–60 passengers, per-passenger emissions drop to ~68g CO₂/km, cutting individual footprint by up to 60%.
          </p>
          <div className="p-3 bg-teal-50 rounded-xl text-xs text-teal-800 font-medium">
            ⚡ ~60% Lower Carbon Intensity per passenger-km
          </div>
        </div>

        {/* Card 3: Pedestrian Walking */}
        <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-soft hover:shadow-card transition-all space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-lime-100 text-lime-700 flex items-center justify-center">
              <Footprints className="w-6 h-6" />
            </div>
            <EcoScoreBadge score={100} size="sm" />
          </div>
          <h3 className="text-lg font-bold text-forest-900">Pedestrian Walking</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Zero direct fossil emissions. Ideal for last-mile connections from metro stations and bus hubs, transforming short errands into zero-carbon micro-journeys.
          </p>
          <div className="p-3 bg-lime-50 rounded-xl text-xs text-lime-800 font-medium">
            🚶 Complete Zero Direct Footprint &amp; Zero Noise Pollution
          </div>
        </div>
      </div>

      {/* Interactive Commuting Carbon Calculator */}
      <div className="bg-gradient-to-br from-forest-900 to-forest-800 text-white p-6 sm:p-8 rounded-3xl shadow-soft space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Interactive Scenario Simulator</span>
          <h2 className="text-2xl font-extrabold mt-1">Commuter Carbon Reduction Calculator</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Simulate the annual environmental savings of switching your daily commute from a solo petrol car to public transit or cycling.
          </p>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-forest-800/60 p-5 rounded-2xl border border-forest-700">
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span>One-Way Commute Distance</span>
              <span className="text-emerald-400 text-sm">{commuteDistance} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              step="1"
              value={commuteDistance}
              onChange={(e) => setCommuteDistance(parseInt(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block mt-1">Total Round-Trip: {commuteDistance * 2} km/day</span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span>Commute Frequency</span>
              <span className="text-emerald-400 text-sm">{daysPerWeek} days / week</span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              step="1"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <span className="text-[11px] text-slate-400 block mt-1">{totalWeeklyKm} km travelled every week</span>
          </div>
        </div>

        {/* Calculated Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 p-4 rounded-xl border border-white/10">
            <span className="text-[11px] uppercase font-bold text-slate-300 block">Current Solo Car Impact</span>
            <span className="text-2xl font-extrabold text-rose-400 mt-1 block">{carAnnualCo2} kg</span>
            <span className="text-[11px] text-slate-400">CO₂ per year</span>
          </div>

          <div className="bg-emerald-500/20 p-4 rounded-xl border border-emerald-500/40">
            <span className="text-[11px] uppercase font-bold text-emerald-300 block">Switch to Public Transit</span>
            <span className="text-2xl font-extrabold text-emerald-400 mt-1 block">Save ~{transitAnnualSavings} kg</span>
            <span className="text-[11px] text-slate-300">Equivalent to planting {Math.round(transitAnnualSavings / 21)} trees</span>
          </div>

          <div className="bg-emerald-400/20 p-4 rounded-xl border border-emerald-400/40">
            <span className="text-[11px] uppercase font-bold text-emerald-200 block">Switch to Cycling / Walking</span>
            <span className="text-2xl font-extrabold text-emerald-300 mt-1 block">Save ~{bikeAnnualSavings} kg</span>
            <span className="text-[11px] text-slate-300">100% emission elimination</span>
          </div>
        </div>
      </div>

      {/* Daily Commuting Green Tips */}
      <div className="bg-white p-6 rounded-2xl border border-forest-100 shadow-soft space-y-4">
        <h3 className="text-lg font-bold text-forest-900 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Practical Tips to Reduce Your Daily Travel Emissions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <strong className="text-forest-900 font-semibold block text-sm">Combine Micro-Mobility with Rail</strong>
            <p>Use public bicycles or electric scooters for the first/last mile to and from train and metro terminals instead of auto-rickshaws or ride-hailing.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <strong className="text-forest-900 font-semibold block text-sm">Car-Pool &amp; Multi-Occupancy</strong>
            <p>Increasing car occupancy from 1 to 3 passengers divides individual per-passenger emissions by 3, making shared car trips competitive with transit.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <strong className="text-forest-900 font-semibold block text-sm">Avoid Rapid Braking &amp; Acceleration</strong>
            <p>Smooth driving on eco-routes reduces fuel consumption by up to 15-20% by avoiding congested corridors with repetitive idling.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl space-y-1">
            <strong className="text-forest-900 font-semibold block text-sm">Adopt Low-Emission Weather Days</strong>
            <p>Use our integrated Weather widget to cycle on clear mornings and switch to electrified transit on rainy or high-wind afternoons.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
