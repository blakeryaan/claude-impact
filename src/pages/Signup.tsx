import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null); setBusy(true);
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) { setBusy(false); return setErr(error.message); }
    if (data.user) {
      const { error: pErr } = await supabase.from('profiles').insert({
        id: data.user.id, role: 'customer', display_name: name || 'Friend',
      });
      if (pErr) { setBusy(false); return setErr(pErr.message); }
      nav('/');
    }
  }
  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Get started</h1>
      <p className="text-sm text-stone-600">No email needed — pick a name and start applauding businesses doing good in Melbourne.</p>
      <input className="w-full border rounded p-2" placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} required />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button disabled={busy} className="w-full bg-heart-500 text-white rounded p-2 font-semibold disabled:opacity-50">
        {busy ? 'Creating…' : 'Start'}
      </button>
      <div className="text-sm text-stone-600">Running a shop? <Link to="/shop/signup" className="underline">Apply to be listed</Link></div>
    </form>
  );
}
