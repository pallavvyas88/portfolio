import Link from 'next/link';
import { toolsConfig } from '@/config/tools';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { WashiTape } from '@/components/doodles/WashiTape';
import { DoodleSquiggle } from '@/components/doodles/DoodleSquiggle';

export default function ToolsDirectoryPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-16 relative">
        <span className="font-doodle text-2xl text-[var(--coral)] block -rotate-1 font-bold mb-2">
          Engineered for Performance &bull; Zero Server Uploads
        </span>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 text-[var(--ink)] relative inline-block">
          Shopify Developer Tools
          <DoodleSquiggle color="var(--coral)" className="-bottom-2.5 left-0 w-full" />
        </h1>
        <p className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mx-auto mb-8 leading-relaxed">
          High-performance stores shouldn&apos;t be bogged down by uncompressed assets or hidden bottlenecks. Use these free in-browser utilities to compress images, audit scripts, and boost conversions.
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[var(--ink)] font-bold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free to use
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Built for Shopify Plus
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Local In-Browser Processing
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-8 sm:py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolsConfig.map((tool, idx) => (
            <div 
              key={tool.id} 
              className={`doodle-box p-7 sm:p-8 flex flex-col justify-between relative group bg-[var(--paper)] ${
                tool.isComingSoon ? 'opacity-70' : 'hover:border-[var(--coral)]'
              }`}
            >
              {idx === 0 && (
                <WashiTape width="w-24 sm:w-28" rotate="-rotate-2" className="-top-3 right-6" />
              )}

              {tool.isComingSoon && (
                <div className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-800 text-xs font-black px-3 py-1 rounded-full text-[var(--ink-muted)] border border-[var(--border-hand)]">
                  In Development
                </div>
              )}

              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/60 border border-orange-300 dark:border-orange-800 flex items-center justify-center text-[var(--coral)] mb-5 group-hover:scale-105 transition-transform">
                  <tool.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-[var(--ink)] mb-2.5">{tool.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] mb-8 min-h-[70px] leading-relaxed">
                  {tool.description}
                </p>
              </div>
              
              {tool.isComingSoon ? (
                <button disabled className="w-full py-3 rounded-xl border-2 border-[var(--border-hand)] bg-slate-100 dark:bg-slate-800 text-[var(--ink-muted)] text-xs font-bold cursor-not-allowed">
                  Coming Soon
                </button>
              ) : (
                <Link 
                  href={`/tools/${tool.slug}`} 
                  className="w-full doodle-btn py-3.5 bg-[var(--coral)] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 hover:bg-[var(--coral-hover)] transition-colors"
                >
                  <span>{tool.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof & Credibility */}
      <section className="py-12 sm:py-16">
        <div className="text-center mb-10">
          <span className="font-doodle text-xl text-[var(--coral)] block font-bold">
            Real Merchant Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
            Trusted by Shopify Merchants & Engineers
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1.5">
            Local browser processing &bull; Zero analytics bloat &bull; Instant optimization
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="doodle-box p-6 bg-[var(--paper)]">
            <div className="flex text-amber-400 mb-3 text-lg">
              ★★★★★
            </div>
            <p className="text-[var(--ink)] mb-4 text-xs sm:text-sm leading-relaxed font-medium">
              &quot;The client-side WebP compression cut our catalog imagery by 68%. Our mobile PDPs now load under a second.&quot;
            </p>
            <div className="text-[var(--ink)] font-extrabold text-xs">Sarah J.</div>
            <div className="text-[var(--ink-muted)] text-[11px]">E-commerce Director &bull; Apparel</div>
          </div>
          
          <div className="doodle-box p-6 bg-[var(--paper)]">
             <div className="flex text-amber-400 mb-3 text-lg">
              ★★★★★
            </div>
            <p className="text-[var(--ink)] mb-4 text-xs sm:text-sm leading-relaxed font-medium">
              &quot;Finally a tool that respects file privacy without uploading product launch assets to external cloud servers.&quot;
            </p>
            <div className="text-[var(--ink)] font-extrabold text-xs">Mark T.</div>
            <div className="text-[var(--ink-muted)] text-[11px]">Shopify Plus Lead Developer</div>
          </div>
          
          <div className="doodle-box p-6 bg-[var(--paper)] flex flex-col justify-between">
             <div>
               <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-400 rounded-xl flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-400 font-black">
                 🔒
               </div>
               <p className="text-[var(--ink)] text-sm font-extrabold mb-1">100% Client-Side</p>
               <p className="text-[var(--ink-muted)] text-xs leading-relaxed">
                 All compression happens in your browser WebAssembly sandbox. No cookies, no server storage, zero data retention.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Trust & CRO Lead Capture */}
      <section className="py-16 sm:py-20 mt-8 mb-12">
        <div className="doodle-box p-8 sm:p-14 relative text-center bg-amber-50/40 dark:bg-[#111620]">
          <WashiTape width="w-32" rotate="-rotate-2" className="-top-3 left-1/2 -translate-x-1/2" />

          <div className="max-w-2xl mx-auto">
            <span className="font-doodle text-2xl text-[var(--coral)] block font-bold mb-1">
              Need End-To-End Store Optimization?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--ink)] mb-4">
              Get a Surgical Speed & Architecture Audit
            </h2>
            <p className="text-sm sm:text-base text-[var(--ink-muted)] mb-8 leading-relaxed">
              I audit Shopify Plus codebases, eliminate bloat apps, and guarantee 90+ mobile Core Web Vitals with fixed-scope sprints.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8 text-left">
              <div className="p-4 rounded-xl border-2 border-[var(--border-dark)] bg-[var(--paper)]">
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">70%</div>
                <div className="text-xs text-[var(--ink-muted)] font-bold">Average Payload Drop</div>
              </div>
              <div className="p-4 rounded-xl border-2 border-[var(--border-dark)] bg-[var(--paper)]">
                <div className="text-2xl font-black text-[var(--coral)]">0.7s</div>
                <div className="text-xs text-[var(--ink-muted)] font-bold">Target Mobile LCP</div>
              </div>
            </div>

            <Link
              href="/#contact"
              className="doodle-btn inline-flex items-center gap-2 bg-[var(--coral)] text-white px-8 py-4 font-black text-sm uppercase tracking-wider hover:bg-[var(--coral-hover)]"
            >
              <span>Book Store Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
