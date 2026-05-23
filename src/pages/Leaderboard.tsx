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
        .select('*, business_heart_points!inner(heart_points, contribution_count)')
        .eq('approved', true);
      if (!data) return;
      const rows: BusinessWithPoints[] = data.map((r: any) => ({
        ...r,
        heart_points: r.business_heart_points.heart_points,
        contribution_count: r.business_heart_points.contribution_count,
      }));
      rows.sort((a, b) => b.heart_points - a.heart_points);
      setTop(rows.slice(0, 10));
    })();
  }, []);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-1">Leaderboard</h1>
      <p className="text-stone-600 mb-6">Top 10 by Heart Points.</p>
      <ol className="space-y-2">
        {top.map((b, i) => (
          <li key={b.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
            <div className="text-2xl font-bold w-8 text-stone-400">{i + 1}</div>
            <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center font-bold text-stone-600">{b.name.slice(0, 1)}</div>
            <Link to={`/business/${b.id}`} className="flex-1 font-semibold hover:underline">{b.name}</Link>
            <HeartPointsBadge points={b.heart_points} />
          </li>
        ))}
      </ol>
    </div>
  );
}
