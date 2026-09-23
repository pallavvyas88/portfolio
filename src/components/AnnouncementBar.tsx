'use client';

import React from 'react';

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-[var(--paper)] border-b border-dashed border-[var(--border-hand)] py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold text-[var(--ink)]">Q2 Availability:</span>
          <span className="text-[var(--ink-muted)] hidden sm:inline">Currently accepting 2 new Shopify Plus / Headless projects</span>
          <span className="text-[var(--ink-muted)] sm:hidden">Taking 2 new projects</span>
        </div>
        <div className="flex items-center gap-3 font-bold">
          <span className="inline-block px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-[10px]">
            ⚡ 48-Hour Technical Proposal
          </span>
          <a href="#contact" className="text-[var(--coral)] hover:underline font-extrabold flex items-center gap-1">
            Get Proposal &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
