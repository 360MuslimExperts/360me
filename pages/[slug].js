// pages/[slug].js
import SinglePost from "@/components/Posts/SinglePost";
import Head from "next/head";

export default function SinglePostPage({ post }) {
  if (!post) {
    return <p>Post not found.</p>;
  }

  const description = post?.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '';
  const featuredImage = post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return (
    <>
      <Head>
        <title>{post?.title?.rendered || 'Post'}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={post?.title?.rendered || 'Post'} />
        <meta property="og:description" content={description} />
        {featuredImage && <meta property="og:image" content={featuredImage} />}
        <meta property="og:url" content={`https://360muslimexperts.com/${post?.slug}`} />
      </Head>

      <SinglePost post={post} />
    </>
  );
}

// Fetch all post slugs
export async function getStaticPaths() {
  const res = await fetch('https://wp.360muslimexperts.com/wp-json/wp/v2/posts');
  const posts = await res.json();

  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));

  return { paths, fallback: 'blocking' };
}

// Fetch post by slug
export async function getStaticProps({ params }) {
  const res = await fetch(`https://wp.360muslimexperts.com/wp-json/wp/v2/posts?slug=${params.slug}&_embed`);
  const data = await res.json();

  if (!data || !data.length) {
    return { notFound: true };
  }

  return { props: { post: data[0] }, revalidate: 10 };
}
