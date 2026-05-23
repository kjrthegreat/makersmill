'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Props {
  applicationId: string;
  email: string;
  businessName: string;
}

export function ApplicationActions({ applicationId, email, businessName }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState('');

  async function approve() {
    if (!confirm(`Approve ${businessName}? This will activate their vendor account.`)) return;
    setLoading(true);
    const supabase = createClient();
    const now = new Date().toISOString();

    // Mark application approved
    await supabase
      .from('vendor_applications')
      .update({ decision: 'approved', reviewed_at: now })
      .eq('id', applicationId);

    // Activate vendor account (find by email via auth admin)
    // Find the vendor record by matching application email to vendor's user email
    const { data: { users } } = await (supabase as any).auth.admin.listUsers();
    const matchedUser = users?.find((u: { email: string }) => u.email === email);
    if (matchedUser) {
      await supabase
        .from('vendors')
        .update({ status: 'active' })
        .eq('user_id', matchedUser.id);
    }

    router.refresh();
    setLoading(false);
  }

  async function reject() {
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from('vendor_applications')
      .update({
        decision: 'rejected',
        reviewed_at: new Date().toISOString(),
        rejection_reason: reason || null,
      })
      .eq('id', applicationId);
    router.refresh();
    setLoading(false);
    setShowReject(false);
  }

  if (showReject) {
    return (
      <div className="dash-reject-inline">
        <input
          type="text"
          className="dash-reject-input"
          placeholder="Reason (optional)"
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
        <button type="button" className="dash-action-link dash-action-link--danger" onClick={reject} disabled={loading}>
          Confirm Reject
        </button>
        <button type="button" className="dash-action-link" onClick={() => setShowReject(false)}>
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="dash-row-actions">
      <button type="button" className="dash-action-link dash-action-link--approve" onClick={approve} disabled={loading}>
        Approve
      </button>
      <button type="button" className="dash-action-link dash-action-link--danger" onClick={() => setShowReject(true)} disabled={loading}>
        Reject
      </button>
    </div>
  );
}
