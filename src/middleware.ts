import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  // Protect vendor dashboard routes
  if (path.startsWith('/vendor/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/vendor/login', request.url));
    }
  }

  // Protect admin routes — also check admin role
  if (path.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/vendor/login?next=/admin', request.url));
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (!profile || profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/vendor/dashboard', request.url));
    }
  }

  // Redirect logged-in users away from login/signup
  if (user && (path === '/vendor/login' || path === '/vendor/signup')) {
    return NextResponse.redirect(new URL('/vendor/dashboard', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/vendor/dashboard/:path*',
    '/vendor/login',
    '/vendor/signup',
    '/admin/:path*',
  ],
};
