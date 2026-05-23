'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function VendorSignupPage() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    businessName: '',
    applicantName: '',
    email: '',
    password: '',
    phone: '',
    goodsType: '',
    description: '',
  });

  function set(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();

    // Create auth account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        data: { role: 'vendor' },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Insert vendor application record
    const slug = form.businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    if (authData.user) {
      await supabase.from('vendors').insert({
        user_id: authData.user.id,
        slug: `${slug}-${authData.user.id.slice(0, 6)}`,
        name: form.businessName,
        status: 'pending',
      });
    }

    // Also log the application separately for admin review
    await supabase.from('vendor_applications').insert({
      business_name: form.businessName,
      applicant_email: form.email,
      applicant_name: form.applicantName,
      phone: form.phone,
      goods_type: form.goodsType,
      description: form.description,
    });

    setStep('success');
    setLoading(false);
  }

  if (step === 'success') {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <Link href="/" className="auth-logo">
            <Image src="/acorn.png" alt="Makers Mill" width={36} height={36} />
            <span className="auth-logo-name">The Makers Mill</span>
          </Link>
          <div className="form-success">
            <h1 className="form-success-h">Application <em>Submitted</em></h1>
            <p className="form-success-p">
              Check your email to confirm your address, then we&rsquo;ll review your
              application. You&rsquo;ll hear from us within a few business days.
            </p>
          </div>
          <div className="auth-footer" style={{ justifyContent: 'center' }}>
            <Link href="/" className="auth-link">Back to Makers Mill</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <Link href="/" className="auth-logo">
          <Image src="/acorn.png" alt="Makers Mill" width={36} height={36} />
          <span className="auth-logo-name">The Makers Mill</span>
        </Link>
        <div className="auth-head">
          <p className="label">Vendor Portal</p>
          <h1 className="auth-h">Vendor Application</h1>
          <p className="auth-sub">Tell us about your business — we&rsquo;ll review and be in touch.</p>
        </div>
        <form className="apply-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          <div className="form-row">
            <label>
              Business Name <em>required</em>
              <input
                type="text"
                value={form.businessName}
                onChange={e => set('businessName', e.target.value)}
                placeholder="Your shop name"
                required
              />
            </label>
            <label>
              Your Name
              <input
                type="text"
                value={form.applicantName}
                onChange={e => set('applicantName', e.target.value)}
                placeholder="First & last name"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email address <em>required</em>
              <input
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="(606) 555-0100"
              />
            </label>
          </div>
          <label>
            Password <em>required — used to log in to your dashboard</em>
            <input
              type="password"
              value={form.password}
              onChange={e => set('password', e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>
          <label>
            What do you sell?
            <select value={form.goodsType} onChange={e => set('goodsType', e.target.value)}>
              <option value="">Select a category</option>
              <option>Art &amp; Prints</option>
              <option>Ceramics &amp; Pottery</option>
              <option>Clothing &amp; Apparel</option>
              <option>Food &amp; Pantry</option>
              <option>Handmade Goods</option>
              <option>Home &amp; Decor</option>
              <option>Jewelry &amp; Accessories</option>
              <option>Plants &amp; Botanicals</option>
              <option>Skincare &amp; Bath</option>
              <option>Vintage &amp; Collectibles</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Tell us about your business
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="What you make, how long you've been doing it, what makes your work special…"
              rows={4}
            />
          </label>
          <p className="form-note">By applying you agree to the Makers Mill vendor terms of service.</p>
          <button type="submit" className="btn btn-fill" disabled={loading}>
            {loading ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
        <div className="auth-footer">
          Already have an account?
          <Link href="/vendor/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
