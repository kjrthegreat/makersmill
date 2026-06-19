import Link from 'next/link';
import { getStageShows } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminStage() {
  const shows = await getStageShows();

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <Link href="/admin" className="admin-crumb">← Dashboard</Link>
          <h1 className="admin-h">Stage Shows</h1>
          <p className="admin-sub">The Stage page lineup — {shows.length} shows.</p>
        </div>
        <button type="button" className="admin-btn" disabled title="Coming in the next phase">
          + Add show
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Type</th>
            <th>Time</th>
            <th>Tag</th>
            <th>Accent</th>
            <th>CTA</th>
          </tr>
        </thead>
        <tbody>
          {shows.map((s, i) => (
            <tr key={i}>
              <td className="admin-td-strong">{s.month} {s.day}</td>
              <td>{s.name}</td>
              <td>{s.type}</td>
              <td>{s.time}</td>
              <td>{s.tag}</td>
              <td>
                <span className={`admin-dot admin-dot--${s.accent}`} />
                {s.accent}
              </td>
              <td>{s.ctaLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
