import styles from "./Post.module.css";
import Comments from "./Comments";

export default function SinglePost({ post }) {
  // Get first image from content
  const getFirstImage = (content) => {
    const match = content.match(/<img.*?src="(.*?)"/);
    return match ? match[1] : null;
  };

  // Remove first image from content
  const removeFirstImage = (content) => {
    return content.replace(/<img.*?src=".*?".*?>/, "");
  };

  const firstImageInContent = getFirstImage(post.content.rendered); // WP image
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url; // post image

  // Prioritize WP image first, then featured image
  const topImage = firstImageInContent || featuredImage || null;

  // Clean content to avoid duplicate top image
  const cleanedContent =
    topImage === firstImageInContent
      ? removeFirstImage(post.content.rendered)
      : post.content.rendered;

  // Author name
  const authorName = post._embedded?.author?.[0]?.name || "Unknown";

  return (
    <article className={styles["single-post"]}>
      {topImage && (
        <img
          src={topImage}
          alt={post.title.rendered}
          className={styles["post-image"]}
        />
      )}

      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <p className={styles["post-author"]}>By {authorName}</p>

      <div
        className={styles["post-content"]}
        dangerouslySetInnerHTML={{ __html: cleanedContent }}
      />

      <Comments postId={post.id} />
    </article>
  );
}
