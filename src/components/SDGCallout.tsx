import { MELBOURNE_SDG_PRIORITY, MELBOURNE_N } from '@/lib/glow';
import { sdgChipClass } from '@/lib/sdgColors';

export default function SDGCallout({ sdg }: { sdg: string }) {
  const key = Object.keys(MELBOURNE_SDG_PRIORITY).find(
    (k) => k.toLowerCase() === sdg.toLowerCase(),
  );
  const pct = key ? MELBOURNE_SDG_PRIORITY[key] : undefined;
  if (pct === undefined) return null;

  return (
    <div className="rounded-2xl bg-white border border-stone-100 shadow-card p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${sdgChipClass(sdg)}`}>
          {key}
        </span>
        <span className="text-2xl font-black text-stone-900 shrink-0">{pct}%</span>
      </div>
      <p className="text-sm text-stone-600 leading-snug">
        of Melburnians rank this in their personal top 3 SDG priorities.
      </p>
      <p className="text-xs text-stone-400 mt-1.5">Glow / GMS · n={MELBOURNE_N.toLocaleString()}</p>
    </div>
  );
}
