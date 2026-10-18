import React from 'react';
import { Zap, MapPin, Navigation, Cpu, CheckCircle } from 'lucide-react';

export default function ChargingStationCard({ station, onNavigateTo }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-forest-300 shadow-xs hover:shadow-card transition-all">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-forest-900">{station.name}</h4>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="line-clamp-1">{station.address || 'Address provided on map'}</span>
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200/60 px-2 py-0.5 rounded-full shrink-0">
          {station.distanceKm} km
        </span>
      </div>

      {/* Specifications */}
      <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-slate-50 rounded-xl text-xs">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Connector Types</span>
          <span className="font-bold text-slate-700">{station.connectorTypes || 'Type 2 AC'}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-semibold block">Max Power Output</span>
          <span className="font-bold text-emerald-700">{station.powerKw || '22 kW Fast'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{station.status || 'Operational'}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400 truncate max-w-[120px]">{station.operator}</span>
        </div>

        {onNavigateTo && (
          <button
            type="button"
            onClick={() => onNavigateTo(station)}
            className="inline-flex items-center gap-1 px-3 py-1 bg-forest-700 hover:bg-forest-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            Route Here
          </button>
        )}
      </div>
    </div>
  );
}
