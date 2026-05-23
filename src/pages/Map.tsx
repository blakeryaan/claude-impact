import { useEffect, useMemo, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { supabase } from '@/lib/supabase';
import { useGeolocation } from '@/hooks/useGeolocation';
import { haversineKm } from '@/lib/haversine';
import BusinessCard from '@/components/BusinessCard';
import type { BusinessWithPoints } from '@/types';

const MELBOURNE_CBD = { lat: -37.8136, lng: 144.9631 };

export default function MapPage() {
  const [businesses, setBusinesses] = useState<BusinessWithPoints[]>([]);
  const [selected, setSelected] = useState<BusinessWithPoints | null>(null);
  const { coords, denied } = useGeolocation();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('businesses')
        .select('*, business_heart_points!inner(heart_points, contribution_count)')
        .eq('approved', true);
      if (!data) return;
      setBusinesses(
        data.map((row: any) => ({
          ...row,
          heart_points: row.business_heart_points.heart_points,
          contribution_count: row.business_heart_points.contribution_count,
        })),
      );
    })();
  }, []);

  const centre = coords ?? MELBOURNE_CBD;
  const nearby = useMemo(() => {
    if (!coords) return [];
    return businesses
      .map((b) => ({ b, d: haversineKm(coords.lat, coords.lng, b.lat, b.lng) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 5);
  }, [coords, businesses]);

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-[2fr_1fr] gap-4">
      <div className="h-[70vh] rounded-xl overflow-hidden shadow">
        <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={centre} zoom={13}>
          {coords && (
            <Marker
              position={coords}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#fff',
                strokeWeight: 2,
              }}
            />
          )}
          {businesses.map((b) => (
            <Marker key={b.id} position={{ lat: b.lat, lng: b.lng }} onClick={() => setSelected(b)} />
          ))}
          {selected && (
            <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
              <div style={{ maxWidth: 220 }}>
                <strong>{selected.name}</strong>
                <div>♥ {selected.heart_points}</div>
                <a href={`/business/${selected.id}`}>View profile →</a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <aside>
        <h2 className="font-semibold mb-2">
          {coords ? 'Nearby' : denied ? 'All businesses' : 'Locating...'}
        </h2>
        <div className="space-y-2">
          {(coords
            ? nearby.map((n) => ({ b: n.b, d: n.d }))
            : businesses.slice(0, 10).map((b) => ({ b, d: undefined as number | undefined }))
          ).map(({ b, d }) => (
            <BusinessCard key={b.id} b={b} distanceKm={d} />
          ))}
        </div>
      </aside>
    </div>
  );
}
