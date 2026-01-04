// lib/fonts.js
import { Outfit, Noto_Nastaliq_Urdu, Noto_Naskh_Arabic } from "next/font/google";

// Primary font for English/Latin text
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: 'swap',
});

// Urdu font - Noto Nastaliq Urdu (Nastaleeq style)
// This is used as a fallback; primary Urdu font is Jameel Noori Nastaleeq (self-hosted)
export const urduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal"],
  display: 'swap',
});

// Arabic font - Noto Naskh Arabic (Naskh style)
// Used for Arabic text (not Urdu)
export const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: 'swap',
});
