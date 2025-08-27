// pages/api/hello.js

// Use Edge Runtime
export const runtime = 'edge';

export default async function handler(req) {
  return new Response(JSON.stringify({ name: "John Doe" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
