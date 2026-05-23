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
  if (profile?.role !== 'shop') return <div className="p-8">Shop accounts only.</div>;

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Edit business profile</h1>
      <input
        className="w-full border border-stone-300 rounded p-2"
        placeholder="Business name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        className="w-full border border-stone-300 rounded p-2"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={3}
        required
      />
      <div className="grid grid-cols-2 gap-2">
        <input className="border border-stone-300 rounded p-2" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} required />
        <input className="border border-stone-300 rounded p-2" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} required />
      </div>
      <div>
        <div className="text-sm font-medium mb-1">SDG focus areas</div>
        <div className="flex flex-wrap gap-2">
          {ALL_SDGS.map((sdg) => (
            <button
              key={sdg}
              type="button"
              onClick={() => toggleSdg(sdg)}
              className={`text-xs rounded-full px-2 py-0.5 border transition ${
                sdgFocus.includes(sdg)
                  ? 'bg-heart-500 text-white border-heart-500'
                  : 'bg-white border-stone-300 hover:bg-stone-100'
              }`}
            >
              {sdg}
            </button>
          ))}
        </div>
      </div>
      {err && <div className="text-red-600 text-sm">{err}</div>}
      {saved && <div className="text-green-600 text-sm">Saved!</div>}
      <button className="bg-heart-500 text-white rounded px-4 py-2 font-semibold">Save</button>
      <p className="text-sm text-stone-500">
        <Link to="/shop/dashboard" className="underline">← Back to dashboard</Link>
      </p>
    </form>
  );
}
