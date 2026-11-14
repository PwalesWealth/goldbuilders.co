# GoldBuilders Co. website completion and navigation update

## What's changed
- Added a **Packages** navigation dropdown containing Nexora Business-In-A-Box and the site’s other relevant offers.
- Added an **Explore** dropdown for pages previously hard to discover: Executive Session, Partners, Resources, Industries, Case Studies, Transformation Assessment, Insights, Blogs, Ecosystem and Careers.
- Added direct navigation for Who We Serve and Programs; the Subsidiaries dropdown remains available.
- Standardized menus and footer links across root pages, ecosystem pages, subsidiary pages and articles/blogs, using folder-aware relative paths.
- Added detailed Corporate Organizations and Government & Institutions service pages.
- Added detailed program pages for Executive Strategy Programs, Leadership Development, Corporate Workshops & Retreats, Talent Development and BeMore Coaching.
- Linked homepage and Who We Serve audience cards to their corresponding detail pages; linked each program card to its detail page.
- All new institutional and programme enquiry forms use the existing `POST /api/contact` endpoint, which saves records into the existing `contact_leads` SQLite table and can send notification emails when SMTP is configured.
- Nexora requests continue using `POST /api/nexora-leads` and its existing `nexora_leads` database table.

## Pages linked in the navigation
**Primary:** Home, About, Services, Who We Serve, Programs, Packages, Explore, Subsidiaries, Contact.

**Explore dropdown:** Industries, Executive Session, Partners, Resources, Case Studies, Transformation Assessment, Insights, Blogs, Ecosystem, Careers and Contact.

**Packages dropdown:** Nexora Business-In-A-Box, Consulting & Transformation Services, Transformation Assessment and Executive Strategy Session.

**Who We Serve detail links:** Corporate Organizations (`corporate-organizations.html`) and Government & Institutions (`government-institutions.html`), plus cross-links for CEOs, HR leaders, commercial leaders, professionals and learners.

**Program detail pages:** `program-executive-strategy.html`, `program-leadership-development.html`, `program-corporate-workshops.html`, `program-talent-development.html`, `program-bemore-coaching.html`, plus the existing SkeelUP Africa profile and registration pages.

## Database and deployment
- Existing database schema and server API are preserved. These pages do not embed database credentials or access SQLite from the browser; forms post to the server.
- Deploy the full package to use forms. A static-only deployment without the Node.js backend will render pages but cannot persist form submissions.
- Configure `.env` based on `.env.example`, create the admin login using `npm run setup-admin`, and use valid SMTP credentials for email alerts.
- Test `/api/health`, contact form submission, Nexora form submission, login and the dashboard after deployment.
- These pages describe available engagement pathways; final scope, pricing, procurement steps and delivery commitments should be agreed individually before work begins.
