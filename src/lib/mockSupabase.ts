// Tiny in-memory shim emulating just enough of supabase-js to demo the UI offline.
// Supports the read patterns the pages actually use; writes are no-ops + local state.
// Activated by `VITE_USE_MOCKS=true` in .env.local — see ./supabase.ts.

import { BUSINESSES, CONTRIBUTIONS, computeBusinessPoints, type MockBusiness, type MockContribution } from './mockData';

type Row = Record<string, any>;
type Result<T> = Promise<{ data: T; error: null; count?: number | null }>;

const ok = <T>(data: T, count?: number): Result<T> =>
  Promise.resolve({ data, error: null, count: count ?? null });

const PRIVATE_LOCAL: Record<string, Row[]> = {
  favorites: [],
  applause: [],
  follows: [],
  nominations: [],
  testimonials: [],
  profiles: [],
};

function source(table: string): Row[] {
  switch (table) {
    case 'businesses':            return BUSINESSES as unknown as Row[];
    case 'contributions':         return CONTRIBUTIONS as unknown as Row[];
    case 'business_heart_points': return computeBusinessPoints() as unknown as Row[];
    default:                      return PRIVATE_LOCAL[table] ?? (PRIVATE_LOCAL[table] = []);
  }
}

class Query {
  private rows: Row[];
  private filters: ((r: Row) => boolean)[] = [];
  private wantSingle: 'one' | 'maybe' | null = null;
  private headOnly = false;
  private wantCount = false;
  private orderKey: string | null = null;
  private orderAsc = true;
  private limitN: number | null = null;

  constructor(private table: string) {
    this.rows = source(table);
  }
  select(_cols?: string, opts?: { count?: 'exact'; head?: boolean }) {
    if (opts?.head) this.headOnly = true;
    if (opts?.count) this.wantCount = true;
    return this;
  }
  eq(col: string, val: any) { this.filters.push((r) => r[col] === val); return this; }
  gte(col: string, val: any) { this.filters.push((r) => r[col] >= val); return this; }
  in(col: string, vals: any[]) { const s = new Set(vals); this.filters.push((r) => s.has(r[col])); return this; }
  order(col: string, opts?: { ascending?: boolean }) { this.orderKey = col; this.orderAsc = opts?.ascending !== false; return this; }
  limit(n: number) { this.limitN = n; return this; }
  single() { this.wantSingle = 'one'; return this.exec(); }
  maybeSingle() { this.wantSingle = 'maybe'; return this.exec(); }
  insert(_row: any) { return { select: () => ({ single: () => ok(null) }), then: (cb: any) => cb({ data: null, error: null }) } as any; }
  update(_patch: any) { return { eq: () => ok(null) } as any; }
  delete() { return { eq: () => ok(null) } as any; }
  then(onFulfilled: any, onRejected?: any) { return this.exec().then(onFulfilled, onRejected); }

  private exec(): Result<any> {
    let out = this.rows;
    for (const f of this.filters) out = out.filter(f);
    if (this.orderKey) {
      const k = this.orderKey, asc = this.orderAsc;
      out = [...out].sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0) * (asc ? 1 : -1));
    }
    if (this.limitN !== null) out = out.slice(0, this.limitN);
    if (this.wantCount && this.headOnly) return ok(null as any, out.length);
    if (this.wantSingle === 'one')   return ok(out[0] ?? null);
    if (this.wantSingle === 'maybe') return ok(out[0] ?? null);
    return ok(out, out.length);
  }
}

export const mockSupabase = {
  from(table: string) { return new Query(table); },
  auth: {
    async getSession() { return { data: { session: null }, error: null }; },
    onAuthStateChange(_cb: any) { return { data: { subscription: { unsubscribe() {} } } }; },
    async signInWithPassword() { return { data: { session: null, user: null }, error: { message: 'Mock mode — set up Supabase to enable auth.' } as any }; },
    async signInAnonymously() { return { data: { user: null, session: null }, error: { message: 'Mock mode — anonymous auth disabled.' } as any }; },
    async signUp() { return { data: { user: null, session: null }, error: { message: 'Mock mode — sign up disabled.' } as any }; },
    async signOut() { return { error: null }; },
  },
} as any;

export const MOCKS_ON = (import.meta.env.VITE_USE_MOCKS as string | undefined) === 'true';

// Type-asserted alias so the existing `import { supabase } from './supabase'` keeps working.
// Mock and real clients share the surface that callers actually use, but not full SupabaseClient typings.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const _typed = mockSupabase as any;
