// src/components/common/SEO.jsx
// Reusable head manager using react-helmet-async.
// Render once per page/tool to set dynamic title, meta description,
// canonical URL, Open Graph + Twitter cards, and JSON-LD structured data.
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://minitools-silk.vercel.app';
const SITE_NAME = 'MiniTools';
// Placeholder OG image: add a 1200x630 public/og-default.png to replace it.
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

const DEFAULT_DESC =
  '88+ free online tools for PDF, text, image, calculators, converters, developer & fun tasks. No signup, runs 100% in your browser.';

export default function SEO({
  title = `${SITE_NAME} - 88+ Free Online Tools`,
  description = DEFAULT_DESC,
  canonical = `${SITE_URL}/`,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  twCard = 'summary_large_image',
  jsonLd = null, // object or array of JSON-LD objects
}) {
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
      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((obj, i) => (
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