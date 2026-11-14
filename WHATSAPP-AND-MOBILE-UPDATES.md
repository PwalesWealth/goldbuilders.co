# WhatsApp consultation and mobile readability update

## What changed
- Added a direct WhatsApp alternative to all shared GoldBuilders consultation forms (`data-api-form="contact"`) including contact, corporate, government and programme enquiry pages.
- Added a WhatsApp alternative to SkeelUP course registration.
- Added a direct WhatsApp button to the Nexora setup booking modal. Existing database-backed form submission remains available.
- The direct button builds a prefilled message from the current form fields and opens WhatsApp to +234 802 284 8749. The user must review and send the message; this path does not write to the website database.
- Added mobile typography and form-control overrides for clearer reading and touch targets, including on the two Nexora pages.
- Added Pexels stock-photo backgrounds to selected marketing hero sections. See `IMAGE-SOURCES.md`.

## Deployment
Merge the patch into the current deployment or deploy the complete updated archive. Preserve the existing `.env` file and production database. No database migration is required.
