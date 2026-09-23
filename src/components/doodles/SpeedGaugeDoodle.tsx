import React from 'react';

interface SpeedGaugeDoodleProps {
  className?: string;
  size?: number;
}

export function SpeedGaugeDoodle({ className = 'text-emerald-500', size = 44 }: SpeedGaugeDoodleProps) {
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
      aria-label="Speed gauge doodle"
    >
      {/* Outer Dial Arc */}
      <path d="M8 32 C6 23, 11 12, 22 10 C33 12, 38 23, 36 32" />
      {/* Hash mark ticks */}
      <line x1="12" y1="27" x2="15" y2="25" strokeWidth="2" />
      <line x1="16" y1="18" x2="19" y2="19" strokeWidth="2" />
      <line x1="22" y1="12" x2="22" y2="16" strokeWidth="2" />
      <line x1="28" y1="19" x2="25" y2="18" strokeWidth="2" />
      <line x1="32" y1="27" x2="29" y2="25" strokeWidth="2" />
      {/* Center Pivot Hub */}
      <circle cx="22" cy="29" r="3.5" fill="currentColor" />
      {/* Fast Needle pointing towards top-right (high score) */}
      <line x1="22" y1="29" x2="31" y2="16" strokeWidth="2.8" stroke="var(--coral)" />
    </svg>
  );
}

export default SpeedGaugeDoodle;
