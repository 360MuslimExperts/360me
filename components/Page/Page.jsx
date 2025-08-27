import React, { useState, useEffect } from "react";

export default function Page({ slug }) {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch(`https://360muslimexperts.com/wp-json/wp/v2/pages?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setPage(data[0]);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  if (!page) return <p>Loading...</p>;

  return (
    <div className="wp-page">
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
