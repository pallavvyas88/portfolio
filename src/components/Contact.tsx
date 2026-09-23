'use client';

import React, { useState } from 'react';
import { CheckCircle, ArrowRight, ShieldCheck, Clock, UserCheck } from 'lucide-react';
import { WashiTape } from './doodles/WashiTape';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeUrl: '',
    projectTypes: ['Custom Theme Build'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleProjectType = (type: string) => {
    setFormData((prev) => {
      const exists = prev.projectTypes.includes(type);
      return {
        ...prev,
        projectTypes: exists
          ? prev.projectTypes.filter((t) => t !== type)
          : [...prev.projectTypes, type],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create body for netlify/form submission or mock
      const formParams = new URLSearchParams();
      formParams.append('name', formData.name);
      formParams.append('email', formData.email);
      formParams.append('storeUrl', formData.storeUrl);
      formParams.append('projectTypes', formData.projectTypes.join(', '));
      formParams.append('message', formData.message);

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formParams.toString(),
      }).catch(() => {});

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectOptions = [
    'Speed & CWV Sprint',
    'Custom Theme Build',
    'Headless Hydrogen',
    'Custom App / Function',
  ];

  return (
    <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="doodle-box p-6 sm:p-12 relative bg-[var(--paper)]">
        
        {/* Washi tape at top center */}
        <WashiTape width="w-32 sm:w-40" rotate="-rotate-1" className="-top-3 left-1/2 -translate-x-1/2" />

        <div className="text-center max-w-lg mx-auto mb-8 sm:mb-10 pt-2">
          <span className="font-doodle text-2xl text-[var(--coral)] block font-bold">
            Let&apos;s Build Something Unstoppable
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-tight mt-1">
            Send Your Store Brief
          </h2>
          <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-2 leading-relaxed">
            Reviewed personally by Pallav. You will receive an actionable 3-point technical audit and guaranteed quote within 48 hours.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400">
            <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-300 mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-200 mb-2">
              Brief Received!
            </h3>
            <p className="text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto mb-6">
              Thank you for reaching out. I am analyzing your store details and will send a personalized technical breakdown to <strong>{formData.email || 'your email'}</strong> within 48 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  storeUrl: '',
                  projectTypes: ['Custom Theme Build'],
                  message: '',
                });
              }}
              className="doodle-btn px-6 py-2.5 bg-[var(--paper)] text-[var(--ink)] text-xs font-bold hover:bg-slate-50"
            >
              Send Another Brief
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[var(--ink)] mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sarah Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border-dark)] bg-transparent text-sm font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--coral)] transition-colors placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[var(--ink)] mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@brand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border-dark)] bg-transparent text-sm font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--coral)] transition-colors placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[var(--ink)] mb-1.5">
                Store URL or Current Platform
              </label>
              <input
                type="text"
                placeholder="yourbrand.com or Shopify / WooCommerce"
                value={formData.storeUrl}
                onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border-dark)] bg-transparent text-sm font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--coral)] transition-colors placeholder:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[var(--ink)] mb-2">
                What are you looking to achieve?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-[var(--ink)]">
                {projectOptions.map((opt) => {
                  const isChecked = formData.projectTypes.includes(opt);
                  return (
                    <label
                      key={opt}
                      onClick={() => toggleProjectType(opt)}
                      className={`p-3 rounded-xl border-2 cursor-pointer flex items-center gap-2.5 transition-colors select-none ${
                        isChecked
                          ? 'border-[var(--coral)] bg-orange-50/70 dark:bg-orange-950/40 text-[var(--coral)]'
                          : 'border-[var(--border-hand)] bg-[var(--paper)] hover:border-[var(--border-dark)]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="accent-[var(--coral)] h-4 w-4"
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-[var(--ink)] mb-1.5">
                Brief Details / Target Goals
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your timeline, revenue goals, and any specific hurdles..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border-dark)] bg-transparent text-sm font-medium text-[var(--ink)] focus:outline-none focus:border-[var(--coral)] transition-colors resize-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full doodle-btn py-4 bg-[var(--coral)] text-white font-black text-sm uppercase tracking-wider hover:bg-[var(--coral-hover)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <span>{isSubmitting ? 'Sending Brief...' : 'Send Brief • Get 48hr Proposal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Direct Guarantees */}
            <div className="pt-4 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs text-[var(--ink-muted)] font-bold">
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span>48hr Review</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-[var(--coral)]" />
                <span>Direct Founder Access</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--cobalt)]" />
                <span>Fixed-Price Lock</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
