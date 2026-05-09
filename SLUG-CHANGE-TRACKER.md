/**
 * ====================================================
 * SLUG CHANGE MANAGEMENT CHECKLIST
 * ====================================================
 * 
 * Use this file to track and document all slug changes
 * to maintain SEO rankings across updates.
 */

# Slug Change History & Redirects

## ✅ Overview

This document tracks all slug changes made to blog posts.
When a slug is changed, Google must know about the redirect
to preserve the post's search ranking and traffic.

---

## 📋 Change Log

### Format:
- **Date Changed:** YYYY-MM-DD
- **Post Title:** [Title of the blog post]
- **Old Slug:** [slug-that-was-used]
- **New Slug:** [slug-now-being-used]
- **Reason:** [Why the slug was changed]
- **Status:** [Submitted to GSC / Verified Working]

---

### Template Entry:

```
Date: 2026-05-08
Title: [Post Title Here]
Old: [old-slug]
New: [new-slug]
Reason: [improvement reason]
Status: ⏳ Pending
```

---

## 🔄 Current Redirects

Add completed slug changes here:

| Old Slug | New Slug | Date | Status |
|----------|----------|------|--------|
| | | | |

*No redirects configured yet. Add entries above as you make changes.*

---

## 📌 Implementation Steps for Each Change

### 1. Update the Post Slug in posts.js
\`\`\`javascript
// Find your post in src/data/posts.js
{
  id: 1,
  title: "Your Post Title",
  slug: "new-slug-here",  // ← CHANGE THIS
  // ... rest of fields
}
\`\`\`

### 2. Add to slugRedirects.js
\`\`\`javascript
// In src/config/slugRedirects.js
export const slugRedirects = {
  "old-slug-here": "new-slug-here",  // ← ADD THIS LINE
};
\`\`\`

### 3. Verify Component Supports Redirects
Check your BlogPost.jsx component has:
\`\`\`javascript
import { slugRedirects } from '@/config/slugRedirects';

// Inside component:
const actualSlug = slugRedirects[slug] || slug;
const post = allPosts.find(p => p.slug === actualSlug);
\`\`\`

### 4. Deploy Changes
\`\`\`bash
git add .
git commit -m "chore: redirect old-slug to new-slug"
git push origin main
# Wait for Vercel deployment to complete
\`\`\`

### 5. Verify Redirect Works
- Old URL: https://smartreadsblog.vercel.app/blog/old-slug
- New URL: https://smartreadsblog.vercel.app/blog/new-slug
- Both should work (old redirects to new)

### 6. Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Select your property
3. Go to "Pages" section
4. Look for the old URL
5. Click on it → View Indexation → Click "Request Indexing"
6. Or go to "Removals" and ensure it's not blocked

### 7. Monitor Over Time
- Check Google Search Console after 1-2 weeks
- Verify new URL shows up in index
- Check click data is attributed to new URL
- Old URL should eventually show as "Removed - replaced"

---

## ⚠️ What NOT to Do

❌ **Don't:** Delete old slugs without adding a redirect
❌ **Don't:** Use 302 redirect (temporary) instead of 301 (permanent)
❌ **Don't:** Change multiple slugs at once
❌ **Don't:** Forget to update internal links
❌ **Don't:** Deploy without testing redirects locally

---

## ✅ What SHOULD Happen

✓ Old URL remains accessible (redirects to new URL)
✓ User sees new URL in browser address bar
✓ HTTP status code is 301 (Moved Permanently)
✓ Search engines transfer ranking to new URL
✓ Analytics attribute traffic to new URL
✓ Sitemap automatically regenerates with new slug

---

## 🔍 Testing Checklist

For each slug change:

- [ ] Old slug still accessible (redirects to new)
- [ ] New slug displays correct post
- [ ] Sitemap.xml includes new slug
- [ ] Sitemap.xml doesn't include old slug
- [ ] Internal links point to new slug
- [ ] Deployed successfully to Vercel
- [ ] No console errors
- [ ] Google Search Console notified

---

## 📊 Before & After Metrics

Track SEO impact after making slug changes:

### Example Entry:

**Post:** League of Legends Worlds 2025
**Old Slug:** `league-of-legends-worlds`
**New Slug:** `lol-worlds-2025-showdown`

| Metric | Before | After (1 week) | After (1 month) |
|--------|--------|---|---|
| Indexed | ✓ | ✓ | ✓ |
| Search Visibility | 85 | 82 | 92 |
| Clicks/Month | 120 | 110 | 145 |
| Impressions/Month | 2.5K | 2.3K | 3.1K |
| Avg Position | 4.2 | 4.5 | 3.8 |

---

## 🆘 Troubleshooting

### Old URL Returns 404
- ✓ Check if redirect entry exists in slugRedirects.js
- ✓ Verify BlogPost.jsx component imports and uses slugRedirects
- ✓ Run `npm run generate-sitemap` to regenerate
- ✓ Clear browser cache and test in incognito

### Ranking Dropped After Change
- ⏳ Wait 1-2 weeks (Google needs time)
- ✓ Check Google Search Console for crawl errors
- ✓ Verify 301 redirect is working (use online tools)
- ✓ Check internal links point to new URL

### New URL Not Indexed
- ✓ Submit new URL to GSC manually
- ✓ Check robots.txt isn't blocking it
- ✓ Verify no noindex meta tag present
- ✓ Wait for next crawl

---

## 📞 When to Change Slugs

Good reasons to change a slug:

✓ Original slug had typos or grammar errors
✓ New slug is more keyword-rich
✓ New slug better matches content
✓ Improving slug naming convention across blog
✓ Consolidating duplicate content

---

## 📞 Support Resources

- [Google Search Central - URL structure](https://developers.google.com/search/docs/beginner/url-structure)
- [Google Search Console Help](https://support.google.com/webmasters)
- [301 vs 302 Redirects](https://moz.com/blog/301-redirects-preserving-seo-value)
- [Redirect Checker Tool](https://www.redirect-checker.org/)

---

**Last Updated:** 2026-05-08
**Document Version:** 1.0
