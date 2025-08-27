import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./Posts.module.css"; // CSS Module import

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const perPage = 6;

  const loadPosts = useCallback(() => {
    if (loading || !hasMore) return; // prevent duplicate calls

    setLoading(true);

    fetch(
      `https://wp.360muslimexperts.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`
    )
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            // no more posts
            setHasMore(false);
            setLoading(false);
            return [];
          }
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setPosts((prev) => [...prev, ...data]);
        setPage((prev) => prev + 1); // increment page after successful fetch
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [loading, hasMore, page]);

  useEffect(() => {
    // initial load
    loadPosts();

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        loadPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadPosts, loading, hasMore]);

  return (
    <section className={styles.posts}>
      <h2 className={styles["posts-title"]}>All Blog Posts</h2>

      <div className={styles["posts-container"]}>
        {posts.map((post) => (
          <article key={post.id} className={styles["post-card"]}>
            {post._embedded?.["wp:featuredmedia"] && (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className={styles["post-image"]}
              />
            )}
            <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            <Link href={`/${post.slug}`} className={styles["read-more"]}>
              Read More →
            </Link>
          </article>
        ))}
      </div>

      {loading && (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>Loading...</p>
      )}
      {!hasMore && (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>No more posts</p>
      )}
    </section>
  );
}
