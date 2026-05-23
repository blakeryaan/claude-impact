import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setErr(error.message);
    nav('/');
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-heart-500 text-3xl">♥</span>
            <span className="font-black text-2xl">Good Sh*t</span>
          </div>
          <p className="text-stone-500 text-sm">Sign in to save and engage</p>
        </div>

        <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-card border border-stone-100 p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Email</label>
            <input
              className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-heart-500/30 focus:border-heart-400 transition"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-1.5">Password</label>
            <input
              className="w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-heart-500/30 focus:border-heart-400 transition"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {err && (
            <div className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{err}</div>
          )}
          <button
            className="w-full bg-heart-500 hover:bg-heart-600 text-white rounded-xl py-2.5 font-bold transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="text-center mt-4 space-y-2">
          <div className="text-sm text-stone-500">
            No account?{' '}
            <Link to="/signup" className="font-semibold text-heart-600 hover:underline">
              Sign up free
            </Link>
          </div>
          <div className="text-sm text-stone-400">
            Running a shop?{' '}
            <Link to="/shop/login" className="hover:underline">
              Shop login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
