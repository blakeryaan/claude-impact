import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import LoginPromptDialog from './LoginPromptDialog';

export default function FavoriteButton({ businessId }: { businessId: string }) {
  const { session } = useAuth();
  const [on, setOn] = useState(false);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    if (!session) { setOn(false); return; }
    supabase.from('favorites').select('user_id').eq('user_id', session.user.id).eq('business_id', businessId).maybeSingle()
      .then(({ data }) => setOn(!!data));
  }, [session?.user.id, businessId]);

  async function toggle() {
    if (!session) { setPrompt(true); return; }
    if (on) {
      await supabase.from('favorites').delete().eq('user_id', session.user.id).eq('business_id', businessId);
      setOn(false);
    } else {
      await supabase.from('favorites').insert({ user_id: session.user.id, business_id: businessId });
      setOn(true);
    }
  }
  return (
    <>
      <button onClick={toggle} className={`rounded-full px-3 py-1 text-sm border ${on ? 'bg-heart-500 text-white border-heart-500' : 'bg-white hover:bg-stone-100'}`}>
        {on ? '★ Favourited' : '☆ Favourite'}
      </button>
      {prompt && <LoginPromptDialog onClose={() => setPrompt(false)} />}
    </>
  );
}
