"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div
      className="relative w-full min-h-screen bg-[url('/bg-light.jpg')] bg-cover bg-center text-[var(--primary)] flex items-center justify-center overflow-hidden"
    >
      {/* Overlay gradient for better text readability and vibe */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/50 pointer-events-none" />

      <div className="relative text-center max-w-4xl px-4 font-[Outfit] z-10 reveal">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black text-primary tracking-tight leading-[1.1]"
        >
          Welcome to <br />
          <span className="text-golden inline-block mt-4 brightness-95">360 Muslim Experts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-2xl font-light max-w-2xl mx-auto mt-8 mb-12 leading-relaxed text-text-light/90"
        >
          Connecting a global network of professionals, scholars, and
          creatives to bridge tradition and innovation for a brighter future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button className="btn text-sm px-12 py-5 shadow-2xl shadow-primary/30">
            Explore More
          </button>
          <button className="btn-outline text-sm px-12 py-5 bg-white/50 backdrop-blur-md">
            Join Community
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
