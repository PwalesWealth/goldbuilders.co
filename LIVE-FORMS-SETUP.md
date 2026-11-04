# GoldBuilders Co. — Live Forms + Database + Email Patch

This is a focused integration patch for the existing GoldBuilders World-Class Growth Platform. It does not rebuild the website. It connects the existing Contact form, SkeelUP Africa registration and Transformation Assessment to the existing Node.js + SQLite backend.

## Files in this patch

### Upload/replace inside the existing `public/` folder
- `public/contact.html` — connected to live Contact API
- `public/skeelup-signup.html` — connected to live SkeelUP registration API
- `public/assets/js/main.js` — sends forms to APIs; preserves mobile navigation, subsidiaries dropdown and assessment result redirect
- `public/assets/css/style.css` — appends submission status styles
- `public/assessment.html` — supplied as a safe copy; it already contains the correct form fields and works with the updated script
- `public/assessment-result.html` — supplied as a safe copy; it displays the private-token result returned by the API

### Place at the Node application root (NOT inside `public/`)
- `server.js` — database writes, assessment calculation and email notifications
- `package.json` — adds Nodemailer dependency
- `.env.example` — email destination and SMTP settings template
- `database-schema.sql` — reference schema

## What it does

1. Contact submissions are saved to `contact_leads`.
2. SkeelUP Africa registrations are saved to `skeelup_registrations`.
3. Assessment answers, score, tier and private result token are saved to `assessment_results`.
4. The user is redirected to `assessment-result.html?token=...`, where the page fetches the saved result from `/api/assessment/:token`.
5. The server attempts to send an email notification for each submission to `sdclimited.ng@gmail.com`. If mail delivery is not configured or the SMTP provider fails, the database record remains saved; the user receives a truthful status message.
6. The existing protected admin dashboard continues to show lead and assessment counts.

## Installation

**This is not a static-only website feature.** The server must run Node.js with its API routes. Uploading HTML/JS files to a static `public` folder alone cannot create server-side database records or send email.

1. Back up the existing website/app directory.
2. Upload the files under `public/` to the matching paths in the live `public/` folder, replacing only the included files. Do not delete other website files.
3. Put `server.js`, `package.json`, and `.env.example` in the Node app root (the same level as the current `server.js`, outside `public/`). Merge the `.env.example` values into the live `.env`; do not overwrite existing admin credentials or secrets blindly.
4. In `.env`, set `NOTIFY_EMAIL=sdclimited.ng@gmail.com`.
5. Configure an actual sender account via SMTP. For Gmail SMTP, `SMTP_USER` is the sending Gmail account and `SMTP_PASS` must be its App Password, not its normal password. A valid domain-host SMTP account can be used instead. `SMTP_FROM` should be an address the SMTP provider permits.
6. Run `npm install` (this installs Nodemailer according to the updated `package.json`) and restart the Node application.
7. Test `/api/health` on the live domain; it should return `{"ok":true,...}`.
8. Submit a test Contact form, a SkeelUP registration, and an assessment. Check the admin dashboard and `sdclimited.ng@gmail.com`.

## Email settings

`NOTIFY_EMAIL` sets the recipient inbox and defaults to `sdclimited.ng@gmail.com`. Recipient address alone is not enough to send outbound email; SMTP details are required. `.env.example` provides placeholders. Keep `.env` private, outside `public/`, and never upload it to a public static directory.

## Database

The existing SQLite database path remains controlled by `DB_PATH` (default `./data/goldbuilders.db`). The app automatically creates missing tables and adds missing columns. Keep the database directory persistent and writable by the Node process, and back it up regularly.

## Deployment note

The package's backend targets the Node/SQLite architecture already present in this project. If the live hosting account serves HTML only and does not run Node.js, the API files need to be hosted in a server environment; front-end uploads alone will not make the database live.


## Nexora Business-In-A-Box integration

The public Nexora offer page is served at `/nexora.html`. Its setup consultation form posts to `POST /api/nexora-leads`; submissions are stored in the `nexora_leads` SQLite table and appear in the protected admin dashboard under “Nexora Setup Leads”. Email alerts use the same SMTP settings and notification inbox as the GoldBuilders forms. Configure SMTP in `.env` for email alerts; submissions are still stored in the database if SMTP is not configured.
