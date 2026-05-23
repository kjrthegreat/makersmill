import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { ProductForm } from '@/components/ProductForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit Product | Vendor Portal' };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/vendor/login');

  const { data: vendor } = await supabase
    .from('vendors')
    .select('id')
    .eq('user_id', user.id)
    .single();

  const { data: product } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('id', id)
    .eq('vendor_id', vendor?.id ?? '')
    .single();

  if (!product) notFound();

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Vendor Portal</p>
          <h1 className="dash-h1">Edit Product</h1>
        </div>
      </div>
      <ProductForm vendorId={vendor!.id} userId={user.id} product={product} />
    </div>
  );
}
