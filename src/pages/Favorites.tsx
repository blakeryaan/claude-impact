import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import BusinessCard from '@/components/BusinessCard';
import type { BusinessWithPoints } from '@/types';

export default function FavoritesPage() {
  const { session } = useAuth();
  const [rows, setRows] = useState<BusinessWithPoints[]>([]);

  useEffect(() => {
    if (!session) return;
    (async () => {
      const { data } = await supabase
        .from('favorites')
        .select(
          'business_id, businesses(*, business_heart_points!inner(heart_points, contribution_count))',
        )
        .eq('user_id', session.user.id);
      if (!data) return;
      setRows(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data as any[]).map((r) => ({
          ...r.businesses,
          heart_points: r.businesses.business_heart_points.heart_points,
          contribution_count: r.businesses.business_heart_points.contribution_count,
        })),
      );
    })();
  }, [session?.user.id]);

  if (!session) {
    return (
      <div className="p-8">
        Please <Link className="underline" to="/login">sign in</Link> to see your favourites.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My favourites</h1>
      {rows.length === 0 ? (
        <p className="text-stone-500">No favourites yet. Browse the <Link to="/" className="underline">map</Link> and star a business.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((b) => <BusinessCard key={b.id} b={b} />)}
        </div>
      )}
    </div>
  );
}
