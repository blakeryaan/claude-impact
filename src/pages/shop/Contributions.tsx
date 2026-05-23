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
  if (profile?.role !== 'shop') return <div className="p-8">Shop accounts only.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My contributions</h1>

      <form onSubmit={add} className="bg-white rounded-xl p-4 shadow-sm space-y-2 mb-6">
        <h2 className="font-semibold">Add a contribution</h2>
        <input
          className="w-full border border-stone-300 rounded p-2"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          className="w-full border border-stone-300 rounded p-2"
          placeholder="What did you do?"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <input
          className="w-full border border-stone-300 rounded p-2"
          type="number"
          min={0}
          placeholder="Heart Points (self-assessed)"
          value={pts}
          onChange={(e) => setPts(e.target.value)}
          required
        />
        <button className="bg-heart-500 text-white rounded px-4 py-2 font-semibold">Add</button>
      </form>

      <ol className="space-y-2">
        {contribs.map((c) => (
          <li key={c.id} className="bg-white rounded-lg p-3 shadow-sm flex justify-between items-center gap-2">
            <div>
              <div className="text-xs text-stone-500">{formatDate(c.date)}</div>
              <div>{c.description}</div>
            </div>
            <div className="flex gap-3 items-center shrink-0">
              <span className="font-semibold text-heart-600">♥ {c.heart_points}</span>
              <button
                onClick={() => remove(c.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>

      <p className="text-sm text-stone-500 mt-4">
        <Link to="/shop/dashboard" className="underline">← Back to dashboard</Link>
      </p>
    </div>
  );
}
