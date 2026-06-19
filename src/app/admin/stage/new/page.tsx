import Link from 'next/link';
import { StageForm } from '../StageForm';
import { createStageAction } from '../actions';

export const dynamic = 'force-dynamic';

export default function NewStageShow() {
  return (
    <div className="admin-page admin-page--form">
      <Link href="/admin/stage" className="admin-crumb">← Stage Shows</Link>
      <h1 className="admin-h">Add show</h1>
      <StageForm action={createStageAction} submitLabel="Create show" />
    </div>
  );
}
