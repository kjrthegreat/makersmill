'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const PERFORMER_TYPES = [
  'Band',
  'Solo / Singer-Songwriter',
  'DJ',
  'Comedian',
  'Spoken Word / Poet',
  'Other'
];

export function PerformerForm() {
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
      console.log('Performer Inquiry submission:', payload);
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
          We listen to every submission. Someone from The Stage will reach out at the email or
          phone you provided.
        </p>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form className="apply-form" onSubmit={handleSubmit}>
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
        <span>Act or band name <em>(if you have one)</em></span>
        <input
          type="text"
          name="act"
          autoComplete="organization"
          disabled={submitting}
        />
      </label>
      <label>
        <span>Type of performance</span>
        <select name="type" required disabled={submitting} defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {PERFORMER_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Tell us about your act</span>
        <textarea
          name="about"
          rows={4}
          required
          disabled={submitting}
          placeholder="Sound, set length, how long you've been playing, what kind of night you'd want at The Stage."
        />
      </label>
      <label>
        <span>
          Links to music, video, or socials <em>(optional)</em>
        </span>
        <textarea
          name="links"
          rows={2}
          disabled={submitting}
          placeholder="Spotify, Bandcamp, YouTube, Instagram — paste anything that helps us hear you."
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
        {submitting ? 'Sending…' : 'Submit Performer Inquiry'}
      </button>
      <p className="form-note">
        ✦ We listen to every submission. We&apos;ll follow up at the email or phone you provided.
      </p>
    </form>
  );
}
