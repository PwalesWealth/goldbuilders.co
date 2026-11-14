
# GoldBuilders Co. Growth Platform

This package upgrades the original GoldBuilders homepage into a responsive multi-page consulting website plus a small Node/SQLite growth operations backend.

## Public pages
Home, About, Services, Industries, Who We Serve, Corporate Organizations, Government & Institutions, Programs, detailed program pages, Insights, Blogs, Case Studies, Resources, Partners, Careers, Ecosystem, Subsidiaries, Transformation Assessment, Executive Strategy Session, Contact, SkeelUP Africa profile and registration, Nexora Business-In-A-Box, and Site Directory.

## Admin / Database
- `/admin/login.html` — protected login
- `/admin/dashboard.html` — protected dashboard of consultation leads and SkeelUP registrations
- SQLite database: `data/goldbuilders.db`
- Tables: `admins`, `contact_leads`, `skeelup_registrations`, `assessment_results`, and `nexora_leads`. New Corporate / Government / programme enquiries reuse `contact_leads`; Nexora setup requests use `nexora_leads`.

## Setup
1. Install Node.js 18+.
2. Copy `.env.example` to `.env`.
3. Set a strong `SESSION_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.
4. Run `npm install`.
5. Run `npm run setup-admin`.
6. Run `npm start`.
7. Open `http://localhost:3000`.
8. Admin: `http://localhost:3000/admin/login.html`

## Production security
Do not use the sample `.env` values. Deploy behind HTTPS. Use a strong random session secret, a managed database or hardened server storage, backups, rate limits, access logging, role-based authorization, and a transactional email/form provider. The included public forms are wired to `/api/contact`, `/api/skeelup`, `/api/assessment`, and `/api/nexora-leads`. Persistent submissions require the Node.js server and SQLite backend to be deployed; a static-only upload will render the pages but cannot save records.

## Source/design basis
The supplied homepage was used as the starting point for the Gold/Dark theme, typography, navigation concept, positioning language, services, impact metrics and contact details.

## Ecosystem Expansion

Added a full ecosystem experience driven by the supplied roadmap:
- `public/ecosystem.html` — ecosystem overview + roadmap
- `public/ecosystem/kohen.html`
- `public/ecosystem/integrius.html`
- `public/ecosystem/vendare.html`
- `public/ecosystem/clinbox.html`
- `public/ecosystem/manajar.html`
- `public/ecosystem/genie.html`
- `public/ecosystem/dirent-africa.html`
- `public/ecosystem/skeelup-africa.html`
- `public/assets/images/ecosystem-roadmap.jpg` — supplied roadmap graphic
- `data/ecosystems.json` — structured ecosystem content

Naming: the source roadmap shows “OctaCare”; the website uses **ClinBox** as directed, with a note on the ClinBox page.
The $100B by 2040 and $1T-by-2050 figures are presented as strategic ambitions, not verified current valuations or revenue.


## Latest Additive Upgrade
- Global **Subsidiaries** dropdown added to the generated GoldBuilders and ecosystem pages.
- Added `public/subsidiaries.html` portfolio directory.
- Added detailed `LuxeStreams Concierge` and `BeMore Coaching Company` pages.
- Assessment now persists results to SQLite, creates a private result token, and redirects to a generated result page with dimension-level recommendations.
- Admin dashboard now includes assessment counts/records.
- Added `shared-subsidiaries-menu/` for integrating the same network dropdown into independently hosted ecosystem websites.
- Existing sections and prior ecosystem pages are preserved; these capabilities are additive.


## Insights & Blogs Article Reading Experience

The Insights and Blogs index cards now open full article pages:
- `public/insights/*.html` — six full-length editorial articles
- `public/blogs/*.html` — six full-length blog articles

Each article includes category, estimated reading time, full body with section headings, a table of contents, key takeaways, related reading, reading progress, and calls to action back to GoldBuilders resources, assessment and consultation.
Both index pages include article search and category filtering.
The article directory is recorded in `data/editorial-content.json` for later CMS integration.


## Nexora Business-In-A-Box integration

The public Nexora offer page is served at `/nexora.html`. Its setup consultation form posts to `POST /api/nexora-leads`; submissions are stored in the `nexora_leads` SQLite table and appear in the protected admin dashboard under “Nexora Setup Leads”. Email alerts use the same SMTP settings and notification inbox as the GoldBuilders forms. Configure SMTP in `.env` for email alerts; submissions are still stored in the database if SMTP is not configured.


## Complete Site Navigation and Detail Pages
- Main navigation includes **Who We Serve**, **Programs**, **Packages** (including **Nexora**), **Explore**, and **Subsidiaries**.
- `public/sitemap.html` is the full Site Directory and lists page destinations, program details, ecosystem profiles, and individual Insights / Blog articles.
- `public/corporate-organizations.html` — detailed corporate transformation pathway with a live enquiry form.
- `public/government-institutions.html` — detailed institutional capability and public-service transformation pathway with a live enquiry form.
- Program detail pages: `public/program-executive-strategy.html`, `public/program-leadership-development.html`, `public/program-corporate-workshops.html`, `public/program-talent-development.html`, and `public/program-bemore-coaching.html`.
- All newly added enquiry forms use the existing database-backed `POST /api/contact` path and appear in the protected consultation-lead feed.
- See `SITE-COMPLETION-AND-NAVIGATION.md` and `NAVIGATION-AUDIT.txt` for the update summary and audit notes.

## Latest client portfolio, ecosystem & LuxeStreams update (25 October 2026)

See `FINAL-ECOSYSTEM-AND-LUXESTREAMS-UPDATE.md` for the complete update notes. This version includes the six supplied client logos, the retained bank logo references, a consistent engagement-comment style, seven dedicated YIELD initiative pages, and the LuxeStreams Concierge Club signup journey. The signup endpoint is implemented in `server.js`; live submissions require deploying the Node.js app with persistent SQLite storage and configured SMTP notification variables.


## Packages and Subsidiaries — corrected menu separation
The main navigation has two separate dropdowns. **Packages** lists only the four offers: Nexora Business-in-a-box, Strategy and Transformation services, Leadership and Talent Programs, and Executive Strategy Session. **Subsidiaries** contains four expandable parent groups—GoldBuilders Co., LuxeStreams, Kohen, and YIELD Global Impact—with their relevant ventures and initiatives underneath. On mobile the same structure becomes an accessible tap-to-expand accordion. This correction preserves the existing programme, venture pages, forms, and backend. See `PACKAGES-SUBSIDIARIES-NAVIGATION-VALIDATION.txt` for the validation summary.


## GEI Trust & LeaderSHIFT institutional update (31 October 2026)
- Added `public/ecosystem/gei-trust.html` as the profile and activation hub for **Global Epicentre Innovation Trust (GEI Trust)**.
- The page explains GEI Trust's role as the talent, ecosystem and innovation management platform and institution-builder across GoldBuilders Co., Kohen and YIELD Global Impact.
- Replaced the old `LeaderSHIFT Activation` item in the YIELD portion of the shared Subsidiaries menu with **GEI Trust**. The page explains that the Trust is cross-ecosystem, not a YIELD-owned entity.
- Positioned LeaderSHIFT as GEI Trust's flagship activation vehicle, with Tour, Value Added Ticket (VAT) and Conference sections.
- Included the four source-backed Nigerian tour VAT tiers and their listed benefits / mission-support focus: SHIFT Access Pass, SHIFT Growth Pass, SHIFT Legacy Circle and SHIFT Nation Partner.
- Added the LeaderSHIFT Conference 2030 California flagship direction and the existing three-day LEADERSHIFT / REVENUESHIFT / MARKETPLACESHIFT programme framework. No exact venue, date, city, conference ticket prices or speaker line-up has been published because those details were not confirmed in the available planning materials.
- GEI Trust enquiries use the existing database-backed `POST /api/contact` route with a dedicated service label; no new database migration is required.

## HR & Leadership — HR Outsourcing Suite update (31 October 2026)
- Expanded the HR & Leadership solution on `public/services.html` and added a dedicated HR Outsourcing Suite section.
- Added Talent Recruitment & Selection, Background Checks, and Staff Verification with practical scopes and deliverables.
- Added quote-based selection options for the suite and each service in `public/nexora-solutions.html` under the People solution.
- Preserved existing HR advisory, leadership, organization-design, performance-management and monthly advisory offers.
- Added privacy, lawful-basis, confidentiality and fair-review safeguards. No unconfirmed prices were added.
- No database migration or backend endpoint change is required; the existing Nexora consultation flow handles custom-quote service selections.
- See `HR-OUTSOURCING-SUITE-UPDATE.md` for details.

## HR Outsourcing Suite Pricing Update
See `HR-OUTSOURCING-SUITE-PRICING.md` for the proposed rates, charging basis, scope boundaries and market reference points. The Services page and Nexora HR & Leadership catalogue display these indicative prices; final fees remain subject to a written scope and quotation.


## LuxeStreams, BeMore and ecosystem referral update (November 2026)
- LuxeStreams now displays a proposed non-member service menu for errands, dispatch, cleaning, procurement, travel planning and airport/visa administration. Club profile submission remains optional; one-off requests are supported.
- BeMore now publishes indicative individual coaching, executive coaching, group cohort, ARIS 10X, workshops, retreat and membership pricing. Monthly membership forms remain enquiry-based; no online recurring billing has been enabled.
- The public Referral Partner page (`/referral-partner.html`) registers partners and generates offer-specific links to GoldBuilders, LuxeStreams, BeMore, Kohen ventures and YIELD initiatives.
- Referral click and lead attribution is stored in SQLite. The admin dashboard includes referral partner performance. Leads submitted from supported forms carry the referral code.
- Referral partner applications are initially pending. Commissions and payouts are not automatic; management must approve a referral schedule and partner agreement before any payment is due.
- Existing `.env`, database and private admin records must not be overwritten when applying this patch. The server adds forward-only SQLite migrations for referral code columns and creates referral tables on startup.
