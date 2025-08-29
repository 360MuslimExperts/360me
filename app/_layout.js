'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const mainClass = pathname === '/' ? 'no-padding' : 'with-padding';

  return (
    <body>
      <Navbar />
      <main className={mainClass}>{children}</main>
      <Footer />
    </body>
  );
}