import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { EventForm } from '@/components/EventForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit Event | Admin' };

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (!event) notFound();

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Admin Portal</p>
          <h1 className="dash-h1">Edit Event</h1>
          <p className="dash-page-sub">{event.name}</p>
        </div>
      </div>
      <EventForm event={event} />
    </div>
  );
}
