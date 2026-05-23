'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'form' | 'sent'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/vendor/dashboard/settings`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setStep('sent');
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          <Image src="/acorn.png" alt="Makers Mill" width={36} height={36} />
          <span className="auth-logo-name">The Makers Mill</span>
        </Link>
        {step === 'sent' ? (
          <div className="form-success">
            <h1 className="form-success-h">Check your <em>email</em></h1>
            <p className="form-success-p">
              We sent a password reset link to <strong>{email}</strong>.
              It expires in 1 hour.
            </p>
          </div>
        ) : (
          <>
            <div className="auth-head">
              <p className="label">Vendor Portal</p>
              <h1 className="auth-h">Reset Password</h1>
              <p className="auth-sub">We&rsquo;ll email you a link to set a new password.</p>
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
              <button type="submit" className="btn btn-fill" disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}
        <div className="auth-footer" style={{ justifyContent: 'center' }}>
          <Link href="/vendor/login" className="auth-link">Back to sign in</Link>
        </div>
      </div>
    </div>
  );
}
