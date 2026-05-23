import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Business, Contribution } from '@/types';
import { businessPhoto } from '@/lib/photos';
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

  if (!business) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">Loading…</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      {/* ── Cover photo ─────────────────────────────────────── */}
      <div className="h-48 md:h-64 overflow-hidden border-b-2 border-ink">
        <img
          src={businessPhoto(business.id, 1200, 512)}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Hero — dark inverted panel ─────────────────────── */}
      <div className="bg-ink px-5 pt-8 pb-7 border-b-2 border-ink">
        <div className="flex items-start gap-5">
          {/* Circular badge */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-paper/40 flex items-center justify-center font-display text-4xl text-paper shrink-0 uppercase">
            {business.name.slice(0, 1)}
          </div>
          <div className="flex-1 min-w-0">
            {business.awards.length > 0 && (
              <div className="font-mono text-[10px] uppercase tracking-widest text-coral mb-1">
                {business.awards[0]}
              </div>
            )}
            <h1 className="font-display text-2xl md:text-4xl uppercase text-paper leading-tight">
              {business.name}
            </h1>
            <div className="mt-3">
              <HeartPointsBadge points={points} size="lg" />
            </div>
          </div>
        </div>

        {/* SDG tags */}
        {business.sdg_focus.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-5">
            {business.sdg_focus.map((sdg) => (
              <span key={sdg} className="font-mono text-[10px] uppercase tracking-wider border border-paper/30 text-paper/60 rounded px-2 py-0.5">
                {sdg}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-5 flex-wrap">
          <FavoriteButton businessId={business.id} />
          <FollowButton businessId={business.id} />
        </div>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-0 md:gap-6 md:p-5">
        <div>
          {/* Bio */}
          <div className="px-5 py-5 md:px-0 border-b border-paper-2 md:border-0">
            <div className="eyebrow mb-2">About</div>
            <p className="text-ink-2 leading-relaxed">{business.bio}</p>
          </div>

          {/* Stat strip */}
          <div className="grid grid-cols-3 border-y-2 border-ink md:border-2 md:rounded-md md:my-5 bg-paper-2">
            {[
              { value: points, label: 'Heart Points', coral: true },
              { value: contribs.length, label: 'Contributions', coral: false },
              { value: business.sdg_focus[0] ?? '—', label: 'Top SDG', coral: false },
            ].map(({ value, label, coral }, i) => (
              <div key={label} className={`py-5 text-center px-2 ${i > 0 ? 'border-l-2 border-ink' : ''}`}>
                <div className={`font-display text-2xl uppercase leading-tight ${coral ? 'text-coral' : 'text-ink'}`}>
                  {value}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Contributions */}
          <div className="px-5 pt-2 md:px-0">
            <div className="eyebrow mb-3">Contributions</div>
            <ol className="space-y-2 pb-5">
              {contribs.map((c) => (
                <li key={c.id} className="card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
                        {formatDate(c.date)}
                      </div>
                      <div className="text-ink-2 leading-snug text-sm">{c.description}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <HeartPointsBadge points={c.heart_points} />
                      <ApplaudButton contributionId={c.id} />
                    </div>
                  </div>
                </li>
              ))}
              {contribs.length === 0 && (
                <li className="font-mono text-xs uppercase tracking-wider text-muted text-center py-10">
                  No contributions yet.
                </li>
              )}
            </ol>
          </div>
        </div>

        {/* Sidebar — SDG callouts */}
        <aside className="px-5 pb-5 md:px-0 space-y-3">
          <div className="eyebrow mb-3 mt-4 md:mt-0">Why this matters</div>
          {business.sdg_focus.map((sdg) => (
            <SDGCallout key={sdg} sdg={sdg} />
          ))}
          {business.sdg_focus.length === 0 && (
            <p className="font-mono text-xs uppercase tracking-wider text-muted">No SDG tags set.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
