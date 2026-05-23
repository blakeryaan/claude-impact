import { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

export type PlaceResult = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  placeId: string;
  photoUrl: string | null;
};

export default function PlacesAutocomplete({ onPick }: { onPick: (p: PlaceResult) => void }) {
  const ref = useRef<google.maps.places.Autocomplete | null>(null);
  function onLoad(a: google.maps.places.Autocomplete) { ref.current = a; }
  function onPlaceChanged() {
    const place = ref.current?.getPlace();
    if (!place || !place.geometry?.location) return;
    onPick({
      name: place.name ?? '',
      address: place.formatted_address ?? '',
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      placeId: place.place_id ?? '',
      photoUrl: place.photos?.[0]?.getUrl({ maxWidth: 800, maxHeight: 600 }) ?? null,
    });
  }
  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      options={{
        componentRestrictions: { country: 'au' },
        fields: ['name', 'formatted_address', 'geometry', 'place_id', 'photos'],
      }}
    >
      <input className="w-full border rounded p-2" placeholder="Search your business on Google…" />
    </Autocomplete>
  );
}
