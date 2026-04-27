import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 pt-20 pb-10 border-t border-slate-200 dark:border-white/10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.15),transparent_70%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center border-b border-slate-200 dark:border-white/10 pb-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">PALLAV VYAS</h3>
            <p className="mt-4 max-w-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineering high-converting, scalable Shopify experiences for modern brands. Based on cutting-edge Web Vitals optimization and clean architecture.
            </p>
          </div>
          <div className="flex md:justify-end gap-4">
            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 transition-all hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 transition-all hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 transition-all hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="/#contact" className="flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 transition-all hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <p>© {currentYear} Pallav Vyas. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
