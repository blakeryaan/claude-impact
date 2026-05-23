import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Business, Contribution } from '@/types';
import HeartPointsBadge from '@/components/HeartPointsBadge';
import SDGCallout from '@/components/SDGCallout';
import { formatDate } from '@/lib/format';
import FavoriteButton from '@/components/FavoriteButton';
import ApplaudButton from '@/components/ApplaudButton';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<Business | null>(null);
  const [contribs, setContribs] = useState<Contribution[]>([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (!id) return;
    supabase.from('businesses').select('*').eq('id', id).single()
      .then(({ data }) => setBusiness(data as Business | null));
    supabase.from('contributions').select('*').eq('business_id', id).order('date', { ascending: false })
      .then(({ data }) => {
        setContribs((data as Contribution[]) ?? []);
        setPoints((data ?? []).reduce((s, c: any) => s + c.heart_points, 0));
      });
  }, [id]);

  if (!business) return <div className="p-8">Loading…</div>;
  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-[2fr_1fr] gap-6">
      <article>
        <header className="flex items-center gap-4 mb-4">
          {business.photo_url ? (
            <img src={business.photo_url} alt="" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center text-3xl font-bold text-stone-600">
              {business.name.slice(0, 1)}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold">{business.name}</h1>
            <div className="mt-1"><HeartPointsBadge points={points} /></div>
            <div className="mt-2"><FavoriteButton businessId={business.id} /></div>
          </div>
        </header>
        <p className="text-stone-700 mb-6">{business.bio}</p>
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm"><div className="text-2xl font-bold">{points}</div><div className="text-xs text-stone-500">Heart Points</div></div>
          <div className="bg-white rounded-lg p-3 shadow-sm"><div className="text-2xl font-bold">{contribs.length}</div><div className="text-xs text-stone-500">Contributions</div></div>
          <div className="bg-white rounded-lg p-3 shadow-sm"><div className="text-2xl font-bold">{business.sdg_focus[0] ?? '—'}</div><div className="text-xs text-stone-500">Top SDG focus</div></div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Contributions</h2>
        <ol className="space-y-2">
          {contribs.map((c) => (
            <li key={c.id} className="bg-white rounded-lg p-3 shadow-sm flex justify-between items-start">
              <div>
                <div className="text-sm text-stone-500">{formatDate(c.date)}</div>
                <div>{c.description}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <HeartPointsBadge points={c.heart_points} />
                <ApplaudButton contributionId={c.id} />
              </div>
            </li>
          ))}
        </ol>
      </article>
      <aside className="space-y-3">
        <h3 className="font-semibold">Why this matters in Melbourne</h3>
        {business.sdg_focus.map((sdg) => <SDGCallout key={sdg} sdg={sdg} />)}
      </aside>
    </div>
  );
}
