# MiniTools — Full Audit, SEO Fix & Ranking Repair Report

**Site:** https://minitools-silk.vercel.app
**Branch audited:** `seo/faq-rewrite` (HEAD `3795633`, in sync with `origin/seo/faq-rewrite`)
**Audit date:** 2026-09-09

---

## Executive Summary

| Area | Verdict |
|---|---|
| Build | ✅ `npm run build` passes; prerenders 88 tool + 8 category + 4 trust pages + root |
| SEO audit script | ✅ `npm run audit:seo` reports **zero** warnings (no duplicate/short/long titles or descriptions, no missing canonical/h1/schema, no broken internal links, sitemap 101/101 in parity) |
| Prerendered HTML | ✅ Real crawlable `<head>` (title, description, robots, canonical, OG, JSON-LD) **and** crawlable `<body>` (How-to steps, Key Features, FAQ text) on every route |
| Tool functionality | ✅ 86/88 tools verified OK via automated/static checks; 2 tools (`video-downloader`, `youtube-downloader`) depend on the live Railway backend |
| Backend | ⚠️ Railway `/api/status` returns 200 (yt-dlp `2026.08.19` up) but `cookiesAvailable: false` → YouTube URLs likely IP-blocked until the owner re-uploads cookies.txt |
| Titles / descriptions | ✅ Fully rewritten (commit `3795633`): all unique, 56–63 char titles, 129–159 char descriptions, varied structures |
| Ranking | ❌ The #1 blocker remains the **shared `vercel.app` subdomain** + near-zero backlinks + young site age. Technical SEO is now clean; remaining levers are mostly human actions (custom domain, GSC, backlinks) |

### Methodology note (read first)

Functional QA combined: (a) the repo's own `audit-seo.mjs` full-site crawler (internal-link resolution, sitemap↔route parity, inventory parity of component/meta/content/FAQs per tool); (b) programmatic verification of every prerendered page's head/body/schema; (c) live HTTP probes of the production site and Railway backend; (d) targeted code review of each tool's processing path (client-side vs backend). A final human browser click-through of a handful of tools is still recommended — listed under "Remaining human actions."

## Phase 1 — Environment & Baseline

- `npm install` — done; dependencies intact.
- `npm run build` — **passes** (~3.5s). Heavy libs are split into lazy chunks (`lamejs`, `jszip`, `pdfjs`, `tesseract`, `jsQR`); prerenderer emits: `✅ prerender-static.mjs -> 88 tool pages, 8 category pages, 4 trust pages, + root index.html`.
- `npm run audit:seo` — **completely clean** (full JSON in Appendix A at the bottom of this file): 101 prerendered pages, 101 sitemap URLs in exact parity, zero duplicate titles/descriptions, zero length violations, zero missing canonicals/h1s/schema, zero broken internal links, valid JSON-LD everywhere, valid robots.txt/sitemap reference.
- Prior task docs read in full (`TASK-6-VERIFICATION-CHECKLIST.md`, `TASK-7-GSC-INDEXING-FOLLOW-UP.md`, `scripts/priority-urls.md`). Their owner-action guidance (AdSense resubmission, GSC batch indexing, IndexNow/Bing) is carried into the human-action list below and was verified, not duplicated.
- Git history review: previous "low-value content" / GSC indexing fights already shipped: trust pages with real content, per-tool FAQs for all 88 tools, byte-identical prerender heads, ad cleanup (removed placeholder ad slots, Adsterra on new domain), lazy-chunk splitting + deferred ad scripts, cookies.txt upload API for the Railway YouTube IP-block, and the full title/description rewrite. This audit verified those fixes rather than re-doing them.

## Phase 2 — Functional QA (all 88 tools)

### Verification performed

- **Per-page automated checks** on all 88 prerendered tool pages: `<title>`, meta description, self-canonical, exactly-one `<h1>`, `WebApplication` + `BreadcrumbList` + `FAQPage` JSON-LD, lazy-chunk `modulepreload` injection.
- **Full internal-link crawl** via `audit-seo.mjs` (Navbar, Footer, Sidebar, ToolCard, category pages, related-tools): `brokenInternalLinks: []`. Sitemap↔routes parity: `sitemapMissingUrls: []`, `sitemapUnexpectedUrls: []`.
- **Inventory parity**: every tool id has a component mapping, meta entry, content profile and FAQ set; no duplicate "about" sections; no invalid profile ids; no stale "88 tools" hardcoded references.
- **Live deployment check**: `https://minitools-silk.vercel.app/tools/pdf-to-word` → 200 serving the prerendered page; asset hashes served by Vercel match the local build exactly (branch is deployed).
- **Backend probe** (Railway): `GET /` → 200; `GET /api/status` → 200 `{potServer:"up", potPluginInstalled:true, ytdlpVersion:"2026.08.19", infoCacheEntries:0, cookiesAvailable:false}`.
- **Backend dependency review**: only `video-downloader` and `youtube-downloader` (via `src/components/tools/VideoDownloaderTools.jsx`) call `/api/info` / `/api/download` / `/api/convert`. `audio-to-mp3` (Web Audio + lamejs) and `video-to-mp4` (canvas + MediaRecorder) are fully client-side.
- **External links / ad scripts**: AdSense (`pagead2.googlesyndication.com`, pub `9674079530936526`) matches `public/ads.txt` (`google.com, pub-9674079530936526, DIRECT, f08c47fec0942fa0`); Adsterra script loads deferred from `airtightmodification.com` with preconnect; no leftover placeholder ad slot IDs (`1234567890`) found.

### Tool-by-tool table

Status key: **OK** = all automated checks pass and processing path reviewed; **Depends on backend** = functional only while Railway backend + cookies are healthy.

| Tool | Category | Status | Issue | Fix Applied / Note |
|---|---|---|---|---|
| Tool | Category | Status | Issue | Fix Applied / Note |
|---|---|---|---|---|
| pdf-to-word | pdf | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| word-to-pdf | pdf | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| image-to-pdf | pdf | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| pdf-to-image | pdf | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| merge-pdf | pdf | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| compress-pdf | pdf | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| audio-to-mp3 | media | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| video-to-mp4 | media | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| video-downloader | media | Depends on backend | Railway backend required; server cookiesAvailable=false so YouTube URLs may be IP-blocked until cookies.txt is re-uploaded | Backend /api/status 200 (yt-dlp up); non-YouTube media OK; owner must re-upload cookies.txt |
| pdf-split | pdf | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| youtube-downloader | media | Depends on backend | Railway backend required; server cookiesAvailable=false so YouTube URLs may be IP-blocked until cookies.txt is re-uploaded | Backend /api/status 200 (yt-dlp up); non-YouTube media OK; owner must re-upload cookies.txt |
| word-counter | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| character-counter | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| case-converter | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| text-reverser | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| lorem-ipsum | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| text-to-slug | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| remove-duplicates | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| sort-lines | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| find-replace | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| text-to-binary | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| roman-numerals | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| number-to-words | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| markdown-to-html | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| typing-speed | text | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| image-to-base64 | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| image-resizer | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| image-compressor | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| color-picker | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| color-converter | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| basic-calculator | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| percentage-calculator | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| bmi-calculator | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| age-calculator | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| discount-calculator | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| tip-calculator | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| loan-calculator | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| scientific-calculator | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| gpa-calculator | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| compound-interest | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| date-difference | calculator | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| length-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| weight-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| temperature-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| currency-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| speed-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| area-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| volume-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| time-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| data-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| number-base-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| pressure-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| energy-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| time-zone-converter | converter | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| html-preview | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| css-tester | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| js-playground | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| html-to-jsx | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| css-to-scss | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| json-to-yaml | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| yaml-to-json | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| background-remover | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| png-to-jpg | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| jpg-to-png | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| image-to-text | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| base64-to-image | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| gradient-generator | image | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| json-formatter | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| json-to-csv | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| base64-encoder | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| url-encoder | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| html-minifier | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| css-minifier | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| js-minifier | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| regex-tester | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| password-generator | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| uuid-generator | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| hash-generator | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| qr-generator | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| qr-scanner | developer | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| random-number | fun | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| dice-roller | fun | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| coin-flip | fun | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| emoji-translator | fun | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| ascii-art | fun | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| palindrome-checker | fun | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| anagram-generator | fun | OK | — | Prerendered head+body verified; meta/canonical/schema present |
| random-quote | fun | OK | — | Prerendered head+body verified; meta/canonical/schema present |

### Phase 2 wrap-up: issues found & dispositions

1. **`video-downloader` / `youtube-downloader` — backend cookies expired.** The cookies.txt workaround API (commit `4b327f9`) is deployed server-side, but `/api/status` reports `cookiesAvailable: false`. Until the owner re-uploads a fresh cookies.txt through the tool's UI, YouTube downloads will likely fail with IP-block errors. Non-YouTube social-platform URLs may still work via the POT provider (`potServer: up`). **Not fixable from the frontend** — documented as a human action.
2. **No dead tools, no 404 tool pages, no dead internal links.** Verified by crawler + sitemap parity + inventory parity.
3. **Third-party-API tools** (`time-zone-converter`, `qr-generator`, `currency-converter`) are functional but inherently subject to upstream API availability — documented, no action needed.
4. **External link spot-checks**: AdSense pub ID consistent between `index.html` script and `ads.txt`; Adsterra domain resolves; no placeholder slots.

---

## Phase 3 — Technical SEO Audit (per page template)

### Verified across all 101 prerendered pages

| Check | Result |
|---|---|
| `<title>` present & unique | ✅ all 101 pages; 0 duplicates; tool titles 56–63 chars |
| `<meta name="description">` unique & sized | ✅ all unique; 129–159 chars |
| Exactly one `<h1>` per page | ✅ (`missingH1: []`) |
| Self-referencing absolute canonical | ✅ e.g. `<link rel="canonical" href="https://minitools-silk.vercel.app/tools/pdf-to-word" />` — exactly one per page (`data-rh` marked so react-helmet-async reuses, never duplicates) |
| Robots meta | ✅ `index, follow` on all pages; no noindex leftovers |
| OG / Twitter tags | ✅ on all pages; `og:type`, `og:site_name`, `og:title`, `og:description`, `og:image` (1200×630) + `og:image:alt` |
| JSON-LD | ✅ valid everywhere; no parse errors. Tool pages: `Organization` + `WebSite`(+`SearchAction`) + `WebApplication`(+`Offer`) + `BreadcrumbList` + `FAQPage`. Schema mirrors on-page FAQ text (both built from the same `buildFAQs()` source, so they cannot diverge) |
| robots.txt | ✅ `User-agent: *\nAllow: /\nSitemap: https://minitools-silk.vercel.app/sitemap.xml` |
| Sitemap | ✅ 101 URLs, exact route parity, correct production domain, per-URL `lastmod` |
| Headings / alt text | ✅ single h1, h2/h3 sections; descriptive alt (`og:image:alt` = "<Tool> on MiniTools") |
| Render-blocking resources | ✅ AdSense `async`, Adsterra `defer`, both preconnected; heavy libs code-split; tool component chunks preloaded via injected `modulepreload` to kill the fetch waterfall on organic entries |
| Crawlable body content | ✅ every prerendered tool page contains How-to steps, Key Features, about text and FAQ text in raw HTML (~2.75–3.9 KB of body copy per page) |
| Live deployment serves prerendered HTML | ✅ verified: live `/tools/pdf-to-word` returns the full prerendered head + body, asset hashes match the local build |

### Known residual SEO weaknesses (flagged, not blockers)

1. **One generic OG image for all pages** (`/og-default.png`). `scripts/generate-og.mjs` intentionally generates a single 1200×630 gradient PNG; per-page uniqueness is only in `og:image:alt`. A per-category/per-tool OG image would improve social CTR. *(Improvement, not a regression.)*
2. **Templated content depth.** Prerendered body copy per tool page averages ~3.1 KB (min 2,753 on `pdf-split`, max 3,908). Titles/descriptions/FAQs are unique per tool, but How-to/Features sections share sentence templates. This is the residual "low-value content" risk that already triggered an AdSense flag. Thinnest pages: `pdf-split`, `merge-pdf`, `coin-flip`, `dice-roller`, `pdf-to-image`, `random-quote`, `word-to-pdf`, `image-compressor`, `image-resizer`, `image-to-pdf`. *(Improvement: hand-write 150–300 extra unique words — real examples, use cases, screenshots — starting with the top-20 traffic tools.)*
3. **Lighthouse could not be run in this environment** (no headless Chrome available to the agent). Structurally the site is optimized for it (code-splitting, deferred ads, preconnects, prerendered HTML, single small stylesheet). Owner should run PageSpeed Insights on `/`, `/tools/pdf-to-word`, `/category/pdf` and record scores — see human actions.

### Before/after: title & description rewrite results (shipped in `3795633`)

Before: templated titles like `Word Counter - MiniTools | Free Online Tools` with only the tool name swapped — the exact "template sameness" pattern that reads as doorway-style to search engines.

After (verified unique on every page, varied sentence structures):

| Tool | New title (len) | New description (len) |
|---|---|---|
| pdf-to-word | PDF to Word Converter – Convert PDF to DOCX Free \| MiniTools (62) | Convert PDF files to editable, searchable Word documents online — fast and secure. No signup, no watermarks. Get your DOCX in seconds, right in your browser. (159) |
| word-counter | Word Counter – Count Words and Characters Free \| MiniTools (60) | Count words, characters, sentences and paragraphs instantly. Free, no signup, live results. Perfect for writers, students and social media. (139) |
| image-resizer | Image Resizer – Resize JPG/PNG Online Free \| MiniTools (56) | Resize images to custom width and height online. Free, no signup, no watermarks. Fast and private — works for JPG, PNG and more. (130) |
| json-formatter | JSON Formatter – Format & Validate JSON \| MiniTools (57) | Format and validate JSON data with syntax highlighting. Free, no signup, private. Pretty-print, minify and explore your JSON instantly. (135) |
| bmi-calculator | BMI Calculator – Check Body Mass Index Online \| MiniTools (59) | Calculate your Body Mass Index instantly and see the standard category. Free, no signup, private. Enter height and weight to get your BMI result. (145) |
| youtube-downloader | YouTube Downloader – Save Videos as MP4 or MP3 \| MiniTools (60) | Download YouTube videos as MP4 or convert them to MP3. Free, no signup, multiple quality options. Process videos quickly with our online tool. (142) |
| dice-roller | Dice Roller – Roll Virtual Dice (1-6) Online Free \| MiniTools (63) | Roll virtual dice and get results instantly. Free, no signup. Perfect for board games, RPGs and quick decisions, with a simple click. (133) |
| password-generator | Password Generator – Strong Random Passwords \| MiniTools (58) | Generate strong, random passwords. Free, no signup, private. Choose length and character types — copied to clipboard instantly. (129) |

All 88 tool titles + 8 category titles + home/About/Contact/Privacy/Terms are unique, keyword-first (matching real search intent, e.g. "convert PDF to Word"), with a consistent `| MiniTools` brand suffix. Post-rewrite `npm run build` + `npm run audit:seo` confirm zero duplicate-title/description warnings and zero length violations.

## Phase 4 — Why isn't the site ranking? (diagnosis, ranked by likely impact)

1. **Shared `vercel.app` subdomain — the single biggest blocker.** `minitools-silk.vercel.app` has no independent domain authority, shares trust signals with millions of Vercel apps, and cannot build its own brand/anchor-text profile. Every serious competitor tool site ranks on a real domain. **A custom domain (~$10/yr) is a near-prerequisite for meaningful ranking.** This is a human decision — the agent cannot purchase DNS or rewire Vercel/AdSense/GSC to a new domain. (When done: 301-redirect plan + GSC domain property + AdSense site update are required — see human actions.)

2. **Near-zero backlinks.** Normal for a young site, but brutal in tool verticals where competitors have years of accumulated links. No technical fix substitutes for this. Practical starters: submit to free-tool directories, answer tool-related questions on Reddit/StackExchange-style communities with genuine links, publish the genuinely useful tools (word counter, JSON formatter) where developers gather. Slow, ongoing, human work.

3. **Site age / sandbox period.** The site is very young. Google routinely takes **months** to trust and rank new domains even with perfect technical SEO. No amount of technical work shortens this; do not expect ranking movement in weeks. (This also applies post-domain-migration.)

4. **Indexing coverage gap.** GSC previously reported ~81 pages "Discovered – currently not indexed" (per TASK-7). Nothing technical is blocking indexing now (verified: `index, follow` everywhere, clean canonicals, valid sitemap, no orphan pages — every tool is linked from its category page + related-tools + footer). The remaining cause is Google's quality/authority judgment — which items 1–3 and 5 address. Owner must still do the GSC request-indexing batches per `TASK-7` doc (agent has no GSC credentials).

5. **Content depth/uniqueness.** Every tool page now has unique title, description, FAQs and prerendered body copy, but sections still share templates (avg ~3.1 KB body copy). Against incumbent tool sites with thousands of words + screenshots + user reviews per page, this is thin. The AdSense "low value content" flag was almost certainly a symptom of the same quality signal that suppresses ranking. Prioritized hand-written content for high-volume tools is the highest-leverage content action.

6. **Core Web Vitals / ad load.** Two ad networks on every page (AdSense + Adsterra) are already optimized (async/defer/preconnect, lazy-chunked JS, prerendered HTML), but ads still cost LCP/INP and layout stability. If Lighthouse shows poor scores, the highest-value change is **reducing Adsterra to fewer page types** or removing it until traffic justifies it. Owner decision.

7. **E-E-A-T signals.** About/Contact/Privacy/Terms are real content pages (verified rendered + crawlable), privacy policy names both ad networks and links ad settings — adequate for now. Still missing: any author/ownership transparency (who runs MiniTools), which matters for trust on an ads-funded site. Adding a short "who we are" with a real name/entity would help marginally.

8. **Keyword competition.** Many target keywords ("pdf to word", "word counter") are dominated by iLovePDF, SmallPDF, wordcounter.net etc. Realistic near-term wins are long-tail variants ("count words with spaces online", "convert pdf to word without email") — the new descriptions already lean this way; future content should too.

**Bottom line:** technical SEO is no longer the bottleneck. Ranking requires: custom domain → backlink building → content depth → time. All four are primarily human actions.

## Phase 5 — Titles & meta descriptions: status

Complete — see the before/after table in Phase 3. All rewrites shipped in commit `3795633` (`src/data/toolMeta.js`, `src/utils/seo/meta.js`, prerenderer). Final verification in this audit: 101/101 pages unique + in-size; `npm run build` and `npm run audit:seo` re-run clean on current HEAD.

---

## Phase 6 — Git workflow: what was committed and pushed

The previously dirty working tree was reviewed and separated in earlier passes: genuine fixes were committed in logical groups; stray/debug changes were discarded. Nothing sensitive is tracked (`.env*` remains `.gitignore`d; no keys/tokens in the tree — the only identifiers in code are the public AdSense publisher ID and public ad script URLs, which are meant to be public).

Commits on `seo/faq-rewrite` (all pushed to `origin/seo/faq-rewrite`):

| Commit | What & why |
|---|---|
| `65acce8` | feat(seo): per-tool FAQs for all 88 tools + byte-identical prerender heads — fought "low value content" by giving every tool page unique FAQ content |
| `ed8d036` | fix: publish dynamic tool count and privacy copy — removed stale hardcoded counts |
| `11f0b42` | feat: add processing-aware SEO disclosures — content matches what each tool actually does (local vs backend) |
| `94f5561` | fix: clean category page titles — removed template sameness on category pages |
| `da3bcd0` | Add AdSense ads.txt authorization |
| `343d195` | perf: split heavy libs into lazy chunks, preload tool pages, defer ads — Core Web Vitals work |
| `3fd4e01` | Improve technical SEO and indexing |
| `14b70a5` | Fix AdSense low-value-content + GSC indexing: trust pages, ad cleanup, video disclaimers |
| `b12bd1b` | Re-add Adsterra with new domain, update Task 3 scope |
| `b708878` | Fix blank trust pages: Typography plugin + explicit text colors |
| `a871dda` | Add owner action guides (TASK-6 / TASK-7 docs) |
| `4b327f9` | fix: add cookies.txt upload API to bypass Railway IP-level YouTube blocking |
| `3795633` | Improve SEO indexing and site performance — **full title/description rewrite across all 101 pages**, prerenderer + audit-script hardening, sitemap refresh, trust/category page content improvements |

This audit's final commit adds only `AUDIT-REPORT.md` (this file) plus the reusable QA table generator `scripts/generate-qa-table.mjs`. The working tree was clean before it; no code changes were needed in the final pass — all checks verified green.

## Remaining human actions (cannot be done by the agent)

1. **Buy a custom domain and migrate** — the #1 ranking lever. (~$10/yr; e.g. `minitools.app` or similar.) After purchase: add domain in Vercel, 301 `minitools-silk.vercel.app` → new domain, update `SITE_URL` in `scripts/generate-sitemap.mjs` / `scripts/prerender-static.mjs` / `scripts/audit-seo.mjs`, update `ads.txt`, move the AdSense site entry and GSC property to the new domain, re-submit sitemap.
2. **Re-upload cookies.txt to the Railway backend** via the YouTube Downloader tool's upload UI — `/api/status` currently reports `cookiesAvailable: false`, so YouTube downloads will fail IP-block errors until then. Cookies expire periodically; expect to redo this.
3. **Google Search Console**: request indexing following the day-by-day checklist in `GSC-SUBMISSION-TRACKER.md` (~10–15 URLs/day over 8 days; agent has no GSC login); monitor the "Pages" report weekly and report back per the template in `TASK-7-GSC-INDEXING-FOLLOW-UP.md`.
4. **AdSense re-review**: after verifying the live site renders per `TASK-6-VERIFICATION-CHECKLIST.md` (all checkboxes), tick "I confirm I have fixed the issues" and request review.
5. **Run Lighthouse / PageSpeed Insights** (mobile + desktop) on `/`, `/tools/pdf-to-word`, `/category/pdf` — record Performance/SEO/A11y/BP + LCP/CLS/INP. If scores are poor, decide on Adsterra reduction/removal (ad-density decision).
6. **Backlink building** — directories, communities, genuinely shareable tools. Ongoing human effort; the largest remaining off-page factor.
7. **Content depth program** — hand-write unique examples/use cases/screenshots for the top-20 tools (thinnest listed in Phase 3).
8. ~~**Bing Webmaster Tools + IndexNow**~~ — **DONE (2026-09-09):** `node scripts/submit-indexnow.mjs` returned `IndexNow HTTP 200 — 97 URLs submitted` (key file verified live at `https://minitools-silk.vercel.app/80895b70cacd3fb9303a4f4a1c82d51c.txt`). Still optional: verify the site in Bing Webmaster Tools for the richer reports (instructions in `scripts/priority-urls.md`). Backlink submissions: follow `BACKLINK-ACTION-PLAN.md`.
9. **Final browser click-through** of a handful of tools after deploy (console errors, download/copy flows) as a sanity pass.

---

## Appendix A — `npm run audit:seo` output (current HEAD)

```json
{
  "tools": 88,
  "categories": 8,
  "prerenderedPages": 101,
  "sitemapUrls": 101,
  "duplicateSitemapUrls": [],
  "sitemapMissingUrls": [],
  "sitemapUnexpectedUrls": [],
  "missingTitle": [],
  "duplicateTitles": [],
  "missingDescription": [],
  "duplicateDescriptions": [],
  "missingCanonical": [],
  "incorrectCanonical": [],
  "missingH1": [],
  "missingSchema": [],
  "missingPrerender": [],
  "brokenInternalLinks": [],
  "inventoryParity": {
    "missingComponentMap": [],
    "missingToolMeta": [],
    "missingToolContent": [],
    "duplicateAbout": [],
    "invalidProfileIds": []
  },
  "staleCountReferences": [],
  "titleTooShort": [],
  "titleTooLong": [],
  "descriptionTooShort": [],
  "descriptionTooLong": [],
  "invalidJsonLd": [],
  "robotsSitemapValid": true
}
```

## Appendix B — Live service probes (2026-09-09)

| Target | Result |
|---|---|
| `https://minitools-silk.vercel.app/tools/pdf-to-word` | 200 — serves full prerendered HTML; asset hashes match local build |
| `https://minitools-production-0646.up.railway.app/` | 200 |
| `https://minitools-production-0646.up.railway.app/api/status` | 200 — `{potServer:"up", potPluginInstalled:true, ytdlpVersion:"2026.08.19", infoCacheEntries:0, cookiesAvailable:false}` |
| IndexNow (`api.indexnow.org`) | **200 — 97 URLs submitted & accepted** (2026-09-09, via `node scripts/submit-indexnow.mjs`; covers Bing/DuckDuckGo/Seznam/Naver/Yandex — Google ignores IndexNow) |
| PageSpeed Insights API | 429 — shared free-tier quota exhausted; Lighthouse numbers must come from a manual run at pagespeed.web.dev |
| `dist/robots.txt` | Allow all + correct sitemap URL |
| `dist/ads.txt` | `google.com, pub-9674079530936526, DIRECT, f08c47fec0942fa0` |
| OG image | `/og-default.png` 1200×630 present in `dist/` and referenced by all pages (generic — see Phase 3) |

