import { Link } from 'react-router-dom';
import type { BusinessWithPoints } from '@/types';
import HeartPointsBadge from './HeartPointsBadge';
import SDGTag from './SDGTag';
import { businessPhoto } from '@/lib/photos';

export default function BusinessCard({
  b,
  distanceKm,
}: {
  b: BusinessWithPoints;
  distanceKm?: number;
}) {
  return (
    <Link to={`/business/${b.id}`} className="card block overflow-hidden min-w-[200px]">
      {/* Cover photo */}
      <div className="h-28 overflow-hidden border-b-2 border-ink">
        <img
          src={businessPhoto(b.id, 400, 224)}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          {/* Badge circle */}
          <div className="w-10 h-10 rounded-full border-2 border-ink bg-paper-2 flex items-center justify-center font-display text-base text-ink shrink-0">
            {b.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="font-display text-base uppercase leading-tight truncate">{b.name}</div>
            {distanceKm !== undefined && (
              <div className="font-mono text-[11px] text-muted mt-0.5 uppercase tracking-wide">
                {distanceKm.toFixed(1)} km away
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <HeartPointsBadge points={b.heart_points} />
          {b.sdg_focus[0] && <SDGTag sdg={b.sdg_focus[0]} />}
        </div>
      </div>
    </Link>
  );
}
