import Link from 'next/link';
import { EventForm } from '../EventForm';
import { createEventAction } from '../actions';

export const dynamic = 'force-dynamic';

export default function NewEvent() {
  return (
    <div className="admin-page admin-page--form">
      <Link href="/admin/events" className="admin-crumb">← Events</Link>
      <h1 className="admin-h">Add event</h1>
      <EventForm action={createEventAction} submitLabel="Create event" />
    </div>
  );
}
