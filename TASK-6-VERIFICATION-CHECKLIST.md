# Task 6: Pre-AdSense Resubmission Verification Checklist

**Status:** ⏳ Awaiting Vercel deployment of `seo/faq-rewrite` branch to production

---

## Phase 1: Deploy to Production

Before you do anything else, ensure the fixes are actually live:

- [ ] **Merge `seo/faq-rewrite` → `main` on GitHub**
  - PR has been created and Vercel preview deployed automatically
  - Check the preview at `minitools-silk--<preview-hash>.vercel.app` first to verify pages render
  - Once confirmed, merge to main

- [ ] **Confirm main branch deployed to production**
  - Check Vercel dashboard: `minitools-silk.vercel.app` should show the latest commit hash
  - Page load time ~2-3 seconds max (too slow indicates CSS/JS issue)

---

## Phase 2: Live Site Verification

**On the LIVE `minitools-silk.vercel.app` (not preview, not localhost):**

### A. Trust Pages Render with Content

- [ ] `/about` loads with visible content
  - Title: "About MiniTools"
  - Sections: "Who We Are", "Why MiniTools?", "How It Works", "Backend & Third-Party Services", "Questions?"
  - Links to `/privacy-policy` and `/contact` are clickable

- [ ] `/contact` loads with visible form
  - Title: "Contact Us"
  - Form fields: Name, Email, Message
  - "Send" button works (opens mailto: link)

- [ ] `/privacy-policy` loads with visible content
  - Title: "Privacy Policy"
  - Sections: "Overview", "1. Data Processing", "2. Cookies", "3. Advertising & Google AdSense", etc.

- [ ] `/terms` loads with visible content
  - Title: "Terms of Service"
  - Sections: "Overview", "1. Use License", "2. Video Download Tools", etc.
  - ⚠️ Warning text visible for video tools

### B. Footer Navigation

- [ ] Footer appears on **every page** (homepage, tool pages, category pages, trust pages)
  - Links visible: "All Tools", category links, "About", "Privacy", "Terms", "Contact"
  - All links are clickable and navigate correctly

- [ ] Footer text visible in both light and dark modes
  - Toggle dark mode (theme toggle in navbar if visible)
  - Text should remain readable

### C. Privacy Policy Proper Disclosures (Critical for AdSense)

Open `/privacy-policy` and verify **all of these are explicitly present:**

- [ ] **"Google AdSense"** explicitly mentioned
  - Section: "3. Advertising & Google AdSense"
  - Describes personalized ads, cookies, tracking

- [ ] **"Adsterra"** explicitly mentioned
  - Section: "3. Advertising & Google AdSense", subsection "Additional ad networks:"
  - States that Adsterra is a third-party ad network

- [ ] **Cookies disclosed**
  - Section: "2. Cookies"
  - Lists: theme preference, user prefs, Google AdSense cookies, third-party ad network cookies

- [ ] **Link to Google Ad Settings**
  - Section: "3. Advertising & Google AdSense"
  - URL: `https://adssettings.google.com`
  - Link is clickable (opens in new tab)

- [ ] **Data handling clarity**
  - Section: "1. Data Processing"
  - Clearly states what runs locally in browser vs. what uses backend/third-party APIs

### D. Static HTML Content (Crawlable Without JS)

**Using view-source or "Disable JavaScript" in DevTools:**

- [ ] Open 3-4 random tool pages (e.g., `/tools/pdf-to-word`, `/tools/text-reverser`)
  - Right-click → "View Page Source" (or open DevTools → Sources → disable JS)
  - Search in raw HTML for:
    - [ ] "How to Use" steps present in `<body>` (not just after JS loads)
    - [ ] "Key Features" bullets present in `<body>`
    - [ ] FAQ content present in `<body>`
    - [ ] Disclaimer text for video tools (if checking `/tools/video-downloader` or `/tools/youtube-downloader`)
  - Confirm text renders static, not JS-only

- [ ] Homepage (`/`)
  - View source and search for hero section content
  - Should include tool list and category descriptions

### E. Trust Pages Static Content

- [ ] `/about` in view-source has actual content (not just empty `<div id="root"></div>`)
  - Look for `<h1>`, `<h2>`, `<p>`, `<ul>` tags with content

- [ ] `/privacy-policy` in view-source has actual content
  - Look for "Google AdSense", "Adsterra", section headings

- [ ] `/contact` in view-source has form structure
  - Look for `<form>`, `<input>`, `<textarea>` tags

- [ ] `/terms` in view-source has actual content
  - Look for "Video Download Tools", "Permitted Use" sections

### F. Ad Networks Load Cleanly

- [ ] Open **DevTools → Console** on live site
  - [ ] No 404 errors for `airtightmodification.com` (Adsterra)
  - [ ] No CORS errors
  - [ ] No JavaScript errors that would break page rendering
  - [ ] AdSense script loads (no 403/401 errors)

- [ ] **Ad containers render** (if you've created real AdSense slot IDs)
  - [ ] AdSense banner on homepage (if slot ID added)
  - [ ] Adsterra banner on footer (bottom of every page)
  - Neither should cause layout shift or page freeze

### G. No Placeholder Ad Slots

- [ ] Open live page, right-click → "View Page Source"
  - [ ] Search for `1234567890` → **should return 0 results**
  - If found, that's the old placeholder slot ID and needs replacement

---

## Phase 3: Run SEO Audit

```bash
npm run audit:seo
```

- [ ] Command runs without errors
- [ ] No critical flags remain
- [ ] Fix any warnings it reports

---

## Phase 4: Trigger AdSense Re-Review (Manual Owner Action)

**You must do this manually in AdSense dashboard — agent cannot perform:**

1. Go to Google AdSense → **Sites**
2. Click on `minitools-silk.vercel.app`
3. You should see: **Status = "Needs attention"**, "Status details = Low value content"
4. Tick the checkbox: **✓ "I confirm I have fixed the issues"**
5. Click **"Request review"**
6. Wait for email confirmation — review can take **2-7 days**

---

## Phase 5: Monitor for Review Result

After requesting review:

- [ ] Check your AdSense email (reply may go to your linked email)
  - AdSense may auto-reply with "Review in progress" or immediately flag new issues
  - If new issues appear, they will be emailed

- [ ] Check AdSense dashboard daily
  - Status may change to "Approved" ✅ or stay "Needs attention" (if issues remain)

- [ ] If re-review **still fails** after all fixes:
  - Flag back to me
  - Revisit root cause: free Vercel subdomain is the highest-risk factor
  - May need to escalate to custom domain migration

---

## Phase 6: Prepare for GSC Indexing Requests (Task 7)

Once AdSense review passes (or while waiting):

Prepare a list of **5-10 most important URLs** to manually request indexing for:

**Suggested priority URLs:**
- `https://minitools-silk.vercel.app/` (homepage)
- `https://minitools-silk.vercel.app/category/text-tools`
- `https://minitools-silk.vercel.app/category/image-tools`
- `https://minitools-silk.vercel.app/category/pdf-tools`
- `https://minitools-silk.vercel.app/category/converter-tools`
- `https://minitools-silk.vercel.app/tools/word-counter` (high-value tool)
- `https://minitools-silk.vercel.app/tools/pdf-to-word`
- `https://minitools-silk.vercel.app/tools/image-resizer`
- `https://minitools-silk.vercel.app/about`
- `https://minitools-silk.vercel.app/privacy-policy`

---

## Troubleshooting: If Pages Still Look Blank

If after all fixes, trust pages still appear blank on the live site:

1. **Check browser console** (DevTools → Console)
   - Any red JS error?
   - If yes, screenshot it and report back

2. **Check network tab** (DevTools → Network)
   - Does CSS file load (index-*.css)?
   - Does JS bundle load (index-*.js)?
   - Any 404s on assets?

3. **Disable dark mode**
   - Is text visible in light mode?
   - If yes, issue is dark mode CSS

4. **Try in incognito window**
   - Browser extension could be blocking CSS/JS
   - Incognito window has no extensions

5. **Clear browser cache**
   - Cache might have old version without Typography CSS
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## Success Indicators

When all checks pass, you should see:

✅ All 4 trust pages render with visible content
✅ Footer links on every page
✅ Privacy Policy names both ad networks explicitly
✅ Raw HTML (view-source) has SEO content pre-rendered
✅ No browser console errors
✅ No placeholder ad slots (1234567890)
✅ Adsterra loads on airtightmodification.com domain

Then you're ready to tick "I confirm I fixed the issues" in AdSense and request re-review.
