import React from 'react';

interface RocketDoodleProps {
  className?: string;
  size?: number;
}

export function RocketDoodle({ className = 'text-[var(--coral)]', size = 70 }: RocketDoodleProps) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 80 84" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-label="Rocket doodle"
    >
      {/* Rocket Main Body */}
      <path d="M40 8 C49 19, 53 35, 51 51 L29 51 C27 35, 31 19, 40 8 Z" fill="var(--paper)" />
      
      {/* Nose Cone Tip */}
      <path d="M35 20 C37 14, 43 14, 45 20" fill="currentColor" opacity="0.85" />
      
      {/* Porthole Window */}
      <circle cx="40" cy="32" r="5.5" fill="var(--mustard)" stroke="currentColor" strokeWidth="2" />
      <circle cx="41.5" cy="30.5" r="1.5" fill="white" stroke="none" />
      
      {/* Left Fin */}
      <path d="M29 42 L18 49 L27 53 Z" fill="currentColor" opacity="0.9" />
      {/* Right Fin */}
      <path d="M51 42 L62 49 L53 53 Z" fill="currentColor" opacity="0.9" />
      
      {/* Thruster Base */}
      <path d="M33 51 L47 51 L45 55 L35 55 Z" fill="currentColor" opacity="0.5" />
      
      {/* Exhaust Flame */}
      <path d="M34 55 C36 65, 40 73, 40 73 C40 73, 44 65, 46 55" fill="var(--mustard)" stroke="currentColor" strokeWidth="2" />
      <path d="M37 55 C38 61, 40 66, 40 66 C40 66, 42 61, 43 55" fill="var(--coral)" stroke="none" />
      
      {/* Hand-drawn smoke puff rings */}
      <circle cx="34" cy="77" r="3" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="45" cy="80" r="3.5" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="28" cy="81" r="2" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

export default RocketDoodle;
