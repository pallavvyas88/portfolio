import React from 'react';

interface DoodleArrowProps {
  className?: string;
  direction?: 'down-left' | 'down-right' | 'up-right' | 'curved';
  color?: string;
}

export function DoodleArrow({ className = '', direction = 'down-left', color = 'currentColor' }: DoodleArrowProps) {
  if (direction === 'down-right') {
    return (
      <svg
        className={`overflow-visible pointer-events-none ${className}`}
        viewBox="0 0 60 50"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10,12 C25,18 45,28 48,42 M38,40 L48,42 L47,32" />
      </svg>
    );
  }

  if (direction === 'up-right') {
    return (
      <svg
        className={`overflow-visible pointer-events-none ${className}`}
        viewBox="0 0 60 50"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10,42 C25,36 45,24 48,10 M38,10 L48,10 L47,20" />
      </svg>
    );
  }

  // Default down-left curved arrow
  return (
    <svg
      className={`overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 60 50"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M50,12 C35,20 20,32 14,44 M24,42 L14,44 L16,34" />
    </svg>
  );
}
