import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function ShopLoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  async function onSubmit(e: FormEvent) {
    e.preventDefault(); setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setErr(error.message);
    nav('/shop/dashboard');
  }
  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Shop login</h1>
      <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button className="w-full bg-heart-500 text-white rounded p-2 font-semibold">Sign in</button>
      <div className="text-sm text-stone-600">No account? <Link to="/shop/signup" className="underline">Apply to be listed</Link></div>
      <div className="text-sm text-stone-600">Customer? <Link to="/login" className="underline">Customer login</Link></div>
    </form>
  );
}
