import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { BarChart3, Info } from 'lucide-react';

export default function RouteComparisonChart({ routes = [] }) {
  if (!routes || routes.length === 0) return null;

  const chartData = routes.map((r, i) => ({
    name: r.name.length > 15 ? r.name.substring(0, 15) + '...' : r.name,
    'CO₂ Emissions (kg)': r.co2Kg,
    'CO₂ Saved (kg)': r.co2SavedKg,
    'Eco-Score': r.ecoScore,
  }));

  return (
    <div className="bg-white p-5 rounded-2xl border border-forest-100 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-forest-700" />
          <h4 className="font-bold text-sm text-forest-900">Environmental Impact Comparison</h4>
        </div>
        <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full font-medium">
          Multi-Route Carbon Analytics
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-10} textAnchor="end" />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '0.75rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Bar dataKey="CO₂ Emissions (kg)" fill="#EF4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="CO₂ Saved (kg)" fill="#10B981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-forest-600" />
          Calculations based on DEFRA / EEA greenhouse gas conversion metrics.
        </span>
        <span className="text-emerald-700 font-semibold">Lower emission = Higher sustainability</span>
      </div>
    </div>
  );
}
