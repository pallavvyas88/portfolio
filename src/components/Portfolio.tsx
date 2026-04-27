'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import React, { useRef } from 'react';

const projects = [
  {
    title: 'E-commerce Store Redesign',
    description: 'Complete custom Shopify theme refresh lifting conversion rates by 24% and average order value via optimized UX patterns.',
    tech: ['Shopify Liquid', 'JavaScript', 'SCSS', 'Storefront API'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Complex Subscription Flow',
    description: 'Deep Recharge integration with tailored subscription logic, robust dunning management, and seamless checkout reliability.',
    tech: ['Recharge API', 'Node.js', 'Klaviyo', 'Webhooks'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Performance & Image Strategy',
    description: 'Enterprise site speed optimization, lazy-loading strategies, and Core Web Vitals boosts driving direct revenue growth.',
    tech: ['Web Vitals', 'CDN', 'Image Optimization', 'Framer Motion'],
    liveLink: '#',
    githubLink: '#',
  },
  {
    title: 'Private App Integration',
    description: 'Custom internal Shopify application for real-time inventory synchronization and headless storefront data automation.',
    tech: ['Shopify Admin API', 'Node.js', 'MongoDB', 'Express'],
    liveLink: '#',
    githubLink: '#',
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for smooth return
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (-5 to 5 degrees)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct * 10);
    y.set(yPct * -10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, type: "spring", bounce: 0.4 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative h-full w-full perspective-1000"
    >
      <div 
        className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-sky-400/20 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ transform: "translateZ(-20px)" }}
      />
      <div 
        className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 p-8 shadow-xl backdrop-blur-sm transition-colors duration-500 group-hover:border-sky-500/50"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl transition-all duration-500 group-hover:bg-sky-500/20" />
        
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Featured Case
          </div>
          <ArrowUpRight className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky-500" />
        </div>

        <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white" style={{ transform: "translateZ(30px)" }}>
          {project.title}
        </h3>
        
        <p className="mb-8 text-slate-600 dark:text-slate-400 leading-relaxed" style={{ transform: "translateZ(20px)" }}>
          {project.description}
        </p>

        <div className="mt-auto space-y-6" style={{ transform: "translateZ(40px)" }}>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-md bg-slate-100 dark:bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <a
              href={project.liveLink}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-950 transition-all hover:scale-105"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
            <a
              href={project.githubLink}
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-100 dark:hover:bg-white/10 hover:scale-105"
            >
              <Github className="h-4 w-4" />
              Source
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-20 md:py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Abstract Backgrounds */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-slate-50 dark:from-slate-900 to-transparent" />
      <div className="pointer-events-none absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.05)_0%,transparent_70%)] blur-3xl" />
      
      <div className="container relative mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full glass px-4 py-2 text-sm uppercase tracking-[0.25em] text-primary dark:text-sky-400 font-medium">
            Portfolio Highlights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl max-w-4xl mx-auto">
            High-Performance <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-fuchsia-500">Shopify Experiences.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Case studies demonstrating meticulous theme craftsmanship, complex subscription logic, and performance-first headless launches.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 perspective-1000">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
