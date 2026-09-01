# Task 7: Google Search Console Indexing Follow-Up

**Status:** ⏳ Start AFTER Task 6 verification passes and AdSense re-review is requested

---

## Timeline

- **Request AdSense re-review** (Task 6, Phase 4)
  - Typically takes 2-7 days for AdSense to respond
  - While you wait, you can start Task 7 immediately

- **Manual GSC indexing requests** (this task)
  - Spread over 1-2 weeks to avoid appearing automated
  - First batch: 5-10 pages now
  - Second batch: if first batch gets indexed, request 5-10 more in 1-2 weeks

- **Monitor results** (ongoing)
  - Check "Why pages aren't indexed" report weekly
  - Report back after 2 weeks with new counts

---

## Phase 1: Prepare Priority URL List

You'll request indexing for the **most important pages first**, not all 81 stuck pages.

**Recommended 5-10 URLs (in priority order):**

### Tier 1: Essential Pages (Always Include)
```
1. https://minitools-silk.vercel.app/
   (homepage - highest authority, most crawlable)

2. https://minitools-silk.vercel.app/about
   (new trust page - shows site legitimacy)

3. https://minitools-silk.vercel.app/privacy-policy
   (new trust page - AdSense requires this)
```

### Tier 2: High-Value Category Pages (Pick 2-3)
```
4. https://minitools-silk.vercel.app/category/text-tools
   (highest interest tools)

5. https://minitools-silk.vercel.app/category/pdf-tools
   (high SEO value, common searches)

6. https://minitools-silk.vercel.app/category/image-tools
   (popular category)
```

### Tier 3: High-Value Tool Pages (Pick 2-3)
```
7. https://minitools-silk.vercel.app/tools/word-counter
   (most popular tool - check analytics if possible)

8. https://minitools-silk.vercel.app/tools/pdf-to-word
   (high search volume keyword)

9. https://minitools-silk.vercel.app/tools/image-resizer
   (common use case)
```

**Total: 9 URLs for initial batch**

---

## Phase 2: Manual Indexing Requests in Google Search Console

### Step 1: Open Google Search Console

1. Go to `https://search.google.com/search-console`
2. Select property: `minitools-silk.vercel.app`

### Step 2: Open "Discovered – currently not indexed" Report

1. Left sidebar: **Indexing** → **Pages**
2. You'll see a table with columns like:
   - **URL** (the page)
   - **Status** (Discovered – currently not indexed, Crawled, etc.)
   - **Detection date** (when Google found it)

### Step 3: Request Indexing for First 5-10 Pages

**Do this one URL at a time, don't bulk-select:**

1. Click on a URL row to open the **URL inspection panel** (right side slides out)
2. Panel header shows the URL
3. Click the blue **"Request indexing"** button
4. Confirmation appears: "Request sent successfully"
5. The page will likely say "Indexing request enqueued" (Google will re-crawl it within days)

**Repeat for each of your 9 selected URLs**

---

## Phase 3: Handle "Crawled – currently not indexed" Pages

In the same report, you should see:
- Most pages: "Discovered – currently not indexed"
- Some pages: "Crawled – currently not indexed" (Google crawled it but decided not to index)

**For the 2 "Crawled" pages:**

1. Request indexing the same way (URL inspection → "Request indexing")
2. Note: These are lower priority since Google has already evaluated them
   - Google's deciding NOT to index them for quality reasons
   - Requesting indexing won't force Google to index them, but it signals you've fixed issues
   - These will re-crawl, and if quality issues are resolved, Google may index them on next crawl

---

## Phase 4: Wait and Monitor

### Week 1-2: Ongoing Monitoring

**Daily (or every few days):**

1. Go to GSC → **Pages** report
2. Look for your 9 submitted URLs
3. Check if status changed from "Discovered/Crawled – not indexed" to "Indexed"
   - Status shows as green checkmark ✅ "Indexed"
   - URL appears in "Coverage" report under "Valid"

**What to expect:**
- 50-70% of submitted URLs might get indexed within 1 week ✅
- Some might remain "not indexed" (Google still sees quality issues)
- A few might be re-crawled but still not indexed (repeat quality signal)

### Week 2: Second Batch (Optional)

**If the first 9 URLs start getting indexed (50%+ success):**

1. Request indexing for next 5-10 URLs (categories or tools you skipped in Tier 2/3)
2. Again, pick high-value pages (don't mass-request all 81)

**If the first 9 URLs are NOT getting indexed:**

- Stop requesting more pages
- Investigate why
- Check "Why pages aren't indexed?" report for common reasons (see below)

---

## Phase 5: Analyze "Why pages aren't indexed?" Report

**Location:** GSC → **Indexing** → **Coverage**

This report shows **aggregate reasons** Google doesn't index pages:

### Common Reasons & What They Mean:

| Reason | Meaning | Action |
|--------|---------|--------|
| **"Crawled – currently not indexed"** | Google crawled it but decided not to index (quality issue) | Confirm quality fixes applied, re-request indexing, wait 1-2 weeks |
| **"Discovered – currently not indexed"** | Google found the URL but hasn't crawled yet (low priority) | Manually request indexing to signal importance |
| **"Excluded by noindex tag"** | Page has `<meta name="robots" content="noindex">` | Remove noindex tag if page should be indexed |
| **"Blocked by robots.txt"** | robots.txt prevents crawling | Verify robots.txt allows crawling (should for these pages) |
| **"Duplicate"** | Google thinks this is a duplicate of another URL | Check if there are param variations (e.g., `?ref=google` vs clean URL) |
| **"Soft 404"** | Page looks like 404 to Google (no content found) | Verify page has real content, check prerender generated static HTML |
| **"No page crawl needed"** | Likely crawl budget issue — Google has crawled site, decided it's low quality | Request indexing will prompt re-crawl; trust-page + quality fixes should help |

### Check After 2 Weeks:

```
Before:
- "Discovered – currently not indexed": 81 pages
- "Crawled – currently not indexed": 2 pages
- "Indexed": ~97 pages
- TOTAL: 180 pages

After Phase 2-3 requests (2-3 weeks wait):
- "Discovered – currently not indexed": ~60-70 pages (improved!)
- "Crawled – currently not indexed": 0-1 pages
- "Indexed": ~110-125 pages (improved!)
```

If you see this improvement → quality fixes are working ✅

---

## Phase 6: Optional - IndexNow Submission

If you have a tool like `submit-indexnow.mjs` configured:

1. Run it:
   ```bash
   npm run submit-indexnow
   ```

2. This submits all URLs to Bing's IndexNow service
   - Faster alternative to GSC for Bing/Yahoo indexing
   - Doesn't hurt to run it
   - Not required, but supplementary

---

## Phase 7: Interpret Results & Flag Subdomain Risk

### Scenario A: 50%+ of pages get indexed ✅

- Quality fixes are working
- Adsterra re-addition didn't hurt
- Trust pages + reduced templating helping
- Free Vercel subdomain may NOT be a blocker for indexing (good news!)

**Next step:** Continue monitoring GSC weekly; re-assess custom domain if needed after 4-6 weeks of stable indexing

### Scenario B: <30% of pages get indexed ❌

- Quality fixes helped marginally, but not enough
- Free Vercel subdomain is likely still a significant factor
- Crawl budget remains constrained

**Escalation:** Flag to owner — domain migration (custom domain) is now highest priority
- Free subdomain is preventing Google from prioritizing your site
- Quality content improvements alone cannot overcome domain authority penalty
- Custom domain migration should become next task

### Scenario C: 0% improvement; pages re-crawled but not indexed ⚠️

- Google sees your trust pages + disclaimer + reduced templating
- **But** it's still not enough to overcome subdomain penalty
- Free Vercel subdomain is likely the primary blocker

**Escalation:** Domain migration is mandatory
- No amount of content fixes will help on a penalized free subdomain
- Custom domain is not optional at this point

---

## Reporting Back

After **2 weeks of monitoring**, report back with:

```
**GSC Indexing Progress Report (Date)**

Before fixes:
- "Discovered – not indexed": 81 pages
- "Crawled – not indexed": 2 pages
- Indexed: ~97 pages

After requesting indexing for [list of 5-10 URLs]:
- "Discovered – not indexed": X pages (was 81)
- "Crawled – not indexed": Y pages (was 2)
- Indexed: Z pages (was 97)

Change: +/- X pages indexed

Interpretation:
[ ] Significant improvement (50%+ of submitted pages indexed) — continue monitoring
[ ] Marginal improvement (20-40%) — consider domain migration
[ ] No improvement (0-20%) — domain migration needed immediately

Other observations:
- [Any Google Search Console warnings?]
- [Any specific URLs failing to index?]
- [Any pattern to which pages get indexed vs. stuck?]
```

---

## Critical Caveat

**GSC indexing is NOT the same as rankings.**

You can have all pages indexed and still rank poorly if:
- Free Vercel subdomain hurts authority/trust score
- Content quality is still marginal for competitive keywords
- Backlink profile is weak

Indexing is a **prerequisite** for ranking, but not a guarantee of good rankings.

---

## Do NOT Do

❌ **Mass-request all 81 pages at once**
- Signals automated behavior to Google
- Wastes crawl budget without better outcomes
- Increases risk of throttling

❌ **Request indexing for low-quality pages** (weak content, duplicate pages, etc.)
- Google re-crawls them, sees they're still low-value
- Wastes crawl budget
- Signals low-quality site to Google

❌ **Change content/structure during indexing phase**
- Wait 1-2 weeks before making more changes
- Let Google stabilize on the new fixes first

❌ **Ignore "Crawled – not indexed" pages**
- These are lower priority but still worth requesting
- Shows Google they're important

---

## Success Checklist

- [ ] Prepared 5-10 priority URLs
- [ ] Logged into GSC
- [ ] Opened "Discovered – currently not indexed" report
- [ ] Requested indexing for URL #1 (saw "Request sent successfully" confirmation)
- [ ] Requested indexing for URLs #2-#9 (one at a time)
- [ ] Noted before/after counts from Coverage report
- [ ] Set calendar reminder to check GSC in 1 week
- [ ] Set calendar reminder to check again in 2 weeks
- [ ] Prepared template for reporting results back

Then you're done with Task 7 — just monitor!
