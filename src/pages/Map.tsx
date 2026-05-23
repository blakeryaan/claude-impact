import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { supabase } from '@/lib/supabase';
import { useGeolocation } from '@/hooks/useGeolocation';
import { haversineKm } from '@/lib/haversine';
import BusinessCard from '@/components/BusinessCard';
import type { BusinessWithPoints } from '@/types';

const CBD = { lat: -37.8136, lng: 144.9631 };

// Guidelines: coral fill, 2px ink border, 32px
function bizIcon(name: string) {
  return new DivIcon({
    html: `<div style="width:32px;height:32px;background:#E84E1B;border:2px solid #1C1A17;border-radius:50%;color:#1C1A17;display:flex;align-items:center;justify-content:center;font-family:Anton,Impact,sans-serif;font-size:14px;">${name[0].toUpperCase()}</div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

const userIcon = new DivIcon({
  html: `<div style="width:14px;height:14px;background:#1C1A17;border:2px solid #F2EDE3;border-radius:50%;box-shadow:0 0 0 3px rgba(28,26,23,0.2);"></div>`,
  className: '',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
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

  const centre = coords ?? CBD;

  const nearby = useMemo(() => {
    if (!coords) return [];
    return businesses
      .map((b) => ({ b, d: haversineKm(coords.lat, coords.lng, b.lat, b.lng) }))
      .sort((a, z) => a.d - z.d)
      .slice(0, 8);
  }, [coords, businesses]);

  const strip = coords
    ? nearby
    : businesses.slice(0, 8).map((b) => ({ b, d: undefined as number | undefined }));

  return (
    <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr] md:gap-4 md:p-5 md:max-w-6xl md:mx-auto h-[calc(100dvh-3.5rem-4rem)] md:h-auto">

      {/* Map */}
      <div className="relative flex-1 md:h-[76vh] overflow-hidden border-b-2 md:border-2 border-ink md:rounded-md">
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
          {coords && <Marker position={[coords.lat, coords.lng]} icon={userIcon} />}
          {businesses.map((b) => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={bizIcon(b.name)}>
              <Popup>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', minWidth: 160 }}>
                  <div style={{ fontFamily: 'Anton, Impact, sans-serif', fontSize: 14, textTransform: 'uppercase', marginBottom: 2 }}>{b.name}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#E84E1B' }}>♥ {b.heart_points} pts</div>
                  <a href={`/business/${b.id}`} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#1C1A17', textDecoration: 'underline', display: 'block', marginTop: 6 }}>
                    View profile →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Business count pill */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 bg-paper border-2 border-ink rounded-pill px-4 py-1 font-mono text-xs uppercase tracking-widest">
          {businesses.length} businesses · Melbourne CBD
        </div>
      </div>

      {/* Nearby strip */}
      <aside className="md:overflow-y-auto">
        <div className="px-4 pt-3 pb-1 md:px-0 md:pt-0">
          <div className="eyebrow mb-2">
            {coords ? 'Nearby' : denied ? 'Businesses' : 'Locating…'}
          </div>
        </div>
        {/* Mobile: horizontal */}
        <div className="scroll-strip px-4 md:hidden">
          {strip.map(({ b, d }) => (
            <div key={b.id} className="w-52 shrink-0">
              <BusinessCard b={b} distanceKm={d} />
            </div>
          ))}
        </div>
        {/* Desktop: vertical */}
        <div className="hidden md:flex flex-col gap-2">
          {strip.map(({ b, d }) => (
            <BusinessCard key={b.id} b={b} distanceKm={d} />
          ))}
        </div>
      </aside>
    </div>
  );
}
