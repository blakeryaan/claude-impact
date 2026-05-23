import { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/lib/format';
import type { Contribution } from '@/types';

export default function ShopContributionsPage() {
  const { session, profile } = useAuth();
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [contribs, setContribs] = useState<Contribution[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [desc, setDesc] = useState('');
  const [pts, setPts] = useState('');

  useEffect(() => {
    if (!session) return;
    supabase
      .from('businesses')
      .select('id')
      .eq('owner_id', session.user.id)
      .maybeSingle()
      .then(({ data }) => setBusinessId(data?.id ?? null));
  }, [session?.user.id]);

  useEffect(() => {
    if (!businessId) return;
    supabase
      .from('contributions')
      .select('*')
      .eq('business_id', businessId)
      .order('date', { ascending: false })
      .then(({ data }) => setContribs((data as Contribution[]) ?? []));
  }, [businessId]);

  async function add(e: FormEvent) {
    e.preventDefault();
    if (!businessId) return;
    const { data } = await supabase
      .from('contributions')
      .insert({
        business_id: businessId,
        date,
        description: desc,
        heart_points: parseInt(pts || '0', 10),
      })
      .select()
      .single();
    if (data) setContribs([data as Contribution, ...contribs]);
    setDesc('');
    setPts('');
  }

  async function remove(id: string) {
    await supabase.from('contributions').delete().eq('id', id);
    setContribs(contribs.filter((c) => c.id !== id));
  }

  if (!session) return <Navigate to="/shop/login" replace />;
  if (profile?.role !== 'shop') return (
    <div className="max-w-2xl mx-auto px-5 pt-20 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">Shop accounts only.</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-5 pt-8 pb-5">

      {/* Header */}
      <div className="eyebrow mb-2">Business portal</div>
      <h1 className="font-display text-4xl uppercase leading-none mb-8">My Contributions</h1>

      {/* Add form */}
      <div className="card p-5 mb-6">
        <div className="eyebrow mb-3">Add a contribution</div>
        <form onSubmit={add} className="space-y-3">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Date</label>
            <input
              className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">What did you do?</label>
            <input
              className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
              placeholder="Donated 50 meals to the community kitchen…"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1">Heart Points (self-assessed)</label>
            <input
              className="w-full border-2 border-ink bg-paper rounded-sm px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-coral transition"
              type="number"
              min={0}
              placeholder="e.g. 10"
              value={pts}
              onChange={(e) => setPts(e.target.value)}
              required
            />
          </div>
          <button className="btn-primary px-5 py-2.5 font-display uppercase">Add</button>
        </form>
      </div>

      {/* List */}
      <ol className="space-y-2">
        {contribs.map((c) => (
          <li key={c.id} className="card p-4 flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                {formatDate(c.date)}
              </div>
              <div className="text-sm text-ink-2 leading-snug">{c.description}</div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <div className="font-mono text-sm font-medium text-coral tabular-nums">
                ♥ {c.heart_points}
              </div>
              <button
                onClick={() => remove(c.id)}
                className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-coral transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {contribs.length === 0 && (
          <li className="font-mono text-xs uppercase tracking-widest text-muted text-center py-10">
            No contributions yet.
          </li>
        )}
      </ol>

      <div className="mt-6 border-t-2 border-ink pt-4">
        <Link to="/shop/dashboard" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-ink transition">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
