import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        {/* Logo */}
        <img src="/logo-512.png" alt="logo" className={`logo ${scrolled ? "small" : ""}`} />

        {/* Hamburger */}
        <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Links */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <Link href="/" className={router.pathname === "/" ? "active-link" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className={router.pathname === "/blog" ? "active-link" : ""}>
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/contact" className={router.pathname === "/contact" ? "active-link" : ""}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/about" className={router.pathname === "/about" ? "active-link" : ""}>
              About Us
            </Link>
          </li>
          <li>
            <Link href="/faq" className={router.pathname === "/faq" ? "active-link" : ""}>
              FAQ's
            </Link>
          </li>
          <li>
            <button className="feedback-btn">Feedback</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
