"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero({ onExplore }) {
  return (
    <div
      className="relative w-full min-h-screen text-[var(--primary)] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Absolute Background SVG Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-40">
        <svg 
          xmlns='http://www.w3.org/2000/svg' 
          viewBox='0 0 2000 1500'
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect fill='#E6B686' width='2000' height='1500'/>
          <defs>
            <rect stroke='#E6B686' stroke-width='0.4' width='1' height='1' id='s'/>
            <pattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='rotate(192 1000 750) scale(25.6) translate(-960.94 -720.7)'>
              <use fill='#e4b485' href='#s' y='2'/><use fill='#e4b485' href='#s' x='1' y='2'/><use fill='#e1b283' href='#s' x='2' y='2'/><use fill='#e1b283' href='#s'/><use fill='#dfb082' href='#s' x='2'/><use fill='#dfb082' href='#s' x='1' y='1'/>
            </pattern>
            <pattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='rotate(192 1000 750) scale(25.6) translate(-960.94 -720.7)'>
              <g fill='#ddaf81'><use href='#s'/><use href='#s' y='5' /><use href='#s' x='1' y='10'/><use href='#s' x='2' y='1'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='8'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='5' y='2'/><use href='#s' x='5' y='6'/><use href='#s' x='6' y='9'/></g>
            </pattern>
            <pattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(192 1000 750) scale(25.6) translate(-960.94 -720.7)'>
              <g fill='#ddaf81'><use href='#s' y='5'/><use href='#s' y='8'/><use href='#s' x='1' y='1'/><use href='#s' x='1' y='9'/><use href='#s' x='1' y='12'/><use href='#s' x='2'/><use href='#s' x='2' y='4'/><use href='#s' x='3' y='2'/><use href='#s' x='3' y='6'/><use href='#s' x='3' y='11'/><use href='#s' x='4' y='3'/><use href='#s' x='4' y='7'/><use href='#s' x='4' y='10'/></g>
            </pattern>
            <pattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(192 1000 750) scale(25.6) translate(-960.94 -720.7)'>
              <g fill='#daad7f'><use href='#s' y='11'/><use href='#s' x='2' y='9'/><use href='#s' x='5' y='12'/><use href='#s' x='9' y='4'/><use href='#s' x='12' y='1'/><use href='#s' x='16' y='6'/></g>
            </pattern>
            <pattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='rotate(192 1000 750) scale(25.6) translate(-960.94 -720.7)'>
              <g fill='#E6B686'><use href='#s' y='9'/><use href='#s' x='16' y='5'/><use href='#s' x='14' y='2'/><use href='#s' x='11' y='11'/><use href='#s' x='6' y='14'/></g>
              <g fill='#d8ab7e'><use href='#s' x='3' y='13'/><use href='#s' x='9' y='7'/><use href='#s' x='13' y='10'/><use href='#s' x='15' y='4'/><use href='#s' x='18' y='1'/></g>
            </pattern>
            <pattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='rotate(192 1000 750) scale(25.6) translate(-960.94 -720.7)'>
              <g fill='#4A1D12'><use href='#s' x='2' y='5'/><use href='#s' x='16' y='38'/><use href='#s' x='46' y='42'/><use href='#s' x='29' y='20'/></g>
            </pattern>
            <pattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='rotate(192 1000 750) scale(25.6) translate(-960.94 -720.7)'>
              <g fill='#4A1D12'><use href='#s' x='33' y='13'/><use href='#s' x='27' y='54'/><use href='#s' x='55' y='55'/></g>
            </pattern>
            <pattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='rotate(192 1000 750) scale(25.6) translate(-960.94 -720.7)'>
              <g fill='#4A1D12'><use href='#s' x='11' y='8'/><use href='#s' x='51' y='13'/><use href='#s' x='17' y='73'/><use href='#s' x='99' y='57'/></g>
            </pattern>
          </defs>
          <rect fill='url(#a)' width='100%' height='100%'/><rect fill='url(#b)' width='100%' height='100%'/><rect fill='url(#h)' width='100%' height='100%'/><rect fill='url(#c)' width='100%' height='100%'/><rect fill='url(#d)' width='100%' height='100%'/><rect fill='url(#e)' width='100%' height='100%'/><rect fill='url(#f)' width='100%' height='100%'/><rect fill='url(#g)' width='100%' height='100%'/>
        </svg>
      </div>

      {/* Transparent overlay gradient to ease text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background/70 pointer-events-none z-0" />

      <div className="relative text-center max-w-4xl px-4 font-[Outfit] z-10 [content-visibility:auto]">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
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
