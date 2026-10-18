import React from 'react';
import { Leaf, Info, ShieldCheck, Scale, Zap, Bus, Bike } from 'lucide-react';
import EcoScoreBadge from './EcoScoreBadge';

export default function EmissionsSummary({ selectedRoute, travelMode = 'EV', occupancy = 1 }) {
  if (!selectedRoute) return null;

  return (
    <div className="bg-gradient-to-br from-forest-50/70 to-emerald-50/40 p-5 rounded-2xl border border-forest-100 shadow-soft space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-forest-100/80 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
            <Leaf className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-forest-900">Eco-Score &amp; Carbon Footprint Report</h4>
            <span className="text-[11px] text-emerald-800 font-medium">Estimated Environmental Impact Assessment</span>
          </div>
        </div>
        <EcoScoreBadge score={selectedRoute.ecoScore} size="md" />
      </div>

      {/* Main KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-white p-3 rounded-xl border border-forest-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Estimated CO₂</span>
          <span className="text-lg font-extrabold text-forest-800">{selectedRoute.co2Kg}</span>
          <span className="text-xs text-slate-500 block">kg CO₂e</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-forest-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Carbon Saved</span>
          <span className="text-lg font-extrabold text-emerald-600">+{selectedRoute.co2SavedKg}</span>
          <span className="text-xs text-slate-500 block">kg saved</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-forest-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Journey Distance</span>
          <span className="text-lg font-extrabold text-slate-800">{selectedRoute.distanceKm}</span>
          <span className="text-xs text-slate-500 block">kilometres</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-forest-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Travel Time</span>
          <span className="text-lg font-extrabold text-slate-800">{selectedRoute.durationMinutes}</span>
          <span className="text-xs text-slate-500 block">minutes</span>
        </div>
      </div>

      {/* Documented Methodology Box */}
      <div className="bg-white/90 p-4 rounded-xl border border-forest-100 space-y-2 text-xs text-slate-600">
        <div className="flex items-center gap-1.5 font-bold text-forest-900">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>Documented Calculation Methodology</span>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-lg font-mono text-[11px] text-forest-900 border border-slate-200">
          CO₂ (kg) = [ Distance ({selectedRoute.distanceKm} km) × Emission Factor ({travelMode}) ] ÷ [ 1,000 × Occupancy ({occupancy}) ]
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          *<strong>Baseline Assumption:</strong> Calculated savings compare directly against average internal combustion engine (ICE) petrol vehicles (171 g CO₂/km).
          For public transit, values represent per-passenger emissions rather than total vehicle burden.
        </p>
      </div>

      {/* Sustainable Development Goal 13 notice */}
      <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-100/50 p-3 rounded-xl border border-emerald-200/60">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-semibold">
            Actively contributing to UN SDG 13: Climate Action &amp; Carbon Neutrality
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-200/60 px-2 py-0.5 rounded text-emerald-900">
          Verified Model
        </span>
      </div>
    </div>
  );
}
