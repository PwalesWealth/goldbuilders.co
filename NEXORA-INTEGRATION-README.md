# Nexora integration for GoldBuilders Co.

## What was added
- `public/nexora.html`: the Nexora Business-In-A-Box offer page, retaining its layout, deliverables, packages and prices.
- Top-level Nexora navigation links and footer shortcuts across the public site.
- New homepage and Services page panels leading to the detailed offer page.
- A live setup-consultation form connected to `POST /api/nexora-leads`.
- SQLite storage in `nexora_leads`, SMTP alert support using the site's existing mail configuration, and protected admin-dashboard listing/counts.
- Restored editorial stylesheet rules used by existing Insight and Blog listing/article pages, which were missing in the live-forms package.

## Form and deployment notes
- Run `npm install`, configure `.env` using `.env.example`, and start with `npm start`.
- Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and optional `SMTP_FROM` to send email alerts. `NOTIFY_EMAIL` defaults to the existing site notification inbox.
- If SMTP is not configured, valid Nexora requests are still saved and displayed in the admin dashboard; the form communicates this to the requester.
- Protect the existing admin account and replace the placeholder session secret before production deployment.

## Smoke test
1. Open `/nexora.html` and submit a test setup enquiry.
2. Confirm the form reports a saved request rather than a fabricated success.
3. Sign in at `/admin/login.html` and check the `Nexora Setup Leads` count and `Nexora Setup` row.
4. Verify your email alert after SMTP configuration.


## Navigation path compatibility fix

Nexora links use paths relative to each page (for example `nexora.html` on top-level public pages and `../nexora.html` in subdirectories). This supports deployment at a domain root, inside a subfolder, and local preview without breaking navigation. Confirm that `public/nexora.html` is uploaded alongside `public/index.html` when deploying.
