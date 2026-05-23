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
    <div className="max-w-2xl mx-auto px-5 pt-8 pb-5">

      {/* Header — guidelines hierarchy pattern */}
      <div className="eyebrow mb-2">The evidence</div>
      <h1 className="font-display text-4xl md:text-6xl uppercase leading-none mb-1">
        Why This Exists
      </h1>
      <p className="font-serif italic text-muted text-lg mb-10">
        Melbourne people care deeply about social impact — and they're already voting with their wallets.
      </p>

      {/* Impact counters — "Anton 96–160px, coral, JetBrains Mono label" */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="card p-5 bg-ink border-ink">
          <div className="eyebrow mb-2 !text-paper/50">SDG awareness</div>
          <div className="font-display text-6xl text-coral leading-none tabular-nums">
            {MELBOURNE_SDG_AWARENESS_PCT}%
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-paper/70 mt-2 leading-snug">
            of Melburnians
          </div>
          <p className="font-serif italic text-paper/60 text-sm mt-2">
            vs 18.4% in regional Victoria
          </p>
        </div>
        <div className="card p-5">
          <div className="eyebrow mb-2">Switched brand</div>
          <div className="font-display text-6xl text-coral leading-none tabular-nums">
            {MELBOURNE_BRAND_SWITCH_PCT}%
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted mt-2 leading-snug">
            in last 3 months
          </div>
          <p className="font-serif italic text-muted text-sm mt-2">
            for social or environmental reasons
          </p>
        </div>
      </div>

      {/* SDG bar chart */}
      <div className="card p-5 mb-8">
        <div className="eyebrow mb-1">Community priorities</div>
        <h2 className="font-display text-2xl uppercase mb-1">What Melburnians care about most</h2>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-6">
          % ranking each SDG in personal top 3 · n={MELBOURNE_N.toLocaleString()}
        </p>
        <ol className="space-y-4">
          {TOP_SDGS.map(([sdg, pct], i) => (
            <li key={sdg} className="flex items-center gap-3">
              <span className="font-mono text-xs text-coral w-5 text-right shrink-0 tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-sm font-semibold text-ink truncate">{sdg}</span>
                  <span className="font-mono text-xs text-muted ml-2 shrink-0 tabular-nums">{pct}%</span>
                </div>
                <div className="h-1.5 bg-paper-2 rounded-full border border-ink/10 overflow-hidden">
                  <div
                    className="h-full bg-coral rounded-full"
                    style={{ width: `${(pct / MAX_PCT) * 100}%`, transition: 'width 600ms cubic-bezier(0.2, 0.0, 0.0, 1)' }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-widest text-muted text-center border-t-2 border-ink pt-4">
        Source: Glow / Global Market Signals SDG Demand Data Pack ·
        12,268 AU respondents · 3 waves Jul 2025–Mar 2026 ·
        Melbourne subset n={MELBOURNE_N.toLocaleString()}
      </p>
    </div>
  );
}
