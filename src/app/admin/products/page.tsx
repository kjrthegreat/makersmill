import { createClient } from '@/lib/supabase/server';
import { AdminProductActions } from '@/components/AdminProductActions';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'All Products | Admin' };

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from('products')
    .select('*, vendors(name, slug), product_images(url, sort_order)')
    .order('created_at', { ascending: false });

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Admin Portal</p>
          <h1 className="dash-h1">All Products</h1>
          <p className="dash-page-sub">{products?.length ?? 0} products across all vendors</p>
        </div>
      </div>

      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Vendor</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map(p => {
              const thumb = p.product_images
                ?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)[0]?.url;
              return (
                <tr key={p.id}>
                  <td>
                    <div className="dash-table-product">
                      {thumb ? (
                        <img src={thumb} alt={p.name} className="dash-table-thumb" />
                      ) : (
                        <div className="dash-table-thumb dash-table-thumb--empty">◈</div>
                      )}
                      <span className="dash-table-name">{p.name}</span>
                    </div>
                  </td>
                  <td className="dash-table-muted">{p.vendors?.name ?? '—'}</td>
                  <td className="dash-table-muted">{p.category ?? '—'}</td>
                  <td>{formatPrice(p.price)}</td>
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
    </div>
  );
}
