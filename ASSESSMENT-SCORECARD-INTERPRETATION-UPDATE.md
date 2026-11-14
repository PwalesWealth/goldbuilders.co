# GoldBuilders assessment scorecard interpretation update

## What changed
- Added `public/assessment-interpretation.html`, a detailed interpretation page linked from the existing score-analysis page.
- Added `public/assets/css/assessment-interpretation.css` and `public/assets/js/assessment-interpretation.js`.
- Updated `public/assessment-result.html` with a “Understand My Scorecard” action while retaining the existing actions.
- Updated `server.js` with `POST /api/assessment-consultation`. The endpoint looks up the saved assessment by its token and uses server-stored scores; it does not trust score values sent by the browser.
- The consultation request asks for the organisation if it was not entered in the assessment, and is stored in the existing `contact_leads` table with the scorecard and direct links in the message, and an email notification is attempted using the site's existing SMTP setup.

## Deployment
For an existing Node.js installation, back up the site and database first. Replace `server.js` and `public/assessment-result.html`, then upload the new `public/assessment-interpretation.html`, `public/assets/css/assessment-interpretation.css`, and `public/assets/js/assessment-interpretation.js`. Restart the Node.js app. No database schema migration is required.

## Score interpretation
- 1–2: Critical gap
- 3–4: Weak foundation
- 5–6: Emerging capability
- 7–8: Established capability
- 9–10: High-performing strength

The interpretation is directional and based on a self-assessment. It is not a formal audit or certification.
