'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Props {
  vendorId: string;
  status: string;
  featured: boolean;
  slug: string;
}

export function VendorAdminActions({ vendorId, status, featured, slug }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function setStatus(newStatus: string) {
    if (newStatus === 'suspended' && !confirm('Suspend this vendor? Their page will be hidden from the public.')) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from('vendors').update({ status: newStatus }).eq('id', vendorId);
    router.refresh();
    setLoading(false);
  }

  async function toggleFeatured() {
    setLoading(true);
    const supabase = createClient();
    await supabase.from('vendors').update({ featured: !featured }).eq('id', vendorId);
    router.refresh();
    setLoading(false);
  }

  async function deleteVendor() {
    if (!confirm('Permanently delete this vendor and ALL their products? This cannot be undone.')) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from('vendors').delete().eq('id', vendorId);
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="dash-row-actions">
      {status !== 'active' && (
        <button type="button" className="dash-action-link dash-action-link--approve" onClick={() => setStatus('active')} disabled={loading}>
          Activate
        </button>
      )}
      {status === 'active' && (
        <button type="button" className="dash-action-link" onClick={() => setStatus('suspended')} disabled={loading}>
          Suspend
        </button>
      )}
      {status === 'pending' && (
        <button type="button" className="dash-action-link" onClick={() => setStatus('suspended')} disabled={loading}>
          Reject
        </button>
      )}
      <button type="button" className="dash-action-link" onClick={toggleFeatured} disabled={loading}>
        {featured ? 'Unfeature' : 'Feature'}
      </button>
      <Link href={`/admin/vendors/${vendorId}`} className="dash-action-link dash-action-link--approve">
        Edit
      </Link>
      <Link href={`/vendors/${slug}`} target="_blank" className="dash-action-link">
        View
      </Link>
      <button type="button" className="dash-action-link dash-action-link--danger" onClick={deleteVendor} disabled={loading}>
        Delete
      </button>
    </div>
  );
}
