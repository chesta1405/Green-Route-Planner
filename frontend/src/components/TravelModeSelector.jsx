import React from 'react';
import { Car, Zap, Bus, Bike, Footprints } from 'lucide-react';

export const TRAVEL_MODES = [
  { id: 'EV', label: 'Electric EV', icon: Zap, factor: '47g CO₂/km', badge: 'Low Carbon', color: 'emerald' },
  { id: 'PUBLIC_TRANSIT', label: 'Transit Bus/Metro', icon: Bus, factor: '68g CO₂/p-km', badge: 'Shared', color: 'teal' },
  { id: 'BICYCLE', label: 'Bicycle', icon: Bike, factor: '0g (Zero Direct)', badge: 'Zero Impact', color: 'green' },
  { id: 'WALKING', label: 'Walking', icon: Footprints, factor: '0g (Zero Direct)', badge: 'Active Travel', color: 'lime' },
  { id: 'CAR', label: 'Petrol / Diesel Car', icon: Car, factor: '171g CO₂/km', badge: 'Baseline ICE', color: 'slate' },
];

export default function TravelModeSelector({ selectedMode, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-forest-900">
        Travel Mode
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {TRAVEL_MODES.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'border-forest-600 bg-forest-50/90 text-forest-900 shadow-sm ring-2 ring-forest-500/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className={`p-2 rounded-lg mb-1.5 ${
                isSelected ? 'bg-forest-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold leading-tight">{mode.label}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">{mode.factor}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
