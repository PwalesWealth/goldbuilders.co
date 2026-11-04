# Nexora Solutions & Pricing — Additive Update

This update adds `public/nexora-solutions.html`, a responsive solution-pricing page based on the uploaded `pricing.txt` interaction pattern. It keeps the existing GoldBuilders site CSS, shared navigation and footer, and does not remove existing pages or rewrite the current Nexora Business-In-A-Box offer.

## What changed
- New reusable solution selector for four consulting pillars: Business Transformation & Strategy; HR & Leadership; Revenue Operations & Finance; Digital, Brand & Technology.
- Selectable service cards show indicative starting prices and a live estimate, separating one-off project fees from monthly retainers.
- Consultation modal creates a prefilled WhatsApp enquiry for **+234 802 284 8749**. The visitor reviews and sends the WhatsApp message; selecting services does not charge or book the visitor.
- Contact details shown on the new page: **+234 802 284 8749** and **info@goldbuilders.co**.
- Existing `public/services.html` gains a “View Solution & Pricing” CTA on each of its four solution cards, routed to the matching solution area.
- `public/sitemap.html` and the Packages dropdown on the new page link to the new page.

## Pricing note
New consulting fee figures on this page are proposed starting prices for review, not previously confirmed tariff data. Existing Nexora published tiers are preserved: Starter Infrastructure ₦1,000,000; Growth & Visibility ₦2,500,000; Enterprise Stack ₦6,000,000; Custom Implementation — custom quote. The Digital solution area references Starter and Growth/Visibility with those existing prices. Review proposed fees and scope before publishing live.

## Deployment
Merge the contents into the current website's existing folder structure (do not delete or replace the existing website folder). The main new file is `public/nexora-solutions.html`; the modified `public/services.html` and `public/sitemap.html` add links. No database migration or backend change is required; the new consultation path opens WhatsApp and does not claim to save leads to the website database.
