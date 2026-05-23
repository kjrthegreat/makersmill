import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DashLogout } from '@/components/DashLogout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/vendor/login');

  const { data: vendor } = await supabase
    .from('vendors')
    .select('name, status, slug')
    .eq('user_id', user.id)
    .single();

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-top">
          <Link href="/" className="dash-brand">
            <Image src="/acorn.png" alt="Makers Mill" width={28} height={28} />
            <div>
              <div className="dash-brand-name">Makers Mill</div>
              <div className="dash-brand-sub">Vendor Portal</div>
            </div>
          </Link>
          {vendor && (
            <div className="dash-vendor-pill">
              <span className="dash-vendor-name">{vendor.name}</span>
              <span className={`dash-badge dash-badge--${vendor.status}`}>{vendor.status}</span>
            </div>
          )}
        </div>

        <div className="dash-nav">
          <Link href="/vendor/dashboard" className="dash-nav-item">
            <span className="dash-nav-icon">▦</span> Dashboard
          </Link>
          <Link href="/vendor/dashboard/products" className="dash-nav-item">
            <span className="dash-nav-icon">◈</span> Products
          </Link>
          <Link href="/vendor/dashboard/profile" className="dash-nav-item">
            <span className="dash-nav-icon">◉</span> Profile
          </Link>
          <Link href="/vendor/dashboard/settings" className="dash-nav-item">
            <span className="dash-nav-icon">⚙</span> Settings
          </Link>
          {vendor?.status === 'active' && (
            <Link
              href={`/vendors/${vendor.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="dash-nav-item dash-nav-item--preview"
            >
              <span className="dash-nav-icon">↗</span> Preview Page
            </Link>
          )}
        </div>

        <div className="dash-sidebar-foot">
          <DashLogout />
        </div>
      </aside>

      <main className="dash-content">
        {vendor?.status === 'pending' && (
          <div className="dash-pending-banner">
            <strong>Application under review.</strong> Your vendor page won&rsquo;t be
            public until we approve your account — usually within 2 business days.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
