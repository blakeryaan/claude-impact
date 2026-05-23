import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useGeolocation } from '@/hooks/useGeolocation';
import { haversineKm } from '@/lib/haversine';
import BusinessCard from '@/components/BusinessCard';
import type { BusinessWithPoints } from '@/types';

const MELBOURNE_CBD = { lat: -37.8136, lng: 144.9631 };

const businessIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function RecenterMap({ coords }: { coords: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    map.setView([coords.lat, coords.lng], map.getZoom());
  }, [coords.lat, coords.lng, map]);
  return null;
}

export default function MapPage() {
  const [businesses, setBusinesses] = useState<BusinessWithPoints[]>([]);
  const { coords, denied } = useGeolocation();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('businesses')
        .select('*')
        .eq('approved', true);
      const { data: pts } = await supabase.from('business_heart_points').select('*');
      if (!data) return;
      const ptsMap = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (pts ?? []).map((r: any) => [r.business_id, r]),
      );
      setBusinesses(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data as any[]).map((row) => ({
          ...row,
          heart_points: ptsMap[row.id]?.heart_points ?? 0,
          contribution_count: ptsMap[row.id]?.contribution_count ?? 0,
        })),
      );
    })();
  }, []);

  const centre = coords ?? MELBOURNE_CBD;

  const nearby = useMemo(() => {
    if (!coords) return [];
    return businesses
      .map((b) => ({ b, d: haversineKm(coords.lat, coords.lng, b.lat, b.lng) }))
      .sort((a, z) => a.d - z.d)
      .slice(0, 5);
  }, [coords, businesses]);

  const sidebarItems = coords
    ? nearby.map(({ b, d }) => ({ b, d }))
    : businesses.slice(0, 10).map((b) => ({ b, d: undefined as number | undefined }));

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-[2fr_1fr] gap-4">
      <div className="h-[70vh] rounded-xl overflow-hidden shadow">
        <MapContainer
          center={[centre.lat, centre.lng]}
          zoom={14}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap coords={centre} />
          {businesses.map((b) => (
            <Marker key={b.id} position={[b.lat, b.lng]} icon={businessIcon}>
              <Popup>
                <div className="text-sm">
                  <strong className="block">{b.name}</strong>
                  <span className="text-heart-600">♥ {b.heart_points}</span>
                  <br />
                  <Link to={`/business/${b.id}`} className="underline text-blue-600">
                    View profile →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <aside>
        <h2 className="font-semibold mb-2 text-stone-700">
          {coords ? 'Nearby' : denied ? 'All businesses' : 'Locating…'}
        </h2>
        <div className="space-y-2">
          {sidebarItems.map(({ b, d }) => (
            <BusinessCard key={b.id} b={b} distanceKm={d} />
          ))}
        </div>
        {!coords && !denied && (
          <p className="text-xs text-stone-500 mt-2">
            Allow location access to see nearby businesses.
          </p>
        )}
      </aside>
    </div>
  );
}
