"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const NTH2025 = () => {
  return (
    <section className="relative w-full py-20 px-4 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-golden font-semibold tracking-wider text-sm uppercase">Talent Showcase</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mt-2">
            National Talent Hunt 2025
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1200px] relative group"
        >
          <div className="absolute inset-0 bg-golden/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50" />
          <Image
            src="/nth/nth-2025.png"
            alt="National Talent Hunt 2025"
            width={1200}
            height={400}
            className="relative w-full h-auto rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]"
            priority
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-3xl text-lg md:text-xl text-text leading-relaxed"
        >
          Show your skills in articles, photography, videography, and many more.
          Discover, learn, and get inspired by talented peers!
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Link
            href="/nth-2025"
            className="btn text-lg px-8 py-3 shadow-lg hover:shadow-primary/30"
          >
            Explore Works
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NTH2025;
