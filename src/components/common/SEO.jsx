// src/components/common/SEO.jsx
// Reusable head manager using react-helmet-async.
// Render once per page/tool to set dynamic title, meta description,
// canonical URL, Open Graph + Twitter cards, and JSON-LD structured data.
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { tools } from '../../data/toolsData';

const SITE_URL = 'https://minitools-silk.vercel.app';
const SITE_NAME = 'MiniTools';
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

const DEFAULT_DESC =
  `${tools.length}+ free online tools for PDF, text, image, calculators, converters, developer & fun tasks. Browser-based utilities with backend support for video downloads.`;

function normalizeJsonLd(input) {
  if (!input) return [];
  return Array.isArray(input) ? input : [input];
}

function hasType(jsonLdArray, typeName) {
  return jsonLdArray.some((s) => s && s['@type'] === typeName);
}

export default function SEO({
  title = `${SITE_NAME}: ${tools.length}+ Free Online Tools | PDF, Text & Image`,
  description = DEFAULT_DESC,
  canonical = `${SITE_URL}/`,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  twCard = 'summary_large_image',
  jsonLd = null, // object or array of JSON-LD objects
}) {
  const supplied = normalizeJsonLd(jsonLd);

  // Default Organization and WebSite JSON-LD (do not invent social links)
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

      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

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
