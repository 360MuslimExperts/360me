// pages/[slug].js
export const runtime = 'edge'; // required for Cloudflare Pages

import { useEffect, useState } from "react";
import Head from "next/head";
import SinglePost from "@/components/Posts/SinglePost";

export default function SinglePostPage({ slug }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(
          `https://wp.360muslimexperts.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
        );
        const data = await res.json();
        setPost(data[0] || null);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    }

    fetchPost();
  }, [slug]);

  if (!post) return <p>Loading post...</p>;

  const description = post?.excerpt?.rendered?.replace(/<[^>]+>/g, "") || "";
  const featuredImage =
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return (
    <>
      <Head>
        <title>{post?.title?.rendered || "Post"}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={post?.title?.rendered || "Post"} />
        <meta property="og:description" content={description} />
        {featuredImage && (
          <meta property="og:image" content={featuredImage} />
        )}
        <meta
          property="og:url"
          content={`https://360muslimexperts.com/${post?.slug}`}
        />
      </Head>

      <SinglePost post={post} />
    </>
  );
}

// Next.js will pass the slug as a prop via getServerSideProps fallback
export async function getServerSideProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  };
}
