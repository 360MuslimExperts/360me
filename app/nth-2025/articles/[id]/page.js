// Remove this line
// export const runtime = 'edge';

import ArticleLayout from "@/components/ArticleLayout";

export async function generateStaticParams() {
  const articles = await import("@/data/nth-2025/articles.json");
  return articles.default.map((article) => ({
    id: article.id.toString(),
  }));
}

export default async function ArticlePage({ params }) {
  const articles = await import("@/data/nth-2025/articles.json");
  const article = articles.default.find((a) => a.id.toString() === params.id);

  if (!article) {
    return <p className="text-center text-red-500 font-semibold mt-10">Article not found.</p>;
  }

  return <ArticleLayout article={article} />;
}
