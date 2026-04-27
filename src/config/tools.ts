import { Layers, Zap, Search } from 'lucide-react';

export type Tool = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: any; // Using any for lucide-react icon component type simplicity
  ctaText: string;
  isComingSoon?: boolean;
};

export const toolsConfig: Tool[] = [
  {
    id: 'neural-image-engine',
    slug: 'image-optimizer',
    title: 'Neural Image Engine',
    description: 'Compress & optimize images instantly without quality loss. Perfect for Shopify stores needing a speed boost.',
    icon: Layers,
    ctaText: 'Optimize Images Now',
  },
  {
    id: 'shopify-speed-audit',
    slug: 'shopify-speed-audit',
    title: 'Shopify Speed Audit',
    description: 'Deep-dive Lighthouse analysis specifically tuned for Shopify liquid themes and apps.',
    icon: Zap,
    ctaText: 'Get Store Audit',
    isComingSoon: true,
  },
  {
    id: 'webhook-debugger',
    slug: 'webhook-debugger',
    title: 'Webhook Debugger',
    description: 'Capture, inspect, and replay Shopify webhooks in real-time to test your app integrations.',
    icon: Search,
    ctaText: 'Debug Webhooks',
    isComingSoon: true,
  }
];
