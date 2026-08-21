// scripts/prerender-static.mjs
// Static SEO — pre-rendering for the Vite SPA.
// Runs AFTER `vite build`: reads the COMPILED dist/index.html (which carries the
// hashed /assets/* references) and writes sibling dist/tools/<slug>/index.html
// and dist/category/<slug>/index.html with fully rendered static <head> + <body>.
// Head tags are marked `data-rh="true"` so react-helmet-async reuses them and
// never creates duplicate canonical / title / JSON-LD at runtime.
//
// Run:  node scripts/prerender-static.mjs   (or the "prerender" npm script)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tools, categories } from '../src/data/toolsData.js';
import { webAppSchema, breadcrumbSchema, faqSchema, buildFAQs } from '../src/utils/seo/schema.js';
import { buildToolTitle, buildToolDescription } from '../src/utils/seo/meta.js';
import { buildHowToSteps, buildFeatures, isBackendTool } from '../src/utils/seo/toolContent.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SITE_URL = 'https://minitools-silk.vercel.app';
const OG_IMAGE = `${SITE_URL}/og-default.png`;

const DEFAULT_DESC =
  `${tools.length}+ free online tools for PDF, text, image, calculators, converters, developer & fun tools. Browser utilities with third-party API support for currency, QR images, and video downloads.`;

const htmlEscape = (str) =>
  String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Match the exact JSON-LD ordering React's SEO component emits: [Org, WebSite, ...supplied].
function buildJsonLd(description, extra = []) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MiniTools',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    description,
  };
  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MiniTools',
    url: SITE_URL,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  const out = [...extra];
  if (!out.some((s) => s?.['@type'] === 'Organization')) out.unshift(organization);
  if (!out.some((s) => s?.['@type'] === 'WebSite')) out.unshift(webSite);
  return out;
}

function buildHead({ title, description, canonical, ogType = 'website', ogImageAlt = 'MiniTools', jsonLd }) {
  const p = [];
  const push = (s) => p.push(s);
  push(`<title data-rh="true">${htmlEscape(title)}</title>`);
  push(`<meta name="description" data-rh="true" content="${htmlEscape(description)}" />`);
  push(`<meta name="robots" data-rh="true" content="index, follow" />`);
  push(`<link rel="canonical" data-rh="true" href="${htmlEscape(canonical)}" />`);
  push(`<meta property="og:type" data-rh="true" content="${ogType}" />`);
  push(`<meta property="og:site_name" data-rh="true" content="MiniTools" />`);
  push(`<meta property="og:title" data-rh="true" content="${htmlEscape(title)}" />`);
  push(`<meta property="og:description" data-rh="true" content="${htmlEscape(description)}" />`);
  push(`<meta property="og:url" data-rh="true" content="${htmlEscape(canonical)}" />`);
  push(`<meta property="og:image" data-rh="true" content="${OG_IMAGE}" />`);
  push(`<meta property="og:image:width" data-rh="true" content="1200" />`);
  push(`<meta property="og:image:height" data-rh="true" content="630" />`);
  push(`<meta property="og:image:alt" data-rh="true" content="${htmlEscape(ogImageAlt)}" />`);
  push(`<meta name="twitter:card" data-rh="true" content="summary_large_image" />`);
  push(`<meta name="twitter:title" data-rh="true" content="${htmlEscape(title)}" />`);
  push(`<meta name="twitter:description" data-rh="true" content="${htmlEscape(description)}" />`);
  push(`<meta name="twitter:image" data-rh="true" content="${OG_IMAGE}" />`);
  for (const obj of jsonLd) {
    push(`<script type="application/ld+json" data-rh="true">${JSON.stringify(obj)}</script>`);
  }
  return p.join('\n    ');
}

// --- Static body (no-JS fallback; replaced by React on hydration) -----------

function toolBody(tool) {
  const faqs = buildFAQs(tool);
  const steps = buildHowToSteps(tool);
  const features = buildFeatures(tool);
  const related = tools.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 8);
  const name = htmlEscape(tool.name);
  const desc = htmlEscape(tool.description);
  const descLower = htmlEscape(tool.description.toLowerCase());
  const rows = [];
  rows.push(`<h1>${name}</h1>`);
  rows.push(`<p>${desc}</p>`);
  rows.push(`<h2>Free ${name} Online — No Signup, No Limits</h2>`);
  rows.push(
    isBackendTool(tool)
      ? `<p>The ${name} lets you ${descLower}. The video URL is processed by the configured downloader backend, which fetches available formats and performs conversion.</p>`
      : `<p>The ${name} lets you ${descLower}. It runs in your browser as a fast, free utility with no signup or installation, so local input stays on your device.</p>`
  );
  // How to Use — <h2> + <ol>
  rows.push(`<h2>How to Use the ${name}</h2>`);
  rows.push(`<p>Using the ${name} takes just a few seconds. Follow these simple steps to get an accurate, free result every time.</p>`);
  rows.push('<ol>');
  for (const s of steps) rows.push(`  <li>${htmlEscape(s)}</li>`);
  rows.push('</ol>');
  // Key Features & Benefits — <h2> + <ul>
  rows.push(`<h2>Key Features &amp; Benefits of the ${name}</h2>`);
  rows.push(`<p>The ${name} is packed with useful features that make your task quick, easy, and completely private. Here is why users choose it again and again:</p>`);
  rows.push('<ul>');
  for (const f of features) rows.push(`  <li>${htmlEscape(f)}</li>`);
  rows.push('</ul>');
  // FAQ
  rows.push(`<h2>Frequently Asked Questions</h2>`);
  for (const f of faqs) {
    rows.push(`<h3>${htmlEscape(f.q)}</h3>`);
    rows.push(`<p>${htmlEscape(f.a)}</p>`);
  }
  if (related.length) {
    rows.push(`<h2>Related Tools</h2>`);
    const links = related.map((t) => `<a href="/tools/${t.id}">${htmlEscape(t.name)}</a>`).join(', ');
    rows.push(`<p>${links}</p>`);
  }
  return rows.join('\n        ');
}

function categoryBody(cat) {
  const catTools = tools.filter((t) => t.category === cat.id);
  const links = catTools.map((t) => `<a href="/tools/${t.id}">${htmlEscape(t.name)}</a>`).join(', ');
  return (
    `<h1>${htmlEscape(cat.name)}</h1>\n        ` +
    `<p>${htmlEscape(cat.description)} Explore ${catTools.length} free ${htmlEscape(cat.name.toLowerCase())} utilities with no account required.</p>\n        ` +
    `<h2>All ${htmlEscape(cat.name)}</h2>\n        <p>${links}</p>`
  );
}

function homeBody() {
  const catLinks = categories.map((c) => `<a href="/category/${c.id}">${htmlEscape(c.name)}</a>`).join(', ');
  const allTools = tools.map((t) => `<a href="/tools/${t.id}">${htmlEscape(t.name)}</a>`).join(', ');
  return (
    `<h1>${tools.length}+ Free Online Tools</h1>\n        ` +
    '<p>Text, Image, Calculator, Converter, Developer, and Fun tools — all in one place. Free utilities for browser-based work. Currency rates and QR images use third-party APIs, while video downloads use the configured backend.</p>\n        ' +
    `<h2>Browse by Category</h2>\n        <p>${catLinks}</p>\n        ` +
    `<h2>All ${tools.length} Free Online Tools</h2>\n        <p>${allTools}</p>`
  );
}

// ---------------------------------------------------------------------------

function inject(base, head, body) {
  return base
    .replace('<div id="root"></div>', `<div id="root">\n        ${body}\n      </div>`)
    .replace('</head>', `${head}\n  </head>`);
}

function writePage(relPath, head, body) {
  const base = readFileSync(join(DIST, 'index.html'), 'utf8');
  const outPath = join(DIST, relPath);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, inject(base, head, body), 'utf8');
}

let toolCount = 0;
let catCount = 0;

for (const tool of tools) {
  const cat = categories.find((c) => c.id === tool.category);
  const description = buildToolDescription(tool);
  const title = buildToolTitle(tool);
  const canonical = `${SITE_URL}/tools/${tool.id}`;
  const extra = [webAppSchema(tool), breadcrumbSchema(tool, cat?.name)].filter(Boolean);
  const faq = faqSchema(tool);
  if (faq) extra.push(faq);
  const jsonLd = buildJsonLd(description, extra);
  const head = buildHead({ title, description, canonical, ogImageAlt: `${tool.name} on MiniTools`, jsonLd });
  writePage(`tools/${tool.id}/index.html`, head, toolBody(tool));
  toolCount++;
}

for (const cat of categories) {
  const catTools = tools.filter((t) => t.category === cat.id);
  const title = `Free Online ${cat.name} | MiniTools`;
  const description = `${catTools.length} free ${cat.name.toLowerCase()} tools online. No signup, runs in your browser.`;
  const canonical = `${SITE_URL}/category/${cat.id}`;
  const jsonLd = buildJsonLd(description);
  const head = buildHead({ title, description, canonical, ogImageAlt: `${cat.name} on MiniTools`, jsonLd });
  writePage(`category/${cat.id}/index.html`, head, categoryBody(cat));
  catCount++;
}

// Enrich the root dist/index.html with a static head + body fallback as well.
{
  const title = `MiniTools: ${tools.length}+ Free Online Tools | PDF, Text & Image`;
  const desc = DEFAULT_DESC;
  const canonical = `${SITE_URL}/`;
  const jsonLd = buildJsonLd(desc);
  const head = buildHead({ title, description: desc, canonical, ogImageAlt: `MiniTools: ${tools.length}+ Free Online Tools`, jsonLd });
  const base = readFileSync(join(DIST, 'index.html'), 'utf8');
  writeFileSync(join(DIST, 'index.html'), inject(base, head, homeBody()), 'utf8');
}

console.log(`✅ prerender-static.mjs -> ${toolCount} tool pages, ${catCount} category pages, + root index.html`);