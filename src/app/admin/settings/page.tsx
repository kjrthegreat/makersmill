'use client';

import { useState } from 'react';
import type { Metadata } from 'next';

export default function AdminSettingsPage() {
  const [banner, setBanner] = useState('');
  const [bannerActive, setBannerActive] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist to a site_settings table in Supabase
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <p className="label">Admin Portal</p>
          <h1 className="dash-h1">Site Settings</h1>
        </div>
      </div>

      <div className="dash-form-section dash-settings-block">
        <h2 className="dash-form-section-h">Announcement Banner</h2>
        <p style={{ fontSize: 13, color: 'var(--cream-dk)', marginBottom: 16 }}>
          Shows a banner at the top of every public page. Leave blank to hide.
        </p>
        <form className="apply-form" onSubmit={handleSave}>
          {saved && <div className="form-success-inline">Settings saved.</div>}
          <label>
            Banner Text
            <input
              type="text"
              value={banner}
              onChange={e => setBanner(e.target.value)}
              placeholder="e.g. We'll be closed December 25th. Happy Holidays!"
            />
          </label>
          <label className="dash-hours-closed" style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: 'auto' }}>
            <input type="checkbox" checked={bannerActive} onChange={e => setBannerActive(e.target.checked)} />
            Show banner on site
          </label>
          <button type="submit" className="btn btn-fill">Save Settings</button>
        </form>
      </div>

      <div className="dash-form-section dash-settings-block">
        <h2 className="dash-form-section-h">More Settings Coming Soon</h2>
        <p style={{ fontSize: 13, color: 'var(--cream-dk)' }}>
          Holiday hours override, maintenance mode, and featured vendor reordering
          will appear here once the site_settings table is wired up.
        </p>
      </div>
    </div>
  );
}
