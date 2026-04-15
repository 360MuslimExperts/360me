import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

const clientConfig = {
    projectId: '0j9kc4gn',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: true, // Enabled CDN for faster, cached responses in production
};

export const client = createClient(clientConfig);

// Use the builder to generate image URLs
const builder = createImageUrlBuilder(clientConfig);

export function urlFor(source) {
    return builder.image(source);
}
