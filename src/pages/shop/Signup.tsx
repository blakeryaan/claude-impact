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
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <div className="eyebrow mb-1">Business portal</div>
          <h1 className="font-display text-4xl uppercase leading-none mb-1">Apply to be listed</h1>
          <p className="font-serif italic text-muted text-sm">
            You'll appear on the map once an admin approves your application.
          </p>
        </div>

        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          <div>
            <label className="eyebrow block mb-1.5">Business name</label>
            <input
              className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
              placeholder="Brunswick Bike Co."
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="eyebrow block mb-1.5">What community good do you do?</label>
            <textarea
              className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition resize-none"
              placeholder="One paragraph describing your impact…"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="eyebrow block mb-1.5">Latitude</label>
              <input
                className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
                placeholder="-37.81"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="eyebrow block mb-1.5">Longitude</label>
              <input
                className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
                placeholder="144.96"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="border-t-2 border-ink/20 pt-4">
            <div className="eyebrow mb-3">Account details</div>
            <div className="space-y-3">
              <div>
                <label className="eyebrow block mb-1.5">Owner email</label>
                <input
                  className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
                  type="email"
                  placeholder="owner@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="eyebrow block mb-1.5">Password</label>
                <input
                  className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
                  type="password"
                  placeholder="6+ characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>
          {err && (
            <div className="font-mono text-xs text-coral border border-coral rounded-sm px-3 py-2">{err}</div>
          )}
          <button
            className="btn-primary w-full py-3 font-display text-lg uppercase disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Apply'}
          </button>
        </form>
      </div>
    </div>
  );
}
