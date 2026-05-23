import {
  MELBOURNE_SDG_AWARENESS_PCT,
  MELBOURNE_BRAND_SWITCH_PCT,
  MELBOURNE_N,
  MELBOURNE_SDG_PRIORITY,
} from '@/lib/glow';

const TOP_SDGS = Object.entries(MELBOURNE_SDG_PRIORITY)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 5);

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Why Good Sh*t exists</h1>
      <p className="text-stone-600 mb-8">
        The data shows Melbourne people care deeply about social impact — and are already
        voting with their wallets. Good Sh*t makes it easy to find and reward the businesses
        that are doing something about it.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-heart-50 border border-heart-500 rounded-xl p-5">
          <div className="text-4xl font-bold text-heart-600">{MELBOURNE_SDG_AWARENESS_PCT}%</div>
          <div className="font-semibold mt-1">of Melburnians are SDG-aware</div>
          <div className="text-sm text-stone-600 mt-1">
            vs 18.4% in regional Victoria — Melbourne is ahead.
          </div>
        </div>
        <div className="bg-stone-100 rounded-xl p-5">
          <div className="text-4xl font-bold">{MELBOURNE_BRAND_SWITCH_PCT}%</div>
          <div className="font-semibold mt-1">switched brand in the last 3 months</div>
          <div className="text-sm text-stone-600 mt-1">
            for social or environmental reasons. That's nearly 1 in 5 Melburnians.
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">What Melburnians care about most</h2>
      <p className="text-sm text-stone-600 mb-4">
        % ranking each SDG in their personal top 3 (n={MELBOURNE_N.toLocaleString()}).
      </p>
      <ol className="space-y-2">
        {TOP_SDGS.map(([sdg, pct], i) => (
          <li key={sdg} className="flex items-center gap-3">
            <span className="text-stone-400 font-bold w-5 text-right">{i + 1}</span>
            <div className="flex-1">
              <div className="flex justify-between mb-0.5">
                <span className="text-sm font-medium">{sdg}</span>
                <span className="text-sm text-stone-600">{pct}%</span>
              </div>
              <div className="h-2 bg-stone-200 rounded-full">
                <div
                  className="h-2 bg-heart-500 rounded-full"
                  style={{ width: `${(pct / 30) * 100}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 text-xs text-stone-500">
        Source: Glow / Global Market Signals SDG Demand Data Pack, n=12,268 AU respondents across
        3 waves (Jul 2025–Mar 2026). Melbourne subset n={MELBOURNE_N.toLocaleString()}.
      </div>
    </div>
  );
}
