// src/utils/seo/schema.js
// Programmatic JSON-LD structured data builders.
// No internet at runtime: everything is generated from tool data.
import { getToolProcessingProfile } from '../../data/toolProcessing.js';
import { buildAbout, buildFormats, buildLimits } from './toolContent.js';
import { toolFAQs } from '../../data/toolFAQs.js';

const SITE_URL = 'https://minitools-silk.vercel.app';

// ---------------------------------------------------------------------------
// 2a. WebApplication schema (rich result for each tool)
// ---------------------------------------------------------------------------
export function webAppSchema(tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `${SITE_URL}/tools/${tool.id}`,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: 0,
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
// 2b. FAQPage schema (drives FAQ rich snippets)
// Automatically renders whenever the page actually shows FAQs. Uses
// buildFAQs() (the same source that powers the on-page FAQ block below the
// tool), so the JSON-LD always matches the content a user/Googlebot sees —
// whether the tool has hand-written FAQs (data/toolFAQs.js) or the default
// fallback set. Returns null only when there are genuinely no FAQs.
// ---------------------------------------------------------------------------
export function faqSchema(tool) {
  const faqs = buildFAQs(tool);
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
        item: `${SITE_URL}/tools/${tool.id}`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Helper to expose FAQs to legacy consumers.
// Generates accurate, tool-specific Q&As from hand-written per-tool FAQs in
// data/toolFAQs.js. If a tool has no hand-written FAQ entry, it falls back to
// a concise set of genuine questions derived from its unique editorial data
// (data/toolContentData.js) plus the honest processing disclosure.
// ---------------------------------------------------------------------------
export function buildFAQs(tool) {
  const existing = toolFAQs[tool.id];
  if (Array.isArray(existing) && existing.length) return existing;

  const profile = getToolProcessingProfile(tool);
  const faqs = [{ q: `How does ${tool.name} work?`, a: buildAbout(tool) }];
  const formats = buildFormats(tool);
  if (formats) {
    faqs.push({ q: `Which inputs and outputs does ${tool.name} support?`, a: formats });
  }
  faqs.push({ q: `Is my data safe when I use ${tool.name}?`, a: profile.disclosure });
  const limits = buildLimits(tool);
  if (limits && limits.length) {
    faqs.push({ q: `What are the limitations of ${tool.name}?`, a: limits.join(' ') });
  }
  return faqs;
}
