GOLDBUILDERS CO. - LUXESTREAMS / BEMORE PRICING + REFERRAL PARTNER UPDATE

PACKAGE CONTENTS
- LuxeStreams one-off, non-member service pricing and pricing explanations.
- BeMore individual coaching, package, membership, cohort, ARIS 10X and corporate pricing.
- Public referral-partner registration page with unique partner codes and 47 offer-specific share links across GoldBuilders Co. and its independent ecosystem ventures/initiatives; LuxeStreams and BeMore service cards have individual referral destinations.
- 30-day referral-code storage and attribution on supported enquiries / registrations.
- Protected admin dashboard view for partner status, referral clicks, attributed lead counts and a manual Referral Sales Register.
- SQLite referral-partner / click tables and forward-only referral_code migrations.

PATCH INSTALLATION (EXISTING WEBSITE)
1. Take a complete backup of the website files and the production SQLite database.
2. Extract this ZIP into the existing application root, preserving the folder structure and allowing the included changed files to overwrite matching website files.
3. DO NOT overwrite or delete the live .env file, the production SQLite database, admin credentials, uploads, or other production-only data.
4. Confirm the Node.js application runs the included server.js and serves the included public directory.
5. Ensure the data directory is writable by the Node process. On restart, server.js creates the referral tables and adds referral_code columns where missing.
6. Restart the Node.js application.
7. Open the live HTTPS domain, register a test referral partner, and save one of the generated LuxeStreams or BeMore links.
8. Open the link in a private browser session, submit a test enquiry, then sign in to the protected admin dashboard and check Referral Partner Performance for the click and attributed lead.
9. For a controlled test sale, activate the test partner, record a test transaction in Referral Sales Register, verify it, and test the commission-payout status only with a dummy transaction. Do not use a real payout record for testing.
10. Remove the test partner, lead and sale using the site's approved data-retention process before inviting real partners.

IMPORTANT COMMERCIAL NOTES
- All new LuxeStreams and BeMore prices are recommended starting rates and require management approval before being represented as binding tariffs.
- Vendor costs (courier, cleaning, transport, travel, purchases, lodging, software, official fees, etc.) are separated or quoted after supplier confirmation.
- Referral applicants begin in Pending Review status. A referral code and clicks do not themselves create a right to commission.
- Referral commission percentages in the pricing manual are proposals only. Approve the schedule and sign a separate Referral Partner Agreement before authorising commissions or promoting a specific payout promise.
- The dashboard measures clicks and supported enquiry submissions and includes a manual Referral Sales Register. Authorised staff record closed sales, eligible revenue and any management-approved commission rate; Finance verifies the sale and manually controls payout status. The platform does not automatically reconcile bank receipts or invoices, calculate a legally approved commission entitlement, or pay partners.
- Referral links use the HTTPS domain where the partner signup page is opened. Deploy to the canonical domain before recruiting partners.

VALIDATION NOTES
The updated server.js and browser JavaScript were syntax-checked. Inline page scripts, local asset/page references, referral destination files and anchor IDs were checked. The SQLite referral-sales schema and sale status workflow were smoke-tested against a temporary database. database-schema.sql parsed successfully. A full live-host end-to-end test must still be performed after deployment because the live environment, SMTP settings, domain, database and hosting permissions are not accessible from this package build.
