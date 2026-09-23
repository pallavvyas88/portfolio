import React from 'react';

interface DoodleSparkleProps {
  className?: string;
  color?: string;
}

export function DoodleSparkle({ className = '', color = 'currentColor' }: DoodleSparkleProps) {
  return (
    <svg
      className={`overflow-visible pointer-events-none inline-block ${className}`}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z" />
    </svg>
  );
}
