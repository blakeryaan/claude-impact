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
      <div className="p-8">
        Shop accounts only. <Link className="underline" to="/shop/login">Sign in</Link>
      </div>
    );
  }
  if (!b) return <div className="p-8 text-stone-500">No business linked to this account yet.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-start justify-between gap-2 mb-1">
        <h1 className="text-3xl font-bold">{b.name}</h1>
        <HeartPointsBadge points={points} />
      </div>
      <p className="text-stone-600 mb-4">
        {b.approved
          ? '✅ Approved · live on the map'
          : '⏳ Pending admin approval — not yet visible publicly'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {[
          { label: 'Heart Points', value: points },
          { label: 'Contributions', value: contribCount },
          { label: 'Followers', value: followers },
          { label: 'Applause', value: applauseTotal },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-lg p-3 shadow-sm text-center">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-stone-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <Link
          to="/shop/contributions"
          className="inline-block bg-heart-500 text-white rounded px-4 py-2 font-semibold"
        >
          Add a contribution →
        </Link>
        <Link
          to="/shop/profile"
          className="inline-block border border-stone-300 bg-white rounded px-4 py-2 font-semibold"
        >
          Edit profile
        </Link>
        <Link
          to={`/business/${b.id}`}
          className="inline-block border border-stone-300 bg-white rounded px-4 py-2 font-semibold"
        >
          View public page
        </Link>
      </div>
    </div>
  );
}
