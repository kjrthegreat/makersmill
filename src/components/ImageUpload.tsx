'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  bucket: 'vendor-assets' | 'product-images';
  userId: string;
  value: string;
  onChange: (url: string) => void;
  label: string;
  placeholder?: string;
  previewHeight?: number;
}

export function ImageUpload({ bucket, userId, value, onChange, label, placeholder = 'https://…', previewHeight = 80 }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  async function handleFile(file: File) {
    setUploading(true);
    setError('');
    const ext = file.name.split('.').pop();
    const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
    if (upErr) { setError(upErr.message); setUploading(false); return; }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="img-upload-wrap">
      <div className="img-upload-label">{label}</div>

      {/* Drop zone / click to upload */}
      <div
        className={`img-upload-drop${uploading ? ' img-upload-drop--loading' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" style={{ maxHeight: previewHeight, maxWidth: '100%', objectFit: 'cover', borderRadius: 2 }} />
        ) : (
          <span className="img-upload-hint">
            {uploading ? 'Uploading…' : 'Drop image here or click to upload'}
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: 'none' }}
          onChange={handleInput}
        />
      </div>

      {/* URL fallback input */}
      <input
        type="url"
        className="img-upload-url"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />

      {value && (
        <button
          type="button"
          className="img-upload-clear"
          onClick={() => onChange('')}
        >
          Remove
        </button>
      )}

      {error && <div className="img-upload-error">{error}</div>}
    </div>
  );
}
