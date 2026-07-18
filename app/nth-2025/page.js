"use client";

import React from "react";
import Link from "next/link";

export default function NTH2025Hub() {
  const sections = [
    {
      title: "Articles & Insights",
      description: "Review competition entries and critical research submissions exploring modern Islamic frameworks.",
      href: "/nth-2025/articles",
    },
  ];

  return (
    <main className="min-h-[80vh] bg-background py-16 px-6 flex flex-col items-center justify-center font-[Outfit]">
      {/* Header Container */}
      <div className="max-w-4xl text-center mb-16">
        <span className="text-golden font-bold tracking-widest uppercase text-xs block mb-2">Historical Archive</span>
        <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
          National Talent Hunt 2025
        </h1>
        <p className="text-base md:text-lg text-text-light/80 font-light max-w-2xl mx-auto mt-4 leading-relaxed">
          Explore complete collection logs, published articles, and structured technical works curated during the 2025 session.
        </p>
      </div>

      {/* Grid Router System */}
      <div className="w-full max-w-xl grid gap-6">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <div className="group relative rounded-2xl border border-primary/5 bg-white p-6 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-primary group-hover:text-golden transition-colors duration-150">
                    {section.title}
                  </h2>
                  <p className="text-xs text-text-light/70 font-light mt-1 max-w-md">{section.description}</p>
                </div>
                <span className="text-xl text-primary/30 group-hover:text-golden group-hover:translate-x-1 transition-all duration-150 pl-4">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
