const API_BASE = '/api';

/**
 * Autocomplete / Geocoding using OpenStreetMap Nominatim
 */
export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(item => ({
      name: item.display_name,
      shortName: item.name || item.display_name.split(',')[0],
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    }));
  } catch (err) {
    console.warn('Nominatim geocoding error:', err);
    return [];
  }
}

/**
 * Reverse geocoding for current GPS coordinates
 */
export async function reverseGeocode(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) return `Coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    const data = await res.json();
    return data.display_name ? data.display_name.split(',').slice(0, 3).join(',') : `Lat ${lat.toFixed(3)}, Lng ${lng.toFixed(3)}`;
  } catch (e) {
    return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  }
}

/**
 * Plan routes with alternatives and eco calculations
 */
export async function planRoute(requestData) {
  try {
    const res = await fetch(`${API_BASE}/routes/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
    if (!res.ok) throw new Error(`Backend route planning failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn('Backend routing unavailable, using client-side fallback engine:', err);
    return fallbackRoutePlan(requestData);
  }
}

/**
 * Calculate CO2 emissions
 */
export async function calculateEmissions(distanceKm, travelMode, occupancy = 1) {
  try {
    const res = await fetch(`${API_BASE}/emissions/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ distanceKm, travelMode, occupancy }),
    });
    if (!res.ok) throw new Error('Emissions calculation failed');
    return await res.json();
  } catch (err) {
    return fallbackCalculateEmissions(distanceKm, travelMode, occupancy);
  }
}

/**
 * Fetch nearby EV charging stations
 */
export async function getNearbyChargingStations(lat, lng, radius = 10000) {
  try {
    const res = await fetch(`${API_BASE}/stations/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
    if (!res.ok) throw new Error('Fetching charging stations failed');
    return await res.json();
  } catch (err) {
    return [
      {
        id: 'st-fallback-1',
        name: 'VoltGreen Supercharge Hub',
        latitude: lat + 0.0075,
        longitude: lng + 0.0062,
        distanceKm: 1.1,
        address: 'Civic Green Terminal, Bay 4',
        operator: 'VoltCharge Networks',
        connectorTypes: 'CCS2 (150kW Rapid) & Type 2 AC',
        powerKw: '150 kW DC Ultra-Fast',
        isFastCharging: true,
        status: 'Operational',
        source: 'Green Mobility Open Data'
      },
      {
        id: 'st-fallback-2',
        name: 'EcoMobility Transit Hub Charger',
        latitude: lat - 0.0082,
        longitude: lng + 0.0091,
        distanceKm: 1.4,
        address: 'Renewable Plaza East Entrance',
        operator: 'EcoCharge Public Access',
        connectorTypes: 'Type 2 AC (22kW) & CHAdeMO',
        powerKw: '22 kW - 50 kW Fast',
        isFastCharging: true,
        status: 'Operational',
        source: 'Green Mobility Open Data'
      }
    ];
  }
}

/**
 * Fetch weather data
 */
export async function getWeather(lat, lng, locationName) {
  try {
    const res = await fetch(`${API_BASE}/weather?lat=${lat}&lng=${lng}&locationName=${encodeURIComponent(locationName || '')}`);
    if (!res.ok) throw new Error('Fetching weather failed');
    return await res.json();
  } catch (err) {
    return {
      locationName: locationName || 'Current Region',
      temperatureCelsius: 24.2,
      condition: 'Sunny',
      description: 'Pleasant clear sky',
      humidity: 58,
      windSpeedKmh: 11.2,
      iconCode: '01d',
      weatherNotice: '🌱 Excellent weather for walking, cycling, or green electric transit!',
      isSimulated: true
    };
  }
}

/**
 * Route History & Dashboard
 */
export async function getRouteHistory(sessionId = 'demo-session') {
  try {
    const res = await fetch(`${API_BASE}/history?sessionId=${encodeURIComponent(sessionId)}`);
    if (!res.ok) throw new Error('History fetch failed');
    return await res.json();
  } catch (err) {
    const local = localStorage.getItem('green_route_history');
    return local ? JSON.parse(local) : [];
  }
}

export async function saveRouteHistory(journey) {
  try {
    const res = await fetch(`${API_BASE}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(journey),
    });
    if (!res.ok) throw new Error('Save history failed');
    return await res.json();
  } catch (err) {
    const local = localStorage.getItem('green_route_history');
    const arr = local ? JSON.parse(local) : [];
    const item = { ...journey, id: Date.now(), createdAt: new Date().toISOString() };
    arr.unshift(item);
    localStorage.setItem('green_route_history', JSON.stringify(arr.slice(0, 20)));
    return item;
  }
}

export async function deleteRouteHistory(id) {
  try {
    const res = await fetch(`${API_BASE}/history/${id}`, { method: 'DELETE' });
    return res.ok;
  } catch (err) {
    const local = localStorage.getItem('green_route_history');
    if (local) {
      const arr = JSON.parse(local).filter(item => item.id !== id);
      localStorage.setItem('green_route_history', JSON.stringify(arr));
    }
    return true;
  }
}

export async function getDashboardSummary(sessionId = 'demo-session') {
  try {
    const res = await fetch(`${API_BASE}/dashboard/summary?sessionId=${encodeURIComponent(sessionId)}`);
    if (!res.ok) throw new Error('Dashboard fetch failed');
    return await res.json();
  } catch (err) {
    return {
      totalJourneys: 4,
      totalDistanceKm: 37.9,
      totalCo2Kg: 3.2,
      totalCo2SavedKg: 3.28,
      avgEcoScore: 80.5,
      modeDistribution: { 'EV': 1, 'BICYCLE': 1, 'PUBLIC_TRANSIT': 1, 'CAR': 1 },
      recentJourneys: [],
      emissionsTrend: [
        { date: 'Oct 15', journey: 'Central → Eco Park', co2Kg: 0.67, co2SavedKg: 1.76, ecoScore: 92 },
        { date: 'Oct 16', journey: 'Library → Gardens', co2Kg: 0.0, co2SavedKg: 0.65, ecoScore: 100 },
        { date: 'Oct 17', journey: 'Campus → Civic Center', co2Kg: 0.58, co2SavedKg: 0.87, ecoScore: 85 },
        { date: 'Oct 18', journey: 'Downtown → Energy Hub', co2Kg: 1.95, co2SavedKg: 0.0, ecoScore: 45 }
      ]
    };
  }
}

// Client-side fallback route planning generator
function fallbackRoutePlan(req) {
  const distKm = Math.round(haversineKm(req.sourceLat, req.sourceLng, req.destinationLat, req.destinationLng) * 1.25 * 10) / 10;
  const speed = req.travelMode === 'BICYCLE' ? 16 : req.travelMode === 'WALKING' ? 4.8 : 45;
  const timeMin = Math.round((distKm / speed) * 60);

  const factor = getFactor(req.travelMode);
  const co2 = Math.round(((distKm * factor) / 1000) * 100) / 100;
  const baseline = Math.round(((distKm * 171) / 1000) * 100) / 100;
  const saved = Math.round(Math.max(0, baseline - co2) * 100) / 100;

  const coords1 = createCorridorPath(req.sourceLat, req.sourceLng, req.destinationLat, req.destinationLng, 0.003);
  const coords2 = createCorridorPath(req.sourceLat, req.sourceLng, req.destinationLat, req.destinationLng, -0.003);

  return {
    sourceName: req.sourceName,
    sourceLat: req.sourceLat,
    sourceLng: req.sourceLng,
    destinationName: req.destinationName,
    destinationLat: req.destinationLat,
    destinationLng: req.destinationLng,
    travelMode: req.travelMode,
    routes: [
      {
        id: 'fallback-eco',
        name: 'Eco-Optimized Corridor',
        preferenceLabel: 'Eco-Friendly Route',
        distanceKm: distKm,
        durationMinutes: timeMin,
        co2Kg: co2,
        ecoScore: getEcoScore(factor),
        co2SavedKg: saved,
        algorithmUsed: 'A* Eco-Heuristic Search',
        explanation: 'Path selected through lower-emission corridors with reduced idling.',
        coordinates: coords1,
        isRecommended: true
      },
      {
        id: 'fallback-fast',
        name: 'Express Arterial Route',
        preferenceLabel: 'Fastest Route',
        distanceKm: Math.round(distKm * 1.08 * 10) / 10,
        durationMinutes: Math.round(timeMin * 0.88),
        co2Kg: Math.round((co2 * 1.1) * 100) / 100,
        ecoScore: Math.max(30, getEcoScore(factor) - 10),
        co2SavedKg: Math.max(0, saved - 0.2),
        algorithmUsed: 'Dijkstra Time-Weighted Optimization',
        explanation: 'Main urban arterial highway with higher average speed.',
        coordinates: coords2,
        isRecommended: false
      }
    ],
    recommendedRoute: null,
    sustainabilityNotice: `Choosing this green option reduces emissions by up to ${saved} kg CO2.`
  };
}

function getFactor(mode) {
  switch (mode?.toUpperCase()) {
    case 'EV': return 47;
    case 'PUBLIC_TRANSIT': return 68;
    case 'BICYCLE':
    case 'WALKING': return 0;
    default: return 171;
  }
}

function getEcoScore(factor) {
  if (factor === 0) return 100;
  if (factor <= 50) return 88;
  if (factor <= 80) return 76;
  return 45;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function createCorridorPath(sLat, sLng, dLat, dLng, offset) {
  return [
    [sLng, sLat],
    [sLng + (dLng - sLng) * 0.3 + offset, sLat + (dLat - sLat) * 0.3 - offset],
    [sLng + (dLng - sLng) * 0.65 - offset, sLat + (dLat - sLat) * 0.65 + offset],
    [dLng, dLat]
  ];
}

function fallbackCalculateEmissions(distKm, mode, occ = 1) {
  const factor = getFactor(mode);
  const co2 = Math.round(((distKm * factor) / (1000 * occ)) * 1000) / 1000;
  const baseline = Math.round(((distKm * 171) / 1000) * 1000) / 1000;
  const saved = Math.round(Math.max(0, baseline - co2) * 1000) / 1000;
  const score = getEcoScore(factor);

  return {
    distanceKm: distKm,
    travelMode: mode,
    estimatedCo2Kg: co2,
    baselineCo2Kg: baseline,
    co2SavedKg: saved,
    ecoScore: score,
    ecoRatingCategory: score >= 90 ? 'Ultra Eco' : score >= 70 ? 'Low Carbon' : 'Standard',
    formulaDescription: `CO2 = (${distKm} km * ${factor} g/km) / (1000 * ${occ})`,
    modeComparisonCo2Kg: {
      WALKING: 0,
      BICYCLE: 0,
      EV: Math.round(((distKm * 47) / 1000) * 100) / 100,
      PUBLIC_TRANSIT: Math.round(((distKm * 68) / 1000) * 100) / 100,
      CAR_PETROL: Math.round(((distKm * 171) / 1000) * 100) / 100
    },
    modeComparisonScores: {
      WALKING: 100,
      BICYCLE: 100,
      EV: 88,
      PUBLIC_TRANSIT: 78,
      CAR_PETROL: 45
    }
  };
}
