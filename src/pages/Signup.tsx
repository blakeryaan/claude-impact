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
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">

        {/* Wordmark */}
        <div className="text-center mb-10">
          <div className="font-display text-3xl uppercase leading-none mb-1">
            Just Do Good Sh<span className="text-coral">*</span>t
          </div>
          <p className="font-serif italic text-muted text-sm">Join Melbourne's community impact map</p>
        </div>

        <form onSubmit={onSubmit} className="card p-6 space-y-4">
          {[
            { label: 'Display name', type: 'text', val: name, set: setName, ph: 'Jane Smith' },
            { label: 'Email', type: 'email', val: email, set: setEmail, ph: 'you@example.com' },
            { label: 'Password', type: 'password', val: password, set: setPassword, ph: '6+ characters' },
          ].map(({ label, type, val, set, ph }) => (
            <div key={label}>
              <label className="eyebrow block mb-1.5">{label}</label>
              <input
                className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
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
            <div className="font-mono text-xs text-coral border border-coral rounded-sm px-3 py-2">{err}</div>
          )}
          <button
            className="btn-primary w-full py-3 font-display text-lg uppercase disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="text-center mt-5">
          <div className="font-mono text-xs uppercase tracking-widest text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-coral hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
