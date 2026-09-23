'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WashiTape } from './doodles/WashiTape';
import { DoodleSquiggle } from './doodles/DoodleSquiggle';

const caseStudies = [
  {
    title: 'Aura Luxury Apparel: OS 2.0 Theme Rebuild',
    badge: 'Custom Liquid',
    metric: '+38% Mobile CVR',
    metricBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-400',
    description:
      'Engineered a bespoke Shopify OS 2.0 theme eliminating 14 bloated third-party apps with native Liquid sections, a sub-second slideout cart with cross-sells, and instant variant swatches.',
    tech: ['Shopify Liquid', 'Theme App Extensions', 'WebP Automation', 'Tailwind CSS'],
    washiRotate: '-rotate-2',
    link: '#contact',
  },
  {
    title: 'Norden Supplement Co: Headless Next.js Storefront',
    badge: 'Headless Hydrogen',
    metric: '0.6s Global LCP',
    metricBg: 'bg-blue-100 dark:bg-blue-950/80 text-[var(--cobalt)] border-blue-400',
    description:
      'Built an omnichannel Next.js 16 storefront backed by Shopify Storefront GraphQL. Enabled dynamic quiz-based bundle builders and multi-currency checkout across US, EU, and UK markets.',
    tech: ['Next.js 16', 'Storefront API', 'Edge Caching', 'Recharge API'],
    washiRotate: 'rotate-2',
    link: '#contact',
  },
  {
    title: 'Veloce Cycling: Performance & CWV Overhaul',
    badge: 'Speed Sprint',
    metric: '99/100 Mobile Vitals',
    metricBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-400',
    description:
      'Surgically eliminated render-blocking scripts, refactored hero carousel asset loading, and optimized DOM depth. Boosted mobile Lighthouse score from 34 to 99, lifting organic search traffic by 28%.',
    tech: ['Core Web Vitals', 'DOM Optimization', 'Critical CSS', 'Lighthouse 99'],
    washiRotate: '-rotate-1',
    link: '#contact',
  },
  {
    title: 'Kavalan Spirits: Custom Checkout UI & Functions',
    badge: 'Shopify Functions',
    metric: '$1.4M Scaled GMV',
    metricBg: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-400',
    description:
      'Developed native Rust/WASM Shopify Functions for tiered volume discounts, state-specific age verification gating, and bespoke Checkout UI extensions with zero external server dependencies.',
    tech: ['Shopify Functions', 'Rust / WASM', 'Checkout Extensibility', 'Graph APIs'],
    washiRotate: 'rotate-1',
    link: '#contact',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="font-doodle text-2xl text-[var(--coral)] block -rotate-1 font-bold">
            Real Results &bull; Clean Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--ink)] relative inline-block">
            Featured Case Studies
            <DoodleSquiggle color="var(--coral)" className="-bottom-2.5 left-0 w-full" />
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-md">
          A selection of recent high-impact Shopify storefronts and technical architectures delivered for modern eCommerce brands.
        </p>
      </div>

      {/* Grid of Case Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((study) => (
          <div 
            key={study.title}
            className="doodle-box p-7 sm:p-8 flex flex-col justify-between relative group hover:border-[var(--coral)] transition-all bg-[var(--paper)]"
          >
            {/* Washi tape sticker */}
            <WashiTape width="w-24 sm:w-28" rotate={study.washiRotate} className="-top-3 right-8" />

            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-black uppercase tracking-wider text-[var(--ink-muted)]">
                  {study.badge}
                </span>
                
                {/* Hand-drawn Metric Stamp */}
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${study.metricBg}`}>
                  {study.metric}
                </span>
              </div>

              <h3 className="text-2xl font-black text-[var(--ink)] mb-3 group-hover:text-[var(--coral)] transition-colors">
                {study.title}
              </h3>

              <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-6">
                {study.description}
              </p>
            </div>

            <div>
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-hand)] mb-5">
                {study.tech.map((t) => (
                  <span 
                    key={t}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[var(--ink)] border border-[var(--border-hand)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={study.link}
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[var(--coral)] hover:underline"
              >
                <span>Request Case Breakdown</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
