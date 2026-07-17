export const runtime = "edge"; // This tells Cloudflare to run it on the edge network

export async function GET(request, { params }) {
  // 1. Grab the R2 binding we added in wrangler.jsonc
    const { env } = request.cf || {}; 
      const bucket = env?.ASSETS_BUCKET;

        if (!bucket) {
            return new Response("R2 Binding not found. Check wrangler.jsonc", { status: 500 });
              }

                // 2. Extract the file path (e.g., "logo/logo-512.png")
                  const pathArray = await params.path;
                    const filePath = pathArray.join("/");

                      // 3. Fetch the file directly from your R2 storage
                        const object = await bucket.get(filePath);

                          if (!object) {
                              return new Response("Asset not found in R2 bucket", { status: 404 });
                                }

                                  // 4. Stream the file back to the browser with clean headers
                                    const headers = new Headers();
                                      object.writeHttpMetadata(headers);
                                        headers.set("etag", object.httpEtag);
                                          headers.set("Cache-Control", "public, max-age=31536000"); // Speeds it up with caching

                                            return new Response(object.body, { headers });
                                            }
                                            