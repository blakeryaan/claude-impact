import { MELBOURNE_SDG_PRIORITY, MELBOURNE_N } from '@/lib/glow';

export default function SDGCallout({ sdg }: { sdg: string }) {
  const key = Object.keys(MELBOURNE_SDG_PRIORITY).find(
    (k) => k.toLowerCase() === sdg.toLowerCase(),
  );
  const pct = key ? MELBOURNE_SDG_PRIORITY[key] : undefined;
  if (pct === undefined) return null;

  return (
    <div className="card p-4">
      <div className="eyebrow mb-1">Melbourne priority</div>
      <div className="font-display text-4xl text-coral leading-none">{pct}%</div>
      <p className="text-sm text-ink-2 mt-1 leading-snug">
        rank <em className="font-serif italic">{key}</em> in their top 3
      </p>
      <p className="font-mono text-[10px] text-muted mt-2 uppercase tracking-wider">
        Glow · GMS · n={MELBOURNE_N.toLocaleString()}
      </p>
    </div>
  );
}
