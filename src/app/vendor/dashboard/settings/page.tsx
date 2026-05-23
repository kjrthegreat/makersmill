'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Metadata } from 'next';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  async function updateEmail(e: React.FormEvent) {
    e.preventDefault();
    setEmailLoading(true);
    setEmailMsg('');
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ email });
    setEmailMsg(error ? error.message : 'Check your new email for a confirmation link.');
    setEmailLoading(false);
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwLoading(true);
    setPwMsg('');
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setPwMsg(error ? error.message : 'Password updated successfully.');
    setPwLoading(false);
    if (!error) { setCurrentPassword(''); setNewPassword(''); }
  }

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Vendor Portal</p>
          <h1 className="dash-h1">Account Settings</h1>
        </div>
      </div>

      <div className="dash-form-section dash-settings-block">
        <h2 className="dash-form-section-h">Change Email</h2>
        <form className="apply-form" onSubmit={updateEmail}>
          {emailMsg && (
            <div className={emailMsg.includes('error') || emailMsg.includes('Error') ? 'form-error' : 'form-success-inline'}>
              {emailMsg}
            </div>
          )}
          <label>
            New Email Address
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="new@example.com"
              required
            />
          </label>
          <button type="submit" className="btn btn-outline" disabled={emailLoading}>
            {emailLoading ? 'Updating…' : 'Update Email'}
          </button>
        </form>
      </div>

      <div className="dash-form-section dash-settings-block">
        <h2 className="dash-form-section-h">Change Password</h2>
        <form className="apply-form" onSubmit={updatePassword}>
          {pwMsg && (
            <div className={pwMsg.includes('error') || pwMsg.includes('Error') ? 'form-error' : 'form-success-inline'}>
              {pwMsg}
            </div>
          )}
          <label>
            New Password
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              minLength={8}
            />
          </label>
          <button type="submit" className="btn btn-outline" disabled={pwLoading}>
            {pwLoading ? 'Updating…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
