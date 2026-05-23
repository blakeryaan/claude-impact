import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const BOTTOM_NAV = [
  { to: '/',            icon: '★',  label: 'Heroes' },
  { to: '/map',         icon: '◎',  label: 'Map' },
  { to: '/leaderboard', icon: '↑',  label: 'Board' },
  { to: '/about',       icon: '?',  label: 'Why' },
];

export default function Layout() {
  const { session, profile } = useAuth();
  const loc = useLocation();

  const accountTo = !session
    ? '/login'
    : profile?.role === 'shop'
    ? '/shop/dashboard'
    : profile?.role === 'admin'
    ? '/admin'
    : '/me/favorites';

  return (
    <div className="min-h-full flex flex-col bg-paper">

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-paper border-b-2 border-ink" style={{ backgroundColor: '#F2EDE3' }}>
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">

          {/* Wordmark */}
          <Link to="/" className="font-display text-xl uppercase tracking-tight leading-none">
            Just Do Good Sh<span className="text-coral">*</span>t
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {BOTTOM_NAV.map(({ to, label }) => {
              const active = loc.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded transition-colors duration-fast ${
                    active
                      ? 'text-coral border-b-2 border-coral'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link to={accountTo} className="hidden md:block font-mono text-xs uppercase tracking-wider text-muted hover:text-ink transition-colors">
                  {profile?.display_name?.split(' ')[0] ?? 'Account'}
                </Link>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="hidden md:block btn-secondary !text-sm !px-4 !py-1.5"
                >
                  Sign out
                </button>
                <Link to={accountTo} className="md:hidden font-mono text-xs uppercase tracking-wider text-muted">
                  {profile?.display_name?.split(' ')[0] ?? '↑'}
                </Link>
              </>
            ) : (
              <Link to="/login" className="btn-primary !text-sm !px-5 !py-2">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────────── */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* ── Mobile bottom nav ───────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-paper border-t-2 border-ink safe-bottom" style={{ backgroundColor: '#F2EDE3' }}>
        <div className="grid grid-cols-4 h-16">
          {BOTTOM_NAV.map(({ to, icon, label }) => {
            const active = loc.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  active ? 'text-coral' : 'text-muted'
                }`}
              >
                <span className="font-display text-xl leading-none">{icon}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Desktop footer ──────────────────────────────────── */}
      <footer className="hidden md:block bg-ink border-t-2 border-ink py-4 px-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="font-display text-sm uppercase text-paper">
            Just Do Good Sh<span className="text-coral">*</span>t
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-paper/50">
            Melbourne · Claude Impact Lab · May 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
