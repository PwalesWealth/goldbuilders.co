# GoldBuilders Co. — Client Portfolio, Ecosystem Pages & LuxeStreams Club Update

## Included
- Six exact client logo images supplied in the conversation are stored locally under `public/assets/images/client-logos/` and used for Owenico Consult, AirPockets Global, Stellite Energy, ThriveTech Africa, Kesley Greens Farms and SWAP Technologies Limited.
- The Parallex Bank and Spectrum Microfinance Bank logo positions remain in the portfolio; their logo images are referenced from public social/profile image URLs and therefore require a live connection to load. Replace with approved local originals if you have them.
- The same engagement summaries appear on the home page and Case Studies page. No testimonial quotes or quantified results have been invented.
- Dedicated pages added for YIELD Global Impact, YIELD Global Fellowship, School of Impact, Inspire Generation NEXT / NEXT Community, The Driven Life / 10X Community, WeCare Foundation, and Marketplace Ministry / NEXT Missions.
- Shared Subsidiaries menu updated across public pages. Ecosystem and subsidiaries directory pages and Site Directory now link to the added pages.
- LuxeStreams Concierge page now links to a dedicated LuxeStreams Concierge Club signup experience based on the uploaded AirPockets club page design.
- The LuxeStreams signup is connected to `POST /api/luxestreams-club`, saves records to SQLite, and notifies the configured `NOTIFY_EMAIL` inbox if SMTP is configured. It is also included in the admin leads response.

## Form behaviour and important service boundaries
- The Club form requires contact consent, stores optional marketing consent separately, and does not ask for financial account credentials or identity documents.
- Credit interest is an enquiry only; it does not constitute a loan application, pre-approval or a promise of lending.
- Travel and logistics requests are not bookings until availability, final pricing and supplier/service terms have been agreed.
- The site package is prepared for deployment, not deployed to live hosting by this update. For submissions to work, publish the updated static `public/` folder with the Node.js backend, use a persistent writable SQLite path, and configure `NOTIFY_EMAIL` and SMTP variables in the hosting environment.

## Logo sources
- Six client marks: supplied by the user, retained as local image assets.
- Parallex Bank: public profile logo image URL from the official brand's public X profile search result.
- Spectrum Microfinance Bank: public image URL surfaced by the bank's LinkedIn company profile search result.

## Key files changed
- `public/index.html`, `public/case-studies.html`, `public/assets/css/client-engagements.css`
- `public/subsidiaries/luxestreams.html`, new `public/subsidiaries/luxestreams-club.html`
- `public/assets/css/luxestreams-club.css`, `public/assets/js/luxestreams-club.js`
- `public/ecosystem/*.html` new initiative pages, `public/subsidiaries.html`, `public/ecosystem.html`, `public/sitemap.html`
- `server.js`, `database-schema.sql`, `data/ecosystems.json`
