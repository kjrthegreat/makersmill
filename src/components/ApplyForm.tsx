'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ApplyForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      // TODO: wire this to a real submission endpoint when the form provider is chosen.
      // Options: Resend (transactional email), Formspree, Tally embed, or a Next.js API
      // route that emails makersmillsomerset@gmail.com. For now, log + simulate.
      // eslint-disable-next-line no-console
      console.log('Apply for Space submission:', payload);
      await new Promise((r) => setTimeout(r, 700));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success rev on">
        <div className="label" style={{ justifyContent: 'center' }}>
          Got It
        </div>
        <h3 className="form-success-h">
          Thanks — we&apos;ll be<br />
          <em>in touch.</em>
        </h3>
        <p className="form-success-p">
          Someone from Makers Mill will reach out at the email or phone you provided. No
          spam — just a real conversation about your work.
        </p>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form className="apply-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-row">
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            disabled={submitting}
          />
        </label>
        <label>
          <span>Phone</span>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            disabled={submitting}
          />
        </label>
      </div>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          disabled={submitting}
        />
      </label>
      <label>
        <span>Business or maker name <em>(if you have one)</em></span>
        <input
          type="text"
          name="business"
          autoComplete="organization"
          disabled={submitting}
        />
      </label>
      <label>
        <span>What do you make or sell?</span>
        <input
          type="text"
          name="category"
          placeholder="e.g. pottery, vintage clothing, handmade jewelry, food, services"
          required
          disabled={submitting}
        />
      </label>
      <label>
        <span>Tell us about your work or business</span>
        <textarea
          name="about"
          rows={4}
          required
          disabled={submitting}
          placeholder="What you do, how long you've been doing it, what you'd want from a space at the Mill."
        />
      </label>
      <label>
        <span>
          Anything else? <em>(optional)</em>
        </span>
        <textarea name="notes" rows={2} disabled={submitting} />
      </label>

      {status === 'error' && (
        <div className="form-error">
          Something went wrong sending that. Please email{' '}
          <a href="mailto:makersmillsomerset@gmail.com">makersmillsomerset@gmail.com</a>{' '}
          directly.
        </div>
      )}

      <button type="submit" className="btn btn-fill" disabled={submitting}>
        {submitting ? 'Sending…' : 'Submit Application'}
      </button>
      <p className="form-note">
        ✦ We read every application. We&apos;ll follow up at the email or phone you provided.
      </p>
    </form>
  );
}
