import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

export default function Layout() {
  const { session, profile } = useAuth();
  const loc = useLocation();
  const navLink = (to: string, label: string) => (
    <Link to={to}
      className={`px-3 py-1 rounded-md text-sm ${loc.pathname === to ? 'bg-heart-500 text-white' : 'hover:bg-stone-200'}`}>
      {label}
    </Link>
  );
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b bg-white">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link to="/" className="font-bold text-xl text-heart-600 mr-4">Good Sh*t</Link>
          {navLink('/', 'Map')}
          {navLink('/heroes', 'Heroes')}
          {navLink('/leaderboard', 'Leaderboard')}
          <div className="ml-auto flex items-center gap-2">
            {session ? (
              <>
                <span className="text-sm text-stone-600">{profile?.display_name ?? session.user.email}</span>
                {profile?.role === 'customer' && navLink('/me/favorites', 'Favourites')}
                {profile?.role === 'shop'     && navLink('/shop/dashboard', 'My shop')}
                {profile?.role === 'admin'    && navLink('/admin', 'Admin')}
                <button onClick={() => supabase.auth.signOut()} className="text-sm text-stone-600 hover:underline">Sign out</button>
              </>
            ) : (
              <>
                {navLink('/login', 'Customer login')}
                {navLink('/shop/login', 'Shop login')}
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="flex-1"><Outlet /></main>
    </div>
  );
}
