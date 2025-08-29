'use client';

import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function ArticleLayout({ article }) {
  const ArticleComponent = useMemo(
    () =>
      dynamic(() => import(`/data/nth-2025/articles/${article.file.replace("./", "")}`), {
        loading: () => <p>Loading article...</p>,
      }),
    [article.file]
  );

  return (
    <main className="flex justify-center items-start min-h-screen bg-[var(--background)] px-4 sm:px-6 py-8 sm:py-12">
      <article 
        className="w-full max-w-3xl bg-[var(--card-bg)] rounded-2xl shadow-[var(--shadow-card)] text-[var(--text-color)] leading-relaxed font-serif animate-fadeIn p-5 sm:p-8 md:p-12"
        dir={article.language === 'ur' ? 'rtl' : 'ltr'}
      >
        {/* Title */}
        <h1 className="text-[2rem] sm:text-[2.8rem] font-bold text-[var(--color-primary)] mb-2 leading-tight font-sans relative after:block after:w-20 sm:after:w-24 after:h-1 after:rounded after:mt-3 after:bg-gradient-to-r after:from-[var(--color-primary)] after:to-[var(--color-secondary-color)] after:animate-slideIn">
          {article.title}
        </h1>

        {/* Author + Designation */}
        <p className="text-sm sm:text-base italic text-[var(--text-color-light)] mb-8 sm:mb-10 font-sans font-normal border-b border-black/10 pb-4 sm:pb-6">
          ✍️ {article.author}
          <span className="block text-xs sm:text-sm font-light text-[var(--text-color-light)] mt-1">
            {article.designation}
          </span>
        </p>

        {/* Date */}
        {article.date && (
          <p className="text-xs sm:text-sm text-[var(--text-color-light)] mb-4 sm:mb-6">
            {article.date}
          </p>
        )}

        {/* Content */}
        <div className="prose prose-base sm:prose-lg max-w-none text-[var(--text)]">
          <ArticleComponent />
        </div>
      </article>
    </main>
  );
}
