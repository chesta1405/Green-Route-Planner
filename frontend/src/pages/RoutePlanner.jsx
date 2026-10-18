import React, { useState, useEffect } from 'react';
import RouteSearchForm from '../components/RouteSearchForm';
import MapView from '../components/MapView';
import RouteCard from '../components/RouteCard';
import RouteComparisonChart from '../components/RouteComparisonChart';
import EmissionsSummary from '../components/EmissionsSummary';
import WeatherCard from '../components/WeatherCard';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import {
  planRoute,
  getNearbyChargingStations,
  getWeather,
  saveRouteHistory
} from '../services/api';
import {
  CheckCircle,
  Zap,
  Leaf,
  Navigation,
  Compass,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export default function RoutePlanner() {
  const [searchParams, setSearchParams] = useState({
    sourceName: 'Central Railway Station, Bangalore',
    sourceLat: 12.9784,
    sourceLng: 77.5684,
    destinationName: 'Eco Tech Park, Bangalore',
    destinationLat: 12.9352,
    destinationLng: 77.6245,
    travelMode: 'EV',
    routePreference: 'ECO_FRIENDLY',
    vehicleOccupancy: 1,
  });

  const [routePlanData, setRoutePlanData] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [chargingStations, setChargingStations] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Initial load calculation
  useEffect(() => {
    executeRoutePlanning(searchParams);
  }, []);

  const executeRoutePlanning = async (params) => {
    setIsLoading(true);
    setError(null);
    setSaveSuccessMsg('');
    try {
      // 1. Plan routes
      const plan = await planRoute(params);
      setRoutePlanData(plan);

      // Select recommended or first route
      const initialRouteId = plan?.recommendedRoute?.id || (plan?.routes?.[0]?.id ?? null);
      setSelectedRouteId(initialRouteId);

      // 2. Fetch nearby charging stations if EV mode or general search
      const stations = await getNearbyChargingStations(params.destinationLat, params.destinationLng, 8000);
      setChargingStations(stations);

      // 3. Fetch weather for destination
      const weather = await getWeather(params.destinationLat, params.destinationLng, params.destinationName);
      setWeatherData(weather);

      setSearchParams(params);
    } catch (err) {
      console.error('Route planning error:', err);
      setError('Unable to calculate routes for the given locations. Please verify endpoints.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTrip = async (route) => {
    if (!route || !searchParams) return;
    try {
      await saveRouteHistory({
        sessionId: 'demo-session',
        sourceName: searchParams.sourceName,
        sourceLat: searchParams.sourceLat,
        sourceLng: searchParams.sourceLng,
        destinationName: searchParams.destinationName,
        destinationLat: searchParams.destinationLat,
        destinationLng: searchParams.destinationLng,
        travelMode: searchParams.travelMode,
        routePreference: searchParams.routePreference,
        distanceKm: route.distanceKm,
        durationMinutes: route.durationMinutes,
        co2Kg: route.co2Kg,
        ecoScore: route.ecoScore,
        co2SavedKg: route.co2SavedKg,
        notes: `Selected ${route.name} (${route.algorithmUsed})`,
      });
      setSaveSuccessMsg(`Journey saved! View cumulative carbon savings in the Dashboard.`);
      setTimeout(() => setSaveSuccessMsg(''), 5000);
    } catch (e) {
      console.error('Failed to save route:', e);
    }
  };

  const activeRoute = routePlanData?.routes?.find((r) => r.id === selectedRouteId) || routePlanData?.routes?.[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-forest-100 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight flex items-center gap-2.5">
            <Navigation className="w-7 h-7 text-emerald-600" />
            Interactive Green Route Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compare route alternatives, evaluate carbon footprints, and discover nearby charging infrastructure.
          </p>
        </div>

        {saveSuccessMsg && (
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-xl text-xs font-semibold border border-emerald-300 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}
      </div>

      {error && <ErrorMessage title="Routing Notice" message={error} onRetry={() => executeRoutePlanning(searchParams)} />}

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search Form, Weather & Route Options Cards */}
        <div className="lg:col-span-5 space-y-5">
          {/* Search Form */}
          <RouteSearchForm onSearch={executeRoutePlanning} isLoading={isLoading} />

          {/* Weather Widget */}
          {weatherData && <WeatherCard weather={weatherData} />}

          {/* Loading Indicator */}
          {isLoading && <LoadingState message="Querying OSRM road vectors and computing A* graph eco-weights..." />}

          {/* Route Alternatives List */}
          {!isLoading && routePlanData?.routes && routePlanData.routes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-forest-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-forest-700" />
                  Available Route Options ({routePlanData.routes.length})
                </h3>
                <span className="text-[11px] text-slate-500">Click a route to view on map</span>
              </div>

              <div className="space-y-3">
                {routePlanData.routes.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    isSelected={route.id === selectedRouteId}
                    onSelect={() => setSelectedRouteId(route.id)}
                    onViewOnMap={() => setSelectedRouteId(route.id)}
                    onSave={handleSaveTrip}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Leaflet Map & Environmental Details */}
        <div className="lg:col-span-7 space-y-5">
          {/* Large Leaflet Map */}
          <div className="sticky top-20 z-10">
            <MapView
              source={{
                lat: searchParams.sourceLat,
                lng: searchParams.sourceLng,
                name: searchParams.sourceName,
              }}
              destination={{
                lat: searchParams.destinationLat,
                lng: searchParams.destinationLng,
                name: searchParams.destinationName,
              }}
              routes={routePlanData?.routes || []}
              selectedRouteId={selectedRouteId}
              onSelectRoute={(id) => setSelectedRouteId(id)}
              chargingStations={chargingStations}
              onSelectStation={(st) => {
                alert(`EV Station: ${st.name}\n${st.address}\nPower: ${st.powerKw}\nConnectors: ${st.connectorTypes}`);
              }}
            />
          </div>

          {/* Active Route Detailed Environmental Breakdown */}
          {activeRoute && (
            <EmissionsSummary
              selectedRoute={activeRoute}
              travelMode={searchParams.travelMode}
              occupancy={searchParams.vehicleOccupancy}
            />
          )}

          {/* Multi-Route Recharts Bar Chart */}
          {routePlanData?.routes && routePlanData.routes.length > 1 && (
            <RouteComparisonChart routes={routePlanData.routes} />
          )}
        </div>
      </div>
    </div>
  );
}
