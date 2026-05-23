import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import LoginPromptDialog from './LoginPromptDialog';

export default function ApplaudButton({ contributionId }: { contributionId: string }) {
  const { session } = useAuth();
  const [on, setOn] = useState(false);
  const [count, setCount] = useState(0);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    supabase.from('applause').select('user_id', { count: 'exact', head: true }).eq('contribution_id', contributionId)
      .then(({ count: c }) => setCount(c ?? 0));
    if (!session) { setOn(false); return; }
    supabase.from('applause').select('user_id').eq('user_id', session.user.id).eq('contribution_id', contributionId).maybeSingle()
      .then(({ data }) => setOn(!!data));
  }, [session?.user.id, contributionId]);

  async function toggle() {
    if (!session) { setPrompt(true); return; }
    if (on) {
      await supabase.from('applause').delete().eq('user_id', session.user.id).eq('contribution_id', contributionId);
      setOn(false); setCount((c) => c - 1);
    } else {
      await supabase.from('applause').insert({ user_id: session.user.id, contribution_id: contributionId });
      setOn(true); setCount((c) => c + 1);
    }
  }

  return (
    <>
      <button
        onClick={toggle}
        className={`font-mono text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-pill border transition-colors duration-fast ${
          on
            ? 'bg-coral border-coral text-ink'
            : 'bg-transparent border-muted text-muted hover:border-ink hover:text-ink'
        }`}
      >
        👏 {count}
      </button>
      {prompt && <LoginPromptDialog onClose={() => setPrompt(false)} />}
    </>
  );
}
