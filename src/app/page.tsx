import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { ArrowRight, Sparkles, Wrench } from 'lucide-react';
import { WashiTape } from '@/components/doodles/WashiTape';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--ink)]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Floating Doodle Navbar */}
      <Navbar />

      {/* Floating Theme Switcher */}
      <ThemeToggle />

      {/* Main Content Sections */}
      <main className="flex-1 space-y-4">
        {/* Hero Section */}
        <Hero />

        {/* Engineering Philosophy & Skills */}
        <About />

        {/* The 4 Core Specializations */}
        <Services />

        {/* Case Studies & Proven Results */}
        <Portfolio />

        {/* Fixed-Scope Sprints */}
        <Pricing />

        {/* Free Developer Tools Callout */}
        <section id="tools" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="doodle-box p-8 sm:p-12 relative text-center bg-gradient-to-b from-[var(--paper)] to-orange-50/30 dark:to-orange-950/20">
            <WashiTape width="w-32" rotate="-rotate-2" className="-top-3 left-1/2 -translate-x-1/2" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-400 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>100% Free Developer Utilities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[var(--ink)] tracking-tight mb-4">
              Free Speed & Optimization Tools
            </h2>

            <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-2xl mx-auto mb-8 leading-relaxed">
              I built a suite of client-side developer tools to help you compress product images in WebP/AVIF, test webhook payloads, and diagnose storefront bottlenecks. No signup required.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tools/image-optimizer"
                className="doodle-btn px-6 py-3.5 bg-[var(--coral)] text-white font-extrabold text-xs sm:text-sm hover:bg-[var(--coral-hover)] flex items-center gap-2"
              >
                <span>Shopify Image Optimizer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/tools"
                className="doodle-btn px-6 py-3.5 bg-[var(--paper)] text-[var(--ink)] font-bold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Explore All Free Tools</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Project Consultation & Brief Station */}
        <Contact />
      </main>

      {/* Handcrafted Studio Footer */}
      <Footer />
    </div>
  );
}
