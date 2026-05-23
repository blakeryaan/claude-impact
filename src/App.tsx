import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import MapPage from '@/pages/Map';
import Profile from '@/pages/Profile';
import Heroes from '@/pages/Heroes';
import Leaderboard from '@/pages/Leaderboard';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Favorites from '@/pages/Favorites';
import ShopLogin from '@/pages/shop/Login';
import ShopSignup from '@/pages/shop/Signup';
import ShopDashboard from '@/pages/shop/Dashboard';
import ShopProfile from '@/pages/shop/ShopProfile';
import ShopContributions from '@/pages/shop/Contributions';
import Admin from '@/pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Heroes />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/heroes" element={<Heroes />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/business/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/me/favorites" element={<Favorites />} />
          <Route path="/shop/login" element={<ShopLogin />} />
          <Route path="/shop/signup" element={<ShopSignup />} />
          <Route path="/shop/dashboard" element={<ShopDashboard />} />
          <Route path="/shop/profile" element={<ShopProfile />} />
          <Route path="/shop/contributions" element={<ShopContributions />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
