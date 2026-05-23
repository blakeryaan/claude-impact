import { Link } from 'react-router-dom';
import type { BusinessWithPoints } from '@/types';
import HeartPointsBadge from './HeartPointsBadge';

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
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-heart-50 rounded-full flex items-center justify-center font-bold text-heart-600 text-lg shrink-0">
          {b.name.slice(0, 1)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">{b.name}</div>
          <div className="flex gap-2 mt-1 flex-wrap">
            <HeartPointsBadge points={b.heart_points} />
            {distanceKm !== undefined && (
              <span className="text-xs text-stone-500 self-center">{distanceKm.toFixed(1)} km</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
