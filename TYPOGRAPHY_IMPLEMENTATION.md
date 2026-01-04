# Blog Typography Fix - Urdu & Arabic Font Implementation

## Overview

This document outlines the complete implementation of proper Urdu and Arabic typography for the Next.js + Sanity blog, including dynamic font selection, RTL/LTR handling, and optimized readability.

## Implementation Summary

### 1. **SmartText Component** (`/components/SmartText.js`)

A dynamic text component that automatically detects language and applies appropriate styling.

**Features:**

- **Language Detection:**

  - Detects Urdu-specific characters (ٹ، ڈ، ڑ، etc.)
  - Detects Arabic script (U+0600-U+06FF)
  - Handles mixed content (Urdu, Arabic, English)

- **Font Application:**

  - **Urdu:** Jameel Noori Nastaleeq → Noto Nastaliq Urdu → Noto Naskh Arabic (fallback chain)
  - **Arabic:** Noto Naskh Arabic
  - **English:** Outfit

- **Direction Handling:**

  - Automatic RTL for Arabic/Urdu scripts
  - Automatic LTR for Latin scripts
  - Sets both `className` and `dir` attribute

- **Line-Height Optimization:**
  - `leading-loose` (2.5) for Urdu Nastaleeq (requires extra vertical space)
  - `leading-relaxed` (2.0) for Arabic Naskh
  - `leading-relaxed` (1.75) for English

**Usage:**

```jsx
import { SmartText } from "@/components/SmartText";

<SmartText as="h1" className="text-4xl font-bold">
  اردو یا عربی یا English
</SmartText>;
```

### 2. **Font Configuration** (`/lib/fonts.js`)

**Fonts Loaded:**

1. **Outfit** - Primary English/Latin font

   - Weights: 400, 700, 900
   - Subsets: latin

2. **Noto Nastaliq Urdu** - Urdu fallback font (Google Fonts)

   - Weights: 400, 700
   - Subsets: arabic
   - Style: Nastaleeq (calligraphic)

3. **Noto Naskh Arabic** - Arabic font (Google Fonts)
   - Weights: 400, 700
   - Subsets: arabic
   - Style: Naskh (traditional)

**Font Loading Strategy:**

- `display: 'swap'` - Ensures text remains visible during font load
- Automatic optimization by Next.js font loader

### 3. **Global Styles** (`/app/globals.css`)

**Added:**

- `@font-face` declaration for Jameel Noori Nastaleeq (self-hosted)
- CSS custom properties for font families
- Font-specific classes with optimized line-heights:
  - `.font-urdu-nastaleeq` - line-height: 2.5
  - `.font-arabic` - line-height: 2.0
  - `.urdu` (legacy) - line-height: 2.2

**Font Fallback Chain:**

```css
--font-urdu-nastaleeq: "Jameel Noori Nastaleeq", "Noto Nastaliq Urdu",
  "Noto Naskh Arabic", serif;
```

### 4. **Tailwind Configuration** (`/tailwind.config.js`)

**Font Family Extensions:**

```javascript
fontFamily: {
  sans: ['Outfit', 'sans-serif'],
  'urdu-nastaleeq': ['Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Noto Naskh Arabic', 'serif'],
  urdu: ['Noto Nastaliq Urdu', 'serif'],
  arabic: ['Noto Naskh Arabic', 'serif'],
}
```

**Usage in Tailwind:**

```html
<div class="font-urdu-nastaleeq">اردو متن</div>
<div class="font-arabic">النص العربي</div>
```

### 5. **Blog Post Page** (`/app/blog/[slug]/page.js`)

**PortableText Components Updated:**

- All text blocks now use `SmartText` component
- Removed manual `leading-relaxed` classes (handled by SmartText)
- Added comprehensive comments explaining each block type
- Maintained existing Tailwind styling

**Block Types:**

- `h1` - Display heading (4xl/6xl)
- `h2` - Section heading with golden underline
- `h3` - Subsection heading
- `normal` - Body paragraphs
- `blockquote` - Featured quotes with accent bar

### 6. **Self-Hosted Font Setup** (`/public/fonts/`)

**Required File:**

- `jameel-noori-nastaleeq.woff2`

**Setup Instructions:**
See `/public/fonts/README.md` for detailed instructions on:

- Downloading the font
- Converting to WOFF2 format
- Placing in the correct directory
- Verifying the installation

## Typography Specifications

### Line-Height Values

| Language | Font                   | Line-Height | Reason                                                    |
| -------- | ---------------------- | ----------- | --------------------------------------------------------- |
| Urdu     | Jameel Noori Nastaleeq | 2.5         | Nastaleeq calligraphy needs vertical space for diacritics |
| Arabic   | Noto Naskh Arabic      | 2.0         | Naskh is more compact but still needs breathing room      |
| English  | Outfit                 | 1.75        | Standard readability for Latin scripts                    |

### Font Sizes

| Element    | Mobile          | Desktop         | Purpose             |
| ---------- | --------------- | --------------- | ------------------- |
| h1         | 2.25rem (36px)  | 3.75rem (60px)  | Main article title  |
| h2         | 1.875rem (30px) | 2.25rem (36px)  | Section headings    |
| h3         | 1.5rem (24px)   | 1.875rem (30px) | Subsection headings |
| p          | 1.125rem (18px) | 1.25rem (20px)  | Body text           |
| blockquote | 1.5rem (24px)   | 1.875rem (30px) | Featured quotes     |

## RTL/LTR Handling

### Automatic Detection

The `SmartText` component automatically detects text direction based on Unicode ranges:

- **RTL:** Arabic (U+0600-U+06FF), Hebrew (U+0590-U+05FF)
- **LTR:** All other scripts

### Implementation

```jsx
// Sets both className and dir attribute
<Tag
  className={`${directionClass} ...`}
  dir={shouldBeRTL ? 'rtl' : 'ltr'}
>
```

### Text Alignment

- RTL text: `text-right`
- LTR text: `text-left`

## Browser Compatibility

### Font Format Support

- **WOFF2:** Supported in all modern browsers (Chrome 36+, Firefox 39+, Safari 10+, Edge 14+)
- **Fallback:** Google Fonts provide automatic fallbacks for older browsers

### CSS Features

- `font-display: swap` - Supported in all modern browsers
- RTL/LTR direction - Universal support
- CSS custom properties - IE11+ (not critical for this project)

## Performance Considerations

### Font Loading Strategy

1. **Critical fonts** (Outfit, Noto Naskh Arabic) loaded via Google Fonts with `display: swap`
2. **Self-hosted font** (Jameel Noori Nastaleeq) loaded with `font-display: swap`
3. **Preloading** can be added if needed:

```html
<link
  rel="preload"
  href="/fonts/jameel-noori-nastaleeq.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

### Optimization Tips

- WOFF2 format provides ~30% better compression than WOFF
- Google Fonts automatically subset fonts based on usage
- Font swapping prevents FOIT (Flash of Invisible Text)

## Testing Checklist

### Visual Testing

- [ ] Urdu text displays in Jameel Noori Nastaleeq (or fallback)
- [ ] Arabic text displays in Noto Naskh Arabic
- [ ] English text displays in Outfit
- [ ] RTL text is right-aligned
- [ ] LTR text is left-aligned
- [ ] Line-height provides adequate spacing
- [ ] Mixed content (Urdu + English) displays correctly

### Technical Testing

- [ ] Font files load successfully (check Network tab)
- [ ] No FOIT (Flash of Invisible Text)
- [ ] Fallback fonts work when primary font unavailable
- [ ] Text remains readable during font load
- [ ] No console errors related to fonts

### Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Font Not Loading

1. Check if `jameel-noori-nastaleeq.woff2` exists in `/public/fonts/`
2. Verify file permissions (should be readable)
3. Check browser DevTools > Network tab for 404 errors
4. Ensure file path in CSS is correct: `/fonts/jameel-noori-nastaleeq.woff2`

### Wrong Font Applied

1. Verify text contains Urdu-specific characters (ٹ، ڈ، ڑ، etc.)
2. Check browser DevTools > Elements > Computed styles
3. Ensure SmartText component is being used
4. Check for CSS specificity conflicts

### RTL Not Working

1. Verify `dir` attribute is set on element
2. Check for conflicting CSS direction rules
3. Ensure text contains RTL Unicode characters
4. Test with pure Arabic/Urdu text first

### Line-Height Issues

1. Check if custom line-height classes are overriding SmartText
2. Verify SmartText is applying correct `customClass`
3. Inspect element to see computed line-height value
4. Adjust values in `globals.css` if needed

## Future Enhancements

### Potential Improvements

1. **Font Subsetting:** Create custom subsets of Jameel Noori Nastaleeq for faster loading
2. **Variable Fonts:** Explore variable font versions for better weight control
3. **Preloading:** Add font preloading for critical above-the-fold content
4. **Language Attribute:** Add `lang` attribute to elements for better accessibility
5. **Font Loading API:** Use Font Loading API for more control over font loading

### Accessibility

1. Add `lang` attribute to SmartText component:
   ```jsx
   <Tag lang={hasUrdu ? 'ur' : hasArabic ? 'ar' : 'en'}>
   ```
2. Ensure sufficient color contrast for all text
3. Test with screen readers (NVDA, JAWS, VoiceOver)

## License & Credits

### Fonts Used

- **Outfit:** Open Font License (Google Fonts)
- **Noto Nastaliq Urdu:** Open Font License (Google Fonts)
- **Noto Naskh Arabic:** Open Font License (Google Fonts)
- **Jameel Noori Nastaleeq:** [Verify license before production use]

### Resources

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Google Fonts](https://fonts.google.com/)
- [Unicode Arabic Range](https://unicode.org/charts/PDF/U0600.pdf)
- [RTL Styling Guide](https://rtlstyling.com/)

## Maintenance

### Regular Checks

- Monitor font loading performance
- Update Google Fonts versions when available
- Test with new Sanity content
- Verify font rendering on new browser versions

### Version Control

- Current implementation: v1.0
- Last updated: 2026-01-04
- Next review: Quarterly or when issues arise
