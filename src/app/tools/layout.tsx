import { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Free Shopify Developer Tools | Pallav Vyas',
  description: 'Free developer tools for eCommerce stores. Optimize images, improve speed, and boost conversions. Built by a Shopify Plus developer.',
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--ink)] transition-colors duration-300">
      <AnnouncementBar />
      <Navbar />
      <ThemeToggle />
      <main className="flex-1 py-10 sm:py-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
