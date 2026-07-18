import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Setup for Cloudflare bindings in local development
setupDevPlatform().catch(console.error);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    // Allows Next.js to serve modern WebP/AVIF to mobile users
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  // Reduces response payload size
  poweredByHeader: false,
};

const withMDX = import('@next/mdx').then((mod) => mod.default({
  extension: /\.mdx?$/,
  options: {},
}));

export default async () => {
  const mdxConfig = await withMDX;
  return mdxConfig(nextConfig);
};
