import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStageRow } from '@/lib/db';
import { StageForm } from '../StageForm';
import { updateStageAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function EditStageShow({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const row = await getStageRow(Number(id));
  if (!row) notFound();

  return (
    <div className="admin-page admin-page--form">
      <Link href="/admin/stage" className="admin-crumb">← Stage Shows</Link>
      <h1 className="admin-h">Edit show</h1>
      <StageForm action={updateStageAction.bind(null, row.id)} initial={row} submitLabel="Save changes" />
    </div>
  );
}
