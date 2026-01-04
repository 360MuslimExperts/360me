// components/SmartText.js
'use client';

import { outfit, urduFont, arabicFont } from "@/lib/fonts";

/**
 * Detects if text contains Urdu characters
 * Urdu uses Arabic script (U+0600-U+06FF) plus additional Urdu-specific characters
 * Common Urdu-specific characters: ٹ (U+0679), ڈ (U+0688), ڑ (U+0691), etc.
 */
const isUrdu = (text) => {
  if (!text || typeof text !== 'string') return false;
  // Urdu-specific characters that distinguish it from Arabic
  const urduSpecific = /[\u0679\u067E\u0686\u0688\u0691\u0698\u06A9\u06AF\u06BA\u06BE\u06C1\u06C3]/;
  // Check for Urdu-specific characters first
  if (urduSpecific.test(text)) return true;
  // If no Urdu-specific chars, assume it's Arabic if it has Arabic script
  return false;
};

/**
 * Detects if text contains Arabic characters
 * Arabic script range: U+0600-U+06FF (includes both Arabic and Urdu)
 */
const isArabic = (text) => {
  if (!text || typeof text !== 'string') return false;
  return /[\u0600-\u06FF]/.test(text);
};

/**
 * Detects if text should be RTL (Right-to-Left)
 * Returns true for Arabic, Urdu, Persian, Hebrew, etc.
 */
const isRTL = (text) => {
  if (!text || typeof text !== 'string') return false;
  // Arabic/Urdu/Persian: U+0600-U+06FF
  // Hebrew: U+0590-U+05FF
  return /[\u0590-\u05FF\u0600-\u06FF]/.test(text);
};

/**
 * SmartText Component
 * Dynamically applies appropriate font and text direction based on content
 * 
 * Font Priority:
 * - Urdu text: Jameel Noori Nastaleeq (primary) → Noto Naskh Arabic (fallback)
 * - Arabic text: Noto Naskh Arabic
 * - English/Latin: Outfit
 * 
 * Direction:
 * - Automatically detects RTL for Arabic/Urdu scripts
 * - LTR for Latin scripts
 * 
 * Line Height:
 * - Increased for Urdu/Arabic for better readability (Nastaleeq needs more vertical space)
 */
export function SmartText({ children, as: Tag = 'p', className = '', ...props }) {
  // Handle array of children (common in PortableText)
  const textContent = Array.isArray(children) 
    ? children.join('') 
    : typeof children === 'string' 
      ? children 
      : '';

  const hasUrdu = isUrdu(textContent);
  const hasArabic = isArabic(textContent);
  const shouldBeRTL = isRTL(textContent);

  // Determine which font to use
  let fontClass = outfit.className; // Default to English font
  let customClass = 'leading-relaxed'; // Default line-height

  if (hasUrdu) {
    // Urdu text: Use Jameel Noori Nastaleeq with fallback
    fontClass = 'font-urdu-nastaleeq';
    customClass = 'leading-loose'; // Extra line-height for Nastaleeq
  } else if (hasArabic) {
    // Arabic text: Use Noto Naskh Arabic
    fontClass = arabicFont.className;
    customClass = 'leading-relaxed';
  }

  // Determine text direction and alignment
  const directionClass = shouldBeRTL ? 'rtl text-right' : 'ltr text-left';

  return (
    <Tag
      className={`${fontClass} ${directionClass} ${customClass} ${className}`}
      dir={shouldBeRTL ? 'rtl' : 'ltr'}
      {...props}
    >
      {children}
    </Tag>
  );
}
