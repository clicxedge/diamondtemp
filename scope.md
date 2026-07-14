# scope.md — White Diamond (project: diamondtemp)

Derived from the user's build request 2026-07-14 + the supplied Claude Design export
(`White Diamond Jewelry Site.zip`, contains `White Diamond.dc.html` — the authoritative
design source) + bluestone.com as the live-site design reference for anything the export
leaves ambiguous. Owner: Rounak (via ClicxEdge identity). Developer: Vedant.

## What this is
A frontend-only (no real backend/payments yet) Indian diamond-jewellery ecommerce site,
design-and-UX-first, exact-match to the supplied export, with a working client-side cart.
Dummy product data only — no real Shopify/DB integration this phase.

## Stack
- React + Vite + TypeScript, react-router-dom (SPA, not Next.js — no SSR need at this
  phase, matches the established trial stack from TRS Musical / KB Legal).
- Tailwind CSS for layout/utility, CSS custom properties for the export's exact palette.
- Animation: framer-motion (micro-interactions, page transitions), GSAP + ScrollTrigger
  (scroll reveals, pinned horizontal lookbook scroller — ported directly from the
  export's own `_initGsap` logic), Locomotive Scroll (smooth-scroll container, wired to
  ScrollTrigger via `scrollerProxy` so pinning/scrub still works).

## Design system (from the export, do not deviate)
- Colors: navy `#12213f` (header/footer/dark sections), gold `#b8892f` (accent/CTA),
  cream `#faf7f3` (page bg), blush `#fdeff1` (soft section bg), ink text `#1a2338`,
  champagne `#e6c98a` (on-dark accent).
- Fonts: Playfair Display (headings, serif, incl. italic accents), Jost (body/UI, sans).
- No neon/cyberpunk/space/glass-overload/dark-mode-default — export is already
  professional cream+navy+gold, matches constitution's design rules natively.

## Pages / routes
- `/` — Home: announcement marquee, sticky header w/ mega-menu, hero, category rail,
  promo strip (10+1 gold plan), collections (Nocturne/Lumen/Ether), bestsellers grid,
  video-feature + #WornInLight campaign, pinned horizontal lookbook scroller, design-led
  showcase, store-locator strip, testimonials, footer w/ newsletter.
- `/shop` (or `/shop/:category`) — breadcrumb, promo banner, filter sidebar (price/metal/
  occasion), responsive product grid, pincode + sort controls.
- `/product/:slug` — sticky gallery + thumbnails (incl. video thumbnail slots), price,
  making-charges offer, video-consult CTA, pincode check, size selector, buy-now / cart /
  10+1 plan buttons, returns/exchange/certified trust row, certs (BIS/SGL/IGI/GSI).

## Nav
Top utility bar (Stores / Wishlist / Bag / Account) + mega-menu category bar (All
Jewellery ▾ dropdown listing all 12 categories, plus direct links: Rings, Earrings,
Solitaires, Necklaces, Bracelets, Gifting, Offers). Every category in the dropdown
routes to `/shop` filtered by that category. Mobile: hamburger → slide-in drawer with
accordion category list.

## Cart / commerce
- Client-side only: React Context + localStorage. Add-to-bag from grid cards and PDP,
  quantity change/remove in a slide-in CartDrawer, running total.
- Wishlist: same pattern, heart-toggle on every product card + PDP.
- Currency: INR (`₹`), Indian digit grouping (`toLocaleString('en-IN')`). All export
  dummy prices re-expressed in INR (export's own `shopRaw` array is already
  INR-plausible, e.g. ₹91,686 — keep those; convert the smaller `rawProducts` USD-scale
  set to equivalent INR).
- No real checkout/payment gateway this phase — "Buy Now" adds to cart and opens the
  drawer (clearly a placeholder, not a real payment flow).

## Data
All dummy — 12 categories, ~9-12 products, 3 collections, 8 lookbook tiles, 3
testimonials, price/metal/occasion filter facets — lifted and extended from the export's
own `renderVals()` dataset. No fabricated real-brand claims; product names/specs are
generic ("Diamond Ring in 18Kt White Gold... with Diamonds (0.34 Ct)") same as export.

## Explicitly out of scope (this phase)
- Real Shopify/Supabase backend, real payment gateway, real product photography (use the
  export's own `diamond.png` + gradient/pattern placeholder tiles, same as the export
  itself ships placeholders for photos/video).
- User accounts / real auth.
- WhatsApp integration (not requested for this project; constitution's WhatsApp rule
  applies to lead-gen sites, not this ecommerce build — skip unless the user asks).

## Deploy target
- Vercel project `diamondtemp` → `diamondtemp.vercel.app`, under the **ClicxEdge**
  identity (GitHub `clicxedge`, Vercel team `clic-xe-dge`) per the user's instruction to
  use "clicxedge" identity for this new project.
- Local prod build (`npm run build`) must pass clean before any deploy. Ask before the
  actual `vercel --prod` push (standing deploy-discipline rule), even though the target
  URL was already named by the user in the original request.

## QA bar before calling a phase done
Responsive at 360/768/1024/1440, no overlap/overflow, no console errors, cart/wishlist
persist across reload, all nav dropdown links resolve, Lighthouse pass on perf/a11y/SEO
basics for a client-rendered SPA.
