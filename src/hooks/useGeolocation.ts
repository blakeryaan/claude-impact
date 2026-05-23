import { useEffect, useState } from 'react';

export type Coords = { lat: number; lng: number };

export function useGeolocation(): { coords: Coords | null; denied: boolean } {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) { setDenied(true); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setDenied(true),
      { timeout: 3000, maximumAge: 60000 },
    );
  }, []);

  return { coords, denied };
}
