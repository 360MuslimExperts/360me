"use client";
import { useRef } from "react";
import dynamic from 'next/dynamic'; // 1. Import dynamic
import Hero from "@/components/Hero";

// 2. Dynamically import sections so they don't block the initial load
const NTHSection = dynamic(() => import("@/components/NTH2025"), { loading: () => <div className="h-96" /> });
const Activities = dynamic(() => import("@/components/Activities"));
const Experts = dynamic(() => import("@/components/Experts"));
const Posts = dynamic(() => import("@/components/Posts"));
const Donate = dynamic(() => import("@/components/Donate"));

export default function Home() {
  const nextSectionRef = useRef(null);
  return (
    <>
      <Hero onExplore={() =>
        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" })
      } />

      <div ref={nextSectionRef}>
        <NTHSection />
        <Activities />
        <Experts />
        <Posts />
        <Donate />
      </div>
    </>
  );
}
