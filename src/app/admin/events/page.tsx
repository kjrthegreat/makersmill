import Link from 'next/link';
import { listEventRows } from '@/lib/db';
import { DeleteButton } from '../DeleteButton';
import { deleteEventAction } from './actions';

export const dynamic = 'force-dynamic';

const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default async function AdminEvents() {
  const events = await listEventRows();

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <Link href="/admin" className="admin-crumb">← Dashboard</Link>
          <h1 className="admin-h">Events</h1>
          <p className="admin-sub">Homepage calendar — {events.length} entries.</p>
        </div>
        <Link href="/admin/events/new" className="admin-btn">+ Add event</Link>
      </div>

      {events.length === 0 ? (
        <p className="admin-empty">No events yet. Add your first one.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>When</th>
              <th>Tag</th>
              <th>Accent</th>
              <th className="admin-th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td className="admin-td-strong">{e.title}</td>
                <td>{e.type}</td>
                <td>
                  {e.weekday != null ? `Weekly · ${DOW[e.weekday]}` : e.date ?? '—'}
                  {e.time ? ` · ${e.time}` : ''}
                </td>
                <td>{e.tag ?? '—'}</td>
                <td>
                  <span className={`admin-dot admin-dot--${e.accent}`} />
                  {e.accent}
                </td>
                <td>
                  <div className="admin-row-actions">
                    <Link href={`/admin/events/${e.id}`} className="admin-link-edit">Edit</Link>
                    <DeleteButton action={deleteEventAction.bind(null, e.id)} what={e.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
