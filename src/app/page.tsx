import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <ThemeToggle />
      <Hero />
      <About />
      <Portfolio />
      
      {/* Tools Directory Teaser Section */}
      <section id="tools" className="py-16 md:py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0%,transparent_100%)] pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-5 py-2 text-sm font-medium tracking-widest text-sky-600 dark:text-sky-400 mb-6">
            <Layers className="h-4 w-4" />
            Developer Tools
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Free Tools for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-600 dark:from-sky-400 dark:to-purple-500">Shopify Developers</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
            I built a suite of free tools to help you optimize images, debug webhooks, and audit your Shopify store&apos;s performance. 
          </p>
          <Link 
            href="/tools" 
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black px-8 py-4 font-bold transition hover:bg-sky-500 hover:text-white dark:hover:bg-sky-400 dark:hover:text-black hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          >
            Explore All Tools <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
