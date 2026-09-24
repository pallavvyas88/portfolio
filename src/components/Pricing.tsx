'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { WashiTape } from './doodles/WashiTape';

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="doodle-box p-8 sm:p-12 relative overflow-hidden bg-amber-50/40 dark:bg-[#111620] border-2">
        
        {/* Washi tape at top right */}
        <WashiTape width="w-28 sm:w-36" rotate="rotate-3" className="-top-3 right-8" />

        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <span className="font-doodle text-2xl text-[var(--coral)] block -rotate-1 mb-1 font-bold">
            Transparent & Scoped &bull; No Surprise Invoices
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--ink)]">
            Fixed-Scope Sprints
          </h2>
          <p className="text-sm sm:text-base text-[var(--ink-muted)] mt-2 leading-relaxed">
            Every engagement ships with a guaranteed timeline, clear deliverables, and an agreed fixed price. Send your store URL and receive an actionable technical breakdown in 48 hours.
          </p>
        </div>

        {/* Sprint Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Sprint 1: Speed Sprint */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--paper)] border-2 border-[var(--border-dark)] flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[var(--coral)] mb-2">
                1-Week Sprint
              </div>
              <h3 className="text-2xl font-black mb-2 text-[var(--ink)]">
                Speed & Core Web Vitals
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mb-5">
                Guaranteed 90+ mobile Lighthouse score pass and sub-second paint times.
              </p>
              
              <ul className="text-xs sm:text-sm space-y-2.5 mb-8 text-[var(--ink)] font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Third-party script & tag elimination</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Liquid asset bottleneck removal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Mobile LCP, INP & CLS remediation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Comprehensive before/after audit report</span>
                </li>
              </ul>
            </div>

            <a 
              href="#contact" 
              className="doodle-btn py-3 px-4 text-center bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-extrabold text-[var(--ink)] hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2"
            >
              <span>Request Speed Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Sprint 2: Custom Theme (Featured) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--paper)] border-[3px] border-[var(--coral)] flex flex-col justify-between shadow-md relative">
            <div className="absolute -top-3.5 right-6 bg-[var(--coral)] text-white text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[var(--coral)] mb-2">
                4–6 Week Build
              </div>
              <h3 className="text-2xl font-black mb-2 text-[var(--ink)]">
                Custom Liquid OS 2.0
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mb-5">
                Full bespoke high-converting store re-architecture tailored to your brand.
              </p>
              
              <ul className="text-xs sm:text-sm space-y-2.5 mb-8 text-[var(--ink)] font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--coral)] shrink-0" />
                  <span>Custom sections & modular blocks library</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--coral)] shrink-0" />
                  <span>Zero-app cart slideout & upsell engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--coral)] shrink-0" />
                  <span>Sub-second page transitions & instant search</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--coral)] shrink-0" />
                  <span>100% WCAG 2.2 AA accessibility pass</span>
                </li>
              </ul>
            </div>

            <a 
              href="#contact" 
              className="doodle-btn py-3 px-4 text-center bg-[var(--coral)] text-white text-xs sm:text-sm font-black hover:bg-[var(--coral-hover)] flex items-center justify-center gap-2"
            >
              <span>Book Custom Build</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Sprint 3: Headless Hydrogen */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--paper)] border-2 border-[var(--border-dark)] flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[var(--cobalt)] mb-2">
                Enterprise Sprint
              </div>
              <h3 className="text-2xl font-black mb-2 text-[var(--ink)]">
                Headless Hydrogen
              </h3>
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mb-5">
                Next.js 16 storefronts for multi-market, high-traffic, or omnichannel brands.
              </p>
              
              <ul className="text-xs sm:text-sm space-y-2.5 mb-8 text-[var(--ink)] font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--cobalt)] shrink-0" />
                  <span>Edge caching & Storefront GraphQL</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--cobalt)] shrink-0" />
                  <span>Sub-second global page loads worldwide</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--cobalt)] shrink-0" />
                  <span>Bespoke checkout customization & ERP sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--cobalt)] shrink-0" />
                  <span>Dedicated staging CI/CD & preview URLs</span>
                </li>
              </ul>
            </div>

            <a 
              href="#contact" 
              className="doodle-btn py-3 px-4 text-center bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm font-extrabold text-[var(--ink)] hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2"
            >
              <span>Discuss Architecture</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
