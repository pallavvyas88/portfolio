'use client';

import { motion } from 'framer-motion';
import { Store, Palette, Puzzle, Cpu, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Store,
    title: 'Shopify Store Setup & Migration',
    description: 'End-to-end configuration from domain routing to payment gateways. Seamless migrations from Magento, WooCommerce, or bespoke platforms to Shopify Plus.',
    color: 'from-blue-500 to-sky-400'
  },
  {
    icon: Palette,
    title: 'Custom Theme Development',
    description: 'Bespoke Shopify OS 2.0 themes engineered from scratch. Pixel-perfect implementations of Figma/Framer designs with a focus on conversion-led UX.',
    color: 'from-fuchsia-500 to-pink-400'
  },
  {
    icon: Puzzle,
    title: 'Headless & App Integration',
    description: 'Complex ecosystem architecture. Connecting Shopify with ERPs, custom inventory systems, and bespoke React/Next.js headless storefronts.',
    color: 'from-amber-500 to-orange-400'
  },
  {
    icon: Cpu,
    title: 'Performance & Vitals Optimization',
    description: 'Technical audits and surgical refactoring. Achieving 90+ Lighthouse scores via advanced Liquid optimization, lazy-loading, and modern asset strategies.',
    color: 'from-emerald-500 to-teal-400'
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 bg-slate-900 dark:bg-black overflow-hidden text-white">
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent_60%)]" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="sticky lg:top-32 top-0"
          >
            <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full glass px-4 py-2 text-sm uppercase tracking-[0.25em] text-sky-400 font-medium">
              Expertise
            </div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Engineering <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">Excellence.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-md mb-8">
              Delivering high-performance Shopify infrastructure that scales seamlessly with your business ambitions.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 font-semibold group transition">
              Discuss your project requirements
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 relative">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative h-full rounded-[2rem] bg-slate-800/50 dark:bg-white/5 border border-slate-700/50 dark:border-white/10 p-8 hover:bg-slate-800 dark:hover:bg-white/10 transition-colors overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-full`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-900/50 dark:bg-black/50 border border-slate-700/50 dark:border-white/5 mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm mt-auto">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
