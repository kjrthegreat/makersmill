import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DashLogout } from '@/components/DashLogout';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/vendor/login?next=/admin');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') redirect('/vendor/dashboard');

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar dash-sidebar--admin">
        <div className="dash-sidebar-top">
          <Link href="/" className="dash-brand">
            <Image src="/acorn.png" alt="Makers Mill" width={28} height={28} />
            <div>
              <div className="dash-brand-name">Makers Mill</div>
              <div className="dash-brand-sub" style={{ color: 'var(--rust)' }}>Admin Portal</div>
            </div>
          </Link>
        </div>

        <div className="dash-nav">
          <Link href="/admin" className="dash-nav-item">
            <span className="dash-nav-icon">▦</span> Dashboard
          </Link>
          <Link href="/admin/applications" className="dash-nav-item">
            <span className="dash-nav-icon">✉</span> Applications
          </Link>
          <Link href="/admin/vendors" className="dash-nav-item">
            <span className="dash-nav-icon">◉</span> Vendors
          </Link>
          <Link href="/admin/products" className="dash-nav-item">
            <span className="dash-nav-icon">◈</span> All Products
          </Link>
          <Link href="/admin/events" className="dash-nav-item">
            <span className="dash-nav-icon">◷</span> Events
          </Link>
          <Link href="/admin/settings" className="dash-nav-item">
            <span className="dash-nav-icon">⚙</span> Site Settings
          </Link>
          <div className="dash-nav-divider" />
          <Link href="/vendor/dashboard" className="dash-nav-item dash-nav-item--preview">
            <span className="dash-nav-icon">↩</span> Vendor View
          </Link>
        </div>

        <div className="dash-sidebar-foot">
          <DashLogout />
        </div>
      </aside>

      <main className="dash-content">
        {children}
      </main>
    </div>
  );
}
