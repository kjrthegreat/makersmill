import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Admin Dashboard | Makers Mill' };

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: pendingApps },
    { count: activeVendors },
    { count: pendingVendors },
    { count: totalProducts },
    { count: publishedProducts },
  ] = await Promise.all([
    supabase.from('vendor_applications').select('*', { count: 'exact', head: true }).eq('decision', 'pending'),
    supabase.from('vendors').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('vendors').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('status', 'published'),
  ]);

  const { data: recentVendors } = await supabase
    .from('vendors')
    .select('id, name, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  const { data: recentApps } = await supabase
    .from('vendor_applications')
    .select('id, business_name, applicant_email, submitted_at, decision')
    .order('submitted_at', { ascending: false })
    .limit(5);

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Admin Portal</p>
          <h1 className="dash-h1">Dashboard</h1>
        </div>
      </div>

      <div className="dash-stat-grid">
        <div className="dash-stat">
          <div className={`dash-stat-val${(pendingApps ?? 0) > 0 ? ' dash-stat-val--alert' : ''}`}>
            {pendingApps ?? 0}
          </div>
          <div className="dash-stat-label">Pending Applications</div>
          {(pendingApps ?? 0) > 0 && (
            <Link href="/admin/applications" className="dash-stat-action">Review →</Link>
          )}
        </div>
        <div className="dash-stat">
          <div className="dash-stat-val dash-stat-val--green">{activeVendors ?? 0}</div>
          <div className="dash-stat-label">Active Vendors</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-val dash-stat-val--muted">{pendingVendors ?? 0}</div>
          <div className="dash-stat-label">Pending Vendors</div>
        </div>
        <div className="dash-stat">
          <div className="dash-stat-val">{publishedProducts ?? 0}<span className="dash-stat-of">/{totalProducts ?? 0}</span></div>
          <div className="dash-stat-label">Products Published</div>
        </div>
      </div>

      <div className="dash-two-col">
        <div>
          <h2 className="dash-section-h">Recent Vendors</h2>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr><th>Name</th><th>Status</th><th>Joined</th></tr>
              </thead>
              <tbody>
                {recentVendors?.map(v => (
                  <tr key={v.id}>
                    <td><Link href={`/admin/vendors/${v.id}`} className="dash-action-link">{v.name}</Link></td>
                    <td><span className={`dash-badge dash-badge--${v.status}`}>{v.status}</span></td>
                    <td className="dash-table-muted">{new Date(v.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/admin/vendors" className="dash-see-all">See all vendors →</Link>
        </div>

        <div>
          <h2 className="dash-section-h">Recent Applications</h2>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr><th>Business</th><th>Status</th><th>Date</th></tr>
              </thead>
              <tbody>
                {recentApps?.map(a => (
                  <tr key={a.id}>
                    <td>
                      <div className="dash-table-name">{a.business_name}</div>
                      <div className="dash-table-muted" style={{ fontSize: 11 }}>{a.applicant_email}</div>
                    </td>
                    <td><span className={`dash-badge dash-badge--${a.decision}`}>{a.decision}</span></td>
                    <td className="dash-table-muted">{new Date(a.submitted_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/admin/applications" className="dash-see-all">See all applications →</Link>
        </div>
      </div>
    </div>
  );
}
