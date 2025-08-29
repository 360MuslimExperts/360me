"use client";

import React from "react";
import Link from "next/link";

export default function NTH2025Hub() {
  const sections = [
    {
      title: "Articles",
      description: "Read insightful articles from participants and experts.",
      href: "/nth-2025/articles",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--background)] py-16 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="max-w-4xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
          National Talent Hunt 2025
        </h1>
        <p className="text-lg md:text-xl text-[var(--text)]">
          Explore competitions, submissions, and creative projects from talented peers.
        </p>
      </div>

      {/* Section Cards */}
      <div className="w-full max-w-4xl grid gap-8 sm:grid-cols-1 md:grid-cols-2">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <div className="group relative rounded-2xl shadow-lg border border-[var(--color-accent)] bg-white 
                            overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-secondary-color)] transition-colors">
                  {section.title}
                </h2>
                <p className="text-[var(--text)]">{section.description}</p>
              </div>

              {/* Decorative gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary-color)] opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none"></div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
