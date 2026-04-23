import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopify Developer Portfolio",
  description: "Expert Shopify developer specializing in Liquid, APIs, and custom integrations",
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
      className="h-full antialiased"
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col scroll-smooth">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
