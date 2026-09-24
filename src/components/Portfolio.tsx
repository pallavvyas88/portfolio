'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WashiTape } from './doodles/WashiTape';
import { DoodleSquiggle } from './doodles/DoodleSquiggle';

const caseStudies = [
  {
    title: 'LHUNE: Custom Fine Jewelry',
    badge: 'Custom Architecture',
    metric: 'Web Crypto API',
    metricBg: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-400',
    description:
      'Engineered a multi-step custom jewelry builder with guided customization paths. Built a custom web-font system and integrated Google Ads Enhanced Conversions using client-side SHA-256 hashing.',
    tech: ['Shopify Liquid', 'Web Crypto API', 'Google Ads API', 'Scoped CSS/JS'],
    washiRotate: '-rotate-2',
    link: '#contact',
  },
  {
    title: 'Anya: Postpartum Subscriptions',
    badge: 'Subscriptions',
    metric: 'Recharge & Firebase',
    metricBg: 'bg-blue-100 dark:bg-blue-950/80 text-[var(--cobalt)] border-blue-400',
    description:
      'Built a custom Shopify theme with Recharge and Firebase-driven workflows. Migrated a legacy box-customizer into an Affinity customer portal and automated Node.js/Airtable onboarding flows.',
    tech: ['Recharge API', 'Firebase', 'Node.js', 'Airtable'],
    washiRotate: 'rotate-2',
    link: '#contact',
  },
  {
    title: 'Ring Concierge: Luxury E-Commerce',
    badge: 'Performance & Vitals',
    metric: 'REST API Filtering',
    metricBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-400',
    description:
      'Customized a premium Shopify theme with bespoke product configuration for a 15+ person team. Built dynamic Liquid components and resolved Core Web Vitals issues, improving mobile load time.',
    tech: ['Core Web Vitals', 'Shopify REST API', 'Liquid Sections', 'Figma-to-Code'],
    washiRotate: '-rotate-1',
    link: '#contact',
  },
  {
    title: 'Linkites Commerce Engines',
    badge: 'B2B & Automations',
    metric: 'Real-Time Sync',
    metricBg: 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-400',
    description:
      'Engineered production Shopify themes and Firebase-backed backend features (Auth, Firestore, Cloud Functions). Wrote Node.js scripts to sync inventory and automate data flows securely.',
    tech: ['Firebase Functions', 'Firestore', 'Node.js Scripts', 'Webhooks'],
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
