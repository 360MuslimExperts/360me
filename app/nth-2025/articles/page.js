// app/nth-2025/articles/page.js
import articles from "@/data/nth-2025/articles.json";
import Link from "next/link";

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text)] px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[var(--color-primary)] mb-12 tracking-tight">
        NTH 2025 Articles
      </h1>

      {/* Articles Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/nth-2025/articles/${article.id}`}
            className="group block bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="p-6 flex flex-col h-full justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] line-clamp-2">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-gray-500">by {article.author}</p>
              </div>

              <div className="mt-4 text-sm text-[var(--color-secondary)] font-medium group-hover:text-[var(--color-golden)] transition">
                Read More →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
