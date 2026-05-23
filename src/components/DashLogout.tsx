'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function DashLogout() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/vendor/login');
    router.refresh();
  }

  return (
    <button type="button" className="dash-logout" onClick={handleLogout}>
      Sign Out
    </button>
  );
}
