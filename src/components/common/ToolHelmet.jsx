// src/components/common/ToolHelmet.jsx
// Dedicated Per-Tool <Helmet> component (react-helmet-async).
// Renders exactly one SEO head for a single tool page:
//   - Title           → keyphrase + benefit + brand
//                       (e.g. "Free Online Word Counter | MiniTools")
//   - Meta description → stable 150–160 char summary with a CTA
//   - Canonical       → the tool's exact /tools/<slug> URL
//   - Open Graph (Facebook) + Twitter card preview tags
//   - JSON-LD          → Organization/WebSite + any supplied schemas
//
// This is the RUNTIME source of truth. The static prerender pipeline
// (scripts/prerender-static.mjs) reuses the same buildToolTitle /
// buildToolDescription helpers so pre-rendered HTML is byte-identical
// (and react-helmet-async dedupes via its data-rh marker instead of
// ever emitting duplicate tags).

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { buildToolTitle, buildToolDescription, toolCanonical } from '../../utils/seo/meta';

const SITE_URL = 'https://minitools-silk.vercel.app';
const SITE_NAME = 'MiniTools';
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

function normalizeJsonLd(input) {
  if (!input) return [];
  return Array.isArray(input) ? input : [input];
}

function hasType(jsonLdArray, typeName) {
  return jsonLdArray.some((s) => s && s['@type'] === typeName);
}

export default function ToolHelmet({ tool, jsonLd = null }) {
  const title = buildToolTitle(tool);
  const description = buildToolDescription(tool);
  const canonical = toolCanonical(tool);

  const supplied = normalizeJsonLd(jsonLd);

  // Default Organization + WebSite JSON-LD (no invented social links).
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description,
  };
  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const toEmit = [...supplied];
  if (!hasType(toEmit, 'Organization')) toEmit.unshift(organization);
  if (!hasType(toEmit, 'WebSite')) toEmit.unshift(webSite);

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph (Facebook/LinkedIn/WhatsApp) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${tool.name} on MiniTools`} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
      <meta name="twitter:image:alt" content={`${tool.name} on MiniTools`} />

      {/* JSON-LD structured data */}
      {toEmit.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </Helmet>
  );
}