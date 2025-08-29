"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blogs" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ's" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/40 shadow-sm h-12 backdrop-blur-md"
          : "bg-background/25 h-16 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo + Site Name */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo-512.png"
            alt="Logo"
            width={scrolled ? 38 : 48}
            height={scrolled ? 38 : 48}
            className="transition-all duration-300"
          />
          <span className="`relative font-[Outfit] transition-colors duration-300 text-sm md:text-base font-semibold text-golden">
            360 Muslim Experts
          </span>
        </Link>

        {/* Hamburger (mobile only) */}
        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-between w-6 h-4 cursor-pointer z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`h-[2px] w-full bg-foreground rounded transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`h-[2px] w-full bg-foreground rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-full bg-foreground rounded transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>

        {/* Links */}
        <ul
          className={`flex flex-col md:flex-row md:static absolute top-0 right-0 md:translate-x-0 transform transition-transform duration-300 md:items-center gap-5 md:gap-6 p-6 md:p-0 ${
            scrolled
              ? "bg-background/95 backdrop-blur-md"
              : "bg-background/60 backdrop-blur-sm"
          } md:bg-transparent md:backdrop-blur-none h-screen md:h-auto ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`relative font-[Outfit] text-base font-medium text-primary transition-colors duration-200 group ${
                  isActive(link.href)
                    ? "opacity-100"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {link.label}
                {/* Underline effect */}
                <span
                  className={`absolute left-1/2 -bottom-1 h-[1.5px] bg-accent transition-all duration-300 ${
                    isActive(link.href)
                      ? "w-full -translate-x-1/2"
                      : "w-0 -translate-x-1/2"
                  } group-hover:w-full`}
                />
              </Link>
            </li>
          ))}
          <li>
            <button className="`relative font-[Outfit] bg-primary text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-accent transition">
              Feedback
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
