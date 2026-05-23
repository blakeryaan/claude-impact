import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
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

  return (
    <div className="max-w-2xl mx-auto px-5 pt-8 pb-5">
      {/* Header */}
      <div className="eyebrow mb-2">Melbourne's finest</div>
      <h1 className="font-display text-4xl md:text-6xl uppercase leading-none mb-8">
        Leaderboard
      </h1>

      {/* Guidelines: "Rank in Anton 48px (coral for #1, ink for #2–10), business name in Anton 32px, metric in tabular mono" */}
      <ol>
        {top.map((b, i) => (
          <li key={b.id} className={`border-b-2 border-ink ${i === 0 ? 'border-t-2' : ''}`}>
            <Link
              to={`/business/${b.id}`}
              className="flex items-center gap-4 py-4 group transition-colors hover:bg-paper-2 px-2 -mx-2"
            >
              {/* Rank */}
              <div className={`font-display text-4xl w-12 text-right shrink-0 tabular-nums leading-none ${
                i === 0 ? 'text-coral' : i < 3 ? 'text-ink' : 'text-muted'
              }`}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Badge */}
              <div className={`w-10 h-10 rounded-full border-2 border-ink flex items-center justify-center font-display text-base uppercase shrink-0 ${
                i === 0 ? 'bg-coral text-ink' : 'bg-paper-2 text-ink'
              }`}>
                {b.name.slice(0, 1)}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg md:text-2xl uppercase leading-tight truncate">
                  {b.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-0.5">
                  {b.contribution_count} contribution{b.contribution_count !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Points — tabular mono per guidelines */}
              <div className="text-right shrink-0" style={{ fontVariantNumeric: 'tabular-nums' }}>
                <div className={`font-mono text-lg font-medium ${i === 0 ? 'text-coral' : 'text-ink'}`}>
                  {b.heart_points.toLocaleString()}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted">pts</div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {top.length === 0 && (
        <div className="font-mono text-xs uppercase tracking-widest text-muted text-center py-20">Loading…</div>
      )}
    </div>
  );
}
