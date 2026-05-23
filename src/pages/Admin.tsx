import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { Business } from '@/types';

export default function AdminPage() {
  const { session, profile, loading } = useAuth();
  const [pending, setPending] = useState<Business[]>([]);
  const [approved, setApproved] = useState<Business[]>([]);

  async function refresh() {
    const { data: p } = await supabase.from('businesses').select('*').eq('approved', false);
    const { data: a } = await supabase.from('businesses').select('*').eq('approved', true).order('name');
    setPending((p as Business[]) ?? []);
    setApproved((a as Business[]) ?? []);
  }

  useEffect(() => {
    if (profile?.role === 'admin') refresh();
  }, [profile?.role]);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <span className="font-mono text-xs uppercase tracking-widest text-muted">Loading…</span>
    </div>
  );
  if (!session || profile?.role !== 'admin') return <Navigate to="/" replace />;

  async function approve(id: string) {
    await supabase.from('businesses').update({ approved: true }).eq('id', id);
    refresh();
  }

  async function reject(id: string) {
    if (!confirm('Delete this pending application?')) return;
    await supabase.from('businesses').delete().eq('id', id);
    refresh();
  }

  async function removeBiz(id: string) {
    if (!confirm('Remove this business from the directory?')) return;
    await supabase.from('businesses').delete().eq('id', id);
    refresh();
  }

  async function toggleHero(b: Business) {
    await supabase.from('businesses').update({ is_hero: !b.is_hero }).eq('id', b.id);
    refresh();
  }

  return (
    <div className="max-w-5xl mx-auto px-5 pt-8 pb-5 space-y-10">

      {/* Header */}
      <div>
        <div className="eyebrow mb-2">Admin console</div>
        <h1 className="font-display text-4xl md:text-5xl uppercase leading-none">Directory</h1>
      </div>

      {/* Pending */}
      <section>
        <div className="flex items-baseline gap-3 mb-4 border-b-2 border-ink pb-2">
          <h2 className="font-display text-2xl uppercase">Pending</h2>
          <span className="font-mono text-xs text-coral uppercase tracking-widest">{pending.length} application{pending.length !== 1 ? 's' : ''}</span>
        </div>
        <ul className="space-y-2">
          {pending.map((b) => (
            <li key={b.id} className="card p-4 flex justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg uppercase leading-tight">{b.name}</div>
                <div className="text-sm text-ink-2 leading-snug mt-1 line-clamp-2">{b.bio}</div>
              </div>
              <div className="flex gap-2 shrink-0 items-start">
                <button
                  onClick={() => approve(b.id)}
                  className="btn-primary px-3 py-1.5 font-mono text-xs uppercase tracking-widest"
                >
                  Approve
                </button>
                <button
                  onClick={() => reject(b.id)}
                  className="btn-secondary px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-coral border-coral"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
          {pending.length === 0 && (
            <li className="font-mono text-xs uppercase tracking-widest text-muted text-center py-8">
              No pending applications.
            </li>
          )}
        </ul>
      </section>

      {/* Approved */}
      <section>
        <div className="flex items-baseline gap-3 mb-4 border-b-2 border-ink pb-2">
          <h2 className="font-display text-2xl uppercase">Approved</h2>
          <span className="font-mono text-xs text-muted uppercase tracking-widest">{approved.length} businesses</span>
        </div>
        <ul className="space-y-2">
          {approved.map((b) => (
            <li key={b.id} className="card p-4 flex justify-between items-center gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="font-display text-lg uppercase leading-tight truncate">{b.name}</div>
                {b.is_hero && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-coral border border-coral rounded-pill px-2 py-0.5 shrink-0">
                    Hero
                  </span>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => toggleHero(b)}
                  className="btn-secondary px-3 py-1.5 font-mono text-xs uppercase tracking-widest"
                >
                  {b.is_hero ? 'Unmark hero' : 'Mark hero'}
                </button>
                <button
                  onClick={() => removeBiz(b.id)}
                  className="font-mono text-xs uppercase tracking-widest text-coral border-2 border-coral rounded-pill px-3 py-1.5 hover:bg-coral hover:text-ink transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
