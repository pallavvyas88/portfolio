import Link from 'next/link';
import { toolsConfig } from '@/config/tools';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ToolsDirectoryPage() {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
          Developer <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">Tools</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
          Your Shopify store is slow because of unoptimized assets and hidden bottlenecks. 
          Use these free tools to compress images, debug workflows, and boost conversions.
        </p>
        <div className="flex justify-center gap-4 text-sm text-slate-300 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free to use
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Built for Shopify
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Secure & Private
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolsConfig.map((tool) => (
            <div 
              key={tool.id} 
              className={`relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-300 ${
                tool.isComingSoon ? 'opacity-70' : 'hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:border-sky-500/30'
              }`}
            >
              {tool.isComingSoon && (
                <div className="absolute top-4 right-4 bg-white/10 text-xs font-bold px-3 py-1 rounded-full text-slate-300">
                  Coming Soon
                </div>
              )}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 mb-6">
                <tool.icon className="w-7 h-7 text-sky-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{tool.title}</h3>
              <p className="text-slate-400 mb-8 min-h-[80px]">
                {tool.description}
              </p>
              
              {tool.isComingSoon ? (
                <button disabled className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-slate-500 font-semibold cursor-not-allowed">
                  In Development
                </button>
              ) : (
                <Link href={`/tools/${tool.slug}`} className="w-full py-3 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 transition hover:bg-sky-400 hover:text-black hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] group-hover:bg-sky-400">
                  {tool.ctaText} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof & Credibility */}
      <section className="py-12 mt-4 md:mt-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Trusted by Shopify Merchants</h2>
          <p className="text-slate-400">Join other high-performance stores optimizing their tech stack.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
            <div className="flex text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p className="text-slate-300 mb-4 text-sm">&quot;The Neural Image Engine saved us hours of manual compression. Our homepage loads 2.3s faster now.&quot;</p>
            <div className="text-white font-bold text-sm">Sarah J.</div>
            <div className="text-slate-500 text-xs">E-commerce Director</div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl">
             <div className="flex text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
            </div>
            <p className="text-slate-300 mb-4 text-sm">&quot;Finally a tool built specifically with Shopify&apos;s architecture in mind. It handles our massive catalogs flawlessly.&quot;</p>
            <div className="text-white font-bold text-sm">Mark T.</div>
            <div className="text-slate-500 text-xs">Lead Developer</div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-xl flex flex-col justify-center items-center text-center">
             <div className="w-12 h-12 bg-[#24292e] rounded-full flex items-center justify-center mb-4 border border-white/10">
               <svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" className="fill-white"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.46-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
             </div>
             <p className="text-slate-300 text-sm font-medium mb-1">Open Source & Secure</p>
             <p className="text-slate-500 text-xs">All processing runs locally in your browser. No files are ever stored on our servers.</p>
          </div>
        </div>
      </section>

      {/* Trust & CRO Lead Capture */}
      <section className="py-24 mt-12 border-t border-white/10 text-center relative overflow-hidden rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)]" />
         <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Want this level of optimization across your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">entire store?</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10">
              I help Shopify Plus brands hit 90+ Lighthouse scores, reduce bounce rates, and significantly improve their conversion rates through deep technical optimization.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
               <div className="bg-black/40 border border-white/5 p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-emerald-400 mb-2">70%</div>
                  <div className="text-sm text-slate-400 font-medium">Average Image Size Reduction</div>
               </div>
               <div className="bg-black/40 border border-white/5 p-6 rounded-2xl">
                  <div className="text-3xl font-bold text-sky-400 mb-2">40%</div>
                  <div className="text-sm text-slate-400 font-medium">Improved Load Speed</div>
               </div>
            </div>

            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)]"
            >              Let's Optimize Your Store <ArrowRight className="w-5 h-5" />
            </a>
         </div>
      </section>
    </div>
  );
}

