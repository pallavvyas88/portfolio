import React from 'react';

interface WashiTapeProps {
  className?: string;
  width?: string;
  height?: string;
  rotate?: string;
  color?: string;
}

export function WashiTape({ 
  className = '', 
  width = 'w-28 sm:w-36', 
  height = 'h-6 sm:h-7', 
  rotate = '-rotate-2',
  color = 'bg-[var(--tape)]'
}: WashiTapeProps) {
  return (
    <div 
      className={`absolute ${width} ${height} ${rotate} ${color} border-l-2 border-r-2 border-dashed border-black/20 dark:border-white/20 shadow-xs pointer-events-none z-10 ${className}`} 
      aria-hidden="true"
    />
  );
}

export default WashiTape;
