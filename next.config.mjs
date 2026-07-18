import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Setup for Cloudflare bindings in local development
setupDevPlatform().catch(console.error);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    // ⚡ Prevents Next.js execution overhead on Cloudflare Pages for local/R2 assets
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      // ⚡ Allows any external HTTPS links (like random profile pics submitted by users)
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  // Reduces response payload size
  poweredByHeader: false,
  
  // ⚡ Fixes the blank page router cache freeze on client-side navigation
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

const withMDX = import('@next/mdx').then((mod) => mod.default({
  extension: /\.mdx?$/,
  options: {},
}));

export default async () => {
  const mdxConfig = await withMDX;
  return mdxConfig(nextConfig);
};
