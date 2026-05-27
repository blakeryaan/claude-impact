import { createClient } from '@supabase/supabase-js';
import { mockSupabase, MOCKS_ON } from './mockSupabase';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const real = createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: any = MOCKS_ON ? mockSupabase : real;

if (MOCKS_ON && typeof window !== 'undefined') {
  // Visible in console so we know what's happening when reading the demo.
  // eslint-disable-next-line no-console
  console.info('[supabase] mock mode active (VITE_USE_MOCKS=true) — set to false to use real backend');
}
