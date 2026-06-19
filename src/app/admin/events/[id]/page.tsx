import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventRow } from '@/lib/db';
import { EventForm } from '../EventForm';
import { updateEventAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getEventRow(Number(id));
  if (!row) notFound();

  return (
    <div className="admin-page admin-page--form">
      <Link href="/admin/events" className="admin-crumb">← Events</Link>
      <h1 className="admin-h">Edit event</h1>
      <EventForm action={updateEventAction.bind(null, row.id)} initial={row} submitLabel="Save changes" />
    </div>
  );
}
