# Nexora consultation form — troubleshooting and fallback fix

## Why the button can fail

The Nexora page posts the form to `POST /api/nexora-leads`. That endpoint is implemented in `server.js` and saves submissions to the `nexora_leads` SQLite table. If the live host serves only the HTML page, runs an older backend build, exposes the API under a different path, or the Node application is stopped/crashing, the browser cannot complete the request. Missing SMTP credentials by themselves should not stop the lead from being saved; they only prevent email notification, and the form should report that separately after a successful API response.

The live hosting logs / browser Network response are needed to identify which deployment condition is occurring. This package does not claim to have deployed or inspected the live server.

## What this update changes

- Keeps the database submission to `POST /api/nexora-leads` as the primary path.
- Adds a 15-second request timeout so an unresponsive API does not leave the button spinning indefinitely.
- If submission fails or the API does not confirm success, shows an explicit message and a prefilled WhatsApp handoff to `+234 802 284 8749` with name, email, phone, package and goals.
- Does not display a false success message or claim the request was stored when the API did not confirm it.
- Does not change the server routes, database schema, pricing, or the rest of the website.

## Deployment

Merge `public/nexora.html` into the deployed site's existing `public/` directory. If database lead capture is required, also confirm that the Node.js app from this website package is running and that `POST /api/nexora-leads` is available on the same domain. After deploying, test both the successful database path and the WhatsApp fallback. Check browser Developer Tools → Network → `nexora-leads` and hosting logs to diagnose the underlying API outage.
