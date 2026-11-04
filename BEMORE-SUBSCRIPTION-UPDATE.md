# BeMore Monthly Subscription Update

## New pages
- `public/bemore-career-mapping.html` — Career Mapping Series Coaching, $10/month.
- `public/bemore-bi-mastermind.html` — Business Intelligence Mastermind Coaching, $10/month.

## Updated pages/assets
- `public/program-bemore-coaching.html` — adds two monthly subscription cards and dedicated page links; preserves the ARIS 10X Framework and existing BeMore content.
- `public/subsidiaries/bemore.html` — adds the two subscription options to the BeMore venture overview.
- `public/sitemap.html` — adds discoverable links to both offers.
- `public/assets/css/bemore-subscriptions.css` — shared responsive black/gold offer styling.

## Enquiry and payment behaviour
Both new membership request forms use the existing `POST /api/contact` handler via `data-api-form="contact"`. Requests are saved as contact enquiries and labelled by subscription. This update does not add payment collection, recurring billing, or automatic community access. The BeMore team must confirm payment instructions and activate membership after confirmation. Integrate a payment provider separately before describing this as an online checkout.

## Pricing assumption
Both subscriptions are displayed at $10/month to mirror the requested monthly offer format and the explicitly supplied Career Mapping price. Adjust the BI Mastermind price if a different rate is intended.

## Career Mapping offer includes
- Curated remote-work and career opportunity updates (not a job-placement guarantee).
- Monthly career-growth webinar.
- Member community.
- Access to selected SkeelUP Africa remote-work bootcamps/training opportunities.
- Career mapping tools, professional development, profile guidance and job-search readiness.

## BI Mastermind offer includes
- Monthly BI mastermind and analytics webinar.
- Practical business case studies and monthly guided exercises.
- Spreadsheet analysis, data preparation, KPIs, visualisation/dashboard thinking, reporting and data storytelling.
- Responsible AI-enabled analysis workflows.
- Peer learning and group feedback.

## Deployment
Upload/merge the listed files into the existing application. Do not overwrite `.env`, the production database, or unrelated public assets. Clear hosting/CDN cache after upload and test both pages and both forms.
