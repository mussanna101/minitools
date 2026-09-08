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
import { tools, categories, getRelatedTools } from '../src/data/toolsData.js';
import { webAppSchema, breadcrumbSchema, faqSchema, buildFAQs } from '../src/utils/seo/schema.js';
import { buildToolTitle, buildToolDescription } from '../src/utils/seo/meta.js';
import { buildHowToSteps, buildFeatures, buildAbout, buildFormats, buildLimits } from '../src/utils/seo/toolContent.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const SITE_URL = 'https://minitools-silk.vercel.app';
const OG_IMAGE = `${SITE_URL}/og-default.png`;

const DEFAULT_DESC =
  `${tools.length}+ free online tools for PDF, text, image, calculators, converters, developer and fun tools. Third-party APIs power currency rates, QR images and video downloads.`;

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

// --- Lazy chunk preloading ---------------------------------------------------
// ToolPage (and each tool component) are lazy chunks discovered only at render
// time, which creates a fetch waterfall on direct/organic tool page visits.
// We parse the built entry chunk's __vite__mapDeps arrays and inject
// <link rel="modulepreload"> for the ToolPage chunk + the tool's own
// component chunk so they download in parallel with the entry chunk.
function collectAssetUrls(code) {
  const out = [];
  const re = /m\.f=\[([^\]]+)\]/g;
  let m;
  while ((m = re.exec(code))) {
    for (const u of m[1].matchAll(/"(assets\/[^"]+)"/g)) out.push(u[1]);
  }
  return [...new Set(out)];
}

function discoverLazyChunks() {
  try {
    const base = readFileSync(join(DIST, 'index.html'), 'utf8');
    const entryMatch = base.match(/assets\/index-[A-Za-z0-9_-]+\.js/);
    if (!entryMatch) return null;
    const entryCode = readFileSync(join(DIST, entryMatch[0]), 'utf8');
    const entryUrls = collectAssetUrls(entryCode);
    const toolPage = entryUrls.find((u) => /^assets\/ToolPage-/.test(u));
    if (!toolPage) return null;
    const tpCode = readFileSync(join(DIST, toolPage), 'utf8');
    const componentUrls = collectAssetUrls(tpCode).filter(
      (u) => !/^(assets\/(index|react-vendor|helmet|pdf-|lamejs|jszip))/.test(u)
    );
    return { toolPage, componentUrls };
  } catch {
    return null; // graceful fallback: no preloads if structure changes
  }
}

// toolId -> component chunk base name, parsed from ToolPage.jsx's componentMap
function toolComponentBase(toolId) {
  try {
    const src = readFileSync(join(__dirname, '..', 'src', 'pages', 'ToolPage.jsx'), 'utf8');
    const re = new RegExp(`'${toolId}'\\s*:\\s*\\{[^}]*?path:\\s*'\\.\\./components/tools/([A-Za-z]+)\\.jsx'`);
    const m = src.match(re);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

function modulePreloadLinks(toolId) {
  const lazy = discoverLazyChunks();
  if (!lazy) return '';
  const urls = [lazy.toolPage];
  const base = toolComponentBase(toolId);
  if (base) {
    const comp = lazy.componentUrls.find((u) => new RegExp(`^assets/${base}-`).test(u));
    if (comp) urls.push(comp);
  }
  return urls
    .map((u) => `<link rel="modulepreload" crossorigin href="/${u}" />`)
    .join('\n    ');
}

function buildHead({ title, description, canonical, ogType = 'website', ogImageAlt = 'MiniTools', jsonLd, preloads = '' }) {
  const p = [];
  const push = (s) => p.push(s);
  if (preloads) push(preloads);
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
  const about = buildAbout(tool);
  const formats = buildFormats(tool);
  const limits = buildLimits(tool);
  const related = getRelatedTools(tool, 8);
  const cat = categories.find((c) => c.id === tool.category);
  const name = htmlEscape(tool.name);
  const rows = [];
  rows.push(`<h1>${name}</h1>`);
  rows.push(`<p>${htmlEscape(tool.description)}</p>`);
  // Unique per-tool intro (data/toolContentData.js)
  rows.push(`<h2>About the ${name}</h2>`);
  rows.push(`<p>${htmlEscape(about)}</p>`);
  // Supported inputs / outputs
  if (formats) {
    rows.push(`<h2>Supported Inputs &amp; Outputs</h2>`);
    rows.push(`<p>${htmlEscape(formats)}</p>`);
  }
  // How to Use
  rows.push(`<h2>How to Use the ${name}</h2>`);
  rows.push('<ol>');
  for (const s of steps) rows.push(`  <li>${htmlEscape(s)}</li>`);
  rows.push('</ol>');
  // Key Features & Benefits
  rows.push(`<h2>Key Features &amp; Benefits of the ${name}</h2>`);
  rows.push('<ul>');
  for (const f of features) rows.push(`  <li>${htmlEscape(f)}</li>`);
  rows.push('</ul>');
  // Limitations - honest and tool-specific
  if (limits && limits.length) {
    rows.push(`<h2>${name} Limitations</h2>`);
    rows.push('<ul>');
    for (const l of limits) rows.push(`  <li>${htmlEscape(l)}</li>`);
    rows.push('</ul>');
  }
  // FAQ - every Q&A present in the static HTML
  rows.push(`<h2>Frequently Asked Questions</h2>`);
  for (const f of faqs) {
    rows.push(`<h3>${htmlEscape(f.q)}</h3>`);
    rows.push(`<p>${htmlEscape(f.a)}</p>`);
  }
  // Related tools - crawlable <a> links
  if (related.length) {
    rows.push(`<h2>Related Tools</h2>`);
    rows.push('<ul>');
    for (const t of related) rows.push(`  <li><a href="/tools/${t.id}">${htmlEscape(t.name)}</a></li>`);
    rows.push('</ul>');
  }
  // Category hub link
  if (cat) {
    rows.push(`<p>Browse all <a href="/category/${cat.id}">${htmlEscape(cat.name)}</a> tools on MiniTools.</p>`);
  }
  return rows.join('\n        ');
}

function categoryBody(cat) {
  const catTools = tools.filter((t) => t.category === cat.id);
  const items = catTools.map((t) => `  <li><a href="/tools/${t.id}">${htmlEscape(t.name)}</a></li>`).join('\n        ');
  return (
    `<h1>${htmlEscape(cat.name)}</h1>\n        ` +
    `<p>${htmlEscape(cat.description)} Explore ${catTools.length} free ${htmlEscape(cat.name.toLowerCase())} utilities with no account required.</p>\n        ` +
    (cat.intro ? `<p>${htmlEscape(cat.intro)}</p>\n        ` : '') +
    `<h2>All ${htmlEscape(cat.name)} Tools</h2>\n        <ul>\n        ${items}\n        </ul>\n        ` +
    `<h2>Browse Other Categories</h2>\n        <ul>\n        ` +
    categories.filter((c) => c.id !== cat.id).map((c) => `  <li><a href="/category/${c.id}">${htmlEscape(c.name)}</a></li>`).join('\n        ') +
    `\n        </ul>`
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
// Idempotent injection. `stripPriorSeo` removes any tags a previous prerender
// run injected (marked with data-rh) and resets the app root to empty, so the
// script is safe to re-run and works regardless of the order pages are written.
function stripPriorSeo(html) {
  return html
    .replace(/<div id="root">[\s\S]*?<\/div>/, '<div id="root"></div>')
    .replace(/<title[^>]*data-rh="true"[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<((?:meta|link|script))\b[^>]*data-rh="true"[^>]*\/?>/gi, '');
}

function inject(base, head, body) {
  const clean = stripPriorSeo(base);
  return clean
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
  const head = buildHead({ title, description, canonical, ogImageAlt: `${tool.name} on MiniTools`, jsonLd, preloads: modulePreloadLinks(tool.id) });
  writePage(`tools/${tool.id}/index.html`, head, toolBody(tool));
  toolCount++;
}

for (const cat of categories) {
  const catTools = tools.filter((t) => t.category === cat.id);
  const title = `Free Online ${cat.name} | MiniTools`;
  const description =
    cat.metaDescription ||
    `${catTools.length} free ${cat.name.toLowerCase()} tools online. No signup, runs in your browser.`;
  const canonical = `${SITE_URL}/category/${cat.id}`;
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cat.name} - Free Online Tools`,
    itemListElement: catTools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}/tools/${tool.id}`,
    })),
  };
  const jsonLd = buildJsonLd(description, [itemList]);
  const head = buildHead({ title, description, canonical, ogImageAlt: `${cat.name} on MiniTools`, jsonLd });
  writePage(`category/${cat.id}/index.html`, head, categoryBody(cat));
  catCount++;
}

// Trust pages: About, Privacy, Terms, Contact
// Each page also gets a real static body so Googlebot sees meaningful content
// in the very first HTML response (React replaces it on hydration).
const trustPages = [
  {
    path: 'about',
    title: 'About MiniTools – Free Online Utility Tools',
    description: `Learn about MiniTools, a collection of ${tools.length}+ free online utility tools. Most tools run entirely in your browser for privacy and speed.`,
    body: () =>
      `<h1>About MiniTools</h1>\n        ` +
      `<h2>Who We Are</h2>\n        ` +
      `<p>MiniTools is a free online utility collection offering ${tools.length}+ tools for everyday tasks — image conversion, PDF editing, video downloading, text manipulation, unit conversion, calculators, and more.</p>\n        ` +
      `<h2>Why MiniTools?</h2>\n        ` +
      `<p>Every tool is designed to be simple, fast, and private. We believe utilities should be free and straightforward — no subscriptions, no ads blocking the tool, no tracking.</p>\n        ` +
      `<h2>How It Works</h2>\n        ` +
      `<p>Most MiniTools run locally in your browser. That means your files stay private, there are no accounts or logins, and many tools work offline after the page loads. Video downloads and API-dependent tools like currency rates use external services.</p>\n        ` +
      `<p>We use Google AdSense and third-party ad networks to keep the tools free. See our <a href="/privacy-policy">Privacy Policy</a> for details, or <a href="/contact">contact us</a> with feedback or tool suggestions.</p>`,
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy | MiniTools – Data & Cookie Use',
    description: 'MiniTools Privacy Policy – how we handle your data, cookies and advertising, and what information leaves your browser when you use our free online tools.',
    body: () =>
      `<h1>Privacy Policy</h1>\n        ` +
      `<p>MiniTools is committed to protecting your privacy. This policy explains how we collect, use, and protect your information when you visit minitools-silk.vercel.app.</p>\n        ` +
      `<h2>Data Processing</h2>\n        ` +
      `<p>Most MiniTools run in your browser. Files you upload (images, PDFs, documents, text) are processed locally on your device and are NOT sent to our servers. Exceptions: video downloads send the URL to our backend server, and currency conversion and QR codes request data from third-party APIs. Do not use these tools with private, sensitive, or confidential URLs or data.</p>\n        ` +
      `<h2>Cookies</h2>\n        ` +
      `<p>MiniTools uses cookies for theme preference, user preferences, and advertising (Google AdSense and third-party ad networks may set their own cookies).</p>\n        ` +
      `<h2>Your Rights &amp; Choices</h2>\n        ` +
      `<p>Settings and history are stored in your browser only. You can opt out of personalized ads at Google Ad Settings. Questions? <a href="/contact">Contact us</a>.</p>`,
  },
  {
    path: 'terms',
    title: 'Terms of Service | MiniTools – Use & Disclaimer',
    description: 'MiniTools Terms of Service – the terms that apply when you use our free online tools, including permitted use of the video downloader, disclaimers and contact info.',
    body: () =>
      `<h1>Terms of Service</h1>\n        ` +
      `<p>By accessing and using MiniTools (minitools-silk.vercel.app), you agree to be bound by these Terms of Service. Permission is granted to use MiniTools for personal, non-commercial use only; you may not modify, copy, decompile or mirror the tools without permission.</p>\n        ` +
      `<h2>Video Download Tools — Permitted Use</h2>\n        ` +
      `<p>You may only use the Video Downloader and YouTube Downloader to download videos you created or own, videos you have explicit permission to download, or videos released under an open license or in the public domain. Downloading copyrighted videos without permission is prohibited.</p>\n        ` +
      `<h2>Disclaimer &amp; Contact</h2>\n        ` +
      `<p>MiniTools provides its tools \"as is\" without warranty of any kind. Questions about these terms? <a href="/contact">Contact us</a> or email support@minitools.app.</p>`,
  },
  {
    path: 'contact',
    title: 'Contact MiniTools – Feedback & Support',
    description: 'Contact the MiniTools team – send feedback, report bugs or suggest new tools. Use the contact form or email support@minitools.app.',
    body: () =>
      `<h1>Contact Us</h1>\n        ` +
      `<p>Have feedback, found a bug, or want to suggest a new tool? We'd love to hear from you! You can email us anytime at support@minitools.app with feedback, bug reports, or tool suggestions.</p>`,
  },
];

for (const page of trustPages) {
  const canonical = `${SITE_URL}/${page.path}`;
  const jsonLd = buildJsonLd(page.description);
  const head = buildHead({ title: page.title, description: page.description, canonical, ogImageAlt: page.title, jsonLd });
  writePage(`${page.path}/index.html`, head, page.body()); // Static body renders real content (React replaces on hydration)
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

console.log(`✅ prerender-static.mjs -> ${toolCount} tool pages, ${catCount} category pages, 4 trust pages, + root index.html`);