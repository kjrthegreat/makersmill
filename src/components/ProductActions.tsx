'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Props {
  productId: string;
  status: string;
}

export function ProductActions({ productId, status }: Props) {
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

  async function deleteProduct() {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from('products').delete().eq('id', productId);
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="dash-row-actions">
      <Link href={`/vendor/dashboard/products/${productId}`} className="dash-action-link">
        Edit
      </Link>
      <button
        type="button"
        className="dash-action-link"
        onClick={toggleStatus}
        disabled={loading}
      >
        {status === 'published' ? 'Unpublish' : 'Publish'}
      </button>
      <button
        type="button"
        className="dash-action-link dash-action-link--danger"
        onClick={deleteProduct}
        disabled={loading}
      >
        Delete
      </button>
    </div>
  );
}
