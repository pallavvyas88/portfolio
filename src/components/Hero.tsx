'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { 
  RocketDoodle, 
  LightbulbDoodle, 
  WashiTape, 
  DoodleHighlight, 
  DoodleArrow 
} from './doodles';

export default function Hero() {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 sm:pb-24 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Charismatic Copy & Spot Doodles */}
        <div className="lg:col-span-7 space-y-6 relative">
          
          {/* Hand-drawn Lightbulb Doodle */}
          <div className="absolute -top-12 -left-4 hidden sm:block text-[var(--mustard)] float-doodle">
            <LightbulbDoodle size={52} />
          </div>

          {/* Pill Sticker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs font-bold shadow-xs">
            <span>Senior-Only Shopify Engineering</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>No Agency Bloat</span>
          </div>

          {/* Headline with Handcrafted Loop Highlight */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-[var(--ink)]">
            I build Shopify storefronts that turn visitors into{' '}
            <span className="relative inline-block text-[var(--coral)] px-1">
              buyers
              {/* Hand-drawn oval loop ring around buyers */}
              <DoodleHighlight color="var(--coral)" strokeWidth={3} className="-top-3 -bottom-3 -left-3 -right-3" />
            </span>.
          </h1>

          <p className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed max-w-xl font-normal">
            Most stores bleed revenue because of 35 stacked apps, slow themes, and broken mobile checkout. I engineer clean Liquid and Headless Hydrogen stores that load in under 1 second and convert at 2–3x.
          </p>

          {/* CTAs with Sketched Arrow & Handwritten Annotation */}
          <div className="pt-2 flex flex-wrap items-center gap-4 relative">
            <a 
              href="#contact" 
              className="doodle-btn px-7 py-3.5 bg-[var(--coral)] text-white font-black text-sm sm:text-base flex items-center gap-2 hover:bg-[var(--coral-hover)]"
            >
              <span>Book a Sprint</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a 
              href="#comparison" 
              className="doodle-btn px-6 py-3.5 bg-[var(--paper)] text-[var(--ink)] font-bold text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center gap-2"
            >
              <span>See the Difference</span>
            </a>

            {/* Sketched Arrow + Handwriting Annotation */}
            <div className="hidden sm:flex items-center gap-2 absolute -bottom-14 left-56 text-[var(--coral)] pointer-events-none">
              <DoodleArrow direction="up-right" className="w-12 h-10 -rotate-12" />
              <span className="font-doodle text-2xl -mt-2 -rotate-2 whitespace-nowrap font-bold">
                Direct founder access &middot; Zero juniors
              </span>
            </div>
          </div>

          {/* Verified Social Proof Stats */}
          <div className="pt-10 sm:pt-12 flex flex-wrap gap-6 sm:gap-8 items-center border-t border-[var(--border-hand)]">
            <div>
              <div className="text-3xl font-black text-[var(--ink)]">50+</div>
              <div className="text-xs text-[var(--ink-muted)] font-extrabold uppercase tracking-wider mt-0.5">
                Stores Delivered
              </div>
            </div>
            <div className="w-px h-10 bg-[var(--border-hand)]"></div>
            <div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">99+</div>
              <div className="text-xs text-[var(--ink-muted)] font-extrabold uppercase tracking-wider mt-0.5">
                Mobile Lighthouse
              </div>
            </div>
            <div className="w-px h-10 bg-[var(--border-hand)]"></div>
            <div>
              <div className="text-3xl font-black text-[var(--coral)]">$2M+</div>
              <div className="text-xs text-[var(--ink-muted)] font-extrabold uppercase tracking-wider mt-0.5">
                Client Revenue
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Handcrafted Comparison Board & Flying Rocket */}
        <div id="comparison" className="lg:col-span-5 relative mt-6 lg:mt-0">
          
          {/* Sketched Rocket Flying Up */}
          <div className="absolute -top-14 -right-4 z-20 hidden sm:block text-[var(--coral)] wiggle">
            <RocketDoodle size={75} />
          </div>

          {/* The Bloat vs Architecture Comparison Card */}
          <div className="doodle-box p-6 sm:p-7 relative overflow-hidden bg-[var(--paper)]">
            
            {/* Washi tape sticker at top */}
            <WashiTape width="w-32" rotate="-rotate-2" className="-top-3 left-1/2 -translate-x-1/2" />

            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hand)] mb-5 pt-2">
              <span className="font-extrabold text-xs uppercase tracking-wider text-[var(--ink-muted)]">
                Live Architecture Specimen
              </span>
              <span className="font-doodle text-xl text-[var(--coral)] -rotate-3 font-bold">
                Anti-Bloat Engine &uarr;
              </span>
            </div>

            {/* Side-by-side / Before & After Comparison */}
            <div className="space-y-4">
              
              {/* Bad Store */}
              <div className="p-4 rounded-xl border-2 border-red-300 dark:border-red-900/60 bg-red-50/80 dark:bg-red-950/30">
                <div className="flex items-center justify-between text-xs font-black text-red-700 dark:text-red-300 mb-1.5">
                  <span>❌ Typical Shopify Store</span>
                  <span className="bg-red-100 dark:bg-red-900/40 px-2 py-0.5 rounded-md font-mono">Load: 4.8s (F)</span>
                </div>
                <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed font-medium">
                  32 stacked tracking apps, tangled Liquid snippets, 18MB uncompressed hero assets, broken mobile checkout drop-offs.
                </p>
              </div>

              {/* Doodle VS Divider */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-[var(--border-hand)]"></div>
                <span className="font-doodle text-2xl font-bold text-[var(--coral)] px-2">
                  VS
                </span>
                <div className="h-px flex-1 bg-[var(--border-hand)]"></div>
              </div>

              {/* Good Store */}
              <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/40 shadow-xs">
                <div className="flex items-center justify-between text-xs font-black text-emerald-800 dark:text-emerald-300 mb-1.5">
                  <span>⚡ How I Engineer It</span>
                  <span className="bg-emerald-200 dark:bg-emerald-800/50 px-2 py-0.5 rounded-md font-mono font-bold text-emerald-900 dark:text-emerald-200">Load: 0.7s (99 Score)</span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-medium">
                  Zero-bloat Liquid OS 2.0 or Hydrogen Next.js, WebP auto-compression, native Cart Transform APIs, sub-second checkout.
                </p>
              </div>

            </div>

            {/* Bottom Guarantee Stamp */}
            <div className="mt-5 pt-4 border-t border-dashed border-[var(--border-hand)] flex items-center justify-between text-xs">
              <span className="font-extrabold text-[var(--ink)]">
                Core Web Vitals Pass Guaranteed
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-400 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px]">
                100% WCAG 2.2 AA
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
