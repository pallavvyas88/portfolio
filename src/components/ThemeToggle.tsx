'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark' || (!resolvedTheme && theme === 'dark');

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[var(--paper)] text-[var(--ink)] doodle-btn cursor-pointer"
      aria-label={isDark ? "Switch to warm paper theme" : "Switch to dark canvas theme"}
      title={isDark ? "Switch to warm paper" : "Switch to dark canvas"}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="dark"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--mustard)]" />
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-5 w-5 sm:h-6 sm:w-6 text-[var(--ink)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
