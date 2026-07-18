'use client';

import React from "react";
import { usePathname } from 'next/navigation';
import { motion } from "framer-motion";

export default function Template({ children }) {
  const pathname = usePathname();
  const mainClass = pathname === '/' ? 'no-padding' : 'with-padding';

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={mainClass}
    >
      {children}
    </motion.main>
  );
}
