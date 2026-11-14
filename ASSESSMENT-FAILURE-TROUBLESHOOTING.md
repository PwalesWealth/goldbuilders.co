# GoldBuilders Assessment Failure Fix — Deployment Notes

## What this update changes
- The assessment form reports more useful errors for a missing API, network failure, rate limit, or server/database failure.
- The result page no longer silently shows a fabricated zero-score result when a saved token cannot be retrieved.
- Assessment email notification is non-blocking, so a slow SMTP server cannot hold the visitor on the submit screen after the score has been saved.
- `GET /api/health` now checks that the Node.js API is responding and SQLite can answer a basic query.
- A cache-busting query string on the assessment page requests the updated `main.js` instead of a previously cached script.

## Update an existing Namecheap Node.js installation
1. Back up the website files and the persistent SQLite database (`data/goldbuilders.db`). Do not delete or replace the database.
2. Extract this patch into the Node.js application root, preserving folder paths. Allow the listed files to overwrite their old versions.
3. In cPanel > Setup Node.js App, restart the GoldBuilders app. Confirm the application root and startup file still point to the directory containing `server.js`.
4. Open `https://YOUR-DOMAIN/api/health` in a browser. Expected response:
   `{"ok":true,"service":"GoldBuilders Growth Platform","api":"online","database":"connected"}`
5. If `/api/health` shows a 404 page or website HTML, the domain is not reaching this running Node.js app (or the updated `server.js` was not deployed). Check the app URL/startup file and restart the app.
6. If the API reports a database problem or returns 503, check the cPanel Node.js application log and confirm that the configured `DB_PATH` points to a persistent, writable directory. Do not delete the existing SQLite database.
7. Hard-refresh the website (Ctrl+Shift+R on Windows/Linux; Cmd+Shift+R on Mac), then complete the assessment again.
8. If submission fails, read the specific message shown on the assessment page and check the server log at the same time. It should distinguish an unavailable API from a database/server error.

## Important
This is a Node.js/Express site, not a static-only HTML site. The assessment requires `POST /api/assessment` and `GET /api/assessment/:token`. A front-end-only upload cannot make these endpoints work if the Node.js app is stopped or the domain is mapped only to static files.

The code in this update was syntax-checked. An end-to-end live HTTP/database test was not run in this environment because installing the project's dependencies timed out. Verify `/api/health` on the actual hosting account before assuming the live backend is healthy.
