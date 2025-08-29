import Link from "next/link";
import { FaInstagram, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white font-sans px-6 py-6 mt-12 md:py-12 md:mt-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-8">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-1">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <img src="/logo-512.png" alt="Company Logo" className="w-16 md:w-20" />
              <span className="text-lg md:text-2xl font-bold text-[var(--color-golden)]">
                360 Muslim Experts
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm md:text-base text-gray-200">
              Empowering communities through education and humanitarian aid.
            </p>
          </div>

          {/* Quick Links, Our Work & Follow Us sections */}
          <div className="flex flex-1 flex-wrap justify-center md:justify-end gap-8">
            {/* Quick Links */}
            <div className="flex-1 min-w-[150px] text-center md:text-left">
              <h4 className="text-[var(--color-golden)] font-bold uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li><Link href="/privacy-policy" className="hover:text-[var(--color-golden)]">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-[var(--color-golden)]">Terms & Conditions</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--color-golden)]">Contact Us</Link></li>
                <li><Link href="/team-2024" className="hover:text-[var(--color-golden)]">Team-2024</Link></li>
              </ul>
            </div>

            {/* Our Work */}
            <div className="flex-1 min-w-[150px] text-center md:text-left">
              <h4 className="text-[var(--color-golden)] font-bold uppercase tracking-wider mb-3">
                Our Work
              </h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li><Link href="/blog" className="hover:text-[var(--color-golden)]">Blog</Link></li>
                <li><Link href="/media-360" className="hover:text-[var(--color-golden)]">Media 360</Link></li>
                <li><Link href="/360-education" className="hover:text-[var(--color-golden)]">360 Education</Link></li>
                <li><Link href="/medico-360" className="hover:text-[var(--color-golden)]">Medico 360</Link></li>
              </ul>
            </div>
            
            {/* Follow Us */}
            <div className="flex-1 min-w-[150px] text-center md:text-left">
              <h4 className="text-[var(--color-golden)] font-bold uppercase tracking-wider mb-3">
                Follow Us
              </h4>
              <div className="flex justify-center md:justify-start gap-4 text-2xl">
                <a href="https://instagram.com/360_muslimexperts/" target="_blank" rel="noreferrer" aria-label="Follow us on Instagram" className="hover:text-[var(--color-golden)]"><FaInstagram /></a>
                <a href="https://facebook.com/360MuslimExpertsPak" target="_blank" rel="noreferrer" aria-label="Follow us on Facebook" className="hover:text-[var(--color-golden)]"><FaFacebookF /></a>
                <a href="https://youtube.com/c/360MuslimExperts" target="_blank" rel="noreferrer" aria-label="Follow us on YouTube" className="hover:text-[var(--color-golden)]"><FaYoutube /></a>
                <a href="https://x.com/360muslimexpert" target="_blank" rel="noreferrer" aria-label="Follow us on X (Twitter)" className="hover:text-[var(--color-golden)]"><FaXTwitter /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} 360 Muslim Experts. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
