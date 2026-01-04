/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        // Urdu font: Jameel Noori Nastaleeq (self-hosted) with fallbacks
        'urdu-nastaleeq': ['Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Noto Naskh Arabic', 'serif'],
        // Legacy Urdu font (Noto Nastaliq)
        urdu: ['Noto Nastaliq Urdu', 'serif'],
        // Arabic font (Noto Naskh)
        arabic: ['Noto Naskh Arabic', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  
};
