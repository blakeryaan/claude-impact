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
  useEffect(() => { if (profile?.role === 'admin') refresh(); }, [profile?.role]);

  if (loading) return <div className="p-8">…</div>;
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
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-2">Pending applications ({pending.length})</h1>
        <ul className="space-y-2">
          {pending.map((b) => (
            <li key={b.id} className="bg-white rounded p-3 shadow-sm flex justify-between gap-2">
              <div>
                <div className="font-semibold">{b.name}</div>
                <div className="text-sm text-stone-600">{b.bio}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => approve(b.id)} className="bg-green-600 text-white rounded px-3 py-1 text-sm">Approve</button>
                <button onClick={() => reject(b.id)} className="bg-red-600 text-white rounded px-3 py-1 text-sm">Reject</button>
              </div>
            </li>
          ))}
          {pending.length === 0 && <li className="text-stone-500 text-sm">No pending applications.</li>}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-2">Approved businesses ({approved.length})</h2>
        <ul className="space-y-2">
          {approved.map((b) => (
            <li key={b.id} className="bg-white rounded p-3 shadow-sm flex justify-between items-center">
              <div className="font-semibold">{b.name}{b.is_hero && <span className="ml-2 text-xs bg-heart-50 text-heart-600 rounded-full px-2">Hero</span>}</div>
              <div className="flex gap-2">
                <button onClick={() => toggleHero(b)} className="text-sm border rounded px-3 py-1">{b.is_hero ? 'Unmark hero' : 'Mark hero'}</button>
                <button onClick={() => removeBiz(b.id)} className="text-sm bg-red-600 text-white rounded px-3 py-1">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
