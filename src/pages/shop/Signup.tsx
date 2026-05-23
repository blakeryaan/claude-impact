import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import PlacesAutocomplete, { PlaceResult } from '@/components/PlacesAutocomplete';

export default function ShopSignupPage() {
  const nav = useNavigate();
  const [place, setPlace] = useState<PlaceResult | null>(null);
  const [bio, setBio] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault(); setErr(null);
    if (!place) return setErr('Pick your business from the search dropdown first.');
    setBusy(true);
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) { setBusy(false); return setErr(error.message); }
    if (!data.user) { setBusy(false); return; }
    const { error: pErr } = await supabase.from('profiles').insert({
      id: data.user.id, role: 'shop', display_name: place.name,
    });
    if (pErr) { setBusy(false); return setErr(pErr.message); }
    const { error: bErr } = await supabase.from('businesses').insert({
      owner_id: data.user.id,
      name: place.name,
      bio,
      lat: place.lat,
      lng: place.lng,
      address: place.address,
      google_place_id: place.placeId,
      photo_url: place.photoUrl,
      approved: false,
    });
    if (bErr) { setBusy(false); return setErr(bErr.message); }
    nav('/shop/dashboard');
  }
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Apply to be listed</h1>
      <p className="text-sm text-stone-600">Your business will appear on the map once an admin approves it. No email needed for the demo.</p>
      <label className="block">
        <span className="text-sm font-medium">Find your business</span>
        <PlacesAutocomplete onPick={setPlace} />
      </label>
      {place && (
        <div className="text-sm bg-stone-100 rounded p-2">
          <div className="font-semibold">{place.name}</div>
          <div className="text-stone-600">{place.address}</div>
        </div>
      )}
      <textarea className="w-full border rounded p-2" placeholder="Tell us what you do for the community" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} required />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button disabled={busy} className="w-full bg-heart-500 text-white rounded p-2 font-semibold disabled:opacity-50">
        {busy ? 'Submitting…' : 'Apply'}
      </button>
    </form>
  );
}
