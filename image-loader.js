// image-loader.js
export default function cloudflareLoader({ src, width, quality }) {
  // If the src starts with '/', treat it as an internal path
  const url = src.startsWith('/') ? src : src;
  
  // Cloudflare Image Resizing parameters
  const params = [
    `width=${width}`,
    `quality=${quality || 75}`,
    'format=auto'
  ].join(',');

  return `/cdn-cgi/image/${params}${url}`;
}
