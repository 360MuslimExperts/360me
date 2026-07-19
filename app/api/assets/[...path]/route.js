export const runtime = "edge"; // Run on the Cloudflare edge network

export async function GET(request, { params }) {
  // Next.js maps Cloudflare bindings directly to process.env
  const bucket = process.env.ASSETS_BUCKET;

  if (!bucket) {
    return new Response("R2 Binding not found. Check wrangler.jsonc or deployment settings.", { status: 500 });
  }

  const pathArray = await params.path;
  const filePath = pathArray.join("/");

  // Fetch the file directly from your R2 storage
  const object = await bucket.get(filePath);

  if (!object) {
    return new Response("Asset not found in R2 bucket", { status: 404 });
  }

  // Stream the file back to the browser with clean headers
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("Cache-Control", "public, max-age=31536000"); // Cache at edge for speed

  return new Response(object.body, { headers });
}
