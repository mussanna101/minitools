// src/utils/seo/meta.js
// Per-tool SEO metadata builders shared by the runtime <ToolHelmet/> component
// (src/components/common/ToolHelmet.jsx) AND the static prerender pipeline
// (scripts/prerender-static.mjs). Keeping both on the same functions guarantees
// the pre-rendered <head> is byte-identical to what Helmet emits at runtime, so
// react-helmet-async never has to swap tags.

import { toolMeta } from '../../data/toolMeta.js';

const SITE_URL = 'https://minitools-silk.vercel.app';

// Title: prefer the unique, natural title from toolMeta; fall back to a sensible
// generated pattern only for tools that do not yet have a toolMeta entry.
export function buildToolTitle(tool) {
  return toolMeta[tool.id]?.title || `Free Online ${tool.name} | MiniTools`;
}

function smartTruncate(str, max) {
  if (str.length <= max) return str;
  const cut = str.slice(0, max).replace(/\s+\S*$/, '');
  const base = cut.length > 0 ? cut : str.slice(0, max - 1);
  return `${base}…`;
}

// Meta description forced into the 150–160 char window with a call-to-action.
const CTAS = [
  ' 100% free, no signup, runs in your browser.',
  ' Use it now, instantly, right on your device.',
  ' No account, no limits, works on any device.',
];

const MIN_LEN = 150;
const MAX_LEN = 160;

export function buildToolDescription(tool) {
  // Prefer the unique, natural description from toolMeta (all 88 live tools
  // have one). The generator below is only a fallback for future tools that
  // do not yet carry a meta entry — it guarantees a valid 150-160 char summary.
  if (toolMeta[tool.id]?.description) return toolMeta[tool.id].description;

  // Fallback generator.
  const stem = `${tool.name}: ${tool.description}.`;

  // 1) Start with the stem + as many CTAs as fit the 160 cap.
  let parts = [stem];
  for (const cta of CTAS) {
    if (parts.concat(cta).join('').length <= MAX_LEN) {
      parts.push(cta);
    } else {
      break;
    }
  }
  let text = parts.join('');

  // 2) Over budget → shrink the stem to make room for the CTAs.
  if (text.length > MAX_LEN) {
    const ctaLen = parts.slice(1).join('').length;
    const budget = MAX_LEN - ctaLen;
    text = smartTruncate(stem, budget) + parts.slice(1).join('');
  }

  // 3) Under 150 → pad with an extra CTA until we cross the threshold.
  if (text.length < MIN_LEN) {
    const filler = ' 100% free to use online — no account needed.';
    text = (text + filler).slice(0, MAX_LEN);
    // In the rare case a long tool name still leaves us short, keep filling.
    while (text.length < MIN_LEN) {
      text += ' Free to use.';
      if (text.length > MAX_LEN) {
        text = text.slice(0, MAX_LEN);
      }
    }
  }

  return text.slice(0, MAX_LEN).trim();
}

// For <h1> in the static fallback only (runtime h1 lives in ToolPage/tool data).
export function toolCanonical(tool) {
  return `${SITE_URL}/tools/${tool.id}`;
}

export { SITE_URL };