import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function ShopSignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [bio, setBio] = useState('');
  const [lat, setLat] = useState('-37.8136');
  const [lng, setLng] = useState('144.9631');
  const [err, setErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { setErr(error.message); setSubmitting(false); return; }
    if (!data.user) { setSubmitting(false); return; }
    await supabase.from('profiles').insert({
      id: data.user.id,
      role: 'shop',
      display_name: businessName,
    });
    const { error: bErr } = await supabase.from('businesses').insert({
      owner_id: data.user.id,
      name: businessName,
      bio,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      approved: false,
    });
    if (bErr) { setErr(bErr.message); setSubmitting(false); return; }
    nav('/shop/dashboard');
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto p-4 mt-8 space-y-3">
      <h1 className="text-2xl font-bold">Apply to be listed</h1>
      <p className="text-sm text-stone-600">
        Your business will appear on the map once an admin approves it.
      </p>
      <input
        className="w-full border border-stone-300 rounded p-2"
        placeholder="Business name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        required
      />
      <textarea
        className="w-full border border-stone-300 rounded p-2"
        placeholder="What community good do you do? (one paragraph)"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={3}
        required
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          className="border border-stone-300 rounded p-2"
          placeholder="Latitude (e.g. -37.81)"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
        <input
          className="border border-stone-300 rounded p-2"
          placeholder="Longitude (e.g. 144.96)"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </div>
      <input
        className="w-full border border-stone-300 rounded p-2"
        type="email"
        placeholder="Owner email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full border border-stone-300 rounded p-2"
        type="password"
        placeholder="Password (6+ chars)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button
        className="w-full bg-heart-500 text-white rounded p-2 font-semibold disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? 'Submitting…' : 'Apply'}
      </button>
    </form>
  );
}
