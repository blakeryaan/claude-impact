import { MELBOURNE_SDG_PRIORITY, MELBOURNE_N } from '@/lib/glow';

export default function SDGCallout({ sdg }: { sdg: string }) {
  // Case-insensitive lookup
  const key = Object.keys(MELBOURNE_SDG_PRIORITY).find(
    (k) => k.toLowerCase() === sdg.toLowerCase(),
  );
  const pct = key ? MELBOURNE_SDG_PRIORITY[key] : undefined;
  if (pct === undefined) return null;
  return (
    <div className="rounded-lg border-l-4 border-heart-500 bg-heart-50 p-3 text-sm">
      <strong>{pct}%</strong> of Melburnians rank <em>{key}</em> in their top 3 SDG priorities.
      <div className="text-xs text-stone-500 mt-1">
        Source: Glow / GMS, n={MELBOURNE_N.toLocaleString()}
      </div>
    </div>
  );
}
