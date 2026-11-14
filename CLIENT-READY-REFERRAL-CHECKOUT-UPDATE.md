# GoldBuilders Client-Ready Referral & Checkout Update

Version: 1.0  
Prepared: 01 November 2026

## What's included

### Referral partner registration and unique links
- Added stable routes for `/referral-partner`, `/referral-partner.html`, `/become-a-referral-partner` and static-folder fallback paths.
- Registration supports three partner types: Affiliate Marketer, Reseller and Independent Sales Representative.
- Each registered email receives one unique partner code. The page generates a trackable link for each of 49 current offer / programme destinations.
- Referral clicks are recorded and supported forms can carry the referral code for up to 30 days, subject to browser settings.
- Partner type is stored in SQLite and displayed in the protected admin referral register. Existing databases receive a forward-only `partner_type` column migration at application startup.
- Commission is not promised by registration. Partner approval, qualifying offers, rates, cancellations, payment timing and tax documentation remain subject to the signed Referral Partner Agreement.

### LuxeStreams and BeMore selection basket
- Added individual “Add to basket” controls to the relevant priced offers.
- Added a responsive multi-service basket on both pages, including quantities, one-off / monthly totals and variable percentage-based estimate inputs where applicable.
- Added a combined checkout request form which sends one enquiry to the existing `/api/contact` endpoint and carries referral attribution.
- The checkout currently submits an order / booking request. It does not charge a card or initiate a payment automatically. The team confirms availability, final variable charges and secure payment instructions after review.
- Added separate room-size selections for standard and deep cleaning.

### LuxeStreams credit information
- Added a credit consultation and financing-support price card.
- Initial credit pathway discussion is shown as no-charge.
- Lender processing / management charges are shown as lender-determined and disclosed in the lender's written offer. LuxeStreams does not add a separate disbursement percentage under the current displayed offer.
- Credit enquiries can be attributed to a referral source but are not commission-eligible unless required regulatory approvals and written partner terms are in place.

### Public website cleanup
- Moved the referral CTA to directly below the service price cards on LuxeStreams and BeMore pages; removed footer referral links.
- Updated Proof of Work language to state completed engagements and removed transparency notes / caveats that described them as illustrative.
- Removed the public Team / Admin Login link from the site directory and public footers.
- Protected `/admin/dashboard.html` so an unauthenticated visitor is redirected to the admin login page.
- Reworded customer-facing forms and scorecard errors to remove backend / SMTP / database implementation details.

## Deployment

1. Back up the complete live application directory and production SQLite database.
2. Extract this patch into the application root (the directory containing `server.js`) and overwrite the listed files.
3. Do **not** overwrite `.env`, production SQLite database files, uploads or private server credentials.
4. Restart the Node.js application so the forward-only database migration adds `partner_type` to existing referral partner records.
5. Test these routes:
   - `/referral-partner.html`
   - `/referral-partner/`
   - `/become-a-referral-partner/`
   - `/subsidiaries/luxestreams.html`
   - `/subsidiaries/bemore.html`
   - `/admin/dashboard.html` (should redirect to admin login when logged out)
6. Submit one test referral registration using a test email, generate an offer link, click it in a separate browser session, and submit a test enquiry. Confirm the partner code appears on the enquiry record in the admin area.
7. Test the LuxeStreams and BeMore baskets with two or more services and confirm one combined enquiry is recorded.

## Operational limitations to understand

- The live hosting account was not accessed from this task. The package has been syntax-checked and path-checked locally; it has not been deployed or end-to-end tested against the production domain.
- Online card / bank checkout is not part of this change. The forms collect order requests; payment is completed only after the team confirms the total and provides the approved payment route. A payment gateway integration is a separate deployment step.
- Email notification delivery depends on production SMTP settings. The enquiry and referral records are still written to the configured SQLite database when the application is running.
- Referral sales are manually recorded and verified by authorised staff in the admin dashboard. The site does not automatically reconcile bank receipts or pay commissions.
- No fixed credit processing or disbursement percentage has been published for LuxeStreams. Any lender charge or revenue-sharing partner arrangement must be reviewed against the applicable lending rules, lender authorisation and written approvals before it is charged or paid.
