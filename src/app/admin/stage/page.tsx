import Link from 'next/link';
import { listStageRows } from '@/lib/db';
import { DeleteButton } from '../DeleteButton';
import { deleteStageAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminStage() {
  const shows = await listStageRows();

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <Link href="/admin" className="admin-crumb">← Dashboard</Link>
          <h1 className="admin-h">Stage Shows</h1>
          <p className="admin-sub">The Stage page lineup — {shows.length} shows.</p>
        </div>
        <Link href="/admin/stage/new" className="admin-btn">+ Add show</Link>
      </div>

      {shows.length === 0 ? (
        <p className="admin-empty">No shows yet. Add your first one.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Type</th>
              <th>Time</th>
              <th>Accent</th>
              <th className="admin-th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((s) => (
              <tr key={s.id}>
                <td className="admin-td-strong">{s.month} {s.day}</td>
                <td>{s.name}</td>
                <td>{s.type}</td>
                <td>{s.time}</td>
                <td>
                  <span className={`admin-dot admin-dot--${s.accent}`} />
                  {s.accent}
                </td>
                <td>
                  <div className="admin-row-actions">
                    <Link href={`/admin/stage/${s.id}`} className="admin-link-edit">Edit</Link>
                    <DeleteButton action={deleteStageAction.bind(null, s.id)} what={s.name} />
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
