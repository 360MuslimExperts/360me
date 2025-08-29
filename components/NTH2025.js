"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const NTH2025 = () => {
  return (
    <section className="w-full py-12 px-4 bg-[var(--background)] flex flex-col items-center text-center">
      
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
        National Talent Hunt 2025
      </h2>

      {/* Banner Image */}
      <div className="w-full max-w-[1200px]">
        <Image
          src="/nth/nth-2025.png"
          alt="National Talent Hunt 2025"
          width={1200}
          height={400}
          className="w-full h-auto rounded-xl shadow-lg"
          priority
        />
      </div>

      {/* Description */}
      <p className="mt-6 max-w-3xl text-base md:text-lg text-[var(--text)]">
        Show your skills in articles, photography, videography, and many more.
        Discover, learn, and get inspired by talented peers!
      </p>

      {/* Button */}
      <Link
        href="/nth-2025"
        className="mt-6 px-6 py-3 bg-[var(--color-primary)] rounded-xl font-semibold shadow-md transition-all duration-300 hover:bg-[var(--color-secondary-color)] hover:shadow-lg"
      >
        Explore Works
      </Link>
    </section>
  );
};

export default NTH2025;
