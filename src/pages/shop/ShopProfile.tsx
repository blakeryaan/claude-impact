import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { Business } from '@/types';

const ALL_SDGS = [
  'Good health', 'No poverty', 'Clean water and sanitation', 'Zero hunger',
  'Climate action', 'Affordable and clean energy', 'Quality education',
  'Decent work and economic growth', 'Gender equality',
  'Sustainable cities and communities', 'Life below water', 'Life on land',
  'Responsible consumption and production', 'Reduced inequalities',
  'Peace, justice and strong institutions',
];

export default function ShopProfilePage() {
  const { session, profile } = useAuth();
  const [b, setB] = useState<Business | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [sdgFocus, setSdgFocus] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    supabase.from('businesses').select('*').eq('owner_id', session.user.id).maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setB(data as Business);
        setName(data.name ?? '');
        setBio(data.bio ?? '');
        setLat(String(data.lat));
        setLng(String(data.lng));
        setSdgFocus(data.sdg_focus ?? []);
      });
  }, [session?.user.id]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!b) return;
    setErr(null);
    const { error } = await supabase.from('businesses').update({
      name, bio, lat: parseFloat(lat), lng: parseFloat(lng), sdg_focus: sdgFocus,
    }).eq('id', b.id);
    if (error) return setErr(error.message);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function toggleSdg(sdg: string) {
    setSdgFocus((prev) =>
      prev.includes(sdg) ? prev.filter((s) => s !== sdg) : [...prev, sdg],
    );
  }

  if (!session) return <Navigate to="/shop/login" replace />;
  if (profile?.role !== 'shop') return (
    <div className="max-w-2xl mx-auto px-5 pt-20 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">Shop accounts only.</p>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-5 pt-8 pb-5">

      <div className="eyebrow mb-2">Business portal</div>
      <h1 className="font-display text-4xl uppercase leading-none mb-8">Edit Profile</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="card p-5 space-y-4">
          <div>
            <label className="eyebrow block mb-1.5">Business name</label>
            <input
              className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
              placeholder="Business name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="eyebrow block mb-1.5">Bio</label>
            <textarea
              className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition resize-none"
              placeholder="What community good do you do?"
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
        </div>

        {/* SDG picker */}
        <div className="card p-5">
          <div className="eyebrow mb-3">SDG focus areas</div>
          <div className="flex flex-wrap gap-2">
            {ALL_SDGS.map((sdg) => (
              <button
                key={sdg}
                type="button"
                onClick={() => toggleSdg(sdg)}
                className={`font-mono text-[10px] uppercase tracking-wider rounded-pill px-2.5 py-1 border-2 transition ${
                  sdgFocus.includes(sdg)
                    ? 'bg-coral text-ink border-coral'
                    : 'bg-transparent text-muted border-muted hover:border-ink hover:text-ink'
                }`}
              >
                {sdg}
              </button>
            ))}
          </div>
        </div>

        {err && (
          <div className="font-mono text-xs text-coral border border-coral rounded-sm px-3 py-2">{err}</div>
        )}
        {saved && (
          <div className="font-mono text-xs text-coral border border-coral rounded-sm px-3 py-2">Saved!</div>
        )}

        <div className="flex gap-3 items-center">
          <button className="btn-primary px-5 py-2.5 font-display uppercase">Save changes</button>
          <Link to="/shop/dashboard" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition">
            ← Dashboard
          </Link>
        </div>
      </form>
    </div>
  );
}
