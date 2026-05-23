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
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">

        {/* Wordmark */}
        <div className="text-center mb-10">
          <div className="font-display text-3xl uppercase leading-none mb-1">
            Just Do Good Sh<span className="text-coral">*</span>t
          </div>
          <p className="font-serif italic text-muted text-sm">Sign in to save and engage</p>
        </div>

        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          <div>
            <label className="eyebrow block mb-1.5">Email</label>
            <input
              className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
              type="email"
              placeholder="you@example.com"
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {err && (
            <div className="font-mono text-xs text-coral border border-coral rounded-sm px-3 py-2">{err}</div>
          )}
          <button
            className="btn-primary w-full py-3 font-display text-lg uppercase disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="text-center mt-5 space-y-2">
          <div className="font-mono text-xs uppercase tracking-widest text-muted">
            No account?{' '}
            <Link to="/signup" className="text-coral hover:underline">
              Sign up free
            </Link>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-muted">
            Running a shop?{' '}
            <Link to="/shop/login" className="hover:underline">
              Shop login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
