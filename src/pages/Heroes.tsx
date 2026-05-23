import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import SDGTag from '@/components/SDGTag';
import type { Business } from '@/types';

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<Business[]>([]);

  useEffect(() => {
    supabase.from('businesses').select('*').eq('approved', true).eq('is_hero', true)
      .then(({ data }) => setHeroes((data as Business[]) ?? []));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight">Heroes ⭐</h1>
        <p className="text-stone-500 mt-1">
          Award-winning Melbourne businesses driving real community impact.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes.map((b, i) => {
          const gradients = [
            'from-heart-500 to-rose-600',
            'from-purple-500 to-indigo-600',
            'from-emerald-500 to-teal-600',
            'from-amber-500 to-orange-600',
            'from-blue-500 to-cyan-600',
            'from-pink-500 to-rose-500',
          ];
          const grad = gradients[i % gradients.length];
          return (
            <Link
              key={b.id}
              to={`/business/${b.id}`}
              className="group block bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow overflow-hidden"
            >
              {/* Colour band */}
              <div className={`bg-gradient-to-r ${grad} p-5 pb-4`}>
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-black text-white mb-3">
                  {b.name.slice(0, 1)}
                </div>
                <h2 className="text-white font-black text-lg leading-tight">{b.name}</h2>
              </div>

              {/* Card body */}
              <div className="p-4">
                <p className="text-sm text-stone-600 leading-relaxed line-clamp-2 mb-3">{b.bio}</p>
                {b.awards.length > 0 && (
                  <p className="text-xs text-stone-400 font-medium mb-3">{b.awards.join(' · ')}</p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {b.sdg_focus.slice(0, 2).map((sdg) => (
                    <SDGTag key={sdg} sdg={sdg} />
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {heroes.length === 0 && (
        <div className="text-center text-stone-400 py-16">Loading…</div>
      )}
    </div>
  );
}
