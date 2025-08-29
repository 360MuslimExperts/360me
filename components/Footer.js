import Link from "next/link";
import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark,#002)] to-black text-white font-sans px-4 sm:px-6 py-8 md:py-16 mt-16">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-48 sm:w-60 h-48 sm:h-60 bg-[var(--color-secondary,#facc15)] opacity-15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-60 sm:w-72 h-60 sm:h-72 bg-[var(--color-golden,#ffd700)] opacity-10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto flex flex-col gap-10 md:gap-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="flex items-center gap-2">
              <img 
                src="/logo-512.png" 
                alt="Company Logo" 
                className="w-14 sm:w-16 md:w-20 drop-shadow-lg" 
              />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-golden)]">
                360 Muslim Experts
              </span>
            </div>
            <p className="max-w-sm text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
              Empowering communities through <span className="text-[var(--color-golden)]">education</span> and <span className="text-[var(--color-golden)]">humanitarian aid</span>.  
              Together, we build a brighter tomorrow.
            </p>
          </div>

          {/* Quick Links + Our Work */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-8 sm:gap-12">
              
              {/* Quick Links */}
              <div>
                <h4 className="text-[var(--color-golden)] font-semibold uppercase tracking-wide mb-3 text-xs sm:text-sm">
                  Quick Links
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                  {[
                    { href: "/privacy-policy", label: "Privacy Policy" },
                    { href: "/terms-conditions", label: "Terms & Conditions" },
                    { href: "/contact", label: "Contact Us" },
                    { href: "/team-2024", label: "Team-2024" }
                  ].map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="hover:text-[var(--color-golden)] transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Our Work */}
              <div>
                <h4 className="text-[var(--color-golden)] font-semibold uppercase tracking-wide mb-3 text-xs sm:text-sm">
                  Our Work
                </h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm md:text-base">
                  {[
                    { href: "/blog", label: "Blog" },
                    { href: "/media-360", label: "Media 360" },
                    { href: "/360-education", label: "360 Education" },
                    { href: "/medico-360", label: "Medico 360" }
                  ].map((link) => (
                    <li key={link.href}>
                      <Link 
                        href={link.href} 
                        className="hover:text-[var(--color-golden)] transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter + Social */}
          <div className="space-y-5 flex flex-col items-center md:items-start">
            <h4 className="text-[var(--color-golden)] font-semibold uppercase tracking-wide mb-2 text-xs sm:text-sm">
              Stay Connected
            </h4>
            <form className="flex w-full max-w-xs sm:max-w-sm bg-white/10 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-golden)]">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 bg-transparent px-3 sm:px-4 py-2 text-xs sm:text-sm outline-none text-white placeholder-gray-400"
              />
              <button className="bg-[var(--color-golden)] text-black px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium hover:bg-yellow-400 transition">
                Subscribe
              </button>
            </form>
            <div className="flex justify-center md:justify-start gap-4 sm:gap-5 text-lg sm:text-xl">
              <a href="https://instagram.com/360_muslimexperts/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[var(--color-golden)] transition"><FaInstagram /></a>
              <a href="https://facebook.com/360MuslimExpertsPak" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-[var(--color-golden)] transition"><FaFacebookF /></a>
              <a href="https://youtube.com/c/360MuslimExperts" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[var(--color-golden)] transition"><FaYoutube /></a>
              <a href="https://x.com/360muslimexpert" target="_blank" rel="noreferrer" aria-label="Twitter/X" className="hover:text-[var(--color-golden)] transition"><FaXTwitter /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-white/20 pt-5 text-center">
          <p className="text-[10px] sm:text-xs text-gray-400">
            © {new Date().getFullYear()} 360 Muslim Experts. All Rights Reserved.
          </p>
            <p className="mt-1 text-[10px] sm:text-xs text-gray-400">
            Made by{" "}
            <Link
              href="https://ibtisam.is-a.dev"
              target="_blank"
              className="font-medium text-golden hover:underline"
            >
              Ibtisam
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
