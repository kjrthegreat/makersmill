import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/ProfileForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit Profile | Vendor Portal' };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/vendor/login');

  const { data: vendor } = await supabase
    .from('vendors')
    .select('*')
    .eq('user_id', user.id)
    .single();

  const { data: hours } = await supabase
    .from('vendor_hours')
    .select('*')
    .eq('vendor_id', vendor?.id ?? '')
    .order('day_of_week');

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Vendor Portal</p>
          <h1 className="dash-h1">Your Profile</h1>
          <p className="dash-page-sub">This is what customers see on your public vendor page.</p>
        </div>
      </div>
      <ProfileForm vendor={vendor} hours={hours ?? []} userId={user.id} />
    </div>
  );
}
