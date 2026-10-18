import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Navigation, Zap, Bus, LayoutDashboard, Info, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Leaf },
    { name: 'Plan Route', path: '/plan', icon: Navigation },
    { name: 'EV Stations', path: '/stations', icon: Zap },
    { name: 'Transit & Mobility', path: '/transit', icon: Bus },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-forest-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-forest-600/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-forest-900 group-hover:text-forest-700 transition-colors">
                Green Route<span className="text-emerald-600">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 -mt-1 hidden sm:block">
                Eco-Friendly Navigation
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-forest-50 text-forest-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-forest-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-forest-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: SDG 13 Badge & Plan Button */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2.5 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              SDG 13: Climate Action
            </div>
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-forest-700 to-forest-600 hover:from-forest-800 hover:to-forest-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm shadow-forest-800/20 hover:shadow-md transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              Plan Route
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-forest-800 hover:bg-forest-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-forest-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in fade-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  active
                    ? 'bg-forest-50 text-forest-800 font-semibold'
                    : 'text-slate-600 hover:text-forest-800 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-forest-600' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/plan"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-forest-700 hover:bg-forest-800 text-white px-4 py-2.5 rounded-lg font-semibold text-sm shadow-sm"
            >
              <Navigation className="w-4 h-4" />
              Plan Route Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
