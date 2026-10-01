# ellura® India — D2C store

The brand site and shop for ellura®, the urinary tract health supplement from Pharmatoka.
It has 22 routes under `/ellura`, one per row of the sitemap CSV, plus a 404 page.

## Stack
- React 18, TypeScript and Vite. The setup matches the Pharmatoka corporate site.
- React Router 6. Every page except Home is lazy-loaded.
- GSAP 3.13 with ScrollTrigger and SplitText, plus `@gsap/react` (`useGSAP`) so every animation is scoped and cleaned up on unmount.
- Lenis for smooth scrolling, driven by the GSAP ticker. It is off under reduced motion.
- No CSS framework and no icon library.

```bash
npm install
npm run dev       # http://localhost:5173  (/ redirects to /ellura)
npm run build     # type-check + production build → dist/
npm run preview
```
Deep links need an SPA fallback: `public/_redirects` handles Netlify, and other hosts need a rewrite of all paths to `index.html`.
Set `VITE_SITE_URL` if the production origin isn’t `https://pharmatoka.in`. It is used for canonical URLs, Open Graph and JSON-LD.

## Design system (`src/styles/tokens.css`)
| Token | Value | Source |
| --- | --- | --- |
| Plum | `#5A2E58` | Sampled from the supplied logo |
| Lilac | `#D0A6D8` | The carton’s lilac band |
| Label cream | `#EFE9DD` | The bottle label |
| Paper | `#FAF7F2` | Background of the official pack shots, so they sit seamlessly on the page |
| Cranberry | `#A3213F` | Used sparingly: savings, cart count |
| Type | Fraunces (display, soft optical serif) · Open Sans (UI and body, matching the label and wordmark) · IBM Plex Mono (scientific annotations) | |

The signature shape is the **arch**, which echoes the carton’s curve. The four-heart clover from the mark is redrawn as a vector motif.

## Architecture
```
src/
  commerce/   types · catalog (SKUs, prices, label facts) · pricing · cart (context + localStorage)
              adapter.ts ← THE integration point (checkout, promos, tracking, accounts, reviews, forms)
  content/    brand · faqs · articles · references · reviews · policies · images · nav · search
  lib/        gsap · smooth (Lenis) · useReveals (declarative motion) · useDialog · useMeta (SEO)
  components/ layout (Header, Footer, Loader, MobileMenu, SearchOverlay) · commerce (CartDrawer, Price…)
              home (all homepage sections) · product (Gallery, BuyBox, ProductDetails, ReviewsWidget) · ui
  pages/      one file per CSV row
```
Shopping logic never imports UI, and UI never calls a vendor SDK. To go live, implement `CommerceAdapter` in `src/commerce/adapter.ts` against the chosen platform and payment gateway, then export it as `commerce`.

## What still needs credentials or decisions
- **E-commerce platform and payment gateway** (to be confirmed by the web vendor). Checkout runs as a clearly labelled *preview*: it validates the form and shows a preview confirmation, and **no payment is taken and no order is created**.
- **Accounts, order tracking, newsletter, notify-me, reviews and support forms** all go through the adapter and are labelled as previews.
- **India prices for 90 and 180 capsules**, shipping and returns figures, and legal entity details. See `content-sources.md`.

## Motion
- **Homepage:** a hero intro timeline with pointer parallax and a layered scroll exit, a velocity-reactive marquee, an auto-looping UGC reel (pausable), a scroll-drawn US→India route, a scrubbed quote reveal, a scroll-driven “How it works” diagram (CSS-sticky, no pin), an animated anti-adhesion chart, stacked product cards with depth, pinned horizontal habit cards, and a footer wordmark reveal.
- **Inner pages:** a pinned horizontal timeline (Our Story), a fan-in of study cards (Science), a progress line (Subscribe), a reading progress bar and filter transitions (Learn), and a gallery with directional wipes and zoom (product page).
- **Declarative reveals:** `data-split`, `data-fade`, `data-stagger`, `data-img`, `data-arch`, `data-parallax`, `data-count`, `data-draw`.
- `gsap.matchMedia()` separates desktop from mobile behaviour (pins are desktop-only) and handles `prefers-reduced-motion`. Under reduced motion nothing is hidden, nothing auto-plays, and the loader is skipped.
