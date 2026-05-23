import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AdminVendorForm } from '@/components/AdminVendorForm';
import { AdminProductActions } from '@/components/AdminProductActions';

export const metadata: Metadata = { title: 'Edit Vendor | Admin' };

export default async function AdminVendorEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: vendor } = await supabase
    .from('vendors')
    .select('*')
    .eq('id', id)
    .single();

  if (!vendor) notFound();

  const { data: hours } = await supabase
    .from('vendor_hours')
    .select('*')
    .eq('vendor_id', id)
    .order('day_of_week');

  const { data: products } = await supabase
    .from('products')
    .select('*, product_images(url, sort_order)')
    .eq('vendor_id', id)
    .order('sort_order')
    .order('created_at', { ascending: false });

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">
            <Link href="/admin/vendors" style={{ color: 'var(--gray)' }}>Admin / Vendors</Link>
            {' '}/ {vendor.name}
          </p>
          <h1 className="dash-h1">Edit: {vendor.name}</h1>
          <p className="dash-page-sub" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className={`dash-badge dash-badge--${vendor.status}`}>{vendor.status}</span>
            <a href={`/vendors/${vendor.slug}`} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--orange)', fontSize: 12, fontFamily: 'var(--cond)', letterSpacing: '.08em' }}>
              View public page ↗
            </a>
          </p>
        </div>
      </div>

      <AdminVendorForm vendor={vendor} hours={hours ?? []} />

      {/* ── PRODUCTS ── */}
      <div style={{ marginTop: 48 }}>
        <div className="dash-page-head" style={{ marginBottom: 0, paddingBottom: 0 }}>
          <div>
            <h2 className="dash-h1" style={{ fontSize: 22 }}>Products</h2>
            <p className="dash-page-sub">{products?.length ?? 0} products</p>
          </div>
          <Link href={`/admin/products?vendor=${id}`} className="btn btn-outline" style={{ fontSize: 12 }}>
            Manage in Products →
          </Link>
        </div>

        {products && products.length > 0 ? (
          <div className="dash-table-wrap" style={{ marginTop: 16 }}>
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => {
                  const thumb = (p.product_images as { url: string; sort_order: number }[] | undefined)
                    ?.sort((a, b) => a.sort_order - b.sort_order)[0]?.url;
                  return (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {thumb && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={thumb} alt={p.name} className="dash-table-thumb" />
                          )}
                          <div className="dash-table-name">{p.name}</div>
                        </div>
                      </td>
                      <td className="dash-table-muted">{p.category ?? '—'}</td>
                      <td className="dash-table-muted">${(p.price / 100).toFixed(2)}</td>
                      <td>
                        <span className={`dash-badge dash-badge--${p.status}`}>{p.status}</span>
                      </td>
                      <td>
                        <AdminProductActions productId={p.id} status={p.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="dash-empty">No products yet for this vendor.</div>
        )}
      </div>
    </div>
  );
}
