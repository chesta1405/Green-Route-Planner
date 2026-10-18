import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Globe, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-slate-300 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Green Route<span className="text-emerald-400">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering sustainable mobility and reducing urban travel emissions through intelligent multi-criteria route optimization.
            </p>
            <div className="inline-flex items-center gap-1.5 bg-forest-800/80 text-emerald-400 px-2.5 py-1 rounded text-xs border border-forest-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Aligned with UN SDG 13</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home Landing</Link></li>
              <li><Link to="/plan" className="hover:text-emerald-400 transition-colors">Route Planner & Map</Link></li>
              <li><Link to="/stations" className="hover:text-emerald-400 transition-colors">EV Charging Stations</Link></li>
              <li><Link to="/transit" className="hover:text-emerald-400 transition-colors">Transit & Active Travel</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">User Eco Dashboard</Link></li>
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 tracking-wider uppercase">Architecture</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="text-slate-200">Frontend:</span> React 18, Vite, Tailwind CSS</li>
              <li><span className="text-slate-200">Backend:</span> Spring Boot 3, RESTful APIs</li>
              <li><span className="text-slate-200">Database:</span> PostgreSQL / Hibernate JPA</li>
              <li><span className="text-slate-200">Algorithms:</span> Dijkstra &amp; A* Eco-Optimization</li>
              <li><span className="text-slate-200">Geodata:</span> OpenStreetMap &amp; OSRM API</li>
            </ul>
          </div>

          {/* College Mini Project info */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3 tracking-wider uppercase">Project Details</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              College Mini-Project in Sustainable Transportation &amp; Carbon Footprint Mitigation.
            </p>
            <div className="text-xs text-slate-400">
              <p className="font-medium text-slate-300">Methodology References:</p>
              <p className="text-[11px] text-slate-400 mt-0.5">European Environment Agency (EEA) &amp; DEFRA Greenhouse Gas Conversion Factors (2024).</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-forest-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Green Route Planner. Open Source Sustainable Mobility.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for a cleaner tomorrow</span>
            <Leaf className="w-3.5 h-3.5 text-emerald-400 inline ml-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
