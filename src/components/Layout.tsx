import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const BOTTOM_NAV = [
  { to: '/',           icon: '🗺',  label: 'Map' },
  { to: '/heroes',     icon: '⭐',  label: 'Heroes' },
  { to: '/leaderboard',icon: '🏆',  label: 'Board' },
  { to: '/about',      icon: '💡',  label: 'Why' },
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

  const accountLabel = !session ? 'Sign in' : (profile?.display_name?.split(' ')[0] ?? 'Account');

  return (
    <div className="min-h-full flex flex-col">

      {/* ── Top header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-heart-500 text-xl">♥</span>
            <span className="font-black text-lg tracking-tight">Good Sh*t</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {BOTTOM_NAV.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  loc.pathname === to
                    ? 'bg-heart-50 text-heart-600'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {session ? (
              <>
                <Link
                  to={accountTo}
                  className="text-sm font-medium text-stone-700 hover:text-stone-900"
                >
                  {accountLabel}
                </Link>
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-sm text-stone-500 hover:text-stone-700"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold bg-heart-500 text-white px-4 py-1.5 rounded-full hover:bg-heart-600 transition-colors"
              >
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile account icon */}
          <Link to={accountTo} className="md:hidden text-stone-600">
            <span className="text-xl">👤</span>
          </Link>
        </div>
      </header>

      {/* ── Page content ───────────────────────────────────────── */}
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* ── Mobile bottom nav ──────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-100 safe-bottom">
        <div className="grid grid-cols-4 h-16">
          {BOTTOM_NAV.map(({ to, icon, label }) => {
            const active = loc.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
                  active ? 'text-heart-500' : 'text-stone-500'
                }`}
              >
                <span className={`text-xl transition-transform ${active ? 'scale-110' : ''}`}>
                  {icon}
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Desktop footer ─────────────────────────────────────── */}
      <footer className="hidden md:block border-t border-stone-100 text-center text-xs text-stone-400 py-4">
        Good Sh*t — Melbourne Community Impact · Built at Claude Impact Lab, May 2026
      </footer>
    </div>
  );
}
