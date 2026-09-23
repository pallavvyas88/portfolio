import React from 'react';

interface DoodleBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'amber' | 'coral' | 'emerald' | 'blue';
  rotate?: string;
}

export function DoodleBadge({
  children,
  className = '',
  variant = 'amber',
  rotate = 'rotate-[-2deg]'
}: DoodleBadgeProps) {
  const variantStyles = {
    amber: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-700/60',
    coral: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/70 dark:text-orange-200 dark:border-orange-700/60',
    emerald: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-200 dark:border-emerald-700/60',
    blue: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/70 dark:text-blue-200 dark:border-blue-700/60',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border shadow-sm transition-transform hover:scale-105 ${rotate} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}
