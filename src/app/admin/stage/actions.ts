'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createStageShow, updateStageShow, deleteStageShow, type StageInput } from '@/lib/db';

function parseShow(form: FormData): StageInput {
  const s = (k: string) => String(form.get(k) ?? '').trim();
  return {
    month: s('month'),
    day: s('day'),
    accent: s('accent') || 'orange',
    type: s('type'),
    name: s('name'),
    detail: s('detail'),
    time: s('time'),
    tag: s('tag'),
    cta_label: s('cta_label') || 'Details',
    cta_url: s('cta_url') === '' ? null : s('cta_url'),
    sort_order: Number(s('sort_order')) || 0,
  };
}

function revalidate() {
  revalidatePath('/stage');
  revalidatePath('/admin/stage');
  revalidatePath('/admin');
}

export async function createStageAction(form: FormData) {
  await createStageShow(parseShow(form));
  revalidate();
  redirect('/admin/stage');
}

export async function updateStageAction(id: number, form: FormData) {
  await updateStageShow(id, parseShow(form));
  revalidate();
  redirect('/admin/stage');
}

export async function deleteStageAction(id: number) {
  await deleteStageShow(id);
  revalidate();
  redirect('/admin/stage');
}
