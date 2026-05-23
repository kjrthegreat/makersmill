import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProductForm } from '@/components/ProductForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Add Product | Vendor Portal' };

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/vendor/login');

  const { data: vendor } = await supabase
    .from('vendors')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!vendor) redirect('/vendor/dashboard/profile');

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Vendor Portal</p>
          <h1 className="dash-h1">Add Product</h1>
        </div>
      </div>
      <ProductForm vendorId={vendor.id} userId={user.id} product={null} />
    </div>
  );
}
