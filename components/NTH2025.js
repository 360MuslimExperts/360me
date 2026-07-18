"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const NTHHubSection = () => {
  return (
    <section className="relative w-full py-20 px-4 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 font-[Outfit]"
        >
          <span className="text-golden font-semibold tracking-wider text-sm uppercase">Empowering Innovation</span>
          <h2 className="text-4xl md:text-5xl font-black text-primary mt-2">
            National Talent Hunt
          </h2>
          <p className="text-sm text-text-light/60 mt-1">Bridging creative fields and specialized research scales</p>
        </motion.div>

        {/* Banner Image / Layout Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1000px] relative group"
        >
          <div className="absolute inset-0 bg-golden/5 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50" />
          <Image
            src="/nth/nth-2025.png" // Replace with a generic or 2026 banner asset when ready
            alt="National Talent Hunt Showcase"
            width={1200}
            height={400}
            className="relative w-full h-auto rounded-2xl border border-primary/5 shadow-xl transition-transform duration-500 group-hover:scale-[1.005]"
            sizes="(max-width: 1280px) 100vw, 1000px"
            priority={false}
          />
        </motion.div>

        {/* Dynamic Context Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 max-w-3xl text-base md:text-lg text-text-light/90 leading-relaxed font-light"
        >
          Our flagship initiative showcasing outstanding contributions across articles, research, 
          and modern media expression tracks. Explore recent submissions or track upcoming cycles.
        </motion.p>

        {/* Multi-Route Action Gate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/nth-2026" // Ready for your upcoming 2026 layout/form
            className="btn text-xs px-8 py-3.5 shadow-lg border border-golden bg-golden text-background font-bold tracking-wide"
          >
            NTH 2026 Launch Pad
          </Link>
          <Link
            href="/nth-2025"
            className="btn-outline text-xs px-8 py-3.5 bg-white/40 border border-primary/10 hover:border-golden/40 text-primary transition-all duration-150"
          >
            Review 2025 Submissions
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NTHHubSection;
