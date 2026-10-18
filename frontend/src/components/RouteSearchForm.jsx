import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, ArrowUpDown, Locate, Search, Sparkles, SlidersHorizontal, Users } from 'lucide-react';
import TravelModeSelector from './TravelModeSelector';
import { searchLocations, reverseGeocode } from '../services/api';

export default function RouteSearchForm({ onSearch, isLoading }) {
  const [sourceQuery, setSourceQuery] = useState('Central Railway Station, Bangalore');
  const [sourceData, setSourceData] = useState({ name: 'Central Railway Station, Bangalore', lat: 12.9784, lng: 77.5684 });
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);

  const [destQuery, setDestQuery] = useState('Eco Tech Park, Bangalore');
  const [destData, setDestData] = useState({ name: 'Eco Tech Park, Bangalore', lat: 12.9352, lng: 77.6245 });
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const [travelMode, setTravelMode] = useState('EV');
  const [routePreference, setRoutePreference] = useState('ECO_FRIENDLY');
  const [occupancy, setOccupancy] = useState(1);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState('');

  const sourceRef = useRef(null);
  const destRef = useRef(null);

  // Debounced search for source
  useEffect(() => {
    if (!sourceQuery || sourceQuery.length < 3 || sourceData?.name === sourceQuery) {
      setSourceSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      const results = await searchLocations(sourceQuery);
      setSourceSuggestions(results);
      setShowSourceDropdown(results.length > 0);
    }, 350);
    return () => clearTimeout(timer);
  }, [sourceQuery]);

  // Debounced search for destination
  useEffect(() => {
    if (!destQuery || destQuery.length < 3 || destData?.name === destQuery) {
      setDestSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      const results = await searchLocations(destQuery);
      setDestSuggestions(results);
      setShowDestDropdown(results.length > 0);
    }, 350);
    return () => clearTimeout(timer);
  }, [destQuery]);

  // Swap source & destination
  const handleSwap = () => {
    const tempQuery = sourceQuery;
    const tempData = sourceData;
    setSourceQuery(destQuery);
    setSourceData(destData);
    setDestQuery(tempQuery);
    setDestData(tempData);
  };

  // Use current GPS location
  const handleUseMyLocation = () => {
    setGpsLoading(true);
    setGpsError('');
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const name = await reverseGeocode(lat, lng);
        setSourceQuery(name);
        setSourceData({ name, lat, lng });
        setGpsLoading(false);
      },
      (err) => {
        setGpsError('Unable to retrieve your location. Check location permissions.');
        setGpsLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sourceData || !destData) return;

    onSearch({
      sourceName: sourceData.name || sourceQuery,
      sourceLat: sourceData.lat,
      sourceLng: sourceData.lng,
      destinationName: destData.name || destQuery,
      destinationLat: destData.lat,
      destinationLng: destData.lng,
      travelMode,
      routePreference,
      vehicleOccupancy: occupancy,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-forest-100 shadow-soft space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-forest-700" />
          <h3 className="text-base font-bold text-forest-900">Plan Green Route</h3>
        </div>
        <button
          type="button"
          onClick={handleUseMyLocation}
          disabled={gpsLoading}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-700 hover:text-forest-900 bg-forest-50 hover:bg-forest-100/80 px-2.5 py-1 rounded-lg transition-colors border border-forest-200/60"
        >
          <Locate className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin text-emerald-600' : ''}`} />
          {gpsLoading ? 'Locating...' : 'Use My Location'}
        </button>
      </div>

      {gpsError && (
        <div className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
          {gpsError}
        </div>
      )}

      {/* Origin & Destination Inputs */}
      <div className="space-y-3 relative">
        {/* Source */}
        <div className="relative" ref={sourceRef}>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Origin / Start Point
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-emerald-600">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              required
              value={sourceQuery}
              onChange={(e) => {
                setSourceQuery(e.target.value);
                setShowSourceDropdown(true);
              }}
              placeholder="Enter start location, landmark, or address..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600 transition-all font-medium"
            />
          </div>

          {/* Autocomplete dropdown for Source */}
          {showSourceDropdown && sourceSuggestions.length > 0 && (
            <ul className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-56 overflow-y-auto divide-y divide-slate-100 text-xs">
              {sourceSuggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setSourceQuery(item.name);
                    setSourceData(item);
                    setShowSourceDropdown(false);
                  }}
                  className="p-2.5 hover:bg-forest-50 cursor-pointer text-slate-700 flex items-start gap-2 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-forest-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Swap Button */}
        <div className="flex justify-end -my-1 pr-4">
          <button
            type="button"
            onClick={handleSwap}
            className="p-1.5 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 border border-slate-200 shadow-xs transition-colors"
            title="Swap origin and destination"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Destination */}
        <div className="relative" ref={destRef}>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Destination / Arrival Point
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-rose-500">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              required
              value={destQuery}
              onChange={(e) => {
                setDestQuery(e.target.value);
                setShowDestDropdown(true);
              }}
              placeholder="Enter destination address, place, or city..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-forest-500/20 focus:border-forest-600 transition-all font-medium"
            />
          </div>

          {/* Autocomplete dropdown for Destination */}
          {showDestDropdown && destSuggestions.length > 0 && (
            <ul className="absolute z-30 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-56 overflow-y-auto divide-y divide-slate-100 text-xs">
              {destSuggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setDestQuery(item.name);
                    setDestData(item);
                    setShowDestDropdown(false);
                  }}
                  className="p-2.5 hover:bg-forest-50 cursor-pointer text-slate-700 flex items-start gap-2 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Travel Mode Selector */}
      <TravelModeSelector selectedMode={travelMode} onChange={setTravelMode} />

      {/* Route Preference & Occupancy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-forest-900 mb-1.5">
            Optimization Priority
          </label>
          <select
            value={routePreference}
            onChange={(e) => setRoutePreference(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-forest-600"
          >
            <option value="ECO_FRIENDLY">🌿 Eco-Friendly (Lowest CO₂ &amp; High Score)</option>
            <option value="FASTEST">⚡ Fastest (Shortest Duration)</option>
            <option value="SHORTEST">📏 Shortest (Minimum Distance)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-forest-900 mb-1.5 flex items-center justify-between">
            <span>Occupancy</span>
            <span className="text-[11px] text-slate-500 lowercase font-normal">{occupancy} passenger(s)</span>
          </label>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={occupancy}
              onChange={(e) => setOccupancy(parseFloat(e.target.value))}
              className="w-full accent-forest-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-forest-700 to-emerald-600 hover:from-forest-800 hover:to-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-forest-800/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer active:scale-[0.99]"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Evaluating Corridors &amp; CO₂...</span>
          </>
        ) : (
          <>
            <Search className="w-4 h-4" />
            <span>Find Sustainable Routes</span>
          </>
        )}
      </button>
    </form>
  );
}
