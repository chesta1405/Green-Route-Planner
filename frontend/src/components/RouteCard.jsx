import React from 'react';
import { Clock, MapPin, Leaf, TrendingDown, Eye, CheckCircle2, Cpu } from 'lucide-react';
import EcoScoreBadge from './EcoScoreBadge';

export default function RouteCard({ route, isSelected, onSelect, onViewOnMap, onSave }) {
  const isEco = route.preferenceLabel?.toLowerCase().includes('eco') || route.ecoScore >= 85;

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
        isSelected
          ? 'bg-emerald-50/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
          : 'bg-white border-slate-200 hover:border-forest-300 hover:shadow-card'
      }`}
    >
      {/* Top Header: Route Title & Preference Label */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-sm text-forest-900">{route.name}</h4>
            {isSelected && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" /> Selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
              isEco ? 'bg-forest-100 text-forest-800' : 'bg-slate-100 text-slate-700'
            }`}>
              {route.preferenceLabel || 'Alternative Route'}
            </span>
            {route.algorithmUsed && (
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-emerald-600" />
                {route.algorithmUsed.split('(')[0].trim()}
              </span>
            )}
          </div>
        </div>

        <EcoScoreBadge score={route.ecoScore} size="sm" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 my-3 p-2.5 bg-slate-50/80 rounded-xl border border-slate-100 text-center">
        {/* Distance */}
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">Distance</span>
          <span className="text-sm font-extrabold text-slate-800">{route.distanceKm} <span className="text-xs font-normal">km</span></span>
        </div>
        {/* Duration */}
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">Est. Time</span>
          <span className="text-sm font-extrabold text-slate-800">{route.durationMinutes} <span className="text-xs font-normal">min</span></span>
        </div>
        {/* CO2 Emissions */}
        <div>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">Est. CO₂</span>
          <span className="text-sm font-extrabold text-forest-700">{route.co2Kg} <span className="text-xs font-normal">kg</span></span>
        </div>
      </div>

      {/* CO2 Savings Callout */}
      {route.co2SavedKg > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50/80 px-2.5 py-1.5 rounded-lg border border-emerald-200/50 mb-3">
          <TrendingDown className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Saves <strong>~{route.co2SavedKg} kg CO₂</strong> vs standard ICE petrol car baseline</span>
        </div>
      )}

      {/* Explanation */}
      {route.explanation && (
        <p className="text-[11px] text-slate-500 italic mb-3">
          "{route.explanation}"
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
            isSelected
              ? 'bg-forest-700 text-white shadow-xs'
              : 'bg-forest-50 hover:bg-forest-100 text-forest-800'
          }`}
        >
          {isSelected ? 'Active Route' : 'Select Route'}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewOnMap();
          }}
          className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:border-slate-300 text-slate-700 flex items-center gap-1"
          title="Zoom to route on map"
        >
          <Eye className="w-3.5 h-3.5" />
          View
        </button>

        {onSave && isSelected && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSave(route);
            }}
            className="py-1.5 px-3 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-xs"
            title="Log journey into Dashboard History"
          >
            <Leaf className="w-3.5 h-3.5" />
            Save Trip
          </button>
        )}
      </div>
    </div>
  );
}
