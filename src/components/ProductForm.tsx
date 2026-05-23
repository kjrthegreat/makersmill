'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ImageUpload } from '@/components/ImageUpload';
import { PRODUCT_CATEGORIES } from '@/types/vendor';
import type { Product } from '@/types/vendor';

interface Props {
  vendorId: string;
  userId: string;
  product: (Product & { product_images?: { id: string; url: string; sort_order: number }[] }) | null;
}

export function ProductForm({ vendorId, userId, product }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: product?.name ?? '',
    description: product?.description ?? '',
    price: product ? (product.price / 100).toFixed(2) : '',
    category: product?.category ?? '',
    stock_qty: product?.stock_qty?.toString() ?? '',
    status: product?.status ?? 'draft',
  });

  const [imageUrls, setImageUrls] = useState<string[]>(
    product?.product_images
      ?.sort((a, b) => a.sort_order - b.sort_order)
      .map(i => i.url) ?? ['']
  );

  function setField(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function setImageUrl(index: number, value: string) {
    setImageUrls(prev => prev.map((u, i) => i === index ? value : u));
  }

  function addImageSlot() {
    if (imageUrls.length < 5) setImageUrls(prev => [...prev, '']);
  }

  function removeImageSlot(index: number) {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const supabase = createClient();

    const priceInCents = Math.round(parseFloat(form.price || '0') * 100);

    const payload = {
      vendor_id: vendorId,
      name: form.name,
      description: form.description || null,
      price: priceInCents,
      category: form.category || null,
      stock_qty: form.stock_qty ? parseInt(form.stock_qty) : null,
      status: form.status,
    };

    let productId = product?.id;

    if (product) {
      const { error: err } = await supabase
        .from('products')
        .update(payload)
        .eq('id', product.id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { data: newProduct, error: err } = await supabase
        .from('products')
        .insert(payload)
        .select()
        .single();
      if (err) { setError(err.message); setSaving(false); return; }
      productId = newProduct.id;
    }

    // Update images
    if (productId) {
      await supabase.from('product_images').delete().eq('product_id', productId);
      const validUrls = imageUrls.filter(u => u.trim());
      if (validUrls.length > 0) {
        await supabase.from('product_images').insert(
          validUrls.map((url, i) => ({ product_id: productId!, url, sort_order: i }))
        );
      }
    }

    router.push('/vendor/dashboard/products');
    router.refresh();
  }

  return (
    <form className="apply-form dash-form" onSubmit={handleSave}>
      {error && <div className="form-error">{error}</div>}

      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Product Details</h2>
        <label>
          Product Name <em>required</em>
          <input
            type="text"
            value={form.name}
            onChange={e => setField('name', e.target.value)}
            placeholder="What are you selling?"
            required
          />
        </label>
        <label>
          Description
          <textarea
            value={form.description}
            onChange={e => setField('description', e.target.value)}
            placeholder="Describe this product — materials, size, how it's made…"
            rows={4}
          />
        </label>
        <div className="form-row">
          <label>
            Price <em>required</em>
            <input
              type="number"
              value={form.price}
              onChange={e => setField('price', e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </label>
          <label>
            Category
            <select value={form.category} onChange={e => setField('category', e.target.value)}>
              <option value="">Select category</option>
              {PRODUCT_CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            Stock Quantity <em>leave blank if unlimited</em>
            <input
              type="number"
              value={form.stock_qty}
              onChange={e => setField('stock_qty', e.target.value)}
              placeholder="Unlimited"
              min="0"
            />
          </label>
          <label>
            Visibility
            <select value={form.status} onChange={e => setField('status', e.target.value)}>
              <option value="draft">Draft — not visible to customers</option>
              <option value="published">Published — visible on your page</option>
            </select>
          </label>
        </div>
      </div>

      <div className="dash-form-section">
        <h2 className="dash-form-section-h">Product Images <em style={{ color: 'var(--gray)', fontFamily: 'var(--stamp)', fontSize: 9 }}>up to 5</em></h2>
        <div className="dash-gallery-grid">
          {imageUrls.map((url, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <ImageUpload
                bucket="product-images"
                userId={userId}
                value={url}
                onChange={v => setImageUrl(i, v)}
                label={i === 0 ? 'Main Photo' : `Photo ${i + 1}`}
                previewHeight={100}
              />
              {imageUrls.length > 1 && (
                <button
                  type="button"
                  className="dash-action-link dash-action-link--danger"
                  onClick={() => removeImageSlot(i)}
                  style={{ position: 'absolute', top: 0, right: 0, fontSize: 10 }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        {imageUrls.length < 5 && (
          <button type="button" className="btn btn-outline" onClick={addImageSlot} style={{ marginTop: 12 }}>
            + Add Another Photo
          </button>
        )}
      </div>

      <div className="dash-form-actions">
        <button type="button" className="btn btn-outline" onClick={() => router.back()}>
          Cancel
        </button>
        <button type="submit" className="btn btn-fill" disabled={saving}>
          {saving ? 'Saving…' : product ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
