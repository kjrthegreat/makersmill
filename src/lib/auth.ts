import { headers } from 'next/headers';

// ─── Admin identity (Cloudflare Access) ──────────────────────────────────────
// When a Cloudflare Access application protects /admin, Access authenticates the
// user at the edge and injects this header before the request reaches the Worker.
// We trust it in production because the request cannot reach /admin without first
// passing Access. (Hardening TODO: verify the Cf-Access-Jwt-Assertion JWT against
// the team's Access certs once the Access app — and its AUD — exists.)
const ACCESS_EMAIL_HEADER = 'cf-access-authenticated-user-email';

// Local `next dev` has no Access in front of it. Allow a dev identity so the
// admin UI is reachable while building. Never applies in production.
const DEV_ADMIN_EMAIL = process.env.ADMIN_DEV_EMAIL || 'dev@makersmill.local';

/** The signed-in admin's email, or null if the request isn't authenticated. */
export async function getAdminEmail(): Promise<string | null> {
  const email = (await headers()).get(ACCESS_EMAIL_HEADER);
  if (email) return email;
  if (process.env.NODE_ENV !== 'production') return DEV_ADMIN_EMAIL;
  return null;
}
