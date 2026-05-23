import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return setErr(error.message);
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, role: 'customer', display_name: name });
      nav('/');
    }
  }
  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">Sign up</h1>
      <input className="w-full border rounded p-2" placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="w-full border rounded p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full border rounded p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <button className="w-full bg-heart-500 text-white rounded p-2 font-semibold">Create account</button>
    </form>
  );
}
