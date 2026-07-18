import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outfit, Noto_Nastaliq_Urdu } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-urdu",
  display: "swap",
});

export const metadata = {
  title: {
    default: "360 Muslim Experts | Empowering the Global Ummah",
    template: "%s | 360ME"
  },
  description: "360 Muslim Experts (360ME) is a professional organization dedicated to education, innovation, and Islamic creativity. Connecting professionals and scholars globally.",
  keywords: ["Muslim Experts", "Islamic Education", "360ME", "Muslim Professionals", "Quran Education", "Islamic Creativity"],
  authors: [{ name: "360 Muslim Experts Team" }],
  creator: "360 Muslim Experts",
  publisher: "360 Muslim Experts",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://360me.pages.dev",
    siteName: "360 Muslim Experts",
    title: "360 Muslim Experts - Empowering the Global Ummah",
    description: "Join a vibrant community of professionals, scholars, and creatives. Explore Quranic education, modern innovation, and impactful initiatives.",
    images: [{ url: "/logo-512.png", width: 512, height: 512, alt: "360ME Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "360 Muslim Experts",
    description: "Connecting professionals and scholars to build a brighter, more inclusive future together.",
    images: ["/logo-512.png"],
    creator: "@360muslimexpert",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/logo-512.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${notoNastaliqUrdu.variable}`}>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
