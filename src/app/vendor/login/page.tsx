'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function VendorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/vendor/dashboard');
      router.refresh();
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          <Image src="/acorn.png" alt="Makers Mill" width={36} height={36} />
          <span className="auth-logo-name">The Makers Mill</span>
        </Link>
        <div className="auth-head">
          <p className="label">Vendor Portal</p>
          <h1 className="auth-h">Sign In</h1>
          <p className="auth-sub">Access your vendor dashboard</p>
        </div>
        <form className="apply-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </label>
          <button type="submit" className="btn btn-fill" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <div className="auth-footer">
          <Link href="/vendor/reset-password" className="auth-link">Forgot password?</Link>
          <span className="auth-sep">·</span>
          <Link href="/vendor/signup" className="auth-link">Apply to become a vendor</Link>
        </div>
      </div>
    </div>
  );
}
