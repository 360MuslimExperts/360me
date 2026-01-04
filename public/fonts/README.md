# Jameel Noori Nastaleeq Font Setup

## Overview

This directory contains the self-hosted Jameel Noori Nastaleeq font file for Urdu typography.

## Required Font File

You need to download and place the following font file in this directory:

**File:** `jameel-noori-nastaleeq.woff2`

## How to Obtain the Font

### Option 1: Download from Official Source

1. Visit the Jameel Noori Nastaleeq font website or repository
2. Download the font in TTF or OTF format
3. Convert it to WOFF2 format using an online converter like:
   - https://cloudconvert.com/ttf-to-woff2
   - https://everythingfonts.com/ttf-to-woff2

### Option 2: Use an Existing WOFF2 File

If you already have the `jameel-noori-nastaleeq.woff2` file:

1. Copy it to this directory: `/public/fonts/`
2. Ensure the filename is exactly: `jameel-noori-nastaleeq.woff2`

## Fallback Fonts

If the Jameel Noori Nastaleeq font is not available, the system will automatically fall back to:

1. **Noto Nastaliq Urdu** (loaded via Google Fonts)
2. **Noto Naskh Arabic** (loaded via Google Fonts)
3. System serif fonts

## Font Usage

The font is automatically applied to Urdu text through the `SmartText` component, which:

- Detects Urdu characters in content
- Applies the appropriate font family
- Sets RTL (right-to-left) text direction
- Adjusts line-height for optimal readability

## Technical Details

- **Font Format:** WOFF2 (Web Open Font Format 2.0)
- **Font Display:** swap (ensures text remains visible during font load)
- **Line Height:** 2.5 (optimized for Nastaleeq calligraphy)
- **Character Set:** Urdu-specific characters (U+0679, U+067E, U+0686, etc.)

## Verification

After adding the font file, you can verify it's working by:

1. Running the development server: `npm run dev`
2. Navigating to a blog post with Urdu content
3. Checking the browser's DevTools > Network tab for the font file load
4. Inspecting Urdu text elements to confirm the font-family is applied

## License

Ensure you have the appropriate license to use Jameel Noori Nastaleeq font in your project.
