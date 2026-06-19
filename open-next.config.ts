import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// OpenNext builds the Next.js app by running `buildCommand` (default: `npm run build`).
// Our `npm run build` IS the OpenNext build, so the default would recurse infinitely.
// Point the inner build straight at plain `next build` (exposed as `build:next`).
export default {
  ...defineCloudflareConfig(),
  buildCommand: 'npm run build:next',
};
