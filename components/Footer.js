import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-primary via-[#2E140C] to-black text-white font-[Outfit] pt-16 pb-8 overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-golden/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-9 gap-y-12 gap-x-8">

          {/* Brand Column (Full width on mobile, 4 cols on desktop) */}
          <div className="col-span-1 md:col-span-4 space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16">
                <Image src="/api/assets/logo/logo-256.webp" alt="360 Muslim Experts Logo" fill className="object-contain drop-shadow-lg" />
              </div>
              <h2 className="text-2xl font-bold leading-tight">
                360 Muslim <br /> <span className="text-golden">Experts</span>
              </h2>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Building a global network of Muslim experts committed to positive change through Islam, education and research.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaInstagram />, href: "https://instagram.com/360_muslimexperts/", label: "Instagram" },
                { icon: <FaFacebookF />, href: "https://facebook.com/360MuslimExpertsPak", label: "Facebook" },
                { icon: <FaYoutube />, href: "https://youtube.com/c/360MuslimExperts", label: "YouTube" },
                { icon: <FaXTwitter />, href: "https://x.com/360muslimexpert", label: "X (Twitter)" },
                { icon: <FaEnvelope />, href: "mailto:360me.info@gmail.com", label: "Email" }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-golden hover:text-black transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links & Initiatives (Side by side on mobile, 5 cols on desktop) */}
          <div className="col-span-1 md:col-span-5 flex flex-row justify-around gap-8 md:gap-12 w-full md:w-auto">
            {/* Quick Links */}
            <div className="w-full flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-golden mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "Contact", "Team", "About"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Initiatives */}
            <div className="w-full flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-golden mb-6">Our Initiatives</h3>
              <ul className="space-y-3">
                {[
                  { label: "360 Education", href: "/360-education" },
                  { label: "Medico 360", href: "/medico-360" },
                  { label: "Media 360", href: "/media-360" },
                  { label: "Blog & Insights", href: "/blog" }
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Column (Commented out to clean up look and avoid broken fields)
          <div className="col-span-1 md:col-span-3">
            <h3 className="text-lg font-semibold text-golden mb-6 text-center md:text-left">Stay Updated</h3>
            <p className="text-sm text-white/70 mb-4 text-center md:text-left">Subscribe to our newsletter for the latest updates and opportunities.</p>
            <form className="space-y-3">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                type="email"
                id="newsletter-email" name="email" required placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-golden focus:ring-1 focus:ring-golden transition-all placeholder:text-white/30"
              />
              <button type="submit" className="w-full bg-golden text-black font-semibold rounded-xl px-4 py-3 hover:bg-white transition-colors duration-300 shadow-lg shadow-golden/20">
                Subscribe
              </button>
            </form>
          </div>
          */}

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 pt-8 pb-4 text-center">
        <p className="text-sm text-white/50">
          © {currentYear} 360 Muslim Experts. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
