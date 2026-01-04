"use client";
import { useRef } from "react";
import Hero from "@/components/Hero";
import NTHSection from "@/components/NTH2025";
import Donate from "@/components/Donate";
import Activities from "@/components/Activities";
import Experts from "@/components/Experts";
import Posts from "@/components/Posts";

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
