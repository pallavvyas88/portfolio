'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const subject = params.get('subject');
      if (subject) {
        setFormData(prev => ({ ...prev, message: subject }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as any).toString(),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', project: '', message: '' });
    } catch (err) {
      setError('Unable to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-24 bg-white dark:bg-slate-950 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-sky-100 dark:bg-sky-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[800px] h-[800px] bg-fuchsia-100 dark:bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm uppercase tracking-widest text-primary dark:text-sky-400 font-medium shadow-sm">
              <Sparkles className="w-4 h-4" /> Let's Collaborate
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Ready to build <br/> your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-fuchsia-500">big launch?</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mb-10 leading-relaxed">
              Whether you need a full theme rebuild, complex backend app integration, or a performance overhaul, I'm here to engineer the perfect solution for your brand.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Response Time</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Usually within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Project Scope</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Full builds to surgical fixes</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-fuchsia-500/10 rounded-[2.5rem] blur-2xl transform -rotate-1 translate-y-4" />
            <div className="relative rounded-[2.5rem] bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 shadow-2xl p-8 sm:p-12 backdrop-blur-xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Request Sent</h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                      Thank you for reaching out. I've received your project details and will be in touch shortly to discuss next steps.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-sky-600 dark:text-sky-400 font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="hidden" name="bot-field" />

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                        <input
                          type="text" name="name" value={formData.name} onChange={handleChange} required
                          placeholder="John Doe"
                          className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-5 py-3.5 text-sm text-slate-900 dark:text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                        <input
                          type="email" name="email" value={formData.email} onChange={handleChange} required
                          placeholder="john@company.com"
                          className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-5 py-3.5 text-sm text-slate-900 dark:text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Project Type</label>
                      <select
                        name="project" value={formData.project} onChange={handleChange} required
                        className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-5 py-3.5 text-sm text-slate-900 dark:text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                      >
                        <option value="" disabled>Select a category</option>
                        <option value="store-build">New Store Build</option>
                        <option value="theme-customization">Theme Customization</option>
                        <option value="app-integration">App Integration</option>
                        <option value="performance">Performance Optimization</option>
                        <option value="other">Other / Consultation</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">Project Details</label>
                      <textarea
                        name="message" rows={5} value={formData.message} onChange={handleChange} required
                        placeholder="Tell me about your goals, timeline, and current challenges..."
                        className="w-full resize-none rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-5 py-4 text-sm text-slate-900 dark:text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400"
                      />
                    </div>

                    {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-xl">{error}</p>}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 dark:bg-sky-500 py-4 text-sm font-semibold text-white dark:text-slate-950 transition hover:bg-slate-800 dark:hover:bg-sky-400 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
