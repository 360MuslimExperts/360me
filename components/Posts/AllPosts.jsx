import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "./Posts.module.css";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [finished, setFinished] = useState(false);
  const perPage = 6;

  const pageRef = useRef(1);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const loadPosts = async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;

    try {
      const res = await fetch(
        `https://wp.360muslimexperts.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${pageRef.current}`
      );

      if (!res.ok) {
        if (res.status === 400) {
          hasMoreRef.current = false;
          setFinished(true);
        }
        return;
      }

      const data = await res.json();
      setPosts((prev) => [...prev, ...data]);

      if (data.length < perPage) {
        hasMoreRef.current = false;
        setFinished(true);
      } else {
        pageRef.current += 1;
      }
    } catch (err) {
      console.error(err);
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    loadPosts();

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loadingRef.current &&
        hasMoreRef.current
      ) {
        loadPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.posts}>
      <h2 className={styles["posts-title"]}>All Blog Posts</h2>
      <div className={styles["posts-container"]}>
        {posts.map((post) => (
          <article key={post.id} className={styles["post-card"]}>
            {/* Image first, lazy loaded */}
            {post._embedded?.["wp:featuredmedia"] && (
              <img
                src={post._embedded["wp:featuredmedia"][0].source_url}
                alt={post.title.rendered}
                className={styles["post-image"]}
                loading="lazy" // lazy load images
              />
            )}

            {/* Title and excerpt */}
            <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            <Link href={`/${post.slug}`} className={styles["read-more"]}>
              Read More →
            </Link>
          </article>
        ))}
      </div>

      {loadingRef.current && (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>Loading...</p>
      )}
      {finished && (
        <p style={{ textAlign: "center", marginTop: "1rem", fontWeight: "bold" }}>
          No more blog posts
        </p>
      )}
    </section>
  );
}
