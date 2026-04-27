'use client';

import { motion } from 'framer-motion';
import { Terminal, Zap, Server, Database, Code2, ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const stats = [
  { label: 'Projects Deployed', value: '50+', icon: Server },
  { label: 'Revenue Impact', value: '$10M+', icon: Zap },
  { label: 'Uptime Achieved', value: '99.9%', icon: Terminal },
  { label: 'API Integrations', value: '200+', icon: Database },
];

const skills = [
  { category: 'Core', items: ['Shopify Plus', 'Liquid', 'Hydrogen', 'Remix'] },
  { category: 'Backend', items: ['Logiwa WMS', 'Recharge', 'Realtime', 'GraphQL'] },
  { category: 'Tools', items: ['Node.js', 'React', 'TypeScript', 'AWS'] },
];

const projects = [
  { name: 'Shopify Plus Migration', status: 'deployed', complexity: 'High', impact: '$2M GMV' },
  { name: 'Logiwa WMS Integration', status: 'active', complexity: 'High', impact: 'Real-time sync' },
  { name: 'Subscription App Build', status: 'deployed', complexity: 'Medium', impact: 'MRR +40%' },
  { name: 'API Performance Audit', status: 'completed', complexity: 'Low', impact: '-340ms latency' },
];

export default function SystemApp() {
  return (
    <div className="h-full overflow-auto bg-black">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Pallav Vyas</h1>
            <p className="text-sm text-sky-400">Shopify Plus Developer × Systems Architect</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Whoami Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sky-600 font-mono">$</span>
            <span className="text-slate-500 text-sm font-mono">whoami</span>
          </div>
          <p className="text-slate-300 pl-4 leading-relaxed">
            Building high-performance e-commerce ecosystems. Specializing in Shopify Plus 
            architecture, Logiwa WMS integration, and custom API automation that drives 
            real business results.
          </p>
        </div>

        {/* Stats Grid */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sky-600 font-mono">$</span>
            <span className="text-slate-500 text-sm font-mono">cat stats.json</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pl-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="w-3 h-3 text-slate-500" />
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sky-600 font-mono">$</span>
            <span className="text-slate-500 text-sm font-mono">cat skills.txt</span>
          </div>
          <div className="space-y-3 pl-4">
            {skills.map((skill, i) => (
              <div key={i}>
                <div className="text-xs text-slate-500 mb-1">{skill.category}</div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-2 py-0.5 rounded bg-white/10 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sky-600 font-mono">$</span>
            <span className="text-slate-500 text-sm font-mono">ls -la /projects</span>
          </div>
          <div className="space-y-1 pl-4">
            {projects.map((project, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${
                    project.status === 'deployed' ? 'bg-emerald-500' :
                    project.status === 'active' ? 'bg-sky-500 animate-pulse' :
                    project.status === 'completed' ? 'bg-slate-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm text-slate-300 group-hover:text-white transition">
                    {project.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{project.complexity}</span>
                  <span className="text-sky-400">{project.impact}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}