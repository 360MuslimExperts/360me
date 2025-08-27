import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import Comments from "./Comments";

export default function SinglePost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);

  const getFirstImage = (content) => {
    const match = content.match(/<img.*?src="(.*?)"/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    if (!slug) return; // Wait for slug to be available

    fetch(
      `https://wp.360muslimexperts.com/wp-json/wp/v2/posts?slug=${slug}&_embed`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setPost(data[0]);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const firstImageInContent = getFirstImage(post.content.rendered);

  // Only display featured image if content doesn't already have an image
  const displayFeatured = featuredImage && !firstImageInContent;

  return (
    <article className={styles["single-post"]}>
      {displayFeatured && (
        <img
          src={featuredImage}
          alt={post.title.rendered}
          className={styles["post-image"]}
        />
      )}

      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

      <Comments postId={post.id} />
    </article>
  );
}
