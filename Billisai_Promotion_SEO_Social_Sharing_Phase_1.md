# Billisai — Promotion, SEO & Social Sharing (Phase 1)

## Goal

Prepare Billisai for social-media promotion without adding dynamic bill URLs yet.

Focus on:
- Search/SEO basics
- Correct social link previews
- Strong Billisai branding
- Mobile-native sharing
- Fast loading
- Testing on WhatsApp, LinkedIn, Instagram, Telegram, Facebook and X

Do NOT implement dynamic bill URLs or individual bill pages in this phase.

## 1. Open Graph Image

Create a dedicated social preview image.

**Size:** 1200 × 630 px

Recommended file:

`/public/og-image.png`

The image should communicate:

**BILLISAI**  
**பில்லிசை**

> பாடலை கேள். பில்லை வாங்கு.

> Turn your favourite songs into a hotel bill.

Include a sample Billisai receipt/bill. Keep it clean and readable at small preview sizes.

## 2. Homepage SEO Metadata

```html
<title>Billisai — Turn Your Favourite Songs Into a Bill</title>

<meta
  name="description"
  content="Search your favourite Tamil albums and turn their songs into a fun hotel-style bill. Generate, download and share your music bill."
/>

<link rel="canonical" href="https://billisai.com/" />
```

## 3. Open Graph

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://billisai.com/" />
<meta property="og:site_name" content="Billisai" />

<meta
  property="og:title"
  content="Billisai — Turn Your Favourite Songs Into a Bill"
/>

<meta
  property="og:description"
  content="Search an album, generate a funny hotel-style bill from its songs, and share it with your friends."
/>

<meta
  property="og:image"
  content="https://billisai.com/og-image.png"
/>

<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta
  property="og:image:alt"
  content="Billisai — turn your favourite songs into a hotel bill"
/>
```

## 4. Twitter / X

```html
<meta name="twitter:card" content="summary_large_image" />

<meta
  name="twitter:title"
  content="Billisai — Turn Your Favourite Songs Into a Bill"
/>

<meta
  name="twitter:description"
  content="Turn your favourite songs into a funny hotel-style bill."
/>

<meta
  name="twitter:image"
  content="https://billisai.com/og-image.png"
/>
```

## 5. Favicon & Icons

Create:
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` — 180×180
- `icon-192.png` — 192×192
- `icon-512.png` — 512×512

Keep the icon simple: receipt + musical note, receipt + rupee symbol, or `B + ♪`.

## 6. robots.txt

Create `/public/robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://billisai.com/sitemap.xml
```

## 7. sitemap.xml

Initially:

```xml
<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://billisai.com/</loc>
  </url>
</urlset>
```

## 8. Google Search Console

Register `billisai.com` and submit:

`https://billisai.com/sitemap.xml`

Verify that Google can access and crawl the homepage.

## 9. Native Share

After a bill is generated, add:

```text
[ ↓ Download Bill ]

[ ↗ Share ]
```

On supported mobile browsers, use the Web Share API.

Example:

```js
const shareData = {
  files: [storyImageFile],
  title: "My Billisai Bill",
  text: "I turned my favourite album into a bill 😂"
};

if (navigator.canShare?.(shareData)) {
  await navigator.share(shareData);
}
```

Check support before calling `navigator.share()`.

On supported devices this lets the user choose available apps such as Instagram, WhatsApp, Telegram, Messages, etc.

Do not try to force a normal website directly into Instagram Stories.

## 10. Fallback

If native file sharing is unavailable:

```text
[ Download Story Image ]
```

Optionally provide:

```text
Open Instagram
```

## 11. Keep Image Types Separate

### Open Graph image
**1200 × 630**

Used for link previews.

### Instagram Story / WhatsApp Status
**1080 × 1920**

Used for full-screen mobile sharing.

### High-quality bill
Continue using the existing high-resolution bill output.

Do not use one image for all purposes.

## 12. Social Preview Testing

Test `https://billisai.com` on:

- WhatsApp
- LinkedIn
- Facebook
- Telegram
- X/Twitter

Check:
- Image
- Title
- Description
- Crop
- Logo visibility
- Click behavior

Social platforms may cache previews, so changes can take time to appear.

## 13. Structured Data

Add basic WebApplication JSON-LD:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Billisai",
  "url": "https://billisai.com",
  "description": "Turn your favourite songs into fun hotel-style bills.",
  "applicationCategory": "EntertainmentApplication",
  "operatingSystem": "Web"
}
</script>
```

## 14. Performance

- Compress the OG image
- Compress favicon assets
- Lazy-load non-critical images
- Avoid large assets before search
- Keep JS bundles reasonable
- Minimize unnecessary third-party scripts
- Test on mobile

## 15. Accessibility

Ensure:
- Logo/images have useful alt text
- Buttons have clear labels
- Search is accessible
- Color contrast is sufficient
- Keyboard navigation works

## 16. Recommended Bill Actions

```text
              🧾 BILL READY

             [ Bill Preview ]

       [ ↓ Download HD Bill ]

       [ 📱 Download Story ]

             [ ↗ Share ]
```

On mobile, make **Share** the preferred action when native sharing is supported.

## 17. Do NOT Build Yet

Leave these for a later phase:
- Dynamic bill URLs
- Individual bill pages
- Dynamic OG images per bill
- QR codes for individual bills
- User accounts
- Profiles
- Likes/followers
- Comments
- Social feed
- Complex SEO landing pages

## 18. Implementation Order

1. Create 1200×630 OG image
2. Add title + meta description + canonical
3. Add Open Graph + Twitter/X metadata
4. Add favicon and app icons
5. Add robots.txt + sitemap.xml
6. Set up Google Search Console
7. Add native Share button + fallback
8. Test WhatsApp, LinkedIn, Instagram, Telegram, Facebook and X
9. Optimize performance

## Success Criteria

A user should be able to:

1. Discover Billisai from search or social media.
2. Paste `billisai.com` into WhatsApp and see a good preview.
3. Paste it into LinkedIn and see a good preview.
4. Generate a bill.
5. Tap Share on mobile.
6. Choose Instagram, WhatsApp or another available app.
7. Fall back to downloading the Story image when native sharing is unavailable.

The goal of this phase is not more product complexity. It is to make the existing Billisai experience **easy to discover and easy to share.**
