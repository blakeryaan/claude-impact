import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Business } from '@/types';

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<Business[]>([]);
  useEffect(() => {
    supabase.from('businesses').select('*').eq('approved', true).eq('is_hero', true)
      .then(({ data }) => setHeroes((data as Business[]) ?? []));
  }, []);
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-1">Heroes</h1>
      <p className="text-stone-600 mb-6">Award-winning Melbourne businesses driving real community impact.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes.map((b) => (
          <Link key={b.id} to={`/business/${b.id}`} className="block bg-white rounded-xl shadow-sm hover:shadow-md transition p-4">
            <div className="w-12 h-12 bg-heart-50 text-heart-600 rounded-full flex items-center justify-center font-bold mb-3">{b.name.slice(0, 1)}</div>
            <h2 className="font-semibold text-lg">{b.name}</h2>
            <p className="text-sm text-stone-600 mt-1 line-clamp-2">{b.bio}</p>
            <div className="text-xs text-stone-500 mt-2">{b.awards.join(' · ')}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
