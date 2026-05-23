import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import HeartPointsBadge from '@/components/HeartPointsBadge';
import type { BusinessWithPoints } from '@/types';

export default function LeaderboardPage() {
  const [top, setTop] = useState<BusinessWithPoints[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('businesses')
        .select('*')
        .eq('approved', true);
      const { data: pts } = await supabase.from('business_heart_points').select('*');
      if (!data) return;
      const ptsMap = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (pts ?? []).map((r: any) => [r.business_id, r]),
      );
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
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-1">Leaderboard</h1>
      <p className="text-stone-600 mb-6">Top 10 Melbourne businesses by Heart Points.</p>
      <ol className="space-y-2">
        {top.map((b, i) => (
          <li
            key={b.id}
            className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
          >
            <div className="text-2xl w-8 text-center">
              {medals[i] ?? <span className="text-stone-400 font-bold">{i + 1}</span>}
            </div>
            <div className="w-10 h-10 bg-heart-50 rounded-full flex items-center justify-center font-bold text-heart-600 shrink-0">
              {b.name.slice(0, 1)}
            </div>
            <Link
              to={`/business/${b.id}`}
              className="flex-1 font-semibold hover:underline truncate"
            >
              {b.name}
            </Link>
            <div className="text-xs text-stone-500 hidden sm:block">
              {b.contribution_count} contributions
            </div>
            <HeartPointsBadge points={b.heart_points} />
          </li>
        ))}
      </ol>
    </div>
  );
}
