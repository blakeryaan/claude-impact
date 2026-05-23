import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { setLoading(false); return setErr(error.message); }
    if (data.user) {
      await supabase.from('profiles').insert({ id: data.user.id, role: 'customer', display_name: name });
      nav('/');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-heart-500 text-3xl">♥</span>
            <span className="font-black text-2xl">Good Sh*t</span>
          </div>
          <p className="text-stone-500 text-sm">Join Melbourne's community impact map</p>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-card border border-stone-100 p-6 space-y-4">
          {[
            { label: 'Display name', type: 'text', val: name, set: setName, ph: 'Jane Smith' },
            { label: 'Email', type: 'email', val: email, set: setEmail, ph: 'you@example.com' },
            { label: 'Password', type: 'password', val: password, set: setPassword, ph: '6+ characters' },
          ].map(({ label, type, val, set, ph }) => (
            <div key={label}>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">{label}</label>
              <input
                className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-heart-500/30 focus:border-heart-400 transition"
                type={type}
                placeholder={ph}
                value={val}
                onChange={(e) => set(e.target.value)}
                required
                minLength={type === 'password' ? 6 : undefined}
              />
            </div>
          ))}
          {err && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{err}</div>
          )}
          <button
            className="w-full bg-heart-500 hover:bg-heart-600 text-white rounded-xl py-2.5 font-bold transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-stone-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-heart-600 hover:underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
