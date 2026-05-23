import {
  MELBOURNE_SDG_AWARENESS_PCT,
  MELBOURNE_BRAND_SWITCH_PCT,
  MELBOURNE_N,
  MELBOURNE_SDG_PRIORITY,
} from '@/lib/glow';

const TOP_SDGS = Object.entries(MELBOURNE_SDG_PRIORITY)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 7);

const MAX_PCT = TOP_SDGS[0][1];

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">
      <h1 className="text-3xl font-black tracking-tight mb-1">Why Good Sh*t exists 💡</h1>
      <p className="text-stone-500 mb-6">
        Melburnians care deeply about social impact — and they're already voting with their wallets.
        Here's the data behind the app.
      </p>

      {/* Big stat cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-gradient-to-br from-heart-500 to-heart-700 rounded-2xl p-5 text-white">
          <div className="text-4xl font-black">{MELBOURNE_SDG_AWARENESS_PCT}%</div>
          <div className="text-sm font-semibold mt-1 text-white/90">SDG-aware</div>
          <div className="text-xs text-white/70 mt-1 leading-snug">
            vs 18.4% in regional Victoria
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-card border border-stone-100">
          <div className="text-4xl font-black text-stone-900">{MELBOURNE_BRAND_SWITCH_PCT}%</div>
          <div className="text-sm font-semibold text-stone-700 mt-1">switched brand</div>
          <div className="text-xs text-stone-400 mt-1 leading-snug">
            for social/env reasons in last 3 months
          </div>
        </div>
      </div>

      {/* SDG bar chart */}
      <div className="bg-white rounded-2xl shadow-card border border-stone-100 p-5 mb-6">
        <h2 className="font-black text-lg mb-1">What Melburnians care about most</h2>
        <p className="text-xs text-stone-400 mb-4">
          % ranking each SDG in personal top 3 · n={MELBOURNE_N.toLocaleString()}
        </p>
        <ol className="space-y-3">
          {TOP_SDGS.map(([sdg, pct], i) => (
            <li key={sdg} className="flex items-center gap-3">
              <span className="text-stone-400 font-bold text-sm w-5 text-right shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm font-semibold text-stone-800 truncate">{sdg}</span>
                  <span className="text-sm font-black text-heart-600 ml-2 shrink-0">{pct}%</span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-heart-500 to-heart-600 rounded-full transition-all"
                    style={{ width: `${(pct / MAX_PCT) * 100}%` }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="text-xs text-stone-400 text-center">
        Source: Glow / Global Market Signals SDG Demand Data Pack · 12,268 AU respondents ·
        3 waves Jul 2025–Mar 2026 · Melbourne subset n={MELBOURNE_N.toLocaleString()}
      </p>
    </div>
  );
}
