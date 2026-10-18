import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Search, MapPin, RefreshCw, Layers, ShieldCheck, Navigation } from 'lucide-react';
import ChargingStationCard from '../components/ChargingStationCard';
import MapView from '../components/MapView';
import LoadingState from '../components/LoadingState';
import { getNearbyChargingStations, searchLocations } from '../services/api';

export default function StationExplorer() {
  const navigate = useNavigate();
  const [centerLoc, setCenterLoc] = useState({
    name: 'Bangalore Central, Karnataka',
    lat: 12.9716,
    lng: 77.5946,
  });
  const [searchQuery, setSearchQuery] = useState('Bangalore Central, Karnataka');
  const [suggestions, setSuggestions] = useState([]);
  const [radiusKm, setRadiusKm] = useState(10);
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fastOnly, setFastOnly] = useState(false);

  useEffect(() => {
    fetchStations(centerLoc.lat, centerLoc.lng, radiusKm * 1000);
  }, [centerLoc, radiusKm]);

  const fetchStations = async (lat, lng, radius) => {
    setIsLoading(true);
    try {
      const data = await getNearbyChargingStations(lat, lng, radius);
      setStations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSearch = async (val) => {
    setSearchQuery(val);
    if (val.length > 2) {
      const res = await searchLocations(val);
      setSuggestions(res);
    } else {
      setSuggestions([]);
    }
  };

  const handleNavigateToStation = (station) => {
    navigate('/plan', {
      state: {
        destination: {
          name: station.name + ', ' + station.address,
          lat: station.latitude,
          lng: station.longitude,
        },
      },
    });
  };

  const filteredStations = fastOnly ? stations.filter((s) => s.isFastCharging) : stations;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-forest-100 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
            <Zap className="w-7 h-7 text-sky-600 fill-current" />
            EV Charging Station Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover verified public EV charging stations powered by live OpenStreetMap Overpass spatial queries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchStations(centerLoc.lat, centerLoc.lng, radiusKm * 1000)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-forest-300 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-sky-600' : ''}`} />
            Refresh Stations
          </button>
        </div>
      </div>

      {/* Search & Radius Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-forest-100 shadow-soft flex flex-col md:flex-row items-center gap-3">
        {/* Search Input with Autocomplete */}
        <div className="relative flex-1 w-full">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleLocationSearch(e.target.value)}
              placeholder="Search area, landmark, or city for charging hubs..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-forest-600"
            />
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
              {suggestions.map((item, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setCenterLoc({ name: item.name, lat: item.lat, lng: item.lng });
                    setSearchQuery(item.name);
                    setSuggestions([]);
                  }}
                  className="p-2.5 hover:bg-forest-50 cursor-pointer text-slate-700 flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Radius dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">Radius:</span>
          <select
            value={radiusKm}
            onChange={(e) => setRadiusKm(parseInt(e.target.value))}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-forest-600"
          >
            <option value="5">Within 5 km</option>
            <option value="10">Within 10 km</option>
            <option value="20">Within 20 km</option>
            <option value="30">Within 30 km</option>
          </select>
        </div>

        {/* Fast Charging Only Toggle */}
        <label className="flex items-center gap-2 cursor-pointer w-full md:w-auto px-2">
          <input
            type="checkbox"
            checked={fastOnly}
            onChange={(e) => setFastOnly(e.target.checked)}
            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 accent-sky-600"
          />
          <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
            Rapid / DC Fast (50kW+)
          </span>
        </label>
      </div>

      {/* 2-Column Explorer View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Map */}
        <div className="lg:col-span-7 h-[500px]">
          <MapView
            source={centerLoc}
            chargingStations={filteredStations}
            onSelectStation={(st) => {
              alert(`Selected Station:\n${st.name}\n${st.address}\nConnectors: ${st.connectorTypes}`);
            }}
          />
        </div>

        {/* Right Side: Station Cards List */}
        <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between sticky top-0 bg-slate-50 py-1 z-10">
            <span className="text-xs font-bold text-forest-900">
              Found {filteredStations.length} Charging Station{filteredStations.length !== 1 ? 's' : ''}
            </span>
            <span className="text-[11px] text-slate-500">Sorted by proximity</span>
          </div>

          {isLoading && <LoadingState message="Querying OpenStreetMap Overpass EV infrastructure..." />}

          {!isLoading && filteredStations.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
              <Zap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold">No charging stations found within this radius.</p>
              <p className="text-xs mt-1">Try expanding search radius or searching another urban center.</p>
            </div>
          )}

          {!isLoading &&
            filteredStations.map((station) => (
              <ChargingStationCard
                key={station.id}
                station={station}
                onNavigateTo={handleNavigateToStation}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
