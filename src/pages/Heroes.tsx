import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import SDGTag from '@/components/SDGTag';
import type { Business } from '@/types';
import { businessPhoto } from '@/lib/photos';

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<Business[]>([]);

  useEffect(() => {
    supabase.from('businesses').select('*').eq('approved', true).eq('is_hero', true)
      .then(({ data }) => setHeroes((data as Business[]) ?? []));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 pt-8 pb-5">
      {/* Header */}
      <div className="eyebrow mb-2">Community heroes</div>
      <h1 className="font-display text-4xl md:text-6xl uppercase leading-none mb-1">
        Heroes
      </h1>
      <p className="font-serif italic text-muted text-lg mb-8">
        Award-winning Melbourne businesses driving real community impact.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {heroes.map((b) => (
          <Link
            key={b.id}
            to={`/business/${b.id}`}
            className="card block overflow-hidden group"
          >
            {/* Cover photo */}
            <div className="h-44 overflow-hidden border-b-2 border-ink">
              <img
                src={businessPhoto(b.id, 600, 352)}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Body */}
            <div className="p-4">
              {b.awards[0] && (
                <div className="eyebrow mb-0.5">{b.awards[0]}</div>
              )}
              <h2 className="font-display text-xl uppercase leading-tight mb-2">{b.name}</h2>
              <p className="text-sm text-ink-2 leading-relaxed line-clamp-2 mb-3">{b.bio}</p>
              <div className="flex flex-wrap gap-1.5">
                {b.sdg_focus.slice(0, 2).map((sdg) => (
                  <SDGTag key={sdg} sdg={sdg} />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {heroes.length === 0 && (
        <div className="font-mono text-xs uppercase tracking-widest text-muted text-center py-20">Loading…</div>
      )}
    </div>
  );
}
