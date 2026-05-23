import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Business, Contribution } from '@/types';
import HeartPointsBadge from '@/components/HeartPointsBadge';
import SDGCallout from '@/components/SDGCallout';
import SDGTag from '@/components/SDGTag';
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

  if (!business) {
    return (
      <div className="flex items-center justify-center h-64 text-stone-400">Loading…</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="bg-gradient-to-br from-heart-500 to-heart-700 px-4 pt-8 pb-6 md:rounded-b-none">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-black text-white shrink-0">
            {business.name.slice(0, 1)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">{business.name}</h1>
            {business.awards.length > 0 && (
              <p className="text-white/70 text-xs mt-1">{business.awards.join(' · ')}</p>
            )}
            <div className="mt-2">
              <HeartPointsBadge points={points} size="lg" />
            </div>
          </div>
        </div>

        {/* SDG tags */}
        {business.sdg_focus.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {business.sdg_focus.map((sdg) => (
              <SDGTag key={sdg} sdg={sdg} />
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <FavoriteButton businessId={business.id} />
          <FollowButton businessId={business.id} />
        </div>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-0 md:gap-6 md:p-4">
        <div>
          {/* Bio */}
          <div className="px-4 py-5 md:px-0 bg-white md:bg-transparent border-b border-stone-100 md:border-0">
            <p className="text-stone-700 leading-relaxed">{business.bio}</p>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 divide-x divide-stone-100 border-b border-stone-100 md:border md:rounded-2xl md:shadow-card md:my-4 bg-white">
            <div className="py-4 text-center">
              <div className="text-2xl font-black text-heart-500">{points}</div>
              <div className="text-xs text-stone-500 mt-0.5">Heart Points</div>
            </div>
            <div className="py-4 text-center">
              <div className="text-2xl font-black">{contribs.length}</div>
              <div className="text-xs text-stone-500 mt-0.5">Contributions</div>
            </div>
            <div className="py-4 text-center px-2">
              <div className="text-sm font-bold leading-tight text-stone-700 line-clamp-2">
                {business.sdg_focus[0] ?? '—'}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Top SDG</div>
            </div>
          </div>

          {/* Contributions */}
          <div className="px-4 pt-4 md:px-0">
            <h2 className="text-lg font-black mb-3">Contributions</h2>
            <ol className="space-y-3 pb-4">
              {contribs.map((c) => (
                <li key={c.id} className="bg-white rounded-2xl shadow-card p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-stone-400 mb-1">{formatDate(c.date)}</div>
                      <div className="text-stone-800 leading-snug">{c.description}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <HeartPointsBadge points={c.heart_points} />
                      <ApplaudButton contributionId={c.id} />
                    </div>
                  </div>
                </li>
              ))}
              {contribs.length === 0 && (
                <li className="text-stone-400 text-sm text-center py-8">No contributions yet.</li>
              )}
            </ol>
          </div>
        </div>

        {/* Sidebar — SDG callouts */}
        <aside className="px-4 pb-4 md:px-0 md:pt-0 space-y-3">
          <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wide mt-4 md:mt-0">
            Why this matters in Melbourne
          </h3>
          {business.sdg_focus.map((sdg) => (
            <SDGCallout key={sdg} sdg={sdg} />
          ))}
          {business.sdg_focus.length === 0 && (
            <p className="text-sm text-stone-400">No SDG tags set.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
