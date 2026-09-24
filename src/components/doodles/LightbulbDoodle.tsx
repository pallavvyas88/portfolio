import React from 'react';

interface LightbulbDoodleProps {
  className?: string;
  size?: number;
}

export function LightbulbDoodle({ className = 'text-[var(--mustard)]', size = 52 }: LightbulbDoodleProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 52 54" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-label="Lightbulb idea doodle"
    >
      {/* Radiating Light Rays */}
      <path d="M26 3 L26 8" />
      <path d="M11 10 L14 14" />
      <path d="M41 10 L38 14" />
      <path d="M5 25 L10 25" />
      <path d="M47 25 L42 25" />
      
      {/* Bulb Glass Body */}
      <path 
        d="M17 26 C17 20, 21 15, 26 15 C31 15, 35 20, 35 26 C35 30.5, 32 33, 31 36 L21 36 C20 33, 17 30.5, 17 26 Z" 
        fill="var(--paper)"
      />
      
      {/* Internal Filament Coil */}
      <path d="M23 25 L26 21 L29 25" strokeWidth="2" stroke="var(--coral)" />
      
      {/* Screw Base Thread Lines */}
      <path d="M21 40 L31 40" strokeWidth="2.5" />
      <path d="M23 44 L29 44" strokeWidth="2.5" />
      <path d="M25 47 L27 47" strokeWidth="2" />
    </svg>
  );
}

export default LightbulbDoodle;
