import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: '0j9kc4gn',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false, // Set to true for production if you want caching
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}
