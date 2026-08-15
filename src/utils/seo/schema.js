// src/utils/seo/schema.js
// Programmatic JSON-LD structured data builders.
// No internet at runtime: everything is generated from tool data.
import { toolFAQs } from '../../data/toolFAQs';

const SITE_URL = 'https://minitools-silk.vercel.app';

// ---------------------------------------------------------------------------
// 2a. WebApplication schema (rich result for each tool)
// ---------------------------------------------------------------------------
export function webAppSchema(tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `${SITE_URL}/tool/${tool.id}`,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'MiniTools',
      url: SITE_URL,
    },
  };
}

// ---------------------------------------------------------------------------
// 2b. FAQPage schema (drives FAQ rich snippets; only if real FAQ exists)
// ---------------------------------------------------------------------------
export function faqSchema(tool) {
  // Only emit FAQ schema for tools with explicit FAQ entries in data/toolFAQs.js
  const faqs = toolFAQs[tool.id];
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

// ---------------------------------------------------------------------------
// 2c. BreadcrumbList schema (Home > Category > Tool)
// ---------------------------------------------------------------------------
export function breadcrumbSchema(tool, categoryName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName || tool.category,
        item: `${SITE_URL}/category/${tool.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `${SITE_URL}/tool/${tool.id}`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Helper to expose FAQs to legacy consumers. Uses data/toolFAQs.js.
// ---------------------------------------------------------------------------
export function buildFAQs(tool) {
  return toolFAQs[tool.id] || [
    { q: `What is the ${tool.name}?`, a: tool.description },
    { q: `Is the ${tool.name} free to use?`, a: 'Yes, it is 100% free with no signup required.' },
    { q: `Does the ${tool.name} work on mobile?`, a: 'Yes, it is fully responsive and works on any modern device.' },
    { q: `Is my data stored with the ${tool.name}?`, a: 'No. Everything runs locally in your browser; nothing is uploaded or stored.' },
  ];
}
