'use client';

import { motion } from 'framer-motion';
import { Briefcase, ExternalLink, Github, Calendar, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Shopify Plus Enterprise Migration',
    description: 'Full platform migration from legacy Shopify to Plus with custom theme architecture, API integrations, and 99.99% uptime achieved.',
    tech: ['Shopify Plus', 'Liquid', 'GraphQL', 'Node.js'],
    impact: '$2M+ GMV',
    status: 'deployed',
    year: '2025',
  },
  {
    id: 2,
    title: 'Logiwa WMS Integration',
    description: 'Real-time bidirectional sync between Shopify and Logiwa warehouse management. Automated inventory, order processing, and fulfillment workflows.',
    tech: ['Logiwa API', 'REST', 'Webhooks', 'Redis'],
    impact: '40% faster fulfillment',
    status: 'active',
    year: '2025',
  },
  {
    id: 3,
    title: 'Subscription Commerce Platform',
    description: 'Custom subscription app with Recharge integration, tiered pricing, and D2C customer portal. Built with React and Shopify Hydrogen.',
    tech: ['Recharge', 'Hydrogen', 'React', 'GraphQL'],
    impact: 'MRR +40%',
    status: 'deployed',
    year: '2024',
  },
  {
    id: 4,
    title: 'Performance Optimization Audit',
    description: 'Comprehensive Core Web Vitals audit and optimization. Reduced LCP from 4.2s to 1.8s, improved FID by 65%, and boosted conversion by 28%.',
    tech: ['Lighthouse', 'Next.js', 'Image Optimization'],
    impact: '+28% conversion',
    status: 'completed',
    year: '2024',
  },
  {
    id: 5,
    title: 'Multi-Channel API Gateway',
    description: 'Unified API layer connecting Shopify, ERP, 3PL, and marketing tools. Centralized webhook management and automated retry logic.',
    tech: ['Express', 'TypeScript', 'PostgreSQL'],
    impact: 'Zero failed syncs',
    status: 'active',
    year: '2024',
  },
];

export default function PortfolioApp() {
  return (
    <div className="h-full overflow-auto bg-black">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Active Processes</h1>
            <p className="text-sm text-slate-500">Project portfolio & case studies</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-medium group-hover:text-sky-400 transition">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    project.status === 'deployed' ? 'bg-emerald-500/20 text-emerald-400' :
                    project.status === 'active' ? 'bg-sky-500/20 text-sky-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{project.description}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{project.impact}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1 justify-end">
                  <Calendar className="w-3 h-3" />
                  {project.year}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, j) => (
                  <span
                    key={j}
                    className="px-2 py-0.5 rounded bg-white/5 text-xs text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <button className="p-1.5 rounded-lg hover:bg-white/10 text-slate-500 hover:text-white transition opacity-0 group-hover:opacity-100">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 hover:text-white transition">
            <Github className="w-4 h-4" />
            GitHub
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/10 hover:text-white transition">
            <ExternalLink className="w-4 h-4" />
            LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}