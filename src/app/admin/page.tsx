import Link from 'next/link';
import { getEvents, getStageShows } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const [events, shows] = await Promise.all([getEvents(), getStageShows()]);

  return (
    <div className="admin-page">
      <h1 className="admin-h">Dashboard</h1>
      <p className="admin-sub">Manage the content that appears on the live site.</p>

      <div className="admin-cards">
        <Link href="/admin/events" className="admin-card">
          <div className="admin-card-k">Events</div>
          <div className="admin-card-n">{events.length}</div>
          <div className="admin-card-d">Homepage calendar entries →</div>
        </Link>
        <Link href="/admin/stage" className="admin-card">
          <div className="admin-card-k">Stage Shows</div>
          <div className="admin-card-n">{shows.length}</div>
          <div className="admin-card-d">The Stage page lineup →</div>
        </Link>
      </div>

      <p className="admin-note">
        Editing tools (add / edit / delete) arrive next. For now these screens show what&apos;s
        live in the database.
      </p>
    </div>
  );
}
