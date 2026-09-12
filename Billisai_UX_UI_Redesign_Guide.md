# Billisai — UX/UI Redesign Guide

## 1. Product Direction

**Billisai (பில்லிசை)** is a fun side project for Tamil music lovers.

Core concept:

> Search a Tamil movie/album → turn its songs into a funny hotel/restaurant bill.

The product should feel like a **fun, shareable music experience**, not an admin tool or technical Spotify integration.

### Core UX philosophy

Current feeling:

> “A sophisticated system that converts Spotify album data into a hotel bill.”

Target feeling:

> **“Give me your favourite album. I'll make you a ridiculous bill. 😂”**

The main experience should be:

**Search → Generate → Surprise → Download / Share**

---

# 2. Brand Name

## Change the name to: BILLISAI

### English

**BILLISAI**

### Tamil

**பில்லிசை**

The name combines:

- **Bill** — the generated hotel bill
- **Isai (இசை)** — music

It is short, memorable, playful, and immediately connected to the concept.

---

# 3. Tagline

Recommended primary tagline:

> **பாடலை கேள். பில்லை வாங்கு.**

English meaning:

> **Listen to the song. Get the bill.**

Alternative:

> **உங்கள் பாடல்களுக்கு ஒரு பில்.**

English:

> **Your songs, served as a bill.**

Use the first tagline for the main branding because it is shorter and more playful.

---

# 4. Remove the Existing "Isai Unavu Thayarippu Maiyam" Branding

Remove:

> இசை உணவு தயாரிப்பு மையம்

and avoid having too many names/concepts competing for attention.

The branding should be:

```text
BILLISAI
பில்லிசை

பாடலை கேள். பில்லை வாங்கு.
```

Do not use multiple names such as:

- Isai Mess
- ISAI MESS
- Musical Kitchen
- Isai Unavu Thayarippu Maiyam
- Hot Melodies

The product should have **one clear identity: Billisai**.

---

# 5. Homepage — Simplify Heavily

The current homepage contains too much information:

- Logo
- Isai Mess
- ISAI MESS
- Hot Melodies
- Musical Kitchen
- Turn Audio Albums into Hotel Bills
- Iconic Specials
- Spotify API status
- Search
- Printer status
- 3-step tabs
- Hotel details
- Bill preview
- Technical printer information

This makes the product feel like a developer/admin interface.

The homepage should communicate the concept within approximately **3 seconds**.

## Recommended homepage structure

```text
                    BILLISAI
                     பில்லிசை

              பாடலை கேள். பில்லை வாங்கு.

        Turn your favourite albums into
              ridiculous hotel bills.

       ┌─────────────────────────────────┐
       │  🎵 Search a movie or album...   │
       └─────────────────────────────────┘

          🔥 Try: Vaaranam Aayiram
               Roja • Ghilli • Master

                    [ Generate Bill ]
```

Keep the first screen focused almost entirely on the search experience.

---

# 6. Search Experience

Instead of technical copy such as:

> SEARCH SPOTIFY ALBUM & AUTO-FILL

Use human-friendly copy:

> **Search your favourite album**

Search placeholder:

> 🎵 Search for a movie or album...

Examples:

- Vaaranam Aayiram
- Roja
- Alaipayuthey
- 96
- Ghilli
- Master

The user should feel that they are simply searching for music, not interacting with an API.

---

# 7. Popular Albums

The existing "Iconic Specials" concept is good, but rename it.

Possible labels:

> **Popular orders**

or

> **Today's specials**

Recommended:

> **Popular orders**

Example:

```text
❤️ Roja
🔥 Vaaranam Aayiram
☕ Alaipayuthey
👑 Thalapathi
🌙 96
```

These should act as quick-search buttons.

---

# 8. Remove Technical Information From the Main UI

Hide/remove things such as:

> Official Spotify API Connected

> EPSON ISAI-900 THERMAL PRINTER

> SPOTIFY READY • 203 DPI

> Spotify HD Stereo / 320kbps

These are interesting from a development perspective but are not useful to a normal user.

Spotify is a **data source**, not the product.

If required, a small footer note can say:

> Album data powered by Spotify.

Do not make Spotify/API/printer status part of the main experience.

---

# 9. Keep the Thermal Receipt Aesthetic

Do NOT remove the thermal/hotel-bill visual identity.

The receipt/bill aesthetic is one of the strongest parts of the project.

Keep:

- Receipt paper appearance
- Thermal printer typography
- Dashed separators
- Monospace/typewriter details
- Slightly vintage appearance
- Hotel/restaurant receipt structure
- Tamil + English combination

However, the visual should communicate this naturally.

There is no need to tell the user:

> EPSON ISAI-900 THERMAL PRINTER — 203 DPI

The design itself should communicate the receipt concept.

---

# 10. Mobile UX

The mobile experience should be extremely simple.

## Main flow

```text
Search
  ↓
Generate
  ↓
View Bill
  ↓
Download / Share
```

Do NOT make the user go through a multi-step editing workflow.

The mobile experience should prioritize:

1. Search
2. Generate
3. View bill
4. Download
5. Share

---

# 11. Hide the Editor on Mobile

The current editor contains many fields:

- Hotel/Mess Name
- Subtitle
- Head Chef
- Studio
- Audio Label
- Date
- Bill Number
- Table Number
- Chef Title

This makes mobile interaction unnecessarily complicated.

### Recommended mobile UI

```text
BILLISAI
பில்லிசை

பாடலை கேள். பில்லை வாங்கு.

[ Search album... ]

🔥 Popular

Vaaranam Aayiram
Roja
Alaipayuthey


        🧾 Your Bill

       [ BILL IMAGE ]

    [ ↓ Download Bill ]

         [ ↗ Share ]

      ⚙ Customize
```

The user should not have to edit the bill to get the result.

---

# 12. Do Not Completely Remove Customization

Customization can remain, but it should be secondary.

Use:

> **⚙ Customize Bill**

Only show the editor when the user explicitly asks for it.

For example:

```text
Customize your bill

Restaurant name
[ Isai Mess ]

Bill style

○ Classic
○ Street Mess
○ Premium Hotel
○ 1990s Tea Kadai

Chef title
[ இசை புலவன் ]

[ Apply ]
```

The default experience should never require this.

---

# 13. Let Billisai Create the Joke Automatically

Do not make users manually create the fake restaurant details.

Billisai should automatically generate humorous metadata.

For example:

```text
HEAD CHEF (COMPOSER):
Harris Jayaraj

COOKED AT (STUDIO):
Prasad Digital Studios

SERVED BY (LABEL):
Sony Music
```

This is part of the fun.

The user should search for an album and immediately see the generated joke.

### Principle

> **Don't ask the user to create the joke. Create the joke for them.**

---

# 14. Generated Bill Should Be the Star

The user is not really visiting the website to fill out a form.

They want to see:

> **“What would my favourite album look like as a hotel bill?”**

Therefore, after searching, the bill should feel like a reveal.

Suggested flow:

```text
Search album
      ↓
Generating...
      ↓
Cooking your bill...
      ↓
Order ready!
      ↓
Show receipt
```

A small loading/reveal animation can make the experience much more entertaining.

---

# 15. Simplify the Bill Information

The sample bill has many details.

Keep information that directly contributes to the music/bill joke.

## Keep

### Album

### Composer

### Studio

### Label

### Tracks

### Track duration

### Track price

### Total album duration

### Total amount

These directly connect the music to the restaurant-bill concept.

## Optional

These can remain if they add personality:

- Bill number
- Table number
- Date
- Time
- Chef title
- Restaurant name

## Remove or hide

Technical information that doesn't contribute to the joke:

- Spotify bitrate
- 320kbps
- Printer DPI
- Printer model
- API connection status
- Other developer/technical information

---

# 16. Make Track Duration = Price the Main Joke

This is one of the strongest ideas in the project.

Example:

```text
1. ADIYAE KOLLUTHEY       5:15    ₹5.15
2. NENJUKKUL PEIDHIDUM    6:09    ₹6.09
3. YETHI YETHI            4:53    ₹4.53
```

This should remain central.

The user immediately understands:

> The longer the song, the more expensive it is.

That is the core joke.

---

# 17. Make the Total Visually Important

Example:

```text
────────────────────────────

SUBTOTAL (7 TRACKS)       ₹34.61
SWARA GST (5%)             ₹1.73

────────────────────────────

TOTAL ALBUM DURATION:
35M 41S

NET AMOUNT: ₹36.34
```

The **NET AMOUNT** should be one of the largest elements on the receipt.

This is the punchline.

---

# 18. Add Funny Closing Messages

The bill can have a rotating funny message at the bottom.

Examples:

> **Payment accepted in feelings.**

> **No refunds on replay value.**

> **You owe us 35 minutes of your life.**

> **Melody served hot & spicy.**

> **Thank you. Please replay again.**

This increases the shareability of the generated bill.

---

# 19. Download + Share

The generated bill is shareable content.

Therefore, the primary actions should be:

```text
[ ↓ Download Bill ]

[ ↗ Share ]
```

Not:

> Edit Bill

Not:

> Back to Step 1

Not:

> Change metadata

The most important user actions are:

**Download** and **Share**.

This is especially important for WhatsApp and Instagram sharing.

---

# 20. Desktop Layout

Desktop can keep a two-column layout.

Recommended:

```text
┌───────────────────────┬──────────────────────┐
│                       │                      │
│       SEARCH          │                      │
│                       │     BILL PREVIEW     │
│       ALBUM           │                      │
│       DETAILS         │                      │
│                       │                      │
└───────────────────────┴──────────────────────┘
```

However, simplify the left side.

Do not show every generated metadata field by default.

The generated bill should remain visually dominant.

---

# 21. Mobile Layout

Mobile should be one-column:

```text
┌──────────────────────────────┐
│          BILLISAI             │
│           பில்லிசை            │
│                              │
│    பாடலை கேள். பில்லை வாங்கு. │
│                              │
│ [ 🎵 Search album... ]       │
│                              │
│ Popular orders               │
│                              │
│ ❤️ Roja                     │
│ 🔥 Vaaranam Aayiram         │
│ ☕ Alaipayuthey              │
│                              │
│        ↓                     │
│                              │
│      🧾 YOUR BILL            │
│                              │
│       [ BILL ]               │
│                              │
│ [ ↓ Download Bill ]          │
│ [ ↗ Share ]                  │
│                              │
│ ⚙ Customize Bill             │
└──────────────────────────────┘
```

---

# 22. Remove the 3-Step Wizard From the Main Experience

Current:

```text
1. Dish & Movie
2. Tracks
3. Bill Style
```

This makes the website feel like an admin/form application.

Replace the concept with:

```text
🎵 Pick an album
       ↓
🍽️ We cook the bill
       ↓
🧾 You get the receipt
```

This can optionally appear lower on the homepage as a small explanation.

It should not control the main interaction.

---

# 23. Consider Bill Styles

This can be a future feature that makes the project more fun.

Possible styles:

### 🍽️ Classic Hotel

Traditional South Indian hotel bill.

### 🥘 Madurai Mess

More local/mess-style visual treatment.

### ☕ Tea Kadai

Simple, old-school tea-shop receipt.

### ⭐ 5-Star Hotel

Overly premium and serious.

### 🛵 Night Biryani Shop

Late-night street-food style.

### 😂 Budget Mess

Cheap and intentionally funny.

The same album can generate different-looking bills.

This is more engaging than making users manually edit many fields.

---

# 24. Logo Direction

The logo should be simple.

Avoid a complicated chef/music illustration.

Recommended concept:

### ₹ + Musical Note

A combination of:

- Rupee symbol
- Musical note
- Receipt

Possible visual:

```text
┌───────┐
│  ₹ ♪  │
└───────┘
```

The bottom edge can have a tiny thermal-receipt tear.

Alternative:

- Musical note inside a receipt
- "B" combined with a musical note
- Receipt icon containing ₹ and ♪

The logo should work at small sizes, especially:

- Browser favicon
- Mobile header
- Social media profile
- Bill watermark

---

# 25. Tamil + English Branding

Tamil should be an intentional part of the identity.

Recommended header:

```text
BILLISAI
பில்லிசை

பாடலை கேள். பில்லை வாங்கு.
```

Generated bill:

```text
இசை உணவகம்

VAARANAM AAYIRAM
வாரணம் ஆயிரம்
```

This creates a strong Tamil-music identity without making the UI difficult for non-Tamil readers.

---

# 26. What the Product Should NOT Feel Like

Avoid making it feel like:

- An admin panel
- A Spotify developer demo
- A printer configuration screen
- A restaurant POS system
- A form builder
- An invoice generator
- A database viewer

The technical complexity should stay behind the scenes.

---

# 27. What the Product SHOULD Feel Like

Billisai should feel:

- Fun
- Nostalgic
- Tamil
- Music-focused
- Slightly ridiculous
- Playful
- Shareable
- Screenshot-worthy
- Fast
- Easy

The user should be able to generate a bill in seconds.

---

# 28. Recommended Final Homepage

Use this as the target structure:

```text
                    BILLISAI
                     பில்லிசை

              பாடலை கேள். பில்லை வாங்கு.

        Turn your favourite albums into
              ridiculous hotel bills.

       ┌─────────────────────────────────┐
       │  🎵 Search a movie or album...   │
       └─────────────────────────────────┘

              Popular orders

      ❤️ Roja
      🔥 Vaaranam Aayiram
      ☕ Alaipayuthey
      👑 Thalapathi
      🌙 96

                    ↓

            Generate your bill


────────────────────────────────────────────

              How does it work?

             🎵 Pick an album
                    ↓
             🍽️ We cook the bill
                    ↓
             🧾 Get your receipt


────────────────────────────────────────────

                  BILLISAI
           Made for music lovers.
```

---

# 29. Recommended Final Bill Experience

After the user searches:

```text
Vaaranam Aayiram
```

Show:

```text
Preparing your order...

🍳 Cooking songs...
```

Then:

```text
                 🧾

              BILLISAI
             இசை உணவகம்

          VAARANAM AAYIRAM
             வாரணம் ஆயிரம்

          "Harris Jayaraj
          Special Audio Feast"

────────────────────────────────

BILL NO: SPOTIFY-762
TABLE: TABLE AUD-7.1

DATE: 08-OCT-2008

HEAD CHEF:
Harris Jayaraj

COOKED AT:
Prasad Digital Studios

SERVED BY:
Sony Music

────────────────────────────────

#  ITEM / TRACK       TIME    AMT

1. ADIYAE KOLLUTHEY   5:15   ₹5.15
2. NENJUKKUL...       6:09   ₹6.09
3. YETHI YETHI        4:53   ₹4.53
4. MUNDHINAM          5:41   ₹5.41
5. OH! SHANTHI...     3:03   ₹3.03

────────────────────────────────

SUBTOTAL              ₹34.61
SWARA GST (5%)         ₹1.73

TOTAL DURATION       35M 41S

          NET AMOUNT: ₹36.34

────────────────────────────────

       Payment accepted in feelings.

          [ ↓ Download Bill ]

              [ ↗ Share ]

           ⚙ Customize
```

---

# 30. Implementation Priority

Do not try to change everything simultaneously.

Implement in this order:

## Phase 1 — Branding

- Rename to **Billisai**
- Add **பில்லிசை**
- Add new logo
- Replace old branding
- Add new tagline

## Phase 2 — Homepage

- Remove unnecessary technical information
- Simplify header
- Make search the hero element
- Improve popular album chips
- Remove unnecessary status indicators

## Phase 3 — Mobile UX

- Hide editor by default
- Remove multi-step wizard
- Search → Generate → Bill
- Make Download + Share prominent
- Keep Customize as secondary

## Phase 4 — Bill

- Simplify metadata
- Keep music-related information
- Make track-duration pricing obvious
- Make total amount prominent
- Add humorous footer messages

## Phase 5 — Polish

- Bill reveal animation
- Loading/cooking animation
- Better receipt texture
- Better Tamil typography
- Share-friendly output
- Bill styles

---

# 31. Final UX Rule

Whenever deciding whether an element belongs in the UI, ask:

> **Does this make the music → bill joke more fun or easier to understand?**

If yes → keep it.

If it is only useful for developers → hide it.

If it makes the user fill out unnecessary information → remove it.

If it makes the generated bill more shareable → prioritize it.

---

# Final Product Flow

The ideal Billisai experience is:

```text
                BILLISAI
                 பில்லிசை

          பாடலை கேள். பில்லை வாங்கு.

                   ↓

        Search favourite album

                   ↓

          Select Vaaranam Aayiram

                   ↓

             Cooking...

                   ↓

             🧾 BILL READY

                   ↓

          See funny hotel bill

                   ↓

       [ Download ]   [ Share ]

                   ↓

              😄 Done.
```

## The goal

**Make the user smile within 10 seconds.**

The product does not need to be complicated.

The fun comes from the absurdity of turning something emotional and nostalgic — a favourite Tamil album — into an overly serious restaurant bill.
