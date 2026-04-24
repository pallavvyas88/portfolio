import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopify Developer Portfolio",
  description: "Expert Shopify developer specializing in Liquid, APIs, and custom integrations",
  icons: {
    icon: "/PV-DARK-final.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="relative h-full antialiased"
    >
      <body suppressHydrationWarning className="relative min-h-full flex flex-col scroll-smooth">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
