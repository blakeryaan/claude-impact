import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Business, Contribution } from '@/types';
import HeartPointsBadge from '@/components/HeartPointsBadge';
import SDGCallout from '@/components/SDGCallout';
import FavoriteButton from '@/components/FavoriteButton';
import ApplaudButton from '@/components/ApplaudButton';
import FollowButton from '@/components/FollowButton';
import { formatDate } from '@/lib/format';

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
        const rows = (data as Contribution[]) ?? [];
        setContribs(rows);
        setPoints(rows.reduce((s, c) => s + c.heart_points, 0));
      });
  }, [id]);

  if (!business) return <div className="p-8 text-stone-500">Loading…</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-[2fr_1fr] gap-6">
      <article>
        <header className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 bg-heart-50 rounded-full flex items-center justify-center text-3xl font-bold text-heart-600 shrink-0">
            {business.name.slice(0, 1)}
          </div>
          <div>
            <h1 className="text-3xl font-bold leading-tight">{business.name}</h1>
            {business.awards.length > 0 && (
              <div className="text-xs text-stone-500 mt-0.5">{business.awards.join(' · ')}</div>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              <HeartPointsBadge points={points} />
              <FavoriteButton businessId={business.id} />
              <FollowButton businessId={business.id} />
            </div>
          </div>
        </header>

        <p className="text-stone-700 mb-6">{business.bio}</p>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold text-heart-600">{points}</div>
            <div className="text-xs text-stone-500">Heart Points</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-2xl font-bold">{contribs.length}</div>
            <div className="text-xs text-stone-500">Contributions</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-sm font-bold">{business.sdg_focus[0] ?? '—'}</div>
            <div className="text-xs text-stone-500">Top SDG focus</div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Contributions</h2>
        <ol className="space-y-2">
          {contribs.map((c) => (
            <li key={c.id} className="bg-white rounded-lg p-3 shadow-sm flex justify-between items-start gap-2">
              <div>
                <div className="text-sm text-stone-500">{formatDate(c.date)}</div>
                <div>{c.description}</div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <HeartPointsBadge points={c.heart_points} />
                <ApplaudButton contributionId={c.id} />
              </div>
            </li>
          ))}
        </ol>
      </article>

      <aside className="space-y-3">
        <h3 className="font-semibold text-stone-700">Why this matters in Melbourne</h3>
        {business.sdg_focus.map((sdg) => (
          <SDGCallout key={sdg} sdg={sdg} />
        ))}
        {business.sdg_focus.length === 0 && (
          <p className="text-sm text-stone-500">No SDG tags set.</p>
        )}
      </aside>
    </div>
  );
}
