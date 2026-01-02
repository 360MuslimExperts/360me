"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ's" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "glass py-2"
        : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo + Site Name */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <Image
              src="/logo-512.png"
              alt="Logo"
              width={scrolled ? 40 : 50}
              height={scrolled ? 40 : 50}
              className="transition-all duration-300 drop-shadow-md group-hover:scale-110"
            />
          </div>
          <span className={`font-[Outfit] transition-colors duration-300 text-sm md:text-lg font-bold ${scrolled ? 'text-primary' : 'text-primary'} group-hover:text-golden`}>
            360 Muslim Experts
          </span>
        </Link>

        {/* Hamburger (mobile only) */}
        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-between w-8 h-5 cursor-pointer z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`h-[2.5px] w-full bg-primary rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5 bg-red-500" : ""
              }`}
          />
          <span
            className={`h-[2.5px] w-full bg-primary rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`h-[2.5px] w-full bg-primary rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5 bg-red-500" : ""
              }`}
          />
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative font-[Outfit] text-base font-medium transition-all duration-300 ${isActive(link.href)
                    ? "text-golden font-semibold"
                    : "text-primary hover:text-golden"
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-golden"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <button className="btn text-sm px-5 py-2 rounded-full shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
            Feedback
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
            >
              <ul className="flex flex-col items-center gap-6 text-center">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-2xl font-[Outfit] font-semibold ${isActive(link.href) ? "text-golden" : "text-primary"
                        }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <button className="btn text-lg px-8 py-3">
                    Feedback
                  </button>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
