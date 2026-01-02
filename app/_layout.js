'use client';

import React from "react";
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const mainClass = pathname === '/' ? 'no-padding' : 'with-padding';

  return (
    <body suppressHydrationWarning>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={mainClass}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </body>
  );
}