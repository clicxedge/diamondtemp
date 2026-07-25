# scope.md — JKP Jewellers (project: diamondtemp)

## Rebrand phase — 2026-07-26
Full overwrite of the previous "White Diamond" build with a new design/content system
supplied by the user: `JKP-Jewellers.html` (a Claude Design bundled export — black/gold
luxury jewellery aesthetic), a 150-row dummy product catalog
(`150_Dummy_Jewellery_Products_Category_Wise.xlsx`), and two reference photos of a
gold-jewellery model used as the hero image. Owner: Rounak (via ClicxEdge identity).
Developer: Vedant. Same repo/deploy target as before (`diamondtemp` → ClicxEdge) — only
brand, design, and catalog changed, not infrastructure.

## What this is
A frontend-only (no real backend/payments) Indian jewellery ecommerce site under the
"JKP Jewellers" brand, headless-storefront-style data layer (product/category objects
decoupled from UI, Shopify-like shape) with dummy catalog data only — no real Shopify
backend integration was created or requested to be created this phase.

## Stack
- React + Vite + TypeScript, react-router-dom (SPA).
- Tailwind CSS v4 (`@theme` tokens) for the exact JKP black/gold palette.
- Animation: framer-motion (drawers/menus), GSAP + ScrollTrigger (`Reveal` scroll-ins),
  Locomotive Scroll v5/Lenis (smooth scroll).

## Design system (from JKP-Jewellers.html export, do not deviate)
- Full dark theme site-wide (confirmed from the export's own Home/Shop/Product markup,
  all sections use near-black backgrounds — this is the deliberate JKP brand identity,
  not a generic dark-mode default).
- Colors: near-black `#0d0a07`/`#17130e` (bg/panels), gold `#c9a24b`, champagne
  `#e6c56f` (accents/headings), cream `#f5efe0`/`#f4ecd8` (body text), rose `#e2495f`
  (wishlist/deal accent).
- Fonts: Playfair Display (headings), Pinyon Script (hero display headline), Mulish
  (body/UI sans).

## Pages / routes
- `/` — Hero (script headline "Where Every Jewel Tells a Story", hero model photo,
  5-badge trust bar), Shop by Category (10 tiles), Browse Latest Collections (3),
  Bestsellers, Crafted-by-hand video feature, gold Store Locator band, Testimonials,
  About Us.
- `/shop?cat=` — promo banner, filter sidebar (Price / Metal / Colour — matches the
  catalog's Material+Color columns), responsive product grid.
- `/product/:slug` — gallery, price, size selector, buy-now/cart, certs row, reviews,
  WhatsApp CTA in place of a fabricated phone number.

## Catalog (real data, not invented)
150 SKUs generated from `150_Dummy_Jewellery_Products_Category_Wise.xlsx` — 10
categories × 15 products (Rings, Earrings, Necklaces, Bracelets, Bangles, Anklets,
Pendants, Brooches, Maang Tikka, Nose Pins), each with sku/name/material/color/price
taken directly from the sheet. Placeholder image URLs in the sheet were replaced with
real free-to-use Unsplash stock photos (2 per category, cycled across the 15 SKUs in
that category) since the sheet's own `via.placeholder.com` links are not real photos.

## Cart / commerce
Unchanged from prior phase: client-side Context + localStorage cart and wishlist, INR
pricing, no real checkout/payment gateway ("Buy Now" adds to cart, clearly a demo).

## WhatsApp integration (new this phase)
Inline "Chat on WhatsApp" links (Product page contact line, Footer) + floating badge
(all pages) per constitution rule 3. **`src/lib/whatsapp.ts` ships a placeholder phone
number (`910000000000`) — this must be replaced with JKP Jewellers' real WhatsApp
business number before going live.**

## Explicitly out of scope (this phase)
- Real Shopify backend/Admin API integration (a connected Shopify MCP store exists for
  a different project — TRS Musical — not this one; no new Shopify store was created).
  "Headless Shopify format" was interpreted as a headless-storefront data-layer pattern,
  not a live Shopify backend, consistent with the standing "dummy data only" decision.
- Real payment gateway, user accounts/auth, real product photography.

## Deploy target
Same as before: Vercel project `diamondtemp` → `diamondtemp.vercel.app`, ClicxEdge
identity. Ask before any `vercel --prod` push.

## QA bar before calling a phase done
Responsive at 360/768/1024/1440 (verified via DOM assertions — no horizontal overflow,
no broken images, zero console/page errors across Home/Shop/Product), all 10 category
filters return their full 15 products, cart/wishlist persist across reload, WhatsApp
links resolve to a valid `wa.me` URL, production build (`npm run build`) passes clean.
