// scripts/submit-indexnow.mjs
// Submits the site (and top tool pages) to Bing/IndexNow for fast indexing.
// Run manually (not hooked into every build to avoid spamming):
//   node scripts/submit-indexnow.mjs
//
// Requirements:
//   - The key file public/<KEY>.txt must exist and be deployed.

import { tools } from '../src/data/toolsData.js';

const HOST = 'minitools-silk.vercel.app';
const KEY = '80895b70cacd3fb9303a4f4a1c82d51c';
const SITE = `https://${HOST}`;

const urlList = [
  `${SITE}/`,
  ...tools.slice(0, 15).map((t) => `${SITE}/tool/${t.id}`),
];

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${SITE}/${KEY}.txt`,
  urlList,
};

try {
  const resp = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow HTTP ${resp.status} — ${urlList.length} URLs submitted`);
  const text = await resp.text();
  if (!resp.ok) console.log(text.slice(0, 500));
  process.exit(resp.ok ? 0 : 1);
} catch (err) {
  console.error('IndexNow submission failed (network error):', err.message);
  process.exit(1);
}
