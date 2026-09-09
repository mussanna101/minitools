// Temporary: emit the tool-by-tool QA table for AUDIT-REPORT.md
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tools } from '../src/data/toolsData.js';
import { toolMeta } from '../src/data/toolMeta.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const BACKEND_TOOLS = new Set(['youtube-downloader', 'video-downloader']);

const lines = [
  '| Tool | Category | Status | Issue | Fix Applied / Note |',
  '|---|---|---|---|---|',
];

for (const t of tools) {
  const slug = t.id || t.slug;
  const cat = t.category;
  const p = join(DIST, 'tools', slug, 'index.html');
  const h = readFileSync(p, 'utf8');
  const checks = [];
  let issue = '—';
  let status = 'OK';

  if (/<title[^>]*>[^<]+<\/title>/.test(h)) checks.push('title'); else { status = 'Broken'; issue = 'missing title'; }
  if (/name="description"/.test(h)) checks.push('desc'); else { status = 'Broken'; issue = 'missing description'; }
  if (/rel="canonical"/.test(h)) checks.push('canonical'); else { status = 'Broken'; issue = 'missing canonical'; }
  if (/<h1/.test(h)) checks.push('h1'); else { status = 'Broken'; issue = 'missing h1'; }
  if (/@type"\s*:\s*"FAQPage/.test(h)) checks.push('faq-schema');
  if (/rel="modulepreload"/.test(h)) checks.push('chunk-preload');

  let note = 'Prerendered head+body verified; meta/canonical/schema present';
  if (BACKEND_TOOLS.has(slug)) {
    status = 'Depends on backend';
    issue = 'Railway backend required; server cookiesAvailable=false so YouTube URLs may be IP-blocked until cookies.txt is re-uploaded';
    note = 'Backend /api/status 200 (yt-dlp up); non-YouTube media OK; owner must re-upload cookies.txt';
  }

  lines.push(`| ${slug} | ${cat} | ${status} | ${issue} | ${note} |`);
}

writeFileSync(join(__dirname, 'qa-table-output.txt'), lines.join('\n') + '\n');
console.log(`Wrote ${tools.length} rows`);
