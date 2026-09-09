# Mini-Tools — Indexing, Backlinks & Performance Action Plan

Honesty first: items 3 and 5 below need a Google login / a real browser, which this sandbox doesn't have — I tried both from here so you don't have to guess whether they're skippable, and I'm reporting exactly what happened. Item 4 is fully actionable right now and I've done the research for you.

---

## 1. Search Console Indexing — what I could and couldn't do

**Tried:** ran `node scripts/submit-indexnow.mjs` directly. Result:
IndexNow HTTP 403 — 97 URLs submitted
Host not in allowlist: api.indexnow.org. Add this host to your network egress settings to allow access.

This sandbox's network is locked down, so the request never reached Bing. **This is not a bug in your code** — the script and key file are correctly set up. Run this one command yourself from a normal machine with the repo pulled:
node scripts/submit-indexnow.mjs

Expect `IndexNow HTTP 200` or `202`. This covers Bing/DuckDuckGo only.

**Google (the one that actually matters) requires a logged-in GSC session** — no API key can substitute for clicking "Request Indexing." Do it in this exact order, ~10-15 URLs/day so you don't look like you're spamming the tool:

| Day | Submit |
|---|---|
| 1 | Homepage + all 8 category pages (9 URLs) |
| 2 | video-downloader, youtube-downloader, pdf-to-word, word-to-pdf, image-compressor, merge-pdf, qr-generator, password-generator, json-formatter, background-remover (highest search-volume tools) |
| 3-7 | Remaining ~78 tool pages, ~15/day, category by category |
| Once | Submit sitemap.xml once in GSC > Sitemaps (don't resubmit repeatedly) |

Steps per URL: GSC > URL Inspection > paste URL > wait for check > Request Indexing. Never resubmit the same URL day after day.

---

## 2. Core Web Vitals / Lighthouse

Tried the PageSpeed Insights API twice against the homepage without an API key — both calls returned HTTP 429 (Google's shared free quota, already exhausted by other traffic).

Do this instead (2 minutes, no login needed):
1. Go to https://pagespeed.web.dev
2. Test these three URLs separately (mobile scores matter most):
   - https://minitools-silk.vercel.app/
   - https://minitools-silk.vercel.app/tools/video-downloader
   - https://minitools-silk.vercel.app/category/pdf
3. Send back the Performance/SEO/Accessibility scores and LCP/CLS/INP numbers. Working hypothesis: the two ad networks (AdSense + Adsterra) loading on every page are the biggest performance risk — need real numbers to confirm before removing anything.

---

## 3. Backlinks — ready to submit today

Skip "500+ directories" blog spam. Submit to quality, tool-relevant places instead:

| Site | Why it fits | Submit at |
|---|---|---|
| Product Hunt | Real traffic, tool launches do well | producthunt.com/posts/new |
| AlternativeTo | Direct-intent "alternative to X" searches | alternativeto.net |
| SaaSHub | Tech-audience directory, free listing | saashub.com/submit |
| Slant | "Best tools for X" Q&A format | slant.co |
| BetaList | Startup/indie-maker audience | betalist.com |
| Hacker News (Show HN) | "Show HN: 88 free browser-based tools, no signup" | news.ycombinator.com/submit |
| r/InternetIsBeautiful, r/SideProject, r/webdev | Follow self-promo rules (usually 1 link/week) | reddit.com |
| GitHub "Awesome" lists | Open a PR adding the site under the right heading | github.com |
| Indie Hackers | Post the build story with the link | indiehackers.com |
| DevHunt / Fazier | Dev-tool launch platforms | devhunt.org, fazier.com |

Ready-to-paste descriptions:
- One-liner: MiniTools — 88 free browser-based tools for PDF, image, text, and dev tasks.
- Short: MiniTools is a free collection of 88 browser-based tools — PDF conversion, image editing, text utilities, calculators, and developer tools. No signup, no installs.
- Long: MiniTools is a free web app with 88 focused, single-purpose tools spanning PDF conversion, image editing, text utilities, unit converters, calculators, and developer utilities like JSON formatting and regex testing. Everything runs instantly in the browser — no account, no install, no upload limits for most tools. Built for the "I just need to do this one thing quickly" moment.

Pacing: submit 2-3 per day over the next week rather than all at once.

---

## Bottom line

- Indexing: mechanical part (IndexNow) is ready to run; Google-side submission needs your GSC login and the day-by-day list above.
- Performance: numbers need a real Lighthouse run on your end — send results back for concrete fixes.
- Backlinks: fully actionable today.
