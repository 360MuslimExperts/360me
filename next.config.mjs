import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to
// use bindings during local development (when running the application with
// `next dev`). This function is only necessary during development and
// has no impact outside of that. For more information see:
// https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md
setupDevPlatform().catch(console.error);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add 'md' and 'mdx' to the list of page extensions.
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

// Next.js plugins, like withMDX, must be imported dynamically in ES module files.
const withMDX = import('@next/mdx').then((mod) => mod.default({
  extension: /\.mdx?$/,
  options: {
    // Add any MDX options here, such as remark or rehype plugins.
    // For more information see: https://mdxjs.com/
  },
}));

// We now wrap the nextConfig with the MDX plugin to enable MDX support.
// This is done by exporting a function that returns a Promise.
export default async () => {
  const mdxConfig = await withMDX;
  return mdxConfig(nextConfig);
};
