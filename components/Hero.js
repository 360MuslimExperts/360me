"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Hero({ onExplore }) {
  return (
    <div className="relative w-full min-h-screen text-[var(--primary)] flex items-center justify-center overflow-hidden bg-background">
      {/* ⚡ Clean, Lightweight Geometric Background Pattern via Pure CSS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Soft atmospheric glow for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background/90 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-golden/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative text-center max-w-4xl px-4 font-[Outfit] z-10 [content-visibility:auto]">
        {/* Subtle, highly professional tag indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-primary/5 text-xs font-medium tracking-wider uppercase mb-6 text-golden"
        >
          An International Professional Network
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black text-primary tracking-tight leading-[1.15]"
        >
          Bridging Tradition & <br />
          <span className="text-golden inline-block mt-2 brightness-95">
            Modern Innovation
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base md:text-xl font-light max-w-2xl mx-auto mt-6 mb-10 leading-relaxed text-text-light/80"
        >
          Connecting a global collective of scholars, medical professionals, and technical engineers 
          dedicated to constructive collaboration and high-impact initiatives.
        </motion.p>

        <div className="flex justify-center">
          {/* Main functional interaction point */}
          <button
            onClick={onExplore}
            className="btn text-sm px-16 py-5 shadow-xl shadow-primary/10 cursor-pointer border border-primary/20 hover:border-golden/40 transition-all duration-300"
          >
            Review Our Departments & Initiatives
          </button>
        </div>
      </div>
    </div>
  );
}
