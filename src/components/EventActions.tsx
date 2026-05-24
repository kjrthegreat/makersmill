'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  eventId: string;
  status: string;
  editHref?: string;
}

export function EventActions({ eventId, status, editHref }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from('events')
      .update({ status: status === 'published' ? 'draft' : 'published' })
      .eq('id', eventId);
    router.refresh();
    setLoading(false);
  }

  async function deleteEvent() {
    if (!confirm('Delete this event? This cannot be undone.')) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.from('events').delete().eq('id', eventId);
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="dash-row-actions">
      {editHref && (
        <Link href={editHref} className="dash-action-link">Edit</Link>
      )}
      <button type="button" className="dash-action-link" onClick={toggleStatus} disabled={loading}>
        {status === 'published' ? 'Unpublish' : 'Publish'}
      </button>
      <button type="button" className="dash-action-link dash-action-link--danger" onClick={deleteEvent} disabled={loading}>
        Delete
      </button>
    </div>
  );
}
