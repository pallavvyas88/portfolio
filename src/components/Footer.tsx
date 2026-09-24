'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import BrandLogo from './doodles/BrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 border-t-2 border-dashed border-[var(--border-hand)]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[var(--border-hand)]">
        
        {/* Brand & Bio */}
        <div className="flex items-center gap-3.5">
          <BrandLogo className="w-10 h-10 text-[var(--coral)]" />
          <div>
            <div className="font-black text-xl text-[var(--ink)] tracking-tight">
              Pallav Vyas
            </div>
            <p className="text-xs text-[var(--ink-muted)] font-medium mt-0.5 max-w-sm">
              Shopify Plus Architect specializing in zero-bloat Liquid 2.0 themes and Headless Hydrogen Next.js storefronts.
            </p>
          </div>
        </div>

        {/* Social Badges */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/pallavvyas88"
            target="_blank"
            rel="noopener noreferrer"
            className="doodle-btn p-2.5 bg-[var(--paper)] text-[var(--ink)] hover:text-[var(--coral)]"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="doodle-btn p-2.5 bg-[var(--paper)] text-[var(--ink)] hover:text-[var(--coral)]"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="doodle-btn p-2.5 bg-[var(--paper)] text-[var(--ink)] hover:text-[var(--coral)]"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="mailto:contact@pallav.dev"
            className="doodle-btn p-2.5 bg-[var(--paper)] text-[var(--ink)] hover:text-[var(--coral)]"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="doodle-btn px-3 py-2 bg-[var(--paper)] text-[var(--ink)] text-xs font-bold flex items-center gap-1 hover:text-[var(--coral)] cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Sub-footer copyright & tech tags */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-muted)]">
        <div>
          &copy; {currentYear} Pallav Vyas &bull; Engineered with Liquid, Next.js & Doodles ✏️
        </div>

        <div className="flex items-center gap-6 font-bold">
          <Link href="/tools" className="hover:text-[var(--coral)] transition-colors">
            Free Developer Tools
          </Link>
          <a href="#approach" className="hover:text-[var(--coral)] transition-colors">
            Approach
          </a>
          <a href="#pricing" className="hover:text-[var(--coral)] transition-colors">
            Sprint Pricing
          </a>
          <a href="#contact" className="hover:text-[var(--coral)] transition-colors">
            Hire Me
          </a>
        </div>
      </div>
    </footer>
  );
}
