import { createClient } from '@/lib/supabase/server';
import { VendorAdminActions } from '@/components/VendorAdminActions';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Vendors | Admin' };

export default async function AdminVendorsPage() {
  const supabase = await createClient();

  const { data: vendors } = await supabase
    .from('vendors')
    .select('*, products(count)')
    .order('status')
    .order('created_at', { ascending: false });

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Admin Portal</p>
          <h1 className="dash-h1">All Vendors</h1>
          <p className="dash-page-sub">{vendors?.length ?? 0} vendors total</p>
        </div>
      </div>

      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Slug</th>
              <th>Products</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors?.map(v => (
              <tr key={v.id}>
                <td>
                  <div className="dash-table-name">{v.name}</div>
                  {v.tagline && <div className="dash-table-muted">{v.tagline}</div>}
                </td>
                <td className="dash-table-muted">/{v.slug}</td>
                <td className="dash-table-muted">
                  {Array.isArray(v.products) ? v.products[0]?.count ?? 0 : 0}
                </td>
                <td>
                  <span className={`dash-badge dash-badge--${v.status}`}>{v.status}</span>
                </td>
                <td>
                  {v.featured ? (
                    <span className="dash-badge dash-badge--active">Yes</span>
                  ) : (
                    <span className="dash-table-muted">—</span>
                  )}
                </td>
                <td className="dash-table-muted">
                  {new Date(v.created_at).toLocaleDateString()}
                </td>
                <td>
                  <VendorAdminActions
                    vendorId={v.id}
                    status={v.status}
                    featured={v.featured}
                    slug={v.slug}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
