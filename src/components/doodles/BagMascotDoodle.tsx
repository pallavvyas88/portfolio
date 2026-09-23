import React from 'react';

interface BagMascotDoodleProps {
  className?: string;
  size?: number;
}

export function BagMascotDoodle({ className = 'text-[var(--coral)]', size = 44 }: BagMascotDoodleProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 44 44" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-label="Shopify bag doodle"
    >
      {/* Bag Handle */}
      <path d="M14 16 C14 8, 30 8, 30 16" />
      {/* Bag Body - slightly organic angled hand-drawn feel */}
      <path d="M8 16 L36 16 L33.5 39 C33.5 41, 32 42, 30 42 L14 42 C12 42, 10.5 41, 10.5 39 Z" />
      {/* S Doodle on bag */}
      <path d="M20 25 C20 22.5, 24.5 22.5, 24.5 26 C24.5 29.5, 19 29.5, 19 33 C19 36.5, 24.5 36.5, 24.5 34" strokeWidth="2.2" />
      {/* Star sparkle next to bag */}
      <path d="M35 10 L36 13.5 L39.5 14.5 L36 15.5 L35 19 L34 15.5 L30.5 14.5 L34 13.5 Z" fill="currentColor" stroke="none" />
      {/* Micro accent dot */}
      <circle cx="39" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default BagMascotDoodle;
