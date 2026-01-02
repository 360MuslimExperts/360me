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

      <div className="relative text-center max-w-4xl px-4 font-[Outfit] z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-extrabold text-primary tracking-tight leading-tight"
        >
          Welcome to <br />
          <span className="text-golden inline-block mt-2">360 Muslim Experts</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl font-medium max-w-2xl mx-auto mt-6 mb-10 leading-relaxed text-text-light"
        >
          Connect with a dynamic network of professionals, scholars, and
          creatives shaping the future. Stay updated on events, insights, and
          opportunities in science, arts, and Islamic research.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="btn text-lg px-10 py-4 shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            Explore More
          </button>
          <button className="btn-outline text-lg px-10 py-4 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300">
            Join Community
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
