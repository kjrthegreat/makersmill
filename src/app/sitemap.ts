import type { MetadataRoute } from 'next';

const BASE = 'https://makersmillsomerset.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                              changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/stage`,                   changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/bar-food`,                changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/businesses/print-ghost`,  changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/businesses/pilates`,      changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/businesses/soul-house`,   changeFrequency: 'monthly', priority: 0.7 },
  ];
}
