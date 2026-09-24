'use client';

import React from 'react';
import { SpeedGaugeDoodle } from './doodles/SpeedGaugeDoodle';

const specializations = [
  {
    title: 'Liquid OS 2.0 Themes',
    tag: 'Custom Sections',
    annotation: 'Fast &bull; Modular',
    tagColor: 'text-[var(--coral)]',
    bgBadge: 'bg-orange-100 dark:bg-orange-950/70 border-orange-300 dark:border-orange-800 text-[var(--coral)]',
    description:
      'Bespoke Shopify theme architecture built strictly with native sections, dynamic app blocks, and clean Liquid schemas merchants can easily manage without breaking code.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4 L20 4 L26 10 L26 28 L6 28 Z" />
        <path d="M20 4 L20 10 L26 10" />
        <path d="M12 16 L10 18 L12 20" />
        <path d="M16 16 L18 18 L16 20" />
      </svg>
    ),
  },
  {
    title: 'Headless & Hydrogen',
    tag: 'Storefront GraphQL',
    annotation: 'Instant Edge',
    tagColor: 'text-[var(--cobalt)]',
    bgBadge: 'bg-blue-100 dark:bg-blue-950/70 border-blue-300 dark:border-blue-800 text-[var(--cobalt)]',
    description:
      'Next.js 16 and Shopify Hydrogen builds engineered with instant edge routing, sub-second product pages, and headless checkout integrations for high-volume catalogs.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <ellipse cx="16" cy="16" rx="13" ry="5" />
        <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" />
        <circle cx="16" cy="16" r="2.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Speed Audits & CRO',
    tag: '90+ Score Sprints',
    annotation: 'Zero Lag',
    tagColor: 'text-emerald-600 dark:text-emerald-400',
    bgBadge: 'bg-emerald-100 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400',
    description:
      'Surgical third-party script audits, asset offloading, font subsetting, and DOM flattening to take sluggish stores from 30 to 95+ on Google Mobile Lighthouse.',
    icon: <SpeedGaugeDoodle size={36} className="text-emerald-600 dark:text-emerald-400" />,
  },
  {
    title: 'Shopify Functions & APIs',
    tag: 'Rust / WASM APIs',
    annotation: 'Native Apps',
    tagColor: 'text-purple-600 dark:text-purple-400',
    bgBadge: 'bg-purple-100 dark:bg-purple-950/70 border-purple-300 dark:border-purple-800 text-purple-600 dark:text-purple-400',
    description:
      'Custom Cart Transforms, Delivery Customizations, Order Routing, and Checkout UI extensions running natively inside Shopify infrastructure with zero latency.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 6 L10 12 L22 12 L22 6" />
        <path d="M8 12 L24 12 L24 20 C24 24, 20 26, 16 26 C12 26, 8 24, 8 20 Z" />
        <line x1="16" y1="26" x2="16" y2="30" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="approach" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-block px-3.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950/70 border border-orange-300 dark:border-orange-800 text-[var(--coral)] text-xs font-bold mb-3">
          Engineered Without Compromise
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--ink)]">
          Four Specializations. Zero Juniors.
        </h2>
        <p className="text-base text-[var(--ink-muted)] mt-3">
          Direct senior engineering from architecture planning to live production launch.
        </p>
      </div>

      {/* 4-Card Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {specializations.map((spec) => (
          <div 
            key={spec.title} 
            className="doodle-box p-6 flex flex-col justify-between relative group hover:border-[var(--coral)] transition-colors"
          >
            <div>
              {/* Hand-drawn Icon Box */}
              <div className={`w-14 h-14 rounded-2xl ${spec.bgBadge} border flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                {spec.icon}
              </div>
              <h3 className="font-extrabold text-xl mb-2 text-[var(--ink)]">
                {spec.title}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed mb-6">
                {spec.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-hand)] text-xs font-extrabold flex items-center justify-between">
              <span className={spec.tagColor}>{spec.tag}</span>
              <span className="font-doodle text-base text-[var(--mustard)]">
                {spec.annotation.replace('&bull;', '•')}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
