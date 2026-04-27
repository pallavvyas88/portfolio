'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Send, Mail, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const contactMethods = [
  { icon: Mail, label: 'Email', value: 'pallav@vyas.dev', desc: 'Best for project details' },
  { icon: MessageSquare, label: 'Discord', value: 'pallav_vyas', desc: 'Quick chat' },
  { icon: Clock, label: 'Calendar', value: 'Book a call', desc: '30 min strategy session' },
];

export default function CommLinkApp() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    // Simulate sending
    await new Promise(r => setTimeout(r, 1500));
    setFormState('sent');
  };

  return (
    <div className="h-full overflow-auto bg-black">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Radio className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Comm Link</h1>
            <p className="text-sm text-slate-500">Establish connection</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Contact Methods */}
        <div>
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
            Direct Channels
          </h3>
          <div className="space-y-2">
            {contactMethods.map((method, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <method.icon className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white font-medium">{method.label}</div>
                  <div className="text-xs text-slate-500">{method.desc}</div>
                </div>
                <span className="text-sm text-sky-400">{method.value}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
            Transmission Form
          </h3>
          
          {formState === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center"
            >
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <p className="text-white font-medium mb-1">Transmission Complete</p>
              <p className="text-sm text-slate-400">I'll respond within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-sky-500/50"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-sky-500/50"
                  required
                />
              </div>
              <textarea
                placeholder="Message payload..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-sky-500/50 resize-none"
                required
              />
              <button
                type="submit"
                disabled={formState === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 font-mono hover:bg-sky-500/30 transition disabled:opacity-50"
              >
                {formState === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-sky-400/30 border-t-sky-400 rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Transmission</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Response Time */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
              <span className="text-lg">⏱</span>
            </div>
            <div>
              <div className="text-sm text-white font-medium">Avg. Response Time</div>
              <div className="text-xs text-slate-500">Within 24 hours</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}