"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ✅ Keep navLinks outside component to avoid re-creation on each render
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About Us" },
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

  // ✅ Safer active route check
  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? "bg-background/95 shadow-md h-16" : "bg-background/50 h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/logo-512.png"
            alt="Logo"
            className={`transition-all duration-300 ${
              scrolled ? "h-10" : "h-14"
            }`}
          />
        </Link>

        {/* Hamburger (mobile only) */}
        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-between w-7 h-5 cursor-pointer z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`h-[2px] w-full bg-foreground rounded transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`h-[2px] w-full bg-foreground rounded transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-[2px] w-full bg-foreground rounded transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* Links */}
        <ul
          className={`flex flex-col md:flex-row md:static absolute top-0 right-0 md:translate-x-0 transform transition-transform duration-300 md:items-center gap-6 md:gap-10 p-8 md:p-0 bg-background/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none h-screen md:h-auto ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`relative font-medium transition-colors duration-200 group ${
                  isActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-accent"
                }`}
              >
                {link.label}
                {/* Underline effect */}
                <span
  className={`absolute left-1/2 -bottom-1.5 h-[2px] bg-accent transition-all duration-300 ${
    isActive(link.href)
      ? "w-full -translate-x-1/2"
      : "w-0 -translate-x-1/2"
  } group-hover:w-full`}
/>

              </Link>
            </li>
          ))}
          <li>
            <button className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-accent transition">
              Feedback
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
