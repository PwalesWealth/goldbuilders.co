# GoldBuilders Co. Conversion Improvements

The release preserves the homepage headline **Building High-Performance People, Businesses & Ecosystems** and builds on the latest Mobile-First UX package.

## Included
- A two-question solution finder on Home and Services, routing visitors to existing solution, package, corporate, public-sector, programme or partnership pages.
- Direct detail/pricing links from each homepage solution card.
- A visible discover → design → deliver process and a transparent note about portfolio evidence.
- The four existing case-study cards are explicitly labelled as illustrative engagement blueprints; no client logos, testimonials or measured client results have been invented.
- Preferred consultation date and WAT time window on contact, corporate and government forms. Preferences appear in the existing contact lead message and email notification; no database migration is needed.
- Service prefill from links like `contact.html?service=...#contact-form`.
- An assessment progress indicator, blank score fields, optional email and optional follow-up consent. Existing assessment API, token and database flow is preserved.
- Result print / Save as PDF through the browser print dialogue and a WhatsApp message carrying the score, tier and top priority dimensions only.
- Privacy-conscious conversion events: event names and page/form type only. They can reach `dataLayer` if GTM is installed; without GTM they exist as `gb:conversion` browser events only. No tracking ID was invented.
- High-intent pages show a static photo-backed heading rather than the same repeated carousel; showcase/editorial pages retain their carousels.

## Limitations
- Preferred date/time is a request, not live availability; the team must confirm. Live slots, calendar sync and reminders require a connected calendar provider and booking URL.
- Print / Save Result as PDF opens browser print; the user can choose “Save as PDF”. It does not email a report.
- Analytics does not send data externally until a GTM/GA4 installation is configured. Personal form values are not included in event payloads.
- Existing metrics and claims outside this change have not been independently audited for evidence; keep publicly displayed figures supportable and current.

## Deployment
Deploy the full ZIP or merge the patch. Preserve `.env` and the production database. Restart Node.js because `server.js` was updated. Test `/api/health`, form saving and notification, assessment results, report printing and WhatsApp links on the production HTTPS site.
