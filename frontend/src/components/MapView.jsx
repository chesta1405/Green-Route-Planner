import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Zap, Navigation, MapPin } from 'lucide-react';

// Custom modern SVG icons using L.divIcon to avoid default leaflet 404 image bugs
const createCustomIcon = (bgColor, label, iconSvg) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background: ${bgColor};
        color: white;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        border: 2px solid white;
        font-weight: bold;
        font-size: 11px;
      ">
        ${iconSvg || label}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });
};

const startIcon = createCustomIcon(
  '#059669',
  'A',
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
);

const endIcon = createCustomIcon(
  '#E11D48',
  'B',
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`
);

const evIcon = createCustomIcon(
  '#0284C7',
  'EV',
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
);

// Helper component to auto-pan and fit bounds
function MapAutoBounds({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      try {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [bounds, map]);
  return null;
}

export default function MapView({
  source,
  destination,
  routes = [],
  selectedRouteId,
  onSelectRoute,
  chargingStations = [],
  onSelectStation,
}) {
  // Default center: Bangalore tech corridor or coordinates of source
  const center = useMemo(() => {
    if (source?.lat && source?.lng) return [source.lat, source.lng];
    return [12.9716, 77.5946];
  }, [source]);

  // Compute all points to fit bounds
  const allBounds = useMemo(() => {
    const points = [];
    if (source?.lat && source?.lng) points.push([source.lat, source.lng]);
    if (destination?.lat && destination?.lng) points.push([destination.lat, destination.lng]);

    routes.forEach((r) => {
      if (r.coordinates && r.coordinates.length > 0) {
        r.coordinates.forEach((c) => {
          // c is [lng, lat]
          points.push([c[1], c[0]]);
        });
      }
    });

    chargingStations.forEach((s) => {
      if (s.latitude && s.longitude) points.push([s.latitude, s.longitude]);
    });

    return points;
  }, [source, destination, routes, chargingStations]);

  return (
    <div className="relative w-full h-[450px] lg:h-full min-h-[420px] rounded-2xl overflow-hidden shadow-soft border border-forest-100 bg-slate-100">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapAutoBounds bounds={allBounds} />

        {/* Source Marker */}
        {source?.lat && source?.lng && (
          <Marker position={[source.lat, source.lng]} icon={startIcon}>
            <Popup>
              <div className="p-1">
                <span className="text-[10px] font-bold uppercase text-emerald-600 block">Origin</span>
                <strong className="text-xs text-slate-800">{source.name || 'Start Point'}</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destination?.lat && destination?.lng && (
          <Marker position={[destination.lat, destination.lng]} icon={endIcon}>
            <Popup>
              <div className="p-1">
                <span className="text-[10px] font-bold uppercase text-rose-600 block">Destination</span>
                <strong className="text-xs text-slate-800">{destination.name || 'End Point'}</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route Lines */}
        {routes.map((route, idx) => {
          const isSelected = route.id === selectedRouteId;
          const latLngs = route.coordinates?.map((c) => [c[1], c[0]]) || [];
          if (latLngs.length === 0) return null;

          // Color coding
          const isEco = route.preferenceLabel?.toLowerCase().includes('eco') || route.ecoScore >= 85;
          let color = isSelected ? '#10B981' : isEco ? '#059669' : '#64748B';
          if (idx === 1 && !isSelected) color = '#3B82F6';
          if (idx === 2 && !isSelected) color = '#F59E0B';

          return (
            <Polyline
              key={route.id || idx}
              positions={latLngs}
              eventHandlers={{
                click: () => onSelectRoute && onSelectRoute(route.id),
              }}
              pathOptions={{
                color: isSelected ? '#047857' : color,
                weight: isSelected ? 6 : 4,
                opacity: isSelected ? 0.95 : 0.6,
                dashArray: isSelected ? null : '6, 6',
                lineJoin: 'round',
              }}
            >
              <Popup>
                <div className="p-1 text-xs">
                  <div className="font-bold text-forest-900">{route.name}</div>
                  <div className="text-slate-600 mt-0.5">
                    {route.distanceKm} km • {route.durationMinutes} min • {route.co2Kg} kg CO₂
                  </div>
                  <div className="font-bold text-emerald-700 mt-1">
                    Eco-Score: {route.ecoScore}/100
                  </div>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* Charging Stations Markers */}
        {chargingStations.map((station) => {
          if (!station.latitude || !station.longitude) return null;
          return (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={evIcon}
              eventHandlers={{
                click: () => onSelectStation && onSelectStation(station),
              }}
            >
              <Popup>
                <div className="p-1 max-w-[200px] text-xs">
                  <div className="flex items-center gap-1 text-sky-700 font-bold">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{station.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{station.address}</p>
                  <div className="mt-1.5 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-emerald-700">{station.powerKw}</span>
                    <span className="text-slate-500">{station.distanceKm} km away</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md px-3 py-2.5 rounded-xl border border-forest-100 shadow-md text-xs space-y-1.5 pointer-events-auto">
        <span className="font-extrabold text-[11px] uppercase tracking-wider text-forest-900 block mb-1">
          Map Legend
        </span>
        <div className="flex items-center gap-2 text-slate-700">
          <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block border border-white shadow-xs"></span>
          <span>Origin (A)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <span className="w-3 h-3 rounded-full bg-rose-600 inline-block border border-white shadow-xs"></span>
          <span>Destination (B)</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <span className="w-4 h-1 rounded bg-forest-700 inline-block"></span>
          <span>Active Green Route</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <span className="w-4 h-1 border-t-2 border-dashed border-slate-500 inline-block"></span>
          <span>Alternative Corridor</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <span className="w-3 h-3 rounded-full bg-sky-600 inline-block text-[8px] text-white text-center leading-3 font-bold">⚡</span>
          <span>EV Charging Point</span>
        </div>
      </div>
    </div>
  );
}
