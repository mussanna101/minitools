import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { tools, categories } from '../src/data/toolsData.js';

const SITE_URL = 'https://minitools-silk.vercel.app';
const DIST = join(process.cwd(), 'dist');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function firstMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || '';
}

function pageRow(file) {
  const html = readFileSync(file, 'utf8');
  return {
    file: relative(DIST, file),
    html,
    title: firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: firstMatch(html, /<meta name="description"[^>]*content="([^"]*)"/i),
    canonical: firstMatch(html, /<link rel="canonical"[^>]*href="([^"]*)"/i),
    h1: (html.match(/<h1\b/gi) || []).length,
    schema: (html.match(/application\/ld\+json/gi) || []).length,
  };
}

function duplicateValues(rows, key) {
  const groups = new Map();
  for (const row of rows) {
    const value = row[key];
    if (!value) continue;
    const files = groups.get(value) || [];
    files.push(row.file);
    groups.set(value, files);
  }
  return [...groups.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([value, files]) => ({ value, files }));
}

if (!existsSync(DIST)) {
  console.error('Missing dist/. Run npm run build first.');
  process.exit(1);
}

const pages = walk(DIST).filter((file) => file.endsWith('index.html')).map(pageRow);
const sitemap = readFileSync(join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedUrls = [
  `${SITE_URL}/`,
  ...categories.map((category) => `${SITE_URL}/category/${category.id}`),
  ...tools.map((tool) => `${SITE_URL}/tools/${tool.id}`),
];
const internalLinks = pages.flatMap((page) =>
  [...page.html.matchAll(/href="(\/(?:tools|category)\/[^"#?]+)"/g)].map((match) => ({
    page: page.file,
    url: match[1].replace(/\/$/, ''),
  }))
);
const brokenInternalLinks = internalLinks.filter(({ url }) =>
  !existsSync(join(DIST, url.slice(1), 'index.html'))
);
const missingPrerender = expectedUrls
  .filter((url) => url !== `${SITE_URL}/`)
  .filter((url) => !existsSync(join(DIST, new URL(url).pathname.slice(1), 'index.html')));

const report = {
  tools: tools.length,
  categories: categories.length,
  prerenderedPages: pages.length,
  sitemapUrls: sitemapUrls.length,
  duplicateSitemapUrls: sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index),
  sitemapMissingUrls: expectedUrls.filter((url) => !sitemapUrls.includes(url)),
  sitemapUnexpectedUrls: sitemapUrls.filter((url) => !expectedUrls.includes(url)),
  missingTitle: pages.filter((page) => !page.title).map((page) => page.file),
  duplicateTitles: duplicateValues(pages, 'title'),
  missingDescription: pages.filter((page) => !page.description).map((page) => page.file),
  duplicateDescriptions: duplicateValues(pages, 'description'),
  missingCanonical: pages.filter((page) => !page.canonical).map((page) => page.file),
  incorrectCanonical: pages
    .filter((page) => page.canonical && !page.canonical.startsWith(`${SITE_URL}/`))
    .map((page) => ({ file: page.file, canonical: page.canonical })),
  missingH1: pages.filter((page) => page.h1 !== 1).map((page) => ({ file: page.file, count: page.h1 })),
  missingSchema: pages.filter((page) => page.schema === 0).map((page) => page.file),
  missingPrerender,
  brokenInternalLinks,
};

console.log(JSON.stringify(report, null, 2));

const failures = [
  report.duplicateSitemapUrls,
  report.sitemapMissingUrls,
  report.missingTitle,
  report.duplicateTitles,
  report.missingDescription,
  report.duplicateDescriptions,
  report.missingCanonical,
  report.incorrectCanonical,
  report.missingH1,
  report.missingSchema,
  report.missingPrerender,
  report.brokenInternalLinks,
].some((items) => items.length > 0);
process.exitCode = failures ? 1 : 0;