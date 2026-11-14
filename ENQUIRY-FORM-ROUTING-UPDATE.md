# GoldBuilders Co. — Enquiry Form Routing Update

## Purpose
The main Contact form now adapts the interest list and visible fields to the visitor's enquiry intent. This prevents partnership prospects from being shown a consultation-only list.

## Main Contact form enquiry types
- General enquiry: customer support, careers, media, vendor, feedback and other general matters.
- Consultation / advisory: strategy, HR, HR outsourcing, finance, revenue operations, digital transformation, Nexora, diagnostics and executive sessions. Preferred consultation date/time fields appear only for this category.
- Partnership / collaboration: strategic delivery, technology, referral/channel, talent network, institutional, training, investment/venture, media, sponsorship/CSR, supplier and ecosystem partnerships.
- Programme / coaching / training: BeMore subscriptions, ARIS 10X, leadership and talent programmes, corporate workshops, SkeelUP, BI and career development.
- Digital product / implementation: Nexora, websites, dashboards, automation, AI-enabled applications, integrations and MVPs.

## Context links
The Start Partnership Conversation CTA on `public/partners.html` now opens Contact with `type=partnership` and a preselected partnership interest. Existing `?service=...` links continue to prefill the requested service; where no explicit `type` is supplied, the contact page infers a suitable category from the service.

## Data handling
- The contact endpoint now accepts and stores `enquiry_type` alongside the selected specific interest.
- A forward-only SQLite migration adds the field to existing databases. Older records retain `Consultation` as their migrated category.
- The admin dashboard labels the category of each enquiry in the Type column.
- The current database and `.env` are not included in this patch.

## Deployment
Merge the patch into the application root, preserving the live `.env` and `data/goldbuilders.db`. Restart the Node.js application after upload. The first request to the updated server runs the safe forward-only column migration automatically.
