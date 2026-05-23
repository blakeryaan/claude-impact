import { formatHeartPoints } from '@/lib/format';

export default function HeartPointsBadge({ points }: { points: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-heart-50 text-heart-600 px-2 py-0.5 text-sm font-medium">
      <span aria-hidden>♥</span> {formatHeartPoints(points)}
    </span>
  );
}
