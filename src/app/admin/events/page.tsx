import { createClient } from '@/lib/supabase/server';
import { EventActions } from '@/components/EventActions';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { Event } from '@/types/vendor';

export const metadata: Metadata = { title: 'Events | Admin' };

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDate(event: Event) {
  if (event.recurring && event.recurring_day) return `Every ${event.recurring_day}`;
  if (event.event_date) {
    const d = new Date(event.event_date + 'T00:00:00');
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
  return '—';
}

export default async function AdminEventsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('sort_order')
    .order('created_at');

  const published = events?.filter(e => e.status === 'published').length ?? 0;

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Admin Portal</p>
          <h1 className="dash-h1">Events</h1>
          <p className="dash-page-sub">{events?.length ?? 0} total · {published} published</p>
        </div>
        <Link href="/admin/events/new" className="btn btn-fill">
          + New Event
        </Link>
      </div>

      <div className="dash-table-wrap">
        <table className="dash-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((e: Event) => (
              <tr key={e.id}>
                <td>
                  <div className="dash-table-name">{e.name}</div>
                  {e.tag && <div className="dash-table-muted" style={{ fontSize: 11 }}>{e.tag}</div>}
                </td>
                <td className="dash-table-muted">{e.type ?? '—'}</td>
                <td className="dash-table-muted">{formatDate(e)}</td>
                <td className="dash-table-muted">{e.time_label ?? '—'}</td>
                <td>
                  <span className={`dash-badge dash-badge--${e.status === 'published' ? 'active' : 'pending'}`}>
                    {e.status}
                  </span>
                </td>
                <td className="dash-table-muted">{e.sort_order}</td>
                <td>
                  <EventActions eventId={e.id} status={e.status} editHref={`/admin/events/${e.id}`} />
                </td>
              </tr>
            ))}
            {(!events || events.length === 0) && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: 'var(--tan)', padding: '2rem' }}>
                  No events yet. <Link href="/admin/events/new" className="dash-action-link">Add the first one →</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
