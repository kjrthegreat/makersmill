import { createClient } from '@/lib/supabase/server';
import { ApplicationActions } from '@/components/ApplicationActions';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Applications | Admin' };

export default async function ApplicationsPage() {
  const supabase = await createClient();

  const { data: applications } = await supabase
    .from('vendor_applications')
    .select('*')
    .order('submitted_at', { ascending: false });

  const pending = applications?.filter(a => a.decision === 'pending') ?? [];
  const reviewed = applications?.filter(a => a.decision !== 'pending') ?? [];

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Admin Portal</p>
          <h1 className="dash-h1">Vendor Applications</h1>
          <p className="dash-page-sub">
            {pending.length} pending · {reviewed.length} reviewed
          </p>
        </div>
      </div>

      {pending.length > 0 && (
        <>
          <h2 className="dash-section-h">Needs Review</h2>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Contact</th>
                  <th>Type</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map(app => (
                  <tr key={app.id}>
                    <td>
                      <div className="dash-table-name">{app.business_name}</div>
                      {app.applicant_name && (
                        <div className="dash-table-muted">{app.applicant_name}</div>
                      )}
                    </td>
                    <td className="dash-table-muted">
                      <a href={`mailto:${app.applicant_email}`} className="dash-action-link">
                        {app.applicant_email}
                      </a>
                      {app.phone && <div>{app.phone}</div>}
                    </td>
                    <td className="dash-table-muted">{app.goods_type ?? '—'}</td>
                    <td className="dash-table-muted">
                      {new Date(app.submitted_at).toLocaleDateString()}
                    </td>
                    <td>
                      <ApplicationActions applicationId={app.id} email={app.applicant_email} businessName={app.business_name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {pending.length === 0 && (
        <div className="dash-empty">
          <div className="dash-empty-icon">✓</div>
          <h2 className="dash-empty-h">All caught up</h2>
          <p className="dash-empty-p">No pending applications right now.</p>
        </div>
      )}

      {reviewed.length > 0 && (
        <>
          <h2 className="dash-section-h" style={{ marginTop: 40 }}>Previously Reviewed</h2>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr><th>Business</th><th>Email</th><th>Decision</th><th>Date</th></tr>
              </thead>
              <tbody>
                {reviewed.map(app => (
                  <tr key={app.id}>
                    <td>{app.business_name}</td>
                    <td className="dash-table-muted">{app.applicant_email}</td>
                    <td><span className={`dash-badge dash-badge--${app.decision}`}>{app.decision}</span></td>
                    <td className="dash-table-muted">
                      {app.reviewed_at ? new Date(app.reviewed_at).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
