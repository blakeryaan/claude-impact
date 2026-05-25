import { useState, useEffect } from "react";

const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
`;

const CSS = `
  :root {
    --dgs-black:  #1C1C1A;
    --dgs-cream:  #F2EDE4;
    --dgs-orange: #E04E1E;
    --dgs-grey:   #2E2E2C;
    --dgs-muted:  #8A8880;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    background: var(--dgs-black);
    color: var(--dgs-cream);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .grain {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .app { position: relative; z-index: 1; max-width: 520px; margin: 0 auto; padding: 24px 16px 48px; }

  .header { margin-bottom: 28px; }
  .logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 2.2rem;
    letter-spacing: -0.5px;
    line-height: 1;
    color: var(--dgs-cream);
  }
  .logo span { color: var(--dgs-orange); }
  .subtitle {
    font-size: 0.8rem;
    color: var(--dgs-muted);
    margin-top: 4px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .filters {
    display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;
  }
  .filter-btn {
    background: transparent;
    border: 1px solid var(--dgs-grey);
    color: var(--dgs-muted);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 6px 12px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .filter-btn:hover { border-color: var(--dgs-cream); color: var(--dgs-cream); }
  .filter-btn.active { background: var(--dgs-orange); border-color: var(--dgs-orange); color: var(--dgs-cream); }

  .count {
    font-size: 0.75rem;
    color: var(--dgs-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 16px;
  }
  .count strong { color: var(--dgs-cream); }

  .empty {
    border: 1px solid var(--dgs-grey);
    padding: 48px 24px;
    text-align: center;
  }
  .empty-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    text-transform: uppercase;
    color: var(--dgs-cream);
    margin-bottom: 8px;
  }
  .empty-sub { font-size: 0.85rem; color: var(--dgs-muted); }

  .cards { display: flex; flex-direction: column; gap: 16px; }

  .card {
    border: 1px solid var(--dgs-grey);
    background: var(--dgs-black);
    padding: 20px;
    position: relative;
    transition: border-color 0.15s;
  }
  .card:hover { border-color: var(--dgs-muted); }

  .card-top {
    display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;
  }
  .emoji { font-size: 1.8rem; line-height: 1; flex-shrink: 0; }
  .card-meta { flex: 1; }
  .category-tag {
    display: inline-block;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dgs-orange);
    border: 1px solid var(--dgs-orange);
    padding: 2px 7px;
    margin-bottom: 4px;
  }
  .suburb-tag {
    font-size: 0.7rem;
    color: var(--dgs-muted);
    margin-left: 8px;
    letter-spacing: 0.05em;
  }
  .card-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 1.3rem;
    color: var(--dgs-cream);
    line-height: 1.1;
    text-transform: uppercase;
  }

  .card-oneliner {
    font-size: 0.88rem;
    color: rgba(242,237,228,0.75);
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .why-it-matters {
    font-size: 0.82rem;
    color: var(--dgs-orange);
    font-weight: 500;
    margin-bottom: 12px;
    line-height: 1.4;
  }

  .engage-list {
    display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;
  }
  .engage-item {
    font-size: 0.78rem;
    color: var(--dgs-cream);
    background: var(--dgs-grey);
    padding: 4px 10px;
    display: inline-block;
    width: fit-content;
  }

  .card-footer {
    display: flex; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--dgs-grey);
    padding-top: 12px;
    margin-top: 4px;
  }
  .card-link {
    font-size: 0.75rem;
    color: var(--dgs-muted);
    text-decoration: none;
    letter-spacing: 0.03em;
  }
  .card-link:hover { color: var(--dgs-cream); }

  .remove-btn {
    background: transparent;
    border: 1px solid var(--dgs-grey);
    color: var(--dgs-muted);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    cursor: pointer;
    transition: all 0.15s;
  }
  .remove-btn:hover { border-color: var(--dgs-orange); color: var(--dgs-orange); }

  .saved-date {
    font-size: 0.68rem;
    color: var(--dgs-muted);
    margin-top: 6px;
    text-align: right;
    letter-spacing: 0.04em;
  }

  .add-demo {
    margin-top: 32px;
    border-top: 1px solid var(--dgs-grey);
    padding-top: 24px;
  }
  .add-demo-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dgs-muted);
    margin-bottom: 12px;
  }
  .add-btn {
    background: var(--dgs-orange);
    border: none;
    color: var(--dgs-cream);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 12px 20px;
    cursor: pointer;
    transition: opacity 0.15s;
    width: 100%;
  }
  .add-btn:hover { opacity: 0.88; }

  .toast {
    position: fixed;
    bottom: 24px; left: 50%; transform: translateX(-50%);
    background: var(--dgs-orange);
    color: var(--dgs-cream);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 10px 20px;
    z-index: 100;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }
  .toast.show { opacity: 1; }
`;

const CATEGORY_MAP = {
  planet: { label: "Planet", emoji: "🌱" },
  people: { label: "People", emoji: "🤲" },
  food:   { label: "Food & Land", emoji: "🍚" },
  arts:   { label: "Arts & Culture", emoji: "🎨" },
};

const DEMO_ENTRIES = [
  {
    id: "demo-1",
    name: "Frankston Community Garden",
    suburb: "Frankston",
    category: "food",
    emoji: "🍚",
    oneLiner: "A volunteer-run garden on a disused council lot, growing fresh produce for anyone who needs it.",
    whyItMatters: "Diverted 800kg of food waste last year. Open every Saturday for drop-ins.",
    howToEngage: ["🙋 Volunteer: Show up Saturday 9am", "🛒 Visit: Corner of Davey & Young St"],
    website: "https://example.com",
    savedAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Reground",
    suburb: "Melbourne CBD",
    category: "planet",
    emoji: "🌱",
    oneLiner: "Picks up spent coffee grounds from 250+ Melbourne cafés and turns them into compost and skincare.",
    whyItMatters: "Kept 200+ tonnes of grounds out of landfill since 2014.",
    howToEngage: ["🤝 Get your café involved: reground.com.au", "🛒 Buy their compost online"],
    website: "https://reground.com.au",
    savedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const FILTERS = ["all", "planet", "people", "food", "arts"];

export default function App() {
  const [entries, setEntries] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get("dgs-shortlist");
        if (result && result.value) {
          setEntries(JSON.parse(result.value));
        } else {
          setEntries(DEMO_ENTRIES);
          await window.storage.set("dgs-shortlist", JSON.stringify(DEMO_ENTRIES));
        }
      } catch {
        setEntries(DEMO_ENTRIES);
      }
      setLoaded(true);
    })();
  }, []);

  const save = async (updated) => {
    setEntries(updated);
    try {
      await window.storage.set("dgs-shortlist", JSON.stringify(updated));
    } catch {}
  };

  const remove = (id) => {
    save(entries.filter(e => e.id !== id));
  };

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const addDemo = async () => {
    const extras = [
      {
        id: `entry-${Date.now()}`,
        name: "STREAT",
        suburb: "Collingwood",
        category: "people",
        emoji: "🤲",
        oneLiner: "A social enterprise training young people experiencing homelessness into hospitality careers.",
        whyItMatters: "Trained 1,200+ young people since 2010. Every coffee you buy funds a training placement.",
        howToEngage: ["🛒 Visit their café on Smith St", "🤝 Hire a graduate: streat.com.au"],
        website: "https://streat.com.au",
        savedAt: new Date().toISOString(),
      },
    ];
    const updated = [...entries, ...extras];
    await save(updated);
    showToast();
  };

  const filtered = activeFilter === "all"
    ? entries
    : entries.filter(e => e.category === activeFilter);

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
    } catch { return ""; }
  };

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="grain" />
      <div className="app">
        <div className="header">
          <div className="logo">DO GOOD SH<span>*</span>T</div>
          <div className="subtitle">Your patch · Good businesses worth supporting</div>
        </div>

        <div className="filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f === "all" ? "ALL" : CATEGORY_MAP[f]?.label}
            </button>
          ))}
        </div>

        {loaded && (
          <div className="count">
            <strong>{filtered.length}</strong> {filtered.length === 1 ? "place" : "places"} saved
            {activeFilter !== "all" && ` · ${CATEGORY_MAP[activeFilter]?.label}`}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-headline">Nothing here yet.</div>
            <div className="empty-sub">Go find something worth supporting.</div>
          </div>
        ) : (
          <div className="cards">
            {filtered.map(entry => (
              <div className="card" key={entry.id}>
                <div className="card-top">
                  <div className="emoji">{entry.emoji}</div>
                  <div className="card-meta">
                    <div>
                      <span className="category-tag">
                        {CATEGORY_MAP[entry.category]?.label || entry.category}
                      </span>
                      <span className="suburb-tag">{entry.suburb}</span>
                    </div>
                    <div className="card-name">{entry.name}</div>
                  </div>
                </div>

                <div className="card-oneliner">{entry.oneLiner}</div>
                <div className="why-it-matters">↳ {entry.whyItMatters}</div>

                {entry.howToEngage?.length > 0 && (
                  <div className="engage-list">
                    {entry.howToEngage.map((item, i) => (
                      <span key={i} className="engage-item">{item}</span>
                    ))}
                  </div>
                )}

                <div className="card-footer">
                  {entry.website
                    ? <a className="card-link" href={entry.website} target="_blank" rel="noopener">
                        {entry.website.replace(/^https?:\/\//, "")}
                      </a>
                    : <span />
                  }
                  <button className="remove-btn" onClick={() => remove(entry.id)}>
                    Remove
                  </button>
                </div>
                <div className="saved-date">Saved {formatDate(entry.savedAt)}</div>
              </div>
            ))}
          </div>
        )}

        <div className="add-demo">
          <div className="add-demo-label">Try adding a business ↓</div>
          <button className="add-btn" onClick={addDemo}>＋ SAVE TO MY LIST</button>
        </div>
      </div>

      <div className={`toast ${toast ? "show" : ""}`}>Saved to your list.</div>
    </>
  );
}
