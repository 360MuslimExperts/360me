// QUICK REFERENCE: SmartText Component Usage

/**
 * SmartText Component
 * Location: /components/SmartText.js
 * 
 * Automatically detects language and applies appropriate font, direction, and line-height
 */

// ============================================================================
// BASIC USAGE
// ============================================================================

import { SmartText } from '@/components/SmartText';

// Simple paragraph
<SmartText>
  یہ اردو متن ہے
</SmartText>

// Custom element type
<SmartText as="h1">
  عنوان
</SmartText>

// With additional classes
<SmartText as="p" className="text-lg font-bold text-primary">
  اردو یا عربی یا English
</SmartText>

// ============================================================================
// SUPPORTED ELEMENT TYPES
// ============================================================================

<SmartText as="h1">Heading 1</SmartText>
<SmartText as="h2">Heading 2</SmartText>
<SmartText as="h3">Heading 3</SmartText>
<SmartText as="h4">Heading 4</SmartText>
<SmartText as="h5">Heading 5</SmartText>
<SmartText as="h6">Heading 6</SmartText>
<SmartText as="p">Paragraph (default)</SmartText>
<SmartText as="span">Inline text</SmartText>
<SmartText as="div">Block container</SmartText>
<SmartText as="blockquote">Quote</SmartText>
<SmartText as="li">List item</SmartText>

// ============================================================================
// LANGUAGE DETECTION
// ============================================================================

// Urdu text (contains Urdu-specific characters)
<SmartText>
  ٹیسٹ - Contains ٹ (U+0679)
  ڈیٹا - Contains ڈ (U+0688)
  ڑوٹی - Contains ڑ (U+0691)
</SmartText>
// Result: Jameel Noori Nastaleeq font, RTL, line-height: 2.5

// Arabic text (Arabic script without Urdu-specific chars)
<SmartText>
  النص العربي
</SmartText>
// Result: Noto Naskh Arabic font, RTL, line-height: 2.0

// English text
<SmartText>
  English text
</SmartText>
// Result: Outfit font, LTR, line-height: 1.75

// Mixed content (auto-detects based on first RTL character)
<SmartText>
  اردو and English mixed
</SmartText>
// Result: Detects Urdu, applies RTL

// ============================================================================
// PORTABLETEXT INTEGRATION
// ============================================================================

import { PortableText } from '@portabletext/react';
import { SmartText } from '@/components/SmartText';

const components = {
  block: {
    h1: ({ children }) => (
      <SmartText as="h1" className="text-4xl font-bold">
        {children}
      </SmartText>
    ),
    h2: ({ children }) => (
      <SmartText as="h2" className="text-3xl font-bold">
        {children}
      </SmartText>
    ),
    normal: ({ children }) => (
      <SmartText as="p" className="text-lg">
        {children}
      </SmartText>
    ),
    blockquote: ({ children }) => (
      <SmartText as="blockquote" className="italic text-2xl">
        {children}
      </SmartText>
    ),
  },
};

<PortableText value={content} components={components} />

// ============================================================================
// FONT APPLICATION LOGIC
// ============================================================================

/**
 * Font Selection Priority:
 * 
 * 1. Check for Urdu-specific characters (ٹ، ڈ، ڑ، چ، ژ، گ، etc.)
 *    → Apply: font-urdu-nastaleeq class
 *    → Fonts: Jameel Noori Nastaleeq → Noto Nastaliq Urdu → Noto Naskh Arabic
 *    → Line-height: 2.5 (leading-loose)
 * 
 * 2. Check for Arabic script (U+0600-U+06FF)
 *    → Apply: arabicFont.className
 *    → Fonts: Noto Naskh Arabic
 *    → Line-height: 2.0 (leading-relaxed)
 * 
 * 3. Default (English/Latin)
 *    → Apply: outfit.className
 *    → Fonts: Outfit
 *    → Line-height: 1.75 (leading-relaxed)
 */

// ============================================================================
// RTL/LTR DIRECTION
// ============================================================================

/**
 * Direction Detection:
 * 
 * RTL (Right-to-Left):
 * - Arabic: U+0600-U+06FF
 * - Hebrew: U+0590-U+05FF
 * - Automatically applies: dir="rtl" and text-right
 * 
 * LTR (Left-to-Right):
 * - All other scripts
 * - Automatically applies: dir="ltr" and text-left
 */

// Example: RTL text
<SmartText>اردو</SmartText>
// Renders: <p dir="rtl" class="font-urdu-nastaleeq rtl text-right leading-loose">اردو</p>

// Example: LTR text
<SmartText>English</SmartText>
// Renders: <p dir="ltr" class="[outfit-class] ltr text-left leading-relaxed">English</p>

// ============================================================================
// STYLING BEST PRACTICES
// ============================================================================

// ✅ DO: Add additional Tailwind classes
<SmartText className="text-primary font-bold mb-4">
  اردو متن
</SmartText>

// ✅ DO: Override alignment if needed (for special cases)
<SmartText className="text-center">
  مرکز میں
</SmartText>

// ❌ DON'T: Override font-family (defeats the purpose)
<SmartText className="font-sans"> {/* This will conflict */}
  اردو متن
</SmartText>

// ❌ DON'T: Override direction manually (let SmartText handle it)
<SmartText className="ltr"> {/* This will conflict */}
  اردو متن
</SmartText>

// ✅ DO: Use for consistent typography
<SmartText as="h1" className="text-4xl">Title</SmartText>
<SmartText as="p" className="text-lg">Paragraph</SmartText>

// ============================================================================
// COMMON USE CASES
// ============================================================================

// 1. Blog post title
<SmartText as="h1" className="text-5xl font-black text-center mb-8">
  {post.title}
</SmartText>

// 2. Article paragraph
<SmartText as="p" className="text-lg mb-6">
  {paragraph}
</SmartText>

// 3. Blockquote
<div className="border-l-4 border-golden pl-6">
  <SmartText as="blockquote" className="text-2xl italic text-primary/80">
    {quote}
  </SmartText>
</div>

// 4. Card title
<SmartText as="h3" className="text-2xl font-bold mb-4">
  {card.title}
</SmartText>

// 5. List item
<ul>
  <li>
    <SmartText>{item}</SmartText>
  </li>
</ul>

// ============================================================================
// TROUBLESHOOTING
// ============================================================================

/**
 * Issue: Wrong font applied to Urdu text
 * Solution: Ensure text contains Urdu-specific characters (ٹ، ڈ، ڑ، etc.)
 *           If only using common Arabic chars, it will be detected as Arabic
 */

/**
 * Issue: Text not aligned correctly
 * Solution: Don't override text-left/text-right classes
 *           SmartText handles alignment automatically
 */

/**
 * Issue: Line-height too tight
 * Solution: Don't override leading-* classes
 *           SmartText applies optimal line-height per language
 */

/**
 * Issue: Font not loading
 * Solution: 1. Check /public/fonts/jameel-noori-nastaleeq.woff2 exists
 *           2. Check browser DevTools > Network for font loading
 *           3. Verify fallback fonts (Noto Nastaliq Urdu) are loading
 */

// ============================================================================
// ADVANCED: CUSTOM PROPS
// ============================================================================

// Pass any valid HTML attributes
<SmartText
  as="p"
  className="custom-class"
  id="unique-id"
  data-testid="test-element"
  onClick={handleClick}
  style={{ marginTop: '20px' }}
>
  Content
</SmartText>

// ============================================================================
// PERFORMANCE NOTES
// ============================================================================

/**
 * - SmartText is a client component ('use client')
 * - Language detection happens on every render
 * - For static content, detection is fast (regex-based)
 * - For large lists, consider memoization if needed
 * - Font files are cached by browser after first load
 */

// Example: Memoized version for large lists (if needed)
import { memo } from 'react';

const MemoizedSmartText = memo(SmartText);

{items.map(item => (
  <MemoizedSmartText key={item.id}>
    {item.text}
  </MemoizedSmartText>
))}
