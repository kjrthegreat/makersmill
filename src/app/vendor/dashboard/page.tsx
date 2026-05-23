import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard | Vendor Portal' };

export default async function DashboardHome() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/vendor/login');

  const { data: vendor } = await supabase
    .from('vendors')
    .select('*, products(count)')
    .eq('user_id', user.id)
    .single();

  const { count: publishedCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', vendor?.id ?? '')
    .eq('status', 'published');

  const { count: draftCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', vendor?.id ?? '')
    .eq('status', 'draft');

  const totalCount = (publishedCount ?? 0) + (draftCount ?? 0);
  const profileComplete = !!(vendor?.name && vendor?.description && vendor?.contact_email);

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Vendor Dashboard</p>
          <h1 className="dash-h1">
            {vendor ? `Welcome back, ${vendor.name}` : 'Your Dashboard'}
          </h1>
        </div>
        <Link href="/vendor/dashboard/products/new" className="btn btn-fill">
          + Add Product
        </Link>
      </div>

      <div className="dash-stat-grid">
        <div className="dash-stat">
          <div className="dash-stat-val">{totalCount}</div>
          <div className="dash-stat-label">Total Products</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-val dash-stat-val--green">{publishedCount ?? 0}</div>
          <div className="dash-stat-label">Published</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-val dash-stat-val--muted">{draftCount ?? 0}</div>
          <div className="dash-stat-label">Drafts</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-val">
            {profileComplete ? (
              <span style={{ color: 'var(--orange)' }}>✓</span>
            ) : (
              <span style={{ color: 'var(--rust)' }}>!</span>
            )}
          </div>
          <div className="dash-stat-label">Profile Complete</div>
        </div>
      </div>

      <div className="dash-cards-row">
        <div className="dash-quick-card">
          <div className="dash-quick-icon">◈</div>
          <div className="dash-quick-body">
            <div className="dash-quick-title">Manage Products</div>
            <div className="dash-quick-desc">Add, edit, and publish the items you sell.</div>
          </div>
          <Link href="/vendor/dashboard/products" className="btn btn-outline">Go →</Link>
        </div>
        <div className="dash-quick-card">
          <div className="dash-quick-icon">◉</div>
          <div className="dash-quick-body">
            <div className="dash-quick-title">Edit Your Profile</div>
            <div className="dash-quick-desc">Update your store description, logo, hours, and links.</div>
          </div>
          <Link href="/vendor/dashboard/profile" className="btn btn-outline">Go →</Link>
        </div>
      </div>

      {!profileComplete && (
        <div className="dash-notice">
          <strong>Your profile is incomplete.</strong>{' '}
          Add a description and contact email so customers know who you are.{' '}
          <Link href="/vendor/dashboard/profile" className="dash-notice-link">
            Complete your profile →
          </Link>
        </div>
      )}
    </div>
  );
}
