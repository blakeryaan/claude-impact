import { formatHeartPoints } from '@/lib/format';

export default function HeartPointsBadge({ points, size = 'sm' }: { points: number; size?: 'sm' | 'lg' }) {
  if (size === 'lg') {
    return (
      <div>
        <div className="font-display text-5xl leading-none text-coral tabular-nums">
          {formatHeartPoints(points)}
        </div>
        <div className="eyebrow mt-1">Heart Points</div>
      </div>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs font-medium border border-coral text-coral rounded-pill px-2.5 py-0.5">
      ♥ {formatHeartPoints(points)}
    </span>
  );
}
