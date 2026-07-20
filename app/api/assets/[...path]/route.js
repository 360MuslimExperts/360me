export const runtime = "edge";

export async function GET(request, { params }) {
  const bucket = process.env.ASSETS_BUCKET;

  if (!bucket) {
    return new Response("R2 Binding not found. Check wrangler.jsonc or deployment settings.", { status: 500 });
  }

  const pathArray = await params.path;
  const filePath = pathArray.join("/");

  const object = await bucket.get(filePath);

  if (!object) {
    return new Response("Asset not found in R2 bucket", { status: 404 });
  }

  const etag = object.httpEtag;
  const ifNoneMatch = request.headers.get("if-none-match");

  if (ifNoneMatch && ifNoneMatch === etag) {
    return new Response(null, { status: 304 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", etag);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}
