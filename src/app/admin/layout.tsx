import type { Metadata } from 'next';
import Link from 'next/link';
import { getAdminEmail } from '@/lib/auth';

// Reads request headers (Access identity) — must render per request.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin · The Makers Mill',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const email = await getAdminEmail();

  // No Access identity → not authenticated. Cloudflare Access normally redirects
  // to login before reaching here; this is the defense-in-depth fallback.
  if (!email) {
    return (
      <div className="admin-gate">
        <div className="admin-gate-card">
          <div className="admin-gate-stamp">Restricted</div>
          <h1>Admin access required</h1>
          <p>
            This area is protected by Cloudflare Access. Sign in through the Mill&apos;s
            access link to continue.
          </p>
          <Link href="/" className="admin-gate-back">← Back to site</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <header className="admin-bar">
        <Link href="/admin" className="admin-brand">The Makers Mill · Admin</Link>
        <nav className="admin-nav">
          <Link href="/admin/events">Events</Link>
          <Link href="/admin/stage">Stage</Link>
          <Link href="/" className="admin-view-site">View site ↗</Link>
        </nav>
        <div className="admin-user" title="Signed in via Cloudflare Access">{email}</div>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}
