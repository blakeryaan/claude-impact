import { Link } from 'react-router-dom';
import type { BusinessWithPoints } from '@/types';
import HeartPointsBadge from './HeartPointsBadge';
import SDGTag from './SDGTag';

export default function BusinessCard({
  b,
  distanceKm,
}: {
  b: BusinessWithPoints;
  distanceKm?: number;
}) {
  return (
    <Link
      to={`/business/${b.id}`}
      className="flex flex-col bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow p-4 min-w-[200px]"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 rounded-xl bg-heart-50 flex items-center justify-center font-black text-heart-500 text-lg shrink-0">
          {b.name.slice(0, 1)}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-stone-900 leading-tight truncate">{b.name}</div>
          {distanceKm !== undefined && (
            <div className="text-xs text-stone-400 mt-0.5">{distanceKm.toFixed(1)} km away</div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <HeartPointsBadge points={b.heart_points} />
        {b.sdg_focus[0] && <SDGTag sdg={b.sdg_focus[0]} />}
      </div>
    </Link>
  );
}
