'use client';

import React from 'react';
import { WashiTape } from './doodles/WashiTape';
import { 
  Code, 
  Palette, 
  Zap, 
  Server, 
  Mail, 
  Webhook, 
  Cpu, 
  Puzzle,
  CheckCircle2
} from 'lucide-react';

const coreTech = [
  { name: 'Shopify Liquid 2.0', icon: Code, desc: 'Bespoke custom sections & schemas' },
  { name: 'Storefront GraphQL API', icon: Server, desc: 'Headless Next.js & Hydrogen builds' },
  { name: 'Theme Architecture', icon: Palette, desc: 'Modular, zero-app codebases' },
  { name: 'Shopify Functions & Rust', icon: Puzzle, desc: 'Native cart transforms & rules' },
  { name: 'Webhooks & Flow', icon: Webhook, desc: 'Event-driven automated backend logic' },
  { name: 'Core Web Vitals', icon: Cpu, desc: '90+ Lighthouse speed optimization' },
  { name: 'Recharge & Skio', icon: Zap, desc: 'Complex subscriptions & bundle engines' },
  { name: 'Klaviyo & Analytics', icon: Mail, desc: 'Server-side tracking & events' },
];

export default function About() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Column: Philosophy Box */}
        <div className="lg:col-span-5 relative">
          <div className="doodle-box p-7 sm:p-9 relative bg-[var(--paper)]">
            <WashiTape width="w-28 sm:w-32" rotate="-rotate-2" className="-top-3 left-6" />

            <div className="pt-2">
              <span className="font-doodle text-2xl text-[var(--coral)] block font-bold mb-1">
                The Engineering Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--ink)] tracking-tight mb-4">
                Code that scales your GMV, not your app stack.
              </h2>
              <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed mb-6">
                Most agencies patch theme shortcomings by piling on $50/month apps that inject bloated scripts into your storefront.
              </p>
              <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed mb-8">
                I do the exact opposite: I build native, high-performance Liquid and Headless systems that load instantly, convert higher, and keep your maintenance costs down.
              </p>

              {/* Founder Checklist */}
              <div className="space-y-3 pt-4 border-t border-[var(--border-hand)] text-xs sm:text-sm font-bold text-[var(--ink)]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct founder collaboration on every line of code</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero junior handoffs &middot; 100% senior delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Guaranteed Core Web Vitals pass & 48hr technical audit</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tech & Toolkit Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-300 dark:border-blue-800 text-[var(--cobalt)] text-xs font-bold mb-3">
              Production Stack
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
              Mastery Across the Shopify Ecosystem
            </h3>
            <p className="text-sm text-[var(--ink-muted)] mt-1.5 max-w-lg">
              Specialized technical tools engineered to build lightning-fast storefronts and resilient eCommerce infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreTech.map((tech) => (
              <div
                key={tech.name}
                className="doodle-box-flat p-4 bg-[var(--paper)] hover:border-[var(--coral)] transition-colors flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-[var(--coral)] flex items-center justify-center shrink-0 mt-0.5">
                  <tech.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[var(--ink)]">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-[var(--ink-muted)] mt-0.5 leading-normal">
                    {tech.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
