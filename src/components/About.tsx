'use client';

import { motion, Variants } from 'framer-motion';
import { Code, Palette, Zap, Server, Mail, Webhook, Cpu, Puzzle } from 'lucide-react';

const skills = [
  { name: 'Shopify Liquid', icon: Code, desc: 'Deep custom theme development' },
  { name: 'Storefront API', icon: Server, desc: 'Headless commerce solutions' },
  { name: 'Theme Architecture', icon: Palette, desc: 'OS 2.0 & Custom sections' },
  { name: 'App Integrations', icon: Puzzle, desc: 'Seamless third-party syncs' },
  { name: 'Webhooks & Flow', icon: Webhook, desc: 'Automated backend logic' },
  { name: 'Core Web Vitals', icon: Cpu, desc: '90+ Lighthouse optimization' },
  { name: 'Recharge / Skio', icon: Zap, desc: 'Complex subscription setups' },
  { name: 'Klaviyo / Marketing', icon: Mail, desc: 'Data-driven email flows' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-sky-100/50 dark:bg-sky-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-fuchsia-100/50 dark:bg-fuchsia-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm uppercase tracking-widest text-primary dark:text-sky-400 mb-6">
              About The Developer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-fuchsia-500">Future of E-commerce</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-300">
              <p>
                I am Pallav Vyas, a senior Shopify Developer dedicated to building high-end, scalable, and conversion-optimized e-commerce platforms. I don't just build stores; I engineer robust technical solutions that drive measurable business growth.
              </p>
              <p>
                With a deep understanding of the Shopify ecosystem—from complex Liquid architectures and Headless Storefront APIs to intricate App Integrations—I bridge the gap between stunning design and flawless backend execution.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-sky-500 pl-4">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">5+</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Years scaling Shopify brands</p>
              </div>
              <div className="border-l-2 border-fuchsia-500 pl-4">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">100%</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Commitment to code quality</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group relative bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{skill.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{skill.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
