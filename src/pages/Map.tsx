import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useGeolocation } from '@/hooks/useGeolocation';
import { haversineKm } from '@/lib/haversine';
import BusinessCard from '@/components/BusinessCard';
import type { BusinessWithPoints } from '@/types';

const MELBOURNE_CBD = { lat: -37.8136, lng: 144.9631 };

function businessMarkerIcon(name: string) {
  return new DivIcon({
    html: `<div style="width:34px;height:34px;background:#ef4444;border-radius:50%;color:white;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:15px;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2px solid white;">${name[0].toUpperCase()}</div>`,
    className: '',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
}

const userDot = new DivIcon({
  html: `<div style="width:16px;height:16px;background:#2563eb;border-radius:50%;box-shadow:0 0 0 4px rgba(37,99,235,0.25);border:2px solid white;"></div>`,
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function RecenterMap({ coords }: { coords: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => { map.setView([coords.lat, coords.lng], map.getZoom()); }, [coords.lat, coords.lng, map]);
  return null;
}

export default function MapPage() {
  const [businesses, setBusinesses] = useState<BusinessWithPoints[]>([]);
  const { coords, denied } = useGeolocation();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('businesses').select('*').eq('approved', true);
      const { data: pts } = await supabase.from('business_heart_points').select('*');
      if (!data) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ptsMap = Object.fromEntries((pts ?? []).map((r: any) => [r.business_id, r]));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setBusinesses((data as any[]).map((row) => ({
        ...row,
        heart_points: ptsMap[row.id]?.heart_points ?? 0,
        contribution_count: ptsMap[row.id]?.contribution_count ?? 0,
      })));
    })();
  }, []);

  const centre = coords ?? MELBOURNE_CBD;

  const nearby = useMemo(() => {
    if (!coords) return [];
    return businesses
      .map((b) => ({ b, d: haversineKm(coords.lat, coords.lng, b.lat, b.lng) }))
      .sort((a, z) => a.d - z.d)
      .slice(0, 8);
  }, [coords, businesses]);

  const sidebarItems = coords
    ? nearby
    : businesses.slice(0, 8).map((b) => ({ b, d: undefined as number | undefined }));

  return (
    <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] md:gap-4 md:p-4 md:max-w-6xl md:mx-auto h-[calc(100vh-3.5rem-5rem)] md:h-auto">

      {/* Map */}
      <div className="relative flex-1 md:h-[75vh] md:rounded-2xl overflow-hidden shadow-card">
        <MapContainer
          center={[centre.lat, centre.lng]}
          zoom={14}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap coords={centre} />
          {coords && <Marker position={[coords.lat, coords.lng]} icon={userDot} />}
          {businesses.map((b) => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={businessMarkerIcon(b.name)}>
              <Popup>
                <div className="text-sm min-w-[160px]">
                  <div className="font-bold mb-0.5">{b.name}</div>
                  <div className="text-heart-600 font-semibold text-xs mb-1">♥ {b.heart_points} pts</div>
                  <Link to={`/business/${b.id}`} className="text-blue-600 underline text-xs">
                    View profile →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-card text-xs font-semibold text-stone-700">
          {businesses.length} businesses · Melbourne
        </div>
      </div>

      {/* Nearby strip — horizontal on mobile, vertical sidebar on desktop */}
      <aside className="md:overflow-y-auto">
        <div className="px-4 pt-3 pb-1 md:px-0 md:pt-0">
          <h2 className="text-sm font-bold text-stone-500 uppercase tracking-wide mb-2">
            {coords ? 'Nearby' : denied ? 'Businesses' : 'Locating…'}
          </h2>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="scroll-strip px-4 md:hidden">
          {sidebarItems.map(({ b, d }) => (
            <div key={b.id} className="w-52 shrink-0">
              <BusinessCard b={b} distanceKm={d} />
            </div>
          ))}
        </div>

        {/* Desktop: vertical list */}
        <div className="hidden md:flex flex-col gap-2">
          {sidebarItems.map(({ b, d }) => (
            <BusinessCard key={b.id} b={b} distanceKm={d} />
          ))}
        </div>
      </aside>
    </div>
  );
}
