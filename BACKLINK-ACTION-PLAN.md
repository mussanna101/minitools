# Backlink Action Plan — Quality Over Quantity

Directory-blast posts promising "500+ sites" are link-farm spam that hurts more than helps post-Penguin. Skip them. Target the **quality, tool-relevant** places below — 10 good links beat 200 junk ones.

**Pacing:** 2–3 submissions per day over the next week. Looks organic, avoids platform spam filters. Use the tracking table at the bottom so you never duplicate effort.

---

## Target list

| Site | Why it fits | Submit at |
|---|---|---|
| **Product Hunt** | Real traffic + a real dofollow-adjacent profile link; tool launches do well here | producthunt.com/posts/new |
| **AlternativeTo** | Users actively search "alternative to X" for PDF/image/converter tools — direct intent traffic | alternativeto.net (add via "Suggest new app") |
| **SaaSHub** | Tech-audience directory, decent authority, free listing | saashub.com/submit |
| **Slant** | Q&A-style "best tools for X" format — good for individual tool pages, not just homepage | slant.co |
| **BetaList** (if framed as a fresh launch) | Startup/indie-maker audience, decent authority | betalist.com |
| **Hacker News (Show HN)** | One well-written "Show HN: 88 free browser-based tools, no signup" post can drive a real traffic + link spike if it lands well | news.ycombinator.com/submit |
| **r/InternetIsBeautiful, r/SideProject, r/webdev** | Follow each subreddit's self-promo rules carefully (most cap it to 1 link per week) — genuine community traffic + occasional link pickup | reddit.com |
| **GitHub "Awesome" lists** | Search GitHub for `awesome tools` repos in your categories and open a PR adding your site under the right heading | github.com |
| **Indie Hackers** | Post a "I built a set of free online tools" story with the link — community + occasional backlink | indiehackers.com |
| **DevHunt / Fazier** | Dev-tool-focused launch platforms, similar format to Product Hunt but smaller/faster to get traction | devhunt.org, fazier.com |

---

## Ready-to-paste copy (adjust per platform's character limit)

**One-liner (≤80 chars):**

```
MiniTools — 88 free browser-based tools for PDF, image, text, and dev tasks.
```

**Short (≤160 chars):**

```
MiniTools is a free collection of 88 browser-based tools — PDF conversion, image editing, text utilities, calculators, and developer tools. No signup, no installs.
```

**Long (Product Hunt / BetaList style):**

> MiniTools is a free web app with 88 focused, single-purpose tools spanning PDF conversion, image editing, text utilities, unit converters, calculators, and developer utilities like JSON formatting and regex testing. Everything runs instantly in the browser — no account, no install, no upload limits for most tools. Built for the "I just need to do this one thing quickly" moment.

**Show HN title suggestion:** `Show HN: 88 free browser-based tools (PDF, image, text, dev) — no signup`

---

## Tracking table (fill in as you submit)

| # | Platform | Submitted (date) | Live URL of listing/post | Result (approved/rejected/pending) | Notes |
|---|---|---|---|---|---|
| 1 | Product Hunt | | | | |
| 2 | AlternativeTo | | | | |
| 3 | SaaSHub | | | | |
| 4 | Slant | | | | |
| 5 | BetaList | | | | |
| 6 | Hacker News (Show HN) | | | | |
| 7 | r/InternetIsBeautiful | | | | |
| 8 | r/SideProject | | | | |
| 9 | r/webdev | | | | |
| 10 | GitHub Awesome list PR | | | | |
| 11 | Indie Hackers | | | | |
| 12 | DevHunt | | | | |
| 13 | Fazier | | | | |

---

## Performance follow-up (pending owner input)

PageSpeed Insights API was retried from the agent environment and still returned **HTTP 429** (shared free-tier quota) — no Lighthouse numbers were obtainable without an API key. Owner action:

1. Open **https://pagespeed.web.dev** and test (mobile scores matter most):
   - `https://minitools-silk.vercel.app/`
   - `https://minitools-silk.vercel.app/tools/video-downloader`
   - `https://minitools-silk.vercel.app/category/pdf`
2. Record Performance / SEO / Accessibility / Best-Practices + LCP / CLS / INP and paste the results back.

**Working hypothesis while we wait:** the two ad networks (AdSense `async` + Adsterra `defer`, both in `index.html` with preconnects) are the biggest performance risk. They are already loaded in the least-damaging way possible; if real numbers come back poor, the first lever is reducing Adsterra to fewer page types (owner decision) — see `AUDIT-REPORT.md` Phase 4, item 6.
