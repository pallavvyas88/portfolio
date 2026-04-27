import { Metadata } from 'next';
import ImageOptimizerTool from './ImageOptimizerTool';

export const metadata: Metadata = {
  title: 'Shopify Image Optimizer for Faster Stores | Free Tool',
  description: 'Free Shopify image optimizer for eCommerce stores. Compress images, improve speed, and boost conversions. Built by a Shopify Plus developer.',
};

export default function ImageOptimizerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Neural Image Engine',
    operatingSystem: 'Any',
    applicationCategory: 'UtilitiesApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '128',
    },
    description: 'Free Shopify image optimizer for eCommerce stores. Compress images, improve speed, and boost conversions locally in your browser.',
    creator: {
      '@type': 'Person',
      name: 'Pallav Vyas',
      url: 'https://pallav.dev',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-7xl pt-8">
        <ImageOptimizerTool />
      </div>
    </>
  );
}
