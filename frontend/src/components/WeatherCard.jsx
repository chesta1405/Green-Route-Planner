import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, AlertTriangle, Sparkles } from 'lucide-react';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const isRain = weather.condition?.toLowerCase().includes('rain') || weather.condition?.toLowerCase().includes('drizzle');

  return (
    <div className="bg-white p-4 rounded-2xl border border-forest-100 shadow-soft space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          {isRain ? (
            <CloudRain className="w-5 h-5 text-sky-500" />
          ) : (
            <Sun className="w-5 h-5 text-amber-500" />
          )}
          <div>
            <h4 className="font-bold text-xs text-forest-900">{weather.locationName}</h4>
            <span className="text-[10px] text-slate-500">{weather.description}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200/60 px-2 py-0.5 rounded-full text-xs font-bold">
          <Thermometer className="w-3.5 h-3.5 text-amber-600" />
          <span>{weather.temperatureCelsius}°C</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
          <Droplets className="w-4 h-4 text-sky-600" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Humidity</span>
            <span className="font-bold text-slate-700">{weather.humidity}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl">
          <Wind className="w-4 h-4 text-teal-600" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Wind Speed</span>
            <span className="font-bold text-slate-700">{weather.windSpeedKmh} km/h</span>
          </div>
        </div>
      </div>

      {/* Weather Aware Travel Advisory */}
      {weather.weatherNotice && (
        <div className={`p-2.5 rounded-xl text-xs flex items-start gap-2 ${
          isRain
            ? 'bg-sky-50 text-sky-900 border border-sky-200'
            : 'bg-emerald-50 text-emerald-900 border border-emerald-200/60'
        }`}>
          {isRain ? (
            <AlertTriangle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          ) : (
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed text-[11px] font-medium">{weather.weatherNotice}</span>
        </div>
      )}
    </div>
  );
}
