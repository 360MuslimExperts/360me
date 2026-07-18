"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero({ onExplore }) {
  return (
    <div
      className="relative w-full min-h-screen text-[var(--primary)] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Optimized Background Image */}
      <Image
        src="/bg-light.jpg"
        alt="Background"
        fill
        priority
        className="object-cover object-center pointer-events-none"
        sizes="100vw"
        quality={75} // Dropped slightly from 85 to 75 for faster mobile delivery
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/50 pointer-events-none" />

      {/* Added content-visibility to tell the browser this is ready to paint */}
      <div className="relative text-center max-w-4xl px-4 font-[Outfit] z-10 [content-visibility:auto]">
        <motion.h1
          initial={{ opacity: 0 }} // Removed scale deformation to prevent layout calculation lags
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }} // Fast fade-in so LCP triggers immediately
          className="text-5xl md:text-8xl font-black text-primary tracking-tight leading-[1.1]"
        >
          Welcome to <br />
          <span className="text-golden inline-block mt-4 brightness-95">
            360 Muslim Experts
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base md:text-2xl font-light max-w-2xl mx-auto mt-6 mb-10 leading-relaxed text-text-light/90"
        >
          Connecting a global network of professionals, scholars, and creatives
          to bridge tradition and innovation for a brighter future.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onExplore}
            className="btn text-sm px-12 py-5 shadow-2xl shadow-primary/30 cursor-pointer"
          >
            Explore More
          </button>

          <Link href="/contact" passHref>
            <button className="btn-outline text-sm px-12 py-5 bg-white/50 backdrop-blur-md hover:text-primary cursor-pointer w-full sm:w-auto">
              Join Community
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
