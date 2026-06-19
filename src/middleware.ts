import { NextResponse, type NextRequest } from 'next/server';

// ─── Edge gate for /admin ────────────────────────────────────────────────────
// Cloudflare Access is the primary enforcement: it blocks unauthenticated
// requests at the edge before they reach the Worker and injects the
// Cf-Access-Authenticated-User-Email header. This middleware is defense in
// depth — if a request ever reaches the app WITHOUT that header in production
// (e.g. Access misconfigured, or a hostname not yet covered by a policy), we
// refuse it here, before any admin page renders or touches D1. That prevents
// child route data from ever appearing in the response (incl. the RSC payload).
export function middleware(req: NextRequest) {
  const authed = req.headers.has('cf-access-authenticated-user-email');
  if (!authed && process.env.NODE_ENV === 'production') {
    return new NextResponse('Admin access required — sign in through Cloudflare Access.', {
      status: 401,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin', '/admin/:path*'] };
