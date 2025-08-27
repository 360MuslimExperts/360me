import { useEffect, useState } from "react";
import styles from "./Posts.module.css";
import Link from "next/link";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://wp.360muslimexperts.com/wp-json/wp/v2/posts?_embed")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles.posts}>
      <h2 className={styles["posts-title"]}>Latest Blog Posts</h2>

      <div className={styles["posts-container"]}>
        {posts.slice(0, 6).map((post) => (
          <article key={post.id} className={styles["post-card"]}>
            {post._embedded?.["wp:featuredmedia"] ? (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className={styles["post-image"]}
              />
            ) : null}

            <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            <Link href={`/${post.slug}`} className={styles["read-more"]}>
              Read More →
            </Link>
          </article>
        ))}
      </div>
       <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "1rem" }}>
  <Link href="/blog" className={styles["view-all"]}>
    View All Posts →
  </Link>
</div>
    </section>
  );
}
