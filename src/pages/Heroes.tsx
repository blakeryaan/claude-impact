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
      <p className="text-stone-600 mb-6">
        Award-winning Melbourne businesses driving real community impact.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes.map((b) => (
          <Link
            key={b.id}
            to={`/business/${b.id}`}
            className="block bg-white rounded-xl shadow-sm hover:shadow-md transition p-5"
          >
            <div className="w-14 h-14 bg-heart-50 text-heart-600 rounded-full flex items-center justify-center font-bold text-2xl mb-3">
              {b.name.slice(0, 1)}
            </div>
            <h2 className="font-semibold text-lg leading-tight">{b.name}</h2>
            <p className="text-sm text-stone-600 mt-1 line-clamp-2">{b.bio}</p>
            {b.awards.length > 0 && (
              <div className="text-xs text-stone-500 mt-2 font-medium">
                {b.awards.join(' · ')}
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-1">
              {b.sdg_focus.slice(0, 2).map((s) => (
                <span
                  key={s}
                  className="text-xs bg-stone-100 text-stone-700 rounded-full px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
