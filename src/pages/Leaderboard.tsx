import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import HeartPointsBadge from '@/components/HeartPointsBadge';
import SDGTag from '@/components/SDGTag';
import type { BusinessWithPoints } from '@/types';

export default function LeaderboardPage() {
  const [top, setTop] = useState<BusinessWithPoints[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('businesses').select('*').eq('approved', true);
      const { data: pts } = await supabase.from('business_heart_points').select('*');
      if (!data) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ptsMap = Object.fromEntries((pts ?? []).map((r: any) => [r.business_id, r]));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rows: BusinessWithPoints[] = (data as any[]).map((r) => ({
        ...r,
        heart_points: ptsMap[r.id]?.heart_points ?? 0,
        contribution_count: ptsMap[r.id]?.contribution_count ?? 0,
      }));
      rows.sort((a, b) => b.heart_points - a.heart_points);
      setTop(rows.slice(0, 10));
    })();
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">Leaderboard 🏆</h1>
        <p className="text-stone-500 mt-1">Top 10 Melbourne businesses by Heart Points.</p>
      </div>

      {/* Podium — top 3 */}
      {top.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[top[1], top[0], top[2]].map((b, i) => {
            const rank = i === 1 ? 0 : i === 0 ? 1 : 2;
            const heights = ['h-28', 'h-36', 'h-24'];
            const colors = ['from-stone-300 to-stone-400', 'from-amber-400 to-yellow-500', 'from-orange-300 to-amber-400'];
            return (
              <Link key={b.id} to={`/business/${b.id}`} className="flex flex-col items-center gap-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-b ${colors[rank]} flex items-center justify-center font-black text-white text-lg shadow-card`}>
                  {b.name.slice(0, 1)}
                </div>
                <div className="text-xs font-bold text-center leading-tight line-clamp-2 text-stone-700">{b.name}</div>
                <div className="text-xs text-heart-600 font-semibold">♥ {b.heart_points}</div>
                <div className={`w-full rounded-t-xl bg-gradient-to-b ${colors[rank]} opacity-30 ${heights[rank]}`} />
              </Link>
            );
          })}
        </div>
      )}

      {/* Full list */}
      <ol className="space-y-2">
        {top.map((b, i) => (
          <li key={b.id}>
            <Link
              to={`/business/${b.id}`}
              className="flex items-center gap-3 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow p-3.5"
            >
              <div className="w-8 text-center text-xl shrink-0">
                {medals[i] ?? <span className="text-base font-black text-stone-400">{i + 1}</span>}
              </div>
              <div className="w-9 h-9 rounded-xl bg-heart-50 flex items-center justify-center font-black text-heart-500 shrink-0">
                {b.name.slice(0, 1)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-stone-900 leading-tight truncate">{b.name}</div>
                <div className="text-xs text-stone-400 mt-0.5">{b.contribution_count} contributions</div>
              </div>
              {b.sdg_focus[0] && (
                <div className="hidden sm:block shrink-0">
                  <SDGTag sdg={b.sdg_focus[0]} />
                </div>
              )}
              <HeartPointsBadge points={b.heart_points} />
            </Link>
          </li>
        ))}
      </ol>

      {top.length === 0 && (
        <div className="text-center text-stone-400 py-16">Loading…</div>
      )}
    </div>
  );
}
