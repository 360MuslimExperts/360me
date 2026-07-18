"use client";
import { useRef } from "react";
import dynamic from 'next/dynamic';
import Hero from "@/components/Hero";

const NTHSection = dynamic(() => import("@/components/NTH2025"), { loading: () => <div className="h-96" /> });
const Activities = dynamic(() => import("@/components/Activities"));
const Experts = dynamic(() => import("@/components/Experts"));
const Posts = dynamic(() => import("@/components/Posts"));
const Donate = dynamic(() => import("@/components/Donate"));

export default function HomeClient({ featuredHeads }) {
  const nextSectionRef = useRef(null);
  
  return (
    <>
      <Hero onExplore={() =>
        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" })
      } />

      <div ref={nextSectionRef}>
        <NTHSection />
        <Activities />
        {/* ⚡ Pass the dynamic heads directly through the lazy-loaded chunk */}
        <Experts featuredHeads={featuredHeads} />
        <Posts />
        <Donate />
      </div>
    </>
  );
}
