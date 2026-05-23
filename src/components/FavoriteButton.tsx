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
      <button
        onClick={toggle}
        className={on ? 'btn-primary !text-sm !px-4 !py-2' : 'btn-secondary !text-sm !px-4 !py-2'}
      >
        {on ? '★ Saved' : '☆ Save'}
      </button>
      {prompt && <LoginPromptDialog onClose={() => setPrompt(false)} />}
    </>
  );
}
