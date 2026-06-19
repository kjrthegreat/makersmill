/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'rcmediaservices.net' }
    ]
  }
};

export default nextConfig;

// Enables getCloudflareContext() (D1/R2 bindings) during `next dev`.
// No-op outside the Cloudflare adapter, so the normal dev server is unaffected.
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
