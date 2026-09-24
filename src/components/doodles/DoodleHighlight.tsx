import React from 'react';

interface DoodleHighlightProps {
  className?: string;
  color?: string;
  strokeWidth?: number | string;
}

export function DoodleHighlight({ 
  className = '', 
  color = 'currentColor',
  strokeWidth = 2.5
}: DoodleHighlightProps) {
  return (
    <svg
      className={`overflow-visible pointer-events-none absolute -inset-2 w-[calc(100%+1rem)] h-[calc(100%+1rem)] ${className}`}
      viewBox="0 0 120 50"
      preserveAspectRatio="none"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10,25 C12,10 50,5 105,12 C115,14 118,30 102,40 C75,48 20,46 12,35 C8,28 15,18 35,15" />
    </svg>
  );
}

export default DoodleHighlight;
