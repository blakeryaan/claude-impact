import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import BusinessCard from '@/components/BusinessCard';
import { Link } from 'react-router-dom';
import type { BusinessWithPoints } from '@/types';

export default function FavoritesPage() {
  const { session } = useAuth();
  const [rows, setRows] = useState<BusinessWithPoints[]>([]);
  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data: favs } = await supabase
        .from('favorites')
        .select('business_id, businesses(*)')
        .eq('user_id', session.user.id);
      if (!favs?.length) { setRows([]); return; }
      const ids = favs.map((f: any) => f.business_id);
      const { data: pts } = await supabase
        .from('business_heart_points')
        .select('*')
        .in('business_id', ids);
      const pointsMap = new Map<string, { heart_points: number; contribution_count: number }>(
        (pts ?? []).map((p: any) => [p.business_id, { heart_points: p.heart_points, contribution_count: p.contribution_count }]),
      );
      setRows(favs.map((f: any) => ({
        ...f.businesses,
        heart_points: pointsMap.get(f.business_id)?.heart_points ?? 0,
        contribution_count: pointsMap.get(f.business_id)?.contribution_count ?? 0,
      })));
    })();
  }, [session?.user.id]);
  if (!session) return <div className="p-8">Please <Link className="underline" to="/login">sign in</Link>.</div>;
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My favourites</h1>
      <div className="space-y-2">{rows.map((b) => <BusinessCard key={b.id} b={b} />)}</div>
    </div>
  );
}
