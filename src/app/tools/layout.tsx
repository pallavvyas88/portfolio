import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Developer Tools for Shopify | Pallav Vyas',
  description: 'Free developer tools for eCommerce stores. Optimize images, improve speed, and boost conversions. Built by a Shopify Plus developer.',
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-300">
      <Navbar />
      <ThemeToggle />
      <main className="flex-1 pt-24 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
