import { formatHeartPoints } from '@/lib/format';

export default function HeartPointsBadge({ points, size = 'sm' }: { points: number; size?: 'sm' | 'lg' }) {
  if (size === 'lg') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-heart-500 text-2xl leading-none">♥</span>
        <span className="text-3xl font-black text-stone-900">{formatHeartPoints(points)}</span>
        <span className="text-stone-400 text-sm self-end mb-1">pts</span>
      </div>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-heart-50 text-heart-600 border border-heart-100 px-2.5 py-0.5 text-xs font-semibold">
      ♥ {formatHeartPoints(points)}
    </span>
  );
}
