'use client';

import { outfit, urduFont, arabicFont } from "@/lib/fonts";

const isArabicScript = (text) => {
  if (!text || typeof text !== 'string') return false;
  // Standard identifier pattern block tracking full character grids for Near-Eastern texts
  return /[\u0600-\u06FF]/.test(text);
};

export function SmartText({ children, as: Tag = 'p', className = '', ...props }) {
  const textContent = Array.isArray(children) 
    ? children.join('') 
    : typeof children === 'string' 
      ? children 
      : '';

  const isRTLText = isArabicScript(textContent);

  // Default English Styles
  let fontClass = outfit.className;
  let customClass = 'leading-relaxed';

  if (isRTLText) {
    // If it's script-based text, ensure your Nastaleeq font gets priority to parse cleanly
    fontClass = 'font-urdu-nastaleeq';
    customClass = 'leading-loose tracking-normal pt-1 pb-2'; 
  }

  const directionClass = isRTLText ? 'rtl text-right' : 'ltr text-left';

  return (
    <Tag
      className={`${fontClass} ${directionClass} ${customClass} ${className}`}
      dir={isRTLText ? 'rtl' : 'ltr'}
      {...props}
    >
      {children}
    </Tag>
  );
}
