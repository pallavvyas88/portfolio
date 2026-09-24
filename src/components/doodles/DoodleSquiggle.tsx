import React from 'react';

interface DoodleSquiggleProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

export function DoodleSquiggle({ className = '', color = 'currentColor', strokeWidth = 4 }: DoodleSquiggleProps) {
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      height="12"
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
    >
      <path
        d="M2,8 Q25,1 50,8 T98,8"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
