'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createEvent, updateEvent, deleteEvent, type EventInput } from '@/lib/db';

function parseEvent(form: FormData): EventInput {
  const s = (k: string) => String(form.get(k) ?? '').trim();
  const orNull = (v: string) => (v === '' ? null : v);
  const kind = s('schedule_kind'); // 'date' | 'weekly'
  return {
    title: s('title'),
    type: s('type'),
    time: orNull(s('time')),
    tag: orNull(s('tag')),
    accent: s('accent') || 'orange',
    date: kind === 'date' ? orNull(s('date')) : null,
    weekday: kind === 'weekly' && s('weekday') !== '' ? Number(s('weekday')) : null,
    cta_label: orNull(s('cta_label')),
    cta_url: orNull(s('cta_url')),
    sort_order: Number(s('sort_order')) || 0,
  };
}

function revalidate() {
  revalidatePath('/');
  revalidatePath('/admin/events');
  revalidatePath('/admin');
}

export async function createEventAction(form: FormData) {
  await createEvent(parseEvent(form));
  revalidate();
  redirect('/admin/events');
}

export async function updateEventAction(id: number, form: FormData) {
  await updateEvent(id, parseEvent(form));
  revalidate();
  redirect('/admin/events');
}

export async function deleteEventAction(id: number) {
  await deleteEvent(id);
  revalidate();
  redirect('/admin/events');
}
