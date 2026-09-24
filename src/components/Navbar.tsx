'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from './doodles/BrandLogo';

const navItems = [
  { name: 'Approach', href: '/#approach' },
  { name: 'Why Me', href: '/#comparison' },
  { name: 'Case Studies', href: '/#portfolio' },
  { name: 'Sprint Pricing', href: '/#pricing' },
  { name: 'Free Tools', href: '/tools', badge: 'FREE' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getHref = (href: string) => {
    if (href.startsWith('/tools')) return href;
    return pathname === '/' ? href.replace('/', '') : href;
  };

  return (
    <header className="sticky top-0 z-40 w-full pt-3 px-3 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="doodle-box px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between bg-[var(--paper)]">
          {/* Logo with Hand-Drawn Mascot */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative group-hover:scale-105 transition-transform">
              <BrandLogo className="w-9 h-9" />
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight text-[var(--ink)] leading-none">
                Pallav Vyas
              </div>
              <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[var(--ink-muted)] mt-0.5">
                Shopify Plus Architect
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 font-bold text-sm text-[var(--ink)]">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={getHref(item.href)}
                className="hover:text-[var(--coral)] transition-colors relative py-1 flex items-center gap-1.5"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-400">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action: CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={getHref('/#contact')}
              className="doodle-btn hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--coral)] text-white text-xs sm:text-sm font-extrabold hover:bg-[var(--coral-hover)]"
            >
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="doodle-btn p-2 bg-[var(--paper)] text-[var(--ink)] lg:hidden flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="doodle-box mt-3 p-5 lg:hidden bg-[var(--paper)] space-y-3"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={getHref(item.href)}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg font-bold text-sm text-[var(--ink)] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-400">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-[var(--border-hand)]">
                <Link
                  href={getHref('/#contact')}
                  onClick={() => setIsOpen(false)}
                  className="doodle-btn w-full flex items-center justify-center gap-2 py-3 bg-[var(--coral)] text-white font-extrabold text-sm"
                >
                  <span>Book a Sprint &rarr;</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
