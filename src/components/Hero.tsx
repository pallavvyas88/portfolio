'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Rocket, ShoppingCart, Zap } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} id="hero" className="relative min-h-[100vh] overflow-hidden flex items-center pt-20 pb-16 md:pt-24 bg-[#030303]">
      {/* Dynamic Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <motion.div
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20, mass: 1 }}
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-sky-500/10 to-fuchsia-500/10 blur-[120px] pointer-events-none hidden md:block"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div style={{ y: y1, opacity }} className="relative z-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2.5 text-sm font-medium tracking-widest text-white shadow-xl">
                <Sparkles className="h-4 w-4 text-fuchsia-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-fuchsia-400">
                  Shopify Plus Expert
                </span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white mb-6"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-fuchsia-500">Pallav Vyas.</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="text-2xl sm:text-3xl font-light text-slate-300 mb-8"
            >
              I architect high-converting, scalable e-commerce experiences.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="max-w-xl text-lg leading-relaxed text-slate-400 mb-10"
            >
              Transforming complex technical requirements into flawless, lightning-fast Shopify storefronts. Specializing in Headless commerce, Liquid optimizations, and tailored App integrations.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-5"
            >
              <a href="#portfolio" className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Explore Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
              <a href="#tools" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105">
                View My Tools
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8"
            >
              {[
                { value: '5+', label: 'Years Exp' },
                { value: '50+', label: 'Stores Built' },
                { value: '$2M+', label: 'Rev Gen' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-sm text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ y: y2, opacity }} className="relative z-10 hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, rotateX: 20, rotateY: -10, scale: 0.9 }}
              animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.3, type: "spring", stiffness: 40 }}
              className="relative w-full aspect-[4/5] perspective-1000"
            >
              {/* Floating 3D Elements */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-sky-500/20 via-transparent to-fuchsia-500/20 blur-3xl" />
              
              <div className="absolute inset-4 rounded-[2rem] bg-[#0c0c0e] border border-white/10 shadow-2xl overflow-hidden flex flex-col p-6 backdrop-blur-3xl">
                {/* Mock Code Interface */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-4 text-xs font-mono text-slate-500">storefront.liquid</span>
                </div>

                <div className="flex-1 relative space-y-6">
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 bg-slate-700 rounded w-3/4" />
                      <div className="h-2.5 bg-slate-800 rounded w-1/2" />
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [5, -5, 5] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4 ml-6"
                  >
                    <div className="w-12 h-12 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 bg-slate-700 rounded w-full" />
                      <div className="h-2.5 bg-slate-800 rounded w-2/3" />
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [-3, 3, -3] }} 
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 bg-slate-700 rounded w-5/6" />
                      <div className="h-2.5 bg-slate-800 rounded w-4/6" />
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-auto">
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                      className="h-full bg-gradient-to-r from-sky-500 to-fuchsia-500"
                    />
                  </div>
                  <p className="text-center text-xs text-slate-500 font-mono mt-3">Compiling assets...</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
