import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import LoginPromptDialog from './LoginPromptDialog';

export default function FollowButton({ businessId }: { businessId: string }) {
  const { session } = useAuth();
  const [on, setOn] = useState(false);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    if (!session) { setOn(false); return; }
    supabase.from('follows').select('user_id').eq('user_id', session.user.id).eq('business_id', businessId).maybeSingle()
      .then(({ data }) => setOn(!!data));
  }, [session?.user.id, businessId]);

  async function toggle() {
    if (!session) { setPrompt(true); return; }
    if (on) {
      await supabase.from('follows').delete().eq('user_id', session.user.id).eq('business_id', businessId);
      setOn(false);
    } else {
      await supabase.from('follows').insert({ user_id: session.user.id, business_id: businessId });
      setOn(true);
    }
  }

  return (
    <>
      <button
        onClick={toggle}
        className="btn-secondary !text-sm !px-4 !py-2"
      >
        {on ? '● Following' : '○ Follow'}
      </button>
      {prompt && <LoginPromptDialog onClose={() => setPrompt(false)} />}
    </>
  );
}
