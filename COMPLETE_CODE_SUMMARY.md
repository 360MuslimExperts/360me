# Complete Updated Code - Blog Typography Fix

## 📄 File 1: SmartText Component

**Location:** `/components/SmartText.js`

```javascript
// components/SmartText.js
"use client";

import { outfit, urduFont, arabicFont } from "@/lib/fonts";

/**
 * Detects if text contains Urdu characters
 * Urdu uses Arabic script (U+0600-U+06FF) plus additional Urdu-specific characters
 * Common Urdu-specific characters: ٹ (U+0679), ڈ (U+0688), ڑ (U+0691), etc.
 */
const isUrdu = (text) => {
  if (!text || typeof text !== "string") return false;
  // Urdu-specific characters that distinguish it from Arabic
  const urduSpecific =
    /[\u0679\u067E\u0686\u0688\u0691\u0698\u06A9\u06AF\u06BA\u06BE\u06C1\u06C3]/;
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
  if (!text || typeof text !== "string") return false;
  return /[\u0600-\u06FF]/.test(text);
};

/**
 * Detects if text should be RTL (Right-to-Left)
 * Returns true for Arabic, Urdu, Persian, Hebrew, etc.
 */
const isRTL = (text) => {
  if (!text || typeof text !== "string") return false;
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
export function SmartText({
  children,
  as: Tag = "p",
  className = "",
  ...props
}) {
  // Handle array of children (common in PortableText)
  const textContent = Array.isArray(children)
    ? children.join("")
    : typeof children === "string"
    ? children
    : "";

  const hasUrdu = isUrdu(textContent);
  const hasArabic = isArabic(textContent);
  const shouldBeRTL = isRTL(textContent);

  // Determine which font to use
  let fontClass = outfit.className; // Default to English font
  let customClass = "leading-relaxed"; // Default line-height

  if (hasUrdu) {
    // Urdu text: Use Jameel Noori Nastaleeq with fallback
    fontClass = "font-urdu-nastaleeq";
    customClass = "leading-loose"; // Extra line-height for Nastaleeq
  } else if (hasArabic) {
    // Arabic text: Use Noto Naskh Arabic
    fontClass = arabicFont.className;
    customClass = "leading-relaxed";
  }

  // Determine text direction and alignment
  const directionClass = shouldBeRTL ? "rtl text-right" : "ltr text-left";

  return (
    <Tag
      className={`${fontClass} ${directionClass} ${customClass} ${className}`}
      dir={shouldBeRTL ? "rtl" : "ltr"}
      {...props}
    >
      {children}
    </Tag>
  );
}
```

---

## 📄 File 2: Font Configuration

**Location:** `/lib/fonts.js`

```javascript
// lib/fonts.js
import {
  Outfit,
  Noto_Nastaliq_Urdu,
  Noto_Naskh_Arabic,
} from "next/font/google";

// Primary font for English/Latin text
export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

// Urdu font - Noto Nastaliq Urdu (Nastaleeq style)
// This is used as a fallback; primary Urdu font is Jameel Noori Nastaleeq (self-hosted)
export const urduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal"],
  display: "swap",
});

// Arabic font - Noto Naskh Arabic (Naskh style)
// Used for Arabic text (not Urdu)
export const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});
```

---

## 📄 File 3: Global Styles

**Location:** `/app/globals.css`

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/**
 * FONT FACE DECLARATIONS
 * Self-hosted Jameel Noori Nastaleeq for Urdu text
 * This is the primary font for Urdu content with Noto Nastaliq Urdu as fallback
 */
@font-face {
  font-family: "Jameel Noori Nastaleeq";
  src: url("/fonts/jameel-noori-nastaleeq.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Light mode defaults */
:root {
  --background: #fffaf5;
  /* Slightly warmer background */
  --foreground: #2c2c2c;

  /* Font family variables */
  --font-outfit: "Outfit", sans-serif;
  --font-urdu: "Noto Nastaliq Urdu", serif;
  --font-arabic: "Noto Naskh Arabic", serif;
  --font-urdu-nastaleeq: "Jameel Noori Nastaleeq", "Noto Nastaliq Urdu",
    "Noto Naskh Arabic", serif;
}

html,
body {
  font-family: var(--font-outfit), sans-serif;
  scroll-behavior: smooth;
}

/**
 * URDU & ARABIC TYPOGRAPHY
 * Urdu uses Nastaleeq script which requires more vertical space
 * Arabic uses Naskh script which is more compact
 */

/* Urdu text - Jameel Noori Nastaleeq with fallbacks */
.font-urdu-nastaleeq {
  font-family: var(--font-urdu-nastaleeq);
  line-height: 2.5; /* Extra line-height for Nastaleeq calligraphy */
  letter-spacing: 0;
}

/* Arabic text - Noto Naskh Arabic */
.font-arabic {
  font-family: var(--font-arabic);
  line-height: 2; /* Moderate line-height for Naskh */
  letter-spacing: 0;
}

/* Legacy Urdu class for backward compatibility */
.urdu {
  font-family: var(--font-urdu);
  line-height: 2.2;
  letter-spacing: 0;
}

/* Tailwind theme tokens */
@theme inline {
  --color-primary: #4a1d12;
  --color-secondary: #8c5e4d;
  --color-accent: #e6b686;
  --color-text: #1f1f1f;
  --color-text-light: #5c5c5c;
  --color-golden: #d48d00;
  /* Darkened gold for better contrast */
  --color-white: #ffffff;
  --color-black: #0f0f0f;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

@layer components {
  .section-padding {
    @apply py-24 md:py-32;
  }

  .container-wide {
    @apply max-w-7xl mx-auto px-6;
  }

  /* Reveal animation */
  .reveal {
    animation: reveal 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes reveal {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.98);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* Hover Card Effect */
  .hover-card {
    @apply transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(74,29,18,0.15)];
  }

  /* Glassmorphism Utilities */
  .glass {
    @apply bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl;
  }

  .btn {
    @apply inline-flex items-center justify-center px-10 py-5 rounded-2xl font-black uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95;
  }

  .btn-outline {
    @apply inline-flex items-center justify-center px-10 py-5 rounded-2xl font-black uppercase tracking-widest border-2 border-primary text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 active:scale-95;
  }
}
```

---

## 📄 File 4: Tailwind Configuration

**Location:** `/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        // Urdu font: Jameel Noori Nastaleeq (self-hosted) with fallbacks
        "urdu-nastaleeq": [
          "Jameel Noori Nastaleeq",
          "Noto Nastaliq Urdu",
          "Noto Naskh Arabic",
          "serif",
        ],
        // Legacy Urdu font (Noto Nastaliq)
        urdu: ["Noto Nastaliq Urdu", "serif"],
        // Arabic font (Noto Naskh)
        arabic: ["Noto Naskh Arabic", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

---

## 📄 File 5: Blog Post Page (Key Sections)

**Location:** `/app/blog/[slug]/page.js`

### PortableText Components Section:

```javascript
const components = {
  types: {
    image: ({ value }) => (
      <figure className="my-12">
        <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200/50">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Article visualization"}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-4 text-center text-sm text-text-light/60 italic font-medium">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    /**
     * Heading 1: Large display heading
     * SmartText handles font selection and RTL/LTR direction
     */
    h1: ({ children }) => (
      <SmartText
        as="h1"
        className="text-4xl md:text-6xl font-black mt-16 mb-8 tracking-tight text-center"
      >
        {children}
      </SmartText>
    ),
    /**
     * Heading 2: Section heading with decorative underline
     * Increased line-height for Urdu/Arabic readability
     */
    h2: ({ children }) => (
      <SmartText
        as="h2"
        className="text-3xl md:text-4xl font-bold mt-12 mb-6 tracking-tight relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-golden after:rounded-full"
      >
        {children}
      </SmartText>
    ),
    /**
     * Heading 3: Subsection heading
     */
    h3: ({ children }) => (
      <SmartText
        as="h3"
        className="text-2xl md:text-3xl font-bold mt-10 mb-5 tracking-tight"
      >
        {children}
      </SmartText>
    ),
    /**
     * Normal paragraph: Body text with optimized line-height
     * Line-height is handled by SmartText based on language detection
     */
    normal: ({ children }) => (
      <SmartText as="p" className="text-lg md:text-xl mb-8 font-light">
        {children}
      </SmartText>
    ),
    /**
     * Blockquote: Featured quote with golden accent bar
     * Extra spacing and larger text for emphasis
     */
    blockquote: ({ children }) => (
      <div className="my-12 relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-golden rounded-full opacity-50"></div>
        <SmartText
          as="blockquote"
          className="pl-10 pr-6 py-4 italic text-2xl md:text-3xl text-primary/80 font-medium"
        >
          &quot;{children}&quot;
        </SmartText>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-8 mb-10 space-y-4 text-text-light/90 text-lg md:text-xl font-light">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-8 mb-10 space-y-4 text-text-light/90 text-lg md:text-xl font-light">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-golden font-bold underline decoration-2 underline-offset-4 hover:text-primary transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-primary">{children}</strong>
    ),
  },
};
```

---

## 🎯 Key Features Implemented

### 1. **Urdu Font Handling**

- **Primary:** Jameel Noori Nastaleeq (self-hosted WOFF2)
- **Fallback 1:** Noto Nastaliq Urdu (Google Fonts)
- **Fallback 2:** Noto Naskh Arabic (Google Fonts)

### 2. **Arabic Font Handling**

- **Primary:** Noto Naskh Arabic (Google Fonts)
- Automatically applied to Arabic text without Urdu-specific characters

### 3. **RTL/LTR Detection**

- Automatic detection based on Unicode ranges
- Sets both `dir` attribute and CSS classes
- Proper text alignment (right for RTL, left for LTR)

### 4. **Line-Height Optimization**

- **Urdu (Nastaleeq):** 2.5 (leading-loose)
- **Arabic (Naskh):** 2.0 (leading-relaxed)
- **English:** 1.75 (leading-relaxed)

### 5. **Language Detection**

- Urdu: Detects specific characters (ٹ، ڈ، ڑ، چ، ژ، گ، etc.)
- Arabic: Detects Arabic script (U+0600-U+06FF)
- English: Default for Latin scripts

---

## 📦 Required Font File

**File:** `/public/fonts/jameel-noori-nastaleeq.woff2`

**How to obtain:**

1. Download Jameel Noori Nastaleeq font (TTF/OTF)
2. Convert to WOFF2 using:
   - https://cloudconvert.com/ttf-to-woff2
   - https://everythingfonts.com/ttf-to-woff2
3. Rename to `jameel-noori-nastaleeq.woff2`
4. Place in `/public/fonts/` directory

**Helper script:** Run `./setup-font.sh` for guided setup

---

## ✅ Testing Checklist

- [ ] Urdu text displays in Jameel Noori Nastaleeq
- [ ] Arabic text displays in Noto Naskh Arabic
- [ ] English text displays in Outfit
- [ ] RTL text is right-aligned
- [ ] LTR text is left-aligned
- [ ] Line-height provides adequate spacing
- [ ] Font files load successfully (check Network tab)
- [ ] Fallback fonts work when primary unavailable

---

## 📚 Documentation Files

1. **TYPOGRAPHY_IMPLEMENTATION.md** - Complete technical documentation
2. **SMARTTEXT_USAGE.js** - Quick reference guide with examples
3. **public/fonts/README.md** - Font setup instructions
4. **setup-font.sh** - Interactive font setup helper

---

## 🔧 Lint Warnings (Safe to Ignore)

The following CSS lint warnings are expected and can be ignored:

- `Unknown at rule @plugin` - Tailwind CSS v4 syntax
- `Unknown at rule @theme` - Tailwind CSS v4 syntax
- `Unknown at rule @apply` - Tailwind CSS utility

These are valid Tailwind CSS directives and work correctly at runtime.
