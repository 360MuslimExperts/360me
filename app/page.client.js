"use client";

import { useRef } from "react";
import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";

// ⚡ Lazy-load with explicit fallback heights to avoid layout shifts during scrolling
const Experts = dynamic(() => import("@/components/Experts"), { 
  loading: () => <div className="min-h-[400px] animate-pulse bg-primary/5" /> 
});
const NTHSection = dynamic(() => import("@/components/NTH2025"), { 
  loading: () => <div className="min-h-[500px]" /> 
});
const Activities = dynamic(() => import("@/components/Activities"), {
  loading: () => <div className="min-h-[300px]" />
});
const Posts = dynamic(() => import("@/components/Posts"), {
  loading: () => <div className="min-h-[400px]" />
});
const Donate = dynamic(() => import("@/components/Donate"), {
  loading: () => <div className="min-h-[300px]" />
});

export default function HomeClient({ featuredHeads }) {
  const nextSectionRef = useRef(null);

  const handleExplore = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Hero onExplore={handleExplore} />

      {/* ⚡ Added space-y utilities to cleanly separate sections instead of a massive block */}
      <div ref={nextSectionRef} className="space-y-16 md:space-y-28 pb-16">
        
        {/* 1. Credibility first: Show the human authority right under the fold */}
        <Experts featuredHeads={featuredHeads} />
        
        {/* 2. Core Publications & Operations */}
        <NTHSection />
        <Activities />
        <Posts />
        
        {/* 3. Institutional Support at the absolute tail end */}
        <Donate />
      </div>
    </>
  );
}
