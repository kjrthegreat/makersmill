'use client';

import { useRef, useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const PERFORMER_TYPES = [
  'Band',
  'Solo / Singer-Songwriter',
  'DJ',
  'Comedian',
  'Spoken Word / Poet',
  'Other'
];

const STEPS: { title: string; fields: string[] }[] = [
  { title: 'Your Contact', fields: ['name', 'phone', 'email'] },
  { title: 'Your Act', fields: ['act', 'type'] },
  { title: 'Tell Us More', fields: ['about', 'links', 'notes'] }
];

export function PerformerForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  function validateStep(s: number): boolean {
    if (!formRef.current) return true;
    for (const name of STEPS[s].fields) {
      const el = formRef.current.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null;
      if (el && !el.checkValidity()) {
        el.reportValidity();
        return false;
      }
    }
    return true;
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    for (let i = 0; i < STEPS.length; i++) {
      if (!validateStep(i)) {
        setStep(i);
        return;
      }
    }
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    try {
      // TODO: wire this to a real submission endpoint when the form provider is chosen.
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
          Thanks — we&apos;ll be
          <br />
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
  const last = step === STEPS.length - 1;

  return (
    <form
      ref={formRef}
      className="apply-form multistep"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="multistep-progress">
        <span className="multistep-step-label">
          Step {step + 1} of {STEPS.length} · {STEPS[step].title}
        </span>
        <div className="multistep-bar">
          <div
            className="multistep-bar-fill"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className={`multistep-pane${step === 0 ? ' active' : ''}`}>
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
      </div>

      <div className={`multistep-pane${step === 1 ? ' active' : ''}`}>
        <label>
          <span>
            Act or band name <em>(if you have one)</em>
          </span>
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
      </div>

      <div className={`multistep-pane${step === 2 ? ' active' : ''}`}>
        <label>
          <span>Tell us about your act</span>
          <textarea
            name="about"
            rows={3}
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
      </div>

      {status === 'error' && (
        <div className="form-error">
          Something went wrong sending that. Please email{' '}
          <a href="mailto:makersmillsomerset@gmail.com">makersmillsomerset@gmail.com</a>{' '}
          directly.
        </div>
      )}

      <div className="multistep-nav">
        {step > 0 ? (
          <button
            type="button"
            className="btn btn-outline"
            onClick={goBack}
            disabled={submitting}
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        {last ? (
          <button type="submit" className="btn btn-fill" disabled={submitting}>
            {submitting ? 'Sending…' : 'Submit Performer Inquiry'}
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-fill"
            onClick={goNext}
            disabled={submitting}
          >
            Next →
          </button>
        )}
      </div>
    </form>
  );
}
