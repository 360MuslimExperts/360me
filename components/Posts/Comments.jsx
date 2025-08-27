import { useState, useEffect } from "react";
import styles from "./Comments.module.css";
// import styles from "./Post.module.css";


export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    if (!postId) return;

    fetch(
      `https://wp.360muslimexperts.com/wp-json/wp/v2/comments?post=${postId}&status=approve&per_page=100`
    )
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !content) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://wp.360muslimexperts.com/wp-json/wp/v2/comments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            post: postId,
            parent: replyTo || 0,
            author_name: name,
            author_email: email,
            content,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to post comment");
      }

      const newComment = await res.json();

      setComments((prev) => [
        ...prev,
        { ...newComment, content: { rendered: "<em>Your comment is pending approval</em>" } },
      ]);

      setName("");
      setEmail("");
      setContent("");
      setReplyTo(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderComments = (parentId = 0) => {
    const filtered = comments.filter((c) => c.parent === parentId);
    if (filtered.length === 0) return null;

    return (
      <ul className={styles.commentList}>
        {filtered.map((c) => (
          <li key={c.id} className={styles.comment}>
            <p className={styles.commentAuthor}>{c.author_name} said:</p>
            <div
              className={styles.commentContent}
              dangerouslySetInnerHTML={{ __html: c.content.rendered }}
            />
            <button
              className={styles.replyBtn}
              onClick={() => setReplyTo(c.id)}
            >
              Reply
            </button>
            {renderComments(c.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className={styles.comments}>
      <h2>Comments ({comments.length})</h2>
      {comments.length === 0 && <p>No comments yet. Be the first!</p>}

      {renderComments()}

      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <h3>{replyTo ? "Reply to Comment" : "Leave a Comment"}</h3>

        {replyTo && (
          <p className={styles.replyingTo}>
            Replying to comment #{replyTo}{" "}
            <button type="button" onClick={() => setReplyTo(null)}>
              Cancel
            </button>
          </p>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your comment"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </section>
  );
}
