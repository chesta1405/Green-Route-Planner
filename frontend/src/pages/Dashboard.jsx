import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Navigation,
  Leaf,
  TrendingDown,
  Trash2,
  Eye,
  Award,
  RefreshCw,
  PieChart as PieIcon,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Car
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import DashboardStatCard from '../components/DashboardStatCard';
import EcoScoreBadge from '../components/EcoScoreBadge';
import LoadingState from '../components/LoadingState';
import { getDashboardSummary, deleteRouteHistory } from '../services/api';

const COLORS = ['#10B981', '#059669', '#0D9488', '#0284C7', '#64748B'];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeModalJourney, setActiveModalJourney] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      const data = await getDashboardSummary('demo-session');
      setSummary(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this route history entry?')) return;
    try {
      await deleteRouteHistory(id);
      setDeleteMsg('Journey deleted from history.');
      setTimeout(() => setDeleteMsg(''), 3000);
      loadDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  // Prepare Pie Chart data from mode distribution
  const modeData = summary?.modeDistribution
    ? Object.entries(summary.modeDistribution).map(([name, value]) => ({
        name: name.replace('_', ' '),
        value,
      }))
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-forest-100 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
            <LayoutDashboard className="w-7 h-7 text-emerald-600" />
            User Sustainability Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor recorded journeys, cumulative carbon offsets, and historical eco-scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-full">
            Active Mode: Guest / Demo Session
          </span>
          <button
            onClick={loadDashboard}
            className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-forest-700 hover:border-forest-300 shadow-xs transition-colors"
            title="Refresh Dashboard"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {deleteMsg && (
        <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold border border-emerald-300">
          {deleteMsg}
        </div>
      )}

      {isLoading && <LoadingState message="Aggregating route history metrics and carbon savings..." />}

      {!isLoading && summary && (
        <>
          {/* 5 KPI Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <DashboardStatCard
              title="Journeys Logged"
              value={summary.totalJourneys}
              unit="trips"
              subtitle="All recorded corridors"
              icon={Navigation}
              color="forest"
            />
            <DashboardStatCard
              title="Distance Travelled"
              value={summary.totalDistanceKm}
              unit="km"
              subtitle="Clean mobility routes"
              icon={Car}
              color="sky"
            />
            <DashboardStatCard
              title="Cumulative CO₂"
              value={summary.totalCo2Kg}
              unit="kg"
              subtitle="Total direct emissions"
              icon={Leaf}
              color="amber"
            />
            <DashboardStatCard
              title="Emissions Saved"
              value={summary.totalCo2SavedKg}
              unit="kg"
              subtitle="vs standard ICE petrol car"
              icon={TrendingDown}
              color="emerald"
            />
            <DashboardStatCard
              title="Avg Eco-Score"
              value={summary.avgEcoScore}
              unit="/ 100"
              subtitle="Sustainability rating"
              icon={Award}
              color="purple"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Timeline Emissions Chart */}
            <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-forest-100 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-forest-700" />
                  <h3 className="font-bold text-sm text-forest-900">Emissions Across Recorded Journeys</h3>
                </div>
                <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  CO₂ emitted vs saved (kg)
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summary.emissionsTrend || []} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: '0.75rem',
                        border: '1px solid #e2e8f0',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="co2Kg" name="Direct CO₂ (kg)" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="co2SavedKg" name="Saved CO₂ (kg)" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Travel Mode Breakdown Pie Chart */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-forest-100 shadow-soft flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-2">
                <PieIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-forest-900">Travel Mode Split</h3>
              </div>

              <div className="h-56 w-full flex items-center justify-center">
                {modeData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={modeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {modeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-xs text-slate-400">No travel mode distribution data yet.</p>
                )}
              </div>

              <p className="text-[11px] text-slate-500 text-center border-t border-slate-100 pt-2">
                Diversify modes with EV and cycling to increase your eco-score.
              </p>
            </div>
          </div>

          {/* Recent Route History Table */}
          <div className="bg-white rounded-2xl border border-forest-100 shadow-soft overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-forest-700" />
                <h3 className="font-bold text-base text-forest-900">Recent Route History</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {summary.recentJourneys?.length || 0} recorded trip{summary.recentJourneys?.length !== 1 ? 's' : ''}
              </span>
            </div>

            {summary.recentJourneys && summary.recentJourneys.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Journey Endpoints</th>
                      <th className="py-3 px-3">Mode</th>
                      <th className="py-3 px-3">Distance</th>
                      <th className="py-3 px-3">Duration</th>
                      <th className="py-3 px-3">CO₂ (kg)</th>
                      <th className="py-3 px-3">Eco-Score</th>
                      <th className="py-3 px-3">CO₂ Saved</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {summary.recentJourneys.map((j) => (
                      <tr key={j.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-800">{j.sourceName}</div>
                          <div className="text-[11px] text-slate-400">→ {j.destinationName}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-forest-50 text-forest-800 font-semibold text-[11px]">
                            {j.travelMode}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-800">{j.distanceKm} km</td>
                        <td className="py-3 px-3 text-slate-600">{j.durationMinutes} min</td>
                        <td className="py-3 px-3 font-bold text-forest-700">{j.co2Kg}</td>
                        <td className="py-3 px-3">
                          <EcoScoreBadge score={j.ecoScore} size="sm" showLabel={false} />
                        </td>
                        <td className="py-3 px-3 text-emerald-600 font-bold">+{j.co2SavedKg} kg</td>
                        <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => setActiveModalJourney(j)}
                            className="p-1 rounded text-slate-500 hover:text-forest-700 hover:bg-forest-50 transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(j.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No route history logged yet. Plan a route to populate your sustainability dashboard.
              </div>
            )}
          </div>
        </>
      )}

      {/* Detail Modal for Selected Route */}
      {activeModalJourney && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-forest-900">Journey Details</h3>
              <button
                onClick={() => setActiveModalJourney(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Origin</span>
                <p className="font-semibold text-slate-800 text-sm">{activeModalJourney.sourceName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Destination</span>
                <p className="font-semibold text-slate-800 text-sm">{activeModalJourney.destinationName}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center">
                <div>
                  <span className="text-slate-400 block text-[10px]">Distance</span>
                  <strong className="text-slate-800 text-sm">{activeModalJourney.distanceKm} km</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Duration</span>
                  <strong className="text-slate-800 text-sm">{activeModalJourney.durationMinutes} min</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Carbon Impact</span>
                  <strong className="text-forest-700 text-sm">{activeModalJourney.co2Kg} kg</strong>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">Eco-Score</span>
                  <span className="text-sm font-extrabold text-emerald-900">{activeModalJourney.ecoScore} / 100</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">Carbon Saved</span>
                  <span className="text-sm font-extrabold text-emerald-700">+{activeModalJourney.co2SavedKg} kg CO₂</span>
                </div>
              </div>

              {activeModalJourney.notes && (
                <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-lg">
                  "{activeModalJourney.notes}"
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveModalJourney(null)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
