import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Setup for Cloudflare bindings in local development
setupDevPlatform().catch(console.error);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add 'md' and 'mdx' to the list of page extensions.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    // Enable Cloudflare Image Resizing
    loader: 'custom',
    loaderFile: './image-loader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibtisam.is-a.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

// Next.js plugins, like withMDX, must be imported dynamically in ES module files.
const withMDX = import('@next/mdx').then((mod) => mod.default({
  extension: /\.mdx?$/,
  options: {},
}));

// We now wrap the nextConfig with the MDX plugin to enable MDX support.
export default async () => {
  const mdxConfig = await withMDX;
  return mdxConfig(nextConfig);
};
