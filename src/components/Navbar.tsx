'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Tools', href: '#tools' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-black/80 to-transparent border-transparent'
      }`}
    >
      {scrolled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-96 h-24 bg-sky-500/20 blur-3xl rounded-full" />
          <div className="absolute -top-24 right-1/4 w-96 h-24 bg-fuchsia-500/20 blur-3xl rounded-full" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      <div className="container relative z-10 mx-auto flex items-center justify-between px-6 py-5">
        
          
        <a href="#hero" className="relative group flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white/5 border border-white/10 p-1.5 transition-all group-hover:border-sky-500/50 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <img 
              src="/PV-DARK-final.svg" 
              alt="Pallav Vyas Logo" 
              className="h-full w-full object-contain"
            />
          </div>
        </a>

        <a href="#hero" className="text-xl font-black tracking-widest text-white uppercase group flex items-center gap-1">
          PALLAV<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500 group-hover:opacity-80 transition-opacity">.DEV</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white relative group"
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-fuchsia-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2.5 text-sm font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] ml-4 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Hire Me
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-lg font-medium text-slate-300 transition hover:text-sky-400"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-5 py-4 text-base font-bold text-white transition hover:opacity-90"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
