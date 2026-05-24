import { EventForm } from '@/components/EventForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'New Event | Admin' };

export default function NewEventPage() {
  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Admin Portal</p>
          <h1 className="dash-h1">New Event</h1>
        </div>
      </div>
      <EventForm event={null} />
    </div>
  );
}
