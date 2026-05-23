import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

export default function Layout() {
  const { session, profile } = useAuth();
  const loc = useLocation();

  const navLink = (to: string, label: string) => (
    <Link
      key={to}
      to={to}
      className={`px-3 py-1 rounded-md text-sm font-medium ${
        loc.pathname === to ? 'bg-heart-500 text-white' : 'hover:bg-stone-200'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b bg-white sticky top-0 z-30">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 flex-wrap">
          <Link to="/" className="font-bold text-xl text-heart-600 mr-4">
            Good Sh*t
          </Link>
          {navLink('/', 'Map')}
          {navLink('/heroes', 'Heroes')}
          {navLink('/leaderboard', 'Leaderboard')}
          {navLink('/about', 'Why this exists')}
          <div className="ml-auto flex items-center gap-2">
            {session ? (
              <>
                <span className="text-sm text-stone-600 hidden sm:inline">
                  {profile?.display_name ?? session.user.email}
                </span>
                {profile?.role === 'customer' && navLink('/me/favorites', 'Favourites')}
                {profile?.role === 'shop' && navLink('/shop/dashboard', 'My shop')}
                {profile?.role === 'admin' && navLink('/admin', 'Admin')}
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-sm text-stone-600 hover:underline"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                {navLink('/login', 'Login')}
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t text-center text-xs text-stone-500 py-4 mt-8">
        Good Sh*t — Melbourne Community Impact · Built at Claude Impact Lab, May 2026
      </footer>
    </div>
  );
}
