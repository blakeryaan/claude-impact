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
      const { data: biz } = await supabase.from('businesses').select('*').eq('owner_id', session.user.id).maybeSingle();
      if (!biz) return;
      setB(biz as Business);
      const { data: pts } = await supabase.from('business_heart_points').select('heart_points, contribution_count').eq('business_id', biz.id).single();
      setPoints(pts?.heart_points ?? 0);
      setContribCount(pts?.contribution_count ?? 0);
      const { count: f } = await supabase.from('follows').select('user_id', { count: 'exact', head: true }).eq('business_id', biz.id);
      setFollowers(f ?? 0);
      const { data: contribs } = await supabase.from('contributions').select('id').eq('business_id', biz.id);
      const ids = (contribs ?? []).map((c) => c.id);
      if (ids.length) {
        const { count: a } = await supabase.from('applause').select('user_id', { count: 'exact', head: true }).in('contribution_id', ids);
        setApplauseTotal(a ?? 0);
      }
    })();
  }, [session?.user.id]);

  if (!session || profile?.role !== 'shop') return <div className="p-8">Shop accounts only. <Link className="underline" to="/shop/login">Sign in</Link>.</div>;
  if (!b) return <div className="p-8">No business linked to this account yet.</div>;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-1">{b.name}</h1>
      <p className="text-stone-600 mb-2">{b.approved ? 'Approved · live on the map' : 'Pending admin approval'}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <div className="text-2xl font-bold"><HeartPointsBadge points={points} /></div>
          <div className="text-xs text-stone-500">Heart Points</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center"><div className="text-2xl font-bold">{contribCount}</div><div className="text-xs text-stone-500">Contributions</div></div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center"><div className="text-2xl font-bold">{followers}</div><div className="text-xs text-stone-500">Followers</div></div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center"><div className="text-2xl font-bold">{applauseTotal}</div><div className="text-xs text-stone-500">Applause</div></div>
      </div>
      <Link to="/shop/contributions" className="inline-block bg-heart-500 text-white rounded p-2 px-4 font-semibold">Add a contribution →</Link>
    </div>
  );
}
