import Link from 'next/link';
import { getEvents } from '@/lib/db';

export const dynamic = 'force-dynamic';

const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default async function AdminEvents() {
  const events = await getEvents();

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <Link href="/admin" className="admin-crumb">← Dashboard</Link>
          <h1 className="admin-h">Events</h1>
          <p className="admin-sub">Homepage calendar — {events.length} entries.</p>
        </div>
        <button type="button" className="admin-btn" disabled title="Coming in the next phase">
          + Add event
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>When</th>
            <th>Tag</th>
            <th>Accent</th>
            <th>CTA</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e, i) => (
            <tr key={i}>
              <td className="admin-td-strong">{e.title}</td>
              <td>{e.type}</td>
              <td>
                {e.weekday !== undefined
                  ? `Weekly · ${DOW[e.weekday]}`
                  : e.date ?? '—'}
                {e.time ? ` · ${e.time}` : ''}
              </td>
              <td>{e.tag ?? '—'}</td>
              <td>
                <span className={`admin-dot admin-dot--${e.accent ?? 'orange'}`} />
                {e.accent ?? 'orange'}
              </td>
              <td>{e.ctaLabel ?? 'Details'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
