#!/bin/bash

# Font Download Helper Script
# This script helps you download and set up the Jameel Noori Nastaleeq font

echo "================================================"
echo "Jameel Noori Nastaleeq Font Setup Helper"
echo "================================================"
echo ""

FONT_DIR="./public/fonts"
FONT_FILE="jameel-noori-nastaleeq.woff2"
FONT_PATH="$FONT_DIR/$FONT_FILE"

# Check if font already exists
if [ -f "$FONT_PATH" ]; then
    echo "✅ Font file already exists at: $FONT_PATH"
    echo ""
    echo "File details:"
    ls -lh "$FONT_PATH"
    echo ""
    echo "If you want to replace it, delete the existing file first."
    exit 0
fi

echo "Font file not found. You need to download it manually."
echo ""
echo "📋 INSTRUCTIONS:"
echo "================"
echo ""
echo "1. Download Jameel Noori Nastaleeq font from one of these sources:"
echo "   - Official website (if available)"
echo "   - Trusted font repositories"
echo "   - Your existing font collection"
echo ""
echo "2. If the font is in TTF or OTF format, convert it to WOFF2:"
echo "   - Visit: https://cloudconvert.com/ttf-to-woff2"
echo "   - Or: https://everythingfonts.com/ttf-to-woff2"
echo "   - Upload your font file"
echo "   - Download the converted WOFF2 file"
echo ""
echo "3. Rename the file to: $FONT_FILE"
echo ""
echo "4. Move the file to: $FONT_DIR/"
echo ""
echo "5. Run this script again to verify the installation"
echo ""
echo "================================================"
echo ""

# Offer to create a placeholder for testing
read -p "Would you like to create a placeholder file for testing? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Create fonts directory if it doesn't exist
    mkdir -p "$FONT_DIR"
    
    # Create a placeholder file
    echo "Creating placeholder file..."
    touch "$FONT_PATH"
    echo "/* Placeholder for Jameel Noori Nastaleeq font */" > "$FONT_PATH"
    
    echo "✅ Placeholder created at: $FONT_PATH"
    echo ""
    echo "⚠️  WARNING: This is just a placeholder!"
    echo "   The font will NOT work until you replace this with the actual WOFF2 file."
    echo ""
else
    echo "Skipping placeholder creation."
    echo ""
fi

echo "================================================"
echo "NEXT STEPS:"
echo "================================================"
echo ""
echo "After adding the font file:"
echo "1. Restart your Next.js development server"
echo "2. Clear your browser cache"
echo "3. Visit a blog post with Urdu content"
echo "4. Check DevTools > Network tab to verify font loading"
echo ""
echo "For more information, see:"
echo "- /public/fonts/README.md"
echo "- /TYPOGRAPHY_IMPLEMENTATION.md"
echo ""
