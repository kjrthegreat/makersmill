import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ProductActions } from '@/components/ProductActions';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Products | Vendor Portal' };

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/vendor/login');

  const { data: vendor } = await supabase
    .from('vendors')
    .select('id')
    .eq('user_id', user.id)
    .single();

  const { data: products } = await supabase
    .from('products')
    .select('*, product_images(url, sort_order)')
    .eq('vendor_id', vendor?.id ?? '')
    .order('created_at', { ascending: false });

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Vendor Portal</p>
          <h1 className="dash-h1">Your Products</h1>
          <p className="dash-page-sub">{products?.length ?? 0} products — {products?.filter(p => p.status === 'published').length ?? 0} published</p>
        </div>
        <Link href="/vendor/dashboard/products/new" className="btn btn-fill">
          + Add Product
        </Link>
      </div>

      {(!products || products.length === 0) ? (
        <div className="dash-empty">
          <div className="dash-empty-icon">◈</div>
          <h2 className="dash-empty-h">No products yet</h2>
          <p className="dash-empty-p">Add your first product to start building your shop.</p>
          <Link href="/vendor/dashboard/products/new" className="btn btn-fill">
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="dash-table-wrap">
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
              {products.map(product => {
                const thumb = product.product_images
                  ?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)[0]?.url;
                return (
                  <tr key={product.id}>
                    <td>
                      <div className="dash-table-product">
                        {thumb ? (
                          <img src={thumb} alt={product.name} className="dash-table-thumb" />
                        ) : (
                          <div className="dash-table-thumb dash-table-thumb--empty">◈</div>
                        )}
                        <span className="dash-table-name">{product.name}</span>
                      </div>
                    </td>
                    <td className="dash-table-muted">{product.category ?? '—'}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>
                      <span className={`dash-badge dash-badge--${product.status}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <ProductActions productId={product.id} status={product.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
