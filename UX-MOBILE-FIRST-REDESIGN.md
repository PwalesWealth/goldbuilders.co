# GoldBuilders Co. — Mobile-First UX Upgrade

This is an additive upgrade to the latest website package. Existing pages, content, pricing, service catalog, form handlers, API/database routes, WhatsApp destinations, and the gold/black visual identity are preserved.

## What changed

- Added an accessible three-image carousel on all 51 public-facing HTML pages. Images and slide messaging are selected by page type: strategy, programmes, finance, digital/technology, ecosystem, and editorial pages have relevant imagery and next-step links.
- Each carousel has previous/next controls, direct slide selectors, a slide counter, automatic rotation, keyboard controls, touch-swipe support, pause-on-hover/focus, and reduced-motion handling.
- Added a shared CSS layer for responsive mobile typography, 48px+ touch targets for major controls, visible focus states, responsive carousel layouts, mobile nav ergonomics, horizontal table scrolling, reduced-motion support, and bottom spacing so the floating WhatsApp shortcut is less likely to cover page content.
- Added a shared JS layer for carousel behavior, skip-to-content links, responsive table wrappers and a mobile navigation menu on the standalone Nexora offer page. Existing main-site navigation and form handlers remain in place.
- Kept the GoldBuilders gold/black styling with subtle gold borders, controls and image overlays. The standalone Nexora offer page retains its blue accents.
- Added shared styles/scripts with appropriate relative paths to all public pages. The internal Admin Login and Admin Dashboard are intentionally kept free of marketing carousels.

## Images

The carousel imagery is hosted by the Pexels CDN and is not copied into the ZIP. This reduces the download size but requires a visitor's browser to be online. Image sources and license reference are documented in `UX-IMAGE-SOURCES.md`.

## Validation

The upgrade was checked for JavaScript syntax, valid HTML parsing, a single three-slide carousel on every public page, image alt text, viewport metadata, and local links/assets. These checks do not replace real-device acceptance testing.

## Deployment

Deploy the full ZIP or merge the patch into the existing deployment. Do not replace the live `.env` file or production database. No database schema change is required. After deployment, test on real iPhone and Android devices, including menu open/close, dropdowns, swipes, touch controls, image loading, form submissions, and WhatsApp redirects.
