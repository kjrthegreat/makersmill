'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Props {
  productId: string;
  status: string;
}

export function AdminProductActions({ productId, status }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from('products')
      .update({ status: status === 'published' ? 'draft' : 'published' })
      .eq('id', productId);
    router.refresh();
    setLoading(false);
  }

  async function removeProduct() {
    if (!confirm('Remove this product? The vendor will lose access to it.')) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from('products').delete().eq('id', productId);
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="dash-row-actions">
      <button type="button" className="dash-action-link" onClick={toggleStatus} disabled={loading}>
        {status === 'published' ? 'Unpublish' : 'Publish'}
      </button>
      <button type="button" className="dash-action-link dash-action-link--danger" onClick={removeProduct} disabled={loading}>
        Remove
      </button>
    </div>
  );
}
