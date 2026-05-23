// STUB — replaced on merge
import { Link } from 'react-router-dom';
import type { BusinessWithPoints } from '@/types';
export default function BusinessCard({ b }: { b: BusinessWithPoints; distanceKm?: number }) {
  return <Link to={`/business/${b.id}`} className="block bg-white rounded-xl p-4 shadow-sm">{b.name} — ♥ {b.heart_points}</Link>;
}
