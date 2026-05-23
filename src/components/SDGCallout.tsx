import { MELBOURNE_SDG_PRIORITY, MELBOURNE_N } from '@/lib/glow';

export default function SDGCallout({ sdg }: { sdg: string }) {
  const pct = MELBOURNE_SDG_PRIORITY[sdg];
  if (pct === undefined) return null;
  return (
    <div className="rounded-lg border-l-4 border-heart-500 bg-heart-50 p-3 text-sm">
      <strong>{pct}%</strong> of Melburnians rank <em>{sdg}</em> in their top 3 SDG priorities.
      <div className="text-xs text-stone-500 mt-1">Source: Glow / GMS, n={MELBOURNE_N.toLocaleString()}</div>
    </div>
  );
}
