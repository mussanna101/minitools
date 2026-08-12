// scripts/generate-sitemap.mjs
// Run:  node scripts/generate-sitemap.mjs
//       (or automatically via "prebuild" npm script)
// Scans src/data/toolsData.js and writes a fresh public/sitemap.xml
// so every tool + category is always listed before a Vercel build.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tools, categories } from '../src/data/toolsData.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://minitools-silk.vercel.app';
const TODAY = new Date().toISOString().split('T')[0];

const url = (loc, freq, priority) =>
  `  <url><loc>${SITE_URL}${loc}</loc><lastmod>${TODAY}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>`;

const home = url('/', 'daily', '1.0');
const categoryUrls = categories.map((c) => url(`/category/${c.id}`, 'weekly', '0.8')).join('\n');
const toolUrls = tools.map((t) => url(`/tool/${t.id}`, 'monthly', '0.7')).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${home}
${categoryUrls}
${toolUrls}
</urlset>
`;

const out = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(
  `✅ sitemap.xml regenerated -> ${tools.length} tools, ${categories.length} categories, ${tools.length + categories.length + 1} URLs`
);