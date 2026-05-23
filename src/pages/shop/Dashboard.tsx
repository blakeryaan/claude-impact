import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import HeartPointsBadge from '@/components/HeartPointsBadge';
import type { Business } from '@/types';

export default function ShopDashboardPage() {
  const { session, profile } = useAuth();
  const [b, setB] = useState<Business | null>(null);
  const [points, setPoints] = useState(0);
  const [contribCount, setContribCount] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [applauseTotal, setApplauseTotal] = useState(0);

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data: biz } = await supabase
        .from('businesses')
        .select('*')
        .eq('owner_id', session.user.id)
        .maybeSingle();
      if (!biz) return;
      setB(biz as Business);

      const { data: pts } = await supabase
        .from('business_heart_points')
        .select('heart_points, contribution_count')
        .eq('business_id', biz.id)
        .single();
      setPoints(pts?.heart_points ?? 0);
      setContribCount(pts?.contribution_count ?? 0);

      const { count: f } = await supabase
        .from('follows')
        .select('user_id', { count: 'exact', head: true })
        .eq('business_id', biz.id);
      setFollowers(f ?? 0);

      const { data: contribs } = await supabase
        .from('contributions')
        .select('id')
        .eq('business_id', biz.id);
      const ids = (contribs ?? []).map((c) => c.id);
      if (ids.length) {
        const { count: a } = await supabase
          .from('applause')
          .select('user_id', { count: 'exact', head: true })
          .in('contribution_id', ids);
        setApplauseTotal(a ?? 0);
      }
    })();
  }, [session?.user.id]);

  if (!session || profile?.role !== 'shop') {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-20 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-4">Shop accounts only</p>
        <Link className="btn-primary px-6 py-2 font-display uppercase" to="/shop/login">Sign in →</Link>
      </div>
    );
  }

  if (!b) {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-20 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">No business linked to this account yet.</p>
      </div>
    );
  }

  const stats = [
    { label: 'Heart Points', value: points, coral: true },
    { label: 'Contributions', value: contribCount, coral: false },
    { label: 'Followers', value: followers, coral: false },
    { label: 'Applause', value: applauseTotal, coral: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-5 pt-8 pb-5">

      {/* Header */}
      <div className="eyebrow mb-2">Business dashboard</div>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="font-display text-4xl md:text-5xl uppercase leading-none">{b.name}</h1>
        <HeartPointsBadge points={points} size="lg" />
      </div>
      <p className={`font-mono text-xs uppercase tracking-widest mb-8 ${b.approved ? 'text-coral' : 'text-muted'}`}>
        {b.approved ? '● Live on the map' : '○ Pending admin approval'}
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map(({ label, value, coral }) => (
          <div key={label} className="card p-4 text-center">
            <div className={`font-display text-3xl uppercase leading-tight ${coral ? 'text-coral' : 'text-ink'}`}>
              {value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 flex-wrap">
        <Link
          to="/shop/contributions"
          className="btn-primary px-5 py-2.5 font-display uppercase"
        >
          Add contribution →
        </Link>
        <Link
          to="/shop/profile"
          className="btn-secondary px-5 py-2.5 font-display uppercase"
        >
          Edit profile
        </Link>
        <Link
          to={`/business/${b.id}`}
          className="btn-secondary px-5 py-2.5 font-display uppercase"
        >
          View public page
        </Link>
      </div>
    </div>
  );
}
